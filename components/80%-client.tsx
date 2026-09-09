'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import IconsOrbit from './IconsOrbit'
import ScrollFillText from './ScrollFillText'
import styles from './80%-client.module.css'

function AnimatedCounter({ value, suffix, className }: { value: number; suffix: string; className: string }) {
  const ref = useRef<HTMLElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const startedAt = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / 1200, 1)
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
      observer.unobserve(element)
    }, { threshold: 0.45 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <strong ref={ref} className={className}>{count}{suffix}</strong>
}

export default function ClientSatisfaction() {
  return (
    <section className={styles.bespokeSection}>
      <div className={`container ${styles.container}`}>
        {/* Top Overview Row with Image and 80% Satisfaction Badge */}
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
            <div className={styles.statLogoBadge}>
              <img src="/images/fav.png" alt="KR Tasker" className={styles.statLogo} />
            </div>
            <AnimatedCounter value={80} suffix="%" className={styles.statNumber} />
            <span className={styles.statSubLabel}>Client Satisfaction</span>
            <div className={styles.googleRatingBox}>
              <div className={styles.googleRatingHeader}>
                <span className={styles.googleLogo}>
                  <span className={styles.gBlue}>G</span>
                  <span className={styles.gRed}>o</span>
                  <span className={styles.gYellow}>o</span>
                  <span className={styles.gBlue}>g</span>
                  <span className={styles.gGreen}>l</span>
                  <span className={styles.gRed}>e</span>
                </span>
                <span className={styles.ratingsLabel}>Ratings</span>
              </div>
              <div className={styles.googleRatingStars}>
                <span className={styles.starsYellow}>★★★★★</span>
                <span className={styles.ratingScore}>5.0 / 5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bespoke Marketing Packages Grid with Mounted Icons Orbit Card */}
        <div className={styles.bespokeGrid}>
          <div className={styles.bespokeLeft}>
            <AnimatedHeading as="h2" className={styles.sectionHeading}>Bespoke Full-Service Marketing Packages</AnimatedHeading>
            <p className={styles.bespokeText}>
              <ScrollFillText text="We love our clients, and they love us! Our end-to-end marketing packages bring together SEO, PPC, social media, content, and email marketing into one integrated strategy managed by a dedicated team. No more juggling multiple agencies — get everything you need under one roof." />
            </p>
            <Button href="/contact">Get In Touch</Button>
          </div>
          
          <div className={styles.bespokeRight}>
            <div className={styles.orbitCardCol}>
              <IconsOrbit variant="card" showTopBadge={true} />
            </div>

            <div className={styles.statBox}>
              <AnimatedCounter value={17} suffix="k+" className={styles.statVal} />
              <p className={styles.statLabel}>Organic Users Within 12 Months</p>
            </div>

            <div className={styles.arrowBox}>
              <img src="/images/blog-newsletter/arrow.svg" alt="Growth Accelerator" className={styles.arrowIcon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
