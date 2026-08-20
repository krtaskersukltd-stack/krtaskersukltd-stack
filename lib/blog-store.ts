import { list, put } from '@vercel/blob'
import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import path from 'path'
import type { BlogPost } from '@/app/blog/posts'

const BLOG_PREFIX = 'blog-data/blogs-'
const bundledPath = path.join(process.cwd(), 'data', 'blogs.json')

async function readBundledBlogs() {
  const data = await fs.readFile(bundledPath, 'utf8')
  return JSON.parse(data) as BlogPost[]
}

export async function readBlogs() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return readBundledBlogs()

  const { blobs } = await list({ prefix: BLOG_PREFIX, limit: 1000 })
  const latest = blobs.sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  )[0]

  if (!latest) return readBundledBlogs()

  const response = await fetch(`${latest.url}?v=${latest.uploadedAt.getTime()}`, {
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('Unable to load blog storage')
  return response.json() as Promise<BlogPost[]>
}

export async function writeBlogs(blogs: BlogPost[]) {
  const serialized = JSON.stringify(blogs, null, 2)

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    if (process.env.VERCEL) {
      throw new Error('BLOB_READ_WRITE_TOKEN is not configured')
    }
    await fs.writeFile(bundledPath, serialized, 'utf8')
    return
  }

  await put(`${BLOG_PREFIX}${Date.now()}-${randomUUID()}.json`, serialized, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json; charset=utf-8',
    cacheControlMaxAge: 60,
  })
}
