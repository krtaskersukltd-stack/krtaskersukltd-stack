import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCmsServiceBySlug, getCmsServices } from '@/lib/cms-store'
import IndustryDetailClient from './IndustryDetailClient'
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
    cbd: 'CBD',
  }

  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => acronyms[word.toLowerCase()] || (word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ')
}

async function resolveIndustry(rawSlug: string): Promise<ServiceRecord | null> {
  const cleanSlug = (rawSlug || '').replace(/^\/industries\//, '').replace(/^\/services\//, '').replace(/^\//, '')
  
  try {
    const srv = await getCmsServiceBySlug(cleanSlug)
    if (srv) return srv
  } catch (e) {
    console.error('getCmsServiceBySlug error in industries:', e)
  }

  const fallback = (fallbackServices as ServiceRecord[]).find(
    (s) =>
      s.slug === cleanSlug ||
      s.slug === `industries/${cleanSlug}` ||
      s.slug === `services/${cleanSlug}` ||
      s.id === `srv-${cleanSlug}` ||
      s.id === cleanSlug
  )
  if (fallback) return fallback

  const formattedTitle = slugToTitle(cleanSlug)
  return {
    id: `ind-${cleanSlug}`,
    name: formattedTitle,
    slug: cleanSlug,
    status: 'published',
    sortOrder: 99,
    eyebrow: 'Industry Expertise',
    heroHeading: `${formattedTitle} Digital Growth Solutions`,
    heroDescription: `Specialized digital marketing, web engineering, and performance growth strategies tailored for the ${formattedTitle} sector.`,
    heroCtaText: 'Schedule Consultation',
    featuredImage: '/images/services/digital-marketing.png',
    features: [
      {
        id: `f-ind-${cleanSlug}-1`,
        title: `${formattedTitle} Market Strategy`,
        description: `Custom growth pipelines, search authority, and client acquisition funnels designed specifically for ${formattedTitle} brands.`,
        sortOrder: 1,
      },
      {
        id: `f-ind-${cleanSlug}-2`,
        title: 'Conversion & Operational Scaling',
        description: `High-conversion digital presence, CRM automation, and performance analytics tuned for industry-specific buyer behaviors.`,
        sortOrder: 2,
      },
    ],
    metrics: [
      { value: '3.4x', label: 'Average Growth' },
      { value: '99%', label: 'Client Satisfaction' },
    ],
    seo: {
      metaTitle: `${formattedTitle} Digital Marketing & Solutions | KR Tasker Digital`,
      metaDescription: `Discover high-performance digital strategies and bespoke web development for ${formattedTitle} by KR Tasker Digital.`,
      h1: `${formattedTitle} Digital Growth Solutions`,
      focusKeyword: cleanSlug,
      indexStatus: 'index',
      followStatus: 'follow',
    },
    updatedAt: new Date().toISOString(),
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const srv = await resolveIndustry(slug)

  if (!srv) {
    return {
      title: 'Industry Not Found | KR Tasker Digital',
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
      url: `https://www.krtaskerdigital.com/industries/${srv.slug}`,
    },
    robots: {
      index: srv.seo?.indexStatus !== 'noindex',
      follow: srv.seo?.followStatus !== 'nofollow',
    },
  }
}

export default async function DynamicIndustryPage({ params }: PageProps) {
  const { slug } = await params
  const srv = await resolveIndustry(slug)

  if (!srv || srv.status === 'draft') {
    notFound()
  }

  return <IndustryDetailClient srv={srv} />
}
