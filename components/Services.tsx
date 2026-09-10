'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollFillText from './ScrollFillText'
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

const tagToSlug: Record<string, string> = {
  // SEO Services
  'Local SEO': '/services/seo/local-seo',
  'E-Commerce SEO': '/services/seo/ecommerce-seo',
  'Technical SEO': '/services/seo/technical-seo',
  'On-Page SEO': '/services/seo/on-page-seo',
  'Off-Page SEO': '/services/seo/off-page-seo',
  'National SEO': '/services/seo/national-seo',
  'International SEO': '/services/seo/international-seo',
  'SEO Audit': '/services/seo/seo-audit',
  'Content Marketing': '/services/seo/content-marketing',
  'Google Penalty Recovery': '/services/seo/google-penalty-recovery',
  'AI SEO': '/services/seo/ai-seo',

  // Web Services
  'Web Design': '/services/web-development/web-design',
  'Custom Web Development': '/services/web-development/custom-web-development',
  'E-Commerce Development': '/services/web-development/ecommerce-development',
  'WordPress Development': '/services/web-development/wordpress-development',
  'Shopify Development': '/services/web-development/shopify-development',
  'UI/UX Design': '/services/web-development/ui-ux-design',
  'CMS Development': '/services/web-development/cms-development',

  // Marketing
  'Google Ads': '/services/marketing/google-ads',
  'Google Search Ads': '/services/marketing/google-ads/google-search-ads',
  'Google Shopping Ads': '/services/marketing/google-ads/google-shopping-ads',
  'Google Display Ads': '/services/marketing/google-ads/google-display-ads',
  'YouTube Ads': '/services/marketing/google-ads/youtube-ads',
  'PPC Management': '/services/marketing/google-ads/ppc-management',

  // Graphic Designing
  'Logo Design': '/services/graphic-design/logo-design',
  'Brand Identity Design': '/services/graphic-design/brand-identity-design',
  'Poster Design': '/services/graphic-design/poster-design',
  'Banner Design': '/services/graphic-design/banner-design',
  'Social Media Graphics': '/services/graphic-design/social-media-graphics',

  // Social Media
  'Social Media Management': '/services/social-media/social-media-management',
  'Social Media Marketing': '/services/social-media/social-media-marketing',
  'Social Media Strategy': '/services/social-media/social-media-strategy',
  'Social Media Content Creation': '/services/social-media/social-media-content-creation',
  'Community Management': '/services/social-media/community-management',
  'Social Media Audit': '/services/social-media/social-media-audit',
  'Influencer Marketing': '/services/social-media/influencer-marketing',
  'Social Media Consulting': '/services/social-media/social-media-consulting',

  // AI Automation
  'AI Consulting UK': '/services/ai-automation/ai-consulting-uk',
  'AI Workflow Automation': '/services/ai-automation/ai-workflow-automation',
  'AI Chatbot Development': '/services/ai-automation/ai-chatbot-development',
  'AI Voice Agents': '/services/ai-automation/ai-voice-agents',
  'Marketing Automation': '/services/ai-automation/marketing-automation',

  // Email Marketing
  'Email Marketing Strategy': '/services/email-marketing/email-marketing-strategy',
  'Email Campaign Management': '/services/email-marketing/email-campaign-management',
  'Email Automation': '/services/email-marketing/email-automation',
  'Email List Building': '/services/email-marketing/email-list-building',
  'Email Design': '/services/email-marketing/email-design',
  'Email Copywriting': '/services/email-marketing/email-copywriting',
  'Email Marketing Audit': '/services/email-marketing/email-marketing-audit',

  // Amazon & eBay
  'Full Service Management': '/services/full-service-management',
  'Advertising (PPC) Management': '/services/advertising-ppc-management',
  'Amazon SEO': '/services/amazon-seo',
  'Amazon Account Audit': '/services/amazon-account-audit',
  'Listing Optimization': '/services/listing-optimization',
  'Account Suspension & Reinstatement': '/services/account-suspension',
}

const servicesData: ServiceItem[] = [
  {
    titlePrefix: 'SEO',
    titleHighlight: 'Services',
    desc: 'Dominate search results and drive qualified buyer traffic with data-backed search engine optimization. We specialize in local, national, and international SEO, technical SEO, penalty recovery, and AI-driven organic strategies.',
    tags: [
      'Local SEO',
      'E-Commerce SEO',
      'Technical SEO',
      'On-Page SEO',
      'Off-Page SEO',
      'National SEO',
      'SEO Audit',
      'Content Marketing',
    ],
    isDark: true,
    link: '/services/seo',
    image: '/images/services/seo-brand-strategy.png',
    alt: 'Search Engine Optimization & Organic SEO Growth',
  },
  {
    titlePrefix: 'Web',
    titleHighlight: 'Services',
    desc: 'We engineer responsive, conversion-focused websites, robust e-commerce solutions, and high-performance digital platforms. From custom web engineering and CMS platforms to bespoke WordPress and Shopify stores.',
    tags: [
      'Web Design',
      'Custom Web Development',
      'E-Commerce Development',
      'WordPress Development',
      'Shopify Development',
      'UI/UX Design',
    ],
    isDark: false,
    link: '/services/web-development',
    image: '/images/services/web-app-design.png',
    alt: 'Web Design & Development Services',
  },
  {
    titlePrefix: 'Performance',
    titleHighlight: 'Marketing',
    desc: 'We deliver full-funnel Google Ads, Shopping campaigns, YouTube video ads, and integrated PPC strategies to maximize ROAS, conversions, and revenue across paid acquisition channels.',
    tags: [
      'Google Ads',
      'Google Search Ads',
      'Google Shopping Ads',
      'Google Display Ads',
      'YouTube Ads',
      'PPC Management',
    ],
    isDark: true,
    link: '/services/marketing',
    image: '/images/services/digital-marketing.png',
    alt: 'Google Ads, YouTube Ads & PPC Marketing Showcase',
  },
  {
    titlePrefix: 'Graphic',
    titleHighlight: 'Designing',
    desc: 'Craft an unforgettable visual identity that commands trust and captivates your target audience. From brand identity systems and logo design to advertising banners, posters, and creative social graphics.',
    tags: [
      'Logo Design',
      'Brand Identity Design',
      'Poster Design',
      'Banner Design',
      'Social Media Graphics',
    ],
    isDark: false,
    link: '/services/graphic-design',
    image: '/images/services/graphic-branding.jpg',
    alt: 'Logo Design, Brand Identity & Creative Graphics',
  },
  {
    titlePrefix: 'Social',
    titleHighlight: 'Media',
    desc: 'Grow brand awareness, engage active communities, and generate consistent leads across Instagram, TikTok, LinkedIn, and Meta with data-driven social media management and influencer campaigns.',
    tags: [
      'Social Media Management',
      'Social Media Marketing',
      'Social Media Strategy',
      'Social Media Content Creation',
      'Influencer Marketing',
    ],
    isDark: true,
    link: '/services/social-media',
    image: '/images/services/digital-marketing.png',
    alt: 'Social Media Management, Strategy & Influencer Marketing',
  },
  {
    titlePrefix: 'AI',
    titleHighlight: 'Automation',
    desc: 'Empower your business operations with intelligent artificial intelligence solutions. From custom AI chatbots and real-time voice agents to end-to-end CRM workflows and marketing automation.',
    tags: [
      'AI Consulting UK',
      'AI Workflow Automation',
      'AI Chatbot Development',
      'AI Voice Agents',
      'Marketing Automation',
    ],
    isDark: false,
    link: '/services/ai-automation',
    image: '/images/services/ai-automation.jpg',
    alt: 'AI Automation, Chatbots & Voice Agents',
  },
  {
    titlePrefix: 'Email',
    titleHighlight: 'Marketing',
    desc: 'Turn subscribers into repeat customers and maximize customer lifetime value with targeted email marketing. We design automated workflows, high-converting campaign sequences, and customized email designs.',
    tags: [
      'Email Marketing Strategy',
      'Email Campaign Management',
      'Email Automation',
      'Email List Building',
      'Email Design',
    ],
    isDark: true,
    link: '/services/email-marketing',
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
    isDark: false,
    link: '/services/amazon-ebay',
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
        <Link href={service.link} className={styles.titleLink}>
          <AnimatedHeading as="h3" className={styles.title}>
            {service.titlePrefix} <br />
            <span className={styles.titleHighlight}>{service.titleHighlight}</span>
          </AnimatedHeading>
        </Link>

        {/* Pill Tags */}
        <div className={styles.tags}>
          {service.tags.map((tag) => (
            <Link
              key={tag}
              href={tagToSlug[tag] || service.link}
              className={`${styles.tag} ${service.isDark ? styles.tagDark : styles.tagLight}`}
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Description */}
        <p className={styles.desc}>
          <ScrollFillText
            text={service.desc}
            startColor={service.isDark ? 'rgba(255, 255, 255, 0.45)' : '#a3a8a9'}
            endColor={service.isDark ? '#ffffff' : '#0c4651'}
          />
        </p>

        {/* Action CTA */}
        <Link href={service.link} className={styles.cta}>
          Explore Service ↗
        </Link>
      </div>

      {/* Right Column: Image Frame */}
      <Link
        href={service.link}
        className={styles.imageWrapper}
        aria-label={`Explore ${service.titlePrefix} ${service.titleHighlight}`}
      >
        <Image
          src={service.image}
          alt={service.alt}
          width={900}
          height={620}
          className={styles.cardImage}
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      </Link>
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
            <AnimatedHeading as="h2" className={styles.headingOur}>OUR</AnimatedHeading>
            <AnimatedHeading as="h2" className={styles.headingServices}>SERVICES</AnimatedHeading>
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
