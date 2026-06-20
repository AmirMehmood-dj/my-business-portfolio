import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, feedback, rating } = body

  if (!name || !feedback || !rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const db = createServerClient()
  const { error } = await db.from('testimonials').insert({
    name,
    feedback,
    rating: parseInt(rating) || 5,
    role: '',
    company: '',
    status: 'pending',
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
