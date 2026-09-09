'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedHeading from '@/components/AnimatedHeading'
import ScrollFillText from '@/components/ScrollFillText'
import Button from '@/components/Button'
import Navbar from '@/components/Navbar'
import Approach from '@/components/Approach'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import styles from './IndustriesPage.module.css'

// 1. Ticker items matching Image 2 & 4
const TICKER_ITEMS = [
  'Hospitals',
  'Real Estate',
  'HVAC',
  'Cleaners',
  'B2B',
  'SaaS',
  'Manufacturing',
  'Healthcare',
  'Dental',
  'Law firms',
  'Hotels & Hospitality',
  'eCommerce',
  'Restaurants',
  'Construction',
  'Beauty & Salons',
  'Accountants',
  'Startups',
  'Solar & Clean Energy',
]

// 2. 8 Industry cards matching Image 3
interface IndustryOverviewCard {
  id: string
  title: string
  desc: string
  services: string
  href: string
}

const INDUSTRY_OVERVIEW_CARDS: IndustryOverviewCard[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce & Retail',
    desc: 'Build shopping experiences that attract customers, simplify buying journeys, and turn more traffic into revenue.',
    services: 'E-Commerce • SEO • Paid Ads • Social Media • Web Design • CRO',
    href: '/industries/ecommerce',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    desc: 'Generate stronger visibility, qualified property enquiries, and digital experiences that turn property searches.',
    services: 'SEO • Paid Ads • Web Design • Lead Generation • Social Media',
    href: '/industries/real-estate',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Medical',
    desc: 'Build trust online while making it easier for patients to discover your services, understand your expertise, and take next step.',
    services: 'SEO • Website Design • Local SEO • Paid Ads • Content',
    href: '/industries/healthcare',
  },
  {
    id: 'professional-services',
    title: 'Professional Services',
    desc: 'Turn expertise into authority with a digital presence designed to attract, educate, and convert high-value clients.',
    services: 'Branding • Web Design • SEO • Content • Lead Generation',
    href: '/industries/law-firms',
  },
  {
    id: 'saas-tech',
    title: 'SaaS & Technology',
    desc: 'Simplify complex products, strengthen digital positioning, and build acquisition systems that sustainable growth.',
    services: 'Web Design • SEO • Content • Paid Ads • CRO',
    href: '/industries/saas',
  },
  {
    id: 'b2b-manufacturing',
    title: 'B2B & Manufacturing',
    desc: 'Reach decision-makers with digital experiences and marketing around longer buying cycles and high-value enquiries.',
    services: 'B2B SEO • Web Development • Lead Generation • Paid Ads • Content',
    href: '/industries/b2b',
  },
  {
    id: 'hospitality-travel',
    title: 'Hospitality & Travel',
    desc: 'Create digital experiences that inspire action, increase direct enquiries, and keep brand competitive crowded market.',
    services: 'Web Design • SEO • Social Media • Paid Ads • Content',
    href: '/industries/hotels-hospitality',
  },
  {
    id: 'construction',
    title: 'Construction Services',
    desc: 'Build local visibility and generate qualified enquiries through search, websites, and targeted campaigns.',
    services: 'Local SEO • Web Design • Google Ads • Lead Generation • Social Media',
    href: '/industries/construction',
  },
]

// 3. "Services By Industry" Data (Matching Latest User Image)
interface SubFeature {
  title: string
  desc: string
}

interface ServiceByIndustryItem {
  id: string
  tabLabel: string
  icon: string
  heading: string
  desc: string
  subFeatures: SubFeature[]
}

const SERVICES_BY_INDUSTRY: ServiceByIndustryItem[] = [
  {
    id: 'digital-strategy',
    tabLabel: 'Digital Strategy',
    icon: '🎯',
    heading: 'Industry-Aligned Digital Strategy',
    desc: 'We don\'t start with tactics — we start with deep industry analysis. Every strategy is built on understanding your specific market dynamics, competitive landscape, and customer behaviour patterns.',
    subFeatures: [
      {
        title: 'Market Analysis',
        desc: 'Competitive intelligence, market positioning, and opportunity mapping specific to your industry.',
      },
      {
        title: 'Customer Journey',
        desc: 'Industry-specific buying process documentation with touchpoint optimisation.',
      },
      {
        title: 'Channel Strategy',
        desc: 'Data-driven channel selection based on where your industry\'s buyers actually spend time.',
      },
      {
        title: 'Budget Allocation',
        desc: 'Optimised spend distribution across channels for maximum industry-specific ROI.',
      },
    ],
  },
  {
    id: 'marketing-ads',
    tabLabel: 'Marketing Ads',
    icon: '📢',
    heading: 'High-Intent Industry Advertising',
    desc: 'Targeting the exact decision-makers and high-value buyers in your sector through search, social, and display media tailored to your industry standards.',
    subFeatures: [
      {
        title: 'Search & Intent Ads',
        desc: 'PPC campaigns configured around high-converting commercial keywords tailored to your specific industry sector.',
      },
      {
        title: 'Targeted Social Campaigns',
        desc: 'Audience profiling and hyper-targeted LinkedIn, Meta, and TikTok campaigns matching buyer demographics.',
      },
      {
        title: 'Retargeting Systems',
        desc: 'Multi-touchpoint retargeting across the extended consideration journey typical of high-value services.',
      },
      {
        title: 'Ad Policy & Compliance',
        desc: 'Ensuring medical, financial, or legal advertising compliance across Google, Meta, and local ad networks.',
      },
    ],
  },
  {
    id: 'web-app-dev',
    tabLabel: 'Web & App Development',
    icon: '⚡',
    heading: 'Conversion-Engineered Platforms',
    desc: 'Bespoke digital experiences, portals, and web apps built for your industry\'s workflows, speed demands, and user expectations.',
    subFeatures: [
      {
        title: 'Custom Architecture',
        desc: 'Modern Next.js and high-performance engineering designed for sub-second load times and high conversions.',
      },
      {
        title: 'Industry UX/UI',
        desc: 'User experiences mapped specifically to the decision criteria and interaction patterns of your industry.',
      },
      {
        title: 'Integration Ecosystem',
        desc: 'Seamless connections with your industry CRM, booking system, ERP, EHR, or payment infrastructure.',
      },
      {
        title: 'Mobile & Speed Optimization',
        desc: 'Perfect mobile experiences with top-tier Google Lighthouse and Core Web Vitals performance.',
      },
    ],
  },
  {
    id: 'content-creative',
    tabLabel: 'Content & Creative',
    icon: '🎨',
    heading: 'Sector-Specific Creative & Authority',
    desc: 'Producing authoritative, engaging content that establishes market leadership and drives organic trust across your sector.',
    subFeatures: [
      {
        title: 'Thought Leadership',
        desc: 'Authoritative articles, whitepapers, and guides written by subject matter specialists in your sector.',
      },
      {
        title: 'Brand & Visual Systems',
        desc: 'Distinctive aesthetic systems and brand assets that elevate your market presence above competitors.',
      },
      {
        title: 'Video & Explainer Media',
        desc: 'High-impact video, visual proof, and case breakdowns illustrating your capability.',
      },
      {
        title: 'Organic SEO Copywriting',
        desc: 'Keyword-optimized, engaging copy that converts search traffic into qualified business enquiries.',
      },
    ],
  },
  {
    id: 'analytics-cro',
    tabLabel: 'Analytics & CRO',
    icon: '📊',
    heading: 'Data-Driven Performance & Growth',
    desc: 'Full-funnel attribution, real-time analytics, and systematic conversion rate optimization built around your industry KPIs.',
    subFeatures: [
      {
        title: 'Custom KPI Dashboards',
        desc: 'Real-time analytics reporting configured specifically around the metrics that matter in your sector.',
      },
      {
        title: 'Funnel & Friction Audits',
        desc: 'Systematic heuristic reviews and user session analysis to find and remove conversion drop-offs.',
      },
      {
        title: 'A/B & Multivariate Testing',
        desc: 'Structured testing pipelines validating copy, layouts, and offers for continuous conversion uplift.',
      },
      {
        title: 'Lifetime Value & Retention',
        desc: 'Post-conversion optimization to maximize average order value, patient retention, or retainer length.',
      },
    ],
  },
]

export default function IndustriesPage() {
  const [activeServiceTab, setActiveServiceTab] = useState('digital-strategy')

  const currentService = SERVICES_BY_INDUSTRY.find((s) => s.id === activeServiceTab) || SERVICES_BY_INDUSTRY[0]

  return (
    <main className={styles.page}>
      <Navbar />

      {/* =====================================================================
          1. HERO SECTION (MATCHES FIGMA IMAGE 4)
         ===================================================================== */}
      <section className={styles.hero} aria-labelledby="industries-hero-heading">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left Column: Copy & Actions */}
            <motion.div
              className={styles.heroLeft}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedHeading as="h1" id="industries-hero-heading" className={styles.heroTitle}>
                Digital <span className={styles.highlightTeal}>Growth</span> Built Around Your <span className={styles.highlightTeal}>Industry.</span>
              </AnimatedHeading>

              <p className={styles.heroSubtitle}>
                <ScrollFillText text="Every industry has its own audience, buying behaviour, challenges, and opportunities. We build digital experiences and growth strategies around the way your industry actually works — combining strategy, design, development, SEO, paid media, and creative to turn attention into measurable business growth." />
              </p>

              <div className={styles.ctaGroup}>
                <Button href="#strategy-overview">
                  Explore Our Industries
                </Button>
                <Button href="/work" variant="secondary">
                  Case Studies
                </Button>
              </div>
            </motion.div>

            {/* Right Column: Hero Image with 3 Floating Badges (Image 4) */}
            <motion.div
              className={styles.heroRight}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.visualWrapper}>
                {/* 1. Top-Left ROI Badge */}
                <div className={styles.badgeRoi} aria-label="360% ROI growth per month badge">
                  <span className={styles.roiLabel}>
                    <span>↗</span>
                    <span>ROI<br />Increased</span>
                  </span>
                  <div>
                    <div className={styles.roiNumber}>360%</div>
                    <div className={styles.roiPeriod}>Per Month</div>
                  </div>
                </div>

                <span className={styles.liveTag}>
                  <span className={styles.liveDot} /> Live Projects
                </span>

                {/* 2. Middle-Left Preview Tag */}
                <div className={styles.badgePreview} aria-hidden="true">
                  <span className={styles.playIcon} />
                  <span>Preview Now</span>
                </div>

                {/* Main Hero Photograph */}
                <div className={styles.imageFrame}>
                  <Image
                    src="/images/industry-hero.jpg"
                    alt="Digital Growth Built Around Your Industry - KR Tasker Team"
                    width={640}
                    height={480}
                    priority
                    className={styles.heroImg}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* 3. Bottom Freedom Quote Badge */}
                <div className={styles.badgeFreedom} aria-label="Build a Business which gives you Freedom">
                  <div className={styles.freedomIconWrap} aria-hidden="true">
                    ♥
                  </div>
                  <div className={styles.freedomText}>
                    Build a Business which gives you a freedom.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. MARQUEE TICKER BANNER (IMAGE 2)
         ===================================================================== */}
      <section className={styles.marqueeSection} style={{ backgroundColor: '#0c4651' }} aria-label="Industries ticker banner">
        <div className={styles.marqueeTrack}>
          <ul className={styles.marqueeList}>
            {TICKER_ITEMS.map((item, idx) => (
              <li key={`ticker-1-${idx}`} className={styles.marqueeItem}>
                <span>{item}</span>
                <span className={styles.marqueeBullet} aria-hidden="true">•</span>
              </li>
            ))}
          </ul>
          <ul className={styles.marqueeList} aria-hidden="true">
            {TICKER_ITEMS.map((item, idx) => (
              <li key={`ticker-2-${idx}`} className={styles.marqueeItem}>
                <span>{item}</span>
                <span className={styles.marqueeBullet} aria-hidden="true">•</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =====================================================================
          3. "ONE DIGITAL STRATEGY DOESN'T FIT EVERY BUSINESS" (IMAGE 3)
         ===================================================================== */}
      <section id="strategy-overview" className={styles.overviewSection} aria-labelledby="strategy-heading">
        <div className={styles.container}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <AnimatedHeading as="h2" id="strategy-heading" className={styles.sectionTitle}>
              One <span className={styles.highlightTeal}>Digital</span> Strategy Doesn&apos;t Fit Every <span className={styles.highlightTeal}>Business.</span>
            </AnimatedHeading>
            <p className={styles.sectionDescription}>
              What works for an e-commerce brand isn&apos;t necessarily what works for a healthcare provider. A real estate business doesn&apos;t have the same customer journey as a SaaS company. That&apos;s why we build our digital strategies around the market, audience, goals, and buying journey of each industry.
            </p>
          </div>

          {/* 4x2 Responsive Cards Grid */}
          <div className={styles.cardsGrid}>
            {INDUSTRY_OVERVIEW_CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
              >
                <Link
                  href={card.href}
                  className={styles.industryCard}
                >
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardTitle}>
                      <span>{card.title}</span>
                      <span className={styles.cardArrow} aria-hidden="true">→</span>
                    </h3>
                    <p className={styles.cardDesc}>{card.desc}</p>
                  </div>

                  <div className={styles.cardBottom}>
                    <div className={styles.servicesHeading}>Services:</div>
                    <div className={styles.servicesText}>{card.services}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. "SERVICES BY INDUSTRY" (MATCHES LATEST USER IMAGE)
         ===================================================================== */}
      <section className={styles.servicesByIndustrySec} aria-labelledby="services-industry-heading">
        <div className={styles.container}>
          <div className={styles.servicesByIndustryLayout}>
            {/* Left Column: Title & Vertical Navigation Tabs */}
            <div className={styles.servicesLeftCol}>
              <AnimatedHeading as="h2" id="services-industry-heading" className={styles.servicesMainTitle}>
                Services By <span className={styles.highlightTeal}>Industry</span>
              </AnimatedHeading>

              <div className={styles.tabsVerticalList} role="tablist" aria-label="Services by industry navigation">
                {SERVICES_BY_INDUSTRY.map((service) => (
                  <button
                    key={service.id}
                    role="tab"
                    aria-selected={activeServiceTab === service.id}
                    className={`${styles.tabVerticalBtn} ${activeServiceTab === service.id ? styles.tabVerticalActive : ''}`}
                    onClick={() => setActiveServiceTab(service.id)}
                  >
                    <span>{service.tabLabel}</span>
                    <span className={styles.tabVerticalArrow} aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Showcase Card with 2x2 Sub-Cards Grid */}
            <div className={styles.serviceShowcaseCard}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className={styles.serviceTopIcon} aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none">
                      <circle cx="22" cy="26" r="15" stroke="currentColor" strokeWidth="3" />
                      <circle cx="22" cy="26" r="8" stroke="currentColor" strokeWidth="3" />
                      <path d="M22 26 38 10M31 10h7v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <h3 className={styles.serviceCardHeading}>
                    {currentService.heading.includes('Digital') ? (
                      <>
                        {currentService.heading.split('Digital')[0]}
                        <span className={styles.highlightTeal}>Digital</span>
                        {currentService.heading.split('Digital')[1]}
                      </>
                    ) : currentService.heading}
                  </h3>

                  <p className={styles.serviceCardDesc}>
                    {currentService.desc}
                  </p>

                  <div className={styles.subCardsGrid}>
                    {currentService.subFeatures.map((sub, idx) => (
                      <div
                        key={sub.title}
                        className={styles.subCard}
                      >
                        <h4 className={styles.subCardTitle}>{sub.title}</h4>
                        <p className={styles.subCardText}>{sub.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>



      {/* =====================================================================
          7. SHARED GLOBAL SECTIONS
         ===================================================================== */}
      <Approach />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
