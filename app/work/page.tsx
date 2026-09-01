'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import styles from './WorkPage.module.css'
import CategoryTabs from '@/components/CategoryTabs'
import WorkTogetherMarquee from '@/components/WorkTogetherMarquee'
import fallbackWorkData from '@/data/cms/work.json'
import type { CaseStudyRecord } from '@/lib/cms-types'

// Categories for Work page
const filterCategories = [
  { id: 'all', label: 'All Work' },
  { id: 'websites', label: 'Websites & Apps' },
  { id: 'branding', label: 'Creative & Branding' },
  { id: 'seo', label: 'SEO' },
  { id: 'ppc', label: 'PPC & Amazon' },
  { id: 'digital360', label: 'Digital 360' },
  { id: 'meta', label: 'Google & Meta Ads' },
]

const testimonials = [
  {
    id: 't1',
    quote: 'KR Tasker Digital completely transformed our Amazon account. Our ad performance improved within weeks, and sales followed shortly after.',
    author: 'James Walker',
    role: 'Amazon Brand Owner',
    initial: 'J',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop',
  },
]

type GridItem =
  | { type: 'case'; data: CaseStudyRecord }
  | { type: 'testimonial'; data: typeof testimonials[0] }
  | { type: 'cta'; data?: undefined }

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudyRecord[]>(fallbackWorkData as CaseStudyRecord[])

  // Fetch dynamic case studies from /api/cms/work (Sanity / CMS Store)
  useEffect(() => {
    fetch('/api/cms/work')
      .then((res) => res.json())
      .then((data: CaseStudyRecord[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const published = data.filter((item) => item.status !== 'draft')
          if (published.length > 0) {
            setCaseStudiesList(published)
          }
        }
      })
      .catch(() => {
        // Safe fallback to bundled work data
      })
  }, [])

  // Dynamically compute category counts from dynamic case studies
  const filters = useMemo(() => {
    return filterCategories.map(cat => {
      if (cat.id === 'all') {
        return { ...cat, count: caseStudiesList.length }
      }
      const count = caseStudiesList.filter(
        cs => cs.category && cs.category.toLowerCase().trim() === cat.label.toLowerCase().trim()
      ).length
      return { ...cat, count }
    })
  }, [caseStudiesList])

  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' })

  // 2-Column Masonry Distribution
  const { leftColumnItems, rightColumnItems } = useMemo(() => {
    const selectedFilterObj = filters.find((f) => f.id === activeFilter)
    if (!selectedFilterObj) return { leftColumnItems: [], rightColumnItems: [] }

    // If "All Work"
    if (activeFilter === 'all') {
      const left: GridItem[] = []
      const right: GridItem[] = []

      // Testimonial sits at the top of the right column
      right.push({ type: 'testimonial', data: testimonials[0] })

      caseStudiesList.forEach((cs, idx) => {
        if (idx % 2 === 0) {
          left.push({ type: 'case', data: cs })
        } else {
          right.push({ type: 'case', data: cs })
        }
      })

      // CTA Card placed after 10 case studies in the right column
      right.push({ type: 'cta' })

      return { leftColumnItems: left, rightColumnItems: right }
    }

    // Otherwise, filter by category
    const filteredCases = caseStudiesList.filter(
      (cs) => cs.category?.toLowerCase().trim() === selectedFilterObj.label.toLowerCase().trim()
    )
    const left: GridItem[] = []
    const right: GridItem[] = []
    filteredCases.forEach((cs, idx) => {
      if (idx % 2 === 0) {
        left.push({ type: 'case', data: cs })
      } else {
        right.push({ type: 'case', data: cs })
      }
    })
    return { leftColumnItems: left, rightColumnItems: right }
  }, [activeFilter, filters, caseStudiesList])

  const scrollToContact = () => {
    const contactSec = document.getElementById('contact-form')
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderItem = (item: GridItem) => {
    if (item.type === 'case') {
      const cs = item.data as CaseStudyRecord
      const cleanSlug = (cs.slug || '').replace(/^\/work\//, '').replace(/^\//, '')
      return (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          key={`case-${cs.id || cs.slug}`}
          className={styles.caseCard}
        >
          <Link href={`/work/${cleanSlug}`} className={styles.caseCardLink}>
            <div className={styles.cardImageWrapper}>
              <div className={styles.mockupHeader}>
                <span>{cs.client}</span>
                <span className={styles.caseTechTag}>{cs.category}</span>
              </div>
              {cs.featuredImage && (
                <img
                  src={cs.featuredImage}
                  alt={cs.featuredImageAlt || cs.title}
                  className={styles.cardImage}
                />
              )}
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardClient}>
                {cs.year} {cs.client}
              </span>
              <h3 className={styles.cardTitle}>{cs.title}</h3>
            </div>
          </Link>
        </motion.div>
      )
    } else if (item.type === 'testimonial') {
      const test = item.data as typeof testimonials[0]
      return (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          key={`test-${test.id}`}
          className={styles.testimonialCard}
        >
          <span className={styles.quoteMark}>“</span>
          <p className={styles.quoteText}>{test.quote}</p>
          <div className={styles.authorSection}>
            <div className={styles.authorAvatar}>
              {test.avatarUrl ? (
                <img
                  src={test.avatarUrl}
                  alt={test.author}
                  className={styles.authorImage}
                />
              ) : (
                test.initial
              )}
            </div>
            <div>
              <p className={styles.authorName}>{test.author}</p>
              <p className={styles.authorRole}>{test.role}</p>
            </div>
          </div>
        </motion.div>
      )
    } else if (item.type === 'cta') {
      return (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          key="cta-card"
          className={styles.ctaCard}
        >
          <h3 className={styles.ctaTitle}>You&apos;re Still Here?!</h3>
          <p className={styles.ctaDesc}>You must really like us...</p>
          <button onClick={scrollToContact} className={styles.ctaButton}>
            Contact Us
          </button>
        </motion.div>
      )
    }
    return null
  }

  return (
    <main className={`${styles.workPage} page-work`}>
      <Navbar />

      {/* 1. Header / Intro Section */}
      <section ref={headerRef} className={styles.heroSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={styles.headerGrid}
          >
            <div className={styles.leftHeader}>
              <span className={styles.sectionTag}>Work</span>
              <h1 className={styles.heroTitle}>
                Delivering Amazing Results For Remarkable Businesses
              </h1>
            </div>
            <div className={styles.rightHeader}>
              <p className={styles.heroDesc}>
                See how we translate ideas into results. Real clients, real metrics, straight to the point.
                From tripling organic traffic to doubling conversion rates and driving six-figure growth, our
                case studies show what happens when strategy, creativity, and data collide — turning ambition
                into measurable impact.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.primaryBtn}>
                  Start a Project
                </Link>
                <Link href="/team" className={styles.secondaryBtn}>
                  Learn More About Our Team
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Filters / Category Switcher */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <CategoryTabs eyebrow="Our Case Studies" tabs={filters} activeId={activeFilter} onChange={setActiveFilter} />
        </div>
      </section>

      {/* 3. Case Studies Grid (2-Column Masonry) */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.caseGrid}>
            <div className={styles.caseCol}>
              <AnimatePresence mode="popLayout">
                {leftColumnItems.map((item) => renderItem(item))}
              </AnimatePresence>
            </div>
            <div className={styles.caseCol}>
              <AnimatePresence mode="popLayout">
                {rightColumnItems.map((item) => renderItem(item))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Large Infinite Scrolling Marquee */}
      <WorkTogetherMarquee />

      {/* 5. Client Results & Reviews Section with Carousel */}
      <Testimonials />

      {/* 6. Form Integration with ID for scrolling */}
      <div id="contact-form">
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
