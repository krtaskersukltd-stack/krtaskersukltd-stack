'use client'

import { useState, useEffect, use } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import SEOHealthPanel from '@/components/admin/SEOHealthPanel'
import SERPPreview from '@/components/admin/SERPPreview'
import StickySaveBar from '@/components/admin/StickySaveBar'
import MediaPickerModal from '@/components/admin/MediaPickerModal'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { CaseStudyRecord, WorkMetric } from '@/lib/cms-types'

export default function AdminCaseStudyEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const caseId = resolvedParams.id
  const isNew = caseId === 'new'
  const router = useRouter()

  const [caseStudy, setCaseStudy] = useState<CaseStudyRecord>({
    id: `cs-${Date.now()}`,
    client: '',
    title: '',
    slug: '',
    year: '2026',
    category: 'Web Engineering',
    featuredImage: '',
    featuredImageAlt: '',
    shortDescription: '',
    status: 'published',
    sortOrder: 1,
    overview: '',
    challenge: '',
    solution: '',
    results: '',
    metrics: [{ value: '+180%', label: 'Organic Traffic' }],
    seo: {
      metaTitle: '',
      metaDescription: '',
      h1: '',
      focusKeyword: '',
      indexStatus: 'index',
      followStatus: 'follow',
    },
    updatedAt: new Date().toISOString(),
  })
  const [allWork, setAllWork] = useState<CaseStudyRecord[]>([])
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  useEffect(() => {
    fetchWork()
  }, [caseId])

  const fetchWork = async () => {
    try {
      const res = await fetch('/api/cms/work')
      if (res.ok) {
        const data: CaseStudyRecord[] = await res.json()
        setAllWork(data)
        if (!isNew) {
          const target = data.find((c) => c.id === caseId)
          if (target) setCaseStudy(target)
        }
      }
    } catch (err) {
      console.error('Error fetching work', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback('')
    try {
      let updatedList: CaseStudyRecord[]
      if (isNew) {
        updatedList = [caseStudy, ...allWork]
      } else {
        updatedList = allWork.map((c) => (c.id === caseStudy.id ? { ...caseStudy, updatedAt: new Date().toISOString() } : c))
      }

      const res = await fetch('/api/cms/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedList),
      })

      if (res.ok) {
        setIsDirty(false)
        setFeedback('Case study saved successfully!')
        if (isNew) router.push(`/admin/work/${caseStudy.id}`)
      } else {
        setFeedback('Failed to save case study.')
      }
    } catch {
      setFeedback('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  const addMetric = () => {
    const newMetric: WorkMetric = { value: '+100%', label: 'Growth Metric' }
    setCaseStudy({ ...caseStudy, metrics: [...caseStudy.metrics, newMetric] })
    setIsDirty(true)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-12 text-center text-xs text-gray-500">Loading case study data...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/admin/work" className="text-xs font-semibold text-[#0C4651] hover:underline">
              ← Back to Case Studies
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">
              {isNew ? 'Create Case Study' : `Edit Case Study: ${caseStudy.title}`}
            </h1>
          </div>

          <button onClick={handleSave} disabled={saving} className="btn-lime text-xs px-5 py-2">
            {saving ? 'Saving...' : 'Save Case Study'}
          </button>
        </div>

        {feedback && (
          <div className={`p-3 rounded-lg text-xs font-medium ${
            feedback.includes('successfully') ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
          }`}>
            {feedback}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* General Settings Card */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                Case Study Core Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Client Name</label>
                  <input
                    type="text"
                    value={caseStudy.client}
                    onChange={(e) => {
                      setCaseStudy({ ...caseStudy, client: e.target.value })
                      setIsDirty(true)
                    }}
                    placeholder="e.g. Global Logistics Corp"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Project Title</label>
                  <input
                    type="text"
                    value={caseStudy.title}
                    onChange={(e) => {
                      setCaseStudy({ ...caseStudy, title: e.target.value })
                      setIsDirty(true)
                    }}
                    placeholder="e.g. Enterprise Fleet Portal Redesign"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={caseStudy.slug}
                    onChange={(e) => {
                      setCaseStudy({ ...caseStudy, slug: e.target.value })
                      setIsDirty(true)
                    }}
                    placeholder="e.g. enterprise-fleet-portal"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Category</label>
                  <input
                    type="text"
                    value={caseStudy.category}
                    onChange={(e) => {
                      setCaseStudy({ ...caseStudy, category: e.target.value })
                      setIsDirty(true)
                    }}
                    placeholder="e.g. Web Engineering"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Year</label>
                  <input
                    type="text"
                    value={caseStudy.year}
                    onChange={(e) => {
                      setCaseStudy({ ...caseStudy, year: e.target.value })
                      setIsDirty(true)
                    }}
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Short Summary Excerpt</label>
                <textarea
                  rows={2}
                  value={caseStudy.shortDescription}
                  onChange={(e) => {
                    setCaseStudy({ ...caseStudy, shortDescription: e.target.value })
                    setIsDirty(true)
                  }}
                  className="admin-input"
                />
              </div>
            </div>

            {/* Structured Content Breakdown */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                Narrative & Results Architecture
              </h3>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">The Challenge</label>
                <textarea
                  rows={3}
                  value={caseStudy.challenge || ''}
                  onChange={(e) => {
                    setCaseStudy({ ...caseStudy, challenge: e.target.value })
                    setIsDirty(true)
                  }}
                  placeholder="Describe the initial technical or business bottleneck..."
                  className="admin-input"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Our Strategy & Solution</label>
                <textarea
                  rows={3}
                  value={caseStudy.solution || ''}
                  onChange={(e) => {
                    setCaseStudy({ ...caseStudy, solution: e.target.value })
                    setIsDirty(true)
                  }}
                  placeholder="Detail the web application architecture and design system solution..."
                  className="admin-input"
                />
              </div>
            </div>

            {/* Metrics Section */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-base">Key Results Metrics ({caseStudy.metrics?.length || 0})</h3>
                <button onClick={addMetric} className="btn-secondary text-xs">
                  + Add Metric
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.metrics?.map((met, idx) => (
                  <div key={idx} className="p-3 bg-[#faf9f4] border border-[#efeee9] rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={met.value}
                        onChange={(e) => {
                          const updated = [...(caseStudy.metrics || [])]
                          updated[idx].value = e.target.value
                          setCaseStudy({ ...caseStudy, metrics: updated })
                          setIsDirty(true)
                        }}
                        placeholder="e.g. +180%"
                        className="admin-input font-black text-[#0C4651]"
                      />
                      <button
                        onClick={() => {
                          const filtered = caseStudy.metrics.filter((_, i) => i !== idx)
                          setCaseStudy({ ...caseStudy, metrics: filtered })
                          setIsDirty(true)
                        }}
                        className="text-xs text-red-600 hover:underline ml-2"
                      >
                        ✕
                      </button>
                    </div>

                    <input
                      type="text"
                      value={met.label}
                      onChange={(e) => {
                        const updated = [...(caseStudy.metrics || [])]
                        updated[idx].label = e.target.value
                        setCaseStudy({ ...caseStudy, metrics: updated })
                        setIsDirty(true)
                      }}
                      placeholder="e.g. Organic Traffic Growth"
                      className="admin-input text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Image & SEO Sidebar */}
          <div className="space-y-6">
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                Featured Cover Image
              </h3>

              {caseStudy.featuredImage ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={caseStudy.featuredImage}
                    alt={caseStudy.featuredImageAlt || 'Featured'}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setCaseStudy({ ...caseStudy, featuredImage: '' })
                      setIsDirty(true)
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white text-xs hover:bg-black"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsMediaModalOpen(true)}
                  className="p-8 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:border-[#0C4651] bg-[#faf9f4] transition-colors"
                >
                  <span className="text-2xl block mb-1">🖼️</span>
                  <span className="text-xs font-semibold text-gray-700 block">Select Cover Image</span>
                  <span className="text-[10px] text-gray-400">Click to open media library</span>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Alt Text</label>
                <input
                  type="text"
                  value={caseStudy.featuredImageAlt}
                  onChange={(e) => {
                    setCaseStudy({ ...caseStudy, featuredImageAlt: e.target.value })
                    setIsDirty(true)
                  }}
                  placeholder="Describe image for screen readers & SEO..."
                  className="admin-input"
                />
              </div>
            </div>

            <SEOHealthPanel seo={caseStudy.seo} />
            <SERPPreview
              title={caseStudy.seo?.metaTitle || caseStudy.title}
              url={`https://www.krtaskerdigital.com/work/${caseStudy.slug}`}
              description={caseStudy.seo?.metaDescription || caseStudy.shortDescription}
            />
          </div>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url, alt) => {
          setCaseStudy({ ...caseStudy, featuredImage: url, featuredImageAlt: alt || caseStudy.featuredImageAlt })
          setIsDirty(true)
        }}
      />

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={handleSave} onCancel={fetchWork} />
    </AdminLayout>
  )
}
