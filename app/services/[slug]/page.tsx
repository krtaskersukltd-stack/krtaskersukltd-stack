import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCmsServiceBySlug, getCmsServices } from '@/lib/cms-store'
import ServiceDetailClient from './ServiceDetailClient'
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
    ui: 'UI',
    ux: 'UX',
    b2b: 'B2B',
    saas: 'SaaS',
    cro: 'CRO',
  }

  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => acronyms[word.toLowerCase()] || (word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ')
}

async function resolveService(rawSlug: string): Promise<ServiceRecord | null> {
  const cleanSlug = (rawSlug || '').replace(/^\/services\//, '').replace(/^\//, '')
  
  try {
    const srv = await getCmsServiceBySlug(cleanSlug)
    if (srv) return srv
  } catch (e) {
    console.error('getCmsServiceBySlug error:', e)
  }

  // Guaranteed fallback to bundled services data so live Vercel production never crashes
  const fallback = (fallbackServices as ServiceRecord[]).find(
    (s) => s.slug === cleanSlug || s.slug === `/services/${cleanSlug}` || s.id === cleanSlug
  )
  if (fallback) return fallback

  // Automatic title-first placeholder for newly linked sub-services
  const formattedTitle = slugToTitle(cleanSlug)
  return {
    id: `srv-${cleanSlug}`,
    name: formattedTitle,
    slug: cleanSlug,
    status: 'published',
    sortOrder: 99,
    eyebrow: 'Our Services',
    heroHeading: formattedTitle,
    heroDescription: `Comprehensive, data-driven ${formattedTitle} solutions engineered by KR Tasker Digital to accelerate your business performance and market visibility.`,
    heroCtaText: 'Start A Project',
    featuredImage: '/images/services/web-app-design.png',
    features: [
      {
        id: `f-${cleanSlug}-1`,
        title: `${formattedTitle} Strategy & Execution`,
        description: `Bespoke strategy, implementation, and ongoing management for ${formattedTitle} tailored to drive measurable ROI.`,
        sortOrder: 1,
      },
      {
        id: `f-${cleanSlug}-2`,
        title: 'Performance & Optimization',
        description: `Continuous monitoring, conversion tracking, and iterative optimization to maximize long-term digital growth.`,
        sortOrder: 2,
      },
    ],
    metrics: [
      { value: '100%', label: 'Delivery Commitment' },
      { value: '24/7', label: 'Support & Advisory' },
    ],
    seo: {
      metaTitle: `${formattedTitle} | KR Tasker Digital`,
      metaDescription: `Discover high-performance ${formattedTitle} services by KR Tasker Digital.`,
      h1: formattedTitle,
      focusKeyword: cleanSlug,
      indexStatus: 'index',
      followStatus: 'follow',
    },
    updatedAt: new Date().toISOString(),
  }
}

export async function generateStaticParams() {
  try {
    const services = await getCmsServices()
    if (services && services.length > 0) {
      return services
        .filter((s) => s.status === 'published')
        .map((s) => ({ slug: s.slug.replace(/^\/services\//, '').replace(/^\//, '') }))
    }
  } catch {
    // ignore
  }

  return (fallbackServices as ServiceRecord[]).map((s) => ({
    slug: s.slug.replace(/^\/services\//, '').replace(/^\//, ''),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const srv = await resolveService(slug)

  if (!srv) {
    return {
      title: 'Service Not Found | KR Tasker Digital',
    }
  }

  const title = srv.seo?.metaTitle || `${srv.name} | KR Tasker Digital`
  const description = srv.seo?.metaDescription || srv.heroDescription || `${srv.name} services by KR Tasker Digital`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.krtaskerdigital.com/services/${srv.slug}`,
    },
    robots: {
      index: srv.seo?.indexStatus !== 'noindex',
      follow: srv.seo?.followStatus !== 'nofollow',
    },
  }
}

export default async function DynamicServicePage({ params }: PageProps) {
  const { slug } = await params
  const srv = await resolveService(slug)

  if (!srv || srv.status === 'draft') {
    notFound()
  }

  return <ServiceDetailClient srv={srv} />
}
