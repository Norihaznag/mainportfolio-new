import { createHash } from 'crypto';

type CloudinaryCredentials = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

export function getCloudinaryCredentials(): CloudinaryCredentials {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary environment variables are missing.');
  }

  return { cloudName, apiKey, apiSecret };
}

export function signCloudinaryParams(
  params: Record<string, string | number | undefined>,
  apiSecret: string
): string {
  const serialized = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null && String(params[key]).length > 0)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return createHash('sha1').update(`${serialized}${apiSecret}`).digest('hex');
}
