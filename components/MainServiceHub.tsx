'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from './Navbar'
import HappyClients from './HappyClients'
import ProcessSection from './ProcessSection'
import Testimonials from './Testimonials'
import FaqSection from './FaqSection'
import Contact from './Contact'
import Footer from './Footer'
import StructuredData from './StructuredData'
import styles from './MainServiceHub.module.css'
import type { ServiceRecord, ServiceCapability } from '@/lib/cms-types'
import WorkTogetherMarquee from './WorkTogetherMarquee'
import ScrollFillText from './ScrollFillText'
import Button from './Button'

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop'
const DEFAULT_VISION_IMAGE = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop'

const DEFAULT_CAPABILITIES: ServiceCapability[] = [
  { name: 'Digital 360', slug: '/services/digital-360', badge: 'POPULAR' },
  { name: 'SEO', slug: '/services/seo' },
  { name: 'PPC', slug: '/services/ppc' },
  { name: 'Social Media Marketing', slug: '/services/social-media' },
  { name: 'Google Ads', slug: '/services/marketing/google-ads' },
  { name: 'Email Marketing', slug: '/services/email-marketing' },
  { name: 'CRO', slug: '/services/digital-360' },
]

const CAPABILITIES_BY_CATEGORY: Record<string, ServiceCapability[]> = {
  'web-development': [
    { name: 'Website Design & Development', slug: '/services/web-development' },
    { name: 'Web Design', slug: '/services/web-development/web-design' },
    { name: 'Custom Web Development', slug: '/services/web-development/custom-web-development' },
    { name: 'E-Commerce Web Development', slug: '/services/web-development/ecommerce-development' },
    { name: 'WordPress Development', slug: '/services/web-development/wordpress-development' },
    { name: 'Shopify Development', slug: '/services/web-development/shopify-development' },
    { name: 'UI/UX Design', slug: '/services/web-development/ui-ux-design' },
    { name: 'CMS Development', slug: '/services/web-development/cms-development' },
    { name: 'B2B', slug: '/services/b2b-enterprise' },
    { name: 'SaaS', slug: '/services/saas-technology' },
  ],
  'marketing': [
    { name: 'Digital 360', slug: '/services/digital-360' },
    { name: 'Social Media Marketing', slug: '/services/social-media/social-media-marketing' },
    { name: 'PPC / PPC Management', slug: '/services/marketing/google-ads/ppc-management' },
    { name: 'Google Ads', slug: '/services/marketing/google-ads' },
    { name: 'Google Search Ads', slug: '/services/marketing/google-ads/google-search-ads' },
    { name: 'Google Shopping Ads', slug: '/services/marketing/google-ads/google-shopping-ads' },
    { name: 'Google Display Ads', slug: '/services/marketing/google-ads/google-display-ads' },
    { name: 'YouTube Ads', slug: '/services/marketing/google-ads/youtube-ads' },
  ],
  'digital-marketing': [
    { name: 'Digital 360', slug: '/services/digital-360' },
    { name: 'SEO', slug: '/services/seo' },
    { name: 'PPC', slug: '/services/ppc' },
    { name: 'Social Media Marketing', slug: '/services/social-media' },
    { name: 'Google Ads', slug: '/services/marketing/google-ads' },
    { name: 'Email Marketing', slug: '/services/email-marketing' },
    { name: 'CRO', slug: '/services/digital-360' },
  ],
  'ppc': [
    { name: 'Google Ads', slug: '/services/marketing/google-ads' },
    { name: 'Google Search Ads', slug: '/services/marketing/google-ads/google-search-ads' },
    { name: 'Google Shopping Ads', slug: '/services/marketing/google-ads/google-shopping-ads' },
    { name: 'Google Display Ads', slug: '/services/marketing/google-ads/google-display-ads' },
    { name: 'YouTube Ads', slug: '/services/marketing/google-ads/youtube-ads' },
    { name: 'PPC Management', slug: '/services/marketing/google-ads/ppc-management' },
    { name: 'Meta Ads', slug: '/services/marketing' },
    { name: 'Facebook Ads', slug: '/services/marketing' },
    { name: 'Microsoft Ads', slug: '/services/marketing' },
    { name: 'LinkedIn Ads', slug: '/services/marketing' },
    { name: 'TikTok Ads', slug: '/services/marketing' },
    { name: 'X (Twitter) Ads', slug: '/services/marketing' },
    { name: 'Conversion Tracking', slug: '/services/ppc/conversion-tracking' },
  ],
  'seo': [
    { name: 'Local SEO', slug: '/services/seo/local-seo' },
    { name: 'International SEO', slug: '/services/seo/international-seo' },
    { name: 'National SEO', slug: '/services/seo/national-seo' },
    { name: 'E-Commerce SEO', slug: '/services/seo/ecommerce-seo' },
    { name: 'Technical SEO', slug: '/services/seo/technical-seo' },
    { name: 'On-Page SEO', slug: '/services/seo/on-page-seo' },
    { name: 'Off-Page SEO', slug: '/services/seo/off-page-seo' },
    { name: 'SEO Audit (Free)', slug: '/services/seo/seo-audit' },
    { name: 'Content Marketing', slug: '/services/seo/content-marketing' },
    { name: 'Google Penalty Recovery', slug: '/services/seo/google-penalty-recovery' },
    { name: 'AI SEO', slug: '/services/seo/ai-seo' },
    { name: 'Link Building', slug: '/services/seo/link-building' },
    { name: 'Lead Generation SEO', slug: '/services/seo/lead-generation-seo' },
  ],
  'social-media': [
    { name: 'Social Media Management', slug: '/services/social-media/social-media-management' },
    { name: 'Social Media Marketing', slug: '/services/social-media/social-media-marketing' },
    { name: 'Social Media Strategy', slug: '/services/social-media/social-media-strategy' },
    { name: 'Social Media Content Creation', slug: '/services/social-media/social-media-content-creation' },
    { name: 'Community Management', slug: '/services/social-media/community-management' },
    { name: 'Social Media Audit', slug: '/services/social-media/social-media-audit' },
    { name: 'Influencer Marketing', slug: '/services/social-media/influencer-marketing' },
    { name: 'Social Media Consulting', slug: '/services/social-media/social-media-consulting' },
  ],
  'email-marketing': [
    { name: 'Email Automation', slug: '/services/email-marketing/email-automation' },
    { name: 'Email Campaign Management', slug: '/services/email-marketing/email-campaign-management' },
    { name: 'Email Marketing Strategy', slug: '/services/email-marketing/email-marketing-strategy' },
    { name: 'Email Design', slug: '/services/email-marketing/email-design' },
    { name: 'Email List Building', slug: '/services/email-marketing/email-list-building' },
    { name: 'Email Copywriting', slug: '/services/email-marketing/email-copywriting' },
    { name: 'Email Marketing Audit', slug: '/services/email-marketing/email-marketing-audit' },
  ],
  'ai-automation': [
    { name: 'AI Chatbot / AI Chatbot Development', slug: '/services/ai-automation/ai-chatbot-development' },
    { name: 'AI Voice Agent / AI Voice Agents', slug: '/services/ai-automation/ai-voice-agents' },
    { name: 'CRM Automation', slug: '/services/ai-automation/crm-automation' },
    { name: 'AI Integration', slug: '/services/ai-automation/ai-integration' },
    { name: 'AI Consulting', slug: '/services/ai-automation/ai-consulting-uk' },
    { name: 'AI Workflow Automation', slug: '/services/ai-automation/ai-workflow-automation' },
    { name: 'Marketing Automation', slug: '/services/ai-automation/marketing-automation' },
  ],
  'graphic-design': [
    { name: 'Graphic Design', slug: '/services/graphic-design' },
    { name: 'Logo Design / Logo Making', slug: '/services/graphic-design/logo-design' },
    { name: 'Brand Identity Design / Branding', slug: '/services/graphic-design/brand-identity-design' },
    { name: '3D Design & Automation', slug: '/services/graphic-design/3d-design-automation' },
    { name: 'Poster Design', slug: '/services/graphic-design/poster-design' },
    { name: 'Banner Design', slug: '/services/graphic-design/banner-design' },
    { name: 'Social Media Graphics', slug: '/services/graphic-design/social-media-graphics' },
  ],
}

const CATEGORY_IMAGE_MAP: Record<string, { img1: string; img2: string }> = {
  'web-development': {
    img1: '/images/services/web-app-design.png',
    img2: '/images/services/seo-brand-strategy.png',
  },
  'marketing': {
    img1: '/images/services/digital-marketing.png',
    img2: '/images/services/seo-brand-strategy.png',
  },
  'digital-marketing': {
    img1: '/images/services/digital-marketing.png',
    img2: '/images/services/seo-brand-strategy.png',
  },
  'ppc': {
    img1: '/images/services/digital-marketing.png',
    img2: '/images/services/seo-brand-strategy.png',
  },
  'seo': {
    img1: '/images/services/seo-brand-strategy.png',
    img2: '/images/services/digital-marketing.png',
  },
  'social-media': {
    img1: '/images/services/digital-marketing.png',
    img2: '/images/services/graphic-branding.jpg',
  },
  'email-marketing': {
    img1: '/images/services/email-marketing.jpg',
    img2: '/images/services/digital-marketing.png',
  },
  'ai-automation': {
    img1: '/images/services/ai-automation.jpg',
    img2: '/images/services/digital-marketing.png',
  },
  'graphic-design': {
    img1: '/images/services/graphic-branding.jpg',
    img2: '/images/services/web-app-design.png',
  },
}

function renderHeroHeading(text: string | undefined, serviceName: string) {
  if (!text) {
    return (
      <>
        A <span className={styles.tealAccent}>{serviceName}</span> Agency In UK.
      </>
    )
  }

  // Highlight serviceName if found in heading
  const namePattern = new RegExp(`(${serviceName})`, 'gi')
  if (namePattern.test(text)) {
    const parts = text.split(namePattern)
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === serviceName.toLowerCase() ? (
            <span key={i} className={styles.tealAccent}>{part}</span>
          ) : (
            part
          )
        )}
      </>
    )
  }

  // Generic keyphrase highlights
  const genericPattern = /(Digital Marketing|Web Design|Websites & Apps|Brand Identity|AI & Automation|B2B & Enterprise|B2C & Consumer|E-Commerce|SaaS)/gi
  if (genericPattern.test(text)) {
    const parts = text.split(genericPattern)
    return (
      <>
        {parts.map((part, i) =>
          genericPattern.test(part) ? (
            <span key={i} className={styles.tealAccent}>{part}</span>
          ) : (
            part
          )
        )}
      </>
    )
  }

  return text
}

function renderCapabilitiesHeading(text: string | undefined) {
  const content =
    text ||
    'Are You A Startup Brand, Well Established Company, In The UK Or Worldwide? It Doesn’t Matter. We Work With A Range Of Clients.'

  const pattern = /(Startup|Established Company|Range Of Clients)/gi
  const parts = content.split(pattern)
  return (
    <>
      {parts.map((part, i) =>
        /^(Startup|Established Company|Range Of Clients)$/i.test(part) ? (
          <span key={i} className={styles.tealAccent}>{part}</span>
        ) : (
          part
        )
      )}
    </>
  )
}

function renderVisionHeading(text: string | undefined) {
  const content =
    text ||
    "We Like To Remove The 'waffle' And Impactful Marketing, Easy To Use Strategy That Are Crucial."

  const pattern = /('?waffle'?|Marketing|Crucial)/gi
  const parts = content.split(pattern)
  return (
    <>
      {parts.map((part, i) =>
        /('?waffle'?|Marketing|Crucial)/i.test(part) ? (
          <span key={i} className={styles.tealAccent}>{part}</span>
        ) : (
          part
        )
      )}
    </>
  )
}

export default function MainServiceHub({ srv }: { srv: ServiceRecord }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: '-50px' })

  const capabilitiesList: ServiceCapability[] =
    srv.capabilities && srv.capabilities.length > 0
      ? srv.capabilities
      : CAPABILITIES_BY_CATEGORY[srv.slug] || DEFAULT_CAPABILITIES
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0)
  const activeCapability = capabilitiesList[activeCapabilityIndex] || capabilitiesList[0]

  const categoryImgs = CATEGORY_IMAGE_MAP[srv.slug] || {
    img1: '/images/services/digital-marketing.png',
    img2: '/images/services/seo-brand-strategy.png',
  }

  // Parse hero description into clean paragraphs
  const heroParagraphs = (srv.heroDescription || '')
    .split(/\n\s*\n/)
    .filter(Boolean)

  const bannerImg = srv.heroBannerImage || srv.featuredImage || DEFAULT_BANNER
  const bannerAlt = srv.heroBannerImageAlt || `${srv.name} Showcase Banner`
  const visionImg = srv.visionImage || DEFAULT_VISION_IMAGE
  const visionAlt = srv.visionImageAlt || `${srv.name} Strategy Vision`

  return (
    <main className={styles.page}>
      <StructuredData
        type="Service"
        data={{
          name: srv.name,
          serviceType: srv.eyebrow || srv.name,
          description: srv.heroDescription || srv.name,
          provider: {
            '@type': 'Organization',
            name: 'KR Tasker Digital',
          },
        }}
      />

      {/* 0. Mounted Navbar */}
      <Navbar />

      {/* 1. Hero Section (Figma Split Header) */}
      <section ref={heroRef} className={styles.heroSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.heroTag}>
              {srv.capabilitiesEyebrow || srv.eyebrow || srv.name}
            </span>

            <div className={styles.heroGrid}>
              {/* Left: Main Heading */}
              <div className={styles.heroLeft}>
                <AnimatedHeading as="h1" className={styles.heroTitle}>
                  {renderHeroHeading(srv.heroHeading, srv.name)}
                </AnimatedHeading>
              </div>

              {/* Right: Multi-paragraph overview */}
              <div className={styles.heroRight}>
                {heroParagraphs.length > 0 ? (
                  heroParagraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0 ? styles.heroParagraph : styles.heroParagraph
                      }
                    >
                      <ScrollFillText text={para} />
                    </p>
                  ))
                ) : (
                  <>
                    <p className={styles.heroParagraph}>
                      <ScrollFillText text="Here At KR Tasker Digital, We Offer Honest Advice, Industry Experience, And A Great Portfolio Of Work." />
                    </p>
                    <p className={styles.heroParagraph}>
                      <ScrollFillText text="UI/UX, Wireframes, Research And Development — We Understand All Areas Of Web Design. We Can Take A Start-Up Business With Nothing To A Fully Functioning Brand Online And Offline. We Can Revamp An Existing Website Or Take A Successful Brand To The Next Level. Our Talented And Creative In-House Web Design Team In Manchester Will Work Alongside You In Collaboration To Create A Site That Reflects Your Brand, Talks To Your Audience With Meaning And Personality, And Has Great Functionality Across The Latest Devices." />
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Figma Action Button placed directly above the showcase banner */}
            <div className={styles.heroActionRow}>
              <Link
                href={srv.heroCtaLink || '/contact'}
                className={styles.heroBtnPrimary}
              >
                {srv.heroCtaText || 'Start A Project'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Hero Showcase Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={styles.bannerCard}
          >
            <Image
              src={bannerImg}
              alt={bannerAlt}
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className={styles.bannerImage}
            />
          </motion.div>
        </div>
      </section>

      {/* 3. Are You A Startup Brand + Our Company Capabilities Section */}
      <section className={styles.capabilitiesSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.capabilitiesIntro}
          >
            <AnimatedHeading as="h2" className={styles.capabilitiesHeading}>
              <span className={styles.sectionTag}>
                {srv.capabilitiesEyebrow || srv.eyebrow || srv.name}
              </span>{' '}
              {renderCapabilitiesHeading(srv.capabilitiesHeading)}
            </AnimatedHeading>
          </motion.div>

          <div className={styles.capabilitiesGrid}>
            <div className={styles.capabilitiesLeft}>
              <AnimatedHeading as="h3" className={styles.capabilitiesTitle}>
                Our <span className={styles.tealAccent}>{srv.name}</span> Services
              </AnimatedHeading>
              <div
                className={styles.capabilitiesList}
                role="tablist"
                aria-label={`${srv.name} capabilities`}
              >
                {capabilitiesList.map((cap, idx) => (
                  <button
                    key={`${cap.name}-${idx}`}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeCapabilityIndex}
                    onClick={() => setActiveCapabilityIndex(idx)}
                    className={`${styles.capabilityItem} ${
                      idx === activeCapabilityIndex
                        ? styles.capabilityItemActive
                        : ''
                    }`}
                  >
                    <span>{cap.name}</span>
                    <span
                      className={
                        idx === activeCapabilityIndex
                          ? styles.capabilityCircleFeatured
                          : styles.capabilityCircle
                      }
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              key={activeCapabilityIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.capabilitiesRight}
            >
              <div className={styles.capabilityImages}>
                <div className={styles.capabilityImage}>
                  <Image
                    src={categoryImgs.img1}
                    alt={`${srv.name} strategy showcase`}
                    fill
                    sizes="(max-width: 768px) 50vw, 320px"
                  />
                </div>
                <div className={styles.capabilityImage}>
                  <Image
                    src={categoryImgs.img2}
                    alt={`${srv.name} digital technology`}
                    fill
                    sizes="(max-width: 768px) 50vw, 320px"
                  />
                </div>
              </div>
              <div className={styles.capabilityDetail}>
                <h4>
                  <span aria-hidden="true">•</span> {activeCapability.name}
                </h4>
                <p>
                  {activeCapability.description ||
                    `A leading full-service ${activeCapability.name} solution built to outthink, outcreate and outperform—combining strategy, creative execution and measurable growth.`}
                </p>
                <Link
                  href={
                    activeCapability.slug.startsWith('/')
                      ? activeCapability.slug
                      : `/services/${activeCapability.slug}`
                  }
                  className={styles.capabilityExplore}
                >
                  Explore More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Marquee Section */}
      <WorkTogetherMarquee />

      {/* 5. Vision / Remove The Waffle Split Section */}
      <section className={styles.visionSection}>
        <div className={styles.container}>
          <div className={styles.visionGrid}>
            {/* Left: Heading + Description + Start CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={styles.visionLeft}
            >
              <span className={styles.sectionTag}>
                {srv.visionEyebrow || 'We Approach Every Project With A Clear Vision.'}
              </span>
              <AnimatedHeading as="h2" className={styles.visionHeading}>
                {renderVisionHeading(srv.visionHeading)}
              </AnimatedHeading>
              <p className={styles.visionDesc}>
                <ScrollFillText
                  text={
                    srv.visionDescription ||
                    "We Don't Just Build Pretty Websites. Here At KR Tasker Digital, We Understand All Aspects Of A Successful Site, From Design Through Web Development And Testing, To SEO And Hosting. We Tailor Our Service To The Client And The Project Requirements."
                  }
                />
              </p>
              <Button href={srv.visionCtaLink || '/contact'}>
                {srv.visionCtaText || 'Start A Project Today'}
              </Button>
            </motion.div>

            {/* Right: Mockup / Image Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={styles.visionRight}
            >
              <div className={styles.visionCard}>
                <Image
                  src={visionImg}
                  alt={visionAlt}
                  fill
                  sizes="(max-width: 992px) 100vw, 540px"
                  className={styles.visionImage}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Mounted Standard Modular Components */}
      <HappyClients />
      <ProcessSection />
      <Testimonials />
      <FaqSection />

      <div id="contact-form">
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
