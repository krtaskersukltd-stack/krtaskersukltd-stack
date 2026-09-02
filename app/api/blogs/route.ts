import { NextResponse } from 'next/server'
import type { BlogPost } from '@/app/blog/posts'
import { validateBlogInput } from '@/lib/blog-schema'
import { readBlogs, writeBlogs } from '@/lib/blog-store'
import { hasJsonContentType, hasValidOrigin, isAdminAuthenticated } from '@/lib/security'

import { getCmsBlogs } from '@/lib/cms-store'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    let cmsList: BlogPost[] = []
    try {
      const cmsData = await getCmsBlogs()
      if (Array.isArray(cmsData) && cmsData.length > 0) {
        cmsList = cmsData
          .filter((b) => b.status === 'published')
          .map((b, idx) => ({
            id: typeof b.id === 'number' ? b.id : idx + 100,
            slug: b.slug,
            title: b.title,
            category: b.category,
            readTime: b.readingTime || '5 min read',
            imageUrl: b.featuredImage || '/images/services-grid/seo.png',
            date: b.publishDate,
            authorName: b.authorName,
            authorRole: b.authorRole,
            authorImage: b.authorImage || '',
            content: b.content,
          }))
      }
    } catch {
      // fallback
    }

    const localBlogs = await readBlogs()
    if (cmsList.length > 0) {
      const sanitySlugs = new Set(cmsList.map((c) => c.slug))
      const remainingLocal = localBlogs.filter((lb) => !sanitySlugs.has(lb.slug))
      return NextResponse.json([...cmsList, ...remainingLocal], {
        headers: { 'Cache-Control': 'no-store' },
      })
    }

    return NextResponse.json(localBlogs, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    console.error('Read blogs error:', error)
    return NextResponse.json({ error: 'Failed to read blogs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!hasValidOrigin(request) || !hasJsonContentType(request)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const validated = validateBlogInput(await request.json())
    if (!validated.success) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    const blogs = await readBlogs()
    if (blogs.some((blog) => blog.slug === validated.data.slug)) {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 409 })
    }

    const maxId = blogs.reduce((max, blog) => Math.max(max, blog.id || 0), 0)
    const post: BlogPost = {
      ...validated.data,
      id: maxId + 1,
      date: validated.data.date || new Date().toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
      }),
    }

    await writeBlogs([post, ...blogs])
    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error) {
    console.error('Save blog error:', error)
    return NextResponse.json({ error: 'Failed to save blog' }, { status: 500 })
  }
}
