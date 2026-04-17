import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, live_url, thumbnail_url, download_url, tags, category, sort_order, featured, published } = body;

    if (!title?.trim()) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('projects')
      .update({
        title: title.trim(),
        description: description?.trim() || null,
        live_url: live_url?.trim() || null,
        thumbnail_url: thumbnail_url?.trim() || null,
        download_url: download_url?.trim() || null,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []),
        category: category?.trim() || 'Web',
        sort_order: sort_order ?? 0,
        featured: featured ?? false,
        published: published ?? true,
        updated_at: new Date().toISOString(),
      })
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
    const { error } = await supabase.from('projects').delete().eq('id', params.id);
    if (error) return NextResponse.json({ message: error.message }, { status: 400 });
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
