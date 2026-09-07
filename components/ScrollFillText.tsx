'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ScrollFillText.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollFillText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('[data-fill-letter]'),
        { color: '#a3a8a9' },
        {
          color: '#0c4651', duration: 1, stagger: 0.12, ease: 'none',
          scrollTrigger: {
            trigger: ref.current, start: 'top 82%', end: 'bottom 45%', scrub: true,
          },
        })
    }, ref)
    return () => media.revert()
  }, [text])

  return (
    <span ref={ref} className={styles.text} aria-label={text}>
      <span aria-hidden="true">
        {text.split(' ').map((word, index) => (
          <span key={index}>
            <span className={styles.word}>
              {Array.from(word).map((letter, i) => <span data-fill-letter key={i}>{letter}</span>)}
            </span>{index < text.split(' ').length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </span>
  )
}
