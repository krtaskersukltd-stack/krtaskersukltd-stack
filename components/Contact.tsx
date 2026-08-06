'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import styles from './Contact.module.css'

const servicesList = [
  'Amazon PPC & Growth',
  'eBay Account Management',
  'Paid Advertising (Google / Meta)',
  'Website & CRO',
  'Branding & Creative',
  'Website Development',
  'Shopify Store Management',
  'Social Media',
  'TikTok Account Management'
]

const daysList = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
const timesList = [
  '9:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
]

const budgetsList = [
  'Under £1,000',
  '£1,000 - £3,000',
  '£3,000 - £5,000',
  '£5,000 - £10,000',
  '£10,000+'
]

// Concentric circle team portraits matching reference layout
const teamAvatars = [
  // Outer ring (radius 450)
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&fit=crop',
    radius: 310,
    angle: -132,
    size: 50,
    floatDelay: '0s'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&h=200&fit=crop',
    radius: 310,
    angle: 132,
    size: 50,
    floatDelay: '1.2s'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop',
    radius: 310,
    angle: 0,
    size: 48,
    floatDelay: '0.4s'
  },
  // Second ring (radius 350)
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop',
    radius: 241,
    angle: 180,
    size: 46,
    floatDelay: '0.6s'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop',
    radius: 241,
    angle: -60,
    size: 44,
    floatDelay: '1.0s'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop',
    radius: 241,
    angle: 60,
    size: 44,
    floatDelay: '1.6s'
  },
  // Third ring (radius 250)
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop',
    radius: 172,
    angle: -152,
    size: 36,
    floatDelay: '1.8s'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop',
    radius: 172,
    angle: 152,
    size: 36,
    floatDelay: '2.4s'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop',
    radius: 172,
    angle: 30,
    size: 34,
    floatDelay: '0.8s'
  },
]

export default function Contact() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  })
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [selectedBudget, setSelectedBudget] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const toggleService = (srv: string) => {
    setSelectedServices(prev =>
      prev.includes(srv) ? prev.filter(x => x !== srv) : [...prev, srv]
    )
  }

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(x => x !== day) : [...prev, day]
    )
  }

  const toggleTime = (time: string) => {
    setSelectedTimes(prev =>
      prev.includes(time) ? prev.filter(x => x !== time) : [...prev, time]
    )
  }

  const selectBudget = (budget: string) => {
    setSelectedBudget(budget)
  }

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        alert('Please fill out all required fields marked with *')
        return
      }
    }
    if (step === 2) {
      if (selectedServices.length === 0) {
        alert('Please select at least one service.')
        return
      }
    }
    if (step === 3) {
      if (selectedDays.length === 0 || selectedTimes.length === 0) {
        alert('Please select preferred days and times.')
        return
      }
    }
    setStep(prev => Math.min(4, prev + 1))
  }

  const prevStep = () => {
    setStep(prev => Math.max(1, prev - 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBudget) {
      alert('Please select your budget tier.')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    try {
      if (web3FormsKey && web3FormsKey !== "YOUR_WEB3FORMS_ACCESS_KEY" && web3FormsKey !== "") {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `New Lead from KR Tasker Website - ${formData.name}`,
            from_name: "KR Tasker Contact Form",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city || "Not Provided",
            message: formData.message,
            services: selectedServices.join(", "),
            preferred_days: selectedDays.join(", "),
            preferred_times: selectedTimes.join(", "),
            budget: selectedBudget
          })
        })

        if (response.ok) {
          setIsSubmitted(true)
        } else {
          const resData = await response.json()
          setSubmitError(resData.message || "Failed to send email via Web3Forms.")
        }
      } else if (serviceId && serviceId !== "YOUR_EMAILJS_SERVICE_ID" && serviceId !== "") {
        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              subject: `New Lead from KR Tasker Website - ${formData.name}`,
              from_name: "KR Tasker Contact Form",
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              city: formData.city || "Not Provided",
              message: formData.message,
              services: selectedServices.join(", "),
              preferred_days: selectedDays.join(", "),
              preferred_times: selectedTimes.join(", "),
              budget: selectedBudget
            }
          })
        })

        if (response.ok) {
          setIsSubmitted(true)
        } else {
          const text = await response.text()
          setSubmitError(text || "Failed to send email. Please check your EmailJS settings.")
        }
      } else {
        setSubmitError("No active email service key is configured. Please configure NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY or EmailJS keys in .env.local.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitError("Failed to connect to the server. Please check your internet connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.contactSec}>
      <div className={styles.container}>
        <motion.div className={styles.sectionHeader} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Let&apos;s Build a <span>Smarter</span><br /><span>Growth</span> Strategy Together</h2>
          <p>Have a question or want to discuss your growth goals?<br />Our team is ready to help and usually responds within one business day.</p>
        </motion.div>
        <div className={styles.card}>
          {/* Left Column - Contact Details & Team Circles */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              <div className={styles.logoWrapper}><Image src="/images/Logo.svg" alt="KR Tasker Digital" width={106} height={48} /></div>

              {/* Concentric Circles & Team Avatars Graphic */}
              <div className={styles.circlesGraphic}>
                <div className={styles.orbitGlow} />
                {/* CSS orbit rings — same coordinate system as avatar pivots */}
                {[310, 241, 172, 103].map((r) => (
                  <div
                    key={r}
                    style={{
                      position: 'absolute',
                      width: r * 2,
                      height: r * 2,
                      left: 630 - r,
                      top: 270 - r,
                      borderRadius: '50%',
                      border: '1.2px solid rgba(248, 247, 242, 0.35)',
                      pointerEvents: 'none',
                    }}
                  />
                ))}
                {teamAvatars.map((av) => {
                  // Same center as CSS orbit rings
                  const pivotX = 650
                  const pivotY = 270
                  // Outer orbits move slower, inner orbits faster
                  const duration = av.radius >= 300 ? 30 : av.radius >= 230 ? 22 : av.radius >= 160 ? 16 : 12

                  return (
                    <motion.div
                      key={av.id}
                      className={styles.orbitPivot}
                      style={{ left: pivotX, top: pivotY }}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration, ease: 'linear' }}
                    >
                      <div
                        className={styles.orbitArm}
                        style={{ transform: `rotate(${av.angle}deg) translateX(${av.radius}px)` }}
                      >
                        {/* Counter-rotate to cancel pivot + arm angle — keeps face upright */}
                        <motion.div
                          className={styles.avatarNodeItem}
                          style={{ width: av.size, height: av.size }}
                          animate={{ rotate: [-(av.angle), -(360 + av.angle)] }}
                          transition={{ repeat: Infinity, duration, ease: 'linear' }}
                        >
                          <div
                            className={styles.avatarNodeImg}
                            style={{ backgroundImage: `url(${av.url})` }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Social Channels */}
              <div className={styles.socialsWrapper}>
                <p className={styles.socialsTitle}>Follow Us</p>
                <div className={styles.socialsRow}>
                  {['f', 'ig', 'in'].map((soc) => (
                    <a key={soc} href="#" className={styles.socialBtn}>
                      {soc === 'f' && (
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      )}
                      {soc === 'ig' && (
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      )}
                      {soc === 'in' && (
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Multi-Step Interactive Form */}
          <div className={styles.formArea}>
            {isSubmitted ? (
              <div className={styles.successWrapper}>
                <span className={styles.successIcon}>✓</span>
                <h3 className={styles.successTitle}>Thank You!</h3>
                <p className={styles.successDesc}>
                  Your consultation request has been received. Our team will verify details and reach out within 1 business day.
                </p>
                <button onClick={() => { setStep(1); setIsSubmitted(false); setSelectedServices([]); setSelectedDays([]); setSelectedTimes([]); setSelectedBudget(''); setSubmitError(null); setIsSubmitting(false); }} className={styles.btnGradient}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formElement}>
                {/* Steps Progress Indicator */}
                <div className={styles.progressRow}>
                  {/* Step 1 indicator */}
                  <div className={styles.progressStep}>
                    <div className={`${styles.progressCircle} ${step >= 1 ? styles.circleActive : ''}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className={`${styles.progressLabelNumber} ${step >= 1 ? styles.labelActive : ''}`}>STEP 1</span>
                    <span className={`${styles.progressLabel} ${step >= 1 ? styles.labelActive : ''}`}>User Details</span>
                  </div>

                  <div className={`${styles.progressBarLine} ${step >= 2 ? styles.lineActive : ''}`} />

                  {/* Step 2 indicator */}
                  <div className={styles.progressStep}>
                    <div className={`${styles.progressCircle} ${step >= 2 ? styles.circleActive : ''}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z" />
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                      </svg>
                    </div>
                    <span className={`${styles.progressLabelNumber} ${step >= 2 ? styles.labelActive : ''}`}>STEP 2</span>
                    <span className={`${styles.progressLabel} ${step >= 2 ? styles.labelActive : ''}`}>Select Service</span>
                  </div>

                  <div className={`${styles.progressBarLine} ${step >= 3 ? styles.lineActive : ''}`} />

                  {/* Step 3 indicator */}
                  <div className={styles.progressStep}>
                    <div className={`${styles.progressCircle} ${step >= 3 ? styles.circleActive : ''}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <span className={`${styles.progressLabelNumber} ${step >= 3 ? styles.labelActive : ''}`}>STEP 3</span>
                    <span className={`${styles.progressLabel} ${step >= 3 ? styles.labelActive : ''}`}>Schedule</span>
                  </div>

                  <div className={`${styles.progressBarLine} ${step >= 4 ? styles.lineActive : ''}`} />

                  {/* Step 4 indicator */}
                  <div className={styles.progressStep}>
                    <div className={`${styles.progressCircle} ${step >= 4 ? styles.circleActive : ''}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <span className={`${styles.progressLabelNumber} ${step >= 4 ? styles.labelActive : ''}`}>STEP 4</span>
                    <span className={`${styles.progressLabel} ${step >= 4 ? styles.labelActive : ''}`}>Budget</span>
                  </div>
                </div>

                <div className={styles.formBody}>
                  {/* STEP 1: CONTACT DETAILS */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={styles.stepContent}
                    >
                      <h2 className={styles.formStepTitle}>Contact Us</h2>
                      <p className={styles.formStepSubtitle}>
                        Have a question or want to discuss your growth goals?<br />
                        Our team is ready to help and usually responds within one business day.
                      </p>

                      <div className={styles.inputGrid}>
                        <div className={styles.inputCol}>
                          <label className={styles.inputLabel}>Your Name*</label>
                          <input
                            type="text"
                            placeholder="Ex. John Doe"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className={styles.textInput}
                            required
                          />
                        </div>
                        <div className={styles.inputCol}>
                          <label className={styles.inputLabel}>Email*</label>
                          <input
                            type="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className={styles.textInput}
                            required
                          />
                        </div>
                        <div className={styles.inputCol}>
                          <label className={styles.inputLabel}>Phone*</label>
                          <input
                            type="tel"
                            placeholder="Enter Phone Number"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className={styles.textInput}
                            required
                          />
                        </div>
                        <div className={styles.inputCol}>
                          <label className={styles.inputLabel}>City</label>
                          <input
                            type="text"
                            placeholder="Ex. Lahore"
                            value={formData.city}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                            className={styles.textInput}
                          />
                        </div>
                        <div className={`${styles.inputCol} ${styles.inputColFull}`}>
                          <label className={styles.inputLabel}>Message*</label>
                          <textarea
                            placeholder="Enter your details here..."
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            className={styles.textareaInput}
                            rows={4}
                            required
                          />
                        </div>
                      </div>

                      <div className={styles.actionsRow}>
                        <button type="button" onClick={nextStep} className={styles.btnGradient}>
                          Next
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: SELECT SERVICES */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={styles.stepContent}
                    >
                      <h2 className={styles.formStepTitle}>Select Services</h2>
                      <p className={styles.formStepSubtitle}>
                        Select one or more services you are interested in.
                      </p>

                      <div className={styles.pillsSection}>
                        <div className={styles.pillsGrid}>
                          {servicesList.map(srv => {
                            const isSel = selectedServices.includes(srv)
                            return (
                              <button
                                type="button"
                                key={srv}
                                onClick={() => toggleService(srv)}
                                className={`${styles.pillBtn} ${isSel ? styles.pillBtnSelected : ''}`}
                              >
                                {srv}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className={styles.actionsRow}>
                        <button type="button" onClick={prevStep} className={styles.btnFlat}>
                          Previous
                        </button>
                        <button type="button" onClick={nextStep} className={styles.btnGradient}>
                          Next
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: SCHEDULING DETAILS */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={styles.stepContent}
                    >
                      <h2 className={styles.formStepTitle}>Schedule Consultation</h2>
                      <p className={styles.formStepSubtitle}>
                        Select your preferred day and time to consult.
                      </p>

                      <div className={styles.pillsSection}>
                        <h4 className={styles.sectionHeading}>Preferred Day to Contact</h4>
                        <div className={styles.pillsRow}>
                          {daysList.map(day => {
                            const isSel = selectedDays.includes(day)
                            return (
                              <button
                                type="button"
                                key={day}
                                onClick={() => toggleDay(day)}
                                className={`${styles.dayTimePill} ${isSel ? styles.dayTimePillSelected : ''}`}
                              >
                                {day}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className={styles.pillsSection}>
                        <h4 className={styles.sectionHeading}>Preferred Time to Consult</h4>
                        <div className={styles.timesGrid}>
                          {timesList.map(time => {
                            const isSel = selectedTimes.includes(time)
                            return (
                              <button
                                type="button"
                                key={time}
                                onClick={() => toggleTime(time)}
                                className={`${styles.dayTimePill} ${isSel ? styles.dayTimePillSelected : ''}`}
                              >
                                {time}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className={styles.actionsRow}>
                        <button type="button" onClick={prevStep} className={styles.btnFlat}>
                          Previous
                        </button>
                        <button type="button" onClick={nextStep} className={styles.btnGradient}>
                          Next
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: BUDGET DETAILS */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={styles.stepContent}
                    >
                      <h2 className={styles.formStepTitle}>Select Budget</h2>
                      <p className={styles.formStepSubtitle}>
                        Select the monthly budget range for your project.
                      </p>

                      <div className={styles.pillsSection}>
                        <div className={styles.pillsGrid}>
                          {budgetsList.map(bgt => {
                            const isSel = selectedBudget === bgt
                            return (
                              <button
                                type="button"
                                key={bgt}
                                onClick={() => selectBudget(bgt)}
                                className={`${styles.pillBtn} ${isSel ? styles.pillBtnSelected : ''}`}
                              >
                                {bgt}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className={styles.actionsRow}>
                        <button type="button" onClick={prevStep} className={styles.btnFlat}>
                          Previous
                        </button>
                        <button
                          type="submit"
                          className={styles.btnGradient}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Booking...' : 'Book Now'}
                        </button>
                      </div>
                      {submitError && (
                        <p className={styles.errorText}>
                          {submitError}
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Bottom details block inside formArea */}
                <div className={styles.bottomContactRow}>
                  <div className={styles.bottomBlock}>
                    <h5 className={styles.bottomBlockTitle}>Address</h5>
                    <p className={styles.bottomBlockText}>
                      Unit 304 3rd Floor Aidan House, Sunderland Rd,<br />
                      Tynegate Precinct, Gateshead NE8 3HU
                    </p>
                  </div>
                  <div className={styles.bottomBlock}>
                    <h5 className={styles.bottomBlockTitle}>Contact</h5>
                    <p className={styles.bottomBlockText}>
                      Phone : <a href="tel:+441913483900" className={styles.bottomLink}>+44 191 348 3900</a><br />
                      Email : <a href="mailto:info@krtaskerdigital.com" className={styles.bottomLink}>info@krtaskerdigital.com</a>
                    </p>
                  </div>
                  <div className={styles.bottomBlock}>
                    <h5 className={styles.bottomBlockTitle}>Time</h5>
                    <p className={styles.bottomBlockText}>
                      24/7 Service<br />
                      Monday to Sunday
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
