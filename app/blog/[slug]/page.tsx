import BlogDetailClient from './BlogDetailClient'
import { notFound } from 'next/navigation'
import fs from 'fs/promises'
import path from 'path'
import { BlogPost } from '../posts'

interface PageParams {
  slug: string
}

async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'blogs.json')
    const data = await fs.readFile(filePath, 'utf-8')
    const blogs: BlogPost[] = JSON.parse(data)
    return blogs.find((b) => b.slug === slug) || null
  } catch (error) {
    console.error("Error reading blog detail:", error)
    return null
  }
}

export default async function BlogDetailPage({ params }: { params: PageParams }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return <BlogDetailClient post={post} />
}
