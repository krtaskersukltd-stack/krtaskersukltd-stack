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
    "title": "Technical SEO Audits",
    "content": "In-depth analysis to find and fix crawl errors, indexing bottlenecks, and site speed issues affecting your rankings."
  },
  {
    "title": "Keyword Research & Competitor Analysis",
    "content": "Deep dive into high-intent search queries and competitor gap analysis to pinpoint high-value traffic opportunities."
  },
  {
    "title": "On-Page Optimization",
    "content": "Fine-tuning of meta tags, headers, URL structures, internal links, and content quality to maximize search relevance."
  },
  {
    "title": "High Quality Link Building",
    "content": "Acquiring authoritative, contextually relevant backlinks through secure blogger outreach and digital PR campaign assets."
  },
  {
    "title": "Local & Maps Optimization",
    "content": "Enhancing Google Business Profile ranking and directory syncs to capture map clicks and local commercial intent."
  },
  {
    "title": "SEO Analytics & Monthly Reporting",
    "content": "Clear dashboard views tracking click share, visibility, ranking increases, and bottom-line organic conversion goals."
  }
]

export default function SeoPage() {
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
              <span className={styles.sectionTag}>SEO</span>
              <h1 className={styles.heroTitle}>
                Data-Driven <span className={styles.gradientText}>SEO Growth</span> That Drives Revenue.
              </h1>
              <p className={styles.heroDesc}>
                Attract, engage, and convert high-intent customers from Google using performance search engine strategies.
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
              aria-label="SEO strategy" 
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop)',
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
              <h2 className={styles.sectionHeading}>Scale search rankings, <span className={styles.tealText}>capture intent</span>, and convert clicks into recurring customers.</h2>
              <p className={styles.bespokeText}>
                SEO is a long-term investment. At KR Tasker Digital, we build sustainable organic pathways that survive core algorithm updates. Our technical, on-page, and digital PR capabilities guarantee that your platform remains crawlable, secure, ultra-fast, and authoritative in the eyes of search engines.
              </p>
              <button onClick={scrollToContact} className={styles.btnBespoke}>
                Get In Touch
              </button>
            </div>
            
            <div className={styles.bespokeRight}>
              <img src="/images/blog-newsletter/circle.png" alt="Marketing channels" className={styles.channelsImage} />
              <div className={styles.statBox}>
                <h3 className={styles.statVal}>17k+</h3>
                <p className={styles.statLabel}>Organic Users Within 12 Months</p>
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
                backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop)',
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
