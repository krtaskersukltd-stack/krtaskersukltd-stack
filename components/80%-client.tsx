'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import React from 'react'
import Button from './Button'
import IconsOrbit from './IconsOrbit'
import ScrollFillText from './ScrollFillText'
import styles from './80%-client.module.css'

export default function ClientSatisfaction() {
  return (
    <section className={styles.bespokeSection}>
      <div className={styles.container}>
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
            <strong className={styles.statNumber}>80%</strong>
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
            {/* 1. Reusable Icons Orbit Card mounted */}
            <div className={styles.orbitCardCol}>
              <IconsOrbit variant="card" showTopBadge={true} />
            </div>

            {/* 2. Stat Box: 17k+ Organic Users */}
            <div className={styles.statBox}>
              <AnimatedHeading as="h3" className={styles.statVal}>17k+</AnimatedHeading>
              <p className={styles.statLabel}>Organic Users Within 12 Months</p>
            </div>

            {/* 3. Lime Arrow Box */}
            <div className={styles.arrowBox}>
              <img src="/images/blog-newsletter/arrow.svg" alt="Growth Accelerator" className={styles.arrowIcon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
