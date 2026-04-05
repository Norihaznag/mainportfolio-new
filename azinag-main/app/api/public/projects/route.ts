import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, description, live_url, thumbnail_url, tags, category, sort_order, featured')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching projects: ', error);
      return NextResponse.json({ projects: [] }, { status: 400 });
    }

    const projects = (data || []).map(item => ({
      id: item.id,
      name: item.title,
      desc: item.description,
      live_url: item.live_url,
      thumbnail_url: item.thumbnail_url,
      tags: item.tags || [],
      category: item.category,
      sort_order: item.sort_order,
      featured: item.featured,
    }));

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects: ', error);
    return NextResponse.json({ projects: [] }, { status: 500 });
  }
}
