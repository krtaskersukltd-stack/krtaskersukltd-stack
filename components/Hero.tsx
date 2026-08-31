'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Hero.module.css'
import About from './About'
import CrossedMarquee from './CrossedMarquee'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  // Scroll parallax for header
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.9])
  const heroY = useTransform(scrollYProgress, [0, 0.45], [0, -30])

  return (
    <section ref={heroRef} className={styles.heroSection}>
      <div className={styles.container}>
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className={styles.headerContent}
        >
          {/* Main Headline */}
          <h1 className={styles.headline}>
            {/* Line 1: Effortless Design for Design Startups */}
            <span className={styles.line}>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={styles.darkWord}
              >
                Effortless
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={styles.tealWord}
              >
                Design for
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                className={styles.darkWord}
              >
                Design Startups
              </motion.span>
            </span>

            {/* Line 2: based in London, UK */}
            <span className={styles.line}>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={styles.tealWord}
              >
                based in London,
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
                className={styles.darkWord}
              >
                UK
              </motion.span>
            </span>
          </h1>

          {/* Subtitle description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={styles.subheadline}
          >
            A Leading Full-Service UK Digital Marketing Agency Built To Outthink, Outcreate, And
            Outperform, Blending Strategy, Design, Media And AI To Deliver Real Growth For Ambitious
            Startups And Global Enterprises Alike.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={styles.ctaGroup}
          >
            <Link href="/contact" className={styles.btnStartProject}>
              <span>Start A Project</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.btnArrow}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <Link href="/work" className={styles.btnViewWork}>
              <span>View Our Work</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Full-width Image Showcase Wrapper (5px spacing from left and right) */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={styles.imageWrapper}
      >
        <Image
          src="/images/curated-brands-showcase.png"
          alt="KR Tasker Curated Brands & Growth Showcase"
          width={1920}
          height={1080}
          priority
          sizes="(max-width: 768px) 100vw, 98vw"
          className={styles.heroImage}
        />
      </motion.div>

      {/* Embedded Who We Are Section */}
      <About />

      {/* Crossed Dual-Ribbon Marquee Section */}
      <CrossedMarquee />
    </section>
  )
}
