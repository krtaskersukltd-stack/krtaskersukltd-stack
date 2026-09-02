'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import BlogCard from '@/components/BlogCard'
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
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [subscribeError, setSubscribeError] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    setSubscribeError(null)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setSubscribed(true)
        setEmail('')
      } else {
        setSubscribeError(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch {
      setSubscribeError('Connection error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const getFilteredPosts = () => {
    const selectedFilterObj = filters.find((f) => f.id === activeFilter)
    if (!selectedFilterObj) return []
    if (activeFilter === 'all') return posts
    return posts.filter(
      (p) => p.category.toLowerCase() === selectedFilterObj.label.toLowerCase()
    )
  }

  const filteredPosts = getFilteredPosts()
  const gridPosts = activeFilter === 'all'
    ? [...filteredPosts, ...filteredPosts.slice(0, 3)]
    : filteredPosts

  // In the layout, we intersperse a Newsletter block in the middle of "Explore All"
  // For instance, after the first 6 posts, we render the Newsletter banner
  const postsBeforeNewsletter = gridPosts
  const postsAfterNewsletter = activeFilter === 'all' ? gridPosts.slice(0, 6) : []

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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={styles.newsletterBanner}
            >
              <div className={styles.newsletterContent}>
                <div className={styles.leftNews}>
                  <span className={styles.newsTag}>Spam Free Newsletter</span>
                  <h2 className={styles.newsTitle}>
                    Receive The Most Up To Date <span className={styles.yellowText}>Insights & Strategies</span>
                  </h2>
                </div>
                <div className={styles.rightNews}>
                  {subscribed ? (
                    <p className={styles.subText}>🎉 Thank you for subscribing!</p>
                  ) : (
                    <form onSubmit={handleSubscribe} className={styles.formRow}>
                      <input
                        type="email"
                        placeholder="Enter your Email Address here"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                        disabled={submitting}
                      />
                      <button type="submit" className={styles.btnSubscribe} disabled={submitting}>
                        {submitting ? 'Subscribing...' : 'Subscribe Now'}
                      </button>
                      {subscribeError && <p style={{ color: '#ff6b6b', fontSize: '0.8rem', width: '100%', marginTop: '6px' }}>{subscribeError}</p>}
                    </form>
                  )}
                </div>
              </div>
              <div className={styles.circlesDesign}>
                <img className={styles.orbitImage} src="/images/blog-newsletter/circle.png" alt="Digital marketing platforms" />
                <img className={styles.centerVector} src="/images/blog-newsletter/Vector.svg" alt="Growth analytics" />
              </div>
            </motion.div>
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
