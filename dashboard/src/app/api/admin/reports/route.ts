import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';

function csvCell(value: unknown) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

export async function GET(req: NextRequest) {
  const admin = await getUserWithRole(req, 'ADMIN');
  if (!admin?.companyId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const end = new Date(url.searchParams.get('to') || Date.now());
  const start = new Date(url.searchParams.get('from') || end.getTime() - 6 * 24 * 60 * 60_000);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start || end.getTime() - start.getTime() > 92 * 24 * 60 * 60_000) {
    return NextResponse.json({ error: 'Report range must be between 1 and 92 days' }, { status: 400 });
  }

  const employees = await prisma.user.findMany({
    where: { companyId: admin.companyId, role: 'EMPLOYEE' },
    select: { id: true, name: true, email: true, targetMinutes: true },
    orderBy: { name: 'asc' },
  });
  const ids = employees.map((item) => item.id);
  const [logs, sessions, manual] = await Promise.all([
    prisma.activityLog.findMany({
      where: { userId: { in: ids }, timestamp: { gte: start, lte: end } },
      orderBy: { timestamp: 'asc' },
    }),
    prisma.trackingSession.findMany({
      where: { companyId: admin.companyId, startedAt: { gte: start, lte: end } },
      orderBy: { startedAt: 'asc' },
    }),
    prisma.manualTimeRequest.findMany({
      where: { companyId: admin.companyId, status: 'APPROVED', startAt: { gte: start, lte: end } },
    }),
  ]);

  const rows = employees.map((employee) => {
    const ownLogs = logs.filter((item) => item.userId === employee.id);
    const ownSessions = sessions.filter((item) => item.userId === employee.id);
    const ownManual = manual.filter((item) => item.userId === employee.id);
    let trackedSeconds = 0;
    let idleSeconds = 0;
    let productiveSeconds = 0;
    let unproductiveSeconds = 0;
    let neutralSeconds = 0;
    for (const log of ownLogs) {
      const duration = Math.min(120, Math.max(1, log.durationSeconds));
      const idle = Math.min(duration, Math.max(0, log.idleSeconds));
      const active = duration - idle;
      trackedSeconds += duration;
      idleSeconds += idle;
      if (log.productivityCategory === 'PRODUCTIVE') productiveSeconds += active;
      else if (log.productivityCategory === 'UNPRODUCTIVE') unproductiveSeconds += active;
      else neutralSeconds += active;
    }
    const manualSeconds = ownManual.reduce((sum, item) => sum + Math.max(0, Math.floor((item.endAt.getTime() - item.startAt.getTime()) / 1000)), 0);
    const ratedSeconds = productiveSeconds + unproductiveSeconds;
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      trackedSeconds,
      activeSeconds: trackedSeconds - idleSeconds,
      idleSeconds,
      breakSeconds: ownSessions.reduce((sum, item) => sum + item.breakSeconds, 0),
      manualSeconds,
      productiveSeconds,
      neutralSeconds,
      unproductiveSeconds,
      productivity: ratedSeconds > 0 ? Math.round(productiveSeconds / ratedSeconds * 100) : 0,
      checkIn: ownSessions[0]?.startedAt || null,
      checkOut: ownSessions[ownSessions.length - 1]?.endedAt || null,
      reviewRequired: ownSessions.some((item) => item.reviewRequired),
    };
  });

  if (url.searchParams.get('format') === 'csv') {
    const header = ['Employee', 'Email', 'Check In', 'Check Out', 'Tracked Hours', 'Active Hours', 'Idle Hours', 'Break Hours', 'Manual Hours', 'Productivity %', 'Needs Review'];
    const lines = [header.map(csvCell).join(',')];
    for (const row of rows) {
      lines.push([
        row.name, row.email, row.checkIn?.toISOString() || '', row.checkOut?.toISOString() || '',
        (row.trackedSeconds / 3600).toFixed(2), (row.activeSeconds / 3600).toFixed(2),
        (row.idleSeconds / 3600).toFixed(2), (row.breakSeconds / 3600).toFixed(2),
        (row.manualSeconds / 3600).toFixed(2), row.productivity, row.reviewRequired ? 'YES' : 'NO',
      ].map(csvCell).join(','));
    }
    return new NextResponse(lines.join('\r\n'), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="kr-tasker-report-${start.toISOString().slice(0, 10)}-${end.toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  const appUsage = new Map<string, { seconds: number; category: string }>();
  for (const log of logs) {
    const name = log.appProcess || 'Unknown';
    const item = appUsage.get(name) || { seconds: 0, category: log.productivityCategory };
    item.seconds += Math.max(0, log.durationSeconds - log.idleSeconds);
    appUsage.set(name, item);
  }
  return NextResponse.json({
    from: start,
    to: end,
    rows,
    appUsage: [...appUsage.entries()].map(([name, value]) => ({ name, ...value })).sort((a, b) => b.seconds - a.seconds).slice(0, 30),
  });
}
