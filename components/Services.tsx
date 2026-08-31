'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Services.module.css'

gsap.registerPlugin(ScrollTrigger)

interface ServiceItem {
  titlePrefix: string
  titleHighlight: string
  desc: string
  tags: string[]
  isDark: boolean
  link: string
  image: string
  alt: string
}

const servicesData: ServiceItem[] = [
  {
    titlePrefix: 'Digital',
    titleHighlight: 'Marketing',
    desc: 'We Deliver Full-Funnel Digital Marketing Strategies That Combine SEO, Paid Media, Social Advertising, And Integrated Campaigns. From Driving Organic Visibility To Scaling Paid Performance, Our Specialist Teams Work Together To Maximise Reach, Conversions, And Long-Term Growth Across Every Channel.',
    tags: [
      'Digital 360',
      'SEO',
      'PPC',
      'Social Media Marketing',
      'Google Ads',
      'Email Marketing',
      'CRO',
    ],
    isDark: true,
    link: '/contact',
    image: '/images/services/digital-marketing.png',
    alt: 'Digital Marketing & Strategy Planning',
  },
  {
    titlePrefix: 'Web & App',
    titleHighlight: 'Designing',
    desc: 'We create fast, conversion-oriented websites, apps, and digital solutions designed to elevate brand authority. From UX/UI strategy to interactive launches, our specialized team delivers speed, scalability, and measurable digital engagement.',
    tags: [
      'Web Design & Development',
      'App Design & Development',
      'Brand Identity',
      'UI/UX Strategy',
      'Custom Websites',
      'E-Commerce',
    ],
    isDark: false,
    link: '/contact',
    image: '/images/services/web-app-design.png',
    alt: 'Web and Mobile App UI/UX Design Showcase',
  },
  {
    titlePrefix: 'AI',
    titleHighlight: 'Automation',
    desc: 'Harness the power of artificial intelligence to transform your business operations, customer experiences, and decision-making with cutting-edge intelligent automation, custom tools, and predictive analytics.',
    tags: [
      'AI Strategy',
      'Custom AI Solutions',
      'Agents & Chatbots',
      'AI Automation',
      'Growth Analytics',
    ],
    isDark: true,
    link: '/contact',
    image: '/images/services/seo-brand-strategy.png',
    alt: 'AI Solutions and Direction Strategy',
  },
]

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <div
      className={`${styles.card} ${service.isDark ? styles.cardDark : styles.cardLight}`}
    >
      {/* Left Column */}
      <div className={styles.cardLeft}>
        <h3 className={styles.title}>
          {service.titlePrefix} <br />
          <span className={styles.titleHighlight}>{service.titleHighlight}</span>
        </h3>

        {/* Pill Tags */}
        <div className={styles.tags}>
          {service.tags.map((tag) => (
            <span
              key={tag}
              className={`${styles.tag} ${service.isDark ? styles.tagDark : styles.tagLight}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className={styles.desc}>{service.desc}</p>

        {/* Action CTA */}
        <Link href={service.link} className={styles.cta}>
          Start A Project
        </Link>
      </div>

      {/* Right Column: Image Frame */}
      <div className={styles.imageWrapper}>
        <Image
          src={service.image}
          alt={service.alt}
          width={900}
          height={620}
          className={styles.cardImage}
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`)

    // Stacking scroll effect with 100% solid opacity (no white overlay or fading)
    cards.forEach((card, i) => {
      // Entrance animation with solid opacity
      gsap.fromTo(
        card,
        { y: 50 },
        {
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Stacking scale effect for previous cards (without any opacity fade)
      if (i < cards.length - 1) {
        const nextCard = cards[i + 1]
        gsap.to(card, {
          scale: 0.96,
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 70%',
            end: 'top 20%',
            scrub: true,
          },
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.servicesSec} id="services">
      <div className={styles.container}>
        {/* Section Header: OUR SERVICES with Diagonal Arrow */}
        <motion.div
          className={styles.headingContainer}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headingWrapper}>
            <h2 className={styles.headingOur}>OUR</h2>
            <h2 className={styles.headingServices}>SERVICES</h2>
          </div>

          <div className={styles.headerArrowWrap} aria-hidden="true">
            <svg
              className={styles.headerArrow}
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="38" y1="10" x2="10" y2="38" />
              <polyline points="30 38 10 38 10 18" />
            </svg>
          </div>
        </motion.div>

        {/* Services Cards List with Sticky Stacking Animation */}
        <div ref={containerRef} className={styles.cardsList}>
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
