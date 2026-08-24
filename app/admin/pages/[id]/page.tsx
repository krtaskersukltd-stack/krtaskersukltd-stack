'use client'

import { useState, useEffect, use } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import SEOHealthPanel from '@/components/admin/SEOHealthPanel'
import SERPPreview from '@/components/admin/SERPPreview'
import StickySaveBar from '@/components/admin/StickySaveBar'
import MediaPickerModal from '@/components/admin/MediaPickerModal'
import Link from 'next/link'
import type { PageRecord, ContentKeyItem } from '@/lib/cms-types'

export default function AdminPageEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const pageId = resolvedParams.id

  const [page, setPage] = useState<PageRecord | null>(null)
  const [allPages, setAllPages] = useState<PageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'og'>('content')
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  useEffect(() => {
    fetchPageData()
  }, [pageId])

  const fetchPageData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/pages')
      if (res.ok) {
        const data: PageRecord[] = await res.json()
        setAllPages(data)
        const target = data.find((p) => p.id === pageId)
        if (target) setPage(target)
      }
    } catch (err) {
      console.error('Error fetching page', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!page) return
    setSaving(true)
    setFeedback('')
    try {
      const updatedList = allPages.map((p) => (p.id === page.id ? { ...page, updatedAt: new Date().toISOString() } : p))
      const res = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedList),
      })

      if (res.ok) {
        setAllPages(updatedList)
        setIsDirty(false)
        setFeedback('Page content and SEO settings saved successfully!')
        setTimeout(() => setFeedback(''), 4000)
      } else {
        setFeedback('Failed to save changes. Please try again.')
      }
    } catch {
      setFeedback('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  const updateSeoField = (field: string, value: any) => {
    if (!page) return
    setPage({
      ...page,
      seo: { ...page.seo, [field]: value },
    })
    setIsDirty(true)
  }

  const updateContentKey = (index: number, val: string) => {
    if (!page) return
    const updatedKeys = [...(page.contentKeys || [])]
    if (updatedKeys[index]) {
      updatedKeys[index].value = val
      setPage({ ...page, contentKeys: updatedKeys })
      setIsDirty(true)
    }
  }

  const addContentKey = () => {
    if (!page) return
    const newKey: ContentKeyItem = {
      key: `${page.routeKey}.custom.${Date.now()}`,
      label: 'New Content Field',
      value: '',
      group: 'General',
    }
    setPage({ ...page, contentKeys: [...(page.contentKeys || []), newKey] })
    setIsDirty(true)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-12 text-center text-xs text-gray-500">Loading page record...</div>
      </AdminLayout>
    )
  }

  if (!page) {
    return (
      <AdminLayout>
        <div className="text-center py-12 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Page Not Found</h2>
          <Link href="/admin/pages" className="btn-secondary text-xs">
            Back to Pages List
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/admin/pages" className="text-xs font-semibold text-[#0C4651] hover:underline">
                ← Back to Pages
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-500 font-mono">ID: {page.id}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">{page.internalName}</h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://www.krtaskerdigital.com/${page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs px-3.5 py-2"
            >
              Preview Public Page ↗
            </a>
            <button onClick={handleSave} disabled={saving} className="btn-lime text-xs px-5 py-2">
              {saving ? 'Saving...' : 'Save Changes'}
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

        {/* System Controlled Route Warning */}
        {page.isSystemRoute && (
          <div className="p-4 bg-[#0C4651]/5 border border-[#0C4651]/20 rounded-xl text-xs text-[#0C4651] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0C4651]" />
              <div>
                <span className="font-bold block">System-Controlled Route ({page.routeKey})</span>
                <span className="text-gray-600">The public slug URL is locked by the codebase router to maintain application navigation.</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#0C4651] text-[#E6FF2A] font-bold text-[10px] uppercase tracking-wider rounded-md">
              Slug Locked
            </span>
          </div>
        )}

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-2 border-b border-[#E5E4E0] pb-2">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'content' ? 'bg-[#0C4651] text-[#E6FF2A]' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Structured Content Keys ({page.contentKeys?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'seo' ? 'bg-[#0C4651] text-[#E6FF2A]' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            SEO & Search Meta
          </button>
          <button
            onClick={() => setActiveTab('og')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'og' ? 'bg-[#0C4651] text-[#E6FF2A]' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Open Graph & Social Sharing
          </button>
        </div>

        {/* Editor Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* TAB 1: CONTENT KEYS */}
            {activeTab === 'content' && (
              <div className="admin-card space-y-6 border-[#E5E4E0]">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Editable Page Content Keys</h3>
                    <p className="text-xs text-gray-500">Edit content strings without breaking the frontend UI structure.</p>
                  </div>
                  <button onClick={addContentKey} className="btn-secondary text-xs">
                    + Add Field
                  </button>
                </div>

                {(!page.contentKeys || page.contentKeys.length === 0) ? (
                  <p className="text-xs text-gray-400 py-6 text-center">No custom content keys defined for this route.</p>
                ) : (
                  <div className="space-y-4">
                    {page.contentKeys.map((item, idx) => (
                      <div key={idx} className="p-4 bg-[#faf9f4] border border-[#efeee9] rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-800">{item.label}</label>
                          <span className="text-[10px] font-mono text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-200">
                            {item.key}
                          </span>
                        </div>
                        {item.value.length > 80 ? (
                          <textarea
                            rows={3}
                            value={item.value}
                            onChange={(e) => updateContentKey(idx, e.target.value)}
                            className="admin-input"
                          />
                        ) : (
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => updateContentKey(idx, e.target.value)}
                            className="admin-input"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SEO META */}
            {activeTab === 'seo' && (
              <div className="admin-card space-y-6 border-[#E5E4E0]">
                <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                  Search Engine Optimization Settings
                </h3>

                {/* Public Title */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-800">Public Meta Title</label>
                    <span className="text-[10px] text-gray-500 font-semibold">{page.seo?.metaTitle?.length || 0} / 60 Chars</span>
                  </div>
                  <input
                    type="text"
                    value={page.seo?.metaTitle || ''}
                    onChange={(e) => updateSeoField('metaTitle', e.target.value)}
                    placeholder="E.g. Premier Web Design & Digital Engineering | KR Tasker Digital"
                    className="admin-input"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-800">Meta Description</label>
                    <span className="text-[10px] text-gray-500 font-semibold">{page.seo?.metaDescription?.length || 0} / 160 Chars</span>
                  </div>
                  <textarea
                    rows={3}
                    value={page.seo?.metaDescription || ''}
                    onChange={(e) => updateSeoField('metaDescription', e.target.value)}
                    placeholder="Brief description summarizing the page content for search engines..."
                    className="admin-input"
                  />
                </div>

                {/* H1 Heading */}
                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">H1 Heading</label>
                  <input
                    type="text"
                    value={page.seo?.h1 || ''}
                    onChange={(e) => updateSeoField('h1', e.target.value)}
                    className="admin-input"
                  />
                </div>

                {/* Focus Keyword & Canonical */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Focus Keyword (Internal Audit)</label>
                    <input
                      type="text"
                      value={page.seo?.focusKeyword || ''}
                      onChange={(e) => updateSeoField('focusKeyword', e.target.value)}
                      placeholder="e.g. web design agency"
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Canonical URL Override</label>
                    <input
                      type="text"
                      value={page.seo?.canonicalUrl || ''}
                      onChange={(e) => updateSeoField('canonicalUrl', e.target.value)}
                      placeholder="https://www.krtaskerdigital.com/..."
                      className="admin-input"
                    />
                  </div>
                </div>

                {/* Index & Follow Directives */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#faf9f4] border border-[#efeee9] rounded-xl">
                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Robots Index Status</label>
                    <select
                      value={page.seo?.indexStatus || 'index'}
                      onChange={(e) => updateSeoField('indexStatus', e.target.value)}
                      className="admin-input"
                    >
                      <option value="index">Index (Allow Search Indexing)</option>
                      <option value="noindex">Noindex (Hide from Google)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Robots Follow Links</label>
                    <select
                      value={page.seo?.followStatus || 'follow'}
                      onChange={(e) => updateSeoField('followStatus', e.target.value)}
                      className="admin-input"
                    >
                      <option value="follow">Follow Links</option>
                      <option value="nofollow">Nofollow Links</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: OPEN GRAPH */}
            {activeTab === 'og' && (
              <div className="admin-card space-y-6 border-[#E5E4E0]">
                <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                  Open Graph & Social Sharing
                </h3>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">OG Title</label>
                  <input
                    type="text"
                    value={page.seo?.ogTitle || page.seo?.metaTitle || ''}
                    onChange={(e) => updateSeoField('ogTitle', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">OG Description</label>
                  <textarea
                    rows={3}
                    value={page.seo?.ogDescription || page.seo?.metaDescription || ''}
                    onChange={(e) => updateSeoField('ogDescription', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">OG Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={page.seo?.ogImage || ''}
                      onChange={(e) => updateSeoField('ogImage', e.target.value)}
                      placeholder="https://..."
                      className="admin-input"
                    />
                    <button onClick={() => setIsMediaModalOpen(true)} className="btn-secondary text-xs">
                      Media Library
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Diagnostics Column */}
          <div className="space-y-6">
            <SEOHealthPanel seo={page.seo} />
            <SERPPreview
              title={page.seo?.metaTitle}
              url={`https://www.krtaskerdigital.com/${page.slug}`}
              description={page.seo?.metaDescription}
            />
          </div>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url) => updateSeoField('ogImage', url)}
      />

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={handleSave} onCancel={fetchPageData} />
    </AdminLayout>
  )
}
