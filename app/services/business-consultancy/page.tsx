'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import HappyClients from '@/components/HappyClients'
import ProcessSection from '@/components/ProcessSection'
import Testimonials from '@/components/Testimonials'
import FaqSection from '@/components/FaqSection'
import styles from '../ServicePage.module.css'
import ClientSatisfaction from '@/components/80%-client'

const serviceFeatures = [
  {
    "title": "Market Research & Analysis",
    "content": "Professional, end-to-end strategy, execution, and optimization for Market Research & Analysis to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Growth Strategy Planning",
    "content": "Professional, end-to-end strategy, execution, and optimization for Growth Strategy Planning to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Financial Forecasting",
    "content": "Professional, end-to-end strategy, execution, and optimization for Financial Forecasting to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Process Optimization",
    "content": "Professional, end-to-end strategy, execution, and optimization for Process Optimization to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Operations Improvement",
    "content": "Professional, end-to-end strategy, execution, and optimization for Operations Improvement to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Risk Management",
    "content": "Professional, end-to-end strategy, execution, and optimization for Risk Management to maximize conversions, build brand authority, and accelerate customer growth."
  }
]

export default function BusinessConsultancyPage() {
  const [openFeatureIdx, setOpenFeatureIdx] = useState<number | null>(0)

  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: '-50px' })

  const scrollToContact = () => {
    const contactSec = document.getElementById('contact-form')
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className={styles.page}>
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
              <span className={styles.sectionTag}>Business Consultancy</span>
              <h1 className={styles.heroTitle}>
                Strategic <span className={styles.gradientText}>Consultancy</span> That Powers Business.
              </h1>
              <p className={styles.heroDesc}>
                Navigate growth, optimize operations, and achieve long-term success with expert guidance.
              </p>
              <div className={styles.actions}>
                <button onClick={scrollToContact} className={styles.btnPrimary}>
                  Start a Project
                </button>
                <a href="/work" className={styles.btnSecondary}>
                  View Case Studies
                </a>
              </div>
            </div>

            {/* Visual Stats Cards on the Right */}
            <div className={styles.rightHero}>
              <div className={styles.radialCard}>
                <div className={styles.radialGraphic}>
                  <svg width="120" height="120" viewBox="0 0 36 36" className={styles.circularChart}>
                    <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className={styles.circle} strokeDasharray="80, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className={styles.radialVal}>80%</div>
                </div>
                <div className={styles.radialMeta}>
                  <p className={styles.radialTitle}>Client Satisfaction</p>
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

      {/* 2. Bespoke Packages Introduction */}
      <ClientSatisfaction />

      {/* 3. Service Features Accordion */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            <div 
              className={styles.featuresLeft}
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <span className={styles.featuresTag}>Service Features</span>
            </div>
            <div className={styles.featuresRight}>
              <div className={styles.accordion}>
                {serviceFeatures.map((feat, i) => {
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
                              {feat.content}
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

      {/* Reusable sections */}
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
