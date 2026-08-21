import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'
import { checkRateLimit, getClientId, hasJsonContentType, hasValidOrigin } from '@/lib/security'
import { Resend } from 'resend'

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

    const resendApiKey = process.env.RESEND_API_KEY
    const emailTo = process.env.CONTACT_EMAIL_TO
    const emailFrom = process.env.CONTACT_EMAIL_FROM

    if (!resendApiKey || !emailTo || !emailFrom) {
      console.error('Resend configuration (RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM) is missing')
      return NextResponse.json({ error: 'Contact service is temporarily unavailable.' }, { status: 503 })
    }

    const resend = new Resend(resendApiKey)
    const { data } = parsed

    const htmlContent = `
      <h2>New Lead from KR Tasker Website</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>City:</strong> ${data.city || 'Not Provided'}</p>
      <p><strong>Budget:</strong> ${data.budget}</p>
      <p><strong>Services:</strong> ${data.services.join(', ')}</p>
      <p><strong>Preferred Days:</strong> ${data.preferredDays.join(', ')}</p>
      <p><strong>Preferred Times:</strong> ${data.preferredTimes.join(', ')}</p>
      <h3>Message:</h3>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `

    const response = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: `New Lead from KR Tasker Website - ${data.name}`,
      html: htmlContent,
      replyTo: data.email,
    })

    if (response.error) {
      console.error('Resend API rejected request:', response.error)
      return NextResponse.json({ error: 'Unable to send your request right now.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Unable to send your request right now.' }, { status: 500 })
  }
}

