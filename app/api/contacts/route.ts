import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  // Send thank you email to the user
  await resend.emails.send({
    from: 'Aamir Mehmood <onboarding@resend.dev>',
    to: email,
    subject: 'Thanks for reaching out!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #ffffff;">
        <h2 style="color: #0F172A; font-size: 22px; margin-bottom: 8px;">Hey ${name}, thanks for reaching out! 👋</h2>
        <p style="color: #475569; font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
          I've received your message and will get back to you within <strong>24 hours</strong>.
        </p>
        <div style="background: #F8FAFC; border-left: 4px solid #2563EB; border-radius: 4px; padding: 16px 20px; margin-bottom: 24px;">
          <p style="color: #64748B; font-size: 13px; margin: 0 0 4px;">Your message:</p>
          <p style="color: #0F172A; font-size: 14px; margin: 0;">${message}</p>
        </div>
        <p style="color: #475569; font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
          In the meantime, feel free to connect with me on
          <a href="https://www.linkedin.com/in/amirmehmood0325/" style="color: #2563EB; text-decoration: none;">LinkedIn</a>
          or reach out via
          <a href="https://wa.me/923018659791" style="color: #2563EB; text-decoration: none;">WhatsApp</a>.
        </p>
        <p style="color: #0F172A; font-size: 15px; margin: 0;">Best regards,<br/><strong>Aamir Mehmood</strong></p>
        <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;" />
        <p style="color: #94A3B8; font-size: 12px; margin: 0;">
          You're receiving this because you submitted a contact form at Aamir's portfolio.
        </p>
      </div>
    `,
  })

  return NextResponse.json({ success: true })
}
