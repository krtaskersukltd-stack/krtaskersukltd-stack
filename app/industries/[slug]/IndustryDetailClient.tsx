'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedHeading from '@/components/AnimatedHeading'
import Button from '@/components/Button'
import Navbar from '@/components/Navbar'
import Approach from '@/components/Approach'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import type { ServiceRecord } from '@/lib/cms-types'
import styles from './IndustryDetail.module.css'

const ticker = ['Strategy', 'Web Design', 'SEO', 'Paid Media', 'Content', 'Analytics', 'Creative']

export default function IndustryDetailClient({ srv }: { srv: ServiceRecord }) {
  const features = srv.features?.length ? srv.features : [
    { id: 'strategy', title: `${srv.name} Strategy`, description: `A focused growth plan built around the audience, competition, and buying journey in ${srv.name}.`, sortOrder: 1 },
    { id: 'visibility', title: 'Search & Visibility', description: 'Search, content, and paid campaigns designed to attract qualified demand.', sortOrder: 2 },
    { id: 'conversion', title: 'Conversion Systems', description: 'Digital experiences that turn attention into enquiries, sales, and measurable growth.', sortOrder: 3 },
  ]

  return (
    <main className={styles.page}>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div className={styles.heroGrid} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <div>
              <span className={styles.eyebrow}>• {srv.eyebrow || 'Industry Expertise'}</span>
              <AnimatedHeading as="h1" className={styles.title}>{srv.heroHeading || srv.name}</AnimatedHeading>
              <p className={styles.description}>{srv.heroDescription}</p>
              <div className={styles.actions}>
                <Button href={srv.heroCtaLink || '/contact'}>{srv.heroCtaText || 'Start A Project'}</Button>
                <Button href="/work" variant="secondary">View Case Studies</Button>
              </div>
            </div>
            <div className={styles.visual}>
              <Image src={srv.featuredImage || '/images/industry-hero.jpg'} alt={`${srv.name} digital growth`} fill priority className={styles.image} sizes="(max-width: 900px) 100vw, 45vw" />
              <span className={styles.live}>Live Projects ↘</span>
              <div className={styles.metric}><strong>{srv.metrics?.[0]?.value || '360%'}</strong><span>{srv.metrics?.[0]?.label || 'Growth Potential'}</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className={styles.marquee}><div>{[...ticker, ...ticker].map((item, i) => <span key={`${item}-${i}`}>{item}<b>•</b></span>)}</div></div>

      <section className={styles.solutions}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <span>BUILT FOR YOUR MARKET</span>
            <AnimatedHeading as="h2">Digital growth shaped around <em>{srv.name}</em>.</AnimatedHeading>
            <p>Every channel works as one connected system, built around your market and commercial goals.</p>
          </div>
          <div className={styles.cards}>
            {features.map((feature, index) => (
              <motion.article key={feature.id || index} className={styles.card} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }}>
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Approach />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
