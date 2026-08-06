'use client'

import React from 'react'
import styles from './80%-client.module.css'

export default function ClientSatisfaction() {
  const scrollToContact = () => {
    const contactSec = document.getElementById('contact-form')
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
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
          <div className={styles.googleRating}><span className={styles.googleLogo}><span  className={styles.gBlue}>G</span><span className={styles.gRed}>o</span><span  className={styles.gYellow}>o</span><span className={styles.gBlue}>g</span><span  className={styles.gGreen}>l</span><span className={styles.gRed}>e</span></span>  <span className={styles.ratingsLabel}>Ratings</span><br /><span className= {styles.starsYellow}>★★★★★</span> <small>5.0 / 5.0</small></div>
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
  )
}