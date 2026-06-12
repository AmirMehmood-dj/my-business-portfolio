import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, subject, message } = body
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const db = createServerClient()
  const { error } = await db.from('contacts').insert({
    name,
    email,
    budget: subject ?? '',
    message,
    status: 'new',
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
