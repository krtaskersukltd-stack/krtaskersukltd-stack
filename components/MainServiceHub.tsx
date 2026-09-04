'use client'

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

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop'
const DEFAULT_VISION_IMAGE = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop'

const DEFAULT_CAPABILITIES: ServiceCapability[] = [
  { name: 'Digital 360', slug: '/services/digital-360' },
  { name: 'SEO', slug: '/services/seo' },
  { name: 'PPC', slug: '/services/ppc' },
  { name: 'Social Media Marketing', slug: '/services/social-media' },
  { name: 'Google Ads', slug: '/services/ppc' },
  { name: 'Email Marketing', slug: '/services/email-marketing' },
  { name: 'CRO', slug: '/services/digital-360' },
]

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
              {/* Left: Main Heading + CTA */}
              <div className={styles.heroLeft}>
                <h1 className={styles.heroTitle}>
                  {srv.heroHeading || `A ${srv.name} Agency In UK.`}
                </h1>
                <Link
                  href={srv.heroCtaLink || '/contact'}
                  className={styles.heroBtnPrimary}
                >
                  {srv.heroCtaText || 'Start a project'}
                </Link>
              </div>

              {/* Right: Multi-paragraph overview */}
              <div className={styles.heroRight}>
                {heroParagraphs.length > 0 ? (
                  heroParagraphs.map((para, idx) => (
                    <p key={idx} className={styles.heroParagraph}>
                      {para}
                    </p>
                  ))
                ) : (
                  <>
                    <p className={styles.heroParagraph}>
                      Here at KR Tasker Digital, we offer honest advice, industry experience, and a great portfolio of work.
                    </p>
                    <p className={styles.heroParagraph}>
                      UI/UX, wireframes, research and development — we understand all areas of digital growth. We can take a start-up business with nothing to a fully functioning brand online and offline. We can revamp an existing website or take a successful brand to the next level. Our talented and creative in-house web design and marketing team in the UK will work alongside you in collaboration to create digital experiences that reflect your brand, talk to your audience with meaning and personality, and drive sustainable growth across every channel.
                    </p>
                  </>
                )}
              </div>
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
              <h2 className={styles.capabilitiesHeading}>
                {srv.capabilitiesHeading ||
                  'Are You A Startup Brand, Well Established Company, In The UK Or Worldwide? It Doesn’t Matter. We Work With A Range Of Clients.'}
              </h2>
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
              <h3 className={styles.capabilitiesTitle}>
                {srv.capabilitiesTitle || 'Our Company Capabilities'}
              </h3>
              <nav className={styles.capabilitiesList} aria-label={`${srv.name} capabilities`}>
                {capabilitiesList.map((cap, idx) => {
                  const targetSlug = cap.slug.startsWith('/')
                    ? cap.slug
                    : `/services/${cap.slug}`
                  return (
                    <Link
                      key={idx}
                      href={targetSlug}
                      className={styles.capabilityItem}
                    >
                      <span className={styles.capabilityName}>{cap.name}</span>
                      <span className={styles.capabilityArrow} aria-hidden="true">
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

    <WorkTogetherMarquee/>

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
                {srv.visionEyebrow || 'We approach every project with a clear vision.'}
              </span>
              <h2 className={styles.visionHeading}>
                {srv.visionHeading ||
                  "We Like To Remove The 'waffle' And Impactful Marketing, Easy To Use Strategy That Are Crucial."}
              </h2>
              <p className={styles.visionDesc}>
                {srv.visionDescription ||
                  "We don't just build pretty websites. Here at KR Tasker Digital, we understand all aspects of a successful site, from design through web development and testing, to SEO and Hosting. We tailor our service to the client and the project requirements."}
              </p>
              <Link
                href={srv.visionCtaLink || '/contact'}
                className={styles.btnVision}
              >
                {srv.visionCtaText || 'Start a project Today'}
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
