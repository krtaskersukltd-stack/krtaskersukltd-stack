'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef, useEffect, useMemo } from 'react'
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

export const SUB_SERVICES_DATA: { category: string; services: string[] }[] = [
  {
    category: 'Web Development & Apps',
    services: [
      'Website Design & Development',
      'Web Design',
      'Custom Web Development',
      'E-Commerce Web Development',
      'Shopify Development',
      'WordPress Development',
      'UI/UX Design',
      'CMS Development',
      'SaaS Platform Engineering',
      'B2B Web Solutions',
    ],
  },
  {
    category: 'SEO & Search Growth',
    services: [
      'Local SEO',
      'International SEO',
      'National SEO',
      'E-Commerce SEO',
      'Technical SEO',
      'On-Page SEO',
      'Off-Page SEO',
      'Free SEO Audit',
      'Content Marketing',
      'AI SEO & GEO Optimization',
      'Link Building',
      'Lead Generation SEO',
    ],
  },
  {
    category: 'PPC & Digital Advertising',
    services: [
      'PPC Management',
      'Google Search Ads',
      'Google Shopping Ads',
      'Google Display Ads',
      'YouTube Ads',
      'Social Media Ads (Meta / TikTok)',
    ],
  },
  {
    category: 'AI & Automation',
    services: [
      'AI Chatbot Development',
      'AI Voice Agents',
      'CRM Automation',
      'AI Integration & Consulting',
      'AI Workflow Automation',
      'Marketing Automation',
    ],
  },
  {
    category: 'Creative & Graphic Design',
    services: [
      'Graphic Design',
      'Logo Design / Logo Making',
      'Brand Identity Design / Branding',
      '3D Design & Motion',
      'Social Media Graphics',
      'Banner & Poster Design',
    ],
  },
  {
    category: 'Social Media Marketing',
    services: [
      'Social Media Management',
      'Social Media Strategy',
      'Social Media Content Creation',
      'Community Management',
      'Influencer Marketing',
      'Social Media Audit',
    ],
  },
  {
    category: 'Email Marketing',
    services: [
      'Email Automation Sequences',
      'Email Campaign Management',
      'Email Marketing Strategy',
      'Email Design & Templates',
      'Email Copywriting & List Building',
    ],
  },
  {
    category: 'Amazon & Marketplaces',
    services: [
      'Full Service Amazon Management',
      'Amazon PPC Management',
      'Amazon SEO',
      'Enhanced Brand Content (A+)',
      'Amazon Storefront Design',
      'Account Health & Reinstatements',
    ],
  },
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [subServiceSearch, setSubServiceSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const allSubServices = useMemo(
    () => SUB_SERVICES_DATA.flatMap((cat) => cat.services),
    []
  )

  const selectedSubServices = useMemo(
    () => selectedInterests.filter((item) => allSubServices.includes(item)),
    [selectedInterests, allSubServices]
  )

  const filteredCategories = useMemo(() => {
    if (!subServiceSearch.trim()) return SUB_SERVICES_DATA
    const q = subServiceSearch.toLowerCase()
    return SUB_SERVICES_DATA.map((cat) => ({
      ...cat,
      services: cat.services.filter((s) => s.toLowerCase().includes(q)),
    })).filter((cat) => cat.services.length > 0)
  }, [subServiceSearch])

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

              {/* Address & Social Media Links */}
              <div className={styles.bottomContactWrapper}>
                {/* Office Address Card */}
                <a
                  href="https://maps.google.com/?q=Office+%23+7,+Tynegate+Precinct,+Gateshead+NE8+3HU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactItemLink}
                  aria-label="Visit Office: Office # 7, Tynegate Precinct, Gateshead NE8 3HU"
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
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className={styles.contactItemText}>
                    <span className={styles.contactItemLabel}>Office Address</span>
                    <span className={styles.contactItemValue}>Office # 7, Tynegate Precinct, Gateshead NE8 3HU</span>
                  </div>
                </a>

                {/* Social Media Links */}
                <div className={styles.socialBlock}>
                  <span className={styles.socialLabel}>Follow Us</span>
                  <div className={styles.socialLinksRow}>
                    <a
                      href="https://www.linkedin.com/company/kr-tasker-digital/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialButton}
                      aria-label="Follow KR Tasker Digital on LinkedIn"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0-.02-3.34 1.67 1.67 0 0 0 .02 3.34M7.86 18.5V10.13H5.07V18.5h2.79z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61571387696002"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialButton}
                      aria-label="Follow KR Tasker Digital on Facebook"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/krtaskerdigital/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialButton}
                      aria-label="Follow KR Tasker Digital on Instagram"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                    <a
                      href="https://www.tiktok.com/@krtaskerdigital"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialButton}
                      aria-label="Follow KR Tasker Digital on TikTok"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.5-2.86V9.32a6.38 6.38 0 1 0 5.95 6.35V8.73a8.16 8.16 0 0 0 4.77 1.52V6.81c-.34 0-.67-.04-1-.12Z" />
                      </svg>
                    </a>
                  </div>
                </div>
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

                      {/* Dropdown for All Sub-Services */}
                      <div className={styles.subServicesDropdownWrapper} ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen((prev) => !prev)}
                          className={`${styles.pillBtn} ${styles.subServiceDropdownTrigger} ${
                            isDropdownOpen || selectedSubServices.length > 0
                              ? styles.subServiceDropdownTriggerActive
                              : ''
                          }`}
                          aria-haspopup="listbox"
                          aria-expanded={isDropdownOpen}
                        >
                          <span className={styles.pillBtnText}>
                            {selectedSubServices.length > 0
                              ? `Sub-Services (${selectedSubServices.length})`
                              : 'All Sub-Services'}
                          </span>
                          <svg
                            className={`${styles.dropdownArrow} ${
                              isDropdownOpen ? styles.dropdownArrowOpen : ''
                            }`}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>

                        {isDropdownOpen && (
                          <div className={styles.subServicesMenu}>
                            <div className={styles.subServicesMenuHeader}>
                              <span className={styles.subServicesMenuTitle}>
                                Choose Specific Sub-Services
                              </span>
                              <button
                                type="button"
                                onClick={() => setIsDropdownOpen(false)}
                                className={styles.subServicesCloseBtn}
                                aria-label="Close menu"
                              >
                                ✕
                              </button>
                            </div>

                            <div className={styles.subServicesSearchBox}>
                              <svg
                                className={styles.searchIcon}
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                              >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                              </svg>
                              <input
                                type="text"
                                placeholder="Search all sub-services..."
                                value={subServiceSearch}
                                onChange={(e) => setSubServiceSearch(e.target.value)}
                                className={styles.subServicesSearchInput}
                              />
                              {subServiceSearch && (
                                <button
                                  type="button"
                                  onClick={() => setSubServiceSearch('')}
                                  className={styles.clearSearchBtn}
                                  aria-label="Clear search"
                                >
                                  ✕
                                </button>
                              )}
                            </div>

                            <div className={styles.subServicesListScroll}>
                              {filteredCategories.length === 0 ? (
                                <div className={styles.noResultsText}>
                                  No sub-services match &quot;{subServiceSearch}&quot;
                                </div>
                              ) : (
                                filteredCategories.map((group) => (
                                  <div key={group.category} className={styles.subServiceCatGroup}>
                                    <div className={styles.subServiceCatLabel}>
                                      {group.category}
                                    </div>
                                    <div className={styles.subServiceCatItems}>
                                      {group.services.map((serviceName) => {
                                        const isChecked = selectedInterests.includes(serviceName)
                                        return (
                                          <button
                                            key={serviceName}
                                            type="button"
                                            onClick={() => toggleInterest(serviceName)}
                                            className={`${styles.subServiceItem} ${
                                              isChecked ? styles.subServiceItemActive : ''
                                            }`}
                                          >
                                            <span className={styles.subServiceCheck}>
                                              {isChecked ? '✓' : ''}
                                            </span>
                                            <span className={styles.subServiceName}>
                                              {serviceName}
                                            </span>
                                          </button>
                                        )
                                      })}
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Selected Sub-Services Chips */}
                    {selectedSubServices.length > 0 && (
                      <div className={styles.selectedSubServicesRow}>
                        <span className={styles.selectedSubServicesLabel}>
                          Selected Sub-Services:
                        </span>
                        <div className={styles.selectedChipsList}>
                          {selectedSubServices.map((sub) => (
                            <span key={sub} className={styles.selectedSubChip}>
                              {sub}
                              <button
                                type="button"
                                onClick={() => toggleInterest(sub)}
                                className={styles.removeChipBtn}
                                aria-label={`Remove ${sub}`}
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
