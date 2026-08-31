'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Hero.module.css'
import About from './About'
import CrossedMarquee from './CrossedMarquee'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isVideoPaused, setIsVideoPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Scroll parallax for header
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.9])
  const heroY = useTransform(scrollYProgress, [0, 0.45], [0, -30])

  // Mouse tilt effect for the showcase card
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 250,
    damping: 25,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 250,
    damping: 25,
  })
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), {
    stiffness: 250,
    damping: 25,
  })
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), {
    stiffness: 250,
    damping: 25,
  })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseClientX = e.clientX - rect.left
    const mouseClientY = e.clientY - rect.top

    mouseX.set(mouseClientX / width - 0.5)
    mouseY.set(mouseClientY / height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const toggleVideoPlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      void video.play()
      setIsVideoPaused(false)
    } else {
      video.pause()
      setIsVideoPaused(true)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  return (
    <section ref={heroRef} className={styles.heroSection}>
      <div className={styles.container}>
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className={styles.headerContent}
        >
          {/* Main Headline (Exactly 2 lines on Laptop/Desktop) */}
          <h1 className={styles.headline}>
            {/* Line 1: Effortless [img] Design for [img] Design Startups */}
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

            {/* Line 2: based in London, [img] UK */}
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

        {/* Video Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={styles.showcaseWrapper}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className={styles.showcaseCard}
          >
            {/* Ambient Lighting Halos */}
            <div className={styles.glowCyan} />
            <div className={styles.glowPurple} />
            <div className={styles.glowRed} />

            {/* Dynamic Glass Glare Effect */}
            <motion.div
              style={{
                left: glareX,
                top: glareY,
              }}
              className={styles.glareEffect}
            />

            {/* Video Player Container */}
            <div className={styles.videoContainer}>
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/images/curated-brands-showcase.jpg"
                className={styles.heroVideo}
                onClick={toggleVideoPlayback}
              >
                <source
                  src="/video/mixkit-hud-style-animated-data-graph-growth-trend-visualization-5396-hd-ready.mp4"
                  type="video/mp4"
                />
                Your browser does not support HTML5 video.
              </video>

            
            

           
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Embedded Who We Are Section */}
      <About />

      {/* Crossed Dual-Ribbon Marquee Section */}
      <CrossedMarquee />
    </section>
  )
}
