'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonials.module.css'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  { name: 'James Walker', role: 'Amazon Brand Owner', text: 'KR Tasker Digital completely transformed our Amazon account. Our ad performance improved within weeks, and sales followed shortly after.' },
  { name: 'Sophie M.', role: 'Operations Lead', text: 'The team delivered exceptional results. Our website traffic increased by 150% and conversions doubled in just 3 months.' },
  { name: 'Tom W.', role: 'Managing Director', text: 'Brilliant agency. They understood our brand immediately and delivered a campaign that exceeded all our targets.' },
  { name: 'Amelia R.', role: 'Founder', text: 'KR Tasker Digital is not just an agency, they are a true growth partner. Highly recommend their services.' },
  { name: 'David K.', role: 'CEO', text: 'Outstanding digital strategy and execution. Our ROI has never been better since partnering with KR Tasker.' },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(2)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % reviews.length), 5000)
    return () => window.clearInterval(timer)
  }, [paused])

  useEffect(() => {
    if (!sectionRef.current) return
    const header = sectionRef.current.querySelector(`.${styles.header}`)
    const ctx = gsap.context(() => {
      gsap.fromTo(header, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: header, start: 'top 88%', toggleActions: 'play none none reverse' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const move = (direction: number) => {
    setActive((current) => (current + direction + reviews.length) % reviews.length)
  }

  return (
    <section ref={sectionRef} className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>• Client Results &amp; Reviews</p>
            <h2 className={styles.heading}>
              Trusted By <span>Growing Brands.</span><br />
              Backed By Real 5-Star Reviews.
            </h2>
          </div>
          <div className={styles.headerRight} aria-label="Google rating 5 out of 5">
            <div className={styles.googleRatings}><b>G</b><span>oogle Ratings</span></div>
            <div className={styles.googleStarsRow}><span>★★★★★</span><small>5.0 / 5.0</small></div>
          </div>
        </div>

        <div
          className={styles.track}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={styles.trackInner}>
            {reviews.map((review, index) => {
              const isActive = index === active
              let offset = (index - active + reviews.length) % reviews.length
              if (offset > Math.floor(reviews.length / 2)) offset -= reviews.length
              return (
                <motion.article
                  key={review.name}
                  className={`${styles.card} ${isActive ? styles.cardActive : styles.cardInactive}`}
                  style={{
                    '--card-x': `${offset * 550}px`,
                    '--card-x-mobile': `${offset * 76}vw`,
                    zIndex: 10 - Math.abs(offset),
                  } as React.CSSProperties}
                  animate={{ scale: isActive ? 1 : 0.72, opacity: isActive ? 1 : 0.82 }}
                  transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                  onClick={() => setActive(index)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.authorInfo}>
                      <span className={styles.avatar}>{review.name.charAt(0)}</span>
                      <span><b>{review.name}</b><small>{review.role}</small></span>
                    </div>
                    <div className={styles.cardRating}>
                      <strong><i>G</i>oogle Ratings</strong>
                      <span>★★★★★ <small>5.0 / 5.0</small></span>
                    </div>
                  </div>
                  <p className={styles.reviewText}>“{review.text}”</p>
                </motion.article>
              )
            })}
          </div>
        </div>

        <div className={styles.controls}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} onClick={() => move(-1)} aria-label="Previous review">‹</motion.button>
          <div className={styles.dots}>
            {reviews.map((review, index) => (
              <button key={review.name} onClick={() => setActive(index)} className={index === active ? styles.dotActive : ''} aria-label={`Show review ${index + 1}`} />
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} onClick={() => move(1)} aria-label="Next review">›</motion.button>
        </div>
      </div>
    </section>
  )
}
