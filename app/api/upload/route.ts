import { put } from '@vercel/blob'
import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import { hasValidOrigin, isAdminAuthenticated } from '@/lib/security'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const allowedTypes: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

export async function POST(request: Request) {
  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!hasValidOrigin(request)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }
    if (!allowedTypes[file.type] || file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Use a JPG, PNG, WebP or GIF image up to 5 MB' }, { status: 400 })
    }

    const baseName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 80) || 'image'
    const pathname = `blog-images/${baseName}-${randomUUID()}.${allowedTypes[file.type]}`

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(pathname, file, {
        access: 'public',
        addRandomSuffix: true,
        contentType: file.type,
      })
      return NextResponse.json({ success: true, url: blob.url })
    }

    if (process.env.VERCEL) {
      return NextResponse.json({ error: 'Image storage is not configured' }, { status: 503 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(path.join(uploadDir, path.basename(pathname)), Buffer.from(await file.arrayBuffer()))
    return NextResponse.json({ success: true, url: `/uploads/${path.basename(pathname)}` })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload image file' }, { status: 500 })
  }
}
