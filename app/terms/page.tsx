'use client'

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
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroTitle}
          >
            Terms & Conditions
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
            <section id="introduction" className={styles.section}>
              <h2 className={styles.sectionHeading}>1. Introduction & Acceptance</h2>
              <p className={styles.paragraph}>
                Welcome to KR Tasker Digital. These Terms & Conditions govern your access to and use of the services provided by <span className={styles.highlightText}>KR Tasker Digital Ltd</span> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), including our website and any other digital marketing, web design, SEO, social media, or AI services we perform.
              </p>
              <p className={styles.paragraph}>
                By contracting our services, executing an agreement with us, or using our website, you agree to be bound by these Terms. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms. If you do not agree to these Terms, you must not access or use our services.
              </p>
            </section>

            <section id="services" className={styles.section}>
              <h2 className={styles.sectionHeading}>2. Scope of Services</h2>
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
            </section>

            <section id="obligations" className={styles.section}>
              <h2 className={styles.sectionHeading}>3. Client Obligations</h2>
              <p className={styles.paragraph}>
                To ensure successful delivery of our services, you agree to:
              </p>
              <ol className={styles.list}>
                <li className={styles.listItem}>Provide timely access to all necessary business information, brand guidelines, credentials, copy, media assets, and materials required for us to perform the services.</li>
                <li className={styles.listItem}>Designate a primary point of contact authorized to make decisions, approve deliverables, and facilitate communications in a timely manner.</li>
                <li className={styles.listItem}>Ensure that all materials provided to us do not infringe upon the intellectual property rights of any third party.</li>
              </ol>
              <p className={styles.paragraph}>
                We are not responsible for delays, defects, or project stalls resulting from a client&apos;s failure to provide required information, assets, or feedback in a timely manner.
              </p>
            </section>

            <section id="ip" className={styles.section}>
              <h2 className={styles.sectionHeading}>4. Intellectual Property Rights</h2>
              <p className={styles.paragraph}>
                Unless otherwise specified in a signed SOW:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Deliverables:</span> Upon final payment of all outstanding invoices, you shall own all right, title, and interest in the custom deliverables created specifically for you (e.g., custom website layouts, graphics, branding guides).
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Retained Rights:</span> We retain all rights, titles, and interests in our pre-existing code libraries, developer tools, algorithms, proprietary templates, and methodologies used during the development of your deliverables.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Portfolio Rights:</span> We reserve the right to display, describe, or reference your project (including links, screenshots, and logos) in our portfolio, marketing materials, and case studies, unless explicitly prohibited in writing.
                </li>
              </ul>
            </section>

            <section id="payments" className={styles.section}>
              <h2 className={styles.sectionHeading}>5. Fees & Payments</h2>
              <p className={styles.paragraph}>
                In consideration of the services, you agree to pay the fees specified in the SOW or invoice. 
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>Invoices are issued according to the payment schedule outlined in the SOW (e.g., upfront deposit, milestone completions, or monthly retainer).</li>
                <li className={styles.listItem}>All invoices are payable within 14 days of the invoice date unless otherwise specified in writing.</li>
                <li className={styles.listItem}>We reserve the right to suspend all services, hosting, or campaign management if any invoice remains unpaid after the due date.</li>
                <li className={styles.listItem}>Unless otherwise stated, all fees are exclusive of applicable taxes (e.g., VAT).</li>
              </ul>
            </section>

            <section id="liability" className={styles.section}>
              <h2 className={styles.sectionHeading}>6. Limitation of Liability</h2>
              <p className={styles.paragraph}>
                To the maximum extent permitted by applicable law:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>KR Tasker Digital will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business opportunities, whether incurred directly or indirectly.</li>
                <li className={styles.listItem}>Our maximum aggregate liability for any claim arising out of or relating to these Terms or our services, whether in contract, tort, or otherwise, shall not exceed the total fees paid by you to us during the three (3) months preceding the event giving rise to the claim.</li>
              </ul>
            </section>

            <section id="termination" className={styles.section}>
              <h2 className={styles.sectionHeading}>7. Term & Termination</h2>
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
            </section>

            <section id="governing-law" className={styles.section}>
              <h2 className={styles.sectionHeading}>8. Governing Law</h2>
              <p className={styles.paragraph}>
                These Terms & Conditions, and any dispute or claim arising out of or in connection with them or their subject matter, shall be governed by and construed in accordance with the laws of <span className={styles.highlightText}>England & Wales</span>. 
              </p>
              <p className={styles.paragraph}>
                Each party irrevocably agrees that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms or the services we perform.
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
