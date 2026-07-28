import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'

function isAdmin() {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  return session && session.value === 'authenticated'
}

export async function POST(request: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
    const filename = `${timestamp}_${safeName}`
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    // Ensure uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true })
    
    const filePath = path.join(uploadDir, filename)
    await fs.writeFile(filePath, buffer)
    
    const url = `/uploads/${filename}`
    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: 'Failed to upload image file' }, { status: 500 })
  }
}
