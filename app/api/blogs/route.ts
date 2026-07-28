import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'
import { BlogPost } from '../../blog/posts'

const filePath = path.join(process.cwd(), 'data', 'blogs.json')

function isAdmin() {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  return session && session.value === 'authenticated'
}

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const blogs: BlogPost[] = JSON.parse(data)
    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Read blogs error:", error)
    return NextResponse.json({ error: 'Failed to read blogs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const newPost = await request.json()

    // Read current blogs
    const data = await fs.readFile(filePath, 'utf-8')
    const blogs: BlogPost[] = JSON.parse(data)

    if (blogs.some((b) => b.slug === newPost.slug)) {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 400 })
    }

    const maxId = blogs.reduce((max: number, b) => Math.max(max, b.id || 0), 0)
    newPost.id = maxId + 1
    
    // Set current date if not provided
    if (!newPost.date) {
      newPost.date = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    }

    blogs.unshift(newPost)

    await fs.writeFile(filePath, JSON.stringify(blogs, null, 2), 'utf-8')

    return NextResponse.json({ success: true, post: newPost })
  } catch (error) {
    console.error("Save blog error:", error)
    return NextResponse.json({ error: 'Failed to save blog' }, { status: 500 })
  }
}
