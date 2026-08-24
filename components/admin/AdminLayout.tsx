'use client'

import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import './admin.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  )
}
