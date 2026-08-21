'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import styles from './AboutPage.module.css'

const HeroCarousel = dynamic(() => import('@/components/HeroCarousel'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid var(--teal)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  ),
})

const teamMembers = [
  {
    name: 'Andrew',
    role: 'Director',
    initial: 'A',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&fit=crop',
  },
  {
    name: 'Sarah',
    role: 'Head of Design',
    initial: 'S',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&fit=crop',
  },
  {
    name: 'James',
    role: 'Tech Lead',
    initial: 'J',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&fit=crop',
  },
  {
    name: 'Emily',
    role: 'SEO Manager',
    initial: 'E',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=500&fit=crop',
  },
]

const esgInitiatives = [
  {
    title: 'Environmental',
    text: 'We keep our footprint small by working remote-first, reducing unnecessary commuting and office waste. Our operations are fully cloud-based, removing the need for physical storage and helping us stay efficient, secure, and sustainable. As a digital business, we continually look for low-impact ways to deliver high-impact results.',
  },
  {
    title: 'Environmental',
    text: 'We keep our footprint small by working remote-first, reducing unnecessary commuting and office waste. Our operations are fully cloud-based, removing the need for physical storage and helping us stay efficient, secure, and sustainable. As a digital business, we continually look for low-impact ways to deliver high-impact results.',
  },
  {
    title: 'Environmental',
    text: 'We keep our footprint small by working remote-first, reducing unnecessary commuting and office waste. Our operations are fully cloud-based, removing the need for physical storage and helping us stay efficient, secure, and sustainable. As a digital business, we continually look for low-impact ways to deliver high-impact results.',
  },
]

export default function AboutPage() {
  const introRef = useRef<HTMLElement>(null)

  const introInView = useInView(introRef, {
    once: true,
    margin: '-100px',
  })

  const bannerRef = useRef<HTMLElement>(null)
  const bannerVideoRef = useRef<HTMLVideoElement>(null)

  const bannerInView = useInView(bannerRef, {
    once: true,
    margin: '-100px',
  })

  const storyRef = useRef<HTMLElement>(null)

  const storyInView = useInView(storyRef, {
    once: true,
    margin: '-100px',
  })

  const teamRef = useRef<HTMLElement>(null)

  const teamInView = useInView(teamRef, {
    once: true,
    margin: '-100px',
  })

  const esgRef = useRef<HTMLElement>(null)

  const esgInView = useInView(esgRef, {
    once: true,
    margin: '-100px',
  })

  const [isVideoPaused, setIsVideoPaused] = useState(false)

  /*
   * null means no card is currently hovered.
   * In that case, index 1, the middle card, stays active.
   */
  const [activeEsgCard, setActiveEsgCard] = useState<number | null>(
    null
  )

  const toggleBannerVideo = () => {
    const video = bannerVideoRef.current

    if (!video) return

    if (video.paused) {
      void video.play()
      setIsVideoPaused(false)
    } else {
      video.pause()
      setIsVideoPaused(true)
    }
  }

  return (
    <main className={`${styles.aboutPage} page-about`}>
      <Navbar />

      {/* Hero section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className={styles.heroTitle}
          >
            Good{' '}
            <span className={styles.heroTitleSpan}>
              Marketing
            </span>{' '}
            Makes Brand Better.
          </motion.h1>

          <div className={styles.arcWrapper}>
            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={styles.arcArtwork}
            >
              <HeroCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro section */}
      <section
        ref={introRef}
        className={`${styles.section} ${styles.intro}`}
      >
        <div className={styles.container}>
          <div className={styles.twoColLayout}>
            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={
                introInView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
              }}
              className={styles.leftCol}
            >
              <div className={styles.sectionTag}>
                Who are we?
              </div>

              <h2 className={styles.introHeading}>
                Expert Web Designers And Web Developers
                Trained In The Digital Industry Who Offer A
                Bespoke, Professional And Trustworthy
                Service.
              </h2>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={
                introInView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className={styles.rightCol}
            >
              <div className={styles.introText}>
                <p className={styles.introParagraph}>
                  We are an experienced digital marketing
                  agency based in the UK, established since
                  2010. We have built deep expertise in
                  performance-driven digital growth across
                  web design, branding, and digital strategy.
                </p>

                <p className={styles.introParagraph}>
                  Our team consists of passionate developers,
                  creative designers, and strategic marketers
                  who work collaboratively to help businesses
                  grow, expand, and succeed in the online
                  marketplace.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video banner section */}
      <section
        ref={bannerRef}
        className={styles.banner}
      >
        <div
          className={`${styles.container} ${styles.bannerContainer}`}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 30,
            }}
            animate={
              bannerInView
                ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={styles.bannerBox}
          >
            <video
              ref={bannerVideoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className={styles.bannerVideo}
            >
              <source
                src="/video/mixkit-hud-style-animated-data-graph-growth-trend-visualization-5396-hd-ready.mp4"
                type="video/mp4"
              />
            </video>

            <div className={styles.videoControlDock}>
              <motion.button
                type="button"
                onClick={toggleBannerVideo}
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.2,
                }}
                className={styles.videoControlBtn}
                aria-label={
                  isVideoPaused
                    ? 'Play the video'
                    : 'Pause the video'
                }
              >
                {isVideoPaused
                  ? 'Play The Video'
                  : 'Pause The Video'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story section */}
      <section
        id="story"
        ref={storyRef}
        className={`${styles.section} ${styles.story}`}
      >
        <div className={styles.container}>
          <div className={styles.twoColLayout}>
            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={
                storyInView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
              }}
              className={styles.leftCol}
            >
              <h2 className={styles.introHeading}>
                We Were Born Out Of Frustration, Not With
                Marketing Itself, But With How It Was Being
                Delivered.
              </h2>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={
                storyInView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className={styles.rightCol}
            >
              <div className={styles.introText}>
                <p className={styles.introParagraph}>
                  We started because we noticed a gap in how
                  digital agencies interact with clients.
                  Too often, agencies deliver generic
                  templates, hands-off automated reports, and
                  standard services instead of true
                  collaborative partnerships and
                  business-oriented growth.
                </p>

                <p className={styles.introParagraph}>
                  We decided to be different. We focus on
                  relationship-building, custom strategies,
                  and measurable results. Our approach
                  combines technology with close human
                  collaboration to ensure your business
                  thrives.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ESG section */}
      <section
        ref={esgRef}
        className={`${styles.section} ${styles.esg}`}
      >
        <div className={styles.container}>
          <div className={styles.esgHeader}>
            <h2 className={styles.esgTitle}>
              ESG At KR Tasker Digital
            </h2>

            <p className={styles.esgDesc}>
              At KR Tasker, we see doing the right thing as
              part of doing great work. For us,
              Environmental, Social, and Governance ESG
              principles aren&apos;t add-ons, they&apos;re
              built into how we operate, grow, and partner
              with ambitious brands.
            </p>
          </div>

          <div className={styles.esgGrid}>
            {esgInitiatives.map((item, index) => {
              /*
               * Middle card stays active when no card
               * is currently hovered or focused.
               */
              const isActive =
                activeEsgCard === null
                  ? index === 1
                  : activeEsgCard === index

              return (
                <motion.div
                  key={`${item.title}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  animate={
                    esgInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    delay: 0.2 * index,
                    duration: 0.6,
                  }}
                  onMouseEnter={() =>
                    setActiveEsgCard(index)
                  }
                  onMouseLeave={() =>
                    setActiveEsgCard(null)
                  }
                  onFocus={() =>
                    setActiveEsgCard(index)
                  }
                  onBlur={() =>
                    setActiveEsgCard(null)
                  }
                  tabIndex={0}
                  className={`${styles.esgCard} ${
                    isActive
                      ? styles.esgCardActive
                      : styles.esgCardInactive
                  }`}
                >
                  <h3 className={styles.esgCardTitle}>
                    {item.title}
                  </h3>

                  <p className={styles.esgCardText}>
                    {item.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Contact />

      <Footer />
    </main>
  )
}
