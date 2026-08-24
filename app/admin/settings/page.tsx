'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import StickySaveBar from '@/components/admin/StickySaveBar'
import type { RedirectRecord } from '@/lib/cms-types'

export default function AdminGeneralSettingsPage() {
  const [redirects, setRedirects] = useState<RedirectRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')

  // New Redirect Form
  const [newSource, setNewSource] = useState('')
  const [newDest, setNewDest] = useState('')
  const [newCode, setNewCode] = useState<301 | 302>(301)
  const [redirectError, setRedirectError] = useState('')

  useEffect(() => {
    fetchRedirects()
  }, [])

  const fetchRedirects = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/redirects')
      if (res.ok) setRedirects(await res.json())
    } catch (err) {
      console.error('Error fetching redirects', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback('')
    try {
      const res = await fetch('/api/cms/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(redirects),
      })
      if (res.ok) {
        setIsDirty(false)
        setFeedback('Redirect rules saved successfully!')
      } else {
        setFeedback('Failed to save redirect rules.')
      }
    } catch {
      setFeedback('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  const addRedirectRule = () => {
    setRedirectError('')
    const src = newSource.trim().toLowerCase()
    const dest = newDest.trim().toLowerCase()

    if (!src || !dest) {
      setRedirectError('Both source path and destination URL are required.')
      return
    }

    if (src === dest) {
      setRedirectError('Source path cannot be identical to destination URL.')
      return
    }

    if (!src.startsWith('/')) {
      setRedirectError('Source path must start with a forward slash (e.g. /old-page).')
      return
    }

    if (redirects.some((r) => r.sourcePath.toLowerCase() === src)) {
      setRedirectError('A redirect rule for this source path already exists.')
      return
    }

    const newRule: RedirectRecord = {
      id: `red-${Date.now()}`,
      sourcePath: src,
      destination: dest,
      statusCode: newCode,
      isActive: true,
      updatedAt: new Date().toISOString(),
    }

    setRedirects([newRule, ...redirects])
    setNewSource('')
    setNewDest('')
    setIsDirty(true)
  }

  const deleteRule = (id: string) => {
    setRedirects(redirects.filter((r) => r.id !== id))
    setIsDirty(true)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">General Settings & Redirect Engine</h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage system configuration, security rules, and real-time 301 / 302 URL redirects.
            </p>
          </div>

          <button onClick={handleSave} disabled={saving} className="btn-lime text-xs px-5 py-2">
            {saving ? 'Saving...' : 'Save Redirect Rules'}
          </button>
        </div>

        {feedback && (
          <div className={`p-3 rounded-lg text-xs font-medium ${
            feedback.includes('successfully') ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
          }`}>
            {feedback}
          </div>
        )}

        {/* 301/302 Redirect Manager Card */}
        <div className="admin-card space-y-6 border-[#E5E4E0]">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-base">301 & 302 URL Redirect Engine</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Redirect rules are evaluated dynamically on incoming HTTP requests.
            </p>
          </div>

          {/* Add Rule Form */}
          <div className="p-4 bg-[#faf9f4] border border-[#efeee9] rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Add New Redirect Rule</h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Source Path (e.g. /old-services)"
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                className="admin-input"
              />
              <input
                type="text"
                placeholder="Destination (e.g. /services)"
                value={newDest}
                onChange={(e) => setNewDest(e.target.value)}
                className="admin-input"
              />
              <select
                value={newCode}
                onChange={(e) => setNewCode(Number(e.target.value) as 301 | 302)}
                className="admin-input font-bold"
              >
                <option value={301}>301 Permanent Redirect</option>
                <option value={302}>302 Temporary Redirect</option>
              </select>
              <button onClick={addRedirectRule} className="btn-lime text-xs">
                + Add Redirect Rule
              </button>
            </div>

            {redirectError && (
              <p className="text-xs font-medium text-red-600 mt-1">{redirectError}</p>
            )}
          </div>

          {/* Rules Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            {loading ? (
              <div className="py-8 text-center text-xs text-gray-500">Loading redirect rules...</div>
            ) : redirects.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400">No redirect rules configured.</div>
            ) : (
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-[#faf9f4] text-gray-900 border-b border-gray-200 uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Source Path</th>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Redirect Code</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {redirects.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50">
                      <td className="py-3.5 px-4 font-mono font-semibold text-gray-900">{rule.sourcePath}</td>
                      <td className="py-3.5 px-4 font-mono text-[#0C4651]">{rule.destination}</td>
                      <td className="py-3.5 px-4 font-bold">{rule.statusCode}</td>
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = redirects.map((r) => (r.id === rule.id ? { ...r, isActive: !r.isActive } : r))
                            setRedirects(updated)
                            setIsDirty(true)
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                            rule.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {rule.isActive ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button onClick={() => deleteRule(rule.id)} className="text-xs text-red-600 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={handleSave} onCancel={fetchRedirects} />
    </AdminLayout>
  )
}
