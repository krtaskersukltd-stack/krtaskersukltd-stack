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
  return fallback || null
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
