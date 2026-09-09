import Link from 'next/link'
import type { ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'compact'
  href?: string
  arrow?: boolean
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  arrow = false,
  className = '',
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim()
  const content = (
    <span className={styles.content}>
      {children}{arrow && <span className={styles.arrow} aria-hidden="true">→</span>}
    </span>
  )

  return href
    ? <Link href={href} className={classes} onClick={onClick}>{content}</Link>
    : <button type={type} className={classes} disabled={disabled} onClick={onClick}>{content}</button>
}
