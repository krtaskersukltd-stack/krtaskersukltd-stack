'use client'

import styles from './BlogCard.module.css'

interface BlogCardProps {
  title: string
  readTime: string
  gradient?: string
  imageUrl?: string
  category: string
}

export default function BlogCard({ title, readTime, gradient, imageUrl, category }: BlogCardProps) {
  const bgStyle = imageUrl 
    ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: gradient || 'var(--gray)' }

  return (
    <article className={styles.blogCard}>
      <div className={styles.imageBox} style={bgStyle}>
        <span className={styles.categoryTag}>{category}</span>
        <div className={styles.decorativeContent}>
          <div className={styles.decorDot} />
          <div className={styles.decorDot} />
          <div className={styles.decorDot} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.bullet}>•</span>
          <span className={styles.readTime}>{readTime}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </article>
  )
}
