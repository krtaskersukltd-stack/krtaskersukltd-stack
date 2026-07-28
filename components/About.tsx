'use client'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import styles from './About.module.css'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section ref={ref} className={styles.about}>
      <motion.div style={{ y }} >
        <div className={styles.container}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}
            className={styles.leftCol}>
            <ul className={styles.bulletList}>
              <li>Who are we?</li>
            </ul>
          </motion.div>
          <div className={styles.rightCol}>
            <motion.p initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
              className={styles.heading}>
              An independent <span className={styles.underline}>web design</span> and <span className={styles.underline}>branding agency</span> in Manchester set up in 2010 who care, build relationships, have industry experience, and win awards.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
              className={styles.buttons}>
              <Link href="/about" passHref legacyBehavior>
                <motion.a whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(12,70,81,0.3)' }} whileTap={{ scale: 0.97 }}
                  className={styles.btnPrimary}>
                  About Kr Tasker
                </motion.a>
              </Link>
              <Link href="/team" passHref legacyBehavior>
                <motion.a whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(230,255,42,0.4)' }} whileTap={{ scale: 0.97 }}
                  className={styles.btnSecondary}>
                  Meet Our Team
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
