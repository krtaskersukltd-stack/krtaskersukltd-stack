'use client'

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
import styles from '../ServicePage.module.css'
import type { ServiceRecord } from '@/lib/cms-types'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop'

export default function ServiceDetailClient({ srv }: { srv: ServiceRecord }) {
  const [openFeatureIdx, setOpenFeatureIdx] = useState<number | null>(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: '-50px' })

  const featuresList = srv.features && srv.features.length > 0
    ? srv.features
    : [
        { id: '1', title: `${srv.name} Strategy & Execution`, description: `Professional, end-to-end strategy, execution, and optimization for ${srv.name} to maximize conversions, build brand authority, and accelerate customer growth.`, sortOrder: 1 },
        { id: '2', title: 'Performance & Growth Tuning', description: 'Continuous data analytics, keyword ranking management, and audience acquisition tuning.', sortOrder: 2 },
      ]

  const featureBgImage = srv.featuredImage || DEFAULT_IMAGE

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
              <h1 className={styles.heroTitle}>
                {srv.heroHeading || srv.name}
              </h1>
              <p className={styles.heroDesc}>
                {srv.heroDescription}
              </p>
              <div className={styles.actions}>
                <Link href="/contact" className={styles.btnPrimary}>
                  {srv.heroCtaText || 'Start a Project'}
                </Link>
                <Link href="/work" className={styles.btnSecondary}>
                  View Case Studies
                </Link>
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
            <div
              className={styles.featuresLeft}
              style={{
                backgroundImage: `url(${featureBgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <span className={styles.featuresTag}>Service Features</span>
            </div>
            <div className={styles.featuresRight}>
              <div className={styles.accordion}>
                {featuresList.map((feat: any, i: number) => {
                  const isOpen = openFeatureIdx === i
                  return (
                    <div key={i} className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ''}`}>
                      <button onClick={() => setOpenFeatureIdx(isOpen ? null : i)} className={styles.accordionHeader}>
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
