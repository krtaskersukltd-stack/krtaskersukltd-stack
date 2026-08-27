'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import styles from './HeroCarousel.module.css'

gsap.registerPlugin(Draggable, InertiaPlugin)

import { CAROUSEL_ITEMS as carouselItems, DEG2RAD, round } from '@/lib/carousel-math'

interface CarouselInstance {
  rotation: (value?: number) => number
  activeElement: (value?: Element) => Element | undefined
  elementRotation: (element: Element) => number
  to: (
    elOrRotation: Element | string | number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vars?: any,
    direction?: string
  ) => gsap.core.Tween
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: (vars?: any, direction?: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previous: (vars?: any, direction?: string) => void
  resize: (radiusX: number, radiusY: number) => void
  render: () => void
  kill: () => void
  snap: number
  draggable?: Draggable
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  autoAdvance?: any
}

function buildCarousel(
  targets: Element[],
  config: {
    radiusX?: number
    radiusY?: number
    activeAngle?: number
    activeElement?: Element | string
    onClick?: (element: Element, self: CarouselInstance) => void
    onActivate?: (element: Element, self: CarouselInstance) => void
    onDeactivate?: (element: Element, self: CarouselInstance) => void
    onStart?: (element: Element, self: CarouselInstance) => void
    onStop?: (element: Element, self: CarouselInstance) => void
    draggable?: boolean
    autoAdvance?: number
  }
): CarouselInstance {
  const {
    radiusX: initialRadiusX = 200,
    radiusY: initialRadiusY = 200,
    activeAngle = -90,
    onClick,
    onActivate,
    onDeactivate,
    onStart,
    onStop,
    draggable: enableDraggable,
    autoAdvance,
  } = config

  let radiusX = initialRadiusX
  let radiusY = initialRadiusY

  targets = gsap.utils.toArray(targets) as Element[]
  gsap.set(targets, { xPercent: -50, x: 0, yPercent: -50, y: 0 })

  const DEG2RAD = Math.PI / 180
  const eventTypes = (
    'ontouchstart' in document.documentElement
      ? 'touchstart,touchmove,touchcancel,touchend'
      : !('onpointerdown' in document.documentElement)
        ? 'mousedown,mousemove,mouseup,mouseup'
        : 'pointerdown,pointermove,pointercancel,pointerup'
  ).split(',')

  const round = (value: number) => Math.round(value * 10000) / 10000
  const tempDiv = document.createElement('div')
  const quantity = targets.length
  const angleInc = 360 / quantity
  const wrap = gsap.utils.wrap(0, quantity)
  const angleWrap = gsap.utils.wrap(0, 360)

  let rotation = 0
  let dragged = false
  let onPressRotation = 0
  let activeElement: Element | undefined =
    config.activeElement ? (gsap.utils.toArray(config.activeElement)[0] as Element) : undefined

  const autoAdvanceCall =
    autoAdvance
      ? gsap.delayedCall(parseFloat(String(autoAdvance)) || 2, () => {
          self.next()
          autoAdvanceCall!.restart(true)
        })
      : undefined

  const xSetters = targets.map((el) => gsap.quickSetter(el, 'x', 'px'))
  const ySetters = targets.map((el) => gsap.quickSetter(el, 'y', 'px'))

  let draggableInstance: Draggable | undefined

  const self: CarouselInstance = {
    rotation(value?: number) {
      if (arguments.length && value !== undefined) {
        const prevActive = activeElement
        rotation = angleWrap(value)
        activeElement = targets[wrap(Math.round(-value / angleInc))]
        self.render()
        if (prevActive !== activeElement) {
          if (onDeactivate && prevActive) { onDeactivate(prevActive, self) }
          if (onActivate && activeElement) { onActivate(activeElement, self) }
        }
      }
      return rotation
    },
    resize(rx: number, ry: number) {
      radiusX = rx
      radiusY = ry
      self.render()
    },
    render() {
      const inc = angleInc * DEG2RAD
      let a = (rotation + activeAngle) * DEG2RAD
      for (let i = 0; i < quantity; i++) {
        xSetters[i](round(Math.cos(a) * radiusX))
        ySetters[i](round(Math.sin(a) * radiusY))
        a += inc
      }
    },
    activeElement(value?: Element) {
      if (arguments.length && value) {
        self.rotation(self.elementRotation(value))
      }
      return activeElement
    },
    elementRotation(element: Element) {
      const index = targets.indexOf(gsap.utils.toArray(element)[0] as Element)
      return (quantity - index) * angleInc
    },
    to(elOrRotation, vars, direction) {
      vars = vars || {}
      ;(vars as Record<string, unknown>).rotation =
        typeof elOrRotation === 'number'
          ? elOrRotation
          : self.elementRotation(elOrRotation as Element) ||
            parseFloat(elOrRotation as string)
      vars.overwrite = true
      const { onUpdate, onComplete } = vars
      const _onStart = vars.onStart
      if (autoAdvanceCall) { autoAdvanceCall.pause() }
      vars.onStart = function (this: gsap.core.Tween) {
        if (onStart && activeElement) { onStart(activeElement, self) }
        if (_onStart) { _onStart.call(this) }
      }
      vars.onComplete = function (this: gsap.core.Tween) {
        if (onStop && activeElement) { onStop(activeElement, self) }
        if (onComplete) { onComplete.call(this) }
        if (autoAdvanceCall) { autoAdvanceCall.restart(true) }
      }
      if (direction) {
        const getter = gsap.getProperty(tempDiv) as (prop: string) => number
        vars.onUpdate = function (this: gsap.core.Tween) {
          self.rotation(getter('rotation'))
          if (onUpdate) { onUpdate.call(this) }
        }
        ;(vars as Record<string, unknown>).rotation += '_' + direction
        return gsap.fromTo(tempDiv, { rotation }, vars)
      }
      return gsap.to(self, vars)
    },
    next(vars, direction) {
      vars = { ...vars, duration: 1.2, ease: 'power2.inOut' }
      const element =
        targets[wrap(targets.indexOf(activeElement as Element) + 1)]
      self.to(element, vars, direction || 'ccw')
    },
    previous(vars, direction) {
      vars = { ...vars, duration: 1.2, ease: 'power2.inOut' }
      const element =
        targets[wrap(targets.indexOf(activeElement as Element) - 1)]
      self.to(element, vars, direction || 'cw')
    },
    kill() {
      targets.forEach((el) => {
        el.removeEventListener('click', handleClick)
        el.removeEventListener(eventTypes[0], onPress as EventListener)
        el.removeEventListener(eventTypes[2], onRelease as EventListener)
        el.removeEventListener(eventTypes[3], onRelease as EventListener)
      })
      gsap.killTweensOf(self)
      if (tempDiv.parentNode) { tempDiv.parentNode.removeChild(tempDiv) }
      if (autoAdvanceCall) { autoAdvanceCall.kill() }
      if (draggableInstance) { draggableInstance.kill() }
    },
    snap: angleInc,
    autoAdvance: autoAdvanceCall,
  }

  const handleClick = (e: Event) => {
    if (!dragged) {
      if (autoAdvanceCall) { autoAdvanceCall.restart(true) }
      if (onClick) { onClick(e.currentTarget as Element, self) }
    }
  }

  const onPress = (e: Event) => {
    onPressRotation = rotation
    gsap.set(tempDiv, { rotation })
    if (autoAdvanceCall) { autoAdvanceCall.pause() }
    gsap.killTweensOf(self)
    draggableInstance!.startDrag(e as PointerEvent)
    dragged = false
  }

  const onRelease = (e: Event) => {
    draggableInstance!.endDrag(e as PointerEvent)
    if (rotation === onPressRotation) {
      if (autoAdvanceCall) { autoAdvanceCall.restart(true) }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (draggableInstance && (draggableInstance as any).tween) {
        draggableInstance.tween.kill()
      }
      handleClick(e)
    }
  }

  const syncDraggable = () => {
    if (!dragged) {
      if (onStart && activeElement) { onStart(activeElement, self) }
      dragged = true
    }
    self.rotation(draggableInstance!.rotation)
  }

  targets[0].parentNode!.appendChild(tempDiv)
  gsap.set(tempDiv, {
    visibility: 'hidden',
    position: 'absolute',
    width: 0,
    height: 0,
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50,
  })

  targets.forEach((el) => {
    if (enableDraggable) {
      el.addEventListener(eventTypes[0], onPress as EventListener)
      el.addEventListener(eventTypes[2], onRelease as EventListener)
      el.addEventListener(eventTypes[3], onRelease as EventListener)
    } else {
      el.addEventListener('click', handleClick)
    }
  })

  if (enableDraggable) {
    draggableInstance = Draggable.create(tempDiv, {
      type: 'rotation',
      snap: gsap.utils.snap(angleInc),
      inertia: true,
      onThrowComplete: () => {
        if (autoAdvanceCall) { autoAdvanceCall.restart(true) }
        if (onStop && activeElement) { onStop(activeElement, self) }
      },
      onThrowUpdate: syncDraggable,
      onDrag: syncDraggable,
    })[0]
    self.draggable = draggableInstance
  }

  self.activeElement(
    config.activeElement ? (gsap.utils.toArray(config.activeElement)[0] as Element) : targets[0]
  )

  return self
}

export default function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<CarouselInstance | null>(null)
  const lastScrollRef = useRef(0)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isScrollingRef = useRef(false)

  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return

    const currentScroll = window.scrollY

    if (!isScrollingRef.current) {
      isScrollingRef.current = true
    }

    if (currentScroll > lastScrollRef.current) {
      carouselRef.current.next(
        { duration: 1.2, ease: 'power2.inOut' },
        'ccw'
      )
    } else {
      carouselRef.current.previous(
        { duration: 1.2, ease: 'power2.inOut' },
        'cw'
      )
    }

    lastScrollRef.current = currentScroll

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
    }, 150)
  }, [])

  useEffect(() => {
    if (!contentRef.current) return

    const items = gsap.utils.toArray(
      contentRef.current.querySelectorAll(`.${styles.item}`)
    ) as Element[]

    if (items.length === 0) return

    const isMobile = window.innerWidth < 800
    const rx = isMobile ? 400 : 1100
    const ry = isMobile ? 320 : 800

    const carousel = buildCarousel(items, {
      radiusX: rx,
      radiusY: ry,
      activeAngle: -90,
      draggable: true,
      autoAdvance: 3,
      onClick(element, self) {
        self.to(element, { duration: 1.5, ease: 'power2.inOut' }, 'short')
      },
      onActivate(element) {
        element.classList.add(styles.active)
      },
      onDeactivate(element) {
        element.classList.remove(styles.active)
      },
    })

    carouselRef.current = carousel

    // Scroll-based navigation
    let ticking = false
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })

    // Responsive resize
    const handleResize = () => {
      const mobile = window.innerWidth < 800
      carousel.resize(mobile ? 400 : 1100, mobile ? 320 : 800)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      carousel.kill()
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('resize', handleResize)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  return (
    <div className={styles.outerWrap}>
      <div ref={containerRef} className={styles.carouselContainer}>
        <div className={styles.wrapper}>
          <div ref={contentRef} className={styles.content}>
            {carouselItems.map((item, idx) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.child}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.label}
                    className={styles.cardImage}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className={styles.cardOverlay}>
                    <span className={styles.cardLabel}>{item.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation arrows — outside the clipped container */}
      <div className={styles.navButtons}>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Previous slide"
          onClick={() =>
            carouselRef.current?.previous(
              { duration: 1.2, ease: 'power2.inOut' },
              'cw'
            )
          }
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Next slide"
          onClick={() =>
            carouselRef.current?.next(
              { duration: 1.2, ease: 'power2.inOut' },
              'ccw'
            )
          }
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
