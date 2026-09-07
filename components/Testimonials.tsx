'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
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

const SET_COUNT = 5
const SET_SIZE = reviews.length
const MIDDLE_SET = 2
const BASE_INDEX = MIDDLE_SET * SET_SIZE

// Pre-create the items with stable indices
const allCards = Array.from({ length: SET_COUNT }, (_, setIdx) =>
  reviews.map((review, reviewIdx) => ({
    ...review,
    uniqueId: `${setIdx}-${reviewIdx}`,
    cardIndex: setIdx * SET_SIZE + reviewIdx,
    reviewIndex: reviewIdx,
  }))
).flat()

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(BASE_INDEX + 2)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [paused, setPaused] = useState(false)
  const touchStartXRef = useRef<number | null>(null)

  const activeReview = ((activeIndex % SET_SIZE) + SET_SIZE) % SET_SIZE

  const move = useCallback((direction: number) => {
    setIsTransitioning(true)
    setActiveIndex((prev) => prev + direction)
  }, [])

  // Auto-play timer
  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => {
      move(1)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [paused, move])

  // Pause when tab hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setPaused(document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // GSAP Entrance
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

  // Equal gap positioning helper: ensures visual gap between every adjacent card is identical
  const getCardTranslateX = (offset: number) => {
    if (offset === 0) return '0px'
    const sign = offset > 0 ? 1 : -1
    const abs = Math.abs(offset)
    if (abs === 1) return `calc(${sign} * var(--step-d1))`
    return `calc(${sign} * (var(--step-d1) + ${abs - 1} * var(--step-d2)))`
  }

  // Seamless infinite reset without visible jump
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (e.propertyName !== 'transform' || target.dataset.active !== 'true') return

    if (activeIndex < BASE_INDEX || activeIndex >= BASE_INDEX + SET_SIZE) {
      const normalized = BASE_INDEX + activeReview
      setIsTransitioning(false)
      setActiveIndex(normalized)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
      })
    }
  }

  const goToReview = (targetReview: number) => {
    let diff = targetReview - activeReview
    if (diff > Math.floor(SET_SIZE / 2)) diff -= SET_SIZE
    if (diff < -Math.floor(SET_SIZE / 2)) diff += SET_SIZE
    if (diff !== 0) {
      move(diff)
    }
  }

  const handleCardClick = (cardIdx: number) => {
    const offset = cardIdx - activeIndex
    if (offset === 0) return
    if (Math.abs(offset) === 1) {
      move(offset)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
    setPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartXRef.current - touchEndX
    touchStartXRef.current = null
    setPaused(false)
    if (Math.abs(diff) > 40) {
      move(diff > 0 ? 1 : -1)
    }
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
            <div className={styles.googleRatings}>
              <span className={styles.googleLogo}>
                <span className={styles.gBlue}>G</span>
                <span className={styles.gRed}>o</span>
                <span className={styles.gYellow}>o</span>
                <span className={styles.gBlue}>g</span>
                <span className={styles.gGreen}>l</span>
                <span className={styles.gRed}>e</span>
              </span>
              <span className={styles.ratingsLabel}> Ratings</span>
            </div>
            <div className={styles.googleStarsRow}><span>★★★★★</span><small>5.0 / 5.0</small></div>
          </div>
        </div>

        <div
          className={styles.track}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.trackInner}
            onTransitionEnd={handleTransitionEnd}
          >
            {allCards.map((card) => {
              const offset = card.cardIndex - activeIndex
              const isActive = offset === 0
              const absOffset = Math.abs(offset)
              const scale = isActive ? 1 : 'var(--side-scale)'
              const opacity = isActive ? 1 : absOffset === 1 ? 0.85 : absOffset === 2 ? 0.35 : 0
              const zIndex = 10 - Math.min(absOffset, 9)

              return (
                <article
                  key={card.uniqueId}
                  data-active={isActive ? 'true' : undefined}
                  className={`${styles.card} ${isActive ? styles.cardActive : styles.cardInactive}`}
                  style={{
                    transform: `translateX(${getCardTranslateX(offset)}) scale(${scale})`,
                    transition: isTransitioning
                      ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease, box-shadow 0.3s ease'
                      : 'none',
                    opacity,
                    zIndex,
                    pointerEvents: absOffset <= 1 ? 'auto' : 'none',
                  } as React.CSSProperties}
                  onClick={() => handleCardClick(card.cardIndex)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-hidden={!isActive}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.authorInfo}>
                      <span className={styles.avatar}>{card.name.charAt(0)}</span>
                      <span><b>{card.name}</b><small>{card.role}</small></span>
                    </div>
                    <div className={styles.cardRating}>
                      <strong>
                        <span className={styles.gBlue}>G</span>
                        <span className={styles.gRed}>o</span>
                        <span className={styles.gYellow}>o</span>
                        <span className={styles.gBlue}>g</span>
                        <span className={styles.gGreen}>l</span>
                        <span className={styles.gRed}>e</span>
                        <span className={styles.cardRatingsLabel}> Ratings</span>
                      </strong>
                      <span>★★★★★ <small>5.0 / 5.0</small></span>
                    </div>
                  </div>
                  <p className={styles.reviewText}>“{card.text}”</p>
                </article>
              )
            })}
          </div>
        </div>

        <div className={styles.controls}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} onClick={() => move(-1)} aria-label="Previous review">‹</motion.button>
          <div className={styles.dots}>
            {reviews.map((review, index) => (
              <button
                key={review.name}
                onClick={() => goToReview(index)}
                className={index === activeReview ? styles.dotActive : ''}
                aria-label={`Show review ${index + 1}`}
              />
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} onClick={() => move(1)} aria-label="Next review">›</motion.button>
        </div>
      </div>
    </section>
  )
}
