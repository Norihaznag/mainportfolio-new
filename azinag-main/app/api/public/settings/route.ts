import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    const { data } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['booking_url', 'contact_email']);

    const settings: Record<string, string> = {};
    data?.forEach((row) => {
      settings[row.key] = row.value;
    });

    return NextResponse.json({
      booking_url: settings['booking_url'] ?? '',
      contact_email: settings['contact_email'] ?? '',
    });
  } catch {
    return NextResponse.json({ booking_url: '', contact_email: '' });
  }
}
