'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import styles from './PrivacyPage.module.css'

const sections = [
  { id: 'info-collect', label: '1. Information We Collect' },
  { id: 'how-use', label: '2. How We Use Information' },
  { id: 'legal-basis', label: '3. Legal Basis for Processing' },
  { id: 'sharing', label: '4. Sharing & Disclosure' },
  { id: 'security', label: '5. Data Security & Retention' },
  { id: 'rights', label: '6. Your GDPR Rights' },
  { id: 'changes', label: '7. Policy Changes' }
]

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('info-collect')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160 // offset for fixed header
      
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run once initially
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.offsetTop - 110 // nav offset
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
      setActiveSection(id)
    }
  }

  return (
    <main className={styles.page}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroTitle}
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={styles.metaInfo}
          >
            Last Updated: June 25, 2026 • KR Tasker Digital Ltd
          </motion.p>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className={styles.container}>
        <div className={styles.contentLayout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Table of Contents</h3>
            <ul className={styles.tocList}>
              {sections.map((sec) => (
                <li key={sec.id}>
                  <button 
                    onClick={() => scrollToSection(sec.id)}
                    className={`${styles.tocLink} ${activeSection === sec.id ? styles.tocActive : ''}`}
                  >
                    {sec.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Detailed Policy Text */}
          <article className={styles.content}>
            <section id="info-collect" className={styles.section}>
              <h2 className={styles.sectionHeading}>1. Information We Collect</h2>
              <p className={styles.paragraph}>
                At KR Tasker Digital, we value your privacy and are committed to safeguarding your personal data. We collect information in two main ways when you interact with our website or hire us for digital services:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Information You Provide Directly:</span> This includes your name, business name, email address, phone number, and details of your project when you fill out our contact forms, request audits, subscribe to our newsletters, or correspond with us.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Automatically Collected Information:</span> When you browse our site, we automatically log usage details. This includes your IP address, browser type, device information, operating system, pages viewed, time spent, and referral sources, collected via cookies and tracking tools like Google Analytics.
                </li>
              </ul>
            </section>

            <section id="how-use" className={styles.section}>
              <h2 className={styles.sectionHeading}>2. How We Use Information</h2>
              <p className={styles.paragraph}>
                We process your personal information to achieve business and operational objectives, including:
              </p>
              <ol className={styles.list}>
                <li className={styles.listItem}>Providing, operating, and maintaining our websites, client portals, and digital services.</li>
                <li className={styles.listItem}>Communicating with you regarding project updates, invoices, administrative changes, or support requests.</li>
                <li className={styles.listItem}>Sending newsletter updates, marketing communications, and promotional insights (only where you have opted-in or where legally permitted). You can opt out at any time.</li>
                <li className={styles.listItem}>Analyzing website traffic, patterns, and usage to optimize user experience, speed, and overall site performance.</li>
                <li className={styles.listItem}>Complying with statutory and legal obligations, preventing fraud, and resolving potential disputes.</li>
              </ol>
            </section>

            <section id="legal-basis" className={styles.section}>
              <h2 className={styles.sectionHeading}>3. Legal Basis for Processing</h2>
              <p className={styles.paragraph}>
                Under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, we only process your personal data under valid legal bases:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Consent:</span> When you have given clear, explicit consent (e.g., signing up for marketing letters). You can withdraw this consent at any time.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Performance of a Contract:</span> Where processing is necessary to perform our contractual obligations under a signed project agreement or SOW.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Legitimate Interests:</span> To run, secure, and improve our business operations (e.g., website security, analytics, and business-to-business communications) that do not override your privacy rights.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Legal Obligation:</span> To comply with tax, corporate, or financial regulations in the UK.
                </li>
              </ul>
            </section>

            <section id="sharing" className={styles.section}>
              <h2 className={styles.sectionHeading}>4. Sharing & Disclosure</h2>
              <p className={styles.paragraph}>
                We do not sell, rent, or lease your personal information to third parties. We may share your information in the following limited situations:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Service Providers:</span> We work with trusted third-party services (e.g., email service providers, hosting providers, accounting systems) to operate our business. These companies only process data under our instructions and are contractually bound to safeguard it.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Legal Compliance:</span> If required by law, court order, or governmental authorities to protect our legal rights, investigate fraud, or secure the safety of our systems and users.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Business Transfers:</span> In the event of a merger, acquisition, restructuring, or asset sale, your information may be transferred to the successor entity.
                </li>
              </ul>
            </section>

            <section id="security" className={styles.section}>
              <h2 className={styles.sectionHeading}>5. Data Security & Retention</h2>
              <p className={styles.paragraph}>
                We take industry-standard technical and organizational security measures to protect your personal data from unauthorized access, alteration, loss, disclosure, or destruction.
              </p>
              <p className={styles.paragraph}>
                We retain your personal data only for as long as is necessary to fulfill the purposes for which it was collected, including satisfying any accounting, legal, or reporting requirements. When data is no longer needed, we securely delete or anonymize it.
              </p>
            </section>

            <section id="rights" className={styles.section}>
              <h2 className={styles.sectionHeading}>6. Your GDPR Rights</h2>
              <p className={styles.paragraph}>
                If you are located in the UK or the European Economic Area (EEA), you possess key privacy rights under the GDPR:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Right of Access:</span> You can request copies of the personal data we hold about you.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Right to Rectification:</span> You can ask us to correct inaccurate or incomplete data.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</span> You can request that we delete your data under certain conditions.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Right to Restrict or Object:</span> You can object to us processing your data for direct marketing or request restrictions on how we process it.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Right to Portability:</span> You can request a copy of your data in a structured, machine-readable format.
                </li>
              </ul>
              <p className={styles.paragraph}>
                To exercise any of these rights, please contact us at <a href="mailto:info@krtaskerdigital.com" className={styles.highlightText} style={{ textDecoration: 'underline' }}>info@krtaskerdigital.com</a>. We will respond to your request within 30 days. You also have the right to lodge a complaint with the UK Information Commissioner&apos;s Office (ICO).
              </p>
            </section>

            <section id="changes" className={styles.section}>
              <h2 className={styles.sectionHeading}>7. Policy Changes</h2>
              <p className={styles.paragraph}>
                We may update this Privacy Policy from time to time to reflect operational, technological, or regulatory changes. Any modifications will be posted directly on this page, with the updated date clearly indicated at the top. We encourage you to review this page periodically to stay informed about how we protect your information.
              </p>
            </section>
          </article>
        </div>
      </div>

      <Contact />
      <Footer />
    </main>
  )
}
