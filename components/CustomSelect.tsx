'use client'

import React, { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CustomSelect.module.css'

export interface SelectOption {
  label: string
  value: string
}

interface CustomSelectProps {
  id?: string
  name?: string
  value: string
  options: (string | SelectOption)[]
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export default function CustomSelect({
  id,
  name,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)
  const generatedId = useId()
  const selectId = id || generatedId

  // Normalize options
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  )

  const selectedOption = normalizedOptions.find((opt) => opt.value === value)
  const selectedIndex = normalizedOptions.findIndex((opt) => opt.value === value)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
      const highlightedEl = listboxRef.current.children[highlightedIndex] as HTMLElement
      if (highlightedEl) {
        highlightedEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex, isOpen])

  const openDropdown = () => {
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setIsOpen(true)
  }

  const handleToggle = () => {
    if (disabled) return
    if (!isOpen) {
      openDropdown()
    } else {
      setIsOpen(false)
    }
  }

  const handleSelect = (val: string) => {
    onChange(val)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (isOpen) {
          if (highlightedIndex >= 0 && highlightedIndex < normalizedOptions.length) {
            handleSelect(normalizedOptions[highlightedIndex].value)
          }
        } else {
          openDropdown()
        }
        break

      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          openDropdown()
        } else {
          setHighlightedIndex((prev) => (prev < normalizedOptions.length - 1 ? prev + 1 : 0))
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (!isOpen) {
          openDropdown()
        } else {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : normalizedOptions.length - 1))
        }
        break

      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        break

      case 'Tab':
        setIsOpen(false)
        break

      default:
        break
    }
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isOpen ? styles.containerOpen : ''} ${className}`.trim()}
    >
      {/* Hidden input for standard form submission */}
      {name && <input type="hidden" name={name} value={value} />}

      {/* Trigger Button */}
      <button
        type="button"
        id={selectId}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${selectId}-dropdown`}
        className={`${styles.trigger} ${isOpen ? styles.triggerActive : ''}`}
      >
        <span className={styles.triggerText}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Animated Custom Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`${selectId}-dropdown`}
            className={styles.dropdown}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul
              ref={listboxRef}
              role="listbox"
              aria-labelledby={selectId}
              className={styles.optionList}
            >
              {normalizedOptions.map((opt, idx) => {
                const isSelected = opt.value === value
                const isHighlighted = idx === highlightedIndex

                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(opt.value)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      className={`${styles.optionItem} ${
                        isSelected ? styles.optionSelected : ''
                      } ${isHighlighted && !isSelected ? styles.optionHighlighted : ''}`}
                    >
                      <span className={styles.optionText}>{opt.label}</span>
                      {isSelected && (
                        <svg
                          className={styles.checkIcon}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
