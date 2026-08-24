'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import type { PageRecord } from '@/lib/cms-types'

export default function AdminPagesListPage() {
  const [pages, setPages] = useState<PageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

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

  const filteredPages = pages.filter(
    (p) =>
      p.internalName.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.routeKey.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Website Content & Pages</h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage system routes, page content keys, and search engine optimization (SEO) metadata.
            </p>
          </div>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search pages by name or slug..."
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
                  <th className="py-3.5 px-6">Internal Name</th>
                  <th className="py-3.5 px-4">Route Type</th>
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
                          System Route
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-gray-100 text-gray-600 font-medium text-[10px]">
                          Dynamic Route
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
                      <Link href={`/admin/pages/${page.id}`} className="btn-lime text-xs px-3 py-1.5 inline-flex">
                        Edit Content & SEO
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
