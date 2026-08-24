'use client'

import { useState, useEffect, use } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import SEOHealthPanel from '@/components/admin/SEOHealthPanel'
import SERPPreview from '@/components/admin/SERPPreview'
import StickySaveBar from '@/components/admin/StickySaveBar'
import MediaPickerModal from '@/components/admin/MediaPickerModal'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { BlogPostRecord } from '@/lib/cms-types'

export default function AdminBlogPostEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const blogId = resolvedParams.id
  const isNew = blogId === 'new'
  const router = useRouter()

  const [post, setPost] = useState<BlogPostRecord>({
    id: `post-${Date.now()}`,
    slug: 'the-future-of-headless-cms-enterprise',
    title: 'The Future of Headless CMS in Enterprise Architecture',
    category: 'Architecture',
    authorName: 'Sarah Jenkins (Admin)',
    authorRole: 'Technical Editor',
    status: 'draft',
    publishDate: new Date().toISOString().split('T')[0],
    excerpt: 'As digital ecosystems grow increasingly complex, the shift towards decoupled architectures represents more than just a technical evolution...',
    readingTime: '4 Min',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    featuredImageAlt: 'Abstract visualization of enterprise architecture',
    content: `As digital ecosystems grow increasingly complex, the shift towards decoupled architectures represents more than just a technical evolution—it's a strategic imperative for agencies delivering high-performance platforms.\n\nIn this breakdown, we explore why traditional monolithic structures are failing to meet the agility demands of omnichannel content delivery, and how implementing a headless CMS approach can significantly reduce time-to-market for enterprise clients while future-proofing their tech stack against emergent presentation layers.\n\n### The Omnichannel Mandate\n\nToday's content isn't confined to a web browser. It lives on mobile apps, smart watches, digital signage, and IoT devices. A decoupled approach allows content teams to structure data once and deploy it anywhere via robust APIs.`,
    tags: ['Headless CMS', 'Enterprise', 'API'],
    seo: {
      metaTitle: 'The Future of Headless CMS in Enterprise Architecture',
      metaDescription: 'Discover why enterprise organizations are shifting towards decoupled headless CMS architectures.',
      h1: 'The Future of Headless CMS in Enterprise Architecture',
      focusKeyword: 'Headless CMS',
      indexStatus: 'index',
      followStatus: 'follow',
    },
    updatedAt: new Date().toISOString(),
  })

  const [allBlogs, setAllBlogs] = useState<BlogPostRecord[]>([])
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content')
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)
  const [newTagInput, setNewTagInput] = useState('')

  // Category List State
  const defaultCategories = ['Development', 'Architecture', 'Digital Marketing', 'Case Studies', 'Branding', 'Studio Life']
  const [categories, setCategories] = useState<string[]>(defaultCategories)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')

  useEffect(() => {
    fetchBlogs()
  }, [blogId])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/cms/blogs')
      if (res.ok) {
        const data: BlogPostRecord[] = await res.json()
        setAllBlogs(data)
        if (!isNew) {
          const target = data.find((b) => b.id === blogId)
          if (target) {
            // Parse content if JSON
            let rawContent = target.content
            if (typeof rawContent !== 'string') {
              rawContent = JSON.stringify(rawContent)
            }
            setPost({ ...target, content: rawContent })
          }
        }
      }
    } catch (err) {
      console.error('Error fetching blog', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (overrideStatus?: 'published' | 'draft') => {
    setSaving(true)
    setFeedback('')
    const targetPost = overrideStatus ? { ...post, status: overrideStatus } : post

    try {
      let updatedList: BlogPostRecord[]
      if (isNew) {
        updatedList = [targetPost, ...allBlogs]
      } else {
        updatedList = allBlogs.map((b) => (b.id === targetPost.id ? { ...targetPost, updatedAt: new Date().toISOString() } : b))
      }

      const res = await fetch('/api/cms/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedList),
      })

      if (res.ok) {
        setIsDirty(false)
        setFeedback(`Article ${targetPost.status === 'published' ? 'published' : 'saved'} successfully!`)
        if (isNew) router.push(`/admin/blog/${targetPost.id}`)
      } else {
        setFeedback('Failed to save article.')
      }
    } catch {
      setFeedback('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  // Calculate Reading Time based on word count
  const wordCount = post.content ? post.content.split(/\s+/).filter(Boolean).length : 0
  const estReadMinutes = Math.max(1, Math.ceil(wordCount / 200))

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !post.tags.includes(trimmed)) {
      setPost({ ...post, tags: [...post.tags, trimmed] })
      setIsDirty(true)
    }
    setNewTagInput('')
  }

  const removeTag = (tagToRemove: string) => {
    setPost({ ...post, tags: post.tags.filter((t) => t !== tagToRemove) })
    setIsDirty(true)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-12 text-center text-xs text-gray-500">Loading blog post details...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header matching Stitch bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <Link href="/admin/blog" className="hover:text-[#0C4651]">
                ← Blog
              </Link>
              <span>›</span>
              <span className="text-gray-900 font-bold">{isNew ? 'Create Post' : 'Edit Post'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://www.krtaskerdigital.com/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs px-4 py-2"
            >
              Preview
            </a>
            <button
              onClick={() => handleSave('published')}
              disabled={saving}
              className="btn-lime text-xs px-6 py-2 shadow-md"
            >
              {saving ? 'Publishing...' : '↑ Publish'}
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`p-3 rounded-lg text-xs font-medium ${
            feedback.includes('successfully') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {feedback}
          </div>
        )}

        {/* Title & Slug Header Container */}
        <div className="admin-card border-[#E5E4E0] space-y-3">
          <input
            type="text"
            value={post.title}
            onChange={(e) => {
              setPost({ ...post, title: e.target.value })
              setIsDirty(true)
            }}
            placeholder="Enter article title here..."
            className="w-full text-2xl font-bold text-gray-900 outline-none placeholder:text-gray-300"
          />

          <div className="flex items-center gap-2 bg-[#faf9f4] border border-[#efeee9] px-3 py-1.5 rounded-lg text-xs max-w-xl">
            <span className="font-mono text-gray-400">/blog/</span>
            <input
              type="text"
              value={post.slug}
              onChange={(e) => {
                setPost({ ...post, slug: e.target.value })
                setIsDirty(true)
              }}
              className="font-mono text-gray-700 bg-transparent outline-none flex-1"
            />
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(`https://www.krtaskerdigital.com/blog/${post.slug}`)}
              className="text-gray-400 hover:text-gray-700 font-medium text-[10px]"
              title="Copy URL"
            >
              📋
            </button>
          </div>
        </div>

        {/* Main Editor Tabs & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Editor Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs selection */}
            <div className="flex items-center gap-2 border-b border-[#E5E4E0] pb-2">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                  activeTab === 'content' ? 'bg-[#0C4651] text-[#E6FF2A]' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Article Content
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                  activeTab === 'seo' ? 'bg-[#0C4651] text-[#E6FF2A]' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                SEO & Social
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                  activeTab === 'settings' ? 'bg-[#0C4651] text-[#E6FF2A]' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Settings
              </button>
            </div>

            {/* TAB 1: ARTICLE CONTENT */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                {/* Rich Text Editor Box */}
                <div className="admin-card p-0 overflow-hidden border-[#E5E4E0]">
                  {/* Toolbar */}
                  <div className="bg-[#faf9f4] border-b border-[#E5E4E0] p-3 flex items-center gap-2 flex-wrap text-xs text-gray-700 font-medium">
                    <select className="bg-white border border-gray-200 rounded px-2 py-1 text-xs">
                      <option>Paragraph</option>
                      <option>Heading 2</option>
                      <option>Heading 3</option>
                      <option>Quote Block</option>
                    </select>
                    <div className="h-4 w-px bg-gray-300 mx-1" />
                    <button className="px-2 py-1 rounded hover:bg-gray-200 font-bold">B</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-200 italic">I</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-200 underline">U</button>
                    <div className="h-4 w-px bg-gray-300 mx-1" />
                    <button className="px-2 py-1 rounded hover:bg-gray-200">🔗 Link</button>
                    <button onClick={() => setIsMediaModalOpen(true)} className="px-2 py-1 rounded hover:bg-gray-200">
                      🖼️ Image
                    </button>
                    <button className="px-2 py-1 rounded hover:bg-gray-200">💬 Quote</button>
                    <div className="h-4 w-px bg-gray-300 mx-1" />
                    <button className="px-2 py-1 rounded hover:bg-gray-200">• Bullet List</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-200">1. Numbered</button>
                  </div>

                  <textarea
                    rows={14}
                    value={post.content}
                    onChange={(e) => {
                      setPost({ ...post, content: e.target.value })
                      setIsDirty(true)
                    }}
                    placeholder="Write article content here..."
                    className="w-full p-6 outline-none text-sm text-gray-800 leading-relaxed font-sans"
                  />
                </div>

                {/* Excerpt Box */}
                <div className="admin-card border-[#E5E4E0] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">Post Excerpt</label>
                    <span className="text-[10px] text-gray-500 font-semibold">{post.excerpt?.length || 0} / 160 characters</span>
                  </div>
                  <textarea
                    rows={3}
                    value={post.excerpt}
                    onChange={(e) => {
                      setPost({ ...post, excerpt: e.target.value })
                      setIsDirty(true)
                    }}
                    placeholder="Write a brief summary for blog listings and SEO..."
                    className="admin-input"
                  />
                </div>

                {/* Author / Status / Date row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="admin-card p-4 border-[#E5E4E0]">
                    <label className="text-xs font-bold text-gray-800 block mb-1">Author</label>
                    <input
                      type="text"
                      value={post.authorName}
                      onChange={(e) => {
                        setPost({ ...post, authorName: e.target.value })
                        setIsDirty(true)
                      }}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-card p-4 border-[#E5E4E0]">
                    <label className="text-xs font-bold text-gray-800 block mb-1">Status</label>
                    <select
                      value={post.status}
                      onChange={(e) => {
                        setPost({ ...post, status: e.target.value as any })
                        setIsDirty(true)
                      }}
                      className="admin-input font-bold"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="admin-card p-4 border-[#E5E4E0]">
                    <label className="text-xs font-bold text-gray-800 block mb-1">Publish Date</label>
                    <input
                      type="date"
                      value={post.publishDate}
                      onChange={(e) => {
                        setPost({ ...post, publishDate: e.target.value })
                        setIsDirty(true)
                      }}
                      className="admin-input"
                    />
                  </div>
                </div>

                {/* Estimated Reading Time Display matching Stitch */}
                <div className="admin-card border-[#E5E4E0] p-4 flex items-center justify-between bg-[#faf9f4]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm">
                      ⏱️
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block uppercase tracking-wider">Est. Reading Time</span>
                      <span className="text-[11px] text-gray-500">Based on word count ({wordCount} words)</span>
                    </div>
                  </div>
                  <div className="text-xl font-black text-[#0C4651]">{estReadMinutes} Min</div>
                </div>
              </div>
            )}

            {/* TAB 2: SEO & SOCIAL */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <SEOHealthPanel seo={post.seo} />
                <SERPPreview
                  title={post.seo?.metaTitle || post.title}
                  url={`https://www.krtaskerdigital.com/blog/${post.slug}`}
                  description={post.seo?.metaDescription || post.excerpt}
                />
              </div>
            )}

            {/* TAB 3: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="admin-card border-[#E5E4E0] space-y-4">
                <h3 className="font-bold text-gray-900 text-base pb-2 border-b border-gray-100">Post Configuration</h3>
                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Author Role Title</label>
                  <input
                    type="text"
                    value={post.authorRole}
                    onChange={(e) => {
                      setPost({ ...post, authorRole: e.target.value })
                      setIsDirty(true)
                    }}
                    className="admin-input"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar matching Stitch (Featured Image, Categories, Tags) */}
          <div className="space-y-6">
            {/* Featured Image Card */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">Featured Image</h3>
                <button onClick={() => setIsMediaModalOpen(true)} className="text-xs text-[#0C4651] font-semibold hover:underline">
                  Change
                </button>
              </div>

              {post.featuredImage ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  onClick={() => setIsMediaModalOpen(true)}
                  className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:border-[#0C4651] bg-[#faf9f4]"
                >
                  <span className="text-xs text-gray-500 font-semibold">Select Featured Image</span>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">ALT TEXT</label>
                <input
                  type="text"
                  value={post.featuredImageAlt}
                  onChange={(e) => {
                    setPost({ ...post, featuredImageAlt: e.target.value })
                    setIsDirty(true)
                  }}
                  placeholder="Abstract visualization of..."
                  className="admin-input text-xs"
                />
              </div>
            </div>

            {/* Categories Card */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <h3 className="font-bold text-gray-900 text-sm pb-2 border-b border-gray-100">Categories</h3>

              <input
                type="text"
                placeholder="Filter categories..."
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="admin-input text-xs"
              />

              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {categories
                  .filter((c) => c.toLowerCase().includes(categoryFilter.toLowerCase()))
                  .map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="article-category"
                        checked={post.category === cat}
                        onChange={() => {
                          setPost({ ...post, category: cat })
                          setIsDirty(true)
                        }}
                        className="rounded text-[#0C4651] focus:ring-[#0C4651]"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
              </div>

              <div className="pt-2 border-t border-gray-100 flex gap-2">
                <input
                  type="text"
                  placeholder="New category..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="admin-input text-xs py-1.5"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
                      setCategories([...categories, newCategoryName.trim()])
                      setPost({ ...post, category: newCategoryName.trim() })
                      setNewCategoryName('')
                      setIsDirty(true)
                    }
                  }}
                  className="btn-secondary text-[11px] px-3 py-1.5 flex-shrink-0"
                >
                  + ADD
                </button>
              </div>
            </div>

            {/* Tags Card */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <h3 className="font-bold text-gray-900 text-sm pb-2 border-b border-gray-100">Tags</h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add tags separated by enter..."
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag(newTagInput)
                    }
                  }}
                  className="admin-input text-xs"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#efeee9] text-gray-800 text-xs font-semibold rounded-lg border border-[#e3e3de]"
                  >
                    {t}
                    <button onClick={() => removeTag(t)} className="text-gray-500 hover:text-black font-bold text-xs">
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url, alt) => {
          setPost({ ...post, featuredImage: url, featuredImageAlt: alt || post.featuredImageAlt })
          setIsDirty(true)
        }}
      />

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={() => handleSave()} onCancel={fetchBlogs} />
    </AdminLayout>
  )
}
