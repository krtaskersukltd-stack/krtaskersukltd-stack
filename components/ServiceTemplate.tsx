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
import ClientSatisfaction from '@/components/80%-client'
import styles from '@/app/services/ServicePage.module.css'

export interface ServiceFeature {
  title: string
  content: string
}

export interface ServiceMetric {
  value: string
  label: string
}

export interface ServiceTemplateProps {
  title: string
  eyebrow?: string
  heroHeading: string
  heroDescription: string
  heroCtaText?: string
  introHeading?: string
  introContent?: string
  features: ServiceFeature[]
  metrics?: ServiceMetric[]
}

export default function ServiceTemplate({
  eyebrow = 'OUR SERVICES',
  heroHeading,
  heroDescription,
  heroCtaText = 'Get Started Today',
  introHeading = 'What We Offer',
  introContent = 'Explore our specialized services tailored to elevate your business performance and build long-term success.',
  features,
  metrics = [
    { value: '98%', label: 'Client Satisfaction Rate' },
    { value: '3.5x', label: 'Average Growth ROI' },
    { value: '150+', label: 'Successful Campaigns' },
    { value: '24/7', label: 'Dedicated Support' },
  ],
}: ServiceTemplateProps) {
  const [openFeatureIdx, setOpenFeatureIdx] = useState<number | null>(0)
  const heroRef = useRef<HTMLElement>(null)
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
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={styles.heroContent}
          >
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h1 className={styles.heroTitle}>{heroHeading}</h1>
            <p className={styles.heroDescription}>{heroDescription}</p>
            <div className={styles.heroCtaGroup}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToContact}
                className={styles.btnPrimary}
              >
                {heroCtaText}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  const featSec = document.getElementById('features-section')
                  if (featSec) featSec.scrollIntoView({ behavior: 'smooth' })
                }}
                className={styles.btnSecondary}
              >
                Explore Features ↓
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Intro & Accordion Features Section */}
      <section id="features-section" className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            <div className={styles.featuresIntro}>
              <h2 className={styles.sectionTitle}>{introHeading}</h2>
              <p className={styles.sectionDescription}>{introContent}</p>

              {/* Stats/Metrics */}
              {metrics && metrics.length > 0 && (
                <div className={styles.metricsGrid}>
                  {metrics.map((m, idx) => (
                    <div key={idx} className={styles.metricCard}>
                      <span className={styles.metricValue}>{m.value}</span>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion List */}
            <div className={styles.accordionContainer}>
              {features.map((feat, idx) => {
                const isOpen = openFeatureIdx === idx
                return (
                  <div key={idx} className={`${styles.accordionItem} ${isOpen ? styles.accordionOpen : ''}`}>
                    <button
                      onClick={() => setOpenFeatureIdx(isOpen ? null : idx)}
                      className={styles.accordionHeader}
                    >
                      <span className={styles.accordionTitle}>{feat.title}</span>
                      <span className={styles.accordionIcon}>{isOpen ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className={styles.accordionBody}
                        >
                          <p className={styles.accordionContent}>{feat.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Global Reusable Sections */}
      <ProcessSection />
      <ClientSatisfaction />
      <HappyClients />
      <Testimonials />
      <FaqSection />
      <Contact />
      <Footer />
    </main>
  )
}
