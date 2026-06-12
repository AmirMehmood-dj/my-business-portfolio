import { NextRequest, NextResponse } from 'next/server'

function isTokenValid(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    // Decode the payload (base64url)
    const payload = JSON.parse(
      Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8')
    )
    const now = Math.floor(Date.now() / 1000)
    return typeof payload.exp === 'number' && payload.exp > now
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get('sb-access-token')?.value
  if (!token || !isTokenValid(token)) {
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    response.cookies.delete('sb-access-token')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
