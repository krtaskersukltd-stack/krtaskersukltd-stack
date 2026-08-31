import styles from './CrossedMarquee.module.css'

const services = [
  { name: 'Logo Design', color: 'teal' },
  { name: 'Branding', color: 'dark' },
  { name: 'Meta Ads', color: 'teal' },
  { name: 'Google Ads', color: 'dark' },
  { name: 'Digital 360', color: 'teal' },
  { name: 'PPC', color: 'dark' },
  { name: 'SEO', color: 'teal' },
  { name: 'Development', color: 'dark' },
  { name: 'Web Design', color: 'teal' },
  { name: 'App Design', color: 'dark' },
  { name: 'UI/UX Design', color: 'teal' },
  { name: 'Growth Marketing', color: 'dark' },
]

function ServiceItemGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className={styles.itemGroup} aria-hidden={ariaHidden || undefined}>
      {services.map((item, idx) => (
        <span key={`${item.name}-${idx}`} className={styles.itemWrapper}>
          <span className={item.color === 'teal' ? styles.tealText : styles.darkText}>
            {item.name}
          </span>
          <span className={styles.dot}>•</span>
        </span>
      ))}
    </div>
  )
}

export default function CrossedMarquee() {
  return (
    <section className={styles.crossedMarqueeSection} aria-label="Our Digital Capabilities">
      {/* Background/Bottom Ribbon: White / Off-white tilted negative */}
      <div className={`${styles.ribbonWrapper} ${styles.ribbonWhite}`}>
        <div className={styles.trackLeft}>
          <ServiceItemGroup />
          <ServiceItemGroup ariaHidden />
          <ServiceItemGroup ariaHidden />
          <ServiceItemGroup ariaHidden />
        </div>
      </div>

      {/* Foreground/Top Ribbon: Neon Lime tilted positive */}
      <div className={`${styles.ribbonWrapper} ${styles.ribbonLime}`}>
        <div className={styles.trackRight}>
          <ServiceItemGroup />
          <ServiceItemGroup ariaHidden />
          <ServiceItemGroup ariaHidden />
          <ServiceItemGroup ariaHidden />
        </div>
      </div>
    </section>
  )
}
