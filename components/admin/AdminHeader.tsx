'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin')
      router.refresh()
    } catch (err) {
      console.error('Logout error', err)
    }
  }

  // Generate breadcrumb titles
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = segments.map((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/')
    const title = seg.charAt(0).toUpperCase() + seg.slice(1).replace('-', ' ')
    return { title, href }
  })

  return (
    <header className="admin-header">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/admin" className="hover:text-black font-medium transition-colors">
          Admin
        </Link>
        {breadcrumbs.slice(1).map((b, i) => (
          <div key={b.href} className="flex items-center gap-2">
            <span className="text-gray-300">/</span>
            <Link href={b.href} className="hover:text-black font-medium transition-colors capitalize">
              {b.title}
            </Link>
          </div>
        ))}
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        <a
          href="https://www.krtaskerdigital.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-xs px-3.5 py-2"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Live Website
        </a>

        {/* User Info & Logout */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#0C4651] text-[#E6FF2A] font-bold text-xs flex items-center justify-center">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-gray-900 leading-tight">KR Admin</div>
            <div className="text-[10px] text-gray-500">Super Administrator</div>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-red-600 hover:text-red-800 font-medium ml-2 px-2 py-1 rounded hover:bg-red-50 transition-colors"
            title="Log out of CMS"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
