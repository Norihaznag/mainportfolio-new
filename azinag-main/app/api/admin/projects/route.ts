import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ projects: data || [], total: data?.length || 0 });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, live_url, thumbnail_url, tags, category, sort_order, featured, published } = body;

    if (!title?.trim()) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: title.trim(),
        description: description?.trim() || null,
        live_url: live_url?.trim() || null,
        thumbnail_url: thumbnail_url?.trim() || null,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []),
        category: category?.trim() || 'Web',
        sort_order: sort_order ?? 0,
        featured: featured ?? false,
        published: published ?? true,
      }])
      .select();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(data?.[0], { status: 201 });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
