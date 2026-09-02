import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { checkRateLimit, getClientId, hasJsonContentType, hasValidOrigin } from '@/lib/security'
import { getCmsEnquiries, saveCmsEnquiries } from '@/lib/cms-store'
import type { ContactEnquiryRecord } from '@/lib/cms-types'

const rawResendKey = process.env.RESEND_API_KEY
const isValidKey = Boolean(rawResendKey && rawResendKey.startsWith('re_') && rawResendKey !== 're_your_api_key_here')
const resend = isValidKey ? new Resend(rawResendKey) : null
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'krtaskersukltd@gmail.com'
const fromEmail = process.env.RESEND_FROM_EMAIL || 'KR Tasker Digital <hello@krtaskerdigital.com>'

const newsletterSchema = z.object({
  email: z.string().trim().email('Invalid email address').max(254),
})

export async function POST(request: Request) {
  const rate = checkRateLimit(`newsletter:${getClientId(request)}`, 30, 60 * 60 * 1000)
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } },
    )
  }

  if (!hasValidOrigin(request) || !hasJsonContentType(request)) {
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 })
  }

  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const parsed = newsletterSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    const email = parsed.data.email
    const createdAt = new Date().toISOString()

    // 1. Save Subscriber to Store
    try {
      const existing = await getCmsEnquiries()
      const newSub: ContactEnquiryRecord = {
        id: `sub-${Date.now()}`,
        name: 'Newsletter Subscriber',
        email,
        phone: '',
        service: 'Newsletter Insights',
        budget: 'N/A',
        message: `Newsletter subscription received for ${email}`,
        status: 'new',
        createdAt,
      }
      await saveCmsEnquiries([newSub, ...existing])
    } catch (saveErr) {
      console.warn('CMS store newsletter save info (non-fatal):', saveErr)
    }

    // 2. Dispatch Email Notification if Resend is active
    if (resend) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [notificationEmail],
          subject: `📩 New Newsletter Subscriber: ${email}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0c4651; color: #ffffff; border-radius: 12px;">
              <h2 style="color: #e6ff2a; margin-top: 0;">New Newsletter Subscriber</h2>
              <p style="font-size: 16px; color: #ffffff;">A new user has subscribed to the KR Tasker Digital newsletter:</p>
              <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; font-size: 18px; font-weight: bold; color: #ffffff;">
                ${email}
              </div>
              <p style="font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 24px;">Subscribed at: ${new Date(createdAt).toLocaleString()}</p>
            </div>
          `,
        })
        console.log('✅ Newsletter notification sent to admin:', notificationEmail)
      } catch (mailErr) {
        console.warn('Resend newsletter notification error:', mailErr)
      }
    }

    return NextResponse.json({ success: true, message: 'Thank you for subscribing to our newsletter!' })
  } catch (err) {
    console.error('Newsletter API error:', err)
    return NextResponse.json({ error: 'Unable to subscribe right now. Please try again.' }, { status: 500 })
  }
}
