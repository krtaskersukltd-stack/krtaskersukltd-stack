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
    id: 'seo',
    category: 'SEO Services',
    heading: 'Organic Search Dominance, Technical Architecture, High-Authority Link Acquisition, And Lead Generation.',
    image: '/images/services/seo-brand-strategy.png',
    alt: 'Local, National, Technical & E-Commerce SEO Showcase',
    subServices: [
      { name: 'Local SEO', href: '/services/seo/local-seo' },
      { name: 'E-Commerce SEO', href: '/services/seo/ecommerce-seo' },
      { name: 'Technical SEO', href: '/services/seo/technical-seo' },
      { name: 'On-Page SEO', href: '/services/seo/on-page-seo' },
      { name: 'Off-Page SEO', href: '/services/seo/off-page-seo' },
      { name: 'National SEO', href: '/services/seo/national-seo' },
      { name: 'International SEO', href: '/services/seo/international-seo' },
      { name: 'SEO Audit', href: '/services/seo/seo-audit' },
      { name: 'Content Marketing', href: '/services/seo/content-marketing' },
      { name: 'Google Penalty Recovery', href: '/services/seo/google-penalty-recovery' },
      { name: 'AI SEO', href: '/services/seo/ai-seo' },
    ],
  },
  {
    id: 'web-development',
    category: 'Web Services',
    heading: 'High-Performance Web Applications, Custom Platforms, And Scalable Digital Systems Built For Growth.',
    image: '/images/services/web-app-design.png',
    alt: 'Web Design & Custom Web Development Showcase',
    subServices: [
      { name: 'Web Design', href: '/services/web-development/web-design' },
      { name: 'Custom Web Development', href: '/services/web-development/custom-web-development' },
      { name: 'E-Commerce Development', href: '/services/web-development/ecommerce-development' },
      { name: 'WordPress Development', href: '/services/web-development/wordpress-development' },
      { name: 'Shopify Development', href: '/services/web-development/shopify-development' },
      { name: 'UI/UX Design', href: '/services/web-development/ui-ux-design' },
      { name: 'CMS Development', href: '/services/web-development/cms-development' },
    ],
  },
  {
    id: 'marketing',
    category: 'Marketing',
    heading: 'High-Converting Google Ads, Shopping Campaigns, YouTube Video Advertising, And Full-Service PPC Management.',
    image: '/images/services/digital-marketing.png',
    alt: 'Google Ads & PPC Management Showcase',
    subServices: [
      { name: 'Google Ads', href: '/services/marketing/google-ads' },
      { name: 'Google Search Ads', href: '/services/marketing/google-ads/google-search-ads' },
      { name: 'Google Shopping Ads', href: '/services/marketing/google-ads/google-shopping-ads' },
      { name: 'Google Display Ads', href: '/services/marketing/google-ads/google-display-ads' },
      { name: 'YouTube Ads', href: '/services/marketing/google-ads/youtube-ads' },
      { name: 'PPC Management', href: '/services/marketing/google-ads/ppc-management' },
    ],
  },
  {
    id: 'graphic-design',
    category: 'Graphic Designing',
    heading: 'World-Class Logo Design, Brand Identity Systems, Posters, Banners, And Creative Social Media Graphics.',
    image: '/images/services/graphic-branding.jpg',
    alt: 'Logo Design, Brand Identity & Creative Graphics Showcase',
    subServices: [
      { name: 'Logo Design', href: '/services/graphic-design/logo-design' },
      { name: 'Brand Identity Design', href: '/services/graphic-design/brand-identity-design' },
      { name: 'Poster Design', href: '/services/graphic-design/poster-design' },
      { name: 'Banner Design', href: '/services/graphic-design/banner-design' },
      { name: 'Social Media Graphics', href: '/services/graphic-design/social-media-graphics' },
    ],
  },
  {
    id: 'social-media',
    category: 'Social Media',
    heading: 'Full-Funnel Social Media Management, Targeted Paid Social Campaigns, Content Creation, And Influencer Marketing.',
    image: '/images/services/digital-marketing.png',
    alt: 'Social Media Strategy & Marketing Showcase',
    subServices: [
      { name: 'Social Media Management', href: '/services/social-media/social-media-management' },
      { name: 'Social Media Marketing', href: '/services/social-media/social-media-marketing' },
      { name: 'Social Media Strategy', href: '/services/social-media/social-media-strategy' },
      { name: 'Social Media Content Creation', href: '/services/social-media/social-media-content-creation' },
      { name: 'Community Management', href: '/services/social-media/community-management' },
      { name: 'Social Media Audit', href: '/services/social-media/social-media-audit' },
      { name: 'Influencer Marketing', href: '/services/social-media/influencer-marketing' },
      { name: 'Social Media Consulting', href: '/services/social-media/social-media-consulting' },
    ],
  },
  {
    id: 'ai-automation',
    category: 'AI Automation',
    heading: 'Intelligent Automations, Custom Chatbots, AI Voice Agents, And Workflow Solutions To Scale Operations.',
    image: '/images/services/ai-automation.jpg',
    alt: 'AI Automation, Chatbots & Voice Agents Showcase',
    subServices: [
      { name: 'AI Consulting UK', href: '/services/ai-automation/ai-consulting-uk' },
      { name: 'AI Workflow Automation', href: '/services/ai-automation/ai-workflow-automation' },
      { name: 'AI Chatbot Development', href: '/services/ai-automation/ai-chatbot-development' },
      { name: 'AI Voice Agents', href: '/services/ai-automation/ai-voice-agents' },
      { name: 'Marketing Automation', href: '/services/ai-automation/marketing-automation' },
    ],
  },
  {
    id: 'email-marketing',
    category: 'Email Marketing',
    heading: 'Lifecycle Marketing, Behavioral Automated Sequences, High-Converting Newsletters, And Custom Template Design.',
    image: '/images/services/email-marketing.jpg',
    alt: 'Email Automation & Campaign Management Showcase',
    subServices: [
      { name: 'Email Marketing Strategy', href: '/services/email-marketing/email-marketing-strategy' },
      { name: 'Email Campaign Management', href: '/services/email-campaign-management' },
      { name: 'Email Automation', href: '/services/email-automation' },
      { name: 'Email List Building', href: '/services/email-list-building' },
      { name: 'Email Design', href: '/services/email-design' },
      { name: 'Email Copywriting', href: '/services/email-copywriting' },
      { name: 'Email Marketing Audit', href: '/services/email-marketing/email-marketing-audit' },
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
