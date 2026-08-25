import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/authorization';
import { prisma } from '@/lib/prisma';
import { createMigrationTicket } from '@/lib/session-migration';

export async function handleMigrationTicketPOST(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const credentials = await prisma.user.findUnique({
    where: { id: user.id },
    select: { password: true },
  });
  if (!credentials) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  return NextResponse.json({
    ticket: createMigrationTicket(user.id, user.role, credentials.password),
  }, { headers: { 'Cache-Control': 'no-store' } });
}
