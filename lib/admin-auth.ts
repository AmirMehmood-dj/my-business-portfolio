import { NextRequest } from 'next/server'

/**
 * Verifies the admin session cookie contains a valid, non-expired JWT.
 * Returns true if authenticated, false otherwise.
 */
export function isAdminAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('sb-access-token')?.value
  if (!token) return false
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    const payload = JSON.parse(
      Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8')
    )
    const now = Math.floor(Date.now() / 1000)
    return typeof payload.exp === 'number' && payload.exp > now
  } catch {
    return false
  }
}
