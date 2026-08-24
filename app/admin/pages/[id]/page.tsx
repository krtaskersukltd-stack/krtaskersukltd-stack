'use client'

import { useState, useEffect, use } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import SEOHealthPanel from '@/components/admin/SEOHealthPanel'
import SERPPreview from '@/components/admin/SERPPreview'
import StickySaveBar from '@/components/admin/StickySaveBar'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import type { PageRecord, PageSection, PageSectionType, PageTemplate } from '@/lib/cms-types'

export default function AdminPageEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const pageId = resolvedParams.id
  const isNew = pageId === 'new'
  const router = useRouter()
  const searchParams = useSearchParams()
  const duplicateFrom = searchParams.get('duplicateFrom')

  const [page, setPage] = useState<PageRecord>({
    id: `page-${Date.now()}`,
    routeKey: `page-${Date.now()}`,
    internalName: '',
    publicTitle: '',
    slug: '',
    publicUrl: '',
    isSystemRoute: false,
    templateKey: 'standard',
    parentSlug: '',
    status: 'published',
    seo: {
      metaTitle: '',
      metaDescription: '',
      h1: '',
      focusKeyword: '',
      indexStatus: 'index',
      followStatus: 'follow',
    },
    contentKeys: [],
    sections: [],
    updatedAt: new Date().toISOString(),
  })
  const [allPages, setAllPages] = useState<PageRecord[]>([])
  const [originalSlug, setOriginalSlug] = useState('')
  const [loading, setLoading] = useState(!isNew || Boolean(duplicateFrom))
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [activeTab, setActiveTab] = useState<'general' | 'sections' | 'seo'>('general')

  useEffect(() => {
    fetchPages()
  }, [pageId, duplicateFrom])

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/cms/pages')
      if (res.ok) {
        const data: PageRecord[] = await res.json()
        setAllPages(data)
        if (!isNew) {
          const target = data.find((p) => p.id === pageId)
          if (target) {
            setPage(target)
            setOriginalSlug(target.slug)
          }
        } else if (duplicateFrom) {
          const source = data.find((p) => p.id === duplicateFrom)
          if (source) {
            setPage({
              ...source,
              id: `page-${Date.now()}`,
              routeKey: `${source.slug}-copy-${Date.now()}`,
              internalName: `${source.internalName} (Copy)`,
              slug: `${source.slug}-copy`,
              isSystemRoute: false,
              status: 'draft',
              updatedAt: new Date().toISOString(),
            })
            setIsDirty(true)
          }
        }
      }
    } catch (err) {
      console.error('Error fetching pages', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback('')
    try {
      // Auto-301 redirect generation if slug changed on a published page
      if (!isNew && originalSlug && page.slug !== originalSlug && page.status === 'published') {
        try {
          const resRed = await fetch('/api/cms/redirects')
          if (resRed.ok) {
            const redirects = await resRed.json()
            const newRed = {
              id: `red-${Date.now()}`,
              sourcePath: originalSlug.startsWith('/') ? originalSlug : `/${originalSlug}`,
              destination: page.slug.startsWith('/') ? page.slug : `/${page.slug}`,
              statusCode: 301 as const,
              isActive: true,
              updatedAt: new Date().toISOString(),
            }
            await fetch('/api/cms/redirects', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify([newRed, ...redirects]),
            })
          }
        } catch (err) {
          console.warn('Auto redirect creation note:', err)
        }
      }

      const updatedPage = {
        ...page,
        publicUrl: `https://www.krtaskerdigital.com/${page.slug}`,
        updatedAt: new Date().toISOString(),
      }

      let updatedList: PageRecord[]
      if (isNew) {
        updatedList = [updatedPage, ...allPages]
      } else {
        updatedList = allPages.map((p) => (p.id === page.id ? updatedPage : p))
      }

      const res = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedList),
      })

      if (res.ok) {
        setIsDirty(false)
        setFeedback('Page saved successfully!')
        if (isNew) router.push(`/admin/pages/${updatedPage.id}`)
      } else {
        setFeedback('Failed to save page.')
      }
    } catch {
      setFeedback('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  const addSection = (type: PageSectionType) => {
    const newSec: PageSection = {
      id: `sec-${Date.now()}`,
      type,
      sortOrder: (page.sections?.length || 0) + 1,
      isEnabled: true,
      data: {
        title: type === 'hero' ? 'Section Heading' : 'Content Title',
        content: 'Add your section content details here...',
      },
    }
    setPage({ ...page, sections: [...(page.sections || []), newSec] })
    setIsDirty(true)
  }

  const removeSection = (id: string) => {
    setPage({ ...page, sections: (page.sections || []).filter((s) => s.id !== id) })
    setIsDirty(true)
  }

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1
    const list = [...(page.sections || [])]
    if (target < 0 || target >= list.length) return
    const temp = list[index]
    list[index] = list[target]
    list[target] = temp
    setPage({ ...page, sections: list })
    setIsDirty(true)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-12 text-center text-xs text-gray-500">Loading page data...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/admin/pages" className="text-xs font-semibold text-[#0C4651] hover:underline">
              ← Back to Pages
            </Link>
            <div className="flex items-center gap-3 mt-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {isNew ? 'Add New Page' : `Edit Page: ${page.internalName}`}
              </h1>
              {page.isSystemRoute && (
                <span className="px-2.5 py-1 rounded bg-[#0C4651]/10 text-[#0C4651] font-bold text-[10px] uppercase tracking-wider">
                  SYSTEM PAGE (Protected)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleSave} disabled={saving} className="btn-lime text-xs px-5 py-2">
              {saving ? 'Saving...' : 'Save Page'}
            </button>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-lg text-xs font-medium ${
              feedback.includes('successfully') ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {feedback}
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex items-center border-b border-[#E5E4E0] gap-4">
          <button
            onClick={() => setActiveTab('general')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'general'
                ? 'border-[#0C4651] text-[#0C4651]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            General & Template
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'sections'
                ? 'border-[#0C4651] text-[#0C4651]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Section Builder ({(page.sections || []).length})
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'seo'
                ? 'border-[#0C4651] text-[#0C4651]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            SEO & Social Meta
          </button>
        </div>

        {/* Tab 1: General & Template */}
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="admin-card space-y-4 border-[#E5E4E0]">
                <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">Page Identity</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Page Name (Internal)</label>
                    <input
                      type="text"
                      value={page.internalName}
                      onChange={(e) => {
                        setPage({ ...page, internalName: e.target.value })
                        setIsDirty(true)
                      }}
                      placeholder="e.g. Shopify SEO Agency"
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Public Page Title</label>
                    <input
                      type="text"
                      value={page.publicTitle}
                      onChange={(e) => {
                        setPage({ ...page, publicTitle: e.target.value })
                        setIsDirty(true)
                      }}
                      placeholder="e.g. Shopify SEO Agency London | KR Tasker Digital"
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">URL Slug</label>
                    <input
                      type="text"
                      disabled={page.isSystemRoute}
                      value={page.slug}
                      onChange={(e) => {
                        setPage({ ...page, slug: e.target.value })
                        setIsDirty(true)
                      }}
                      placeholder="e.g. shopify-seo-agency"
                      className="admin-input font-mono disabled:opacity-50"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">
                      Live URL: https://www.krtaskerdigital.com/{page.slug}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Page Template</label>
                    <select
                      value={page.templateKey || 'standard'}
                      onChange={(e) => {
                        setPage({ ...page, templateKey: e.target.value as PageTemplate })
                        setIsDirty(true)
                      }}
                      className="admin-input"
                    >
                      <option value="standard">Standard Page</option>
                      <option value="seo_landing">SEO Landing Page</option>
                      <option value="service">Service Page</option>
                      <option value="legal">Legal / Text Page</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Parent Page Slug (Optional)</label>
                    <input
                      type="text"
                      value={page.parentSlug || ''}
                      onChange={(e) => {
                        setPage({ ...page, parentSlug: e.target.value })
                        setIsDirty(true)
                      }}
                      placeholder="e.g. seo-services"
                      className="admin-input font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Publish Status</label>
                    <select
                      value={page.status}
                      onChange={(e) => {
                        setPage({ ...page, status: e.target.value as any })
                        setIsDirty(true)
                      }}
                      className="admin-input"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <SEOHealthPanel seo={page.seo} />
              <SERPPreview
                title={page.seo?.metaTitle || page.publicTitle || page.internalName}
                url={`https://www.krtaskerdigital.com/${page.slug}`}
                description={page.seo?.metaDescription}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Controlled Section Builder */}
        {activeTab === 'sections' && (
          <div className="space-y-6">
            <div className="admin-card border-[#E5E4E0] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Controlled Page Sections</h3>
                  <p className="text-xs text-gray-500">
                    Add approved UI section components matching the KR Tasker public design system.
                  </p>
                </div>

                {/* Section Add Selector */}
                <div className="flex items-center gap-2">
                  <select
                    id="add-section-select"
                    className="admin-input text-xs w-48"
                    defaultValue="hero"
                  >
                    <option value="hero">Hero Section</option>
                    <option value="rich_text">Rich Text Section</option>
                    <option value="features">Feature Cards</option>
                    <option value="faq">FAQ Accordion</option>
                    <option value="cta">Call-to-Action Banner</option>
                  </select>
                  <button
                    onClick={() => {
                      const sel = (document.getElementById('add-section-select') as HTMLSelectElement).value
                      addSection(sel as PageSectionType)
                    }}
                    className="btn-lime text-xs px-4 py-2"
                  >
                    + Add Section
                  </button>
                </div>
              </div>

              {(page.sections || []).length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-400">
                  No section blocks added yet. Click "+ Add Section" to build this page.
                </div>
              ) : (
                <div className="space-y-4">
                  {(page.sections || []).map((sec, idx) => (
                    <div key={sec.id} className="p-4 bg-[#faf9f4] border border-[#E5E4E0] rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => moveSection(idx, 'up')}
                            disabled={idx === 0}
                            className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-600 disabled:opacity-30"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => moveSection(idx, 'down')}
                            disabled={idx === (page.sections?.length || 0) - 1}
                            className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-600 disabled:opacity-30"
                          >
                            ▼
                          </button>
                          <span className="text-xs font-bold text-[#0C4651] uppercase tracking-wider">
                            Section #{idx + 1}: {sec.type}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold cursor-pointer">
                            <input
                              type="checkbox"
                              checked={sec.isEnabled}
                              onChange={(e) => {
                                const list = [...(page.sections || [])]
                                list[idx].isEnabled = e.target.checked
                                setPage({ ...page, sections: list })
                                setIsDirty(true)
                              }}
                              className="rounded accent-[#0C4651]"
                            />
                            Enabled
                          </label>
                          <button
                            onClick={() => removeSection(sec.id)}
                            className="text-xs font-semibold text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="text-[11px] font-bold text-gray-700 block mb-1">Section Title</label>
                          <input
                            type="text"
                            value={sec.data?.title || ''}
                            onChange={(e) => {
                              const list = [...(page.sections || [])]
                              list[idx].data = { ...list[idx].data, title: e.target.value }
                              setPage({ ...page, sections: list })
                              setIsDirty(true)
                            }}
                            className="admin-input"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-gray-700 block mb-1">Section Content / Subtext</label>
                          <textarea
                            rows={3}
                            value={sec.data?.content || ''}
                            onChange={(e) => {
                              const list = [...(page.sections || [])]
                              list[idx].data = { ...list[idx].data, content: e.target.value }
                              setPage({ ...page, sections: list })
                              setIsDirty(true)
                            }}
                            className="admin-input"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: SEO Controls */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="admin-card space-y-4 border-[#E5E4E0]">
                <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                  Search Engine Optimization (SEO)
                </h3>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">H1 Heading</label>
                  <input
                    type="text"
                    value={page.seo?.h1 || ''}
                    onChange={(e) => {
                      setPage({ ...page, seo: { ...page.seo, h1: e.target.value } })
                      setIsDirty(true)
                    }}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={page.seo?.metaTitle || ''}
                    onChange={(e) => {
                      setPage({ ...page, seo: { ...page.seo, metaTitle: e.target.value } })
                      setIsDirty(true)
                    }}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={page.seo?.metaDescription || ''}
                    onChange={(e) => {
                      setPage({ ...page, seo: { ...page.seo, metaDescription: e.target.value } })
                      setIsDirty(true)
                    }}
                    className="admin-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Focus Keyword</label>
                    <input
                      type="text"
                      value={page.seo?.focusKeyword || ''}
                      onChange={(e) => {
                        setPage({ ...page, seo: { ...page.seo, focusKeyword: e.target.value } })
                        setIsDirty(true)
                      }}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Canonical URL Override</label>
                    <input
                      type="text"
                      value={page.seo?.canonicalUrl || ''}
                      onChange={(e) => {
                        setPage({ ...page, seo: { ...page.seo, canonicalUrl: e.target.value } })
                        setIsDirty(true)
                      }}
                      className="admin-input font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <SEOHealthPanel seo={page.seo} />
              <SERPPreview
                title={page.seo?.metaTitle || page.publicTitle || page.internalName}
                url={`https://www.krtaskerdigital.com/${page.slug}`}
                description={page.seo?.metaDescription}
              />
            </div>
          </div>
        )}
      </div>

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={handleSave} onCancel={fetchPages} />
    </AdminLayout>
  )
}
