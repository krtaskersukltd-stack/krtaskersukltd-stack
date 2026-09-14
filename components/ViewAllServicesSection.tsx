'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import styles from './ViewAllServicesSection.module.css'
import type { ServiceRecord } from '@/lib/cms-types'
import { MAIN_SERVICES, type MainServiceItem, type SubServiceLink } from './Navbar'

export interface SubServiceTabData {
  name: string
  slug: string
  category?: string
  description: string
  highlights?: string[]
  ctaText?: string
  mockups?: {
    image: string
    alt: string
    caption?: string
    badge?: string
  }[]
}

const DEFAULT_MOCKUPS = [
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    alt: 'Performance Dashboard',
    caption: 'Verified ROI & Growth',
    badge: 'High Impact',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    alt: 'Analytics Console',
    caption: 'Live Conversion Metrics',
    badge: 'Real-time',
  },
  {
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop',
    alt: 'Campaign Architecture',
    caption: 'Strategic Execution',
    badge: 'Scale',
  },
  {
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=800&auto=format&fit=crop',
    alt: 'Optimization Workflow',
    caption: 'Continuous Tuning',
    badge: 'Enterprise',
  },
]

// Resolve tabs for the current category using the exact navbar sub-service items
function resolveCategoryTabs(srv: ServiceRecord): SubServiceTabData[] {
  const cleanSlug = srv.slug.replace(/^\/services\//, '').replace(/^\//, '').replace(/\/$/, '').toLowerCase()

  // 1. Find matching main service in Navbar MAIN_SERVICES
  const matchedMain = MAIN_SERVICES.find((m: MainServiceItem) => {
    const mainCleanHref = m.href.replace(/^\/services\//, '').replace(/^\//, '').replace(/\/$/, '').toLowerCase()
    return (
      (m.id && m.id.toLowerCase() === cleanSlug) ||
      mainCleanHref === cleanSlug ||
      m.title.toLowerCase() === cleanSlug ||
      (cleanSlug === 'ppc' && (m.id === 'ppc' || m.id === 'marketing')) ||
      (cleanSlug === 'marketing' && m.id === 'marketing') ||
      (cleanSlug.includes('web') && m.id === 'web-development') ||
      (cleanSlug.includes('seo') && m.id === 'seo') ||
      (cleanSlug.includes('social') && m.id === 'social-media') ||
      (cleanSlug.includes('email') && m.id === 'email-marketing') ||
      (cleanSlug.includes('ai') && m.id === 'ai-automation') ||
      (cleanSlug.includes('graphic') && m.id === 'graphic-design')
    )
  })

  if (matchedMain && matchedMain.subServices && matchedMain.subServices.length > 0) {
    return matchedMain.subServices.map((sub: SubServiceLink) => ({
      name: sub.title,
      slug: sub.href,
      category: matchedMain.title,
      description: `Leading full-service ${sub.title} solutions engineered by KR Tasker Digital to accelerate your business performance, market visibility, and sustained conversion growth.`,
      highlights: [
        `Customized ${sub.title} Strategy & Architecture`,
        'Continuous Performance & Conversion Optimization',
        'Transparent Live Metrics & Dedicated Growth Advisory',
      ],
      ctaText: 'Find Out More',
      mockups: DEFAULT_MOCKUPS,
    }))
  }

  // 2. Fallback to CMS dynamic capabilities if present
  if (srv.capabilities && srv.capabilities.length > 0) {
    return srv.capabilities.map((cap) => ({
      name: cap.name,
      slug: cap.slug.startsWith('/') ? cap.slug : `/services/${cap.slug}`,
      category: srv.name,
      description:
        cap.description ||
        `Leading full-service ${cap.name} solutions engineered by KR Tasker Digital to accelerate your business performance, market visibility, and sustained conversion growth.`,
      highlights: [
        `Customized ${cap.name} Strategy & Architecture`,
        'Continuous Performance & Conversion Optimization',
        'Transparent Analytics & Dedicated Growth Advisory',
      ],
      ctaText: 'Find Out More',
      mockups: DEFAULT_MOCKUPS,
    }))
  }

  // 3. Fallback to PPC items
  return [
    { name: 'Digital 360', slug: '/services/digital-360', category: 'PPC', description: 'All-in-one digital growth package combining search rankings, paid performance advertising, and CRO.', highlights: ['Holistic Multi-Channel Strategy', 'Dedicated Growth Manager', 'End-to-End Execution'], ctaText: 'Find Out More', mockups: DEFAULT_MOCKUPS },
    { name: 'Social Media Marketing', slug: '/services/social-media/social-media-marketing', category: 'PPC', description: 'Targeted paid advertising and creative campaigns across Meta, Instagram, LinkedIn, and TikTok.', highlights: ['Meta Pixel & CAPI Tracking', 'Lookalike Audiences', 'High-Converting Creatives'], ctaText: 'Find Out More', mockups: DEFAULT_MOCKUPS },
    { name: 'PPC / PPC Management', slug: '/services/ppc/ppc-management', category: 'PPC', description: 'Full-funnel pay-per-click management designed to lower acquisition costs and capture ready-to-buy customers.', highlights: ['A/B Testing Copy & Landing Pages', 'Negative Keyword Cleansing', 'Custom Conversion Funnel'], ctaText: 'Find Out More', mockups: DEFAULT_MOCKUPS },
    { name: 'Google Ads', slug: '/services/ppc/google-ads', category: 'PPC', description: 'Certified Google Premier Partner strategy driving qualified traffic across Search, Display, Shopping, and YouTube.', highlights: ['Continuous Bid Optimization', 'Transparent Live ROAS', 'Certified Strategy'], ctaText: 'Find Out More', mockups: DEFAULT_MOCKUPS },
    { name: 'Google Search Ads', slug: '/services/ppc/google-search-ads', category: 'PPC', description: 'Capture commercial intent searches with responsive ads and hyper-focused keywords.', highlights: ['Quality Score Optimization', 'High-CTR Ad Copy', 'Negative Keyword Cleansing'], ctaText: 'Find Out More', mockups: DEFAULT_MOCKUPS },
    { name: 'Google Shopping Ads', slug: '/services/ppc/google-shopping-ads', category: 'PPC', description: 'Showcase retail inventory directly on Google Shopping with Performance Max campaigns.', highlights: ['Merchant Center Feed Tuning', 'Margin-Based Bidding', 'Live Product Sync'], ctaText: 'Find Out More', mockups: DEFAULT_MOCKUPS },
    { name: 'Google Display Ads', slug: '/services/ppc/google-display-ads', category: 'PPC', description: 'Engage prospective buyers across websites and apps with custom banner creatives.', highlights: ['Dynamic Retargeting', 'High-Impact Creative Sets', 'Fraudulent Click Filtering'], ctaText: 'Find Out More', mockups: DEFAULT_MOCKUPS },
    { name: 'YouTube Ads', slug: '/services/ppc/youtube-ads', category: 'PPC', description: 'Reach engaged video audiences with in-stream and bumper video advertising campaigns.', highlights: ['Video Action Campaigns', 'Custom Intent Grouping', 'Cost-Per-View Efficiency'], ctaText: 'Find Out More', mockups: DEFAULT_MOCKUPS },
  ]
}

export default function ViewAllServicesSection({ srv }: { srv: ServiceRecord }) {
  const tabs = resolveCategoryTabs(srv)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTab = tabs[activeIndex] || tabs[0]

  return (
    <section className={styles.section} id="view-all-services">
      <div className={styles.container}>
        {/* Header matching screenshot */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.sectionTitle}>View All Our Services</h2>
        </div>

        {/* Horizontal Tabs Bar showing hover submenu items */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsList} role="tablist" aria-label="Services tabs">
            {tabs.map((tab, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={`${tab.name}-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(idx)}
                  className={`${styles.tabPill} ${isActive ? styles.tabPillActive : ''}`}
                >
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className={styles.bentoLayout}>
          {/* Left Solid Teal Bento Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-card-${activeTab.name}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className={styles.leftCard}
            >
              <div className={styles.leftCardContent}>
                <span className={styles.leftCardBadge}>
                  {activeTab.category || srv.name}
                </span>
                <h3 className={styles.leftCardTitle}>{activeTab.name}</h3>
                <p className={styles.leftCardDesc}>{activeTab.description}</p>

                {activeTab.highlights && (
                  <ul className={styles.featureList}>
                    {activeTab.highlights.map((h, i) => (
                      <li key={i} className={styles.featureItem}>
                        <span className={styles.featureCheck}>✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={styles.leftCardBottom}>
                <Link href={activeTab.slug} className={styles.findOutMoreBtn}>
                  <span>{activeTab.ctaText || 'Find Out More'}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Bento Grid: 4-Item Mockup & Showcase Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-grid-${activeTab.name}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={styles.rightBentoGrid}
            >
              {(activeTab.mockups || DEFAULT_MOCKUPS).slice(0, 4).map((m, idx) => (
                <div key={idx} className={styles.mockupCard}>
                  <div className={styles.mockupImageWrapper}>
                    <Image
                      src={m.image}
                      alt={m.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className={styles.mockupImage}
                    />
                    {m.badge && (
                      <span className={styles.mockupBadgeTop}>{m.badge}</span>
                    )}
                    {m.caption && (
                      <div className={styles.mockupPill}>
                        <span className={styles.mockupPillDot} />
                        <span>{m.caption}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
