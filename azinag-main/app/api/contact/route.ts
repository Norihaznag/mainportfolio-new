import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ message: 'Name, email, and message are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 });
    }

    // Primary: save to Supabase (always works, no external dependency)
    const { error: dbError } = await supabaseAdmin
      .from('contact_submissions')
      .insert([{
        name: name.trim(),
        email: email.trim(),
        company: company?.trim() || null,
        message: message.trim(),
      }]);

    if (dbError) {
      console.error('Supabase contact error:', dbError);
      return NextResponse.json({ message: 'Failed to save your message. Please email hello@azinag.com directly.' }, { status: 500 });
    }

    // Best-effort: send email notification via Resend if configured
    const resendKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    if (resendKey && contactEmail) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Azinag Contact <onboarding@resend.dev>',
            to: [contactEmail],
            reply_to: email,
            subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
            text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\n\n${message}`,
          }),
        });
      } catch {
        // Email notification is best-effort — submission already saved in DB
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
