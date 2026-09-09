'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

interface AvailabilityNotchProps {
  text?: string
  href?: string
}

export default function AvailabilityNotch({
  text = 'Available For New Projects',
  href = '/contact',
}: AvailabilityNotchProps) {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      const contactEl = document.getElementById('contact')
      if (contactEl) {
        e.preventDefault()
        contactEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <Link
      href={href}
      className={styles.availabilityNotch}
      onClick={handleClick}
      aria-label={`${text} - Contact Us`}
    >
      <svg
        className={styles.notchSvg}
        viewBox="0 0 270 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0 C8 1 16 4 22 10 C24 19 30 26 38 31 C42 33 45 34 49 34 H221 C225 34 228 33 232 31 C240 26 246 19 248 10 C254 4 262 1 270 0 Z"
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
