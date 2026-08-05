'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import styles from './Hero.module.css'
import About from './About'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const splitWords = (phrase: string, isTeal = false) => {
    return phrase.split(' ').map((word, i) => (
      <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
        <motion.span
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.05 }}
          style={{ display: 'inline-block' }}
          className={isTeal ? styles.tealText : styles.blackText}
        >
          {word}&nbsp;
        </motion.span>
      </span>
    ))
  }

  return (
    <section ref={ref} className={styles.hero}>
      <div className={`${styles.container} ${styles.approachContainer}`}>

        <div className={styles.outerFrame} />

        <motion.div style={{ y: y1, opacity }} className={styles.contentLayer}>
          <div className={styles.centerCard}>
            <div className={styles.flexCol}>

              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                className={styles.eyebrow}>
                Performance Driven Digital Growth
              </motion.p>

              <h1 className={styles.h1}>
                {splitWords("We Convert Clicks To ")}
                {splitWords("Conversions", true)}
              </h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                className={styles.subtext}>
                A leading full-service UK digital marketing agency built to outthink, outcreate, and outperform, blending strategy, design, media and AI to deliver real growth for ambitious startups and global enterprises alike.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
                className={styles.buttons}>
                <Link
                  href="/contact"
                  className={styles.btnPrimary}
                >
                  Start a Project
                </Link>
                <Link
                  href="/work"
                  className={styles.btnSecondary}
                >
                  View Our Work
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className={styles.reviewsRow}>
                <span className={styles.reviewsText}>Based on 250+ Reviews</span>
                <div className={styles.starsRow}>
                  <span className={`${styles.star} ${styles.starActive}`}>★</span>
                  <span className={`${styles.star} ${styles.starActive}`}>★</span>
                  <span className={`${styles.star} ${styles.starActive}`}>★</span>
                  <span className={`${styles.star} ${styles.starInactive}`}>★</span>
                  <span className={`${styles.star} ${styles.starInactive}`}>★</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
      <About />
    </section>
  )
}
