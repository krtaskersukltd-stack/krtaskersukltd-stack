'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import type { ServiceRecord } from '@/lib/cms-types'

export default function AdminServicesListPage() {
  const [services, setServices] = useState<ServiceRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms/services')
      if (res.ok) setServices(await res.json())
    } catch (err) {
      console.error('Error fetching services', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Services CMS</h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage core service offerings, structured features list, key performance metrics, and SEO.
            </p>
          </div>
          <Link href="/admin/services/new" className="btn-lime text-xs">
            + Create New Service
          </Link>
        </div>

        <div className="admin-card overflow-x-auto p-0 border-[#E5E4E0]">
          {loading ? (
            <div className="py-12 text-center text-xs text-gray-500">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">No service records found.</div>
          ) : (
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#faf9f4] text-gray-900 border-b border-[#E5E4E0] uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Service Name</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">Features Count</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E4E0]">
                {services.map((srv) => (
                  <tr key={srv.id} className="hover:bg-[#faf9f4]/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      <div>{srv.name}</div>
                      <div className="text-[10px] font-normal text-gray-400 mt-0.5">{srv.heroHeading}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-600">/services/{srv.slug}</td>
                    <td className="py-4 px-4 font-semibold">{srv.features?.length || 0} Features</td>
                    <td className="py-4 px-4">
                      <span className={`status-badge ${srv.status}`}>{srv.status}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/admin/services/${srv.id}`} className="btn-lime text-xs px-3 py-1.5 inline-flex">
                        Edit Service
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
