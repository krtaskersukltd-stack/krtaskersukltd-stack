'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import BlogCard from '@/components/BlogCard'
import BlogNewsletter from '@/components/BlogNewsletter'
import styles from './BlogPage.module.css'
import CategoryTabs from '@/components/CategoryTabs'
import { allPosts, BlogPost } from './posts'

const filterCategories = [
  { id: 'all', label: 'Explore All' },
  { id: 'web', label: 'Web Development' },
  { id: 'design', label: 'Graphic Designing' },
  { id: 'marketing', label: 'Digital Marketing' },
  { id: 'branding', label: 'Branding' },
  { id: 'social', label: 'Social Media' },
  { id: 'seo', label: 'SEO' },
  { id: 'studio', label: 'Studio Life' },
]

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [posts, setPosts] = useState<BlogPost[]>(allPosts)

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/api/blogs')
        if (res.ok) {
          const data = await res.json()
          setPosts(data)
        }
      } catch (err) {
        console.error('Error loading posts', err)
      }
    }
    loadPosts()
  }, [])

  // Dynamically calculate category counts based on active posts
  const filters = filterCategories.map(cat => {
    if (cat.id === 'all') {
      return { ...cat, count: posts.length }
    }
    const count = posts.filter(
      p => p.category && p.category.toLowerCase().trim() === cat.label.toLowerCase().trim()
    ).length
    return { ...cat, count }
  })

  const getFilteredPosts = () => {
    const selectedFilterObj = filters.find((f) => f.id === activeFilter)
    if (!selectedFilterObj) return []
    if (activeFilter === 'all') return posts
    return posts.filter(
      (post) =>
        post.category &&
        post.category.toLowerCase().trim() === selectedFilterObj.label.toLowerCase().trim()
    )
  }

  const filteredPosts = getFilteredPosts()
  const postsBeforeNewsletter = activeFilter === 'all' ? filteredPosts.slice(0, 3) : filteredPosts
  const postsAfterNewsletter = activeFilter === 'all' ? filteredPosts.slice(3) : []

  return (
    <main className={`${styles.blogPage} page-blog`}>
      <Navbar />

      {/* Hero Section */}
      <header className={styles.heroSection}>
        <div className={styles.container}>
          <CategoryTabs eyebrow="Our Blogs" tabs={filters} activeId={activeFilter} onChange={setActiveFilter} />
        </div>
      </header>

      {/* Blog Cards Grid */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <motion.div layout className={styles.blogGrid}>
            <AnimatePresence mode="popLayout">
              {postsBeforeNewsletter.map((post, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={`${post.id}-${index}`}
                >
                  <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                    <BlogCard
                      title={post.title}
                      category={post.category}
                      readTime={post.readTime}
                      gradient={post.gradient}
                      imageUrl={post.imageUrl}
                    />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Interspersed Newsletter Banner (only on 'Explore All') */}
          {activeFilter === 'all' && (
            <BlogNewsletter />
          )}

          {/* Remainder of the posts */}
          {postsAfterNewsletter.length > 0 && (
            <motion.div layout className={`${styles.blogGrid} ${styles.secondGrid}`}>
              <AnimatePresence mode="popLayout">
                {postsAfterNewsletter.map((post) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={post.id}
                  >
                    <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                      <BlogCard
                        title={post.title}
                        category={post.category}
                        readTime={post.readTime}
                        gradient={post.gradient}
                        imageUrl={post.imageUrl}
                      />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Shared Components */}
      <Testimonials />

      <div id="contact-form">
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
