'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import styles from './TermsPage.module.css'

const sections = [
  { id: 'introduction', label: '1. Introduction & Acceptance' },
  { id: 'services', label: '2. Scope of Services' },
  { id: 'obligations', label: '3. Client Obligations' },
  { id: 'ip', label: '4. Intellectual Property' },
  { id: 'payments', label: '5. Fees & Payments' },
  { id: 'liability', label: '6. Limitation of Liability' },
  { id: 'termination', label: '7. Term & Termination' },
  { id: 'governing-law', label: '8. Governing Law' }
]

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('introduction')

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
          <AnimatedHeading as="h1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroTitle}
          >
            Terms & Conditions
          </AnimatedHeading>
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
            <AnimatedHeading as="h3" className={styles.sidebarTitle}>Table of Contents</AnimatedHeading>
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
            <div id="introduction" className={styles.section}>
              <AnimatedHeading as="h2" className={styles.sectionHeading}>1. Introduction & Acceptance</AnimatedHeading>
              <p className={styles.paragraph}>
                Welcome to KR Tasker Digital. These Terms & Conditions govern your access to and use of the services provided by <span className={styles.highlightText}>KR Tasker Digital Ltd</span> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), including our website and any other digital marketing, web design, SEO, social media, or AI services we perform.
              </p>
              <p className={styles.paragraph}>
                By contracting our services, executing an agreement with us, or using our website, you agree to be bound by these Terms. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms. If you do not agree to these Terms, you must not access or use our services.
              </p>
            </div>

            <div id="services" className={styles.section}>
              <AnimatedHeading as="h2" className={styles.sectionHeading}>2. Scope of Services</AnimatedHeading>
              <p className={styles.paragraph}>
                KR Tasker Digital provides a wide range of performance-driven digital growth services including, but not limited to:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>Web Design & Development (Websites and Apps)</li>
                <li className={styles.listItem}>Digital Marketing & Brand Strategy</li>
                <li className={styles.listItem}>Search Engine Optimization (SEO) & Conversion Rate Optimization (CRO)</li>
                <li className={styles.listItem}>Pay-Per-Click Advertising (PPC) and Social Media Marketing</li>
                <li className={styles.listItem}>AI Solutions & Digital Consultation</li>
              </ul>
              <p className={styles.paragraph}>
                Each project&apos;s specific deliverables, timelines, milestones, and fees will be detailed in a separate Statement of Work (SOW) or Service Level Agreement (SLA) mutually agreed upon and signed by both parties.
              </p>
            </div>

            <div id="obligations" className={styles.section}>
              <AnimatedHeading as="h2" className={styles.sectionHeading}>3. Client Obligations</AnimatedHeading>
              <p className={styles.paragraph}>
                To ensure successful delivery of our services, you agree to:
              </p>
              <ol className={styles.list}>
                <li className={styles.listItem}>Provide timely access to necessary assets, logins, branding materials, content, and approvals required for project completion.</li>
                <li className={styles.listItem}>Designate a primary contact authorized to make binding decisions on behalf of your business.</li>
                <li className={styles.listItem}>Ensure that any materials or content provided to us do not infringe upon any third-party intellectual property or privacy rights.</li>
                <li className={styles.listItem}>Review deliverables in a timely manner within the agreed review windows specified in the SOW.</li>
              </ol>
            </div>

            <div id="ip" className={styles.section}>
              <AnimatedHeading as="h2" className={styles.sectionHeading}>4. Intellectual Property</AnimatedHeading>
              <p className={styles.paragraph}>
                Unless explicitly stated otherwise in a signed Statement of Work:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Deliverables:</span> Upon receipt of full and final payment, you will own all rights, title, and interest in the custom final deliverables created specifically for your project (e.g., custom website designs, logos, authored copy).
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Pre-Existing IP & Tools:</span> KR Tasker Digital retains all ownership rights to proprietary code, boilerplates, internal design systems, workflow tools, and general knowledge developed prior to or independently of your project.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Portfolio Rights:</span> We reserve the right to display the completed work in our professional portfolio, case studies, and marketing collateral unless subject to a strict Non-Disclosure Agreement (NDA).
                </li>
              </ul>
            </div>

            <div id="payments" className={styles.section}>
              <AnimatedHeading as="h2" className={styles.sectionHeading}>5. Payment Terms & Invoicing</AnimatedHeading>
              <p className={styles.paragraph}>
                Payment terms are established in each specific client agreement:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>Invoices are typically issued on milestone completion or monthly retainers, payable within 14 calendar days of the invoice date unless agreed otherwise.</li>
                <li className={styles.listItem}>We accept payments via bank transfer (BACS) and authorized online merchant gateways.</li>
                <li className={styles.listItem}>We reserve the right to pause ongoing work or withhold final deliverables if undisputed invoices remain overdue beyond 30 days.</li>
              </ul>
            </div>

            <div id="liability" className={styles.section}>
              <AnimatedHeading as="h2" className={styles.sectionHeading}>6. Limitation of Liability</AnimatedHeading>
              <p className={styles.paragraph}>
                To the maximum extent permitted by applicable law, KR Tasker Digital shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or business opportunities arising out of or related to our services.
              </p>
              <p className={styles.paragraph}>
                Our total cumulative liability arising out of or relating to any agreement shall in no event exceed the total amount actually paid by you to KR Tasker Digital under the applicable Statement of Work during the six (6) months immediately preceding the event giving rise to liability.
              </p>
            </div>

            <div id="termination" className={styles.section}>
              <AnimatedHeading as="h2" className={styles.sectionHeading}>7. Term & Termination</AnimatedHeading>
              <p className={styles.paragraph}>
                Either party may terminate the service agreement under the following conditions:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>By giving written notice as specified in your SOW (typically 30 days&apos; written notice for ongoing retainers).</li>
                <li className={styles.listItem}>Immediately upon written notice if the other party breaches a material provision of these Terms and fails to cure such breach within 14 days of receiving notice of the breach.</li>
                <li className={styles.listItem}>Immediately if either party becomes insolvent, undergoes liquidation, or files for bankruptcy.</li>
              </ul>
              <p className={styles.paragraph}>
                Upon termination, you will remain liable to pay all fees for services rendered and expenses incurred up to the date of termination.
              </p>
            </div>

            <div id="governing-law" className={styles.section}>
              <AnimatedHeading as="h2" className={styles.sectionHeading}>8. Governing Law</AnimatedHeading>
              <p className={styles.paragraph}>
                These Terms & Conditions, and any dispute or claim arising out of or in connection with them or their subject matter, shall be governed by and construed in accordance with the laws of <span className={styles.highlightText}>England & Wales</span>. 
              </p>
              <p className={styles.paragraph}>
                Each party irrevocably agrees that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms or the services we perform.
              </p>
            </div>
          </article>
        </div>
      </div>

      <Contact />
      <Footer />
    </main>
  )
}
