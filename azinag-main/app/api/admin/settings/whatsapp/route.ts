import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['whatsapp_number', 'whatsapp_message']);

    if (error) {
      console.error('Supabase GET error:', error);
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
    console.error('GET error:', error);
    return NextResponse.json(
      { message: 'An error occurred', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { whatsapp_number, whatsapp_message } = body;

    console.log('Received data:', { whatsapp_number, whatsapp_message });

    // Update or insert whatsapp_number
    if (whatsapp_number) {
      const { data: existing, error: checkError } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', 'whatsapp_number')
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing number:', checkError);
      }

      if (existing) {
        const { error: updateError } = await supabase
          .from('site_settings')
          .update({ value: whatsapp_number, updated_at: new Date().toISOString() })
          .eq('key', 'whatsapp_number');

        if (updateError) {
          console.error('Error updating whatsapp_number:', updateError);
          throw updateError;
        }
      } else {
        const { error: insertError } = await supabase
          .from('site_settings')
          .insert([{ key: 'whatsapp_number', value: whatsapp_number }]);

        if (insertError) {
          console.error('Error inserting whatsapp_number:', insertError);
          throw insertError;
        }
      }
    }

    // Update or insert whatsapp_message
    if (whatsapp_message) {
      const { data: existing, error: checkError } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', 'whatsapp_message')
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing message:', checkError);
      }

      if (existing) {
        const { error: updateError } = await supabase
          .from('site_settings')
          .update({ value: whatsapp_message, updated_at: new Date().toISOString() })
          .eq('key', 'whatsapp_message');

        if (updateError) {
          console.error('Error updating whatsapp_message:', updateError);
          throw updateError;
        }
      } else {
        const { error: insertError } = await supabase
          .from('site_settings')
          .insert([{ key: 'whatsapp_message', value: whatsapp_message }]);

        if (insertError) {
          console.error('Error inserting whatsapp_message:', insertError);
          throw insertError;
        }
      }
    }

    return NextResponse.json({
      message: 'WhatsApp settings updated successfully',
      whatsapp_number,
      whatsapp_message,
    });
  } catch (error) {
    console.error('POST Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: 'An error occurred', error: errorMessage },
      { status: 500 }
    );
  }
}
