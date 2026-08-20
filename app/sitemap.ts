import { MetadataRoute } from 'next'
import { allPosts } from './blog/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.krtaskerdigital.com'

  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/privacy',
    '/services',
    '/terms',
    '/work',
    '/services/ai-automation',
    '/services/ai-solutions',
    '/services/amazon-ebay',
    '/services/branding',
    '/services/business-consultancy',
    '/services/digital-360',
    '/services/digital-marketing',
    '/services/email-marketing',
    '/services/graphic-design',
    '/services/marketing',
    '/services/ppc',
    '/services/seo',
    '/services/shopify-development',
    '/services/social-media',
    '/services/web-development',
    '/services/websites-apps'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
