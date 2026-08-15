import { NextRequest, NextResponse } from 'next/server';

import {
  isBinaryPlatformKey,
  mapDbAppToDownloadableApp,
  type BinaryPlatformKey,
  type DownloadableApp,
} from '@/lib/apps-data';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function getAllowedDownloadHosts(): Set<string> {
  const hosts = new Set<string>();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (supabaseUrl) {
    try {
      hosts.add(new URL(supabaseUrl).hostname.toLowerCase());
    } catch {
      // Ignore invalid env values.
    }
  }

  const extraHostsRaw = process.env.DOWNLOAD_PROXY_ALLOWED_HOSTS?.trim();
  if (extraHostsRaw) {
    extraHostsRaw
      .split(',')
      .map((host) => host.trim().toLowerCase())
      .filter((host) => host.length > 0)
      .forEach((host) => hosts.add(host));
  }

  return hosts;
}

function isAllowedSourceUrl(value: string, allowedHosts: Set<string>): boolean {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:') {
      return false;
    }

    if (allowedHosts.size === 0) {
      return true;
    }

    return allowedHosts.has(parsed.hostname.toLowerCase());
  } catch {
    return false;
  }
}

function resolveBinaryUrl(app: DownloadableApp, platform: BinaryPlatformKey): string | null {
  const platformEntry = app.platforms[platform];
  const sourceUrl = platformEntry?.url?.trim();
  return sourceUrl && sourceUrl.length > 0 ? sourceUrl : null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string; platform: string } }
) {
  const slug = decodeURIComponent(params.slug || '').trim();
  const platformParam = decodeURIComponent(params.platform || '').trim().toLowerCase();

  if (!slug || !isBinaryPlatformKey(platformParam)) {
    return NextResponse.json({ message: 'Invalid download path.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .eq('published', true)
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
  }

  const app = mapDbAppToDownloadableApp(data);
  const sourceUrl = resolveBinaryUrl(app, platformParam);
  if (!sourceUrl) {
    return NextResponse.json({ message: 'Download not available for this platform.' }, { status: 404 });
  }

  const allowedHosts = getAllowedDownloadHosts();
  if (!isAllowedSourceUrl(sourceUrl, allowedHosts)) {
    return NextResponse.json({ message: 'Download source is not allowed.' }, { status: 400 });
  }

  const response = NextResponse.redirect(sourceUrl, { status: 302 });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
