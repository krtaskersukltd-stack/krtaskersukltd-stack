import type { Metadata } from 'next'
import { getCmsServiceBySlug } from '@/lib/cms-store'
import fallbackServices from '@/data/cms/services.json'
import type { ServiceRecord } from '@/lib/cms-types'
import ServiceDetailClient from './[...slug]/ServiceDetailClient'

export const dynamic = 'force-dynamic'

async function getParentService(): Promise<ServiceRecord> {
  try {
    const service = await getCmsServiceBySlug('digital-marketing')
    if (service) return service
  } catch (error) {
    console.error('Unable to load services parent page from CMS:', error)
  }

  const fallback = (fallbackServices as ServiceRecord[]).find((service) => service.slug === 'digital-marketing')
  if (!fallback) throw new Error('Digital Marketing parent service is missing')
  return fallback
}

export async function generateMetadata(): Promise<Metadata> {
  const service = await getParentService()
  return {
    title: service.seo?.metaTitle || 'Digital Marketing Services | KR Tasker Digital',
    description: service.seo?.metaDescription || service.heroDescription,
    alternates: { canonical: '/services' },
  }
}

export default async function ServicesParentPage() {
  return <ServiceDetailClient srv={await getParentService()} />
}
