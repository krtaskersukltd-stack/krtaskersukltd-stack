import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'
import { BlogPost } from '../../../blog/posts'

const filePath = path.join(process.cwd(), 'data', 'blogs.json')

function isAdmin() {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  return session && session.value === 'authenticated'
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const blogs: BlogPost[] = JSON.parse(data)
    const post = blogs.find((b) => b.slug === params.slug)

    if (!post) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Read single blog error:", error)
    return NextResponse.json({ error: 'Failed to read blog' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const updatedPost: BlogPost = await request.json()
    const data = await fs.readFile(filePath, 'utf-8')
    const blogs: BlogPost[] = JSON.parse(data)

    const index = blogs.findIndex((b) => b.slug === params.slug)
    if (index === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    if (updatedPost.slug !== params.slug && blogs.some((b) => b.slug === updatedPost.slug)) {
      return NextResponse.json({ error: 'A blog with this new slug already exists' }, { status: 400 })
    }

    updatedPost.id = blogs[index].id
    updatedPost.date = updatedPost.date || blogs[index].date

    blogs[index] = updatedPost

    await fs.writeFile(filePath, JSON.stringify(blogs, null, 2), 'utf-8')

    return NextResponse.json({ success: true, post: updatedPost })
  } catch (error) {
    console.error("Update blog error:", error)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const blogs: BlogPost[] = JSON.parse(data)

    const index = blogs.findIndex((b) => b.slug === params.slug)
    if (index === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    blogs.splice(index, 1)

    await fs.writeFile(filePath, JSON.stringify(blogs, null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete blog error:", error)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
