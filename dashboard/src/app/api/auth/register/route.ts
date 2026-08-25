import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { encryptSession, hashPassword, setSessionCookie, UserRole } from '@/lib/auth';
import { consumeRateLimit, requestIp } from '@/lib/rate-limit';
import {
  normalizeCompanyId,
  normalizeEmail,
  normalizeName,
  validatePassword,
} from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const rateLimit = consumeRateLimit(`register:${requestIp(req)}`, 10, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const name = normalizeName(body.name);
    const email = normalizeEmail(body.email);
    const password = validatePassword(body.password);
    const role = body.role as UserRole;

    if (!name || !email) {
      return NextResponse.json({ error: 'Please enter a valid name and email address' }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password must be 8-128 characters and include a letter and number' },
        { status: 400 },
      );
    }

    if (role !== 'ADMIN' && role !== 'EMPLOYEE') {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    let finalCompanyId: string;

    if (role === 'ADMIN') {
      // Generate a new company ID
      finalCompanyId = `COMPANY-${crypto.randomUUID().replace(/-/g, '').toUpperCase().slice(0, 12)}`;
    } else {
      // Role is EMPLOYEE - verify company ID exists
      const companyId = normalizeCompanyId(body.companyId);
      if (!companyId) {
        return NextResponse.json({ error: 'Company ID (Invite Code) is required for employees' }, { status: 400 });
      }

      const companyExists = await prisma.user.findFirst({
        where: {
          companyId: { equals: companyId, mode: 'insensitive' },
          role: 'ADMIN',
        },
        select: { companyId: true },
      });

      if (!companyExists) {
        return NextResponse.json({ error: 'Invalid Company ID (Invite Code)' }, { status: 400 });
      }

      finalCompanyId = companyExists.companyId!;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        companyId: finalCompanyId
      }
    });

    const token = await encryptSession({ userId: newUser.id, role });
    const response = NextResponse.json({
      message: 'Registration successful',
      redirectTo: role === 'ADMIN' ? '/dashboard' : '/employee',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        companyId: newUser.companyId
      },
    });
    setSessionCookie(response, token);
    return response;
  } catch (err) {
    console.error('Registration API error:', err);
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Unable to create account right now' }, { status: 500 });
  }
}
