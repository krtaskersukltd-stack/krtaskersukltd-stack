'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import ScrollFillText from '@/components/ScrollFillText'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Approach from '@/components/Approach'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import styles from './ServicesPage.module.css'

interface SubService {
  name: string
  href: string
}

interface MainServiceOffering {
  id: string
  category: string
  heading: string
  image: string
  alt: string
  subServices: SubService[]
}

const MAIN_SERVICES_DATA: MainServiceOffering[] = [
  {
    id: 'web-development',
    category: 'Web Development',
    heading: 'High-Performance Web Applications, Custom Platforms, And Scalable Digital Systems Built For Growth.',
    image: '/images/services/web-app-design.png',
    alt: 'Web Design & Custom Web Development Showcase',
    subServices: [
      { name: 'Website Design & Development', href: '/services/website-design-development' },
      { name: 'E-Commerce Web Development', href: '/services/ecommerce-web-development' },
      { name: 'B2B', href: '/services/b2b' },
      { name: 'SaaS', href: '/services/saas' },
      { name: 'Custom Web Development', href: '/services/custom-web-development' },
    ],
  },
  {
    id: 'ai-automation',
    category: 'AI Automation',
    heading: 'Intelligent Automations, Custom Chatbots, And AI Voice Agents To Scale Workflows And Operations.',
    image: '/images/services/ai-automation.jpg',
    alt: 'AI Automation, Chatbots & Voice Agents Showcase',
    subServices: [
      { name: 'AI Chatbot', href: '/services/ai-chatbot' },
      { name: 'AI Voice Agent', href: '/services/ai-voice-agent' },
      { name: 'CRM Automation', href: '/services/crm-automation' },
      { name: 'AI Integration', href: '/services/ai-integration' },
    ],
  },
  {
    id: 'designing',
    category: 'Designing',
    heading: 'World-Class UI/UX Design, 3D Automation, Identity Systems, And Creative Graphics That Command Trust.',
    image: '/images/services/graphic-branding.jpg',
    alt: 'UI/UX Design, 3D Design & Branding Showcase',
    subServices: [
      { name: 'UI/UX Design', href: '/services/ui-ux-design' },
      { name: '3D Design & Automation', href: '/services/3d-design-automation' },
      { name: 'Graphic Design', href: '/services/graphic-design' },
      { name: 'Branding', href: '/services/branding' },
      { name: 'Logo Making', href: '/services/logo-making' },
    ],
  },
  {
    id: 'digital-marketing',
    category: 'Digital Marketing',
    heading: 'Full-Funnel Multi-Channel Strategies, Performance Social Media Campaigns, And High-ROI PPC Advertising.',
    image: '/images/services/digital-marketing.png',
    alt: 'Digital 360, Social Media & PPC Marketing Showcase',
    subServices: [
      { name: 'Digital 360', href: '/services/digital-360' },
      { name: 'Social Media Marketing', href: '/services/social-media' },
      { name: 'PPC', href: '/services/ppc' },
    ],
  },
  {
    id: 'seo',
    category: 'SEO',
    heading: 'Organic Search Dominance, Technical Architecture, High-Authority Link Acquisition, And Lead Generation.',
    image: '/images/services/seo-brand-strategy.png',
    alt: 'Local, National & E-Commerce SEO Showcase',
    subServices: [
      { name: 'Local SEO', href: '/services/local-seo' },
      { name: 'International SEO', href: '/services/international-seo' },
      { name: 'National SEO', href: '/services/national-seo' },
      { name: 'E-Commerce SEO', href: '/services/ecommerce-seo' },
      { name: 'Link Building', href: '/services/link-building' },
      { name: 'Lead Generation SEO', href: '/services/lead-gen-seo' },
      { name: 'Technical SEO', href: '/services/technical-seo' },
      { name: 'SEO Audit (Free)', href: '/services/seo-audit' },
    ],
  },
  {
    id: 'email-marketing',
    category: 'Email Marketing',
    heading: 'Lifecycle Marketing, Behavioral Automated Flows, High-Converting Campaigns, And Bespoke Template Design.',
    image: '/images/services/email-marketing.jpg',
    alt: 'Email Automation & Campaign Management Showcase',
    subServices: [
      { name: 'Email Automation', href: '/services/email-automation' },
      { name: 'Email Campaign Management', href: '/services/email-campaign-management' },
      { name: 'Email Marketing Strategy', href: '/services/email-marketing-strategy' },
      { name: 'Email Design', href: '/services/email-design' },
    ],
  },
]

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className={styles.hero} aria-labelledby="services-hero-heading">
        <div className={styles.container}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
           

            {/* Main Headline */}
            <AnimatedHeading as="h1" id="services-hero-heading" className={styles.title}>
              Our Creative Services
              <span className={styles.titleHighlight}>Excellence Delivered</span>
            </AnimatedHeading>

            {/* Subtitle Description */}
            <p className={styles.subtitle}>
              <ScrollFillText text="Ideas, Stories, And Strategies From The Creative Edge Covering Design, Development, And The Tools That Bring Bold Digital Work To Life." />
            </p>

            {/* Action CTA Buttons */}
            <div className={styles.ctaGroup}>
              <Button href="/about">About KR Tasker</Button>
              <Button href="/work" variant="secondary">View Our Work</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. "WHAT WE DO" SERVICES SHOWCASE SECTION */}
      <section className={styles.whatWeDoSec} aria-labelledby="what-we-do-heading">
        <div className={styles.container}>
          {/* Section Header */}
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              (Services)
            </p>
            <AnimatedHeading as="h2" id="what-we-do-heading" className={styles.sectionHeading}>
              What We Do
            </AnimatedHeading>
          </motion.div>

          {/* List of 5 Core Services */}
          <div className={styles.servicesList}>
            {MAIN_SERVICES_DATA.map((service, index) => (
              <motion.article
                key={service.id}
                className={styles.serviceRow}
                initial={{ opacity: 0, x: index % 2 === 0 ? -42 : 42 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Left Column: Category Name & Showcase Visual */}
                <div className={styles.serviceColLeft}>
                  <AnimatedHeading as="h3" className={styles.categoryTag}>
                    <span className={styles.categoryDot} aria-hidden="true" />
                    <span>{service.category}</span>
                  </AnimatedHeading>

                  <div className={styles.imageCard}>
                    <Image
                      src={service.image}
                      alt={service.alt}
                      width={800}
                      height={550}
                      className={styles.serviceImg}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </div>
                </div>

                {/* Right Column: Heading Description & Interactive Sub-Services */}
                <div className={styles.serviceColRight}>
                  <p className={styles.categoryHeadline}>
                    <ScrollFillText text={service.heading} />
                  </p>

                  <nav className={styles.subServicesList} aria-label={`${service.category} sub-services`}>
                    {service.subServices.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={styles.subServiceItem}
                      >
                        <span className={styles.subServiceName}>
                          <span className={styles.subServiceDot} aria-hidden="true" />
                          <span>{sub.name}</span>
                        </span>
                        <span className={styles.arrowBtn} aria-hidden="true">
                          <span className={styles.arrowIcon}>→</span>
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MOUNTED SECTIONS */}
      <Approach />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
