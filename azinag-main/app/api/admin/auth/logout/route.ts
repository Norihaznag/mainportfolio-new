import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    message: 'Logged out successfully',
  });

  // Clear the admin token cookie
  response.cookies.set('adminToken', '', {
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
