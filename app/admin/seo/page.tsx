'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import SERPPreview from '@/components/admin/SERPPreview'
import StickySaveBar from '@/components/admin/StickySaveBar'
import MediaPickerModal from '@/components/admin/MediaPickerModal'
import type { SEOSettingsRecord } from '@/lib/cms-types'

export default function AdminSeoSettingsPage() {
  const [seoSettings, setSeoSettings] = useState<SEOSettingsRecord>({
    siteName: 'KR Tasker Digital',
    defaultTitleTemplate: '%s | KR Tasker Digital',
    defaultMetaDescription: 'Bespoke web development, CMS integration, and technical SEO optimization by KR Tasker Digital.',
    defaultOgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    robotsTxtContent: `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: https://www.krtaskerdigital.com/sitemap.xml`,
    sitemapEnabled: true,
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  useEffect(() => {
    fetchSeoSettings()
  }, [])

  const fetchSeoSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/seo')
      if (res.ok) setSeoSettings(await res.json())
    } catch (err) {
      console.error('Error fetching SEO settings', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback('')
    try {
      const res = await fetch('/api/cms/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seoSettings),
      })
      if (res.ok) {
        setIsDirty(false)
        setFeedback('Global SEO settings saved successfully!')
      } else {
        setFeedback('Failed to save SEO settings.')
      }
    } catch {
      setFeedback('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-12 text-center text-xs text-gray-500">Loading SEO settings...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Site-Wide SEO Settings</h1>
            <p className="text-xs text-gray-500 mt-1">
              Configure global title formatting templates, fallback meta descriptions, sitemap.xml, and robots.txt.
            </p>
          </div>

          <button onClick={handleSave} disabled={saving} className="btn-lime text-xs px-5 py-2">
            {saving ? 'Saving...' : 'Save SEO Settings'}
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
            {/* Global Meta Defaults Card */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                Global Title & Fallback Metadata
              </h3>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Site Brand Name</label>
                <input
                  type="text"
                  value={seoSettings.siteName}
                  onChange={(e) => {
                    setSeoSettings({ ...seoSettings, siteName: e.target.value })
                    setIsDirty(true)
                  }}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Default Title Template</label>
                <input
                  type="text"
                  value={seoSettings.defaultTitleTemplate}
                  onChange={(e) => {
                    setSeoSettings({ ...seoSettings, defaultTitleTemplate: e.target.value })
                    setIsDirty(true)
                  }}
                  placeholder="%s | KR Tasker Digital"
                  className="admin-input"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">%s will be dynamically replaced by individual page titles.</span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Global Fallback Meta Description</label>
                <textarea
                  rows={3}
                  value={seoSettings.defaultMetaDescription}
                  onChange={(e) => {
                    setSeoSettings({ ...seoSettings, defaultMetaDescription: e.target.value })
                    setIsDirty(true)
                  }}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Default Open Graph Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={seoSettings.defaultOgImage}
                    onChange={(e) => {
                      setSeoSettings({ ...seoSettings, defaultOgImage: e.target.value })
                      setIsDirty(true)
                    }}
                    className="admin-input"
                  />
                  <button onClick={() => setIsMediaModalOpen(true)} className="btn-secondary text-xs flex-shrink-0">
                    Media Library
                  </button>
                </div>
              </div>
            </div>

            {/* Robots.txt & Sitemap Card */}
            <div className="admin-card space-y-4 border-[#E5E4E0]">
              <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                Robots.txt & XML Sitemap Directives
              </h3>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Robots.txt Directives</label>
                <textarea
                  rows={5}
                  value={seoSettings.robotsTxtContent}
                  onChange={(e) => {
                    setSeoSettings({ ...seoSettings, robotsTxtContent: e.target.value })
                    setIsDirty(true)
                  }}
                  className="admin-input font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-[#faf9f4] border border-[#efeee9] rounded-xl">
                <div>
                  <span className="font-bold text-xs text-gray-900 block">Dynamic XML Sitemap Generator</span>
                  <span className="text-[11px] text-gray-500">Accessible publicly at /sitemap.xml</span>
                </div>
                <a
                  href="https://www.krtaskerdigital.com/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs"
                >
                  View /sitemap.xml ↗
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <SERPPreview
              title={seoSettings.defaultTitleTemplate.replace('%s', 'Homepage')}
              url="https://www.krtaskerdigital.com/"
              description={seoSettings.defaultMetaDescription}
            />
          </div>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url) => {
          setSeoSettings({ ...seoSettings, defaultOgImage: url })
          setIsDirty(true)
        }}
      />

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={handleSave} onCancel={fetchSeoSettings} />
    </AdminLayout>
  )
}
