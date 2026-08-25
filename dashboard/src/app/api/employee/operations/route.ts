import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';
import { audit, companyDateKey } from '@/lib/operations';

function text(value: unknown, max = 200) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function GET(req: NextRequest) {
  const user = await getUserWithRole(req, 'EMPLOYEE');
  if (!user?.companyId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const dateKey = companyDateKey(new Date(), user.timezone);
  const [tasks, requests, sessions] = await Promise.all([
    prisma.task.findMany({
      where: { companyId: user.companyId, status: { in: ['OPEN', 'IN_PROGRESS', 'BLOCKED'] }, OR: [{ assignedUserId: user.id }, { assignedUserId: null }] },
      include: { project: { select: { id: true, name: true } } },
      orderBy: [{ priority: 'desc' }, { updatedAt: 'desc' }],
      take: 100,
    }),
    prisma.manualTimeRequest.findMany({
      where: { userId: user.id },
      include: { project: { select: { name: true } }, task: { select: { title: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    }),
    prisma.trackingSession.findMany({ where: { userId: user.id, dateKey }, orderBy: { startedAt: 'asc' } }),
  ]);
  return NextResponse.json({
    tasks,
    requests,
    sessions,
    shift: {
      timezone: user.timezone,
      workDays: user.workDays,
      shiftStartMinutes: user.shiftStartMinutes,
      shiftEndMinutes: user.shiftEndMinutes,
      targetMinutes: user.targetMinutes,
      maxShiftMinutes: user.maxShiftMinutes,
      maxBreakMinutes: user.maxBreakMinutes,
    },
  });
}

export async function POST(req: NextRequest) {
  const user = await getUserWithRole(req, 'EMPLOYEE');
  if (!user?.companyId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => null);
  const action = text(body?.action, 40).toUpperCase();

  if (action === 'REQUEST_MANUAL_TIME') {
    const startAt = new Date(body?.startAt);
    const endAt = new Date(body?.endAt);
    const note = text(body?.note, 2000);
    if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime()) || endAt <= startAt || endAt.getTime() - startAt.getTime() > 24 * 60 * 60_000 || note.length < 3) {
      return NextResponse.json({ error: 'Valid start, end, and work note are required' }, { status: 400 });
    }
    const taskId = text(body?.taskId, 80) || null;
    const task = taskId ? await prisma.task.findFirst({ where: { id: taskId, companyId: user.companyId } }) : null;
    if (taskId && !task) return NextResponse.json({ error: 'Invalid task' }, { status: 400 });
    const request = await prisma.manualTimeRequest.create({
      data: {
        userId: user.id,
        companyId: user.companyId,
        startAt,
        endAt,
        note,
        taskId,
        projectId: task?.projectId || null,
        status: user.manualTimeRequiresApproval ? 'PENDING' : 'APPROVED',
      },
    });
    await audit(user.companyId, user.id, action, 'ManualTimeRequest', request.id, { startAt, endAt, taskId });
    return NextResponse.json({ success: true, request });
  }

  if (action === 'UPDATE_TASK_STATUS') {
    const id = text(body?.id, 80);
    const status = ['IN_PROGRESS', 'DONE', 'BLOCKED'].includes(body?.status) ? body.status : null;
    const task = status && await prisma.task.findFirst({
      where: { id, companyId: user.companyId, OR: [{ assignedUserId: user.id }, { assignedUserId: null }] },
    });
    if (!task || !status) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    const updated = await prisma.task.update({ where: { id }, data: { status, assignedUserId: task.assignedUserId || user.id } });
    await audit(user.companyId, user.id, action, 'Task', id, { status });
    return NextResponse.json({ success: true, task: updated });
  }

  return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
}
