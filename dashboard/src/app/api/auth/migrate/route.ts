import { NextRequest, NextResponse } from 'next/server';
import { encryptSession, setSessionCookie, UserRole } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { verifyMigrationTicket } from '@/lib/session-migration';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const ticket = typeof body?.ticket === 'string' ? body.ticket : '';
  if (!ticket || ticket.length > 4096) {
    return NextResponse.json({ error: 'Invalid migration ticket' }, { status: 400 });
  }

  let userId = '';
  try {
    const [, encoded] = ticket.split('.');
    const candidate = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as { userId?: unknown };
    userId = typeof candidate.userId === 'string' ? candidate.userId : '';
  } catch {
    return NextResponse.json({ error: 'Invalid migration ticket' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || (user.role !== 'ADMIN' && user.role !== 'EMPLOYEE')) {
    return NextResponse.json({ error: 'Invalid migration ticket' }, { status: 401 });
  }
  const payload = verifyMigrationTicket(ticket, user.password);
  if (!payload || payload.userId !== user.id || payload.role !== user.role) {
    return NextResponse.json({ error: 'Invalid migration ticket' }, { status: 401 });
  }

  const token = await encryptSession({ userId: user.id, role: user.role as UserRole });
  const response = NextResponse.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, companyId: user.companyId },
  }, { headers: { 'Cache-Control': 'no-store' } });
  setSessionCookie(response, token);
  return response;
}
