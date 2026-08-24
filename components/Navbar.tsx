'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import styles from './Navbar.module.css'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const defaultServices = [
    { label: 'Digital 360', href: '/services/digital-360' },
    { label: 'Business Consultancy', href: '/services/business-consultancy' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Shopify Development', href: '/services/shopify-development' },
    { label: 'Seo', href: '/services/seo' },
    { label: 'Graphic Design', href: '/services/graphic-design' },
    { label: 'Marketing', href: '/services/marketing' },
    { label: 'Social Media', href: '/services/social-media' },
    { label: 'Amazon & eBay', href: '/services/amazon-ebay' },
    { label: 'Email Marketing', href: '/services/email-marketing' },
    { label: 'AI Automation', href: '/services/ai-automation' },
  ]

  const [servicesList, setServicesList] = useState(defaultServices)

  useEffect(() => {
    fetch('/api/cms/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const published = data
            .filter((item: any) => item.status === 'published')
            .map((item: any) => ({
              label: item.name,
              href: item.slug.startsWith('/') ? item.slug : `/services/${item.slug}`,
            }))
          if (published.length > 0) {
            setServicesList(published)
          }
        }
      })
      .catch((err) => console.warn('Failed to load dynamic navbar services:', err))
  }, [])

  const defaultMainNav = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]

  const [mainNav, setMainNav] = useState(defaultMainNav)

  useEffect(() => {
    fetch('/api/cms/navigation')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const visible = data.filter((item: any) => item.isVisible)
          if (visible.length > 0) {
            setMainNav(visible)
          }
        }
      })
      .catch((err) => console.warn('Failed to load dynamic main navigation:', err))
  }, [])

  return (
    <motion.nav
      initial={{ y: -88, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.container}>
        
        <Logo />

        {/* Desktop links */}
        <div className={styles.links} onMouseLeave={() => setHoveredIdx(null)}>
          {mainNav.map((item, idx) => {
            const active = pathname === item.href
            return (
              <Link key={item.label} href={item.href} passHref legacyBehavior>
                <motion.a 
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`${styles.link} ${active ? styles.activeLink : ''}`}
                >
                  {item.label}
                  {/* Sliding Underline Indicator */}
                  {hoveredIdx === idx && (
                    <motion.div
                      layoutId="navHoverUnderline"
                      className={styles.hoverUnderline}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Active Link fallback line */}
                  {active && hoveredIdx !== idx && (
                    <div className={styles.activeUnderline} />
                  )}
                </motion.a>
              </Link>
            )
          })}
          <div className={styles.desktopServicesMenu} style={{ position: 'relative' }}>
            <div className={styles.servicesNavGroup}>
              <Link href="/services" className={`${styles.servicesButton} ${pathname === '/services' ? styles.activeLink : ''}`}>Services</Link>
              <motion.button whileHover={{ scale: 1.08 }} onClick={() => setServicesOpen(!servicesOpen)}
                className={styles.servicesArrowButton} aria-label="Open services menu" aria-expanded={servicesOpen}>
                <span className={`${styles.arrow} ${servicesOpen ? styles.arrowOpen : ''}`}>▾</span>
              </motion.button>
            </div>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -12, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className={styles.dropdown}
                >
                  {servicesList.map(s => (
                    <Link key={s.label} href={s.href} onClick={() => setServicesOpen(false)} className={styles.dropdownItem}>
                      {s.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop CTA */}
        <Link href="/contact" passHref legacyBehavior>
          <motion.a whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(12,70,81,0.4)' }} whileTap={{ scale: 0.97 }}
            className={styles.cta}>
            Start a project
          </motion.a>
        </Link>

        {/* Mobile Hamburger toggle */}
        <button 
          className={styles.hamburger} 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.lineOpen1 : ''}`} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.lineOpen2 : ''}`} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.lineOpen3 : ''}`} />
        </button>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={styles.drawer}
          >
            <div className={styles.drawerCloseRow}>
              <button onClick={() => setMenuOpen(false)} className={styles.drawerCloseButton}>
                ✕
              </button>
            </div>
            <div className={styles.drawerLinks}>
              {mainNav.map((item) => {
                const active = pathname === item.href
                return (
                  <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
                    className={`${styles.drawerLink} ${active ? styles.drawerActiveLink : ''}`}>
                    {item.label}
                  </Link>
                )
              })}
              
              <div className={styles.drawerServicesContainer}>
                <div className={styles.drawerServicesHeader}>
                  <Link href="/services" onClick={() => setMenuOpen(false)} className={styles.drawerServicesLink}>Services</Link>
                  <button onClick={() => setServicesOpen(!servicesOpen)} className={styles.drawerServicesToggle} aria-label="Open services menu">
                    <span className={`${styles.arrow} ${servicesOpen ? styles.arrowOpen : ''}`}>▾</span>
                  </button>
                </div>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                      className={styles.drawerDropdown}
                    >
                      {servicesList.map(s => (
                        <Link key={s.label} href={s.href} onClick={() => { setMenuOpen(false); setServicesOpen(false); }} className={styles.drawerDropdownItem}>
                          {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/contact" onClick={() => setMenuOpen(false)} className={styles.drawerCta}>
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
