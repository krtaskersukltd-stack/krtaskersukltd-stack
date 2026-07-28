'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import styles from './WorkPage.module.css'
import CategoryTabs from '@/components/CategoryTabs'
import WorkTogetherMarquee from '@/components/WorkTogetherMarquee'

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

interface CaseStudy {
  id: number
  title: string
  category: string
  client: string
  year: string
  tech: string
  gradient: string
  imageUrl?: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Refreshing Gary Neville's digital presence",
    category: 'Websites & Apps',
    client: 'Couchy',
    year: '2023',
    tech: 'Web Design',
    gradient: 'linear-gradient(135deg, #10525f 0%, #032b32 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Driving 350% increase in qualified organic leads',
    category: 'SEO',
    client: 'Apex Legal',
    year: '2024',
    tech: 'SEO Strategy',
    gradient: 'linear-gradient(135deg, #0C4651 0%, #10525f 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Modernizing B2B textile manufacturing platform',
    category: 'Websites & Apps',
    client: 'Dellas Textiles',
    year: '2023',
    tech: 'Web Design',
    gradient: 'linear-gradient(135deg, #032b32 0%, #0C4651 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Creating a green brand identity for sustainable energy',
    category: 'Creative & Branding',
    client: 'Sustain.co',
    year: '2024',
    tech: 'Branding Design',
    gradient: 'linear-gradient(135deg, #10525f 0%, #0C4651 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Scaling performance marketing ROAS from 1.5x to 4.2x',
    category: 'Google & Meta Ads',
    client: 'Veloce Gear',
    year: '2024',
    tech: 'Web Design',
    gradient: 'linear-gradient(135deg, #0C4651 0%, #032b32 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Dominating competitive electronics niche with targeted PPC',
    category: 'PPC & Amazon',
    client: 'Amazon Pulse',
    year: '2023',
    tech: 'Web Design',
    gradient: 'linear-gradient(135deg, #032b32 0%, #10525f 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Unified omnichannel marketing for global lifestyle brand',
    category: 'Digital 360',
    client: 'Nova Retail',
    year: '2024',
    tech: 'Web Design',
    gradient: 'linear-gradient(135deg, #10525f 0%, #032b32 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
  },
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
  {
    id: 't2',
    quote: 'The team delivered exceptional results. Our website traffic increased by 150% and conversions doubled in just 3 months.',
    author: 'Sophie M.',
    role: 'Operations Lead',
    initial: 'S',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop',
  },
]

type GridItem =
  | { type: 'case'; data: CaseStudy }
  | { type: 'testimonial'; data: typeof testimonials[0] }
  | { type: 'cta'; data?: undefined }

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  // Dynamically compute category counts from case studies
  const filters = filterCategories.map(cat => {
    if (cat.id === 'all') {
      return { ...cat, count: caseStudies.length }
    }
    const count = caseStudies.filter(
      cs => cs.category && cs.category.toLowerCase().trim() === cat.label.toLowerCase().trim()
    ).length
    return { ...cat, count }
  })

  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' })

  // Filtering Logic
  const getFilteredItems = () => {
    const selectedFilterObj = filters.find((f) => f.id === activeFilter)
    if (!selectedFilterObj) return []

    // If "All Work"
    if (activeFilter === 'all') {
      // Interweave Case Studies, Testimonials & CTA
      const list: GridItem[] = []
      list.push({ type: 'case', data: caseStudies[0] }) // Couchy 1
      list.push({ type: 'testimonial', data: testimonials[0] }) // Olivia Bambo
      list.push({ type: 'case', data: caseStudies[1] }) // Apex Legal
      list.push({ type: 'case', data: caseStudies[2] }) // Dellas Textiles
      list.push({ type: 'case', data: caseStudies[3] }) // Sustain.co
      list.push({ type: 'testimonial', data: testimonials[1] }) // James Walker
      list.push({ type: 'case', data: caseStudies[4] }) // Veloce Gear
      list.push({ type: 'case', data: caseStudies[5] }) // Amazon Pulse
      list.push({ type: 'cta' }) // You're Still Here
      list.push({ type: 'case', data: caseStudies[6] }) // Nova Retail
      return list
    }

    // Otherwise, filter by category
    const filteredCases = caseStudies.filter(
      (cs) => cs.category.toLowerCase() === selectedFilterObj.label.toLowerCase()
    )
    return filteredCases.map((cs) => ({ type: 'case', data: cs }))
  }

  const items = getFilteredItems()

  const scrollToContact = () => {
    const contactSec = document.getElementById('contact-form')
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' })
    }
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
                <button onClick={scrollToContact} className={styles.primaryBtn}>
                  Start a Project
                </button>
                <a href="/about" className={styles.secondaryBtn}>
                  Learn More About Our Team
                </a>
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

      {/* 3. Case Studies Grid (Masonry effect) */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <motion.div layout className={styles.caseGrid}>
            <AnimatePresence mode="popLayout">
              {items.map((item) => {
                if (item.type === 'case') {
                  const cs = item.data as CaseStudy
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      key={`case-${cs.id}`}
                      className={styles.caseCard}
                    >
                      <div
                        className={styles.cardImageWrapper}
                      >
                        <div className={styles.mockupHeader}>
                          <span>{cs.client}</span>
                          <span className={styles.caseTechTag}>{cs.tech}</span>
                        </div>
                        {cs.imageUrl && (
                          <img
                            src={cs.imageUrl}
                            alt={cs.title}
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
                    </motion.div>
                  )
                } else if (item.type === 'testimonial') {
                  const test = item.data as typeof testimonials[0]
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
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
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
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
              })}
            </AnimatePresence>
          </motion.div>
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
