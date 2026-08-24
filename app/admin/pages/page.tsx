'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import type { PageRecord } from '@/lib/cms-types'

export default function AdminPagesListPage() {
  const [pages, setPages] = useState<PageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'system' | 'cms'>('all')

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/pages')
      if (res.ok) setPages(await res.json())
    } catch (err) {
      console.error('Error loading pages', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This will remove the page from the website.`)) return

    const updated = pages.filter((p) => p.id !== id)
    try {
      const res = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (res.ok) {
        setPages(updated)
      } else {
        alert('Failed to delete page.')
      }
    } catch {
      alert('Error deleting page.')
    }
  }

  const filteredPages = pages.filter((p) => {
    const matchesSearch =
      p.internalName.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.routeKey.toLowerCase().includes(search.toLowerCase())

    if (!matchesSearch) return false
    if (filterType === 'system') return p.isSystemRoute
    if (filterType === 'cms') return !p.isSystemRoute
    return true
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Website Content & Pages</h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage existing pages, create new organic SEO landing pages, and configure metadata.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/pages/new" className="btn-lime text-xs px-4 py-2">
              + Add New Page
            </Link>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E5E4E0]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filterType === 'all' ? 'bg-[#0C4651] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Pages ({pages.length})
            </button>
            <button
              onClick={() => setFilterType('system')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filterType === 'system' ? 'bg-[#0C4651] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              System Pages ({pages.filter((p) => p.isSystemRoute).length})
            </button>
            <button
              onClick={() => setFilterType('cms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filterType === 'cms' ? 'bg-[#0C4651] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              CMS Created ({pages.filter((p) => !p.isSystemRoute).length})
            </button>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search pages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        {/* Pages Table */}
        <div className="admin-card overflow-x-auto p-0 border-[#E5E4E0]">
          {loading ? (
            <div className="py-12 text-center text-xs text-gray-500">Loading website pages...</div>
          ) : filteredPages.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">No pages found matching your search.</div>
          ) : (
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#faf9f4] text-gray-900 border-b border-[#E5E4E0] uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Page Name</th>
                  <th className="py-3.5 px-4">Template / Type</th>
                  <th className="py-3.5 px-4">Public Slug</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Indexing</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E4E0]">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-[#faf9f4]/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      <div>{page.internalName}</div>
                      <div className="text-[10px] font-normal text-gray-400 mt-0.5">{page.publicTitle}</div>
                    </td>
                    <td className="py-4 px-4">
                      {page.isSystemRoute ? (
                        <span className="px-2.5 py-1 rounded bg-[#0C4651]/10 text-[#0C4651] font-bold text-[10px] uppercase tracking-wider">
                          SYSTEM PAGE
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-[#E6FF2A]/40 text-[#191e00] font-bold text-[10px] uppercase tracking-wider">
                          {page.templateKey || 'CMS PAGE'}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-600">/{page.slug || ''}</td>
                    <td className="py-4 px-4">
                      <span className={`status-badge ${page.status}`}>{page.status}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          page.seo?.indexStatus === 'index'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {page.seo?.indexStatus || 'index'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/pages/${page.id}`} className="btn-lime text-xs px-3 py-1.5 inline-flex">
                          Edit
                        </Link>

                        <Link
                          href={`/admin/pages/new?duplicateFrom=${page.id}`}
                          className="btn-secondary text-xs px-2.5 py-1.5 inline-flex"
                        >
                          Duplicate
                        </Link>

                        {!page.isSystemRoute && (
                          <button
                            onClick={() => handleDelete(page.id, page.internalName)}
                            className="text-xs font-semibold text-red-600 hover:underline px-2 py-1"
                          >
                            Delete
                          </button>
                        )}
                      </div>
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
