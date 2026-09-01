import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/security'
import { getCmsWork, saveCmsWork } from '@/lib/cms-store'
import { ensureCmsSeeded } from '@/lib/cms-seed'

export async function GET() {
  try {
    const work = await getCmsWork()
    if (Array.isArray(work) && work.length > 0) {
      return NextResponse.json(work, { headers: { 'Cache-Control': 'no-store' } })
    }
  } catch (err) {
    console.error('API /api/cms/work error:', err)
  }

  const fallback = (await import('@/data/cms/work.json')).default
  return NextResponse.json(fallback, { headers: { 'Cache-Control': 'no-store' } })
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
