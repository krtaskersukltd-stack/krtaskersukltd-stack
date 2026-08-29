import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCmsServiceBySlug, getCmsServices } from '@/lib/cms-store'
import ServiceDetailClient from './ServiceDetailClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const services = await getCmsServices()
    return services
      .filter((s) => s.status === 'published')
      .map((s) => ({ slug: s.slug.replace(/^\/services\//, '').replace(/^\//, '') }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const srv = await getCmsServiceBySlug(slug)

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
  const srv = await getCmsServiceBySlug(slug)

  if (!srv || srv.status === 'draft') {
    notFound()
  }

  return <ServiceDetailClient srv={srv} />
}
