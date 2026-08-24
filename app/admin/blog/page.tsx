'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import type { BlogPostRecord } from '@/lib/cms-types'

export default function AdminBlogListPage() {
  const [blogs, setBlogs] = useState<BlogPostRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/blogs')
      if (res.ok) setBlogs(await res.json())
    } catch (err) {
      console.error('Error fetching blogs', err)
    } finally {
      setLoading(false)
    }
  }

  const categories = Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)))

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.authorName.toLowerCase().includes(search.toLowerCase())
    const matchesCat = categoryFilter === 'all' || b.category === categoryFilter
    return matchesSearch && matchesCat
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog Articles</h1>
            <p className="text-xs text-gray-500 mt-1">
              Create and edit long-form articles, author profiles, SEO social cards, and publication schedules.
            </p>
          </div>
          <Link href="/admin/blog/new" className="btn-lime text-xs">
            + Create New Post
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by article title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input max-w-sm"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="admin-input max-w-xs"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Articles Table */}
        <div className="admin-card overflow-x-auto p-0 border-[#E5E4E0]">
          {loading ? (
            <div className="py-12 text-center text-xs text-gray-500">Loading articles...</div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">No blog articles match your filters.</div>
          ) : (
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#faf9f4] text-gray-900 border-b border-[#E5E4E0] uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Publish Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E4E0]">
                {filteredBlogs.map((b) => (
                  <tr key={b.id} className="hover:bg-[#faf9f4]/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      <div className="flex items-center gap-3">
                        {b.featuredImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={b.featuredImage}
                            alt={b.featuredImageAlt || b.title}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                          />
                        )}
                        <div>
                          <div className="line-clamp-1">{b.title}</div>
                          <div className="text-[10px] font-mono text-gray-400 mt-0.5">/blog/{b.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-600">{b.category}</td>
                    <td className="py-4 px-4 text-gray-700 font-medium">{b.authorName}</td>
                    <td className="py-4 px-4 text-gray-500">{b.publishDate}</td>
                    <td className="py-4 px-4">
                      <span className={`status-badge ${b.status}`}>{b.status}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/admin/blog/${b.id}`} className="btn-lime text-xs px-3 py-1.5 inline-flex">
                        Edit Post
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
