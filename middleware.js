// This is a placeholder for admin route protection.
// In a real app, use Supabase Auth or a secure cookie for server-side protection.
// For now, this middleware does nothing, but you can upgrade it later.

export function middleware(req) {
  // Example: if (!req.cookies.get('admin_authed')) redirect('/login')
  return;
}

export const config = {
  matcher: ['/admin'],
}; 