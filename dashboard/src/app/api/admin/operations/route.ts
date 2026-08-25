import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';
import { audit, createAlertOnce } from '@/lib/operations';

function text(value: unknown, max = 200) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function GET(req: NextRequest) {
  const admin = await getUserWithRole(req, 'ADMIN');
  if (!admin?.companyId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(req.url);
  const view = url.searchParams.get('view') || 'overview';
  if (view === 'attendance') {
    const dateKey = (url.searchParams.get('date') || new Date().toISOString().slice(0, 10)).slice(0, 10);
    const [employees, sessions, requests] = await Promise.all([
      prisma.user.findMany({
        where: { companyId: admin.companyId, role: 'EMPLOYEE' },
        select: { id: true, name: true, email: true, shiftStartMinutes: true, targetMinutes: true },
        orderBy: { name: 'asc' },
      }),
      prisma.trackingSession.findMany({
        where: { companyId: admin.companyId, dateKey },
        orderBy: { startedAt: 'asc' },
      }),
      prisma.manualTimeRequest.findMany({
        where: { companyId: admin.companyId, startAt: { gte: new Date(`${dateKey}T00:00:00.000Z`), lt: new Date(`${dateKey}T23:59:59.999Z`) } },
      }),
    ]);
    const rows = employees.map((employee) => {
      const own = sessions.filter((session) => session.userId === employee.id);
      const first = own[0];
      const last = own[own.length - 1];
      const activeSeconds = own.reduce((sum, item) => sum + item.activeSeconds, 0);
      const idleSeconds = own.reduce((sum, item) => sum + item.idleSeconds, 0);
      const breakSeconds = own.reduce((sum, item) => sum + item.breakSeconds, 0);
      const reviewRequired = own.some((item) => item.reviewRequired);
      const present = own.length > 0;
      return {
        ...employee,
        checkIn: first?.startedAt || null,
        checkOut: last?.endedAt || null,
        activeSeconds,
        idleSeconds,
        breakSeconds,
        trackedSeconds: activeSeconds + idleSeconds,
        status: !present ? 'ABSENT' : last?.endedAt ? (reviewRequired ? 'NEEDS_REVIEW' : 'COMPLETED') : last?.status || 'TRACKING',
        reviewRequired,
        manualRequestCount: requests.filter((item) => item.userId === employee.id).length,
      };
    });
    return NextResponse.json({ dateKey, rows });
  }

  const [projects, tasks, requests, alerts, rules, employees, sessions] = await Promise.all([
    prisma.project.findMany({ where: { companyId: admin.companyId }, include: { tasks: true }, orderBy: { updatedAt: 'desc' } }),
    prisma.task.findMany({
      where: { companyId: admin.companyId },
      include: { project: { select: { id: true, name: true } }, assignedUser: { select: { id: true, name: true, email: true } } },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.manualTimeRequest.findMany({
      where: { companyId: admin.companyId },
      include: { user: { select: { name: true, email: true } }, project: { select: { name: true } }, task: { select: { title: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    prisma.alert.findMany({
      where: { companyId: admin.companyId },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    prisma.productivityRule.findMany({ where: { companyId: admin.companyId }, orderBy: { createdAt: 'desc' } }),
    prisma.user.findMany({
      where: { companyId: admin.companyId, role: 'EMPLOYEE' },
      select: { id: true, name: true, email: true, shiftStartMinutes: true, shiftEndMinutes: true, targetMinutes: true, maxShiftMinutes: true, maxBreakMinutes: true },
      orderBy: { name: 'asc' },
    }),
    prisma.trackingSession.findMany({
      where: { companyId: admin.companyId, endedAt: null },
      orderBy: { lastHeartbeatAt: 'desc' },
    }),
  ]);
  for (const session of sessions) {
    if (Date.now() - session.lastHeartbeatAt.getTime() > 3 * 60_000) {
      const employee = employees.find((item) => item.id === session.userId);
      await createAlertOnce({
        companyId: admin.companyId,
        userId: session.userId,
        type: 'TRACKER_HEARTBEAT_MISSING',
        severity: 'CRITICAL',
        message: `${employee?.name || 'Employee'}'s tracker stopped sending data while the shift is still open.`,
        metadata: { sessionId: session.id, lastHeartbeatAt: session.lastHeartbeatAt },
        withinMinutes: 30,
      });
    }
  }
  return NextResponse.json({ projects, tasks, requests, alerts, rules, employees, openSessions: sessions });
}

export async function POST(req: NextRequest) {
  const admin = await getUserWithRole(req, 'ADMIN');
  if (!admin?.companyId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => null);
  const action = text(body?.action, 50).toUpperCase();

  if (action === 'CREATE_PROJECT') {
    const name = text(body?.name, 120);
    if (name.length < 2) return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    const project = await prisma.project.create({ data: { companyId: admin.companyId, name, code: text(body?.code, 30) || null } });
    await audit(admin.companyId, admin.id, action, 'Project', project.id, { name });
    return NextResponse.json({ success: true, project });
  }

  if (action === 'CREATE_TASK') {
    const title = text(body?.title, 160);
    if (title.length < 2) return NextResponse.json({ error: 'Task title is required' }, { status: 400 });
    const projectId = text(body?.projectId, 80) || null;
    const assignedUserId = text(body?.assignedUserId, 80) || null;
    if (projectId && !await prisma.project.findFirst({ where: { id: projectId, companyId: admin.companyId } })) {
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 });
    }
    if (assignedUserId && !await prisma.user.findFirst({ where: { id: assignedUserId, companyId: admin.companyId, role: 'EMPLOYEE' } })) {
      return NextResponse.json({ error: 'Invalid employee' }, { status: 400 });
    }
    const dueDate = body?.dueDate ? new Date(body.dueDate) : null;
    const task = await prisma.task.create({
      data: {
        companyId: admin.companyId,
        title,
        description: text(body?.description, 2000) || null,
        projectId,
        assignedUserId,
        priority: ['LOW', 'NORMAL', 'HIGH', 'URGENT'].includes(body?.priority) ? body.priority : 'NORMAL',
        dueDate: dueDate && !Number.isNaN(dueDate.getTime()) ? dueDate : null,
      },
    });
    await audit(admin.companyId, admin.id, action, 'Task', task.id, { title, assignedUserId });
    return NextResponse.json({ success: true, task });
  }

  if (action === 'UPDATE_TASK') {
    const id = text(body?.id, 80);
    const existing = await prisma.task.findFirst({ where: { id, companyId: admin.companyId } });
    if (!existing) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    const task = await prisma.task.update({
      where: { id },
      data: {
        status: ['OPEN', 'IN_PROGRESS', 'DONE', 'BLOCKED', 'ARCHIVED'].includes(body?.status) ? body.status : existing.status,
        assignedUserId: body?.assignedUserId === '' ? null : text(body?.assignedUserId, 80) || existing.assignedUserId,
        priority: ['LOW', 'NORMAL', 'HIGH', 'URGENT'].includes(body?.priority) ? body.priority : existing.priority,
      },
    });
    await audit(admin.companyId, admin.id, action, 'Task', task.id, body);
    return NextResponse.json({ success: true, task });
  }

  if (action === 'REVIEW_MANUAL_TIME') {
    const id = text(body?.id, 80);
    const status = body?.status === 'APPROVED' ? 'APPROVED' : body?.status === 'REJECTED' ? 'REJECTED' : null;
    const request = status && await prisma.manualTimeRequest.findFirst({ where: { id, companyId: admin.companyId } });
    if (!request || !status) return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    const updated = await prisma.manualTimeRequest.update({ where: { id }, data: { status, reviewedBy: admin.id, reviewedAt: new Date() } });
    await audit(admin.companyId, admin.id, action, 'ManualTimeRequest', id, { status });
    return NextResponse.json({ success: true, request: updated });
  }

  if (action === 'CREATE_RULE') {
    const pattern = text(body?.pattern, 160).toLowerCase();
    const category = ['PRODUCTIVE', 'NEUTRAL', 'UNPRODUCTIVE'].includes(body?.category) ? body.category : null;
    const matchType = body?.matchType === 'TITLE' ? 'TITLE' : 'PROCESS';
    if (!pattern || !category) return NextResponse.json({ error: 'Pattern and category are required' }, { status: 400 });
    const rule = await prisma.productivityRule.upsert({
      where: { companyId_pattern_matchType: { companyId: admin.companyId, pattern, matchType } },
      create: { companyId: admin.companyId, pattern, matchType, category },
      update: { category },
    });
    await audit(admin.companyId, admin.id, action, 'ProductivityRule', rule.id, { pattern, category, matchType });
    return NextResponse.json({ success: true, rule });
  }

  if (action === 'DELETE_RULE') {
    const id = text(body?.id, 80);
    const rule = await prisma.productivityRule.findFirst({ where: { id, companyId: admin.companyId } });
    if (!rule) return NextResponse.json({ error: 'Rule not found' }, { status: 404 });
    await prisma.productivityRule.delete({ where: { id } });
    await audit(admin.companyId, admin.id, action, 'ProductivityRule', id);
    return NextResponse.json({ success: true });
  }

  if (action === 'MARK_ALERT_READ') {
    const id = text(body?.id, 80);
    const alert = await prisma.alert.findFirst({ where: { id, companyId: admin.companyId } });
    if (!alert) return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
    await prisma.alert.update({ where: { id }, data: { readAt: new Date() } });
    return NextResponse.json({ success: true });
  }

  if (action === 'UPDATE_SHIFT') {
    const userId = text(body?.userId, 80);
    const employee = await prisma.user.findFirst({ where: { id: userId, companyId: admin.companyId, role: 'EMPLOYEE' } });
    if (!employee) return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    const clamp = (value: unknown, min: number, max: number, fallback: number) => Number.isInteger(value) ? Math.min(max, Math.max(min, Number(value))) : fallback;
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        shiftStartMinutes: clamp(body?.shiftStartMinutes, 0, 1439, employee.shiftStartMinutes),
        shiftEndMinutes: clamp(body?.shiftEndMinutes, 0, 1439, employee.shiftEndMinutes),
        targetMinutes: clamp(body?.targetMinutes, 60, 1440, employee.targetMinutes),
        maxShiftMinutes: clamp(body?.maxShiftMinutes, 60, 1440, employee.maxShiftMinutes),
        maxBreakMinutes: clamp(body?.maxBreakMinutes, 5, 480, employee.maxBreakMinutes),
        workDays: text(body?.workDays, 20) || employee.workDays,
      },
    });
    await audit(admin.companyId, admin.id, action, 'User', userId, body);
    return NextResponse.json({ success: true, employee: updated });
  }

  return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
}
