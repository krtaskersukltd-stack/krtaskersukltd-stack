'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import StickySaveBar from '@/components/admin/StickySaveBar'
import type { NavItemRecord } from '@/lib/cms-types'

export default function AdminNavigationPage() {
  const [navItems, setNavItems] = useState<NavItemRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    fetchNavigation()
  }, [])

  const fetchNavigation = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/navigation')
      if (res.ok) setNavItems(await res.json())
    } catch (err) {
      console.error('Error fetching navigation', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback('')
    try {
      const res = await fetch('/api/cms/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(navItems),
      })

      if (res.ok) {
        setIsDirty(false)
        setFeedback('Navigation menu saved successfully!')
      } else {
        setFeedback('Failed to save navigation menu.')
      }
    } catch {
      setFeedback('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  const addItem = () => {
    const newItem: NavItemRecord = {
      id: `nav-${Date.now()}`,
      label: 'New Link',
      href: '/new-page',
      sortOrder: navItems.length + 1,
      isVisible: true,
      isExternal: false,
      isOpenInNewTab: false,
    }
    setNavItems([...navItems, newItem])
    setIsDirty(true)
  }

  const removeItem = (id: string) => {
    setNavItems(navItems.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= navItems.length) return

    const updated = [...navItems]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    // re-assign sort order
    updated.forEach((item, idx) => {
      item.sortOrder = idx + 1
    })

    setNavItems(updated)
    setIsDirty(true)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Header Navigation Menu</h1>
            <p className="text-xs text-gray-500 mt-1">
              Customize public website header menu items, reorder links, and control visibility.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={addItem} className="btn-secondary text-xs">
              + Add Menu Link
            </button>
            <button onClick={handleSave} disabled={saving} className="btn-lime text-xs px-5 py-2">
              {saving ? 'Saving...' : 'Save Navigation'}
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

        <div className="admin-card border-[#E5E4E0] space-y-4">
          {loading ? (
            <div className="py-12 text-center text-xs text-gray-500">Loading navigation menu...</div>
          ) : navItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">No navigation items configured.</div>
          ) : (
            <div className="space-y-3">
              {navItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#faf9f4] border border-[#E5E4E0] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveItem(idx, 'up')}
                        disabled={idx === 0}
                        className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-600 disabled:opacity-30 hover:bg-gray-50"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveItem(idx, 'down')}
                        disabled={idx === navItems.length - 1}
                        className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-600 disabled:opacity-30 hover:bg-gray-50"
                      >
                        ▼
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">Menu Label</label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const updated = [...navItems]
                            updated[idx].label = e.target.value
                            setNavItems(updated)
                            setIsDirty(true)
                          }}
                          className="admin-input"
                          placeholder="Link Label (e.g. Work)"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">Target URL</label>
                        <input
                          type="text"
                          value={item.href}
                          onChange={(e) => {
                            const updated = [...navItems]
                            updated[idx].href = e.target.value
                            setNavItems(updated)
                            setIsDirty(true)
                          }}
                          className="admin-input font-mono"
                          placeholder="URL (e.g. /work or https://...)"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                      <input
                        type="checkbox"
                        checked={item.isVisible}
                        onChange={(e) => {
                          const updated = [...navItems]
                          updated[idx].isVisible = e.target.checked
                          setNavItems(updated)
                          setIsDirty(true)
                        }}
                        className="rounded accent-[#0C4651]"
                      />
                      Visible
                    </label>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs font-semibold text-red-600 hover:underline px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={handleSave} onCancel={fetchNavigation} />
    </AdminLayout>
  )
}
