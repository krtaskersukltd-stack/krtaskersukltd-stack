'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SitewideTextEffects.module.css'

gsap.registerPlugin(ScrollTrigger)

function hasDarkBackground(element: HTMLElement) {
  let node: HTMLElement | null = element
  while (node && node !== document.body) {
    const color = getComputedStyle(node).backgroundColor.match(/[\d.]+/g)?.map(Number)
    if (color && color.length >= 3 && (color[3] ?? 1) > 0.05) {
      return color[0] * .299 + color[1] * .587 + color[2] * .114 < 125
    }
    node = node.parentElement
  }
  return false
}

export default function SitewideTextEffects() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/studio')) return

    let context: gsap.Context | undefined
    const timer = window.setTimeout(() => {
      context = gsap.context(() => {
        document.querySelectorAll<HTMLElement>('main h1, main h2, main h3, main h4').forEach((heading) => {
          if (heading.matches('[data-animated-heading], [data-no-text-motion]') || heading.closest('nav, footer, form, button, [data-no-text-motion]')) return
          heading.classList.add(styles.heading)
          gsap.fromTo(heading, { opacity: 0, y: 26, clipPath: 'inset(0 0 100% 0)' }, {
            opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: .75, ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
          })
        })

        document.querySelectorAll<HTMLElement>('main p').forEach((paragraph) => {
          if (paragraph.textContent!.trim().length < 35 || paragraph.querySelector('[data-fill-letter]') || paragraph.closest('nav, footer, form, button, [role="dialog"], [data-no-text-motion]')) return
          const endColor = getComputedStyle(paragraph).color
          paragraph.style.setProperty('--fill-end', endColor)
          paragraph.style.setProperty('--fill-start', hasDarkBackground(paragraph) ? 'rgba(255,255,255,.32)' : '#a3a8a9')
          paragraph.style.setProperty('--fill-position', '0%')
          paragraph.classList.add(styles.fill)
          gsap.to(paragraph, {
            '--fill-position': '100%', ease: 'none',
            scrollTrigger: { trigger: paragraph, start: 'top 88%', end: 'bottom 48%', scrub: .4 },
          })
        })
        ScrollTrigger.refresh()
      })

    }, 80)

    return () => {
      window.clearTimeout(timer)
      context?.revert()
    }
  }, [pathname])

  return null
}
