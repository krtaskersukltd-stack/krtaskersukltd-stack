'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import type { PageRecord, ServiceRecord, CaseStudyRecord, BlogPostRecord, ContactEnquiryRecord } from '@/lib/cms-types'

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  // CMS Metrics Data
  const [pages, setPages] = useState<PageRecord[]>([])
  const [services, setServices] = useState<ServiceRecord[]>([])
  const [work, setWork] = useState<CaseStudyRecord[]>([])
  const [blogs, setBlogs] = useState<BlogPostRecord[]>([])
  const [enquiries, setEnquiries] = useState<ContactEnquiryRecord[]>([])
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/check-auth')
        if (res.ok) {
          setIsAuthenticated(true)
          fetchDashboardData()
        }
      } catch (err) {
        console.error('Auth verification failed', err)
      } finally {
        setLoadingAuth(false)
      }
    }
    checkAuth()
  }, [])

  const fetchDashboardData = async () => {
    setLoadingData(true)
    try {
      const [resPages, resServices, resWork, resBlogs, resEnq] = await Promise.all([
        fetch('/api/cms/pages'),
        fetch('/api/cms/services'),
        fetch('/api/cms/work'),
        fetch('/api/cms/blogs'),
        fetch('/api/cms/enquiries'),
      ])

      if (resPages.ok) setPages(await resPages.json())
      if (resServices.ok) setServices(await resServices.json())
      if (resWork.ok) setWork(await resWork.json())
      if (resBlogs.ok) setBlogs(await resBlogs.json())
      if (resEnq.ok) setEnquiries(await resEnq.json())
    } catch (err) {
      console.error('Error loading dashboard data', err)
    } finally {
      setLoadingData(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoggingIn(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        setIsAuthenticated(true)
        fetchDashboardData()
      } else {
        const data = await res.json()
        setLoginError(data.error || 'Invalid credentials')
      }
    } catch {
      setLoginError('Network error during authentication')
    } finally {
      setLoggingIn(false)
    }
  }

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#0C4651] flex items-center justify-center text-[#E6FF2A] font-semibold text-sm">
        Verifying Secure CMS Session...
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf9f4] flex items-center justify-center p-4">
        <div className="bg-white border border-[#E5E4E0] rounded-2xl max-w-md w-full p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0C4651] text-[#E6FF2A] font-black text-2xl inline-flex items-center justify-center shadow-md mb-3">
              KR
            </div>
            <h1 className="text-2xl font-bold text-[#1b1c19]">KR Tasker Digital CMS</h1>
            <p className="text-xs text-gray-500 mt-1">Authorized Agency Admin Authentication</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Admin Security Token / Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="admin-input py-3"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
                {loginError}
              </div>
            )}

            <button type="submit" disabled={loggingIn} className="w-full btn-lime py-3 justify-center text-sm">
              {loggingIn ? 'Authenticating...' : 'Sign In to Admin CMS'}
            </button>
          </form>

          <p className="text-[11px] text-center text-gray-400 mt-6">
            Protected area. Unauthorized access attempts are monitored and rate-limited.
          </p>
        </div>
      </div>
    )
  }

  // Calculate Real Metrics
  const totalPages = pages.length
  const totalServices = services.length
  const totalWork = work.length
  const totalBlogs = blogs.length
  const publishedBlogs = blogs.filter((b) => b.status === 'published').length
  const draftBlogs = blogs.filter((b) => b.status === 'draft').length
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length

  // SEO Diagnostics warnings count
  const pagesNeedingSeo = pages.filter(
    (p) => !p.seo?.metaDescription || p.seo.metaDescription.length < 50 || !p.seo?.h1
  )

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5E4E0] shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0C4651] bg-[#0C4651]/10 px-2.5 py-1 rounded-full">
              System Dashboard Overview
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Welcome Back, KR Admin</h2>
            <p className="text-xs text-gray-500 mt-1">
              Manage your public website content, SEO metadata, services, portfolio, and incoming client enquiries.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/admin/blog/new" className="btn-lime text-xs">
              + New Blog Article
            </Link>
            <Link href="/admin/pages" className="btn-secondary text-xs">
              Manage Pages
            </Link>
          </div>
        </div>

        {/* Real Data Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="admin-card border-[#E5E4E0] flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Website Pages</span>
              <div className="text-3xl font-extrabold text-[#0C4651] mt-1">{totalPages}</div>
              <span className="text-[11px] text-emerald-600 font-medium">System Routes Active</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center font-bold text-lg">
              📄
            </div>
          </div>

          <div className="admin-card border-[#E5E4E0] flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Published Articles</span>
              <div className="text-3xl font-extrabold text-[#0C4651] mt-1">{publishedBlogs}</div>
              <span className="text-[11px] text-gray-500 font-medium">{draftBlogs} Drafts in pipeline</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#E6FF2A]/40 text-[#434b00] flex items-center justify-center font-bold text-lg">
              ✍️
            </div>
          </div>

          <div className="admin-card border-[#E5E4E0] flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Services & Work</span>
              <div className="text-3xl font-extrabold text-[#0C4651] mt-1">{totalServices + totalWork}</div>
              <span className="text-[11px] text-emerald-600 font-medium">{totalServices} Services, {totalWork} Work</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center font-bold text-lg">
              💼
            </div>
          </div>

          <div className="admin-card border-[#E5E4E0] flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Enquiries</span>
              <div className="text-3xl font-extrabold text-[#0C4651] mt-1">{newEnquiries}</div>
              <span className="text-[11px] text-amber-600 font-medium">Awaiting response</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
              📬
            </div>
          </div>
        </div>

        {/* Dashboard Grid: SEO Warnings & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SEO Needs Attention */}
          <div className="lg:col-span-2 admin-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                SEO & Content Audit Needed ({pagesNeedingSeo.length})
              </h3>
              <Link href="/admin/seo" className="text-xs font-semibold text-[#0C4651] hover:underline">
                View Full Audit →
              </Link>
            </div>

            {loadingData ? (
              <div className="py-8 text-center text-xs text-gray-500">Loading audit status...</div>
            ) : pagesNeedingSeo.length === 0 ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-medium">
                ✅ All active website pages pass basic SEO meta tests.
              </div>
            ) : (
              <div className="space-y-3">
                {pagesNeedingSeo.map((p) => (
                  <div key={p.id} className="p-3.5 bg-[#faf9f4] border border-[#efeee9] rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs">{p.internalName}</h4>
                      <p className="text-[11px] text-amber-700 mt-0.5">
                        {!p.seo?.metaDescription
                          ? 'Missing Meta Description tag'
                          : !p.seo?.h1
                          ? 'Missing H1 Heading tag'
                          : 'Meta description requires optimization'}
                      </p>
                    </div>
                    <Link href={`/admin/pages/${p.id}`} className="btn-secondary text-[11px] px-3 py-1.5">
                      Fix SEO
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Enquiries Box */}
          <div className="admin-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Recent Enquiries</h3>
              <Link href="/admin/enquiries" className="text-xs text-[#0C4651] font-semibold hover:underline">
                All Enquiries
              </Link>
            </div>

            {enquiries.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">No client enquiries received yet.</p>
            ) : (
              <div className="space-y-3">
                {enquiries.slice(0, 4).map((enq) => (
                  <div key={enq.id} className="p-3 rounded-lg border border-gray-100 bg-[#faf9f4] text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-900">{enq.name}</span>
                      <span className={`status-badge ${enq.status === 'new' ? 'new' : 'draft'}`}>{enq.status}</span>
                    </div>
                    <p className="text-gray-500 text-[11px] line-clamp-1">{enq.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
