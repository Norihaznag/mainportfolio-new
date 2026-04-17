import { NextRequest } from 'next/server';

const MAX_ADMIN_TOKEN_AGE_MS = 24 * 60 * 60 * 1000;

export type AdminSession = {
  email: string;
  issuedAt: number;
};

export function parseAdminToken(token: string | undefined): AdminSession | null {
  if (!token) return null;

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email, issuedAtRaw] = decoded.split(':');
    const issuedAt = Number(issuedAtRaw);

    if (!email || !Number.isFinite(issuedAt)) return null;
    if (Date.now() - issuedAt > MAX_ADMIN_TOKEN_AGE_MS) return null;

    const expectedAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    if (expectedAdminEmail && email.trim().toLowerCase() !== expectedAdminEmail) return null;

    return { email, issuedAt };
  } catch {
    return null;
  }
}

export function getAdminSessionFromRequest(request: NextRequest): AdminSession | null {
  const token = request.cookies.get('adminToken')?.value;
  return parseAdminToken(token);
}
