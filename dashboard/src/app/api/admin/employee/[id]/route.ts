import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';
import { del } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
import { activityMetrics, formatDuration } from '@/lib/activity-metrics';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: employeeId } = await params;
    const admin = await getUserWithRole(req, 'ADMIN');
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!admin.companyId) {
      return NextResponse.json({ error: 'Admin details not found' }, { status: 404 });
    }

    // Verify employee belongs to the same company
    const employee = await prisma.user.findFirst({
      where: {
        id: employeeId,
        companyId: admin.companyId,
        role: 'EMPLOYEE'
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    // Parse date parameter
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get('date'); // YYYY-MM-DD
    
    let targetDate = new Date();
    if (dateStr) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
      }
      targetDate = new Date(`${dateStr}T00:00:00`);
      if (!Number.isFinite(targetDate.getTime())) {
        return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
      }
    }

    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch activity logs for this day
    const activityLogs = await prisma.activityLog.findMany({
      where: {
        userId: employeeId,
        timestamp: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      orderBy: {
        timestamp: 'asc'
      }
    });

    // Fetch screenshots for this day
    const screenshots = await prisma.screenshot.findMany({
      where: {
        userId: employeeId,
        timestamp: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      orderBy: {
        timestamp: 'desc' // Latest screenshots first
      }
    });

    const workReports = await prisma.workReport.findMany({
      where: {
        userId: employeeId,
        createdAt: { gte: startOfDay, lte: endOfDay },
      },
      orderBy: { createdAt: 'desc' },
      select: { id: true, type: true, note: true, emailSent: true, createdAt: true, endedAt: true, durationSeconds: true },
    });

    // Calculate time metrics
    const timing = activityMetrics(activityLogs);
    const totalMinutes = Math.round(timing.trackedSeconds / 60);
    const activeMinutes = Math.round(timing.activeSeconds / 60);
    const idleMinutes = Math.round(timing.idleSeconds / 60);
    const breakSeconds = workReports.reduce((sum, report) => sum + (report.type === 'BREAK' ? report.durationSeconds || 0 : 0), 0);

    // Calculate total keystrokes and mouse clicks for the day
    let totalKeystrokes = 0;
    let totalMouseClicks = 0;
    activityLogs.forEach(log => {
      totalKeystrokes += log.keystrokes || 0;
      totalMouseClicks += log.mouseClicks || 0;
    });

    // If activity logs keystrokes/clicks are 0 (e.g. legacy logs), fallback to screenshots sum if available
    if (totalKeystrokes === 0 && totalMouseClicks === 0) {
      screenshots.forEach(shot => {
        totalKeystrokes += shot.keystrokes || 0;
        totalMouseClicks += shot.mouseClicks || 0;
      });
    }

    // Calculate Top Used Apps & Web Sites from activityLogs
    const appCounts: Record<string, { process: string; title: string; count: number }> = {};
    activityLogs.forEach(log => {
      const proc = log.appProcess || 'Idle';
      const title = log.appTitle || 'No activity';

      // Idle time belongs in the timeline metrics, not in "Top Apps". Also
      // suppress records produced by older clients whose window helper failed.
      if (
        log.status === 'IDLE' ||
        proc.toLowerCase() === 'idle' ||
        proc.toLowerCase() === 'unknown' ||
        title.toLowerCase() === 'idle' ||
        title.toLowerCase() === 'unknown window'
      ) return;

      // Group key by Process + Title/Site for detailed app & website tracking
      const key = `${proc.toLowerCase()}:::${title.toLowerCase()}`;
      if (!appCounts[key]) {
        appCounts[key] = {
          process: proc,
          title: title,
          count: 0
        };
      }
      appCounts[key].count += 1; // 1 log = 1 minute
    });

    const identifiedMinutes = Object.values(appCounts).reduce((sum, app) => sum + app.count, 0);
    const topApps = Object.values(appCounts)
      .sort((a, b) => b.count - a.count)
      .map(app => ({
        process: app.process,
        title: app.title,
        minutes: app.count,
        percentage: identifiedMinutes > 0 ? Math.round((app.count / identifiedMinutes) * 100) : 0
      }))
      .slice(0, 8);

    return NextResponse.json({
      employee,
      metrics: {
        trackedTimeStr: formatDuration(timing.trackedSeconds),
        totalMinutes,
        activeMinutes,
        idleMinutes,
        trackedSeconds: timing.trackedSeconds,
        activeSeconds: timing.activeSeconds,
        idleSeconds: timing.idleSeconds,
        breakSeconds,
        breakTimeStr: formatDuration(breakSeconds),
        productivity: timing.productivity,
        totalKeystrokes,
        totalMouseClicks
      },
      activityLogs,
      screenshots: screenshots.map((screenshot) => ({
        ...screenshot,
        filePath: `/api/admin/screenshots/${screenshot.id}`,
      })),
      topApps,
      workReports,
    });
  } catch (err) {
    console.error('Admin employee details API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: employeeId } = await params;
    const admin = await getUserWithRole(req, 'ADMIN');
    if (!admin?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const employee = await prisma.user.findFirst({
      where: { id: employeeId, companyId: admin.companyId, role: 'EMPLOYEE' },
      select: { id: true, screenshots: { select: { filePath: true } } },
    });
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    const blobUrls = employee.screenshots
      .map((item) => item.filePath)
      .filter((filePath) => filePath.startsWith('https://') && filePath.includes('.blob.vercel-storage.com'));
    if (blobUrls.length > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
      await del(blobUrls).catch((error) => console.error('Employee blob cleanup failed:', error));
    }

    const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads', 'screenshots');
    for (const screenshot of employee.screenshots) {
      if (!screenshot.filePath.startsWith('/uploads/screenshots/')) continue;
      const localPath = path.resolve(process.cwd(), 'public', screenshot.filePath.replace(/^\//, ''));
      if (localPath.startsWith(`${uploadsRoot}${path.sep}`)) {
        await fs.unlink(localPath).catch(() => undefined);
      }
    }

    const deleted = await prisma.user.deleteMany({
      where: { id: employeeId, companyId: admin.companyId, role: 'EMPLOYEE' },
    });
    if (deleted.count !== 1) {
      return NextResponse.json({ error: 'Employee could not be removed' }, { status: 409 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Remove employee API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
