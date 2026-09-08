'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import { motion, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import styles from './Contact.module.css'
import CustomSelect from './CustomSelect'
import ScrollFillText from './ScrollFillText'

function AnimatedCounter({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrameId: number

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOutProgress * to))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter)
      } else {
        setCount(to)
      }
    }

    animationFrameId = requestAnimationFrame(updateCounter)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isInView, to, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const servicesOptions = [
  'Digital 360',
  'Web Design',
  'Website Development',
  'Branding & Creative',
  'SEO & Organic Growth',
  'PPC & Social Ads',
  'Shopify & E-Commerce',
  'AI Transformation',
]

const budgetOptions = [
  '2000£',
  'Under £1,000',
  '£1,000 - £3,000',
  '£3,000 - £5,000',
  '£5,000 - £10,000',
  '£10,000+',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Digital 360',
    budget: '2000£',
    message: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const nameInputRef = useRef<HTMLInputElement>(null)

  const handleFocusForm = () => {
    nameInputRef.current?.focus()
    nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          services: [formData.service],
          budget: formData.budget,
          phone: '',
          city: '',
          website: '',
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setSubmitError(result.error || 'Unable to send your request right now.')
      } else {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Contact submission error:', error)
      setSubmitError('Failed to connect to the server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.contactSec} id="contact">
      <div className={styles.container}>
        {/* Top Header Text matching reference */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedHeading as="h2" className={styles.headerTitle}>
            Let&apos;s Build A Smarter
            <br />
            Growth Strategy Together
          </AnimatedHeading>
          <p className={styles.headerSub}>
            <ScrollFillText text="Have a question or want to discuss your growth goals? Our team is ready to help and usually responds within one business day." />
          </p>
        </motion.div>

        {/* Main Teal Card */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.grid}>
            {/* Left Column: Let's Connect */}
            <div className={styles.leftCol}>
              <div className={styles.availableBadge}>
                <span className={styles.greenDot} />
                <span>Available For New Projects</span>
              </div>

              <AnimatedHeading as="h2" className={styles.mainHeading}>
                Let&apos;s Connect
              </AnimatedHeading>

              <p className={styles.description}>
                Feel Free To Contact Me If Having Any Questions. I&apos;m Available For New Projects Or
                Just For Chatting.
              </p>

              <button
                type="button"
                onClick={handleFocusForm}
                className={styles.btnGetInTouch}
                aria-label="Scroll to contact form"
              >
                <span>Get In Touch</span>
              </button>

              {/* Direct Contact Details: Phone & Email */}
              <div className={styles.directContactInfo}>
                <a
                  href="tel:+441913483900"
                  className={styles.contactItemLink}
                  aria-label="Call +44 191 348 3900"
                >
                  <div className={styles.contactIconCircle}>
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className={styles.contactItemText}>
                    <span className={styles.contactItemLabel}>Phone</span>
                    <span className={styles.contactItemValue}>+44 191 348 3900</span>
                  </div>
                </a>

                <a
                  href="mailto:info@krtaskerdigital.com"
                  className={styles.contactItemLink}
                  aria-label="Email info@krtaskerdigital.com"
                >
                  <div className={styles.contactIconCircle}>
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className={styles.contactItemText}>
                    <span className={styles.contactItemLabel}>Email</span>
                    <span className={styles.contactItemValue}>info@krtaskerdigital.com</span>
                  </div>
                </a>
              </div>

              {/* Stats Counters */}
              <div className={styles.statsRow}>
                <div className={styles.statBlock}>
                  <div className={styles.statNumber}>
                    <AnimatedCounter to={27} suffix="+" duration={1.8} />
                  </div>
                  <span className={styles.statLabel}>Services we provide</span>
                </div>

                <div className={styles.statBlock}>
                  <div className={styles.statNumber}>
                    <AnimatedCounter to={200} suffix="+" duration={2.2} />
                  </div>
                  <span className={styles.statLabel}>Connections World Wide</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className={styles.rightCol}>
              {isSubmitted ? (
                <div className={styles.successWrapper}>
                  <div className={styles.successIcon}>✓</div>
                  <AnimatedHeading as="h3" className={styles.successTitle}>Request Sent!</AnimatedHeading>
                  <p className={styles.successDesc}>
                    Thank you, <strong>{formData.name}</strong>. We&apos;ve received your message and will
                    be in touch within 1 business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        service: 'Digital 360',
                        budget: '2000£',
                        message: '',
                      })
                    }}
                    className={styles.btnReset}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.formElement}>
                  {/* Row 1: Name & Email */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.inputLabel} htmlFor="contact-name">
                        Name
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={styles.pillInput}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.inputLabel} htmlFor="contact-email">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@krtaskerdigital.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={styles.pillInput}
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: Services & Budget */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.inputLabel} htmlFor="contact-service">
                        Services
                      </label>
                      <CustomSelect
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        options={servicesOptions}
                        onChange={(val) => setFormData({ ...formData, service: val })}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.inputLabel} htmlFor="contact-budget">
                        Budget
                      </label>
                      <CustomSelect
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        options={budgetOptions}
                        onChange={(val) => setFormData({ ...formData, budget: val })}
                      />
                    </div>
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div className={styles.formGroup}>
                    <label className={styles.inputLabel} htmlFor="contact-message">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      placeholder="Type your message here......"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={styles.pillTextarea}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                    <span>{isSubmitting ? 'Sending Request...' : 'Send Request'}</span>
                  </button>

                  {submitError && <p className={styles.errorText}>{submitError}</p>}
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
