import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/authorization';
import { clearSessionCookie } from '@/lib/auth';
import { activityMetrics } from '@/lib/activity-metrics';

export async function handleMeGET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      clearSessionCookie(response);
      return response;
    }

    // Fetch screenshot interval (if employee, get it from the company's admin user)
    let screenshotInterval = 10;
    let idleLimitMinutes = 10;
    if (user.role === 'ADMIN') {
      screenshotInterval = user.screenshotInterval;
      idleLimitMinutes = user.idleLimitMinutes;
    } else if (user.role === 'EMPLOYEE' && user.companyId) {
      const admin = await prisma.user.findFirst({
        where: {
          companyId: user.companyId,
          role: 'ADMIN'
        }
      });
      if (admin) {
        screenshotInterval = admin.screenshotInterval;
        idleLimitMinutes = admin.idleLimitMinutes;
      }
    }

    // Calculate today's tracked seconds if user is an employee
    let todayTrackedSeconds = 0;
    if (user.role === 'EMPLOYEE') {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const todayLogs = await prisma.activityLog.findMany({
        where: {
          userId: user.id,
          timestamp: {
            gte: startOfToday
          }
        },
        select: { status: true, durationSeconds: true, idleSeconds: true }
      });
      todayTrackedSeconds = activityMetrics(todayLogs).trackedSeconds;
    }

    const isDesktopClient = req.headers.get('x-client-type') === 'desktop';
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
        ...((isDesktopClient || user.role === 'ADMIN') ? { screenshotInterval, idleLimitMinutes } : {})
        ,...((isDesktopClient || user.role === 'ADMIN') ? {
          timezone: user.timezone,
          workDays: user.workDays,
          shiftStartMinutes: user.shiftStartMinutes,
          shiftEndMinutes: user.shiftEndMinutes,
          targetMinutes: user.targetMinutes,
          maxShiftMinutes: user.maxShiftMinutes,
          maxBreakMinutes: user.maxBreakMinutes,
        } : {})
      },
      todayTrackedSeconds
    });
  } catch (err) {
    console.error('Verify session API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export function handleMeOPTIONS() {
  return new NextResponse(null, { status: 204 });
}
