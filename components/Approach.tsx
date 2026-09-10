'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import { useRef, useState, useEffect, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollFillText from '@/components/ScrollFillText'
import styles from './Approach.module.css'

gsap.registerPlugin(ScrollTrigger)

interface CardData {
  id: string
  title: string
  desc: string
  icon: string
  baseRotate: number
  baseY: number
  isTeal: boolean
  zIndex: number
}

const cardsData: CardData[] = [
  {
    id: 'discover',
    title: 'Discover',
    desc: 'The best brands improve, not settle. We review, plan, and refine your digital setup. This transforms data into strategies that reveal opportunities, prevent revenue loss, and promote faster, lasting growth.',
    icon: '/images/card-icon/icon (1).svg',
    baseRotate: -7.5,
    baseY: 15,
    isTeal: true,
    zIndex: 1,
  },
  {
    id: 'create',
    title: 'Create',
    desc: 'With clear direction, we create data-driven strategies and engaging content. From campaigns to visuals, each element is made to stand out and make a real difference.',
    icon: '/images/card-icon/icon (2).svg',
    baseRotate: -2.5,
    baseY: 5,
    isTeal: false,
    zIndex: 10,
  },
  {
    id: 'grow',
    title: 'Grow',
    desc: 'We launch projects carefully and adjust in real time to improve results. By increasing reach, raising engagement, and driving conversions, we provide clear outcomes and a lasting effect for your brand.',
    icon: '/images/card-icon/icon (3).svg',
    baseRotate: 2.5,
    baseY: 5,
    isTeal: true,
    zIndex: 20,
  },
  {
    id: 'optimise',
    title: 'Optimise',
    desc: 'Great performance is just the beginning. We analyse every metric, identify new opportunities, and fine-tune our approach so your brand stays ahead, not just today, but in the months and years to come.',
    icon: '/images/card-icon/icon (4).svg',
    baseRotate: 7.5,
    baseY: 15,
    isTeal: false,
    zIndex: 30,
  },
]

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null)
  const mobileTrackRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current
      const track = mobileTrackRef.current
      if (!section || !track) return

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.08)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.fromTo(
        track.querySelectorAll(`.${styles.mobileCard}`),
        { y: 35, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top top',
            scrub: true,
          },
        }
      )

      return () => tween.kill()
    })

    return () => media.revert()
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((centerY - mouseY) / centerY) * 14
    const rotateY = ((mouseX - centerX) / centerX) * 14

    gsap.to(card, {
      rotateX,
      rotateY,
      rotateZ: 0,
      y: -15,
      scale: 1.06,
      zIndex: 50,
      boxShadow: '0 30px 60px rgba(12, 70, 81, 0.25)',
      transformPerspective: 900,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    const title = card.querySelector<HTMLElement>(`.${styles.cardTitle}`)
    const icon = card.querySelector<HTMLElement>(`.${styles.cardIcon}`)
    const desc = card.querySelector<HTMLElement>(`.${styles.cardDesc}`)

    if (title) gsap.to(title, { z: 25, duration: 0.3, overwrite: 'auto' })
    if (icon) gsap.to(icon, { z: 35, scale: 1.1, duration: 0.3, overwrite: 'auto' })
    if (desc) gsap.to(desc, { z: 15, duration: 0.3, overwrite: 'auto' })
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>, cardData: CardData) => {
    setHoveredIndex(null)
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    const card = e.currentTarget

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      rotateZ: cardData.baseRotate,
      y: cardData.baseY,
      scale: 1,
      zIndex: cardData.zIndex,
      boxShadow: '0 10px 30px rgba(12, 70, 81, 0.08)',
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    const title = card.querySelector<HTMLElement>(`.${styles.cardTitle}`)
    const icon = card.querySelector<HTMLElement>(`.${styles.cardIcon}`)
    const desc = card.querySelector<HTMLElement>(`.${styles.cardDesc}`)

    if (title) gsap.to(title, { z: 0, duration: 0.5, overwrite: 'auto' })
    if (icon) gsap.to(icon, { z: 0, scale: 1, duration: 0.5, overwrite: 'auto' })
    if (desc) gsap.to(desc, { z: 0, duration: 0.5, overwrite: 'auto' })
  }

  // Calculate dynamic rotation adjustment for fan-out effect when neighbor is hovered
  const getDynamicRotation = (index: number, card: CardData) => {
    if (hoveredIndex === null || hoveredIndex === index) return card.baseRotate
    if (index < hoveredIndex) {
      return card.baseRotate - 4 // Push left neighbor cards slightly further left
    }
    return card.baseRotate + 4 // Push right neighbor cards slightly further right
  }

  return (
    <section ref={sectionRef} className={styles.approach}>
      {/* Desktop View: Header + Interactive Fan-Out Cards (Untouched) */}
      <div className={styles.desktopView}>
        <div className={styles.container}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className={styles.header}
          >
            <AnimatedHeading as="h2" className={styles.title}>
              Our <span className={styles.titleSpan}>Approach</span>
            </AnimatedHeading>
            <p className={styles.desc}>
              <ScrollFillText text="The Approach is how we turn vision into measurable growth. It's a proven process that blends insight, creativity, and continuous optimisation, ensuring every move we make is intentional, impactful, and built for long-term success." />
            </p>
            <Button href="/about">Learn About Us</Button>
          </motion.div>

          <div className={styles.gridDesktop}>
            <div className={styles.cardsRow}>
              {cardsData.map((card, index) => {
                const currentRotate = getDynamicRotation(index, card)

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 80, rotate: 0 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: card.baseY, 
                      rotate: currentRotate 
                    }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.12, 
                      ease: [0.25, 1, 0.5, 1] 
                    }}
                    animate={{
                      rotate: currentRotate,
                      transition: { duration: 0.4, ease: 'easeOut' }
                    }}
                    className={styles.cardWrapper}
                    style={{ zIndex: hoveredIndex === index ? 50 : card.zIndex }}
                  >
                    <div
                      className={`${styles.card} ${card.isTeal ? styles.cardTeal : styles.cardCream}`}
                      onMouseMove={handleMouseMove}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={(e) => handleMouseLeave(e, card)}
                    >
                      <div className={styles.cardHeader}>
                        <AnimatedHeading as="h3" className={`${styles.cardTitle} ${card.isTeal ? styles.titleLime : styles.titleTeal}`}>
                          {card.title}
                        </AnimatedHeading>
                      </div>

                      <div className={styles.cardIcon}>
                        <Image
                          src={card.icon}
                          alt={card.title}
                          width={80}
                          height={80}
                          className={styles.iconImg}
                        />
                      </div>

                      <p className={`${styles.cardDesc} ${card.isTeal ? styles.descCream : styles.descDark}`}>
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Pinned Scroll Track (Follows ProcessSection animation) */}
      <div ref={mobileTrackRef} className={styles.mobileTrack}>
        <div className={styles.mobileIntroBlock}>
          <AnimatedHeading as="h2" className={styles.title}>
            Our <span className={styles.titleSpan}>Approach</span>
          </AnimatedHeading>
          <p className={styles.desc}>
            <ScrollFillText text="The Approach is how we turn vision into measurable growth. It's a proven process that blends insight, creativity, and continuous optimisation, ensuring every move we make is intentional, impactful, and built for long-term success." />
          </p>
          <Button href="/about">Learn About Us</Button>
        </div>

        {cardsData.map((card) => (
          <div key={card.id} className={styles.mobileCardWrapper}>
            <div className={`${styles.mobileCard} ${card.isTeal ? styles.cardTeal : styles.cardCream}`}>
              <div className={styles.cardHeader}>
                <AnimatedHeading as="h3" className={`${styles.cardTitle} ${card.isTeal ? styles.titleLime : styles.titleTeal}`}>
                  {card.title}
                </AnimatedHeading>
              </div>
              <div className={styles.mobileIconWrap}>
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={72}
                  height={72}
                  className={styles.iconImg}
                />
              </div>
              <p className={`${styles.cardDesc} ${card.isTeal ? styles.descCream : styles.descDark}`}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}

        <div className={styles.endSpace} aria-hidden="true" />
      </div>
    </section>
  )
}
