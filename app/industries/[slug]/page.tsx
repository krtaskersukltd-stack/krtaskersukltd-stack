import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCmsServiceBySlug, getCmsServices } from '@/lib/cms-store'
import ServiceDetailClient from '@/app/services/[slug]/ServiceDetailClient'
import fallbackServices from '@/data/cms/services.json'
import type { ServiceRecord } from '@/lib/cms-types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true

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
  return fallback || null
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

  return <ServiceDetailClient srv={srv} />
}
