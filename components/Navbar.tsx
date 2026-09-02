'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import styles from './Navbar.module.css'
import type { ServiceRecord } from '@/lib/cms-types'

interface MainServiceItem {
  title: string
  tagline: string
  href: string
}

const MAIN_SERVICES: MainServiceItem[] = [
  {
    title: 'Web Design',
    tagline: 'Deliver your business to a wider audience',
    href: '/services/web-development',
  },
  {
    title: 'AI & Automation',
    tagline: 'Smart workflows and intelligent solutions',
    href: '/services/ai-solutions',
  },
  {
    title: 'Branding',
    tagline: "Creating brands you're proud of",
    href: '/services/branding',
  },
  {
    title: 'SEO',
    tagline: 'Get your brand seen online',
    href: '/services/seo',
  },
  {
    title: 'Shopify',
    tagline: 'Custom Shopify store in 4 weeks',
    href: '/services/shopify-development',
  },
]

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

type DropdownKey = 'services' | null

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
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
      if (typeof window === 'undefined') return

      const scrollY = window.scrollY

      const isPastTop = scrollY > 20
      setScrolled(isPastTop)

      if (scrollY > 300) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }

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
        isHidden ? styles.hidden : ''
      } ${isDarkSection ? styles.darkTheme : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.container}>
        {/* Left: Brand Logo */}
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        {/* Center/Right: Navigation Menu matching inspiration */}
        <nav
          className={styles.mainNav}
          aria-label="Main Navigation"
        >
          <ul className={styles.navList}>
            {/* Services (with main services dropdown) */}
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('services')}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('services')}
                className={`${styles.navLinkBtn} ${
                  activeDropdown === 'services' || pathname.startsWith('/services')
                    ? styles.activeNav
                    : ''
                }`}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                <span>Services</span>
              </button>

              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.servicesDropdownContainer}
                    onMouseEnter={() => handleMouseEnter('services')}
                  >
                    <div className={styles.dropdownPointer} />
                    <div className={styles.servicesDropdownCard}>
                      {/* Left Column: 5 Main Services */}
                      <div className={styles.mainServicesList}>
                        {MAIN_SERVICES.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className={styles.mainServiceItem}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className={styles.mainServiceTitle}>{item.title}</span>
                            <span className={styles.mainServiceTagline}>{item.tagline}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Right Column: Featured View All Services Card */}
                      <Link
                        href="/services"
                        className={styles.viewAllCard}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className={styles.viewAllHeader}>
                          <span className={styles.viewAllTitle}>View all Services</span>
                          <span className={styles.viewAllSubtitle}>
                            We don&apos;t stop there, check out all the services we offer here at KR Tasker
                          </span>
                        </div>
                        <div className={styles.viewAllImageWrapper}>
                          <Image
                            src="/images/services/web-app-design.png"
                            alt="View all KR Tasker services"
                            width={240}
                            height={130}
                            className={styles.viewAllImage}
                          />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Direct Link: Work */}
            <li className={styles.navItem}>
              <Link
                href="/work"
                className={`${styles.navLink} ${pathname.startsWith('/work') ? styles.activeNav : ''}`}
              >
                Work
              </Link>
            </li>

            {/* Direct Link: About */}
            <li className={styles.navItem}>
              <Link
                href="/about"
                className={`${styles.navLink} ${pathname === '/about' ? styles.activeNav : ''}`}
              >
                About
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

            {/* Direct Link: Contact */}
            <li className={styles.navItem}>
              <Link
                href="/contact"
                className={`${styles.navLink} ${pathname === '/contact' ? styles.activeNav : ''}`}
              >
                Contact
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
                {/* Services Accordion */}
                <div className={styles.drawerAccordion}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('services')}
                    className={styles.accordionHeader}
                  >
                    <span className={styles.drawerHeaderLabel}>
                      Services
                    </span>
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
                        {MAIN_SERVICES.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={styles.mobileSubLink}
                          >
                            <span className={styles.mobileMainTitle}>{item.title}</span>
                            <span className={styles.mobileMainTagline}>{item.tagline}</span>
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          className={styles.mobileViewAllLink}
                        >
                          View all Services →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Direct Links matching inspiration */}
                <Link
                  href="/work"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerDirectLink}
                >
                  Work
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerDirectLink}
                >
                  About
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerDirectLink}
                >
                  Blog
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerDirectLink}
                >
                  Contact
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
