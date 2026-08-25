import 'server-only';

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest, UserRole } from '@/lib/auth';

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId: string | null;
  screenshotInterval: number;
  idleLimitMinutes: number;
  timezone: string;
  workDays: string;
  shiftStartMinutes: number;
  shiftEndMinutes: number;
  targetMinutes: number;
  maxShiftMinutes: number;
  maxBreakMinutes: number;
  screenshotRetentionDays: number;
  manualTimeRequiresApproval: boolean;
}

export async function getAuthenticatedUser(req: NextRequest): Promise<AuthenticatedUser | null> {
  const session = await getSessionFromRequest(req);
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      companyId: true,
      screenshotInterval: true,
      idleLimitMinutes: true,
      timezone: true,
      workDays: true,
      shiftStartMinutes: true,
      shiftEndMinutes: true,
      targetMinutes: true,
      maxShiftMinutes: true,
      maxBreakMinutes: true,
      screenshotRetentionDays: true,
      manualTimeRequiresApproval: true,
    },
  });

  if (!user || user.role !== session.role || (user.role !== 'ADMIN' && user.role !== 'EMPLOYEE')) {
    return null;
  }

  return user as AuthenticatedUser;
}

export async function getUserWithRole(
  req: NextRequest,
  role: UserRole,
): Promise<AuthenticatedUser | null> {
  const user = await getAuthenticatedUser(req);
  return user?.role === role ? user : null;
}
