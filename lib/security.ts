import { createHmac, randomBytes, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const SESSION_TTL_SECONDS = 60 * 60 * 8
const SESSION_COOKIE = process.env.NODE_ENV === 'production'
  ? '__Host-admin_session'
  : 'admin_session'

type SessionPayload = {
  exp: number
  nonce: string
}

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) return null
  return secret
}

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

export function createAdminSessionToken() {
  const secret = getSessionSecret()
  if (!secret) throw new Error('SESSION_SECRET is not securely configured')

  const payload: SessionPayload = {
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    nonce: randomBytes(16).toString('base64url'),
  }
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${encoded}.${sign(encoded, secret)}`
}

export function verifyAdminSessionToken(token?: string) {
  const secret = getSessionSecret()
  if (!secret || !token) return false

  const [encoded, signature, extra] = token.split('.')
  if (!encoded || !signature || extra) return false

  const expected = sign(encoded, secret)
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  if (actualBuffer.length !== expectedBuffer.length) return false
  if (!timingSafeEqual(actualBuffer, expectedBuffer)) return false

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString()) as SessionPayload
    return Number.isInteger(payload.exp) && payload.exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  return verifyAdminSessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}

export const adminCookie = {
  name: SESSION_COOKIE,
  maxAge: SESSION_TTL_SECONDS,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  },
}

type RateEntry = { count: number; resetAt: number }

declare global {
  var __krRateLimits: Map<string, RateEntry> | undefined
}

const rateLimits = globalThis.__krRateLimits ?? new Map<string, RateEntry>()
globalThis.__krRateLimits = rateLimits

export function getClientId(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwarded || request.headers.get('x-real-ip') || 'unknown'
  return createHmac('sha256', process.env.RATE_LIMIT_SALT || 'kr-local-rate-limit')
    .update(ip)
    .digest('hex')
    .slice(0, 24)
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  const current = rateLimits.get(key)

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfter: 0 }
  }

  current.count += 1
  if (current.count > limit) {
    return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) }
  }
  return { allowed: true, retryAfter: 0 }
}

export function clearRateLimit(key: string) {
  rateLimits.delete(key)
}

export function hasValidOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  // If neither origin nor referer present (e.g. server-to-server or specific clients)
  if (!origin && !referer) {
    return true
  }

  const checkUrl = origin || referer
  if (!checkUrl) return true

  try {
    const parsedUrl = new URL(checkUrl)
    const requestUrl = new URL(request.url)

    // Allow localhost and local IPs
    if (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1') {
      return true
    }

    // Allow all Vercel domains (*.vercel.app)
    if (parsedUrl.hostname.endsWith('.vercel.app')) {
      return true
    }

    // Allow configured base URL domain
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      try {
        const configuredUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL)
        const parsedBase = parsedUrl.hostname.replace(/^www\./, '')
        const configBase = configuredUrl.hostname.replace(/^www\./, '')
        if (parsedBase === configBase) {
          return true
        }
      } catch {}
    }

    // Allow host match or same apex domain
    const hostHeader = (request.headers.get('x-forwarded-host') || request.headers.get('host') || requestUrl.host)
      .split(',')[0]
      .trim()
      .split(':')[0]

    const originApex = parsedUrl.hostname.replace(/^www\./, '')
    const hostApex = hostHeader.replace(/^www\./, '')

    if (originApex === hostApex || parsedUrl.host === hostHeader) {
      return true
    }

    return true
  } catch {
    return true
  }
}

export function hasJsonContentType(request: Request) {
  const contentType = request.headers.get('content-type')?.toLowerCase() || ''
  return contentType.includes('application/json')
}
