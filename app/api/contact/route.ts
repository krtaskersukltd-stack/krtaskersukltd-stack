import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/contact-schema'
import { checkRateLimit, getClientId, hasJsonContentType, hasValidOrigin } from '@/lib/security'
import { getCmsEnquiries, saveCmsEnquiries } from '@/lib/cms-store'
import type { ContactEnquiryRecord } from '@/lib/cms-types'
import { renderInternalLeadEmailHTML, renderClientConfirmationEmailHTML } from '@/lib/email-templates'

const rawResendKey = process.env.RESEND_API_KEY
const isValidKey = Boolean(rawResendKey && rawResendKey.startsWith('re_') && rawResendKey !== 're_your_api_key_here')
const resend = isValidKey ? new Resend(rawResendKey) : null
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'krtaskersukltd@gmail.com'
const fromEmail = process.env.RESEND_FROM_EMAIL || 'KR Tasker Digital <hello@krtaskerdigital.com>'

export async function POST(request: Request) {
  // Rate limit: 30 requests per hour per client
  const rate = checkRateLimit(`contact:${getClientId(request)}`, 30, 60 * 60 * 1000)
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } },
    )
  }

  if (!hasValidOrigin(request) || !hasJsonContentType(request)) {
    return NextResponse.json({ error: 'Invalid request origin or format' }, { status: 400 })
  }

  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please check the submitted details.' }, { status: 400 })
    }

    // Honeypot spam protection
    if (parsed.data.website) {
      return NextResponse.json({ success: true })
    }

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
        phone: data.phone || '',
        service: servicesText || 'General Enquiry',
        budget: data.budget || 'N/A',
        message: data.message,
        status: 'new',
        createdAt,
      }
      await saveCmsEnquiries([newEnquiry, ...existingEnquiries])
    } catch (saveErr) {
      console.warn('CMS store lead save info (non-fatal):', saveErr)
    }

    // 2. Dispatch Email Notifications via Resend
    if (resend) {
      // A. Internal Lead Notification to Agency Admin
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [notificationEmail],
          replyTo: data.email,
          subject: `⚡ New Lead: ${data.name} (${servicesText || 'Project Enquiry'})`,
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
        console.log('✅ Lead email notification sent to admin:', notificationEmail)
      } catch (adminMailErr) {
        console.error('Resend admin email error:', adminMailErr)
      }

      // B. Client Auto-Confirmation Email
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [data.email],
          subject: `Enquiry Received — KR Tasker Digital`,
          html: renderClientConfirmationEmailHTML(data.name),
        })
        console.log('✅ Auto-confirmation email sent to client:', data.email)
      } catch (clientMailErr) {
        console.warn('Client auto-confirmation email error:', clientMailErr)
      }
    } else {
      console.log('ℹ️ Resend API key not configured or using placeholder. Lead saved successfully to store.')
    }

    return NextResponse.json({ success: true, message: 'Your request has been received!' })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Unable to process your request right now. Please try again.' }, { status: 500 })
  }
}
