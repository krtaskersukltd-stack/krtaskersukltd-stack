import { NextResponse } from 'next/server'
import { getCmsNavigation, saveCmsNavigation } from '@/lib/cms-store'
import { isAdminAuthenticated } from '@/lib/security'
import type { NavItemRecord } from '@/lib/cms-types'

export async function GET() {
  try {
    const items = await getCmsNavigation()
    return NextResponse.json(items, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Failed to fetch CMS navigation:', error)
    return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const items: NavItemRecord[] = await request.json()
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid navigation payload' }, { status: 400 })
    }

    await saveCmsNavigation(items)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to save CMS navigation:', error)
    return NextResponse.json({ error: 'Failed to save navigation' }, { status: 500 })
  }
}
