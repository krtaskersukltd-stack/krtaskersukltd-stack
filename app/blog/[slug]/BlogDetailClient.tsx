'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { BlogPost } from '../posts'
import styles from './BlogDetailPage.module.css'

export default function BlogDetailClient({ post }: { post: BlogPost }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      const element = contentRef.current
      const totalHeight = element.clientHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(progress, 100))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className={styles.page}>
      <Navbar />

      {/* 1. Split Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            <div className={styles.leftHero}>
              <div className={styles.metaRow}>
                <Link href="/blog" className={styles.backBtn}>
                  <span className={styles.arrow}>←</span> Back to Blogs
                </Link>
                <span className={styles.tag}>{post.category}</span>
              </div>
              
              <h1 className={styles.heroTitle}>{post.title}</h1>
              
              <div className={styles.authorCard}>
                <img src={post.authorImage} alt={post.authorName} className={styles.authorAvatar} />
                <div className={styles.authorMeta}>
                  <p className={styles.writtenBy}>Written by</p>
                  <p className={styles.authorName}>{post.authorName}</p>
                  <p className={styles.authorRole}>{post.authorRole}</p>
                </div>
              </div>
            </div>

            <div className={styles.rightHero}>
              <div 
                className={styles.heroImage} 
                style={{ backgroundImage: `url(${post.imageUrl})` }}
                aria-label={post.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Article Body Section */}
      <section className={styles.articleBodySection}>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyGrid}>
            
            {/* Left Sidebar: Progress Tracker & Metadata */}
            <aside className={styles.sidebar}>
              <div className={styles.stickySidebar}>
                <div className={styles.progressContainer}>
                  <div 
                    className={styles.progressBar} 
                    style={{ height: `${scrollProgress}%` }} 
                  />
                </div>
                <div className={styles.sidebarMeta}>
                  <div className={styles.readTimeIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <p className={styles.readTimeText}>{post.readTime}</p>
                </div>
                <div className={styles.publishDate}>
                  <p className={styles.dateLabel}>Published on</p>
                  <p className={styles.dateVal}>{post.date}</p>
                </div>
              </div>
            </aside>

            {/* Right Side: The Content Stream */}
            <div ref={contentRef} className={styles.contentColumn}>
              {typeof post.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} className={styles.richTextBody} />
              ) : (
                post.content.map((block, idx) => {
                  switch (block.type) {
                    case 'paragraph':
                      return (
                        <p key={idx} className={styles.paragraph}>
                          {block.text}
                        </p>
                      )
                    case 'heading':
                      return (
                        <h2 key={idx} className={styles.heading}>
                          {block.text}
                        </h2>
                      )
                    case 'quote':
                      return (
                        <blockquote key={idx} className={styles.blockquote}>
                          <span className={styles.quoteMark}>“</span>
                          <p className={styles.quoteText}>{block.text}</p>
                        </blockquote>
                      )
                    case 'image':
                      return (
                        <div key={idx} className={styles.imageWrapper}>
                          <img src={block.url} alt={block.alt} className={styles.inlineImage} />
                          {block.alt && <span className={styles.imageCaption}>{block.alt}</span>}
                        </div>
                      )
                    case 'grid-images':
                      return (
                        <div key={idx} className={styles.imageGrid}>
                          {block.urls.map((url, imgIdx) => (
                            <img key={imgIdx} src={url} alt={`Gallery image ${imgIdx + 1}`} className={styles.gridImage} />
                          ))}
                        </div>
                      )
                    default:
                      return null
                  }
                })
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. CTA & Contact Area */}
      <div id="contact-form">
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
