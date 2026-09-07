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
    titlePrefix: 'Website',
    titleHighlight: 'Development',
    desc: 'We engineer responsive, conversion-focused websites, robust e-commerce solutions, and high-performance digital platforms. From custom Shopify stores and scalable WordPress architectures to bespoke B2B SaaS web applications, our engineering guarantees speed, security, and continuous support.',
    tags: [
      'Website Design & Development',
      'Shopify Store Development',
      'WordPress Development',
      'B2B / SaaS Websites',
      'Custom Website Development',
      'Website Maintenance & Support',
    ],
    isDark: true,
    link: '/contact',
    image: '/images/services/web-app-design.png',
    alt: 'Website Design & Development Services',
  },
  {
    titlePrefix: 'AI',
    titleHighlight: 'Automation',
    desc: 'Empower your business operations with intelligent artificial intelligence solutions. From custom AI chatbots and real-time voice agents to end-to-end CRM automation and enterprise AI integration, we help you streamline workflows and scale customer engagement.',
    tags: [
      'AI ChatBot Development',
      'AI Voice Agent',
      'CRM Automation',
      'AI Integration',
    ],
    isDark: false,
    link: '/contact',
    image: '/images/services/ai-automation.jpg',
    alt: 'AI Automation, ChatBots & Voice Agents',
  },
  {
    titlePrefix: 'Digital',
    titleHighlight: 'Marketing',
    desc: 'We Deliver Full-Funnel Digital Marketing Strategies That Combine SEO, Paid Media, Social Advertising, And Integrated Campaigns. From Driving Organic Visibility To Scaling Paid Performance, Our Specialist Teams Work Together To Maximise Reach, Conversions, And Long-Term Growth Across Every Channel.',
    tags: [
      'Digital 360° Marketing',
      'Social Media Marketing',
      'PPC (Pay-Per-Click)',
    ],
    isDark: true,
    link: '/contact',
    image: '/images/services/digital-marketing.png',
    alt: 'Full Funnel Digital Marketing & Advertising',
  },
  {
    titlePrefix: 'SEO (Search Engine',
    titleHighlight: 'Optimization)',
    desc: 'Dominate organic search results and drive qualified buyer traffic with data-backed search engine optimization. We specialize in technical SEO, strategic link building, high-conversion e-commerce optimization, and cutting-edge AI SEO & GEO to ensure market leadership.',
    tags: [
      'Local SEO',
      'E-Commerce SEO',
      'Link Building',
      'Lead Gen SEO',
      'Technical SEO',
      'AI SEO / GEO',
      'International / National SEO',
      'SEO Audit (Free)',
    ],
    isDark: false,
    link: '/contact',
    image: '/images/services/seo-brand-strategy.png',
    alt: 'Search Engine Optimization & AI SEO',
  },
  {
    titlePrefix: 'Email',
    titleHighlight: 'Marketing',
    desc: 'Turn subscribers into repeat customers and maximize customer lifetime value with targeted email marketing. We design automated workflows, high-converting campaign sequences, and customized templates tailored to drive measurable ROI.',
    tags: [
      'Email Automation',
      'Email Campaign Management',
      'Email Marketing Strategy',
      'Email Design',
    ],
    isDark: true,
    link: '/contact',
    image: '/images/services/email-marketing.jpg',
    alt: 'Email Marketing & Automation Strategy',
  },
  {
    titlePrefix: 'Graphic Designing &',
    titleHighlight: 'Branding',
    desc: 'Craft an unforgettable visual identity that commands trust and captivates your target audience. From 3D visualization, logo creation, brochures, and flyers to intuitive UI/UX design, our creative studio produces assets that define your brand authority.',
    tags: [
      '3D Modeling & Visualization',
      'Logo Design / Logo Making',
      'Brochure Design',
      'Flyer Design',
      'UI/UX Design',
      'Branding',
    ],
    isDark: false,
    link: '/contact',
    image: '/images/services/graphic-branding.jpg',
    alt: 'Graphic Designing, 3D Modeling & Branding',
  },
  {
    titlePrefix: 'Amazon &',
    titleHighlight: 'eBay',
    desc: 'Scale your e-commerce revenue on global marketplaces. We provide end-to-end marketplace management, keyword-optimized product listings, enhanced brand content, and advertising strategies designed to drive sales and profitability on Amazon & eBay.',
    tags: [
      'Amazon & eBay Services / Product Listing',
    ],
    isDark: true,
    link: '/contact',
    image: '/images/services/amazon-ebay.jpg',
    alt: 'Amazon & eBay Marketplace Management and Product Listing',
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

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`)

      cards.forEach((card, i) => {
        // Entrance animation
        gsap.fromTo(
          card,
          { y: 40, opacity: 0.9 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Stacking scale effect for previous cards when next card stacks over it
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1]
          gsap.to(card, {
            scale: 0.95,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 75%',
              end: 'top 20%',
              scrub: true,
            },
          })
        }
      })
    }, containerRef)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 350)

    return () => {
      clearTimeout(timer)
      ctx.revert()
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
