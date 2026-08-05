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
import styles from './Digital360Page.module.css'

const serviceFeatures = [
  {
    title: 'Tailored Preposition',
    content: "Every full-service package is tailored to your specific business goals, budget, and market. We don't believe in one-size-fits-all solutions — your package is built around what will drive the most meaningful impact for your organisation.",
  },
  {
    title: 'Audit, Strategy & Plan',
    content: 'We audit your competitor space and past web analytics to establish a robust tactical roadmap with clear objectives, key performance indicators (KPIs), and target milestones.',
  },
  {
    title: 'Structure The Brand',
    content: 'We craft and standardize visual assets, branding systems, key messages, and design guidelines to ensure your company communicates trust and consistency across all media channels.',
  },
  {
    title: 'Ready For Marketing',
    content: 'From technical conversion triggers to campaign launch assets, we align search, social, and web optimization frameworks so your marketing starts driving sales instantly.',
  },
]

export default function Digital360Page() {
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
    <main className={`${styles.page} page-digital-360`}>
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
              <span className={styles.sectionTag}>Digital 360</span>
              <h1 className={styles.heroTitle}>
                Full Service <span className={styles.gradientText}>Digital Marketing</span> Package For Small And Large Businesses.
              </h1>
              <p className={styles.heroDesc}>
                Bespoke digital marketing packages tailored to your business needs. Whether you&apos;re a startup or an established enterprise, our full-service approach combines multiple channels into one cohesive strategy that drives results.
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
              aria-label="Digital marketing strategy" 
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className={styles.satisfactionCardTop}>
              <img src="/images/fav.png" alt="KR Tasker" className={styles.statLogo} />
              <strong>80%</strong>
              <small>Client Satisfaction</small>
              <div className={styles.googleRating}><span className={styles.googleLogo}><span className={styles.gBlue}>G</span><span className={styles.gRed}>o</span><span className={styles.gYellow}>o</span><span className={styles.gBlue}>g</span><span className={styles.gGreen}>l</span><span className={styles.gRed}>e</span></span> <span className={styles.ratingsLabel}>Ratings</span><br /><span className={styles.starsYellow}>★★★★★</span> <small>5.0 / 5.0</small></div>
            </div>
          </div>
          <div className={styles.bespokeGrid}>
            <div className={styles.bespokeLeft}>
              <h2 className={styles.sectionHeading}>Bespoke Full-Service Marketing Packages</h2>
              <p className={styles.bespokeText}>
                We love our clients, and they love us! Our end-to-end marketing packages bring together SEO, PPC, social media, content, and email marketing into one integrated strategy managed by a dedicated team. No more juggling multiple agencies — get everything you need under one roof.
              </p>
              <button onClick={scrollToContact} className={styles.btnBespoke}>
                Get In Touch
              </button>
            </div>
            
            <div className={styles.bespokeRight}>
              <div className={styles.satisfactionCard} hidden>
                <img src="/images/fav.png" alt="KR Tasker" className={styles.statLogo} />
                <strong>80%</strong>
                <small>Client Satisfaction</small>
                <div className={styles.googleRating}><span className={styles.googleLogo}><span className={styles.gBlue}>G</span><span className={styles.gRed}>o</span><span className={styles.gYellow}>o</span><span className={styles.gBlue}>g</span><span className={styles.gGreen}>l</span><span className={styles.gRed}>e</span></span> <span className={styles.ratingsLabel}>Ratings</span> <span className={styles.starsYellow}>★★★★★</span> <small>5.0 / 5.0</small></div>
              </div>
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
                backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop)',
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
