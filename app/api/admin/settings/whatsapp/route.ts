import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['whatsapp_number', 'whatsapp_message']);

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    const settings: { [key: string]: string } = {};
    data?.forEach((setting) => {
      settings[setting.key] = setting.value;
    });

    return NextResponse.json({
      whatsapp_number: settings['whatsapp_number'] || '',
      whatsapp_message: settings['whatsapp_message'] || 'Hello Azinag!',
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { whatsapp_number, whatsapp_message } = await request.json();

    // Update or insert whatsapp_number
    if (whatsapp_number) {
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', 'whatsapp_number')
        .maybeSingle();

      if (existing) {
        await supabase
          .from('site_settings')
          .update({ value: whatsapp_number, updated_at: new Date().toISOString() })
          .eq('key', 'whatsapp_number');
      } else {
        await supabase
          .from('site_settings')
          .insert([{ key: 'whatsapp_number', value: whatsapp_number }]);
      }
    }

    // Update or insert whatsapp_message
    if (whatsapp_message) {
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', 'whatsapp_message')
        .maybeSingle();

      if (existing) {
        await supabase
          .from('site_settings')
          .update({ value: whatsapp_message, updated_at: new Date().toISOString() })
          .eq('key', 'whatsapp_message');
      } else {
        await supabase
          .from('site_settings')
          .insert([{ key: 'whatsapp_message', value: whatsapp_message }]);
      }
    }

    return NextResponse.json({
      message: 'WhatsApp settings updated successfully',
      whatsapp_number,
      whatsapp_message,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}
