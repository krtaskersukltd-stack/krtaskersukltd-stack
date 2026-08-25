import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { consumeRateLimit, requestIp } from '@/lib/rate-limit';
import { normalizeEmail, validatePassword } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const email = normalizeEmail(body?.email);
    const code = typeof body?.code === 'string' ? body.code.trim() : '';
    const newPassword = validatePassword(body?.newPassword);

    if (!email || !code || !newPassword) {
      return NextResponse.json({ error: 'Valid email, code, and strong password are required' }, { status: 400 });
    }

    const rateLimit = consumeRateLimit(
      `reset:${requestIp(req)}:${email}`,
      10,
      60 * 60 * 1000,
    );
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many reset attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.resetCode || !user.resetExpires) {
      return NextResponse.json({ error: 'Reset request not found or expired' }, { status: 400 });
    }

    // Verify expiry
    if (new Date() > new Date(user.resetExpires)) {
      return NextResponse.json({ error: 'Reset code has expired. Please request a new one.' }, { status: 400 });
    }

    // Verify code matches
    const submittedCodeHash = crypto.createHash('sha256').update(code).digest('hex');
    if (
      user.resetCode.length !== submittedCodeHash.length ||
      !crypto.timingSafeEqual(Buffer.from(user.resetCode), Buffer.from(submittedCodeHash))
    ) {
      return NextResponse.json({ error: 'Invalid reset code' }, { status: 400 });
    }

    // Hash new password and update user record
    const hashedPassword = await hashPassword(newPassword);
    
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetCode: null,
        resetExpires: null
      }
    });

    return NextResponse.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
