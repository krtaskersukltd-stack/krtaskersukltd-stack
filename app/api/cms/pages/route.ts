import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/security'
import { getCmsPages, saveCmsPages } from '@/lib/cms-store'
import { ensureCmsSeeded } from '@/lib/cms-seed'

export async function GET() {
  await ensureCmsSeeded()
  const pages = await getCmsPages()
  return NextResponse.json(pages, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    await saveCmsPages(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save pages' }, { status: 500 })
  }
}
