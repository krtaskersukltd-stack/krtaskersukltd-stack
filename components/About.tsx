'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './About.module.css'
import ScrollFillText from './ScrollFillText'
import Button from './Button'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className={styles.about}>
      <div>
        <div className={styles.container}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}
            className={styles.leftCol}>
            <ul className={styles.bulletList}>
              <li>Who are we?</li>
            </ul>
          </motion.div>
          <div className={styles.rightCol}>
            
            <p className={styles.heading}>
              <ScrollFillText text="An independent web design and branding agency in Manchester set up in 2010 who care, build relationships, have industry experience, and win awards." />
            </p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
              className={styles.buttons}>
              <Button href="/about">About Kr Tasker</Button>
              <Button href="/team" variant="secondary">Meet Our Team</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
