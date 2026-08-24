'use client'

import { motion, useInView } from 'framer-motion'
import { type FormEvent, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

const links = {
  Services: [
    'Digital Marketing',
    'Websites & Apps',
    'Ai Solutions',
    'PPC',
    'SMM',
    'SEO',
    'Branding',
    'Graphics',
    'Amazon',
  ],
  Company: ['About Us', 'Our Work', 'Our Blogs', 'Contact Us', 'Meet The Team'],
  Legal: ['Terms & Conditions', 'Privacy Policy', 'Cookies Policy'],
}

const linkDestinations: Record<string, string> = {
  'About Us': '/about',
  'Our Work': '/work',
  'Our Blogs': '/blog',
  'Contact Us': '/contact',
  'Meet The Team': '/team',
  'Digital Marketing': '/services/digital-marketing',
  'Websites & Apps': '/services/websites-apps',
  'Ai Solutions': '/services/ai-solutions',
  PPC: '/services/ppc',
  SMM: '/services/social-media',
  SEO: '/services/seo',
  Branding: '/services/branding',
  Graphics: '/services/graphic-design',
  Amazon: '/services/amazon-ebay',
  'Terms & Conditions': '/terms',
  'Privacy Policy': '/privacy',
  'Cookies Policy': '/cookies',
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
] as const

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 720)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false)
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

  const handleNewsletter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: newsletterEmail,
          phone: '+440000000000',
          city: 'Website Subscriber',
          message: 'User subscribed to KR Tasker Digital Newsletter.',
          services: ['Newsletter Insights'],
          preferredDays: ['Mon'],
          preferredTimes: ['9:00'],
          budget: 'N/A',
          website: '',
        }),
      })
      setNewsletterSuccess(true)
      setNewsletterEmail('')
    } catch (err) {
      console.error('Newsletter submission error', err)
    } finally {
      setNewsletterSubmitting(false)
    }
  }

  return (
    <footer ref={ref} className={styles.footerWrapper}>
      <div className={styles.footerCard}>
        {/* Single responsive footer shape */}
        <svg
          className={styles.footerShape}
          viewBox={isMobile ? "0 0 390 811" : "0 0 1440 811"}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={isMobile
              ? "M 98 0 C 84.7 0, 74 10.7, 74 24 V 100 C 74 113.3, 63.3 124, 50 124 H 0 V 787 C 0 800.3, 10.7 811, 24 811 H 366 C 379.3 811, 390 800.3, 390 787 V 24 C 390 10.7, 379.3 0, 366 0 H 98 Z"
              : "M1238 14C1243.52 14 1248 18.4772 1248 24V43C1248 48.5228 1252.48 53 1258 53H1430C1435.52 53 1440 57.4772 1440 63V801C1440 806.523 1435.52 811 1430 811H10C4.47715 811 0 806.523 0 801V176C0 170.477 4.47715 166 10 166H66C71.5229 166 76 161.523 76 156V24C76 18.4772 80.4771 14 86 14H1238Z"
            }
            fill="currentColor"
          />
        </svg>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles.sendMeBackTab}
          aria-label="Scroll back to the top"
        >
          <span className={styles.arrowCircle} aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="20" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </span>
          <span className={styles.sendMeBackText}>
            Send <br /> Me <br /> Back
          </span>
        </button>

        <nav className={styles.socialsTab} aria-label="Social media links">
          {socialLinks.map(({ name, href, icon }) => (
            <a key={name} href={href} className={styles.socialIcon} aria-label={name}>
              {icon === 'facebook' && (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28 14.0856C28 6.30631 21.732 0 14 0C6.26801 0 0 6.30631 0 14.0856C0 21.116 5.11957 26.9433 11.8125 28V18.1572H8.25781V14.0856H11.8125V10.9823C11.8125 7.45214 13.9027 5.50217 17.1005 5.50217C18.6318 5.50217 20.2344 5.77728 20.2344 5.77728V9.24365H18.4691C16.73 9.24365 16.1875 10.3295 16.1875 11.4445V14.0856H20.0703L19.4496 18.1572H16.1875V28C22.8804 26.9433 28 21.116 28 14.0856Z" fill="#0C4651"/>
</svg>
              )}

              {icon === 'linkedin' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="#0C4651"/>
</svg>
              )}

              {icon === 'instagram' && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r=".8" fill="currentColor" stroke="none" />
                </svg>
              )}
            </a>
          ))}
        </nav>

        <div className={styles.content}>
          <div className={styles.mainRow}>
            <div className={styles.linksArea}>
              {Object.entries(links).map(([column, items], columnIndex) => (
                <div key={column} className={styles.linkColumn}>
                  <p className={styles.colTitle}>{column}</p>
                  <div className={styles.linksList}>
                    {items.map((link, linkIndex) => (
                      <Link
                        key={link}
                        href={linkDestinations[link] || '#'}
                        className={styles.link}
                      >
                        <motion.span
                          initial={{ opacity: 0, y: 18 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            delay: columnIndex * 0.1 + linkIndex * 0.045,
                            duration: 0.38,
                          }}
                        >
                          {link}
                        </motion.span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.newsletter}>
              <p className={styles.newsletterTitle}>Newsletter</p>
              <p className={styles.newsletterDesc}>
                Stay up to date with the latest digital marketing insights, tips, and news.
              </p>

              {newsletterSuccess ? (
                <div style={{ color: '#E6FF2A', fontWeight: 'bold', fontSize: '14px', paddingTop: '8px' }}>
                  ✓ Thank you for subscribing!
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleNewsletter}>
                  <label htmlFor="footer-email" className={styles.srOnly}>
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    name="email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="Enter Your Email"
                    className={styles.input}
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={newsletterSubmitting}
                    whileHover={{ scale: 1.035, boxShadow: '0 0 20px rgba(230,255,42,.32)' }}
                    whileTap={{ scale: 0.98 }}
                    className={styles.btnSubscribe}
                  >
                    {newsletterSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                  </motion.button>
                </form>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={styles.bigTextWrapper}
          >
            <h2 className={styles.bigText}>
              <span className={styles.textLime}>Marketing</span>
              <span className={styles.textCream}> Since 2026</span>
            </h2>
          </motion.div>

          <div className={styles.bottomBar}>
            <div className={styles.infoBlock}>
              <p className={styles.infoTitle}>Address</p>
              <div className={styles.infoDesc}>
                Unit 304 3rd Floor Aidan House, Sunderland Rd,
                Tynegate Precinct, Gateshead NE8 3HU
              </div>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoTitle}>Contact</p>
              <div className={styles.infoDesc}>
                Phone:{' '}
                <a href="tel:+441913483900" className={styles.infoLink}>
                  +44 191 348 3900
                </a>
                <br />
                Email:{' '}
                <a href="mailto:info@krtaskerdigital.com" className={styles.infoLink}>
                  info@krtaskerdigital.com
                </a>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoTitle}>Time</p>
              <div className={styles.infoDesc}>
                24/7 Service
                <br />
                Monday - Sunday
              </div>
            </div>

            <div className={styles.copyrightBlock}>
              <p className={styles.copyright}>© 2026 KR Tasker Digital. All Rights Reserved.</p>
              <Link href="/contact" className={styles.btnCta}>
                Start A Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}