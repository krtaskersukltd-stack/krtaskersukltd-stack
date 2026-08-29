'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FaqSection.module.css'

interface FAQItem {
  question: string
  answer: React.ReactNode
}

const faqs: FAQItem[] = [
  {
    question: 'How long does it take to build a website?',
    answer: (
      <div>
        <p>Timelines depend on the spec of the website project, but here are some guidelines:</p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px', listStyleType: 'disc' }}>
          <li>Shopify projects usually take around four weeks.</li>
          <li>Craft CMS projects usually take a minimum of five weeks.</li>
          <li>Craft Commerce projects usually take a minimum of eight weeks.</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'What size companies do you produce web designs for?',
    answer: 'We produce web designs for companies of all sizes — from ambitious startups with zero digital presence to established B2B brands and multi-national corporations. We tailor our teams and approach to match your scale.',
  },
  {
    question: 'Do you redesign existing websites?',
    answer: 'Yes, we regularly help clients audit their legacy websites, pinpoint UX/performance bottlenecks, and carry out complete redesigns focused on improving conversion rates and modern branding.',
  },
  {
    question: 'Do you work internationally?',
    answer: 'Yes, while we are proud to be UK-based digital experts, we work with businesses in the US, Europe, Middle East, and beyond.',
  },
  {
    question: 'Do you offer ongoing help to us?',
    answer: 'Absolutely. We do not just build and walk away. We offer customized maintenance packages, hosting audits, SEO retention services, and ongoing digital strategy advisory.',
  },
  {
    question: 'How much does a website cost?',
    answer: 'Costs vary heavily depending on functionality, integrations, and content scale. Standard bespoke marketing sites usually range between £5,000 to £15,000, while custom e-commerce and complex web applications start from £20,000+.',
  },
  {
    question: 'We have limited budget, will you still work with us?',
    answer: 'We review every application on a case-by-step basis. If the budget is limited, we might propose a phased roll-out plan or focus on building a Minimum Viable Product (MVP) first.',
  },
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0) // default open first item

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  const scrollToContact = () => {
    const contactSec = document.getElementById('contact-form')
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.faqGrid}>
          {/* Left Column */}
          <div className={styles.headerArea}>
            <span className={styles.tag}>FAQ’s</span>
            <h2 className={styles.title}>The Answers To Your Questions.</h2>
            <Link href="/contact" className={styles.btnTouch}>
              Get In Touch
            </Link>
          </div>

          {/* Right Column (Accordion) */}
          <div className={styles.accordionArea}>
            {faqs.map((faq, i) => {
              const isOpen = openIdx === i
              return (
                <div key={i} className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ''}`}>
                  <button onClick={() => toggleFaq(i)} className={styles.faqQuestionBtn}>
                    <span className={styles.questionText}>{faq.question}</span>
                    <span className={`${styles.arrowIcon} ${isOpen ? styles.arrowOpen : ''}`}>
                      ↗
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={styles.faqAnswerContainer}
                      >
                        <div className={styles.faqAnswer}>{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
