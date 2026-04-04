import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('title, description, content')
      .eq('type', 'project')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase error fetching projects: ", error);
      return NextResponse.json(
        { projects: [] },
        { status: 400 }
      );
    }

    // Mapping the generic content format to the project format expected by the frontend
    const projects = data?.map(item => ({
      name: item.title,
      desc: item.description,
      // For now, we can extract tags from the content field if they exist, or provide defaults
      tags: item.content ? item.content.split(',').map((t: string) => t.trim()) : ['Web'],
    })) || [];

    return NextResponse.json({
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects: ", error);
    return NextResponse.json(
      { projects: [] },
      { status: 500 }
    );
  }
}
