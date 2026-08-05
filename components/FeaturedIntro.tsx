'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './FeaturedIntro.module.css'

const orbitItems = [
  { icon: '▦', className: styles.iconLeftTop },
  { icon: '◇', className: styles.iconLeftBottom },
  { icon: '◇', className: styles.iconRightTop },
  { icon: '▦', className: styles.iconRightBottom },
]

export default function FeaturedIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, x: -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.heading}>
            For Bold Ideas For <span>Real World Results,</span><br />
            See How We Bring Digital To Life.
          </h2>
          <p className={styles.description}>
            From visionary startups to established industry leaders, we help brands grow with bold
            creative, full-funnel strategy and specialist-level execution, building digital experiences
            that drive real traffic, leads, and long-term growth.
          </p>
          <Link href="/work" className={styles.button}>View All Projects</Link>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, x: 45, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span className={styles.livePill} animate={{ y: [-3, 3, -3] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
            Live Projects <b>↘</b>
          </motion.span>
          <motion.span className={styles.previewPill} animate={{ y: [3, -3, 3] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}>
            Preview Now <b>↙</b>
          </motion.span>

          {orbitItems.map((item, index) => (
            <motion.span
              key={item.className}
              className={`${styles.orbitIcon} ${item.className}`}
              animate={{ y: index % 2 ? [4, -4, 4] : [-4, 4, -4], rotate: [-4, 4, -4] }}
              transition={{ duration: 3.8 + index * 0.25, repeat: Infinity, ease: 'easeInOut' }}
            >
              {item.icon}
            </motion.span>
          ))}

          <span className={`${styles.sparkle} ${styles.sparkleOne}`}>✣</span>
          <span className={`${styles.sparkle} ${styles.sparkleTwo}`}>✣</span>

          <Image
            src="/images/featured-image.png"
            alt="Digital specialist working on a laptop"
            width={386}
            height={400}
            className={styles.image}
            priority
          />

          <motion.div className={styles.projectBadge} whileHover={{ scale: 1.04 }}>
            <span className={styles.avatars}><i /><i /><i /><i/></span>
            <strong>1.5k+</strong>
            <small>Projects</small>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
