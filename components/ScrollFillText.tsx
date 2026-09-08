'use client'

import { useEffect, useRef, type ReactNode, type ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  startColor = '#a3a8a9',
  endColor = '#0c4651',
}: ScrollFillTextProps) {
  const ref = useRef<HTMLElement>(null)
  const rawText = text || (typeof children === 'string' ? children : '')

  useEffect(() => {
    if (!rawText || !ref.current) return

    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const letters = ref.current!.querySelectorAll('[data-fill-letter]')
      if (!letters.length) return

      gsap.fromTo(
        letters,
        { color: startColor },
        {
          color: endColor,
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
  }, [rawText, startColor, endColor])

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
                <span data-fill-letter className={styles.letter} key={charIndex}>
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
