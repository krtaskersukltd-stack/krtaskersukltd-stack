import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';
import { boundedText } from '@/lib/validation';
import { companyDateKey, createAlertOnce } from '@/lib/operations';

const EVENTS = new Set(['START', 'HEARTBEAT', 'BREAK_START', 'BREAK_END', 'STOP']);

export async function POST(req: NextRequest) {
  try {
    const user = await getUserWithRole(req, 'EMPLOYEE');
    if (!user?.companyId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => null);
    const event = String(body?.event || '').toUpperCase();
    if (!EVENTS.has(event)) return NextResponse.json({ error: 'Invalid session event' }, { status: 400 });

    const now = new Date();
    const clientSessionId = typeof body?.clientSessionId === 'string'
      ? body.clientSessionId.slice(0, 120)
      : null;
    const currentTask = boundedText(body?.currentTask, 'Working');
    const taskId = typeof body?.taskId === 'string' ? body.taskId.slice(0, 80) : null;
    let session = await prisma.trackingSession.findFirst({
      where: { userId: user.id, endedAt: null },
      orderBy: { startedAt: 'desc' },
    });

    if (event === 'START') {
      if (!session) {
        session = await prisma.trackingSession.create({
          data: {
            clientSessionId,
            userId: user.id,
            companyId: user.companyId,
            dateKey: companyDateKey(now, user.timezone),
            startedAt: now,
            lastHeartbeatAt: now,
            status: 'TRACKING',
            currentTask,
            taskId,
          },
        });
      } else {
        session = await prisma.trackingSession.update({
          where: { id: session.id },
          data: { status: 'TRACKING', lastHeartbeatAt: now, currentTask, taskId },
        });
      }
    } else if (!session) {
      return NextResponse.json({ error: 'No open tracking session' }, { status: 409 });
    } else if (event === 'HEARTBEAT') {
      const durationSeconds = Math.min(120, Math.max(0, Number(body?.durationSeconds) || 0));
      const idleSeconds = Math.min(durationSeconds, Math.max(0, Number(body?.idleSeconds) || 0));
      const elapsedMinutes = Math.floor((now.getTime() - session.startedAt.getTime()) / 60_000);
      const reviewRequired = elapsedMinutes >= user.maxShiftMinutes;
      session = await prisma.trackingSession.update({
        where: { id: session.id },
        data: {
          lastHeartbeatAt: now,
          currentTask,
          taskId,
          activeSeconds: { increment: Math.max(0, durationSeconds - idleSeconds) },
          idleSeconds: { increment: idleSeconds },
          reviewRequired: reviewRequired || session.reviewRequired,
          reviewReason: reviewRequired ? `Tracker exceeded ${user.maxShiftMinutes} minutes` : session.reviewReason,
        },
      });
      if (reviewRequired) {
        await createAlertOnce({
          companyId: user.companyId,
          userId: user.id,
          type: 'SHIFT_LIMIT_EXCEEDED',
          severity: 'CRITICAL',
          message: `${user.name}'s tracker has exceeded the ${user.maxShiftMinutes}-minute review limit.`,
          metadata: { sessionId: session.id, elapsedMinutes },
          withinMinutes: 720,
        });
      }
    } else if (event === 'BREAK_START') {
      session = await prisma.trackingSession.update({
        where: { id: session.id },
        data: { status: 'BREAK', breakStartedAt: now, lastHeartbeatAt: now },
      });
    } else if (event === 'BREAK_END') {
      const breakSeconds = session.breakStartedAt
        ? Math.max(0, Math.floor((now.getTime() - session.breakStartedAt.getTime()) / 1000))
        : 0;
      session = await prisma.trackingSession.update({
        where: { id: session.id },
        data: {
          status: 'TRACKING',
          breakStartedAt: null,
          breakSeconds: { increment: breakSeconds },
          lastHeartbeatAt: now,
        },
      });
      if (breakSeconds > user.maxBreakMinutes * 60) {
        await createAlertOnce({
          companyId: user.companyId,
          userId: user.id,
          type: 'BREAK_LIMIT_EXCEEDED',
          message: `${user.name}'s break exceeded ${user.maxBreakMinutes} minutes.`,
          metadata: { sessionId: session.id, breakSeconds },
          withinMinutes: 240,
        });
      }
    } else if (event === 'STOP') {
      const openBreakSeconds = session.breakStartedAt
        ? Math.max(0, Math.floor((now.getTime() - session.breakStartedAt.getTime()) / 1000))
        : 0;
      const elapsedMinutes = Math.floor((now.getTime() - session.startedAt.getTime()) / 60_000);
      const reviewRequired = elapsedMinutes >= user.maxShiftMinutes || session.reviewRequired;
      session = await prisma.trackingSession.update({
        where: { id: session.id },
        data: {
          status: 'STOPPED',
          endedAt: now,
          lastHeartbeatAt: now,
          breakStartedAt: null,
          breakSeconds: { increment: openBreakSeconds },
          reviewRequired,
          reviewReason: reviewRequired
            ? session.reviewReason || `Tracker exceeded ${user.maxShiftMinutes} minutes`
            : null,
        },
      });
    }

    const tasks = await prisma.task.findMany({
      where: { companyId: user.companyId, status: { in: ['OPEN', 'IN_PROGRESS'] }, OR: [{ assignedUserId: user.id }, { assignedUserId: null }] },
      select: { id: true, title: true, projectId: true, status: true, priority: true },
      orderBy: { updatedAt: 'desc' },
      take: 100,
    });
    return NextResponse.json({ success: true, session, tasks });
  } catch (error) {
    console.error('Tracking session API error:', error);
    return NextResponse.json({ error: 'Unable to update tracking session' }, { status: 500 });
  }
}
