'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Button from './Button'
import styles from './Footer.module.css'
import type { GlobalSectionsRecord, FooterColumn } from '@/lib/cms-types'

const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Digital Marketing', href: '/services/marketing' },
      { label: 'PPC', href: '/services/ppc' },
      { label: 'SEO', href: '/services/seo' },
      { label: 'Social Media Marketing', href: '/services/social-media' },
      { label: 'Email Marketing', href: '/services/email-marketing' },
      { label: 'AI Automation', href: '/services/ai-automation' },
      { label: 'Designing', href: '/services/graphic-design' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Work', href: '/work' },
      { label: 'Our Blogs', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Meet The Team', href: '/team' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookies Policy', href: '/cookies' },
    ],
  },
]

export default function Footer({ initialData }: { initialData?: Partial<GlobalSectionsRecord> }) {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [isMobile, setIsMobile] = useState(false)
  const [openFooterColumn, setOpenFooterColumn] = useState<string | null>(null)

  const [footerData, setFooterData] = useState<GlobalSectionsRecord>({
    ctaHeading: 'Ready to elevate your digital presence?',
    ctaDescription: 'Partner with KR Tasker Digital for bespoke web engineering, CMS solutions, and search growth.',
    ctaButtonText: 'Get Started Today',
    ctaButtonLink: '/contact',
    footerHeading: 'Digital Growth,',
    footerHeadingHighlight: 'Delivered.',
    footerPhone: '+44 191 348 3900',
    footerEmail: 'info@krtaskerdigital.co.uk',
    footerAddress: 'Unit 304 3rd Floor Aidan House, Sunderland Rd, Tynegate Precinct, Gateshead NE8 3HU',
    footerHours: '24/7 Service\nMonday - Sunday',
    footerCopyright: '© 2026 KR Tasker Digital. All Rights Reserved.',
    footerCtaText: 'Start A Project',
    footerCtaLink: '/contact',
    newsletterTitle: 'Newsletter',
    newsletterDesc: 'Stay up to date with the latest digital marketing insights, tips, and news.',
    socialFacebook: 'https://www.facebook.com/profile.php?id=61571387696002',
    socialLinkedin: 'https://www.linkedin.com/company/kr-tasker-digital/',
    socialInstagram: 'https://www.instagram.com/krtaskerdigital/',
    socialTwitter: '',
    footerColumns: DEFAULT_FOOTER_COLUMNS,
    ...initialData,
  })

  useEffect(() => {
    fetch('/api/cms/global')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === 'object') {
          setFooterData((prev) => ({
            ...prev,
            ...data,
            footerColumns:
              Array.isArray(data.footerColumns) && data.footerColumns.length > 0
                ? data.footerColumns
                : prev.footerColumns || DEFAULT_FOOTER_COLUMNS,
          }))
        }
      })
      .catch((err) => console.error('Error loading footer CMS data:', err))
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 720)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])



  const activeSocialLinks = [
    {
      name: 'Facebook',
      href: footerData.socialFacebook || 'https://www.facebook.com/profile.php?id=61571387696002',
      icon: 'facebook',
      show: Boolean(footerData.socialFacebook !== undefined ? footerData.socialFacebook : true),
    },
    {
      name: 'LinkedIn',
      href: footerData.socialLinkedin || 'https://www.linkedin.com/company/kr-tasker-digital/',
      icon: 'linkedin',
      show: Boolean(footerData.socialLinkedin !== undefined ? footerData.socialLinkedin : true),
    },
    {
      name: 'Instagram',
      href: footerData.socialInstagram || 'https://www.instagram.com/krtaskerdigital/',
      icon: 'instagram',
      show: Boolean(footerData.socialInstagram !== undefined ? footerData.socialInstagram : true),
    },
    ...(footerData.socialTwitter
      ? [
        {
          name: 'Twitter',
          href: footerData.socialTwitter,
          icon: 'twitter',
          show: true,
        },
      ]
      : []),
  ].filter((s) => s.show && s.href)

  const renderSocialIcons = (animated = true) => (
    <>
      {activeSocialLinks.map(({ name, href, icon }, index) => (
        <motion.a
          key={name}
          href={href}
          className={styles.socialIcon}
          aria-label={name}
          target="_blank"
          rel="noopener noreferrer"
          {...(animated
            ? {
              animate: { y: [0, -6, 0] },
              transition: {
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.22,
              },
            }
            : {})}
          whileHover={{ scale: 1.12, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon === 'facebook' && (
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 14.0856C28 6.30631 21.732 0 14 0C6.26801 0 0 6.30631 0 14.0856C0 21.116 5.11957 26.9433 11.8125 28V18.1572H8.25781V14.0856H11.8125V10.9823C11.8125 7.45214 13.9027 5.50217 17.1005 5.50217C18.6318 5.50217 20.2344 5.77728 20.2344 5.77728V9.24365H18.4691C16.73 9.24365 16.1875 10.3295 16.1875 11.4445V14.0856H20.0703L19.4496 18.1572H16.1875V28C22.8804 26.9433 28 21.116 28 14.0856Z" fill="#0C4651" />
            </svg>
          )}

          {icon === 'linkedin' && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="#0C4651" />
            </svg>
          )}

          {icon === 'instagram' && (
            <svg
              width="18"
              height="18"
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

          {icon === 'twitter' && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          )}
        </motion.a>
      ))}
    </>
  )

  return (
    <footer ref={ref} className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles.sendMeBackTab}
          aria-label="Scroll back to the top"
        >
          <motion.span
            className={styles.arrowCircle}
            aria-hidden="true"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.66,
            }}
          >
            <svg
              width="22"
              height="22"
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
          </motion.span>
          <span className={styles.sendMeBackText}>
            Send <br /> Me <br /> Back
          </span>
        </button>

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
                : "M1234 14 C1240 14 1245 18.5 1245 24 V58 C1245 65 1250 70 1257 70 H1428 C1435 70 1440 75 1440 82 V801 C1440 806.5 1435.5 811 1430 811 H10 C4.5 811 0 806.5 0 801 V180 C0 174 4.5 170 10 170 H70 C76 170 80 165 80 159 V24 C80 18.5 85 14 91 14 H1234 Z"
              }
              fill="currentColor"
            />
          </svg>

          <nav className={styles.socialsTab} aria-label="Social media links">
            {renderSocialIcons(true)}
          </nav>

          <div className={styles.content}>
            <div className={styles.mainRow}>
              <div className={styles.linksArea}>
                {(footerData.footerColumns && footerData.footerColumns.length > 0
                  ? footerData.footerColumns
                  : DEFAULT_FOOTER_COLUMNS
                ).map((column, columnIndex) => (
                  <div
                    key={column.title}
                    className={`${styles.linkColumn} ${openFooterColumn === column.title ? styles.linkColumnOpen : ''}`}
                  >
                    <button
                      type="button"
                      className={styles.colTitle}
                      aria-expanded={!isMobile || openFooterColumn === column.title}
                      aria-controls={`footer-${column.title.toLowerCase().replace(/\s+/g, '-')}-links`}
                      onClick={() => {
                        if (isMobile) {
                          setOpenFooterColumn(current => current === column.title ? null : column.title)
                        }
                      }}
                    >
                      <span>{column.title}</span>
                      <span className={styles.accordionIcon} aria-hidden="true">+</span>
                    </button>
                    <div id={`footer-${column.title.toLowerCase().replace(/\s+/g, '-')}-links`} className={styles.linksList}>
                      {column.links.map((linkItem, linkIndex) => (
                        <Link
                          key={linkItem.label}
                          href={linkItem.href || '#'}
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
                            {linkItem.label}
                          </motion.span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.getInTouch}>
                <p className={styles.getInTouchTitle}>Get in touch</p>
                <div className={styles.getInTouchList}>
                  <div className={styles.getInTouchItem}>
                    <span className={styles.getInTouchIcon} aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </span>
                    <a
                      href={`tel:${(footerData.footerPhone || '+44 191 348 3900').replace(/\s+/g, '')}`}
                      className={styles.getInTouchLink}
                    >
                      {footerData.footerPhone || '+44 191 348 3900'}
                    </a>
                  </div>

                  <div className={styles.getInTouchItem}>
                    <span className={styles.getInTouchIcon} aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </span>
                    <a
                      href={`mailto:${footerData.footerEmail || 'info@krtaskerdigital.co.uk'}`}
                      className={styles.getInTouchLink}
                    >
                      {footerData.footerEmail || 'info@krtaskerdigital.co.uk'}
                    </a>
                  </div>

                  <div className={styles.getInTouchItem}>
                    <span className={styles.getInTouchIcon} aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </span>
                    <div className={styles.getInTouchAddress}>
                      <p className={styles.companyName}>KR Tasker Digital</p>
                      <p>Unit 304 3rd Floor Aidan House</p>
                      <p>Sunderland Rd, Tynegate Precinct</p>
                      <p>Gateshead NE8 3HU</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className={styles.bigTextWrapper}
            >
              <AnimatedHeading as="h2" className={styles.bigText}>
                <span className={styles.textLime}>{footerData.footerHeading || 'Digital Growth,'}</span>
                <span className={styles.textCream}> {footerData.footerHeadingHighlight || 'Delivered.'}</span>
              </AnimatedHeading>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
