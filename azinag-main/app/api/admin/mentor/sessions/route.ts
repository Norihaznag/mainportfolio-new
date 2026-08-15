import { NextRequest, NextResponse } from 'next/server';

import { getAdminSessionFromRequest } from '@/lib/admin-auth';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function normalizeLimit(rawValue: string | null): number {
  const value = Number(rawValue);
  if (!Number.isFinite(value)) return 20;
  return Math.max(1, Math.min(100, Math.floor(value)));
}

export async function GET(request: NextRequest) {
  const adminSession = getAdminSessionFromRequest(request);
  if (!adminSession) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const sessionId = request.nextUrl.searchParams.get('id');

    if (sessionId) {
      const { data, error } = await supabase
        .from('mentor_sessions')
        .select('*')
        .eq('id', sessionId)
        .maybeSingle();

      if (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }

      return NextResponse.json({ session: data || null });
    }

    const limit = normalizeLimit(request.nextUrl.searchParams.get('limit'));

    const { data, error } = await supabase
      .from('mentor_sessions')
      .select('id, package_name, markets, currency, model_name, used_fallback, created_by, created_at, pricing_recommendations, campaign_guidance')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ sessions: data || [] });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}
