'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import styles from './Navbar.module.css'
import type { ServiceRecord } from '@/lib/cms-types'

interface ServiceCategory {
  title: string
  items: { label: string; href: string; badge?: string }[]
}

const DEFAULT_CORE_SERVICES: ServiceCategory[] = [
  {
    title: 'Digital Marketing',
    items: [
      { label: 'Digital 360', href: '/services/digital-360' },
      { label: 'SEO & Organic Growth', href: '/services/seo' },
      { label: 'PPC & Paid Search', href: '/services/ppc' },
      { label: 'Social Media Marketing', href: '/services/social-media' },
      { label: 'Email Marketing', href: '/services/email-marketing' },
      { label: 'Marketing Strategy', href: '/services/marketing' },
    ],
  },
  {
    title: 'Websites & Apps',
    items: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Shopify Development', href: '/services/shopify-development' },
      { label: 'Websites & Apps', href: '/services/websites-apps' },
      { label: 'Branding & Identity', href: '/services/branding' },
      { label: 'Graphic Design', href: '/services/graphic-design' },
      { label: 'Amazon & eBay', href: '/services/amazon-ebay' },
    ],
  },
  {
    title: 'AI & Automation',
    items: [
      { label: 'AI Solutions', href: '/services/ai-solutions', badge: 'POPULAR' },
      { label: 'AI Automation', href: '/services/ai-automation' },
      { label: 'Business Consultancy', href: '/services/business-consultancy' },
    ],
  },
]

const BUSINESS_OBJECTIVES = [
  { label: 'Increase Brand Awareness', href: '/services/branding' },
  { label: 'Improve Search Engine Rankings', href: '/services/seo' },
  { label: 'Scale Paid Conversions & Leads', href: '/services/ppc' },
  { label: 'Full-Funnel Digital 360', href: '/services/digital-360' },
  { label: 'Automate Business Workflows', href: '/services/ai-automation' },
  { label: 'Scale E-Commerce Revenue', href: '/services/shopify-development' },
]

const INDUSTRIES = [
  { label: 'E-Commerce & Retail', href: '/services/shopify-development' },
  { label: 'Technology & SaaS', href: '/services/web-development' },
  { label: 'B2B & Professional Services', href: '/services/business-consultancy' },
  { label: 'Enterprise AI & Automation', href: '/services/ai-solutions' },
]

type DropdownKey = 'services' | 'objectives' | 'industries' | null

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(false)
  const [pillStyle, setPillStyle] = useState<{
    backgroundColor?: string
    borderColor?: string
  }>({})
  const [coreServices, setCoreServices] = useState<ServiceCategory[]>(DEFAULT_CORE_SERVICES)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Dynamically load additional services from CMS / Admin Panel
  useEffect(() => {
    fetch('/api/cms/services')
      .then((res) => (res.ok ? res.json() : []))
      .then((services: ServiceRecord[]) => {
        if (Array.isArray(services) && services.length > 0) {
          const published = services.filter((s) => s.status === 'published')
          if (published.length === 0) return

          // Base curated lists
          const digitalMarketingItems = [
            { label: 'Digital 360', href: '/services/digital-360' },
            { label: 'SEO & Organic Growth', href: '/services/seo' },
            { label: 'PPC & Paid Search', href: '/services/ppc' },
            { label: 'Social Media Marketing', href: '/services/social-media' },
            { label: 'Email Marketing', href: '/services/email-marketing' },
            { label: 'Marketing Strategy', href: '/services/marketing' },
          ]

          const websitesAppsItems = [
            { label: 'Web Development', href: '/services/web-development' },
            { label: 'Shopify Development', href: '/services/shopify-development' },
            { label: 'Websites & Apps', href: '/services/websites-apps' },
            { label: 'Branding & Identity', href: '/services/branding' },
            { label: 'Graphic Design', href: '/services/graphic-design' },
            { label: 'Amazon & eBay', href: '/services/amazon-ebay' },
          ]

          const aiAutomationItems = [
            { label: 'AI Solutions', href: '/services/ai-solutions', badge: 'POPULAR' },
            { label: 'AI Automation', href: '/services/ai-automation' },
            { label: 'Business Consultancy', href: '/services/business-consultancy' },
          ]

          const existingHrefs = new Set([
            ...digitalMarketingItems.map((i) => i.href),
            ...websitesAppsItems.map((i) => i.href),
            ...aiAutomationItems.map((i) => i.href),
          ])

          // Append any newly added custom services dynamically into the 3 clean pillars
          published.forEach((s) => {
            const rawSlug = s.slug.startsWith('/') ? s.slug : `/services/${s.slug}`
            if (existingHrefs.has(rawSlug)) return

            const rawCat = (s.eyebrow || '').toLowerCase()
            const rawName = (s.name || '').toLowerCase()
            const badge =
              /ai-solutions/i.test(s.slug) || /popular/i.test(s.eyebrow || '') ? 'POPULAR' : undefined
            const newItem = { label: s.name, href: rawSlug, badge }

            if (
              /marketing|seo|ppc|social|email|growth|paid/i.test(rawCat) ||
              /marketing|seo|ppc|social|email|growth/i.test(rawName)
            ) {
              digitalMarketingItems.push(newItem)
            } else if (
              /ai|auto|intel|agent|consult|bot/i.test(rawCat) ||
              /ai|auto|intel|agent|consult/i.test(rawName)
            ) {
              aiAutomationItems.push(newItem)
            } else {
              websitesAppsItems.push(newItem)
            }
            existingHrefs.add(rawSlug)
          })

          setCoreServices([
            { title: 'Digital Marketing', items: digitalMarketingItems },
            { title: 'Websites & Apps', items: websitesAppsItems },
            { title: 'AI & Automation', items: aiAutomationItems },
          ])
        }
      })
      .catch((err) => console.error('Error loading navigation services:', err))
  }, [])

  useEffect(() => {
    const handleScrollAndTheme = () => {
      setScrolled(window.scrollY > 20)

      if (typeof window === 'undefined') return

      const navMid = navRef.current ? navRef.current.getBoundingClientRect().top + 35 : 35
      const checkX = window.innerWidth / 2

      let isDark = false
      let detectedBg = ''
      let rVal = 248
      let gVal = 247
      let bVal = 242

      // 1. Query elements at checkpoint under the navbar
      if (document.elementsFromPoint) {
        const elements = document.elementsFromPoint(checkX, navMid)
        for (const el of elements) {
          if (
            el.closest('header') ||
            el.tagName.toLowerCase() === 'header' ||
            el.classList.contains(styles.header) ||
            el.classList.contains(styles.pillNav)
          ) {
            continue
          }

          let curr: HTMLElement | null = el as HTMLElement
          while (curr && curr !== document.body && curr !== document.documentElement) {
            if (
              curr.getAttribute('data-theme') === 'dark' ||
              curr.classList.contains('darkSection') ||
              curr.classList.contains('dark') ||
              curr.tagName.toLowerCase() === 'footer'
            ) {
              isDark = true
              rVal = 12
              gVal = 70
              bVal = 81
              break
            }

            const bg = window.getComputedStyle(curr).backgroundColor
            if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
              const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
              if (match) {
                const r = parseInt(match[1], 10)
                const g = parseInt(match[2], 10)
                const b = parseInt(match[3], 10)
                const a = match[4] !== undefined ? parseFloat(match[4]) : 1
                if (a > 0.35) {
                  rVal = r
                  gVal = g
                  bVal = b
                  const luminance = 0.299 * r + 0.587 * g + 0.114 * b
                  if (luminance < 140) {
                    isDark = true
                  }
                  detectedBg = bg
                  break
                }
              }
            }
            curr = curr.parentElement
          }
          if (detectedBg || isDark) break
        }
      }

      // 2. Fallback check intersecting dark elements by bounding box
      if (!isDark && !detectedBg) {
        const darkCandidates = document.querySelectorAll(
          '[data-theme="dark"], .darkSection, footer, section[class*="dark"], section[class*="footer"], div[class*="contactCard"], section[class*="contact"]'
        )
        for (let i = 0; i < darkCandidates.length; i++) {
          const rect = darkCandidates[i].getBoundingClientRect()
          if (rect.top <= navMid && rect.bottom >= navMid) {
            isDark = true
            rVal = 12
            gVal = 70
            bVal = 81
            break
          }
        }
      }

      setIsDarkSection(isDark)

      // Dynamically compute the pill's translucent frosted background from the section color
      if (isDark) {
        setPillStyle({
          backgroundColor: `rgba(${rVal}, ${gVal}, ${bVal}, 0.45)`,
          borderColor: 'rgba(255, 255, 255, 0.28)',
        })
      } else {
        setPillStyle({
          backgroundColor: `rgba(${rVal}, ${gVal}, ${bVal}, 0.65)`,
          borderColor: 'rgba(12, 70, 81, 0.14)',
        })
      }
    }

    handleScrollAndTheme()
    window.addEventListener('scroll', handleScrollAndTheme, { passive: true })
    window.addEventListener('resize', handleScrollAndTheme, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScrollAndTheme)
      window.removeEventListener('resize', handleScrollAndTheme)
    }
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMouseEnter = (key: DropdownKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(key)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const toggleDropdown = (key: DropdownKey) => {
    setActiveDropdown(prev => (prev === key ? null : key))
  }

  const toggleAccordion = (key: string) => {
    setMobileAccordion(prev => (prev === key ? null : key))
  }

  return (
    <header
      ref={navRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${
        isDarkSection ? styles.darkTheme : ''
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.container}>
        {/* Left: Brand Logo */}
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        {/* Center: Frosted Glass Pill Navigation Bar (adapts dynamically to section color with blur) */}
        <nav
          className={styles.pillNav}
          style={pillStyle}
          aria-label="Main Navigation"
        >
          <ul className={styles.navList}>
            {/* Core Services Dropdown (Dynamic from CMS) */}
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('services')}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('services')}
                className={`${styles.navButton} ${
                  activeDropdown === 'services' || pathname.startsWith('/services')
                    ? styles.activeNav
                    : ''
                }`}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                <span>Core Services</span>
                <svg
                  className={`${styles.chevron} ${activeDropdown === 'services' ? styles.chevronOpen : ''}`}
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.25L5.5 5.75L10 1.25"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={`${styles.megaMenu} ${styles.servicesMegaMenu}`}
                    onMouseEnter={() => handleMouseEnter('services')}
                  >
                    <div className={styles.megaGrid}>
                      {coreServices.map((cat) => (
                        <div key={cat.title} className={styles.megaColumn}>
                          <div className={styles.categoryTitle}>{cat.title}</div>
                          <ul className={styles.categoryList}>
                            {cat.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  className={styles.megaLink}
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className={styles.megaLinkLabelRow}>
                                    <span className={styles.megaLinkLabel}>{item.label}</span>
                                    {item.badge && <span className={styles.megaBadge}>{item.badge}</span>}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className={styles.megaFooter}>
                      <span className={styles.megaFooterText}>
                        Transforming businesses with bespoke strategy, engineering & marketing.
                      </span>
                      <Link
                        href="/services"
                        className={styles.megaFooterLink}
                        onClick={() => setActiveDropdown(null)}
                      >
                        Explore All Services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Business Objectives Dropdown */}
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('objectives')}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('objectives')}
                className={`${styles.navButton} ${
                  activeDropdown === 'objectives' ? styles.activeNav : ''
                }`}
                aria-expanded={activeDropdown === 'objectives'}
                aria-haspopup="true"
              >
                <span>Business Objectives</span>
                <svg
                  className={`${styles.chevron} ${activeDropdown === 'objectives' ? styles.chevronOpen : ''}`}
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.25L5.5 5.75L10 1.25"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {activeDropdown === 'objectives' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={`${styles.dropdownMenu} ${styles.objectivesDropdown}`}
                    onMouseEnter={() => handleMouseEnter('objectives')}
                  >
                    <div className={styles.dropdownHeader}>GROWTH GOALS</div>
                    <ul className={styles.dropdownList}>
                      {BUSINESS_OBJECTIVES.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className={styles.dropdownLink}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className={styles.dropdownItemTitle}>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Industries Dropdown */}
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('industries')}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('industries')}
                className={`${styles.navButton} ${
                  activeDropdown === 'industries' ? styles.activeNav : ''
                }`}
                aria-expanded={activeDropdown === 'industries'}
                aria-haspopup="true"
              >
                <span>Industries</span>
                <svg
                  className={`${styles.chevron} ${activeDropdown === 'industries' ? styles.chevronOpen : ''}`}
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.25L5.5 5.75L10 1.25"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {activeDropdown === 'industries' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={`${styles.dropdownMenu} ${styles.industriesDropdown}`}
                    onMouseEnter={() => handleMouseEnter('industries')}
                  >
                    <div className={styles.dropdownHeader}>SECTOR EXPERTISE</div>
                    <ul className={styles.dropdownList}>
                      {INDUSTRIES.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className={styles.dropdownLink}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className={styles.dropdownItemTitle}>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Direct Link: Case Studies */}
            <li className={styles.navItem}>
              <Link
                href="/work"
                className={`${styles.navLink} ${pathname === '/work' ? styles.activeNav : ''}`}
              >
                Case Studies
              </Link>
            </li>

            {/* Direct Link: About Us */}
            <li className={styles.navItem}>
              <Link
                href="/about"
                className={`${styles.navLink} ${pathname === '/about' ? styles.activeNav : ''}`}
              >
                About Us
              </Link>
            </li>

            {/* Direct Link: Blog */}
            <li className={styles.navItem}>
              <Link
                href="/blog"
                className={`${styles.navLink} ${pathname.startsWith('/blog') ? styles.activeNav : ''}`}
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right: Contact Us CTA Button */}
        <div className={styles.actionWrapper}>
          <Link href="/contact" className={styles.contactBtn}>
            Contact Us
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barOpenTop : ''}`} />
            <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barOpenMid : ''}`} />
            <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barOpenBot : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.mobileBackdrop}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={styles.mobileDrawer}
            >
              <div className={styles.drawerHeader}>
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerCloseBtn}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className={styles.drawerBody}>
                {/* Core Services Accordion */}
                <div className={styles.drawerAccordion}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('services')}
                    className={styles.accordionHeader}
                  >
                    <span>Core Services</span>
                    <span
                      className={`${styles.accordionIcon} ${
                        mobileAccordion === 'services' ? styles.accordionIconOpen : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'services' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.accordionContent}
                      >
                        {coreServices.map((cat) => (
                          <div key={cat.title} className={styles.mobileCatGroup}>
                            <div className={styles.mobileCatTitle}>{cat.title}</div>
                            {cat.items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={styles.mobileSubLink}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Business Objectives Accordion */}
                <div className={styles.drawerAccordion}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('objectives')}
                    className={styles.accordionHeader}
                  >
                    <span>Business Objectives</span>
                    <span
                      className={`${styles.accordionIcon} ${
                        mobileAccordion === 'objectives' ? styles.accordionIconOpen : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'objectives' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.accordionContent}
                      >
                        {BUSINESS_OBJECTIVES.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={styles.mobileSubLink}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Industries Accordion */}
                <div className={styles.drawerAccordion}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('industries')}
                    className={styles.accordionHeader}
                  >
                    <span>Industries</span>
                    <span
                      className={`${styles.accordionIcon} ${
                        mobileAccordion === 'industries' ? styles.accordionIconOpen : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'industries' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.accordionContent}
                      >
                        {INDUSTRIES.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={styles.mobileSubLink}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Direct Links */}
                <Link
                  href="/work"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerDirectLink}
                >
                  Case Studies
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerDirectLink}
                >
                  About Us
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerDirectLink}
                >
                  Blog
                </Link>
              </div>

              <div className={styles.drawerFooter}>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerCtaBtn}
                >
                  Contact Us
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
