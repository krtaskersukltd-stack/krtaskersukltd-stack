import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';
import { consumeRateLimit } from '@/lib/rate-limit';
import { boundedText, validTimestamp } from '@/lib/validation';
import { createAlertOnce, productivityCategory } from '@/lib/operations';

export async function handleActivityPOST(req: NextRequest) {
  try {
    const user = await getUserWithRole(req, 'EMPLOYEE');
    if (!user || !user.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // The desktop app may replay a persisted offline queue after reconnecting.
    const rateLimit = consumeRateLimit(`activity:${user.id}`, 180, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many activity updates' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    const status = body?.status;
    const parsedDate = validTimestamp(body?.timestamp);

    if ((status !== 'ACTIVE' && status !== 'IDLE') || !parsedDate) {
      return NextResponse.json({ error: 'Invalid activity status or timestamp' }, { status: 400 });
    }

    const keystrokes = Math.max(0, parseInt(body?.keystrokes || 0, 10) || 0);
    const mouseClicks = Math.max(0, parseInt(body?.mouseClicks || 0, 10) || 0);
    const durationSeconds = Math.min(120, Math.max(1, parseInt(body?.durationSeconds || 60, 10) || 60));
    const idleSeconds = Math.min(durationSeconds, Math.max(0, parseInt(body?.idleSeconds || 0, 10) || 0));
    const continuousIdleSeconds = Math.min(604800, Math.max(0, parseInt(body?.continuousIdleSeconds || 0, 10) || 0));
    const clientEventId = typeof body?.clientEventId === 'string' ? body.clientEventId.slice(0, 120) : null;
    const taskId = typeof body?.taskId === 'string' ? body.taskId.slice(0, 80) : null;

    if (clientEventId) {
      const existing = await prisma.activityLog.findUnique({ where: { clientEventId }, select: { id: true } });
      if (existing) return NextResponse.json({ success: true, logId: existing.id, duplicate: true });
    }

    const category = status === 'IDLE'
      ? 'NEUTRAL'
      : await productivityCategory(user.companyId, body?.appProcess, body?.appTitle);

    const log = await prisma.activityLog.create({
      data: {
        userId: user.id,
        status,
        currentTask: boundedText(body.currentTask, 'Working'),
        timestamp: parsedDate,
        appProcess: boundedText(body.appProcess) || null,
        appTitle: boundedText(body.appTitle) || null,
        keystrokes,
        mouseClicks,
        durationSeconds,
        idleSeconds,
        continuousIdleSeconds,
        clientEventId,
        taskId,
        productivityCategory: category,
      }
    });

    const adminSettings = await prisma.user.findFirst({
      where: { companyId: user.companyId, role: 'ADMIN' },
      select: { idleLimitMinutes: true, maxShiftMinutes: true },
    });
    const openSession = await prisma.trackingSession.findFirst({
      where: { userId: user.id, endedAt: null },
      orderBy: { startedAt: 'desc' },
    });
    if (openSession) {
      const elapsedMinutes = Math.floor((Date.now() - openSession.startedAt.getTime()) / 60_000);
      const maxShiftMinutes = adminSettings?.maxShiftMinutes ?? user.maxShiftMinutes;
      const reviewRequired = elapsedMinutes >= maxShiftMinutes;
      await prisma.trackingSession.update({
        where: { id: openSession.id },
        data: {
          lastHeartbeatAt: parsedDate,
          currentTask: boundedText(body.currentTask, 'Working'),
          taskId,
          activeSeconds: { increment: Math.max(0, durationSeconds - idleSeconds) },
          idleSeconds: { increment: idleSeconds },
          reviewRequired: reviewRequired || openSession.reviewRequired,
          reviewReason: reviewRequired ? `Tracker exceeded ${maxShiftMinutes} minutes` : openSession.reviewReason,
        },
      });
      if (reviewRequired) {
        await createAlertOnce({
          companyId: user.companyId,
          userId: user.id,
          type: 'SHIFT_LIMIT_EXCEEDED',
          severity: 'CRITICAL',
          message: `${user.name}'s tracker has exceeded the ${maxShiftMinutes}-minute review limit.`,
          metadata: { sessionId: openSession.id, elapsedMinutes },
          withinMinutes: 720,
        });
      }
    }
    if (continuousIdleSeconds >= (adminSettings?.idleLimitMinutes ?? 10) * 60) {
      await createAlertOnce({
        companyId: user.companyId,
        userId: user.id,
        type: 'LONG_IDLE',
        message: `${user.name} has been continuously idle for ${Math.floor(continuousIdleSeconds / 60)} minutes.`,
        metadata: { continuousIdleSeconds },
        withinMinutes: adminSettings?.idleLimitMinutes ?? 10,
      });
    }
    return NextResponse.json({
      success: true,
      logId: log.id,
      idleLimitMinutes: adminSettings?.idleLimitMinutes ?? 10,
    });
  } catch (err) {
    console.error('Track activity API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
