'use client'

import styles from './CategoryTabs.module.css'

export interface CategoryTab {
  id: string
  label: string
  count: number
}

interface CategoryTabsProps {
  eyebrow: string
  tabs: CategoryTab[]
  activeId: string
  onChange: (id: string) => void
}

export default function CategoryTabs({ eyebrow, tabs, activeId, onChange }: CategoryTabsProps) {
  return (
    <div className={styles.layout}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`${styles.tab} ${activeId === tab.id ? styles.active : ''}`}
          >
            <span>{tab.label}</span>
            <small>{tab.count}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
