'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import styles from './Contact.module.css'

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
  '2000$',
  'Under $1,000',
  '$1,000 - $3,000',
  '$3,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Digital 360',
    budget: '2000$',
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
          <h2 className={styles.headerTitle}>
            Let&apos;s Build A <span className={styles.tealAccent}>Smarter</span>
            <br />
            <span className={styles.tealAccent}>Growth</span> Strategy Together
          </h2>
          <p className={styles.headerSub}>
            Have a question or want to discuss your growth goals?
            <br />
            Our team is ready to help and usually responds within one business day.
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

              <h2 className={styles.mainHeading}>
                Let&apos;s <span className={styles.limeHighlight}>Connect</span>
              </h2>

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
                Get In Touch
              </button>

              {/* Stats Counters */}
              <div className={styles.statsRow}>
                <div className={styles.statBlock}>
                  <div className={styles.statNumber}>
                    27<span className={styles.statPlus}>+</span>
                  </div>
                  <span className={styles.statLabel}>Services we provide</span>
                </div>

                <div className={styles.statBlock}>
                  <div className={styles.statNumber}>
                    200<span className={styles.statPlus}>+</span>
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
                  <h3 className={styles.successTitle}>Request Sent!</h3>
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
                        budget: '2000$',
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
                      <div className={styles.selectWrapper}>
                        <select
                          id="contact-service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className={styles.pillSelect}
                        >
                          {servicesOptions.map((srv) => (
                            <option key={srv} value={srv}>
                              {srv}
                            </option>
                          ))}
                        </select>
                        <svg
                          className={styles.selectChevron}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.inputLabel} htmlFor="contact-budget">
                        Budget
                      </label>
                      <div className={styles.selectWrapper}>
                        <select
                          id="contact-budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className={styles.pillSelect}
                        >
                          {budgetOptions.map((bgt) => (
                            <option key={bgt} value={bgt}>
                              {bgt}
                            </option>
                          ))}
                        </select>
                        <svg
                          className={styles.selectChevron}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div className={styles.formGroup}>
                    <label className={styles.inputLabel} htmlFor="contact-message">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      placeholder="Type your message here....."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={styles.pillTextarea}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending Request...' : 'Send Request'}
                  </button>

                  {submitError && <p className={styles.errorText}>{submitError}</p>}
                </form>
              )}
            </div>
          </div>

          {/* ================= TWO ROWS OF MARQUEE EMAILS ================= */}
          <div className={styles.dualMarqueeWrapper} aria-hidden="true">
            {/* ROW 1: Scrolling Left */}
            <div className={styles.tickerTrackLeft}>
              <div className={styles.tickerGroup}>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
              </div>
              <div className={styles.tickerGroup}>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
              </div>
            </div>

            {/* ROW 2: Scrolling Right (Opposite Direction) */}
            <div className={styles.tickerTrackRight}>
              <div className={styles.tickerGroup}>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
              </div>
              <div className={styles.tickerGroup}>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
                <span className={styles.tickerItem}>info@krtaskerdigital.com</span>
                <span className={styles.tickerDot}>•</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
