import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/security'
import { getCmsEnquiries, saveCmsEnquiries } from '@/lib/cms-store'
import { ensureCmsSeeded } from '@/lib/cms-seed'

export async function GET() {
  await ensureCmsSeeded()
  const enquiries = await getCmsEnquiries()
  return NextResponse.json(enquiries, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    await saveCmsEnquiries(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save enquiries' }, { status: 500 })
  }
}
