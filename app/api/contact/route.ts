import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'
import { checkRateLimit, getClientId, hasJsonContentType, hasValidOrigin } from '@/lib/security'

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

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY is not configured')
      return NextResponse.json({ error: 'Contact service is temporarily unavailable.' }, { status: 503 })
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Lead from KR Tasker Website - ${parsed.data.name}`,
        from_name: 'KR Tasker Contact Form',
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        city: parsed.data.city || 'Not Provided',
        message: parsed.data.message,
        services: parsed.data.services.join(', '),
        preferred_days: parsed.data.preferredDays.join(', '),
        preferred_times: parsed.data.preferredTimes.join(', '),
        budget: parsed.data.budget,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })

    const result = await response.json().catch(() => ({})) as { success?: boolean; message?: string }
    if (!response.ok || result.success === false) {
      console.error('Contact provider rejected request:', response.status, result.message)
      return NextResponse.json({ error: 'Unable to send your request right now.' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Unable to send your request right now.' }, { status: 500 })
  }
}
