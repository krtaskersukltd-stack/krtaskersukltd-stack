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
    titlePrefix: 'Web',
    titleHighlight: 'Development',
    desc: 'We engineer responsive, conversion-focused websites, robust e-commerce solutions, and high-performance digital platforms. From bespoke B2B SaaS web applications to custom web engineering, we deliver speed, security, and scalability.',
    tags: [
      'Website Design & Development',
      'E-Commerce Web Development',
      'B2B',
      'SaaS',
      'Custom Web Development',
    ],
    isDark: true,
    link: '/contact',
    image: '/images/services/web-app-design.png',
    alt: 'Web Design & Development Services',
  },
  {
    titlePrefix: 'AI',
    titleHighlight: 'Automation',
    desc: 'Empower your business operations with intelligent artificial intelligence solutions. From custom AI chatbots and real-time voice agents to end-to-end CRM automation and enterprise AI integration, we streamline workflows and scale customer engagement.',
    tags: [
      'AI Chatbot',
      'AI Voice Agent',
      'CRM Automation',
      'AI Integration',
    ],
    isDark: false,
    link: '/contact',
    image: '/images/services/ai-automation.jpg',
    alt: 'AI Automation, Chatbots & Voice Agents',
  },
  {
    titlePrefix: 'Creative',
    titleHighlight: 'Designing',
    desc: 'Craft an unforgettable visual identity that commands trust and captivates your target audience. From 3D design and automation, logo making, and graphic assets to intuitive UI/UX design and complete branding, our creative studio produces assets that define your brand.',
    tags: [
      'UI/UX Design',
      '3D Design & Automation',
      'Graphic Design',
      'Branding',
      'Logo Making',
    ],
    isDark: true,
    link: '/contact',
    image: '/images/services/graphic-branding.jpg',
    alt: 'Creative Designing, 3D Design, UI/UX & Branding',
  },
  {
    titlePrefix: 'Digital',
    titleHighlight: 'Marketing',
    desc: 'We deliver full-funnel digital marketing strategies that combine SEO, paid media, social advertising, and integrated campaigns to maximize reach, conversions, and long-term brand growth across every channel.',
    tags: [
      'Digital 360',
      'Social Media Marketing',
      'PPC',
    ],
    isDark: false,
    link: '/contact',
    image: '/images/services/digital-marketing.png',
    alt: 'Digital 360, Social Media & PPC Marketing',
  },
  {
    titlePrefix: 'Search Engine',
    titleHighlight: 'SEO',
    desc: 'Dominate search results and drive qualified buyer traffic with data-backed search engine optimization. We specialize in local, national, and international SEO, strategic link building, high-converting e-commerce SEO, and lead generation SEO.',
    tags: [
      'Local SEO',
      'International SEO',
      'National SEO',
      'E-Commerce SEO',
      'Link Building',
      'Lead Generation SEO',
      'Technical SEO',
      'SEO Audit (Free)',
    ],
    isDark: true,
    link: '/contact',
    image: '/images/services/seo-brand-strategy.png',
    alt: 'Search Engine Optimization & Organic SEO Growth',
  },
  {
    titlePrefix: 'Email',
    titleHighlight: 'Marketing',
    desc: 'Turn subscribers into repeat customers and maximize customer lifetime value with targeted email marketing. We design automated workflows, high-converting campaign sequences, and customized email designs tailored to drive measurable ROI.',
    tags: [
      'Email Automation',
      'Email Campaign Management',
      'Email Marketing Strategy',
      'Email Design',
    ],
    isDark: false,
    link: '/contact',
    image: '/images/services/email-marketing.jpg',
    alt: 'Email Marketing, Automation & Campaign Management',
  },
  {
    titlePrefix: 'Amazon',
    titleHighlight: 'Services',
    desc: 'Scale your revenue on global marketplaces with end-to-end management, keyword-driven Amazon SEO, optimized brand stores, high-converting listing assets, and proactive account troubleshooting.',
    tags: [
      'Full Service Management',
      'Advertising (PPC) Management',
      'Amazon SEO',
      'Amazon Account Audit',
      'Listing Optimization',
      'Account Suspension & Reinstatement',
    ],
    isDark: true,
    link: '/contact',
    image: '/images/services/amazon-ebay.jpg',
    alt: 'Amazon Marketplace Management, PPC & Optimization Services',
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

    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const slots = gsap.utils.toArray<HTMLElement>(`.${styles.cardSlot}`)
      const cards = slots.map(slot => slot.firstElementChild as HTMLElement)
      const desktop = window.matchMedia('(min-width: 1025px)').matches

      slots.forEach((slot, i) => {
        // A tall card sticks only after its bottom is readable.
        gsap.set(slot, { top: () => Math.min(96, window.innerHeight - slot.offsetHeight - 32) })
        if (i < cards.length - 1) {
          gsap.to(cards[i], {
            scale: desktop ? 0.86 : 0.96,
            rotation: desktop ? (i % 2 === 0 ? 4 : -4) : 0,
            opacity: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: slots[i + 1], start: 'top bottom', end: 'top 18%',
              scrub: true, invalidateOnRefresh: true,
            },
          })
        }
      })
      const refreshOffsets = () => slots.forEach(slot => {
        gsap.set(slot, { top: Math.min(96, window.innerHeight - slot.offsetHeight - 32) })
      })
      ScrollTrigger.addEventListener('refreshInit', refreshOffsets)
      return () => ScrollTrigger.removeEventListener('refreshInit', refreshOffsets)
    }, containerRef)

    // Images have reserved dimensions; fonts can still change the card height.
    let disposed = false
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }

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
      </div>

      {/* Services Cards List with Sticky Stacking Animation */}
      <div ref={containerRef} className={styles.cardsList}>
        {servicesData.map((service, index) => (
          <div className={styles.cardSlot} key={service.titlePrefix} style={{ zIndex: index + 1 }}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  )
}
