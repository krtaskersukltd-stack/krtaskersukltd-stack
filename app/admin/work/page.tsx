'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import type { CaseStudyRecord } from '@/lib/cms-types'

export default function AdminWorkListPage() {
  const [work, setWork] = useState<CaseStudyRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWork()
  }, [])

  const fetchWork = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/work')
      if (res.ok) setWork(await res.json())
    } catch (err) {
      console.error('Error fetching work', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Work & Case Studies</h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage client portfolio items, metrics (+180% Organic Traffic), challenge/solution narratives, and media.
            </p>
          </div>
          <Link href="/admin/work/new" className="btn-lime text-xs">
            + Create New Case Study
          </Link>
        </div>

        <div className="admin-card overflow-x-auto p-0 border-[#E5E4E0]">
          {loading ? (
            <div className="py-12 text-center text-xs text-gray-500">Loading case studies...</div>
          ) : work.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">No case studies found.</div>
          ) : (
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#faf9f4] text-gray-900 border-b border-[#E5E4E0] uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Client / Project Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Year</th>
                  <th className="py-3.5 px-4">Metrics</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E4E0]">
                {work.map((cs) => (
                  <tr key={cs.id} className="hover:bg-[#faf9f4]/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      <div className="flex items-center gap-3">
                        {cs.featuredImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={cs.featuredImage}
                            alt={cs.featuredImageAlt || cs.title}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                          />
                        )}
                        <div>
                          <div>{cs.title}</div>
                          <div className="text-[10px] font-bold text-[#0C4651] uppercase mt-0.5">{cs.client}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-600">{cs.category}</td>
                    <td className="py-4 px-4 text-gray-500">{cs.year}</td>
                    <td className="py-4 px-4">
                      {cs.metrics?.[0] ? (
                        <span className="font-bold text-[#0C4651]">
                          {cs.metrics[0].value} <span className="font-normal text-gray-500 text-[10px]">{cs.metrics[0].label}</span>
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`status-badge ${cs.status}`}>{cs.status}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/admin/work/${cs.id}`} className="btn-lime text-xs px-3 py-1.5 inline-flex">
                        Edit Case Study
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
