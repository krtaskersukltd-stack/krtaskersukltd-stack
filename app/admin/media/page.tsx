'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import StickySaveBar from '@/components/admin/StickySaveBar'
import type { MediaItemRecord } from '@/lib/cms-types'

export default function AdminMediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItemRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')

  // New Media Input Form State
  const [newUrl, setNewUrl] = useState('')
  const [newAlt, setNewAlt] = useState('')
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/media')
      if (res.ok) setMediaList(await res.json())
    } catch (err) {
      console.error('Error fetching media', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback('')
    try {
      const res = await fetch('/api/cms/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mediaList),
      })
      if (res.ok) {
        setIsDirty(false)
        setFeedback('Media library metadata updated successfully!')
      } else {
        setFeedback('Failed to save media metadata.')
      }
    } catch {
      setFeedback('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  const addMediaItem = () => {
    if (!newUrl.trim()) return
    const newItem: MediaItemRecord = {
      id: `med-${Date.now()}`,
      url: newUrl.trim(),
      filename: newTitle.trim() || newUrl.split('/').pop() || 'image.jpg',
      mimeType: 'image/jpeg',
      sizeBytes: 150000,
      altText: newAlt.trim() || 'Website image asset',
      title: newTitle.trim() || 'Uploaded Image',
      uploadedAt: new Date().toISOString(),
    }

    setMediaList([newItem, ...mediaList])
    setNewUrl('')
    setNewAlt('')
    setNewTitle('')
    setIsDirty(true)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Media Library & Alt Text Engine</h1>
            <p className="text-xs text-gray-500 mt-1">
              Centralized repository for website imagery, asset URL copying, and SEO Alt Text editing.
            </p>
          </div>
        </div>

        {feedback && (
          <div className={`p-3 rounded-lg text-xs font-medium ${
            feedback.includes('successfully') ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
          }`}>
            {feedback}
          </div>
        )}

        {/* Add New Asset Box */}
        <div className="admin-card space-y-4 border-[#E5E4E0] bg-[#faf9f4]">
          <h3 className="font-bold text-gray-900 text-sm">Add New Image Asset URL</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="admin-input"
            />
            <input
              type="text"
              placeholder="Image Asset Title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="admin-input"
            />
            <input
              type="text"
              placeholder="SEO Alt Text..."
              value={newAlt}
              onChange={(e) => setNewAlt(e.target.value)}
              className="admin-input"
            />
          </div>
          {newUrl && (
            <button onClick={addMediaItem} className="btn-lime text-xs">
              + Register Asset in Library
            </button>
          )}
        </div>

        {/* Media Assets Grid */}
        {loading ? (
          <div className="py-12 text-center text-xs text-gray-500">Loading media library...</div>
        ) : mediaList.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-400">No media items in library.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaList.map((item, idx) => (
              <div key={item.id} className="admin-card p-4 space-y-3 border-[#E5E4E0]">
                <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.altText || item.filename} className="w-full h-full object-cover" />
                  <button
                    onClick={() => navigator.clipboard.writeText(item.url)}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white text-[10px] font-semibold px-2 py-1 rounded backdrop-blur-sm"
                  >
                    📋 Copy URL
                  </button>
                </div>

                <div>
                  <span className="text-xs font-bold text-gray-900 block truncate">{item.filename}</span>
                  <span className="text-[10px] font-mono text-gray-400 block truncate mt-0.5">{item.url}</span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">SEO Alt Text</label>
                  <input
                    type="text"
                    value={item.altText}
                    onChange={(e) => {
                      const updated = [...mediaList]
                      updated[idx].altText = e.target.value
                      setMediaList(updated)
                      setIsDirty(true)
                    }}
                    placeholder="Describe image for accessibility..."
                    className="admin-input text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={handleSave} onCancel={fetchMedia} />
    </AdminLayout>
  )
}
