'use client'
import { motion, useScroll } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function ScrollProgressBar() {
  const pathname = usePathname()
  const { scrollYProgress } = useScroll()

  if (pathname?.startsWith('/studio') || pathname?.startsWith('/admin')) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#E6FF2A',
        zIndex: 100,
        transformOrigin: '0%',
        scaleX: scrollYProgress
      }}
    />
  )
}
