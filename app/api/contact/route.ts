import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/contact-schema'
import { checkRateLimit, getClientId, hasJsonContentType, hasValidOrigin } from '@/lib/security'
import { getCmsEnquiries, saveCmsEnquiries } from '@/lib/cms-store'
import type { ContactEnquiryRecord } from '@/lib/cms-types'
import { renderInternalLeadEmailHTML, renderClientConfirmationEmailHTML } from '@/lib/email-templates'

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
    const createdAt = new Date().toISOString()

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
        createdAt,
      }
      await saveCmsEnquiries([newEnquiry, ...existingEnquiries])
    } catch (saveErr) {
      console.warn('CMS store lead save info:', saveErr)
    }

    // 2. Dispatch High-Impact Stitch Designed Emails via Resend API
    if (resend) {
      // A. Internal Lead Notification to Agency Admin (krtaskerukltd@gmail.com)
      try {
        await resend.emails.send({
          from: 'KR Tasker Digital <onboarding@resend.dev>',
          to: [notificationEmail],
          subject: `⚡ New Lead Notification: ${data.name} (${servicesText || 'Project Enquiry'})`,
          html: renderInternalLeadEmailHTML({
            name: data.name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            servicesText,
            budget: data.budget,
            message: data.message,
            createdAt,
          }),
        })
      } catch (adminMailErr) {
        console.error('Resend admin email dispatch error:', adminMailErr)
      }

      // B. Client Auto-Confirmation Email to Inquiry Submitter
      try {
        await resend.emails.send({
          from: 'KR Tasker Digital <onboarding@resend.dev>',
          to: [data.email],
          subject: `Enquiry Received — KR Tasker Digital`,
          html: renderClientConfirmationEmailHTML(data.name),
        })
      } catch (clientMailErr) {
        console.error('Resend client confirmation email dispatch error:', clientMailErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Unable to send your request right now.' }, { status: 500 })
  }
}
