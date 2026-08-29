'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // 1. Completely disable Lenis on Sanity Studio
    if (pathname?.startsWith('/studio')) {
      return
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
      prevent: (node) => {
        return (
          node.getAttribute('data-lenis-prevent') === 'true' ||
          node.closest('[data-lenis-prevent="true"]') !== null ||
          node.closest('[data-testid="pane"]') !== null ||
          node.closest('[data-ui="ScrollContainer"]') !== null
        )
      },
    })

    lenisRef.current = lenis

    // Update ScrollTrigger on scroll
    lenis.on('scroll', ScrollTrigger.update)

    // Synchronize Lenis scrolling with GSAP ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)

    // Disable lag smoothing for GSAP ticker to maintain perfect synchronicity
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateTicker)
    }
  }, [pathname])

  return <>{children}</>
}
