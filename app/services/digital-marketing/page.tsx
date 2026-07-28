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
import styles from './DigitalMarketingPage.module.css'

const serviceFeatures = [
  {
    "title": "Digital 360",
    "content": "Professional, end-to-end strategy, execution, and optimization for Digital 360 to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "SEO",
    "content": "Professional, end-to-end strategy, execution, and optimization for SEO to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "PPC",
    "content": "Professional, end-to-end strategy, execution, and optimization for PPC to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Social Media Marketing",
    "content": "Professional, end-to-end strategy, execution, and optimization for Social Media Marketing to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Google Ads",
    "content": "Professional, end-to-end strategy, execution, and optimization for Google Ads to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Email Marketing",
    "content": "Professional, end-to-end strategy, execution, and optimization for Email Marketing to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "CRO",
    "content": "Professional, end-to-end strategy, execution, and optimization for CRO to maximize conversions, build brand authority, and accelerate customer growth."
  }
]

export default function DigitalMarketingPage() {
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
    <main className={`${styles.page} page-digital-marketing`}>
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
              <span className={styles.sectionTag}>Digital Marketing</span>
              <h1 className={styles.heroTitle}>
                A <span className={styles.gradientText}>Digital Marketing</span> Agency In UK.
              </h1>
              <p className={styles.heroDesc}>
                Here at KR Tasker Digital, we offer honest advice, industry experience, and a great portfolio of work.
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
      <section className={styles.bespokeSection}>
        <div className={styles.container}>
          <div className={styles.overviewRow}>
            <div className={styles.overviewImage} aria-label="Digital Marketing strategy" />
            <div className={styles.satisfactionCardTop}>
              <img src="/images/fav.png" alt="KR Tasker" className={styles.statLogo} />
              <strong>80%</strong>
              <small>Client Satisfaction</small>
              <div className={styles.googleRating}>Google Ratings<br /><span>★★★★★</span> <small>5.0 / 5.0</small></div>
            </div>
          </div>
          <div className={styles.bespokeGrid}>
            <div className={styles.bespokeLeft}>
              <h2 className={styles.sectionHeading}>Are You A <span className={styles.tealText}>Startup</span> Brand, Well <span className={styles.tealText}>Established Company</span>, In The UK Or Worldwide? It Doesn&apos;t Matter. We Work With A <span className={styles.tealText}>Range Of Clients</span>.</h2>
              <p className={styles.bespokeText}>
                We don&apos;t just build pretty websites. Here at KR Tasker Digital, we understand all aspects of a successful site, from design through web development and testing, to SEO and Hosting. We tailor our service to the client and the project requirements.
              </p>
              <button onClick={scrollToContact} className={styles.btnBespoke}>
                Get In Touch
              </button>
            </div>
            
            <div className={styles.bespokeRight}>
              <img src="/images/blog-newsletter/circle.png" alt="Marketing channels" className={styles.channelsImage} />
              <div className={styles.statBox}>
                <h3 className={styles.statVal}>80%</h3>
                <p className={styles.statLabel}>Client Satisfaction</p>
                <div className={styles.arrowCircle}>
                  <img src="/images/blog-newsletter/arrow.svg" alt="Growth" />
                  <span>↗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Service Features Accordion */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            <div className={styles.featuresLeft}>
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
