'use client'

import Navbar from '@/components/Navbar'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Link from 'next/link'
import WorkTogetherMarquee from '@/components/WorkTogetherMarquee'
import HappyClients from '@/components/HappyClients'
import ProcessSection from '@/components/ProcessSection'
import FaqSection from '@/components/FaqSection'
import styles from './ServicesPage.module.css'

const capabilities = [
  { label: 'Digital 360', href: '/services/digital-360', featured: true },
  { label: 'SEO', href: '/services/seo' },
  { label: 'PPC', href: '/services/ppc' },
  { label: 'Social Media Marketing', href: '/services/social-media' },
  { label: 'Google Ads', href: '/services/marketing' },
  { label: 'Email Marketing', href: '/services/email-marketing' },
  { label: 'CRO', href: '/services/digital-marketing' },
]

export default function ServicesPage() {
  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className={styles.page}>
      <Navbar />

      <section className={styles.hero} aria-labelledby="services-heading">
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.headingBlock}>
              <p className={styles.eyebrow}>Digital Marketing</p>

              <h1 id="services-heading" className={styles.title}>
                A <span>Digital Marketing</span> Agency
                <br className={styles.desktopBreak} /> In UK.
              </h1>
            </div>

            <div className={styles.copy}>
              <p>
                Here at KR Tasker Digital, we offer honest advice, industry
                experience, and a great portfolio of work.
              </p>

              <p>
                UI/UX, wireframes, research and development, we understand all
                areas of web design. We can take a start-up business with
                nothing to a fully functioning brand online and offline. We can
                revamp an existing website to take a successful brand to the
                next level. Our talented and creative in-house web design team
                will work alongside you to create a site that reflects your
                brand, communicates with your audience, and performs across the
                latest devices.
              </p>
            </div>
          </div>

          <div className={styles.showcase}>
            {/* Exact responsive clip-path recreated from Group 35.svg */}
            <svg
              className={styles.clipDefinition}
              width="0"
              height="0"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <clipPath
                  id="services-showcase-clip"
                  clipPathUnits="objectBoundingBox"
                >
                  <path d="M .994444 0 C .997514 0 1 .006901 1 .015414 V .984586 C 1 .993098 .997514 1 .994444 1 H .005556 C .002487 1 0 .993098 0 .984586 V .121387 C 0 .110746 .003109 .102119 .006944 .102119 H .104861 C .108697 .102119 .111806 .093493 .111806 .082852 V .019268 C .111806 .008626 .114915 0 .11875 0 H .994444 Z" />
                </clipPath>
              </defs>
            </svg>

            <button
              type="button"
              className={styles.projectButton}
              onClick={scrollToContact}
            >
              Start A Project
            </button>

            <div className={styles.mediaPlaceholder}>
              <span>KR Tasker Digital</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.audienceSection}
        aria-labelledby="audience-heading"
      >
        <div className={styles.audienceContainer}>
          <div className={styles.audienceTop}>
            <p className={styles.audienceEyebrow}>Digital Marketing</p>

            <h2 id="audience-heading" className={styles.audienceTitle}>
              Are You A <span>Startup</span> Brand, Well{' '}
              <span>Established Company</span>, In The UK Or Worldwide? It
              Doesn&apos;t Matter. We Work With A <span>Range Of Clients</span>.
            </h2>

            <aside
              className={styles.capabilities}
              aria-label="Our company capabilities"
            >
              <h3>Our Company Capabilities</h3>

              <nav>
                {capabilities.map((capability) => (
                  <Link
                    key={capability.label}
                    href={capability.href}
                    className={
                      capability.featured
                        ? styles.featuredCapability
                        : undefined
                    }
                  >
                    <span>{capability.label}</span>
                    <span
                      className={styles.capabilityArrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </nav>
            </aside>
          </div>

          <Link href="/about" className={styles.aboutButton}>
            About KR Tasker
          </Link>
        </div>
      </section>

      <WorkTogetherMarquee />

      <section
        className={styles.visionSection}
        aria-labelledby="vision-heading"
      >
        <div className={styles.visionContainer}>
          <div className={styles.visionContent}>
            <p className={styles.visionEyebrow}>
              We Approach Every Project With A Clear Vision.
            </p>

            <h2 id="vision-heading" className={styles.visionTitle}>
              We Like To Remove The &apos;<span>waffle</span>&apos; And Create
              Impactful <span>Marketing</span>, With Easy To Use Strategies That
              Are <span>Crucial</span>.
            </h2>

            <p className={styles.visionCopy}>
              We Don&apos;t Just Build Pretty Websites. Here At KR Tasker
              Digital, We Understand All Aspects Of A Successful Site, From
              Design Through Web Development And Testing, To SEO And Hosting. We
              Tailor Our Service To The Client And The Project Requirements.
            </p>

            <button
              type="button"
              className={styles.visionButton}
              onClick={scrollToContact}
            >
              Start A Project Today
            </button>
          </div>

          <div className={styles.visionMedia} aria-hidden="true">
            <span>KR Tasker strategy and marketing</span>
          </div>
        </div>
      </section>

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