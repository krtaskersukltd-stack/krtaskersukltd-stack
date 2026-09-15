'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import styles from './ThemeToggle.module.css'

interface ThemeToggleProps {
  className?: string
  isDarkSection?: boolean
  compact?: boolean
}

export default function ThemeToggle({
  className = '',
  isDarkSection = false,
  compact = false,
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme()

  // Prevent hydration layout shift while client mounts
  const isDark = mounted ? resolvedTheme === 'dark' : false

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${styles.themeToggleBtn} ${compact ? styles.compact : ''} ${
        isDarkSection ? styles.darkNavContext : ''
      } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={styles.iconWrapper}>
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.svg
              key="sun"
              className={styles.iconSvg}
              viewBox="0 0 24 24"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M6.34 17.66l-1.41 1.41" />
              <path d="M19.07 4.93l-1.41 1.41" />
            </motion.svg>
          ) : (
            <motion.svg
              key="moon"
              className={styles.iconSvg}
              viewBox="0 0 24 24"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>
      <span className={styles.srOnly}>Toggle theme</span>
    </button>
  )
}
