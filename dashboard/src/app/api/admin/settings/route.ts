import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';
import { audit } from '@/lib/operations';

export async function GET(req: NextRequest) {
  const admin = await getUserWithRole(req, 'ADMIN');
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({
    screenshotInterval: admin.screenshotInterval,
    idleLimitMinutes: admin.idleLimitMinutes,
    timezone: admin.timezone,
    workDays: admin.workDays,
    shiftStartMinutes: admin.shiftStartMinutes,
    shiftEndMinutes: admin.shiftEndMinutes,
    targetMinutes: admin.targetMinutes,
    maxShiftMinutes: admin.maxShiftMinutes,
    maxBreakMinutes: admin.maxBreakMinutes,
    screenshotRetentionDays: admin.screenshotRetentionDays,
    manualTimeRequiresApproval: admin.manualTimeRequiresApproval,
  });
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getUserWithRole(req, 'ADMIN');
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const screenshotInterval = body?.screenshotInterval;
    const idleLimitMinutes = body?.idleLimitMinutes;

    if (!Number.isInteger(screenshotInterval) || screenshotInterval < 1 || screenshotInterval > 60) {
      return NextResponse.json({ error: 'Invalid interval value' }, { status: 400 });
    }
    if (!Number.isInteger(idleLimitMinutes) || idleLimitMinutes < 1 || idleLimitMinutes > 120) {
      return NextResponse.json({ error: 'Idle limit must be between 1 and 120 minutes' }, { status: 400 });
    }

    const boundedInt = (value: unknown, min: number, max: number, fallback: number) =>
      Number.isInteger(value) ? Math.min(max, Math.max(min, Number(value))) : fallback;
    const settings = {
      screenshotInterval,
      idleLimitMinutes,
      timezone: typeof body?.timezone === 'string' ? body.timezone.slice(0, 80) : admin.timezone,
      workDays: typeof body?.workDays === 'string' ? body.workDays.slice(0, 20) : admin.workDays,
      shiftStartMinutes: boundedInt(body?.shiftStartMinutes, 0, 1439, admin.shiftStartMinutes),
      shiftEndMinutes: boundedInt(body?.shiftEndMinutes, 0, 1439, admin.shiftEndMinutes),
      targetMinutes: boundedInt(body?.targetMinutes, 60, 1440, admin.targetMinutes),
      maxShiftMinutes: boundedInt(body?.maxShiftMinutes, 60, 1440, admin.maxShiftMinutes),
      maxBreakMinutes: boundedInt(body?.maxBreakMinutes, 5, 480, admin.maxBreakMinutes),
      screenshotRetentionDays: boundedInt(body?.screenshotRetentionDays, 1, 365, admin.screenshotRetentionDays),
      manualTimeRequiresApproval: body?.manualTimeRequiresApproval !== false,
    };

    await prisma.user.update({
      where: { id: admin.id },
      data: settings
    });

    if (body?.applyToAll === true && admin.companyId) {
      await prisma.user.updateMany({
        where: { companyId: admin.companyId, role: 'EMPLOYEE' },
        data: {
          screenshotInterval: settings.screenshotInterval,
          idleLimitMinutes: settings.idleLimitMinutes,
          timezone: settings.timezone,
          workDays: settings.workDays,
          shiftStartMinutes: settings.shiftStartMinutes,
          shiftEndMinutes: settings.shiftEndMinutes,
          targetMinutes: settings.targetMinutes,
          maxShiftMinutes: settings.maxShiftMinutes,
          maxBreakMinutes: settings.maxBreakMinutes,
          screenshotRetentionDays: settings.screenshotRetentionDays,
          manualTimeRequiresApproval: settings.manualTimeRequiresApproval,
        },
      });
    }
    if (admin.companyId) await audit(admin.companyId, admin.id, 'UPDATE_SETTINGS', 'Company', admin.companyId, settings);

    return NextResponse.json({
      message: 'Settings updated successfully',
      ...settings
    });
  } catch (err) {
    console.error('Update settings API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
