import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore static assets and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 1. Dynamic Redirect Execution Engine
  try {
    const res = await fetch(new URL('/api/cms/redirects', request.url), { cache: 'no-store' })
    if (res.ok) {
      const redirects = await res.json()
      if (Array.isArray(redirects)) {
        const match = redirects.find((r: any) => r.isActive && r.sourcePath?.toLowerCase() === pathname.toLowerCase())
        if (match && match.destination) {
          const destUrl = match.destination.startsWith('http')
            ? match.destination
            : new URL(match.destination, request.url)
          return NextResponse.redirect(destUrl, match.statusCode || 301)
        }
      }
    }
  } catch (err) {
    // Fail gracefully to avoid blocking site
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
