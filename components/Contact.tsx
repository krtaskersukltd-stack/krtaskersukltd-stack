'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import styles from './Contact.module.css'
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

const INTEREST_OPTIONS = [
  'Website Design',
  'SEO',
  'PPC & Social Ads',
  'End-to-End Marketing',
  'Creative & Branding',
  'Consulting',
  'General Support',
  'Other',
]

const BUDGET_OPTIONS = [
  '< £5,000',
  '£5,000 to £10,000',
  '£10,000 to £30,000',
  '£30,000 to £50,000',
  '£50,000+',
  'Not Sure, Please Advise',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    companyName: '',
    message: '',
    privacyConsent: false,
    marketingConsent: false,
  })

  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Website Design'])
  const [selectedBudget, setSelectedBudget] = useState<string>('£5,000 to £10,000')

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const firstNameInputRef = useRef<HTMLInputElement>(null)

  const handleFocusForm = () => {
    firstNameInputRef.current?.focus()
    firstNameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!formData.privacyConsent) {
      setSubmitError('Please agree to the privacy policy to submit the form.')
      return
    }

    setIsSubmitting(true)

    const fullName = `${formData.firstName} ${formData.lastName}`.trim()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          jobTitle: formData.jobTitle,
          companyName: formData.companyName,
          services: selectedInterests,
          budget: selectedBudget,
          message: formData.message,
          privacyConsent: formData.privacyConsent,
          marketingConsent: formData.marketingConsent,
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
        {/* Top Header Text */}
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

        {/* Main Card */}
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
                Feel Free To Contact Us If Having Any Questions. We&apos;re Available For New Projects Or
                Strategic Advisory.
              </p>

              <button
                type="button"
                onClick={handleFocusForm}
                className={styles.btnGetInTouch}
                aria-label="Scroll to contact form"
              >
                <span>Get In Touch</span>
              </button>

              {/* Direct Contact Details */}
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
                  href="mailto:info@krtaskerdigital.co.uk"
                  className={styles.contactItemLink}
                  aria-label="Email info@krtaskerdigital.co.uk"
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
                    <span className={styles.contactItemValue}>info@krtaskerdigital.co.uk</span>
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

            {/* Right Column: Reference-Style Contact Form */}
            <div className={styles.rightCol}>
              {isSubmitted ? (
                <div className={styles.successWrapper}>
                  <div className={styles.successIcon}>✓</div>
                  <AnimatedHeading as="h3" className={styles.successTitle}>
                    Request Sent!
                  </AnimatedHeading>
                  <p className={styles.successDesc}>
                    Thank you, <strong>{formData.firstName || 'there'}</strong>. We&apos;ve received your project inquiry and will be in touch within 1 business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        jobTitle: '',
                        companyName: '',
                        message: '',
                        privacyConsent: false,
                        marketingConsent: false,
                      })
                      setSelectedInterests(['Website Design'])
                      setSelectedBudget('£5,000 to £10,000')
                    }}
                    className={styles.btnReset}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.formElement}>
                  {/* Section 1: Interest Selection */}
                  <div className={styles.interestSection}>
                    <div className={styles.sectionTitleRow}>
                      <h3 className={styles.formSectionTitle}>I&apos;m Interested In:</h3>
                    </div>
                    <p className={styles.supportTicketNote}>
                      Already a client with a problem on something we manage?{' '}
                      <a
                        href="mailto:info@krtaskerdigital.co.uk?subject=Support%20Ticket%20Request"
                        className={styles.supportTicketLink}
                      >
                        Raise a support ticket
                      </a>{' '}
                      instead.
                    </p>

                    <label className={styles.subHeadingLabel}>Please select all that apply:</label>

                    <div className={styles.pillsGrid}>
                      {INTEREST_OPTIONS.map((interest) => {
                        const isSelected = selectedInterests.includes(interest)
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`${styles.pillBtn} ${isSelected ? styles.pillBtnSelected : ''}`}
                            aria-pressed={isSelected}
                          >
                            <span className={styles.pillBtnText}>{interest}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Section 2: Personal & Company Details (2-Column Grid) */}
                  <div className={styles.inputsGrid}>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel} htmlFor="contact-first-name">
                        First Name<span className={styles.requiredStar}>*</span>
                      </label>
                      <input
                        ref={firstNameInputRef}
                        id="contact-first-name"
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={styles.cleanInput}
                        required
                      />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.fieldLabel} htmlFor="contact-last-name">
                        Last Name<span className={styles.requiredStar}>*</span>
                      </label>
                      <input
                        id="contact-last-name"
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={styles.cleanInput}
                        required
                      />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.fieldLabel} htmlFor="contact-email">
                        Email<span className={styles.requiredStar}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="Enter your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={styles.cleanInput}
                        required
                      />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.fieldLabel} htmlFor="contact-phone">
                        Phone<span className={styles.requiredStar}>*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="Enter your Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={styles.cleanInput}
                        required
                      />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.fieldLabel} htmlFor="contact-job-title">
                        Job Title
                      </label>
                      <input
                        id="contact-job-title"
                        type="text"
                        placeholder="Enter your Job Title"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        className={styles.cleanInput}
                      />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.fieldLabel} htmlFor="contact-company-name">
                        Company Name
                      </label>
                      <input
                        id="contact-company-name"
                        type="text"
                        placeholder="Enter your Company Name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className={styles.cleanInput}
                      />
                    </div>
                  </div>

                  {/* Section 3: Budget Selector */}
                  <div className={styles.budgetSection}>
                    <label className={styles.fieldLabel}>Do You Have a Budget in Mind?</label>
                    <div className={styles.budgetPillsGrid}>
                      {BUDGET_OPTIONS.map((budget) => {
                        const isSelected = selectedBudget === budget
                        return (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => setSelectedBudget(budget)}
                            className={`${styles.budgetPillBtn} ${isSelected ? styles.budgetPillSelected : ''}`}
                            aria-pressed={isSelected}
                          >
                            <span className={styles.pillBtnText}>{budget}</span>
                            {isSelected && <span className={styles.activeDot} />}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Section 4: Message / How Can We Help? */}
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel} htmlFor="contact-message">
                      How Can We Help?
                    </label>
                    <textarea
                      id="contact-message"
                      placeholder="Please include any details you feel would be beneficial for us to know including scope, timelines, budget, pain points we can help you with, services of interest, etc..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={styles.cleanTextarea}
                      rows={4}
                    />
                  </div>

                  {/* Section 5: Checkboxes */}
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        className={styles.customCheckbox}
                        required
                      />
                      <span className={styles.checkboxText}>
                        I understand that KR Tasker Digital will securely hold my data in accordance with their{' '}
                        <Link href="/privacy" className={styles.privacyLink} target="_blank">
                          privacy policy
                        </Link>
                        .{' '}
                        <span className={styles.requiredStar}>*</span>
                      </span>
                    </label>

                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.marketingConsent}
                        onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                        className={styles.customCheckbox}
                      />
                      <span className={styles.checkboxText}>
                        I&apos;d like to receive marketing emails, tips, and updates from KR Tasker Digital. You can unsubscribe at any time.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className={styles.submitRow}>
                    <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                      <span>{isSubmitting ? 'Sending Request...' : 'Submit Form'}</span>
                    </button>
                  </div>

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
