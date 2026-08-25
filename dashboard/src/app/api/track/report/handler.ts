import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';
import { consumeRateLimit } from '@/lib/rate-limit';
import { sendWorkReportEmail } from '@/lib/report-email';

export async function handleReportPOST(req: NextRequest) {
  try {
    const user = await getUserWithRole(req, 'EMPLOYEE');
    if (!user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rateLimit = consumeRateLimit(`work-report:${user.id}`, 60, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many reports submitted' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    const type = ['BREAK', 'STOP', 'RESUME', 'IDLE_STOP'].includes(body?.type) ? body.type : null;
    const note = typeof body?.note === 'string' ? body.note.trim().slice(0, 2000) : '';
    const clientEventId = typeof body?.clientEventId === 'string' ? body.clientEventId.slice(0, 120) : null;
    const taskId = typeof body?.taskId === 'string' ? body.taskId.slice(0, 80) : null;
    if (!type || ((type === 'BREAK' || type === 'STOP') && note.length < 3)) {
      return NextResponse.json({ error: 'Please enter a short work report' }, { status: 400 });
    }

    const createdAt = new Date();
    if (clientEventId) {
      const existing = await prisma.workReport.findUnique({ where: { clientEventId }, select: { id: true } });
      if (existing) return NextResponse.json({ success: true, reportId: existing.id, duplicate: true });
    }
    const openSession = await prisma.trackingSession.findFirst({
      where: { userId: user.id, endedAt: null },
      orderBy: { startedAt: 'desc' },
    });
    if (type === 'RESUME') {
      const openBreak = await prisma.workReport.findFirst({
        where: { userId: user.id, type: 'BREAK', endedAt: null },
        orderBy: { createdAt: 'desc' },
      });
      if (!openBreak) return NextResponse.json({ success: true, durationSeconds: 0 });
      const durationSeconds = Math.max(0, Math.round((createdAt.getTime() - openBreak.createdAt.getTime()) / 1000));
      await prisma.workReport.update({ where: { id: openBreak.id }, data: { endedAt: createdAt, durationSeconds } });
      if (openSession) {
        await prisma.trackingSession.update({
          where: { id: openSession.id },
          data: {
            status: 'TRACKING',
            breakStartedAt: null,
            breakSeconds: { increment: durationSeconds },
            lastHeartbeatAt: createdAt,
          },
        });
      }
      return NextResponse.json({ success: true, durationSeconds });
    }

    if (type === 'STOP' || type === 'IDLE_STOP') {
      const openBreak = await prisma.workReport.findFirst({
        where: { userId: user.id, type: 'BREAK', endedAt: null },
        orderBy: { createdAt: 'desc' },
      });
      if (openBreak) {
        const durationSeconds = Math.max(0, Math.round((createdAt.getTime() - openBreak.createdAt.getTime()) / 1000));
        await prisma.workReport.update({ where: { id: openBreak.id }, data: { endedAt: createdAt, durationSeconds } });
      }
    }

    const owner = await prisma.user.findFirst({
      where: { companyId: user.companyId, role: 'ADMIN' },
      select: { email: true },
    });
    const report = await prisma.workReport.create({
      data: {
        userId: user.id,
        type: type === 'IDLE_STOP' ? 'STOP' : type,
        note: type === 'IDLE_STOP' ? 'Tracker stopped automatically after reaching the company idle limit.' : note,
        createdAt,
        clientEventId,
        taskId,
      },
      select: { id: true },
    });

    if (openSession && type === 'BREAK') {
      await prisma.trackingSession.update({
        where: { id: openSession.id },
        data: { status: 'BREAK', breakStartedAt: createdAt, lastHeartbeatAt: createdAt, taskId },
      });
    } else if (openSession && (type === 'STOP' || type === 'IDLE_STOP')) {
      const openBreakSeconds = openSession.breakStartedAt
        ? Math.max(0, Math.floor((createdAt.getTime() - openSession.breakStartedAt.getTime()) / 1000))
        : 0;
      await prisma.trackingSession.update({
        where: { id: openSession.id },
        data: {
          status: 'STOPPED',
          endedAt: createdAt,
          lastHeartbeatAt: createdAt,
          breakStartedAt: null,
          breakSeconds: { increment: openBreakSeconds },
        },
      });
    }

    const emailSent = await sendWorkReportEmail({
      employeeName: user.name,
      employeeEmail: user.email,
      companyId: user.companyId,
      type: type === 'IDLE_STOP' ? 'STOP' : type,
      note: type === 'IDLE_STOP' ? 'Tracker stopped automatically after reaching the company idle limit.' : note,
      createdAt,
      ownerEmail: owner?.email,
    });
    if (emailSent) {
      await prisma.workReport.update({ where: { id: report.id }, data: { emailSent: true } });
    }

    return NextResponse.json({ success: true, reportId: report.id, emailSent });
  } catch (error) {
    console.error('Work report API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
