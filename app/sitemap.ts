import { MetadataRoute } from 'next'
import { getCmsPages, getCmsServices, getCmsWork, getCmsBlogs } from '@/lib/cms-store'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.krtaskerdigital.com'

  const staticBaseRoutes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/privacy',
    '/services',
    '/terms',
    '/work',
  ]

  let pagesFromCms: any[] = []
  let servicesFromCms: any[] = []
  let workFromCms: any[] = []
  let blogsFromCms: any[] = []

  try {
    const [pages, services, work, blogs] = await Promise.all([
      getCmsPages(),
      getCmsServices(),
      getCmsWork(),
      getCmsBlogs(),
    ])
    pagesFromCms = pages
    servicesFromCms = services
    workFromCms = work
    blogsFromCms = blogs
  } catch (err) {
    console.error('Sitemap CMS load error', err)
  }

  // 1. Pages entries
  const pagesEntries = staticBaseRoutes.map((route) => {
    const match = pagesFromCms.find((p) => p.slug === route.replace('/', '') || (route === '' && p.routeKey === 'home'))
    if (match && match.seo?.indexStatus === 'noindex') return null
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }
  }).filter(Boolean) as MetadataRoute.Sitemap

  // 2. Services entries
  const servicesEntries = servicesFromCms
    .filter((s) => s.status === 'published' && s.seo?.indexStatus !== 'noindex')
    .map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(s.updatedAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // 3. Work entries
  const workEntries = workFromCms
    .filter((w) => w.status === 'published' && w.seo?.indexStatus !== 'noindex')
    .map((w) => ({
      url: `${baseUrl}/work/${w.slug}`,
      lastModified: new Date(w.updatedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // 4. Blog entries
  const blogEntries = blogsFromCms
    .filter((b) => b.status === 'published' && b.seo?.indexStatus !== 'noindex')
    .map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  return [...pagesEntries, ...servicesEntries, ...workEntries, ...blogEntries]
}
