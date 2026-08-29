import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/security'
import { getCmsServices, saveCmsServices } from '@/lib/cms-store'
import { ensureCmsSeeded } from '@/lib/cms-seed'

export async function GET() {
  try {
    const services = await getCmsServices()
    if (Array.isArray(services) && services.length > 0) {
      return NextResponse.json(services, { headers: { 'Cache-Control': 'no-store' } })
    }
  } catch (err) {
    console.error('API /api/cms/services error:', err)
  }

  const fallback = (await import('@/data/cms/services.json')).default
  return NextResponse.json(fallback, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    await saveCmsServices(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save services' }, { status: 500 })
  }
}
