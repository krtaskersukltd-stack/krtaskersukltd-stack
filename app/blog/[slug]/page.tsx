import BlogDetailClient from './BlogDetailClient'
import { notFound } from 'next/navigation'
import { readBlogs } from '@/lib/blog-store'

interface PageParams {
  slug: string
}

async function getPost(slug: string) {
  try {
    const blogs = await readBlogs()
    return blogs.find((b) => b.slug === slug) || null
  } catch (error) {
    console.error("Error reading blog detail:", error)
    return null
  }
}

export const dynamic = 'force-dynamic'

export default async function BlogDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    notFound()
  }

  return <BlogDetailClient post={post} />
}
