import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCmsWorkBySlug, getCmsWork } from '@/lib/cms-store'
import CaseStudyDetailClient from './CaseStudyDetailClient'
import fallbackWorkData from '@/data/cms/work.json'
import type { CaseStudyRecord } from '@/lib/cms-types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true

async function resolveCaseStudy(rawSlug: string): Promise<CaseStudyRecord | null> {
  const cleanSlug = (rawSlug || '').replace(/^\/work\//, '').replace(/^\//, '')

  try {
    const cs = await getCmsWorkBySlug(cleanSlug)
    if (cs) return cs
  } catch (e) {
    console.error('getCmsWorkBySlug error:', e)
  }

  // Guaranteed fallback to bundled work data
  const fallback = (fallbackWorkData as CaseStudyRecord[]).find(
    (w) => w.slug === cleanSlug || w.slug === `/work/${cleanSlug}` || w.id === cleanSlug
  )
  return fallback || null
}

export async function generateStaticParams() {
  try {
    const work = await getCmsWork()
    if (work && work.length > 0) {
      return work
        .filter((w) => w.status === 'published')
        .map((w) => ({ slug: w.slug.replace(/^\/work\//, '').replace(/^\//, '') }))
    }
  } catch {
    // ignore
  }

  return (fallbackWorkData as CaseStudyRecord[]).map((w) => ({
    slug: w.slug.replace(/^\/work\//, '').replace(/^\//, ''),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cs = await resolveCaseStudy(slug)

  if (!cs) {
    return {
      title: 'Case Study Not Found | KR Tasker Digital',
    }
  }

  const title = cs.seo?.metaTitle || `${cs.title} | KR Tasker Digital`
  const description = cs.seo?.metaDescription || cs.shortDescription || `${cs.title} case study by KR Tasker Digital`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.krtaskerdigital.com/work/${cs.slug}`,
      images: cs.featuredImage ? [cs.featuredImage] : [],
    },
    robots: {
      index: cs.seo?.indexStatus !== 'noindex',
      follow: cs.seo?.followStatus !== 'nofollow',
    },
  }
}

export default async function DynamicWorkPage({ params }: PageProps) {
  const { slug } = await params
  const cs = await resolveCaseStudy(slug)

  if (!cs || cs.status === 'draft') {
    notFound()
  }

  return <CaseStudyDetailClient cs={cs} />
}
