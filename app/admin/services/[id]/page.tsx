'use client'

import { useState, useEffect, use } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import SEOHealthPanel from '@/components/admin/SEOHealthPanel'
import SERPPreview from '@/components/admin/SERPPreview'
import StickySaveBar from '@/components/admin/StickySaveBar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ServiceRecord, ServiceFeature, ServiceMetric } from '@/lib/cms-types'

export default function AdminServiceEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const serviceId = resolvedParams.id
  const isNew = serviceId === 'new'
  const router = useRouter()

  const [service, setService] = useState<ServiceRecord>({
    id: `srv-${Date.now()}`,
    name: '',
    slug: '',
    status: 'published',
    sortOrder: 1,
    eyebrow: 'SERVICES',
    heroHeading: '',
    heroDescription: '',
    heroCtaText: 'Get Started',
    features: [],
    metrics: [],
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
  const [allServices, setAllServices] = useState<ServiceRecord[]>([])
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    fetchServices()
  }, [serviceId])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/cms/services')
      if (res.ok) {
        const data: ServiceRecord[] = await res.json()
        setAllServices(data)
        if (!isNew) {
          const target = data.find((s) => s.id === serviceId)
          if (target) setService(target)
        }
      }
    } catch (err) {
      console.error('Error fetching services', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback('')
    try {
      let updatedList: ServiceRecord[]
      if (isNew) {
        updatedList = [service, ...allServices]
      } else {
        updatedList = allServices.map((s) => (s.id === service.id ? { ...service, updatedAt: new Date().toISOString() } : s))
      }

      const res = await fetch('/api/cms/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedList),
      })

      if (res.ok) {
        setIsDirty(false)
        setFeedback('Service record saved successfully!')
        if (isNew) router.push(`/admin/services/${service.id}`)
      } else {
        setFeedback('Failed to save service record.')
      }
    } catch {
      setFeedback('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  const addFeature = () => {
    const newFeature: ServiceFeature = {
      id: `f-${Date.now()}`,
      title: 'New Service Feature',
      description: 'Feature description details...',
      sortOrder: service.features.length + 1,
    }
    setService({ ...service, features: [...service.features, newFeature] })
    setIsDirty(true)
  }

  const addMetric = () => {
    const newMetric: ServiceMetric = {
      value: '+100%',
      label: 'Performance Metric',
    }
    setService({ ...service, metrics: [...service.metrics, newMetric] })
    setIsDirty(true)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-12 text-center text-xs text-gray-500">Loading service data...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/admin/services" className="text-xs font-semibold text-[#0C4651] hover:underline">
              ← Back to Services
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">
              {isNew ? 'Create New Service' : `Edit Service: ${service.name}`}
            </h1>
          </div>

          <button onClick={handleSave} disabled={saving} className="btn-lime text-xs px-5 py-2">
            {saving ? 'Saving...' : 'Save Service'}
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
            {/* General Info Card */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                General Service Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Service Name</label>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => {
                      setService({ ...service, name: e.target.value })
                      setIsDirty(true)
                    }}
                    placeholder="e.g. Web Development & Engineering"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={service.slug}
                    onChange={(e) => {
                      setService({ ...service, slug: e.target.value })
                      setIsDirty(true)
                    }}
                    placeholder="e.g. web-development"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">
                    Header Menu Category / Eyebrow
                  </label>
                  <input
                    type="text"
                    value={service.eyebrow || ''}
                    onChange={(e) => {
                      setService({ ...service, eyebrow: e.target.value })
                      setIsDirty(true)
                    }}
                    placeholder="e.g. Digital Marketing, Websites & Apps, AI & Automation"
                    className="admin-input"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {['Digital Marketing', 'Websites & Apps', 'AI & Automation'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setService({ ...service, eyebrow: cat })
                          setIsDirty(true)
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                          service.eyebrow === cat
                            ? 'bg-[#0C4651] text-white border-[#0C4651]'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Publish Status</label>
                  <select
                    value={service.status}
                    onChange={(e) => {
                      setService({ ...service, status: e.target.value as any })
                      setIsDirty(true)
                    }}
                    className="admin-input"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Hero Heading</label>
                <input
                  type="text"
                  value={service.heroHeading}
                  onChange={(e) => {
                    setService({ ...service, heroHeading: e.target.value })
                    setIsDirty(true)
                  }}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Hero Description</label>
                <textarea
                  rows={3}
                  value={service.heroDescription}
                  onChange={(e) => {
                    setService({ ...service, heroDescription: e.target.value })
                    setIsDirty(true)
                  }}
                  className="admin-input"
                />
              </div>
            </div>

            {/* Structured Features Card */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-base">Service Features ({service.features.length})</h3>
                <button onClick={addFeature} className="btn-secondary text-xs">
                  + Add Feature Item
                </button>
              </div>

              <div className="space-y-4">
                {service.features.map((feat, idx) => (
                  <div key={feat.id} className="p-4 bg-[#faf9f4] border border-[#efeee9] rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#0C4651]">Feature #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const filtered = service.features.filter((f) => f.id !== feat.id)
                          setService({ ...service, features: filtered })
                          setIsDirty(true)
                        }}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>

                    <input
                      type="text"
                      value={feat.title}
                      onChange={(e) => {
                        const updated = [...service.features]
                        updated[idx].title = e.target.value
                        setService({ ...service, features: updated })
                        setIsDirty(true)
                      }}
                      placeholder="Feature Title..."
                      className="admin-input"
                    />

                    <textarea
                      rows={2}
                      value={feat.description}
                      onChange={(e) => {
                        const updated = [...service.features]
                        updated[idx].description = e.target.value
                        setService({ ...service, features: updated })
                        setIsDirty(true)
                      }}
                      placeholder="Feature Description..."
                      className="admin-input"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Card */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-base">Key Metrics ({service.metrics.length})</h3>
                <button onClick={addMetric} className="btn-secondary text-xs">
                  + Add Metric
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.metrics.map((met, idx) => (
                  <div key={idx} className="p-3 bg-[#faf9f4] border border-[#efeee9] rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={met.value}
                        onChange={(e) => {
                          const updated = [...service.metrics]
                          updated[idx].value = e.target.value
                          setService({ ...service, metrics: updated })
                          setIsDirty(true)
                        }}
                        className="admin-input font-extrabold text-[#0C4651]"
                      />
                      <button
                        onClick={() => {
                          const filtered = service.metrics.filter((_, i) => i !== idx)
                          setService({ ...service, metrics: filtered })
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
                        const updated = [...service.metrics]
                        updated[idx].label = e.target.value
                        setService({ ...service, metrics: updated })
                        setIsDirty(true)
                      }}
                      placeholder="Metric Label..."
                      className="admin-input text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Sidebar */}
          <div className="space-y-6">
            <SEOHealthPanel seo={service.seo} />
            <SERPPreview
              title={service.seo?.metaTitle || service.name}
              url={`https://www.krtaskerdigital.com/services/${service.slug}`}
              description={service.seo?.metaDescription || service.heroDescription}
            />
          </div>
        </div>
      </div>

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={handleSave} onCancel={fetchServices} />
    </AdminLayout>
  )
}
