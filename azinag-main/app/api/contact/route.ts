import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ message: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey || !adminEmail) {
      // Fallback: log and return success so the site doesn't break
      console.warn('Contact form: RESEND_API_KEY or ADMIN_EMAIL not set — message not delivered.', {
        name, email, company, message
      });
      return NextResponse.json({ ok: true });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Azinag Contact <onboarding@resend.dev>',
        to: [adminEmail],
        reply_to: email,
        subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || '—'}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return NextResponse.json({ message: 'Failed to send. Please email hello@azinag.com directly.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
