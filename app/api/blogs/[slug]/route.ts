import { NextResponse } from 'next/server'
import type { BlogPost } from '@/app/blog/posts'
import { validateBlogInput } from '@/lib/blog-schema'
import { readBlogs, writeBlogs } from '@/lib/blog-store'
import { hasJsonContentType, hasValidOrigin, isAdminAuthenticated } from '@/lib/security'

type RouteContext = { params: Promise<{ slug: string }> }

export const dynamic = 'force-dynamic'

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params
    const post = (await readBlogs()).find((blog) => blog.slug === slug)
    if (!post) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    return NextResponse.json(post, { headers: { 'Cache-Control': 'public, max-age=0, s-maxage=30' } })
  } catch (error) {
    console.error('Read single blog error:', error)
    return NextResponse.json({ error: 'Failed to read blog' }, { status: 500 })
  }
}

export async function PUT(request: Request, context: RouteContext) {
  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!hasValidOrigin(request) || !hasJsonContentType(request)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const { slug } = await context.params
    const validated = validateBlogInput(await request.json())
    if (!validated.success) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    const blogs = await readBlogs()
    const index = blogs.findIndex((blog) => blog.slug === slug)
    if (index === -1) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    if (validated.data.slug !== slug && blogs.some((blog) => blog.slug === validated.data.slug)) {
      return NextResponse.json({ error: 'A blog with this new slug already exists' }, { status: 409 })
    }

    const post: BlogPost = {
      ...validated.data,
      id: blogs[index].id,
      date: validated.data.date || blogs[index].date,
    }
    blogs[index] = post
    await writeBlogs(blogs)
    return NextResponse.json({ success: true, post })
  } catch (error) {
    console.error('Update blog error:', error)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!hasValidOrigin(request)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const { slug } = await context.params
    const blogs = await readBlogs()
    const nextBlogs = blogs.filter((blog) => blog.slug !== slug)
    if (nextBlogs.length === blogs.length) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    await writeBlogs(nextBlogs)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete blog error:', error)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
