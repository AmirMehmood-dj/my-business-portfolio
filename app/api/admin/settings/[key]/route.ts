import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { isAdminAuthenticated } from '@/lib/admin-auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params
  const db = createServerClient()
  const { data, error } = await db.from('settings').select('value').eq('key', key).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data?.value ?? null)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  if (!isAdminAuthenticated(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { key } = await params
  const value = await request.json()
  const db = createServerClient()
  const { error } = await db.from('settings').upsert({ key, value, updated_at: new Date().toISOString() })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
