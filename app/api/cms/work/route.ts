import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/security'
import { getCmsWork, saveCmsWork } from '@/lib/cms-store'
import { ensureCmsSeeded } from '@/lib/cms-seed'

export async function GET() {
  await ensureCmsSeeded()
  const work = await getCmsWork()
  return NextResponse.json(work, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    await saveCmsWork(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save case studies' }, { status: 500 })
  }
}
