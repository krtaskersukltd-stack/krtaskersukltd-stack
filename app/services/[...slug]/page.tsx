import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getCmsServiceBySlug, getCmsServices } from '@/lib/cms-store'
import ServiceDetailClient from './ServiceDetailClient'
import fallbackServices from '@/data/cms/services.json'
import type { ServiceRecord } from '@/lib/cms-types'

interface PageProps {
  params: Promise<{ slug: string[] | string }>
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
    cms: 'CMS',
    ui: 'UI',
    ux: 'UX',
    b2b: 'B2B',
    saas: 'SaaS',
    cro: 'CRO',
    fba: 'FBA',
    sop: 'SOP',
    sops: 'SOPs',
    ctr: 'CTR',
    upc: 'UPC',
    gs1: 'GS1',
    uk: 'UK',
    wordpress: 'WordPress',
    shopify: 'Shopify',
    youtube: 'YouTube',
  }

  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => acronyms[word.toLowerCase()] || (word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ')
}

const CATEGORY_NAMES: Record<string, string> = {
  seo: 'SEO Services',
  'web-development': 'Web Development',
  marketing: 'Marketing & Google Ads',
  'graphic-design': 'Graphic Designing',
  'social-media': 'Social Media',
  'ai-automation': 'AI Automation',
  'email-marketing': 'Email Marketing',
}

async function resolveService(rawSlug: string | string[]): Promise<ServiceRecord | null> {
  const slugPath = Array.isArray(rawSlug) ? rawSlug.join('/') : rawSlug || ''
  const cleanSlug = slugPath.replace(/^\/services\//, '').replace(/^\//, '').replace(/\/$/, '')
  const slugParts = cleanSlug.split('/').filter(Boolean)
  const leafSlug = slugParts[slugParts.length - 1] || cleanSlug
  const parentCategory = slugParts.length > 1 ? slugParts[0] : null
  
  try {
    const srv = await getCmsServiceBySlug(cleanSlug)
    if (srv) return srv
    if (leafSlug !== cleanSlug) {
      const leafSrv = await getCmsServiceBySlug(leafSlug)
      if (leafSrv) return { ...leafSrv, slug: cleanSlug }
    }
  } catch (e) {
    console.error('getCmsServiceBySlug error:', e)
  }

  // Guaranteed fallback to bundled services data so live Vercel production never crashes
  const fallback = (fallbackServices as ServiceRecord[]).find(
    (s) =>
      s.slug === cleanSlug ||
      s.slug === `/services/${cleanSlug}` ||
      s.id === cleanSlug ||
      s.slug === leafSlug ||
      s.id === `srv-${leafSlug}`
  )
  if (fallback) {
    return {
      ...fallback,
      slug: cleanSlug,
    }
  }

  // Automatic title-first placeholder for newly linked sub-services
  const formattedTitle = slugToTitle(leafSlug)
  const categoryEyebrow = (parentCategory && CATEGORY_NAMES[parentCategory]) || 'Our Services'

  return {
    id: `srv-${cleanSlug.replace(/\//g, '-')}`,
    name: formattedTitle,
    slug: cleanSlug,
    status: 'published',
    sortOrder: 99,
    eyebrow: categoryEyebrow,
    heroHeading: formattedTitle,
    heroDescription: `Comprehensive, data-driven ${formattedTitle} solutions engineered by KR Tasker Digital to accelerate your business performance, market visibility, and sustained conversion growth.`,
    heroCtaText: 'Start A Project',
    featuredImage: '/images/services/web-app-design.png',
    features: [
      {
        id: `f-${cleanSlug.replace(/\//g, '-')}-1`,
        title: `${formattedTitle} Strategy & Architecture`,
        description: `Bespoke strategy, precision planning, and tactical execution for ${formattedTitle} tailored to drive measurable ROI.`,
        sortOrder: 1,
      },
      {
        id: `f-${cleanSlug.replace(/\//g, '-')}-2`,
        title: 'Performance, Tracking & Scaling',
        description: `Continuous tracking, audience refinement, and data-backed iterative optimisation to maximize long-term digital growth.`,
        sortOrder: 2,
      },
    ],
    metrics: [
      { value: '100%', label: 'Delivery Commitment' },
      { value: '24/7', label: 'Support & Advisory' },
    ],
    seo: {
      metaTitle: `${formattedTitle} | KR Tasker Digital`,
      metaDescription: `Discover premier ${formattedTitle} services by KR Tasker Digital. High-impact solutions tailored to scale your brand.`,
      h1: formattedTitle,
      focusKeyword: leafSlug.replace(/-/g, ' '),
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
        .map((s) => ({
          slug: s.slug.replace(/^\/services\//, '').replace(/^\//, '').split('/'),
        }))
    }
  } catch {
    // ignore
  }

  return (fallbackServices as ServiceRecord[]).map((s) => ({
    slug: s.slug.replace(/^\/services\//, '').replace(/^\//, '').split('/'),
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
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug
  if (slugPath === 'digital-marketing') redirect('/services')
  const srv = await resolveService(slug)

  if (!srv || srv.status === 'draft') {
    notFound()
  }

  return <ServiceDetailClient srv={srv} />
}
