import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  encryptSession,
  hashPassword,
  needsPasswordRehash,
  setSessionCookie,
  verifyPassword,
  UserRole,
} from '@/lib/auth';
import { consumeRateLimit, requestIp } from '@/lib/rate-limit';
import { normalizeEmail } from '@/lib/validation';
import { activityMetrics } from '@/lib/activity-metrics';

export async function handleLoginPOST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const email = normalizeEmail(body?.email);
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const rateLimit = consumeRateLimit(
      `login:${requestIp(req)}:${email}`,
      10,
      15 * 60 * 1000,
    );
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (user.role !== 'ADMIN' && user.role !== 'EMPLOYEE') {
      return NextResponse.json({ error: 'Account role is invalid' }, { status: 403 });
    }

    if (needsPasswordRehash(user.password)) {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: await hashPassword(password) },
      });
    }

    const sessionData = {
      userId: user.id,
      role: user.role as UserRole,
    };

    const token = await encryptSession(sessionData);

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

    // Create response
    const isDesktopClient =
      req.headers.get('x-client-type') === 'desktop' ||
      /\bElectron\//i.test(req.headers.get('user-agent') || '');
    const response = NextResponse.json({
      message: 'Login successful',
      ...(isDesktopClient ? { token } : {}),
      redirectTo: user.role === 'ADMIN' ? '/dashboard' : '/employee',
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

    // Set cookie for web client
    setSessionCookie(response, token);

    return response;
  } catch (err: any) {
    console.error('Login API error:', err);
    return NextResponse.json({
      error: 'Unable to sign in right now',
      details: err?.message || String(err),
      stack: err?.stack,
    }, { status: 500 });
  }
}

export function handleLoginOPTIONS() {
  return new NextResponse(null, { status: 204 });
}
