'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WorkTogetherMarquee from '@/components/WorkTogetherMarquee'
import type { CaseStudyRecord } from '@/lib/cms-types'
import styles from './CaseStudyDetail.module.css'

interface CaseStudyDetailClientProps {
  cs: CaseStudyRecord
}

export default function CaseStudyDetailClient({ cs }: CaseStudyDetailClientProps) {
  return (
    <main className={styles.caseStudyPage}>
      <Navbar />

      {/* 1. Breadcrumb & Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadLink}>Home</Link>
            <span className={styles.breadSep}>/</span>
            <Link href="/work" className={styles.breadLink}>Work</Link>
            <span className={styles.breadSep}>/</span>
            <span className={styles.breadCurrent}>{cs.client || cs.title}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroContent}
          >
            <div className={styles.heroMetaTags}>
              <span className={styles.categoryBadge}>{cs.category}</span>
              {cs.client && <span className={styles.clientTag}>{cs.client}</span>}
              {cs.year && <span className={styles.yearTag}>{cs.year}</span>}
            </div>

            <h1 className={styles.heroTitle}>{cs.title}</h1>
            {cs.shortDescription && (
              <p className={styles.heroDesc}>{cs.shortDescription}</p>
            )}

            {/* Metrics Ribbon */}
            {Array.isArray(cs.metrics) && cs.metrics.length > 0 && (
              <div className={styles.metricsGrid}>
                {cs.metrics.map((metric, idx) => (
                  <div key={idx} className={styles.metricCard}>
                    <span className={styles.metricValue}>{metric.value}</span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Image Showcase */}
      {cs.featuredImage && (
        <section className={styles.showcaseSection}>
          <div className={styles.container}>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className={styles.imageShowcaseWrapper}
            >
              <div className={styles.mockupHeader}>
                <span className={styles.mockupClient}>{cs.client || 'KR Tasker Case Study'}</span>
                <span className={styles.mockupTag}>{cs.category}</span>
              </div>
              <img
                src={cs.featuredImage}
                alt={cs.featuredImageAlt || cs.title}
                className={styles.showcaseImage}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. Deep Dive Narrative Sections */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.narrativeGrid}>
            {cs.overview && (
              <div className={styles.narrativeBlock}>
                <span className={styles.narrativeEyebrow}>01 / Overview</span>
                <h2 className={styles.narrativeHeading}>Project Overview</h2>
                <p className={styles.narrativeText}>{cs.overview}</p>
              </div>
            )}

            {cs.challenge && (
              <div className={styles.narrativeBlock}>
                <span className={styles.narrativeEyebrow}>02 / The Challenge</span>
                <h2 className={styles.narrativeHeading}>The Challenge</h2>
                <p className={styles.narrativeText}>{cs.challenge}</p>
              </div>
            )}

            {cs.solution && (
              <div className={styles.narrativeBlock}>
                <span className={styles.narrativeEyebrow}>03 / Strategy & Build</span>
                <h2 className={styles.narrativeHeading}>The Solution</h2>
                <p className={styles.narrativeText}>{cs.solution}</p>
              </div>
            )}

            {cs.results && (
              <div className={styles.narrativeBlock}>
                <span className={styles.narrativeEyebrow}>04 / The Impact</span>
                <h2 className={styles.narrativeHeading}>Results Achieved</h2>
                <p className={styles.narrativeText}>{cs.results}</p>
              </div>
            )}
          </div>

          <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerContent}>
              <span className={styles.ctaTag}>Start Your Growth Story</span>
              <h3 className={styles.ctaHeading}>Want results like these for your business?</h3>
              <p className={styles.ctaSubtext}>
                Let&apos;s build a bespoke digital solution engineered for measurable ROI.
              </p>
              <Link href="/contact" className={styles.ctaButton}>
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Marquee */}
      <WorkTogetherMarquee />

      {/* 5. Contact & Footer */}
      <div id="contact-form">
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
