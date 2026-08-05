'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './Logo.module.css'

export default function Logo() {
  return (
    <Link href="/" className={styles.logoWrapper} aria-label="KR Tasker Digital Home">
      <Image
        src="/images/Logo.svg"
        alt="KR Tasker Digital"
        width={134}
        height={64}
        className={styles.logoImage}
        priority
      />
    </Link>
  )
}
