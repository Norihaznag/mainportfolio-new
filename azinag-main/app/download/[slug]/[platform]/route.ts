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

function toSafeFilename(sourceUrl: string, fallback: string): string {
  try {
    const parsed = new URL(sourceUrl);
    const lastSegment = parsed.pathname.split('/').filter(Boolean).pop() || '';
    const decoded = decodeURIComponent(lastSegment);
    const sanitized = decoded
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    return sanitized || fallback;
  } catch {
    return fallback;
  }
}

function toUpstreamHeaders(upstream: Response, fileName: string): Headers {
  const headers = new Headers();

  headers.set('Cache-Control', 'no-store');
  headers.set('Content-Type', upstream.headers.get('content-type') || 'application/octet-stream');

  const upstreamDisposition = upstream.headers.get('content-disposition');
  if (upstreamDisposition && /attachment/i.test(upstreamDisposition)) {
    headers.set('Content-Disposition', upstreamDisposition);
  } else {
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
  }

  ['content-length', 'etag', 'last-modified'].forEach((headerName) => {
    const value = upstream.headers.get(headerName);
    if (value) {
      headers.set(headerName, value);
    }
  });

  return headers;
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

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(sourceUrl, {
      method: 'GET',
      cache: 'no-store',
      redirect: 'follow',
    });
  } catch {
    return NextResponse.json({ message: 'Unable to reach download source.' }, { status: 502 });
  }

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return NextResponse.json({ message: 'Download source returned an error.' }, { status: 502 });
  }

  const fallbackName = `${app.slug || app.name || 'app'}-${platformParam}.bin`;
  const fileName = toSafeFilename(sourceUrl, fallbackName);

  return new NextResponse(upstreamResponse.body, {
    status: 200,
    headers: toUpstreamHeaders(upstreamResponse, fileName),
  });
}
