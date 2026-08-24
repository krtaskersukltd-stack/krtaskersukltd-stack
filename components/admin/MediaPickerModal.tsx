'use client'

import { useState, useEffect } from 'react'
import type { MediaItemRecord } from '@/lib/cms-types'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string, alt: string) => void
}

export default function MediaPickerModal({ isOpen, onClose, onSelect }: Props) {
  const [mediaList, setMediaList] = useState<MediaItemRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [customUrl, setCustomUrl] = useState('')
  const [customAlt, setCustomAlt] = useState('')

  useEffect(() => {
    if (isOpen) {
      fetchMedia()
    }
  }, [isOpen])

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/media')
      if (res.ok) {
        const data = await res.json()
        setMediaList(data)
      }
    } catch (err) {
      console.error('Error fetching media', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-[#E5E4E0]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#faf9f4]">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Select Image from Media Library</h3>
            <p className="text-xs text-gray-500">Pick an existing asset or enter a custom image URL.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Custom URL Input */}
          <div className="p-4 bg-[#f8f7f2] rounded-xl border border-[#efeee9] space-y-3">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Direct Image URL</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="admin-input"
              />
              <input
                type="text"
                placeholder="Image Alt Text..."
                value={customAlt}
                onChange={(e) => setCustomAlt(e.target.value)}
                className="admin-input"
              />
            </div>
            {customUrl && (
              <button
                onClick={() => {
                  onSelect(customUrl, customAlt || 'Image')
                  onClose()
                }}
                className="btn-lime text-xs py-2 px-4"
              >
                Use Custom URL
              </button>
            )}
          </div>

          {/* Existing Media Grid */}
          <div>
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Media Library Items</h4>
            {loading ? (
              <div className="py-12 text-center text-xs text-gray-500">Loading media library...</div>
            ) : mediaList.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400 bg-gray-50 rounded-xl">No media items uploaded yet.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mediaList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelect(item.url, item.altText || item.filename)
                      onClose()
                    }}
                    className="group relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video cursor-pointer hover:border-[#0C4651] hover:shadow-md transition-all"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.altText || item.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-white">
                      <span className="text-[10px] font-medium truncate">{item.filename}</span>
                      <span className="text-[9px] text-[#E6FF2A] font-semibold">Click to select</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end bg-[#faf9f4]">
          <button onClick={onClose} className="btn-secondary text-xs">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
