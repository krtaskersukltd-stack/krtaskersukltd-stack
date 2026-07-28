'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import styles from './CookiesPage.module.css'

const sections = [
  { id: 'what-are-cookies', label: '1. What Are Cookies' },
  { id: 'how-use-cookies', label: '2. How We Use Cookies' },
  { id: 'types-cookies', label: '3. Types of Cookies We Use' },
  { id: 'third-party-cookies', label: '4. Third-Party Cookies' },
  { id: 'managing-cookies', label: '5. Managing Cookies' },
  { id: 'updates-policy', label: '6. Updates & Inquiries' }
]

export default function CookiesPolicyPage() {
  const [activeSection, setActiveSection] = useState('what-are-cookies')

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
            Cookies Policy
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
            <section id="what-are-cookies" className={styles.section}>
              <h2 className={styles.sectionHeading}>1. What Are Cookies</h2>
              <p className={styles.paragraph}>
                Cookies are small text files that are stored on your computer, mobile device, or tablet when you visit a website. They are widely used by website owners to make websites work more efficiently, improve user experience, and provide analytical reporting information.
              </p>
              <p className={styles.paragraph}>
                Cookies can be &ldquo;persistent&rdquo; or &ldquo;session&rdquo; cookies. A persistent cookie remains on your device for a set period or until you delete it, allowing the website to recognize your browser on subsequent visits. Session cookies are temporary and are automatically deleted when you close your web browser.
              </p>
            </section>

            <section id="how-use-cookies" className={styles.section}>
              <h2 className={styles.sectionHeading}>2. How We Use Cookies</h2>
              <p className={styles.paragraph}>
                At KR Tasker Digital, we use cookies to improve your browsing experience, analyze site performance, and support our marketing efforts. Specifically, we use cookies to:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>Enable core website functionality and navigate securely.</li>
                <li className={styles.listItem}>Remember your preferences and settings from prior visits.</li>
                <li className={styles.listItem}>Track aggregate visitor statistics, traffic paths, and engagement rates to refine our website content and layout.</li>
                <li className={styles.listItem}>Assess the efficacy of our advertising campaigns and deliver relevant marketing messages on other web platforms.</li>
              </ul>
            </section>

            <section id="types-cookies" className={styles.section}>
              <h2 className={styles.sectionHeading}>3. Types of Cookies We Use</h2>
              <p className={styles.paragraph}>
                We categorize the cookies on our site into the following groups:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Strictly Necessary Cookies:</span> These cookies are essential for you to browse the website and use its features. Without these cookies, services like basic page navigation and secure form submission cannot be provided. They do not gather personal information.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Analytical & Performance Cookies:</span> These cookies collect information about how visitors interact with our website&mdash;for example, which pages are visited most often, and if visitors encounter error messages. They help us monitor and improve the site&apos;s design and speed. All data collected is aggregated and anonymous.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Functionality Cookies:</span> These cookies allow the website to remember choices you make (such as language preference or region) and provide enhanced, personalized features.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Targeting & Advertising Cookies:</span> These cookies track your browsing habits to enable us to display relevant marketing ads on other platforms (e.g. Google Ads, LinkedIn, Meta). They also limit the number of times you see an advertisement and help measure the success of marketing campaigns.
                </li>
              </ul>
            </section>

            <section id="third-party-cookies" className={styles.section}>
              <h2 className={styles.sectionHeading}>4. Third-Party Cookies</h2>
              <p className={styles.paragraph}>
                In addition to our first-party cookies, we may also work with third-party partners who set cookies on our website to help us analyze usage or serve targeted ads:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Google Analytics:</span> We use Google Analytics to analyze website traffic. Google collects anonymous statistics that show visitor pathways, duration, and user interaction. To opt-out of Google Analytics across all websites, you can install the Google Analytics Opt-out Browser Add-on.
                </li>
                <li className={styles.listItem}>
                  <span className={styles.highlightText}>Advertising & Social Networks:</span> Companies like Meta (Facebook Pixel), LinkedIn, and Google Ads may set cookies on our site to track your visits and customize marketing campaigns shown to you when you visit social networks or other websites.
                </li>
              </ul>
            </section>

            <section id="managing-cookies" className={styles.section}>
              <h2 className={styles.sectionHeading}>5. Managing Cookies</h2>
              <p className={styles.paragraph}>
                You have the right to choose whether to accept or refuse cookies. Most web browsers are configured to accept cookies by default, but you can usually adjust your settings to decline or delete cookies:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.listItem}>
                  To manage cookies in <span className={styles.highlightText}>Google Chrome</span>: Settings &gt; Privacy and Security &gt; Cookies and other site data.
                </li>
                <li className={styles.listItem}>
                  To manage cookies in <span className={styles.highlightText}>Apple Safari</span>: Preferences &gt; Privacy &gt; Manage Website Data.
                </li>
                <li className={styles.listItem}>
                  To manage cookies in <span className={styles.highlightText}>Mozilla Firefox</span>: Options &gt; Privacy &amp; Security &gt; Cookies and Site Data.
                </li>
                <li className={styles.listItem}>
                  To manage cookies in <span className={styles.highlightText}>Microsoft Edge</span>: Settings &gt; Cookies and site permissions &gt; Manage and delete cookies and site data.
                </li>
              </ul>
              <p className={styles.paragraph}>
                Please note that if you choose to disable, decline, or delete cookies, certain portions of our website may not function correctly, and some interactive features or layouts may become unavailable.
              </p>
            </section>

            <section id="updates-policy" className={styles.section}>
              <h2 className={styles.sectionHeading}>6. Updates & Inquiries</h2>
              <p className={styles.paragraph}>
                We may update this Cookies Policy from time to time in response to shifting operational, legal, or regulatory requirements. We encourage you to review this policy periodically to stay informed about our use of cookies.
              </p>
              <p className={styles.paragraph}>
                If you have any questions or concerns about our use of cookies or this policy, please email us at <a href="mailto:info@krtaskerdigital.com" className={styles.highlightText} style={{ textDecoration: 'underline' }}>info@krtaskerdigital.com</a> or write to us at our registered business address listed in the footer of this website.
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
