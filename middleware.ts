import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Valid languages
  const validLanguages = ['en', 'fr', 'ar'];

  // Check if pathname starts with a language code
  const pathnameHasLanguage = /^\/(en|fr|ar)($|\/)/.test(pathname);

  // If no language in pathname and not API route or admin route, redirect to default language (ar)
  if (!pathnameHasLanguage && !pathname.startsWith('/api') && !pathname.startsWith('/admin')) {
    return NextResponse.redirect(
      new URL(`/ar${pathname === '/' ? '' : pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
