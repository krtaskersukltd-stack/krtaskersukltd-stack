import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import {
  adminCookie,
  checkRateLimit,
  clearRateLimit,
  createAdminSessionToken,
  getClientId,
  hasJsonContentType,
  hasValidOrigin,
} from '@/lib/security'

const DEFAULT_HASH = '$2b$10$5QlHn65b5EOAu3Y5oZxqzeKH/wuI/zrsyejPGwVo38KQuz/RZh9FG' // AdminPassword123!

export async function POST(request: Request) {
  const clientKey = `admin-login:${getClientId(request)}`
  const rate = checkRateLimit(clientKey, 5, 15 * 60 * 1000)
  if (!rate.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many attempts. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfter), 'Cache-Control': 'no-store' } },
    )
  }

  if (!hasValidOrigin(request) || !hasJsonContentType(request)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const password = typeof body?.password === 'string' ? body.password : ''
    if (password.length < 8 || password.length > 128) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    const passwordHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH
    if (!passwordHash || !/^\$2[aby]\$\d{2}\$/.test(passwordHash)) {
      console.error('ADMIN_PASSWORD_HASH is not securely configured')
      return NextResponse.json({ success: false, error: 'Admin login is not configured' }, { status: 503 })
    }

    const valid = await bcrypt.compare(password, passwordHash)
    if (!valid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } })
    response.cookies.set(adminCookie.name, createAdminSessionToken(), {
      ...adminCookie.options,
      maxAge: adminCookie.maxAge,
    })
    clearRateLimit(clientKey)
    return response
  } catch (error) {
    console.error('Login route error:', error)
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
