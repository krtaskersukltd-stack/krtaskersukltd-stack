'use client'

import { motion, useInView } from 'framer-motion'
import { type FormEvent, useRef } from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

const links = {
  Services: [
    'Digital Marketing',
    'Websites & Apps',
    'Ai Solutions',
    'PPC',
    'Social Media Marketing',
    'SEO',
    'Branding',
    'Graphics Designing',
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
  'Meet The Team': '/about#team',
  'Digital Marketing': '/services/digital-marketing',
  'Websites & Apps': '/services/websites-apps',
  'Ai Solutions': '/services/ai-solutions',
  PPC: '/services/ppc',
  'Social Media Marketing': '/services/social-media',
  SEO: '/services/seo',
  Branding: '/services/branding',
  'Graphics Designing': '/services/graphics-designing',
  Amazon: '/services/amazon',
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

  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <footer ref={ref} className={styles.footerWrapper}>
      <div className={styles.footerCard}>
        {/* Exact outer silhouette taken from the supplied 1440 × 811 footer SVG. */}
        <svg
          className={styles.footerShape}
          viewBox="0 0 1440 811"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M1238 14C1243.52 14 1248 18.4772 1248 24V43C1248 48.5228 1252.48 53 1258 53H1430C1435.52 53 1440 57.4772 1440 63V801C1440 806.523 1435.52 811 1430 811H10C4.47715 811 0 806.523 0 801V176C0 170.477 4.47715 166 10 166H66C71.5229 166 76 161.523 76 156V24C76 18.4772 80.4771 14 86 14H1238Z"
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
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.7 21v-8h2.8l.42-3.12H13.7v-2c0-.9.25-1.52 1.6-1.52H17V3.58a22.6 22.6 0 0 0-2.48-.13c-2.45 0-4.12 1.5-4.12 4.25v2.18H7.63V13h2.77v8h3.3Z" />
                </svg>
              )}

              {icon === 'linkedin' && (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M5.3 3.9a2 2 0 1 1 0 4.01 2 2 0 0 1 0-4ZM3.58 9.5h3.45V20H3.58V9.5Zm5.6 0h3.3v1.44h.05c.46-.87 1.58-1.78 3.25-1.78 3.48 0 4.12 2.29 4.12 5.27V20h-3.44v-4.94c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V20H9.18V9.5Z" />
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

              <form className={styles.form} onSubmit={handleNewsletter}>
                <label htmlFor="footer-email" className={styles.srOnly}>
                  Email address
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter Your Email"
                  className={styles.input}
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.035, boxShadow: '0 0 20px rgba(230,255,42,.32)' }}
                  whileTap={{ scale: 0.98 }}
                  className={styles.btnSubscribe}
                >
                  Subscribe Now
                </motion.button>
              </form>
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
                <br />
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