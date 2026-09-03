'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Approach from '@/components/Approach'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
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
    id: 'designing',
    category: 'Designing',
    heading: 'Brand Designers And Web Designers In-House Crafting Visuals To Match Your Brand Values.',
    image: '/images/services/web-app-design.png',
    alt: 'Web Design & Brand Identity Showcase',
    subServices: [
      { name: 'Brand Identity', href: '/services/branding' },
      { name: 'Web Design', href: '/services/web-development' },
      { name: 'Ecommerce Design', href: '/services/shopify-development' },
      { name: 'Shopify', href: '/services/shopify-development' },
      { name: 'Graphics Design', href: '/services/graphic-design' },
    ],
  },
  {
    id: 'ai-automation',
    category: 'AI & Automation',
    heading: 'Intelligent Automations And AI Workflows To Scale Your Growth, Streamline Operations, And Reduce Costs.',
    image: '/images/services/digital-marketing.png',
    alt: 'AI and Intelligent Automation Solutions',
    subServices: [
      { name: 'AI Solutions', href: '/services/ai-solutions' },
      { name: 'AI Automation', href: '/services/ai-automation' },
      { name: 'Custom AI Agents & Chatbots', href: '/services/ai-solutions' },
      { name: 'Business Consultancy', href: '/services/business-consultancy' },
      { name: 'Growth Analytics', href: '/services/digital-360' },
    ],
  },
  {
    id: 'branding',
    category: 'Branding',
    heading: 'Creating Distinctive, Memorable Brands And Design Systems That Connect With Your Audience.',
    image: '/images/services/seo-brand-strategy.png',
    alt: 'Brand Identity and Creative Design Showcase',
    subServices: [
      { name: 'Brand Strategy', href: '/services/branding' },
      { name: 'Visual Identity & Logo', href: '/services/branding' },
      { name: 'Design Systems', href: '/services/web-development' },
      { name: 'Creative Direction', href: '/services/branding' },
      { name: 'Marketing Collateral', href: '/services/graphic-design' },
    ],
  },
  {
    id: 'seo',
    category: 'SEO & Marketing',
    heading: 'Full-Funnel Organic Visibility And Data-Driven Search Campaigns That Drive Sustainable Revenue.',
    image: '/images/featured-image.png',
    alt: 'SEO and Digital Marketing Growth Showcase',
    subServices: [
      { name: 'Technical SEO Audits', href: '/services/seo' },
      { name: 'On-Page & Keyword Strategy', href: '/services/seo' },
      { name: 'PPC & Paid Search', href: '/services/ppc' },
      { name: 'Social Media Marketing', href: '/services/social-media' },
      { name: 'Email Marketing', href: '/services/email-marketing' },
    ],
  },
  {
    id: 'shopify',
    category: 'Shopify & E-Commerce',
    heading: 'Custom High-Converting Shopify Stores Designed For Seamless Checkout, Speed, And Maximum Conversions.',
    image: '/images/services/web-app-design.png',
    alt: 'Shopify and E-Commerce Development Showcase',
    subServices: [
      { name: 'Custom Shopify Store', href: '/services/shopify-development' },
      { name: 'Ecommerce UX/UI', href: '/services/shopify-development' },
      { name: 'Store Migration & Redesign', href: '/services/shopify-development' },
      { name: 'App & Payment Integration', href: '/services/shopify-development' },
      { name: 'Conversion Rate Optimization', href: '/services/digital-360' },
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
            <h1 id="services-hero-heading" className={styles.title}>
              Our Creative Services
              <span className={styles.titleHighlight}>Excellence Delivered</span>
            </h1>

            {/* Subtitle Description */}
            <p className={styles.subtitle}>
              Ideas, Stories, And Strategies From The Creative Edge Covering Design,
              Development, And The Tools That Bring Bold Digital Work To Life.
            </p>

            {/* Action CTA Buttons */}
            <div className={styles.ctaGroup}>
              <Link href="/about" className={styles.btnPrimary}>
                About KR Tasker
              </Link>
              <Link href="/work" className={styles.btnSecondary}>
                <span>View Our Work</span>
              </Link>
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
         
            <h2 id="what-we-do-heading" className={styles.sectionHeading}>
              What We Do
            </h2>
          </motion.div>

          {/* List of 5 Core Services */}
          <div className={styles.servicesList}>
            {MAIN_SERVICES_DATA.map((service, index) => (
              <motion.article
                key={service.id}
                className={styles.serviceRow}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Left Column: Category Name & Showcase Visual */}
                <div className={styles.serviceColLeft}>
                  <h3 className={styles.categoryTag}>
                    <span className={styles.categoryDot} aria-hidden="true" />
                    <span>{service.category}</span>
                  </h3>

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
                  <p className={styles.categoryHeadline}>{service.heading}</p>

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