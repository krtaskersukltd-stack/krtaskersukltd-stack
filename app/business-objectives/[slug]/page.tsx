import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCmsServiceBySlug } from '@/lib/cms-store'
import ServiceDetailClient from '@/app/services/[slug]/ServiceDetailClient'
import fallbackServices from '@/data/cms/services.json'
import type { ServiceRecord } from '@/lib/cms-types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true

function slugToTitle(slug: string): string {
  const acronyms: Record<string, string> = {
    ai: 'AI',
    seo: 'SEO',
    geo: 'GEO',
    ppc: 'PPC',
    crm: 'CRM',
    b2b: 'B2B',
    saas: 'SaaS',
    cro: 'CRO',
    roi: 'ROI',
  }

  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => acronyms[word.toLowerCase()] || (word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ')
}

async function resolveObjective(rawSlug: string): Promise<ServiceRecord | null> {
  const cleanSlug = (rawSlug || '').replace(/^\/business-objectives\//, '').replace(/^\/services\//, '').replace(/^\//, '')
  
  try {
    const srv = await getCmsServiceBySlug(cleanSlug)
    if (srv) return srv
  } catch (e) {
    console.error('getCmsServiceBySlug error in business objectives:', e)
  }

  const fallback = (fallbackServices as ServiceRecord[]).find(
    (s) =>
      s.slug === cleanSlug ||
      s.slug === `business-objectives/${cleanSlug}` ||
      s.id === `obj-${cleanSlug}` ||
      s.id === cleanSlug
  )
  if (fallback) return fallback

  const formattedTitle = slugToTitle(cleanSlug)
  return {
    id: `obj-${cleanSlug}`,
    name: formattedTitle,
    slug: cleanSlug,
    status: 'published',
    sortOrder: 99,
    eyebrow: 'Business Objective',
    heroHeading: `Strategic Solutions To ${formattedTitle}`,
    heroDescription: `Accelerate your revenue and market position with data-backed digital marketing, SEO, and bespoke web platforms targeted specifically to ${formattedTitle.toLowerCase()}.`,
    heroCtaText: 'Achieve This Goal',
    featuredImage: '/images/services/digital-marketing.png',
    features: [
      {
        id: `f-obj-${cleanSlug}-1`,
        title: `Targeted ${formattedTitle} Strategy`,
        description: `Bespoke roadmap designed around clear KPIs to systematically achieve and surpass your ${formattedTitle.toLowerCase()} benchmarks.`,
        sortOrder: 1,
      },
      {
        id: `f-obj-${cleanSlug}-2`,
        title: 'Full-Funnel Measurement & Optimization',
        description: `Continuous tracking, audience refinement, and conversion rate optimization to sustain exponential digital ROI.`,
        sortOrder: 2,
      },
    ],
    metrics: [
      { value: '+260%', label: 'Benchmark Impact' },
      { value: '4.9x', label: 'Average ROAS' },
    ],
    seo: {
      metaTitle: `${formattedTitle} | KR Tasker Digital`,
      metaDescription: `Achieve ${formattedTitle} with data-driven performance marketing and bespoke web engineering by KR Tasker Digital.`,
      h1: `Strategic Solutions To ${formattedTitle}`,
      focusKeyword: cleanSlug,
      indexStatus: 'index',
      followStatus: 'follow',
    },
    updatedAt: new Date().toISOString(),
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const srv = await resolveObjective(slug)

  if (!srv) {
    return {
      title: 'Objective Not Found | KR Tasker Digital',
    }
  }

  const title = srv.seo?.metaTitle || `${srv.name} | KR Tasker Digital`
  const description = srv.seo?.metaDescription || srv.heroDescription || `${srv.name} solutions by KR Tasker Digital`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.krtaskerdigital.com/business-objectives/${srv.slug}`,
    },
    robots: {
      index: srv.seo?.indexStatus !== 'noindex',
      follow: srv.seo?.followStatus !== 'nofollow',
    },
  }
}

export default async function DynamicObjectivePage({ params }: PageProps) {
  const { slug } = await params
  const srv = await resolveObjective(slug)

  if (!srv || srv.status === 'draft') {
    notFound()
  }

  return <ServiceDetailClient srv={srv} />
}
