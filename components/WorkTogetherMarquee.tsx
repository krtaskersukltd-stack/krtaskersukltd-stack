import styles from './WorkTogetherMarquee.module.css'

function MarqueePhrase({
  accentFirst = false,
  ariaHidden = false,
}: {
  accentFirst?: boolean
  ariaHidden?: boolean
}) {
  return (
    <div className={styles.marqueeText} aria-hidden={ariaHidden || undefined}>
      <span className={accentFirst ? styles.marqueeAccent : undefined}>
        Let&apos;s Work Together.
      </span>
      <span className={!accentFirst ? styles.marqueeAccent : undefined}>
        Let&apos;s Work Together.
      </span>
    </div>
  )
}

export default function WorkTogetherMarquee() {
  return (
    <section className={styles.marqueeSection} aria-label="Let’s work together">
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrackLeft}>
          <MarqueePhrase />
          <MarqueePhrase ariaHidden />
        </div>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrackRight}>
          <MarqueePhrase accentFirst />
          <MarqueePhrase accentFirst ariaHidden />
        </div>
      </div>
    </section>
  )
}
