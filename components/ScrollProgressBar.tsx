'use client'
import { motion, useScroll } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

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
