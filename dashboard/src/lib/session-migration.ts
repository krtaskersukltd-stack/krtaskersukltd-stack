import 'server-only';

import crypto from 'node:crypto';
import { UserRole } from '@/lib/auth';

type MigrationPayload = {
  version: 1;
  userId: string;
  role: UserRole;
  exp: number;
};

function signingKey(passwordHash: string): Buffer {
  return crypto.createHash('sha256').update(`kr-tasker-session-migration:${passwordHash}`).digest();
}

export function createMigrationTicket(userId: string, role: UserRole, passwordHash: string): string {
  const payload: MigrationPayload = {
    version: 1,
    userId,
    role,
    exp: Math.floor(Date.now() / 1000) + 10 * 60,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', signingKey(passwordHash)).update(encoded).digest('base64url');
  return `v1.${encoded}.${signature}`;
}

export function verifyMigrationTicket(ticket: string, passwordHash: string): MigrationPayload | null {
  try {
    if (ticket.length > 4096) return null;
    const [version, encoded, signatureText] = ticket.split('.');
    if (version !== 'v1' || !encoded || !signatureText) return null;
    const expected = crypto.createHmac('sha256', signingKey(passwordHash)).update(encoded).digest();
    const actual = Buffer.from(signatureText, 'base64url');
    if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) return null;
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as MigrationPayload;
    if (
      payload.version !== 1 ||
      typeof payload.userId !== 'string' ||
      (payload.role !== 'ADMIN' && payload.role !== 'EMPLOYEE') ||
      typeof payload.exp !== 'number' ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) return null;
    return payload;
  } catch {
    return null;
  }
}
