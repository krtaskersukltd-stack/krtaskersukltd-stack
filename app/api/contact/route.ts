import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/contact-schema'
import { checkRateLimit, getClientId, hasJsonContentType, hasValidOrigin } from '@/lib/security'
import { getCmsEnquiries, saveCmsEnquiries } from '@/lib/cms-store'
import type { ContactEnquiryRecord } from '@/lib/cms-types'

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'krtaskerukltd@gmail.com'

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
    const servicesText = Array.isArray(data.services) ? data.services.join(', ') : ''

    // 1. Save Lead to CMS Database
    try {
      const existingEnquiries = await getCmsEnquiries()
      const newEnquiry: ContactEnquiryRecord = {
        id: `enq-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: servicesText,
        budget: data.budget,
        message: data.message,
        status: 'new',
        createdAt: new Date().toISOString(),
      }
      await saveCmsEnquiries([newEnquiry, ...existingEnquiries])
    } catch (saveErr) {
      console.warn('CMS store lead save info:', saveErr)
    }

    // 2. Dispatch Email via Resend API to krtaskerukltd@gmail.com
    if (resend) {
      try {
        await resend.emails.send({
          from: 'KR Tasker Digital <onboarding@resend.dev>',
          to: [notificationEmail],
          subject: `New Lead Inquiry from ${data.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e5e4e0; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #0C4651; color: #ffffff; padding: 24px; text-align: center;">
                <h2 style="margin: 0; color: #E6FF2A;">KR Tasker Digital</h2>
                <p style="margin: 4px 0 0 0; font-size: 14px;">New Client Project Lead Submitted</p>
              </div>
              
              <div style="padding: 24px; background-color: #ffffff;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 140px;">Client Name:</td>
                    <td style="padding: 8px 0;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                    <td style="padding: 8px 0;">${data.phone || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Services Needed:</td>
                    <td style="padding: 8px 0;">${servicesText || 'General Enquiry'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Estimated Budget:</td>
                    <td style="padding: 8px 0;">${data.budget || 'Not specified'}</td>
                  </tr>
                </table>

                <div style="margin-top: 20px; padding: 16px; background-color: #faf9f4; border-radius: 8px; border-left: 4px solid #0C4651;">
                  <h4 style="margin: 0 0 8px 0; color: #0C4651;">Project Message / Requirements:</h4>
                  <p style="margin: 0; white-space: pre-line; line-height: 1.6;">${data.message}</p>
                </div>
              </div>

              <div style="background-color: #faf9f4; padding: 16px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #e5e4e0;">
                This email was automatically dispatched by KR Tasker Digital Contact Engine via Resend.
              </div>
            </div>
          `,
        })
      } catch (mailErr) {
        console.error('Resend email dispatch error:', mailErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Unable to send your request right now.' }, { status: 500 })
  }
}
