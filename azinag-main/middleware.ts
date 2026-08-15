import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LEGACY_GONE_PATHS = new Set([
  '/projects',
  '/showcase',
  '/lp/startup-mvp-development',
  '/lp/landing-page-development',
]);

export function middleware(request: NextRequest) {
  if (LEGACY_GONE_PATHS.has(request.nextUrl.pathname)) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
