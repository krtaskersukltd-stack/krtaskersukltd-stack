import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/security'

export async function GET() {
  const authenticated = await isAdminAuthenticated()
  return NextResponse.json(
    { authenticated },
    { status: authenticated ? 200 : 401, headers: { 'Cache-Control': 'no-store' } },
  )
}
