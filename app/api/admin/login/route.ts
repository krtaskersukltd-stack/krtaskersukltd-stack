import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123"

    if (password === expectedPassword) {
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
      return response
    } else {
      return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 })
    }
  } catch (error) {
    console.error("Login route error:", error)
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
