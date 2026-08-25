import 'server-only';

import { prisma } from '@/lib/prisma';

export function companyDateKey(date: Date, timezone = 'Asia/Karachi') {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

export async function productivityCategory(
  companyId: string,
  appProcess?: string | null,
  appTitle?: string | null,
) {
  const rules = await prisma.productivityRule.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
  });
  const process = (appProcess || '').toLowerCase();
  const title = (appTitle || '').toLowerCase();
  const matched = rules.find((rule) => {
    const candidate = rule.matchType === 'TITLE' ? title : process;
    return candidate.includes(rule.pattern.toLowerCase());
  });
  return matched?.category || 'NEUTRAL';
}

export async function audit(
  companyId: string,
  actorUserId: string | null,
  action: string,
  entityType: string,
  entityId?: string | null,
  details?: unknown,
) {
  await prisma.auditLog.create({
    data: {
      companyId,
      actorUserId,
      action,
      entityType,
      entityId: entityId || null,
      details: details == null ? null : JSON.stringify(details).slice(0, 4000),
    },
  });
}

export async function createAlertOnce(input: {
  companyId: string;
  userId?: string | null;
  type: string;
  severity?: string;
  message: string;
  metadata?: unknown;
  withinMinutes?: number;
}) {
  const since = new Date(Date.now() - (input.withinMinutes ?? 60) * 60_000);
  const existing = await prisma.alert.findFirst({
    where: {
      companyId: input.companyId,
      userId: input.userId || null,
      type: input.type,
      createdAt: { gte: since },
    },
  });
  if (existing) return existing;
  return prisma.alert.create({
    data: {
      companyId: input.companyId,
      userId: input.userId || null,
      type: input.type,
      severity: input.severity || 'WARNING',
      message: input.message,
      metadata: input.metadata == null ? null : JSON.stringify(input.metadata).slice(0, 4000),
    },
  });
}
