'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import MediaPickerModal from '@/components/admin/MediaPickerModal'
import StickySaveBar from '@/components/admin/StickySaveBar'
import type { TeamMemberRecord } from '@/lib/cms-types'

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMemberRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number | null>(null)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/team')
      if (res.ok) setTeam(await res.json())
    } catch (err) {
      console.error('Error fetching team', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback('')
    try {
      const res = await fetch('/api/cms/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team),
      })
      if (res.ok) {
        setIsDirty(false)
        setFeedback('Team members updated successfully!')
      } else {
        setFeedback('Failed to update team members.')
      }
    } catch {
      setFeedback('Network error while saving.')
    } finally {
      setSaving(false)
    }
  }

  const addMember = () => {
    const newMember: TeamMemberRecord = {
      id: `team-${Date.now()}`,
      name: 'New Team Member',
      role: 'Role Title',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      photoAlt: 'Team Member Photo',
      shortBio: 'Brief bio detailing experience and key accomplishments...',
      sortOrder: team.length + 1,
      status: 'published',
      updatedAt: new Date().toISOString(),
    }
    setTeam([...team, newMember])
    setIsDirty(true)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage public-facing agency team profiles, bio information, avatars, and order.
            </p>
          </div>
          <button onClick={addMember} className="btn-lime text-xs">
            + Add Team Member
          </button>
        </div>

        {feedback && (
          <div className={`p-3 rounded-lg text-xs font-medium ${
            feedback.includes('successfully') ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
          }`}>
            {feedback}
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-xs text-gray-500">Loading team members...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, idx) => (
              <div key={member.id} className="admin-card space-y-4 border-[#E5E4E0]">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo}
                      alt={member.photoAlt || member.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
                      <span className="text-[11px] text-gray-500">{member.role}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const filtered = team.filter((_, i) => i !== idx)
                      setTeam(filtered)
                      setIsDirty(true)
                    }}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => {
                        const updated = [...team]
                        updated[idx].name = e.target.value
                        setTeam(updated)
                        setIsDirty(true)
                      }}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-800 block mb-1">Role Title</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => {
                        const updated = [...team]
                        updated[idx].role = e.target.value
                        setTeam(updated)
                        setIsDirty(true)
                      }}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Photo Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={member.photo}
                      onChange={(e) => {
                        const updated = [...team]
                        updated[idx].photo = e.target.value
                        setTeam(updated)
                        setIsDirty(true)
                      }}
                      className="admin-input"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMemberIndex(idx)
                        setIsMediaModalOpen(true)
                      }}
                      className="btn-secondary text-xs flex-shrink-0"
                    >
                      Library
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Short Biography</label>
                  <textarea
                    rows={2}
                    value={member.shortBio}
                    onChange={(e) => {
                      const updated = [...team]
                      updated[idx].shortBio = e.target.value
                      setTeam(updated)
                      setIsDirty(true)
                    }}
                    className="admin-input"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => {
          setIsMediaModalOpen(false)
          setSelectedMemberIndex(null)
        }}
        onSelect={(url, alt) => {
          if (selectedMemberIndex !== null) {
            const updated = [...team]
            updated[selectedMemberIndex].photo = url
            if (alt) updated[selectedMemberIndex].photoAlt = alt
            setTeam(updated)
            setIsDirty(true)
          }
        }}
      />

      <StickySaveBar isSaving={saving} isDirty={isDirty} onSave={handleSave} onCancel={fetchTeam} />
    </AdminLayout>
  )
}
