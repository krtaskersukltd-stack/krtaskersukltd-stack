import { NextResponse } from 'next/server'
import { adminCookie, hasValidOrigin } from '@/lib/security'

export async function POST(request: Request) {
  if (!hasValidOrigin(request)) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }

  const response = NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } })
  response.cookies.set(adminCookie.name, '', {
    ...adminCookie.options,
    maxAge: 0,
    expires: new Date(0),
  })
  return response
}
