import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'
import { checkRateLimit, getClientId, hasJsonContentType, hasValidOrigin } from '@/lib/security'
import { getCmsEnquiries, saveCmsEnquiries } from '@/lib/cms-store'
import type { ContactEnquiryRecord } from '@/lib/cms-types'

export async function POST(request: Request) {
  const rate = checkRateLimit(`contact:${getClientId(request)}`, 5, 60 * 60 * 1000)
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } },
    )
  }
  if (!hasValidOrigin(request) || !hasJsonContentType(request)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const parsed = contactSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please check the submitted details.' }, { status: 400 })
    }
    if (parsed.data.website) return NextResponse.json({ success: true })

    const data = parsed.data

    // Optional CMS store save for Stitch Leads UI
    try {
      const existingEnquiries = await getCmsEnquiries()
      const newEnquiry: ContactEnquiryRecord = {
        id: `enq-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: Array.isArray(data.services) ? data.services.join(', ') : '',
        budget: data.budget,
        message: data.message,
        status: 'new',
        createdAt: new Date().toISOString(),
      }
      await saveCmsEnquiries([newEnquiry, ...existingEnquiries])
    } catch (saveErr) {
      console.warn('CMS store lead save info:', saveErr)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Unable to send your request right now.' }, { status: 500 })
  }
}
