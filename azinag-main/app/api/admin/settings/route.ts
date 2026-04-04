import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const KEYS = ['booking_url', 'contact_email'] as const;

async function upsertKey(key: string, value: string) {
  const { data } = await supabase.from('site_settings').select('id').eq('key', key).maybeSingle();
  if (data) {
    await supabase.from('site_settings').update({ value, updated_at: new Date().toISOString() }).eq('key', key);
  } else {
    await supabase.from('site_settings').insert([{ key, value }]);
  }
}

export async function GET() {
  const { data } = await supabase.from('site_settings').select('key, value').in('key', [...KEYS]);
  const result: Record<string, string> = {};
  data?.forEach(r => { result[r.key] = r.value; });
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    for (const key of KEYS) {
      if (body[key] !== undefined) await upsertKey(key, body[key]);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
