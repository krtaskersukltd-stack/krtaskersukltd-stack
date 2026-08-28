const fs = require("fs");

// 1. Update components/SmoothScroll.tsx
const smoothScrollCode = `'use client'
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
    // 1. Completely disable Lenis on Sanity Studio and Admin routes
    if (pathname?.startsWith('/studio') || pathname?.startsWith('/admin')) {
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
`;
fs.writeFileSync("components/SmoothScroll.tsx", smoothScrollCode, "utf-8");
console.log("Updated components/SmoothScroll.tsx");

// 2. Update app/studio/[[...tool]]/page.tsx
const studioPageCode = `'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return (
    <div
      data-lenis-prevent="true"
      style={{
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        touchAction: 'auto',
      }}
    >
      <NextStudio config={config} />
    </div>
  )
}
`;
fs.writeFileSync("app/studio/[[...tool]]/page.tsx", studioPageCode, "utf-8");
console.log("Updated app/studio/[[...tool]]/page.tsx");

// 3. Update components/CustomCursor.tsx
let customCursor = fs.readFileSync("components/CustomCursor.tsx", "utf-8");
if (!customCursor.includes("usePathname")) {
  customCursor = customCursor.replace("import { useEffect, useState } from 'react'", "import { useEffect, useState } from 'react'\nimport { usePathname } from 'next/navigation'");
  customCursor = customCursor.replace("const [isVisible, setIsVisible] = useState(false)", "const pathname = usePathname()\n  const [isVisible, setIsVisible] = useState(false)");
  customCursor = customCursor.replace("if (isTouchDevice || !isVisible) return null", "if (isTouchDevice || !isVisible || pathname?.startsWith('/studio') || pathname?.startsWith('/admin')) return null");
  fs.writeFileSync("components/CustomCursor.tsx", customCursor, "utf-8");
  console.log("Updated components/CustomCursor.tsx");
}

// 4. Update components/ScrollProgressBar.tsx
let scrollBar = fs.readFileSync("components/ScrollProgressBar.tsx", "utf-8");
if (!scrollBar.includes("usePathname")) {
  scrollBar = scrollBar.replace("import { motion, useScroll } from 'framer-motion'", "import { motion, useScroll } from 'framer-motion'\nimport { usePathname } from 'next/navigation'");
  scrollBar = scrollBar.replace("const { scrollYProgress } = useScroll()", "const pathname = usePathname()\n  const { scrollYProgress } = useScroll()\n\n  if (pathname?.startsWith('/studio') || pathname?.startsWith('/admin')) return null");
  fs.writeFileSync("components/ScrollProgressBar.tsx", scrollBar, "utf-8");
  console.log("Updated components/ScrollProgressBar.tsx");
}

// 5. Update app/globals.css
let globalsCss = fs.readFileSync("app/globals.css", "utf-8");
if (!globalsCss.includes("Sanity Studio Smooth Scrolling Fix")) {
  globalsCss += `\n
/* Sanity Studio Smooth Scrolling Fix */
[data-lenis-prevent],
[data-ui="ScrollContainer"],
[data-testid="pane"],
[data-testid="pane-content"],
[data-testid="document-panel-portal"] {
  overscroll-behavior: contain !important;
  touch-action: pan-y !important;
  -webkit-overflow-scrolling: touch !important;
}
`;
  fs.writeFileSync("app/globals.css", globalsCss, "utf-8");
  console.log("Updated app/globals.css");
}
