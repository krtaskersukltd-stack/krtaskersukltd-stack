'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import StickySaveBar from '@/components/admin/StickySaveBar'
import type { GlobalSectionsRecord } from '@/lib/cms-types'

export default function AdminGlobalSectionsPage() {
  const [globalData, setGlobalData] = useState<GlobalSectionsRecord>({
    ctaHeading: 'Ready to elevate your digital presence?',
    ctaDescription: 'Partner with KR Tasker Digital for bespoke web engineering, CMS solutions, and search growth.',
    ctaButtonText: 'Get Started Today',
    ctaButtonLink: '/contact',
    footerPhone: '+44 (0) 20 8123 4567',
    footerEmail: 'info@krtaskerdigital.com',
    footerAddress: '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ',
    footerCopyright: '© 2026 KR Tasker UK Ltd. All rights reserved.',
    socialLinkedin: 'https://linkedin.com',
    socialTwitter: 'https://twitter.com',
    socialInstagram: 'https://instagram.com',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    fetchGlobal()
  }, [])

  const fetchGlobal = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/global')
      if (res.ok) setGlobalData(await res.json())
    } catch (err) {
      console.error('Error fetching global sections', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback('')
    try {
      const res = await fetch('/api/cms/global', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(globalData),
      })
      if (res.ok) {
        setIsDirty(false)
        setFeedback('Global sections and footer information updated successfully!')
      } else {
        setFeedback('Failed to update global sections.')
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
        <div className="py-12 text-center text-xs text-gray-500">Loading global section settings...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Global Sections & Shared Copy</h1>
            <p className="text-xs text-gray-500 mt-1">
              Centralized editing for site-wide Call To Action (CTA) banners, contact details, and footer copy.
            </p>
          </div>

          <button onClick={handleSave} disabled={saving} className="btn-lime text-xs px-5 py-2">
            {saving ? 'Saving...' : 'Save Global Content'}
          </button>
        </div>

        {feedback && (
          <div className={`p-3 rounded-lg text-xs font-medium ${
            feedback.includes('successfully') ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
          }`}>
            {feedback}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Global CTA Card */}
          <div className="admin-card space-y-4 border-[#E5E4E0]">
            <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
              Site-Wide CTA Banner
            </h3>

            <div>
              <label className="text-xs font-bold text-gray-800 block mb-1">CTA Heading</label>
              <input
                type="text"
                value={globalData.ctaHeading}
                onChange={(e) => {
                  setGlobalData({ ...globalData, ctaHeading: e.target.value })
                  setIsDirty(true)
                }}
                className="admin-input"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-800 block mb-1">CTA Description Subtext</label>
              <textarea
                rows={3}
                value={globalData.ctaDescription}
                onChange={(e) => {
                  setGlobalData({ ...globalData, ctaDescription: e.target.value })
                  setIsDirty(true)
                }}
                className="admin-input"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Button Label</label>
                <input
                  type="text"
                  value={globalData.ctaButtonText}
                  onChange={(e) => {
                    setGlobalData({ ...globalData, ctaButtonText: e.target.value })
                    setIsDirty(true)
                  }}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Button Link</label>
                <input
                  type="text"
                  value={globalData.ctaButtonLink}
                  onChange={(e) => {
                    setGlobalData({ ...globalData, ctaButtonLink: e.target.value })
                    setIsDirty(true)
                  }}
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* Shared Contact & Footer Card */}
          <div className="admin-card space-y-4 border-[#E5E4E0]">
            <h3 className="font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
              Footer & Central Business Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Public Phone</label>
                <input
                  type="text"
                  value={globalData.footerPhone}
                  onChange={(e) => {
                    setGlobalData({ ...globalData, footerPhone: e.target.value })
                    setIsDirty(true)
                  }}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 block mb-1">Public Email</label>
                <input
                  type="text"
                  value={globalData.footerEmail}
                  onChange={(e) => {
                    setGlobalData({ ...globalData, footerEmail: e.target.value })
                    setIsDirty(true)
                  }}
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-800 block mb-1">Physical Business Address</label>
              <input
                type="text"
                value={globalData.footerAddress}
                onChange={(e) => {
                  setGlobalData({ ...globalData, footerAddress: e.target.value })
                  setIsDirty(true)
                }}
                className="admin-input"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-800 block mb-1">Copyright Notice</label>
              <input
                type="text"
                value={globalData.footerCopyright}
                onChange={(e) => {
                  setGlobalData({ ...globalData, footerCopyright: e.target.value })
                  setIsDirty(true)
                }}
                className="admin-input"
              />
            </div>
          </div>
        </div>
      </div>

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={handleSave} onCancel={fetchGlobal} />
    </AdminLayout>
  )
}
