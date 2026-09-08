'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import { useRef } from 'react'
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

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop'
const DEFAULT_VISION_IMAGE = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop'

const DEFAULT_CAPABILITIES: ServiceCapability[] = [
  { name: 'Digital 360', slug: '/services/digital-360', badge: 'POPULAR' },
  { name: 'SEO', slug: '/services/seo' },
  { name: 'PPC', slug: '/services/ppc' },
  { name: 'Social Media Marketing', slug: '/services/social-media' },
  { name: 'Google Ads', slug: '/services/ppc' },
  { name: 'Email Marketing', slug: '/services/email-marketing' },
  { name: 'CRO', slug: '/services/digital-360' },
]

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
      : DEFAULT_CAPABILITIES

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
          <div className={styles.capabilitiesGrid}>
            {/* Left: Heading + About CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={styles.capabilitiesLeft}
            >
              <span className={styles.sectionTag}>
                {srv.capabilitiesEyebrow || srv.eyebrow || srv.name}
              </span>
              <AnimatedHeading as="h2" className={styles.capabilitiesHeading}>
                {renderCapabilitiesHeading(srv.capabilitiesHeading)}
              </AnimatedHeading>
              <Link
                href={srv.capabilitiesCtaLink || '/about'}
                className={styles.btnSecondary}
              >
                {srv.capabilitiesCtaText || 'About KR Tasker'}
              </Link>
            </motion.div>

            {/* Right: Capabilities Sub-Pages List */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={styles.capabilitiesRight}
            >
              <AnimatedHeading as="h3" className={styles.capabilitiesTitle}>
                {srv.capabilitiesTitle || 'Our Company Capabilities'}
              </AnimatedHeading>
              <nav className={styles.capabilitiesList} aria-label={`${srv.name} capabilities`}>
                {capabilitiesList.map((cap, idx) => {
                  const targetSlug = cap.slug.startsWith('/')
                    ? cap.slug
                    : `/services/${cap.slug}`
                  const isFeatured = idx === 0 || cap.badge === 'POPULAR'
                  return (
                    <Link
                      key={idx}
                      href={targetSlug}
                      className={styles.capabilityItem}
                    >
                      <span className={isFeatured ? styles.capabilityNameFeatured : styles.capabilityName}>
                        {cap.name}
                      </span>
                      <span
                        className={isFeatured ? styles.capabilityCircleFeatured : styles.capabilityCircle}
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </Link>
                  )
                })}
              </nav>
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
              <Link
                href={srv.visionCtaLink || '/contact'}
                className={styles.btnVision}
              >
                {srv.visionCtaText || 'Start A Project Today'}
              </Link>
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
