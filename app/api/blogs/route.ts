import { NextResponse } from 'next/server'
import type { BlogPost } from '@/app/blog/posts'
import { validateBlogInput } from '@/lib/blog-schema'
import { readBlogs, writeBlogs } from '@/lib/blog-store'
import { hasJsonContentType, hasValidOrigin, isAdminAuthenticated } from '@/lib/security'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return NextResponse.json(await readBlogs(), {
      headers: { 'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=60' },
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
