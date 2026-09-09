'use client'

import Link from 'next/link'
import styles from './Navbar.module.css'

interface AvailabilityNotchProps {
  text?: string
  href?: string
}

export default function AvailabilityNotch({
  text = 'Available For New Projects',
  href = '/contact',
}: AvailabilityNotchProps) {
  return (
    <Link
      href={href}
      className={styles.availabilityNotch}
      aria-label={`${text} - Contact Us`}
    >
      <svg
        className={styles.notchSvg}
        viewBox="0 0 270 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0 H270 C252 0 242 11 242 24 C242 36 232 42 220 42 H50 C38 42 28 36 28 24 C28 11 18 0 0 0 Z"
          className={styles.notchPath}
        />
      </svg>
      <span className={styles.pulseDot} aria-hidden="true">
        <span className={styles.pulseCore} />
        <span className={styles.pulseRing} />
      </span>
      <span className={styles.notchText}>{text}</span>
    </Link>
  )
}
