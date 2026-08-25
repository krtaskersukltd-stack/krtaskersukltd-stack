import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { consumeRateLimit, requestIp } from '@/lib/rate-limit';
import { normalizeEmail } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const email = normalizeEmail(body?.email);

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const rateLimit = consumeRateLimit(`forgot:${requestIp(req)}`, 5, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many reset requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } },
      );
    }

    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });

    // Always return the same message so attackers cannot enumerate registered accounts.
    if (!user) return NextResponse.json({ message: 'If that account exists, a reset code was created.' });

    // Generate random 6-digit code
    const resetCode = crypto.randomInt(100000, 1000000).toString();
    const resetCodeHash = crypto.createHash('sha256').update(resetCode).digest('hex');
    const resetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetCode: resetCodeHash,
        resetExpires
      }
    });

    // In a live server, we would send this code via email.
    // For local/development, we return it in response so they can test it easily!
    return NextResponse.json({
      message: process.env.NODE_ENV === 'production'
        ? 'If that account exists, a reset code was created. Contact your administrator to receive it.'
        : 'Reset code generated for local testing.',
      ...(process.env.NODE_ENV !== 'production' ? { code: resetCode } : {}),
    });
  } catch (err) {
    console.error('Forgot password API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
