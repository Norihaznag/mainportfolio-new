import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ submissions: data || [], total: data?.length || 0 });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, read } = await request.json();
    const { error } = await supabaseAdmin
      .from('contact_submissions')
      .update({ read })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const { error } = await supabaseAdmin
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
