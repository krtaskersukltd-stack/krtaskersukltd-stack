'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const pathname = usePathname()
  const isExcludedRoute = pathname?.startsWith('/studio')
  
  const [isVisible, setIsVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [cursorText, setCursorText] = useState('')

  // Mouse positions
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Trailing ring position with spring physics
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // If on studio or admin, ensure native cursor is restored
    if (isExcludedRoute) {
      document.documentElement.classList.remove('custom-cursor-active')
      return
    }

    // Hide default cursor on desktop when component mounts
    document.documentElement.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeaveWindow = () => setIsVisible(false)
    const handleMouseEnterWindow = () => setIsVisible(true)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor], input, textarea')
      if (interactiveEl) {
        setHovered(true)
        const text = interactiveEl.getAttribute('data-cursor')
        if (text) {
          setCursorText(text)
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor], input, textarea')
      if (interactiveEl) {
        setHovered(false)
        setCursorText('')
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isVisible, mouseX, mouseY, isExcludedRoute])

  // Disable on touch screens (mobile/tablets)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      )
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  if (isTouchDevice || isExcludedRoute || !isVisible) return null

  return (
    <>
      {/* Trailing Outer Ring */}
      <motion.div
        className={styles.ring}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.75 : hovered ? 1.6 : 1,
          borderColor: isClicked ? 'var(--lime)' : hovered ? 'var(--lime)' : 'var(--teal)',
          borderWidth: isClicked ? '3.5px' : '1.5px',
          backgroundColor: hovered ? 'rgba(230, 255, 42, 0.15)' : 'rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {cursorText && (
          <span className={styles.cursorText}>
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className={styles.dot}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 1.8 : hovered ? 0 : 1,
          backgroundColor: isClicked ? 'var(--lime)' : 'var(--teal)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
    </>
  )
}
