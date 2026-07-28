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

const serviceFeatures = [
  {
    "title": "Custom LLM Chatbots",
    "content": "Professional, end-to-end strategy, execution, and optimization for Custom LLM Chatbots to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Workflow & Process Automation",
    "content": "Professional, end-to-end strategy, execution, and optimization for Workflow & Process Automation to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Predictive Data Analytics",
    "content": "Professional, end-to-end strategy, execution, and optimization for Predictive Data Analytics to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Cognitive AI Agent Networks",
    "content": "Professional, end-to-end strategy, execution, and optimization for Cognitive AI Agent Networks to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Document & Data Extraction AI",
    "content": "Professional, end-to-end strategy, execution, and optimization for Document & Data Extraction AI to maximize conversions, build brand authority, and accelerate customer growth."
  },
  {
    "title": "Enterprise AI Strategy",
    "content": "Professional, end-to-end strategy, execution, and optimization for Enterprise AI Strategy to maximize conversions, build brand authority, and accelerate customer growth."
  }
]

export default function AiSolutionsPage() {
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
              <span className={styles.sectionTag}>AI Solutions</span>
              <h1 className={styles.heroTitle}>
                Intelligent <span className={styles.gradientText}>AI Solutions</span> To Automate & Scale.
              </h1>
              <p className={styles.heroDesc}>
                Unlock enterprise efficiencies and automate repetitive operations with cognitive artificial intelligence.
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
            <div 
              className={styles.overviewImage} 
              aria-label="AI Solutions strategy" 
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className={styles.satisfactionCardTop}>
              <img src="/images/fav.png" alt="KR Tasker" className={styles.statLogo} />
              <strong>80%</strong>
              <small>Client Satisfaction</small>
              <div className={styles.googleRating}>Google Ratings<br /><span>★★★★★</span> <small>5.0 / 5.0</small></div>
            </div>
          </div>
          <div className={styles.bespokeGrid}>
            <div className={styles.bespokeLeft}>
              <h2 className={styles.sectionHeading}>Fusing <span className={styles.tealText}>Machine Learning</span> with practical business automation to supercharge productivity.</h2>
              <p className={styles.bespokeText}>
                We don&apos;t just build AI tools for the sake of buzzwords. Our consulting and engineering teams build clear, pragmatic automations that yield measurable ROI. We prioritize secure APIs, private server deployments, data encryption compliance (GDPR), and absolute transparency in AI decision trees.
              </p>
              <button onClick={scrollToContact} className={styles.btnBespoke}>
                Get In Touch
              </button>
            </div>
            
            <div className={styles.bespokeRight}>
              <img src="/images/blog-newsletter/circle.png" alt="Marketing channels" className={styles.channelsImage} />
              <div className={styles.statBox}>
                <h3 className={styles.statVal}>80%</h3>
                <p className={styles.statLabel}>Operation Cost Savings</p>
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
            <div 
              className={styles.featuresLeft}
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop)',
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
