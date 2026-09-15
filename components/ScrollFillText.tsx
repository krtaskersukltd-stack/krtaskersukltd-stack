'use client'

import { useEffect, useRef, type ReactNode, type ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from './ThemeProvider'
import styles from './ScrollFillText.module.css'

gsap.registerPlugin(ScrollTrigger)

interface ScrollFillTextProps {
  text?: string
  children?: ReactNode
  className?: string
  as?: 'span' | 'p' | 'div'
  startColor?: string
  endColor?: string
}

export default function ScrollFillText({
  text,
  children,
  className = '',
  as = 'span',
  startColor,
  endColor,
}: ScrollFillTextProps) {
  const ref = useRef<HTMLElement>(null)
  const { resolvedTheme } = useTheme()
  const rawText = text || (typeof children === 'string' ? children : '')

  const isDark = resolvedTheme === 'dark'

  // Default colors:
  // In Dark theme: Text starts as teal (#0c5c68), fills to white (#ffffff) on scroll.
  // In Light theme: Text starts as light gray (#a3a8a9), fills to dark teal (#0c4651) on scroll.
  const effectiveStartColor = startColor !== undefined ? startColor : (isDark ? '#0c5c68' : '#a3a8a9')
  const effectiveEndColor = endColor !== undefined ? endColor : (isDark ? '#ffffff' : '#0c4651')

  useEffect(() => {
    if (!rawText || !ref.current) return

    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const letters = ref.current!.querySelectorAll('[data-fill-letter]')
      if (!letters.length) return

      gsap.fromTo(
        letters,
        { color: effectiveStartColor },
        {
          color: effectiveEndColor,
          duration: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.4,
          },
        }
      )
    }, ref)

    return () => media.revert()
  }, [rawText, effectiveStartColor, effectiveEndColor, resolvedTheme])

  if (!rawText) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  const Tag = as as ElementType
  const words = rawText.split(/\s+/).filter(Boolean)

  return (
    <Tag ref={ref} className={`${styles.text} ${className}`.trim()} aria-label={rawText}>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span key={wordIndex}>
            <span className={styles.word}>
              {Array.from(word).map((char, charIndex) => (
                <span
                  data-fill-letter
                  className={styles.letter}
                  key={charIndex}
                  style={{ color: effectiveStartColor }}
                >
                  {char}
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </Tag>
  )
}
