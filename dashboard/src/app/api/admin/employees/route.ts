import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserWithRole } from '@/lib/authorization';
import { activityMetrics, formatDuration } from '@/lib/activity-metrics';

export async function GET(req: NextRequest) {
  try {
    const admin = await getUserWithRole(req, 'ADMIN');
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!admin.companyId) {
      return NextResponse.json({ error: 'Admin details not found' }, { status: 404 });
    }

    // Fetch all employees in this company
    const employees = await prisma.user.findMany({
      where: {
        companyId: admin.companyId,
        role: 'EMPLOYEE'
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const employeeList = [];

    for (const emp of employees) {
      // Get today's activity logs count to calculate total minutes
      const todayLogs = await prisma.activityLog.findMany({
        where: {
          userId: emp.id,
          timestamp: {
            gte: startOfToday
          }
        }
      });

      const metrics = activityMetrics(todayLogs);
      const trackedTime = formatDuration(metrics.trackedSeconds);

      // Determine current status based on the latest activity log
      const latestLog = await prisma.activityLog.findFirst({
        where: { userId: emp.id },
        orderBy: { timestamp: 'desc' }
      });

      let status = 'OFFLINE';
      let currentTask = '';
      let appProcess = '';
      let appTitle = '';
      let currentIdleSeconds = 0;
      
      if (latestLog) {
        const diffMs = Date.now() - new Date(latestLog.timestamp).getTime();
        // If latest log was updated in the last 3 minutes (180,000ms), show status
        if (diffMs <= 180000) {
          status = latestLog.status;
          currentTask = latestLog.currentTask;
          appProcess = latestLog.appProcess || '';
          appTitle = latestLog.appTitle || '';
          currentIdleSeconds = latestLog.status === 'IDLE' ? latestLog.continuousIdleSeconds : 0;
        }
      }

      const latestReport = await prisma.workReport.findFirst({
        where: { userId: emp.id },
        orderBy: { createdAt: 'desc' },
        select: { type: true, createdAt: true, endedAt: true },
      });
      let breakSeconds = 0;
      if (latestReport?.type === 'BREAK' && !latestReport.endedAt) {
        status = 'BREAK';
        currentTask = 'On break';
        breakSeconds = Math.max(0, Math.floor((Date.now() - latestReport.createdAt.getTime()) / 1000));
      } else if (latestReport?.type === 'STOP' && (!latestLog || latestReport.createdAt > latestLog.timestamp)) {
        status = 'OFFLINE';
        currentTask = '';
      }

      const lastSeen = latestLog ? latestLog.timestamp.toISOString() : emp.createdAt.toISOString();

      employeeList.push({
        id: emp.id,
        name: emp.name,
        email: emp.email,
        trackedTime,
        status,
        currentTask,
        appProcess,
        appTitle,
        lastSeen,
        idleSeconds: metrics.idleSeconds,
        currentIdleSeconds,
        longIdle: currentIdleSeconds >= admin.idleLimitMinutes * 60,
        breakSeconds,
        productivity: metrics.productivity
      });
    }

    // Sort priority: ACTIVE (1) -> IDLE (2) -> OFFLINE (3), then by lastSeen (descending)
    const statusWeight: Record<string, number> = {
      ACTIVE: 1,
      IDLE: 2,
      BREAK: 3,
      OFFLINE: 4
    };

    employeeList.sort((a, b) => {
      const weightA = statusWeight[a.status] || 3;
      const weightB = statusWeight[b.status] || 3;

      if (weightA !== weightB) {
        return weightA - weightB;
      }

      // Secondary sort: Most recent lastSeen first
      const timeA = new Date(a.lastSeen).getTime();
      const timeB = new Date(b.lastSeen).getTime();
      return timeB - timeA;
    });

    return NextResponse.json({
      companyId: admin.companyId,
      screenshotInterval: admin.screenshotInterval,
      idleLimitMinutes: admin.idleLimitMinutes,
      employees: employeeList
    });
  } catch (err) {
    console.error('Admin employees API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
