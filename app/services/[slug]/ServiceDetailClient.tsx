'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import HappyClients from '@/components/HappyClients'
import ProcessSection from '@/components/ProcessSection'
import Testimonials from '@/components/Testimonials'
import FaqSection from '@/components/FaqSection'
import ClientSatisfaction from '@/components/80%-client'
import StructuredData from '@/components/StructuredData'
import MainServiceHub from '@/components/MainServiceHub'
import Button from '@/components/Button'
import styles from '../ServicePage.module.css'
import type { ServiceRecord } from '@/lib/cms-types'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop'

const DEFAULT_FEATURE_IMAGES = [
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556742049-0a67e55722ee?q=80&w=800&auto=format&fit=crop',
]

const FEATURE_IMAGES_BY_SLUG: Record<string, string[]> = {
  'amazon-ebay': [
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop', // Amazon Seller Setup
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', // eBay Store Design
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', // PPC Campaign Management
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop', // Product Detail Optimization
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', // Multi-channel Sync
    'https://images.unsplash.com/photo-1556742049-0a67e55722ee?q=80&w=800&auto=format&fit=crop', // Customer Feedback Management
  ],
  'seo': [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop',
  ],
  'digital-360': [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop',
  ],
}

export default function ServiceDetailClient({ srv }: { srv: ServiceRecord }) {
  // If template is category / hub, or has capabilities defined, render Figma Category Hub layout
  const isCategoryHub =
    srv.template === 'category' ||
    (srv.capabilities && srv.capabilities.length > 0) ||
    ['digital-marketing', 'b2b-enterprise', 'b2c-consumer', 'ecommerce-retail', 'saas-technology'].includes(srv.slug)

  if (isCategoryHub) {
    return <MainServiceHub srv={srv} />
  }

  const [openFeatureIdx, setOpenFeatureIdx] = useState<number>(0)
  const [timerKey, setTimerKey] = useState<number>(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: '-50px' })

  const featuresList = srv.features && srv.features.length > 0
    ? srv.features
    : [
        { id: '1', title: `${srv.name} Strategy & Execution`, description: `Professional, end-to-end strategy, execution, and optimization for ${srv.name} to maximize conversions, build brand authority, and accelerate customer growth.`, sortOrder: 1 },
        { id: '2', title: 'Performance & Growth Tuning', description: 'Continuous data analytics, keyword ranking management, and audience acquisition tuning.', sortOrder: 2 },
      ]

  const featureBgImage = srv.featuredImage || DEFAULT_IMAGE

  const handleFeatureClick = (i: number) => {
    setOpenFeatureIdx(i)
    setTimerKey((prev) => prev + 1)
  }

  const handleNextFeature = () => {
    setOpenFeatureIdx((prev) => (prev + 1) % featuresList.length)
    setTimerKey((prev) => prev + 1)
  }

  const activeIdx = openFeatureIdx ?? 0
  const activeFeature = featuresList[activeIdx]
  const activeImage =
    activeFeature?.image ||
    FEATURE_IMAGES_BY_SLUG[srv.slug]?.[activeIdx] ||
    DEFAULT_FEATURE_IMAGES[activeIdx % DEFAULT_FEATURE_IMAGES.length] ||
    featureBgImage

  return (
    <main className={styles.page}>
      <StructuredData
        type="Service"
        data={{
          name: srv.name,
          serviceType: srv.eyebrow || 'Digital Engineering',
          description: srv.heroDescription || srv.name,
          provider: {
            '@type': 'Organization',
            name: 'KR Tasker Digital',
          },
        }}
      />
      <Navbar />

      {/* 1. Hero Section */}
      <section ref={heroRef} className={styles.heroSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={styles.heroGrid}
          >
            <div className={styles.leftHero}>
              <span className={styles.sectionTag}>{srv.eyebrow || srv.name}</span>
              <AnimatedHeading as="h1" className={styles.heroTitle}>
                {srv.heroHeading || srv.name}
              </AnimatedHeading>
              <p className={styles.heroDesc}>
                {srv.heroDescription}
              </p>
              <div className={styles.actions}>
                <Button href="/contact">{srv.heroCtaText || 'Start a Project'}</Button>
                <Button href="/work" variant="secondary">View Case Studies</Button>
              </div>
            </div>

            {/* Visual Stats Card on the Right */}
            <div className={styles.rightHero}>
              <div className={styles.radialCard}>
                <div className={styles.radialGraphic}>
                  <svg width="120" height="120" viewBox="0 0 36 36" className={styles.circularChart}>
                    <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className={styles.circle} strokeDasharray="99, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className={styles.radialVal}>
                    {srv.metrics && srv.metrics[0] ? srv.metrics[0].value : '99%'}
                  </div>
                </div>
                <div className={styles.radialMeta}>
                  <p className={styles.radialTitle}>
                    {srv.metrics && srv.metrics[0] ? srv.metrics[0].label : 'Client Satisfaction'}
                  </p>
                  <div className={styles.radialRating}>
                    <span className={styles.stars}>★★★★★</span>
                    <span className={styles.score}>5.0 / 5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Client Satisfaction Banner */}
      <ClientSatisfaction />

      {/* 3. Service Features Accordion */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            <div className={styles.featuresLeft}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={`feat-img-${activeIdx}`}
                  src={activeImage}
                  alt={activeFeature?.title || srv.name}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className={styles.featureActiveImage}
                />
              </AnimatePresence>
              <span className={styles.featuresTag}>Service Features</span>
            </div>
            <div className={styles.featuresRight}>
              <div className={styles.accordion}>
                {featuresList.map((feat: any, i: number) => {
                  const isOpen = openFeatureIdx === i
                  return (
                    <div key={feat.id || i} className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ''}`}>
                      <button
                        type="button"
                        onClick={() => handleFeatureClick(i)}
                        className={styles.accordionHeader}
                        aria-expanded={isOpen}
                      >
                        <span className={styles.accordionTitle}>{feat.title}</span>
                        <span className={`${styles.accordionSign} ${isOpen ? styles.signOpen : ''}`}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={styles.accordionContentContainer}
                          >
                            <div className={styles.accordionContent}>
                              {feat.description || feat.content}
                            </div>
                            <div className={styles.progressBarTrack}>
                              <div
                                key={`progress-${i}-${timerKey}`}
                                className={styles.progressBarFill}
                                onAnimationEnd={handleNextFeature}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Reusable sections matching website layout */}
      <HappyClients />
      <ProcessSection />
      <Testimonials />
      <FaqSection />

      <div id="contact-form">
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
