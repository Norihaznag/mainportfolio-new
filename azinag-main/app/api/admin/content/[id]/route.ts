import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('content')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', params.id)
      .select();
    if (error) return NextResponse.json({ message: error.message }, { status: 400 });
    return NextResponse.json(data?.[0]);
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase.from('content').delete().eq('id', params.id);
    if (error) return NextResponse.json({ message: error.message }, { status: 400 });
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
