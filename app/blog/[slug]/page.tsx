import BlogDetailClient from './BlogDetailClient'
import { notFound } from 'next/navigation'
import { getCmsBlogBySlug } from '@/lib/cms-store'
import { readBlogs } from '@/lib/blog-store'

import type { BlogPost } from '@/app/blog/posts'

interface PageParams {
  slug: string
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const cmsBlog = await getCmsBlogBySlug(slug)
    if (cmsBlog) {
      return {
        id: typeof cmsBlog.id === 'number' ? cmsBlog.id : 1,
        slug: cmsBlog.slug,
        title: cmsBlog.title,
        category: cmsBlog.category,
        readTime: cmsBlog.readingTime || '5 min read',
        imageUrl: cmsBlog.featuredImage || '/images/services-grid/seo.png',
        date: cmsBlog.publishDate,
        authorName: cmsBlog.authorName,
        authorRole: cmsBlog.authorRole,
        authorImage: cmsBlog.authorImage || '',
        content: cmsBlog.content,
      }
    }

    const blogs = await readBlogs()
    return blogs.find((b) => b.slug === slug) || null
  } catch (error) {
    console.error("Error reading blog detail:", error)
    return null
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    notFound()
  }

  return <BlogDetailClient post={post} />
}
