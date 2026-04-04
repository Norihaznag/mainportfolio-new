import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const [pricingRes, settingsRes] = await Promise.all([
      supabase
        .from('pricing')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true }),
      supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['whatsapp_number', 'whatsapp_message']),
    ]);

    let settings: { [key: string]: string } = {};
    if (settingsRes.data) {
      settingsRes.data.forEach((setting) => {
        settings[setting.key] = setting.value;
      });
    }

    return NextResponse.json({
      pricing: pricingRes.data || [],
      whatsapp_number: settings['whatsapp_number'] || '',
      whatsapp_message: settings['whatsapp_message'] || '',
    });
  } catch (error) {
    return NextResponse.json(
      {
        pricing: [],
        whatsapp_number: '',
        whatsapp_message: '',
      }
    );
  }
}
