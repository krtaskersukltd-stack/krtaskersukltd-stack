'use client'

import type { PageSEO } from '@/lib/cms-types'

interface Props {
  seo: PageSEO
}

interface AuditCheck {
  label: string
  status: 'pass' | 'warning' | 'fail'
  details: string
}

export default function SEOHealthPanel({ seo }: Props) {
  const checks: AuditCheck[] = []

  // Meta Title Audit
  const titleLen = seo.metaTitle?.trim().length || 0
  if (titleLen === 0) {
    checks.push({ label: 'Meta Title', status: 'fail', details: 'Missing meta title tag.' })
  } else if (titleLen < 30 || titleLen > 60) {
    checks.push({ label: 'Meta Title Length', status: 'warning', details: `${titleLen} chars (Recommended: 30–60 chars).` })
  } else {
    checks.push({ label: 'Meta Title Length', status: 'pass', details: `Optimal length (${titleLen} chars).` })
  }

  // Meta Description Audit
  const descLen = seo.metaDescription?.trim().length || 0
  if (descLen === 0) {
    checks.push({ label: 'Meta Description', status: 'fail', details: 'Missing meta description.' })
  } else if (descLen < 110 || descLen > 160) {
    checks.push({ label: 'Meta Description Length', status: 'warning', details: `${descLen} chars (Recommended: 120–160 chars).` })
  } else {
    checks.push({ label: 'Meta Description Length', status: 'pass', details: `Optimal length (${descLen} chars).` })
  }

  // H1 Audit
  const h1Len = seo.h1?.trim().length || 0
  if (h1Len === 0) {
    checks.push({ label: 'H1 Heading', status: 'fail', details: 'Missing H1 heading.' })
  } else {
    checks.push({ label: 'H1 Heading', status: 'pass', details: `H1 configured ("${seo.h1.slice(0, 30)}...").` })
  }

  // Focus Keyword Audit
  const kw = seo.focusKeyword?.trim().toLowerCase()
  if (!kw) {
    checks.push({ label: 'Focus Keyword', status: 'warning', details: 'No focus keyword set for audit.' })
  } else {
    const inTitle = seo.metaTitle?.toLowerCase().includes(kw)
    const inH1 = seo.h1?.toLowerCase().includes(kw)
    if (inTitle && inH1) {
      checks.push({ label: 'Keyword Density', status: 'pass', details: `Keyword "${kw}" present in Title and H1.` })
    } else if (inTitle || inH1) {
      checks.push({ label: 'Keyword Placement', status: 'warning', details: `Keyword "${kw}" found in ${inTitle ? 'Title' : 'H1'} only.` })
    } else {
      checks.push({ label: 'Keyword Placement', status: 'fail', details: `Keyword "${kw}" not found in Title or H1.` })
    }
  }

  // Canonical Audit
  if (seo.canonicalUrl) {
    checks.push({ label: 'Canonical URL', status: 'pass', details: 'Explicit canonical URL configured.' })
  } else {
    checks.push({ label: 'Canonical URL', status: 'pass', details: 'Will use default public site URL canonical.' })
  }

  // Calculate score
  const passes = checks.filter((c) => c.status === 'pass').length
  const healthPercent = Math.round((passes / checks.length) * 100)

  return (
    <div className="admin-card border-[#E5E4E0]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
          <svg className="w-5 h-5 text-[#0C4651]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          SEO Health Diagnostics
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Score:</span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            healthPercent >= 80 ? 'bg-[#E6FF2A] text-[#434b00]' : healthPercent >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
          }`}>
            {healthPercent}%
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {checks.map((item, idx) => (
          <div key={idx} className="flex items-start justify-between text-xs p-2.5 rounded-lg bg-[#faf9f4] border border-[#efeee9]">
            <div>
              <span className="font-semibold text-gray-900 block">{item.label}</span>
              <span className="text-gray-600 mt-0.5 block">{item.details}</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
              item.status === 'pass'
                ? 'bg-emerald-100 text-emerald-800'
                : item.status === 'warning'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
