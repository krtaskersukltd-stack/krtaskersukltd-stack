'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import IconsOrbit from './IconsOrbit'
import styles from './BlogNewsletter.module.css'

export interface BlogNewsletterProps {
  className?: string
}

export default function BlogNewsletter({ className = '' }: BlogNewsletterProps) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [subscribeError, setSubscribeError] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    setSubscribeError(null)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubscribed(true)
        setEmail('')
      } else {
        setSubscribeError(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch {
      setSubscribeError('Connection error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${styles.newsletterBanner} ${className}`}
      aria-label="Newsletter Subscription"
    >
      <div className={styles.newsletterContent}>
        <div className={styles.leftNews}>
          <span className={styles.newsTag}>Spam Free Newsletter</span>
          <AnimatedHeading as="h2" className={styles.newsTitle}>
            Receive The Most Up To Date <span className={styles.yellowText}>Insights & Strategies</span>
          </AnimatedHeading>
        </div>

        <div className={styles.rightNews}>
          {subscribed ? (
            <p className={styles.subText}>🎉 Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className={styles.formRow}>
              <input
                type="email"
                placeholder="Enter your Email Address here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
                disabled={submitting}
              />
              <button type="submit" className={styles.btnSubscribe} disabled={submitting}>
                {submitting ? 'Subscribing...' : 'Subscribe Now'}
              </button>
              {subscribeError && (
                <p className={styles.errorMessage}>{subscribeError}</p>
              )}
            </form>
          )}
        </div>
      </div>

      <IconsOrbit
        variant="newsletter"
        showCenterVector
        rotating
        speedSeconds={22}
      />
    </motion.section>
  )
}
