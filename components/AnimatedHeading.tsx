'use client'

import { Children, cloneElement, isValidElement, useRef, type CSSProperties, type ReactNode, type ReactElement } from 'react'
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import styles from './AnimatedHeading.module.css'

type Props = HTMLMotionProps<'h2'> & { as?: 'h1' | 'h2' | 'h3' | 'h4' }

// Split React text rather than mutating the DOM, so route changes and CMS updates
// keep their original elements, emphasis, links and line breaks.
export default function AnimatedHeading({ as = 'h2', children, ...props }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.15 })
  const reducedMotion = useReducedMotion()
  let index = 0

  function split(nodes: ReactNode): ReactNode {
    return Children.map(nodes, node => {
      if (typeof node === 'string' || typeof node === 'number') {
        const text = String(node)
        return <>{text.split(/(\s+)/).map((word, wordIndex) => {
          if (!word.trim()) return word
          return <i className={styles.word} key={wordIndex}>
            <i className={styles.accessible}>{word}</i>
            <i aria-hidden="true" className={styles.visual}>
              {Array.from(word).map((letter, letterIndex) => (
                <i key={letterIndex} className={styles.letter}
                  style={{ '--reveal-delay': `${Math.min(index++ * 0.018, 0.65)}s` } as CSSProperties}>
                  {letter}
                </i>
              ))}
            </i>
          </i>
        })}</>
      }
      if (isValidElement(node) && typeof node.type === 'string' && !['svg', 'img', 'br'].includes(node.type)) {
        const element = node as ReactElement<{ children?: ReactNode }>
        return cloneElement(element, {}, split(element.props.children))
      }
      return node
    })
  }

  const Heading = motion[as]
  return <Heading {...props} initial={reducedMotion ? false : props.initial} ref={ref} data-animated-heading data-heading-revealed={visible || undefined}>{split(children as ReactNode)}</Heading>
}
