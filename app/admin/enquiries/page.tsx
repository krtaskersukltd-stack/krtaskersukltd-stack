'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import type { ContactEnquiryRecord } from '@/lib/cms-types'

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'in_progress' | 'closed'>('all')
  const [search, setSearch] = useState('')
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiryRecord | null>(null)

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/enquiries')
      if (res.ok) setEnquiries(await res.json())
    } catch (err) {
      console.error('Error fetching enquiries', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: 'new' | 'in_progress' | 'closed') => {
    const updated = enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    setEnquiries(updated)
    try {
      await fetch('/api/cms/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
    } catch (err) {
      console.error('Error updating enquiry status', err)
    }
  }

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.message.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Lead Enquiries</h1>
            <p className="text-xs text-gray-500 mt-1">
              Review and manage incoming project inquiries submitted through your website contact forms.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === 'all' ? 'bg-[#0C4651] text-[#E6FF2A]' : 'bg-[#faf9f4] text-gray-600 hover:bg-gray-100'
              }`}
            >
              All ({enquiries.length})
            </button>
            <button
              onClick={() => setStatusFilter('new')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === 'new' ? 'bg-[#0C4651] text-[#E6FF2A]' : 'bg-[#faf9f4] text-gray-600 hover:bg-gray-100'
              }`}
            >
              New ({enquiries.filter((e) => e.status === 'new').length})
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === 'in_progress' ? 'bg-[#0C4651] text-[#E6FF2A]' : 'bg-[#faf9f4] text-gray-600 hover:bg-gray-100'
              }`}
            >
              In Progress ({enquiries.filter((e) => e.status === 'in_progress').length})
            </button>
          </div>

          <input
            type="text"
            placeholder="Search enquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input max-w-xs"
          />
        </div>

        {/* Enquiries Table */}
        <div className="admin-card overflow-x-auto p-0 border-[#E5E4E0]">
          {loading ? (
            <div className="py-12 text-center text-xs text-gray-500">Loading enquiries...</div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">No enquiries found.</div>
          ) : (
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#faf9f4] text-gray-900 border-b border-[#E5E4E0] uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Prospect Name</th>
                  <th className="py-3.5 px-4">Contact Email</th>
                  <th className="py-3.5 px-4">Requested Service</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E4E0]">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#faf9f4]/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900">{enq.name}</td>
                    <td className="py-4 px-4 font-mono text-gray-600">{enq.email}</td>
                    <td className="py-4 px-4 text-gray-700">{enq.service || 'General Inquiry'}</td>
                    <td className="py-4 px-4 text-gray-500">{new Date(enq.createdAt).toLocaleDateString('en-GB')}</td>
                    <td className="py-4 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => updateStatus(enq.id, e.target.value as any)}
                        className={`text-xs font-bold px-2 py-1 rounded border border-gray-200 outline-none ${
                          enq.status === 'new'
                            ? 'bg-[#b8ebf8] text-[#001f26]'
                            : enq.status === 'in_progress'
                            ? 'bg-[#E6FF2A] text-[#434b00]'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <option value="new">NEW</option>
                        <option value="in_progress">IN PROGRESS</option>
                        <option value="closed">CLOSED</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => setSelectedEnquiry(enq)} className="btn-secondary text-xs px-3 py-1.5">
                        View Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-[#E5E4E0]">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{selectedEnquiry.name}</h3>
                <span className="text-xs text-gray-500">{selectedEnquiry.email}</span>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              {selectedEnquiry.phone && <div><strong>Phone:</strong> {selectedEnquiry.phone}</div>}
              {selectedEnquiry.service && <div><strong>Requested Service:</strong> {selectedEnquiry.service}</div>}
              {selectedEnquiry.budget && <div><strong>Estimated Budget:</strong> {selectedEnquiry.budget}</div>}
              <div>
                <strong className="block mb-1">Message Detail:</strong>
                <div className="p-3 bg-[#faf9f4] border border-[#efeee9] rounded-xl text-gray-800 leading-relaxed font-sans">
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <a
                href={`mailto:${selectedEnquiry.email}?subject=RE: KR Tasker Digital Inquiry`}
                className="btn-lime text-xs"
              >
                Reply via Email ↗
              </a>
              <button onClick={() => setSelectedEnquiry(null)} className="btn-secondary text-xs">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
