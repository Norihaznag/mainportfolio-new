export type CloudinaryUploadResourceType = 'image' | 'raw';

type CloudinaryUploadOptions = {
  folder: string;
  resourceType: CloudinaryUploadResourceType;
  publicId?: string;
  tags?: string[];
};

type CloudinarySignResponse = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  publicId?: string;
  tags?: string;
  resourceType: CloudinaryUploadResourceType;
};

type SupabaseFileUploadResponse = {
  fileUrl: string;
  objectPath: string;
  bytes: number;
  contentType: string;
  bucket: string;
};

export type SupabaseFileUploadOptions = {
  folder: string;
};

export type CloudinaryUploadResult = {
  secureUrl: string;
  bytes?: number;
  format?: string;
  resourceType?: string;
  originalFilename?: string;
};

const BLOCKED_RAW_EXTENSIONS = new Set(['exe', 'dll', 'bat', 'cmd', 'com', 'scr']);

function getFileExtension(fileName: string): string {
  const parts = fileName.toLowerCase().split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

function getPreflightRawUploadError(file: File): string | null {
  const extension = getFileExtension(file.name);
  if (!extension) return null;

  if (BLOCKED_RAW_EXTENSIONS.has(extension)) {
    return `Direct .${extension} uploads are blocked by Cloudinary. Upload a .zip/.7z archive instead, or paste a direct download URL.`;
  }

  return null;
}

function toFriendlyCloudinaryError(message: string): string {
  const blockedMatch = message.match(/resources with extension\s+([a-z0-9]+)\s+are not allowed/i);
  if (blockedMatch?.[1]) {
    const extension = blockedMatch[1].toLowerCase();
    return `Cloudinary blocked .${extension} for this upload. Use a .zip/.7z archive instead, or paste a direct download URL.`;
  }

  return message;
}

export async function uploadFileToCloudinary(
  file: File,
  options: CloudinaryUploadOptions
): Promise<CloudinaryUploadResult> {
  if (options.resourceType === 'raw') {
    const preflightError = getPreflightRawUploadError(file);
    if (preflightError) {
      throw new Error(preflightError);
    }
  }

  const signResponse = await fetch('/api/admin/upload/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });

  if (!signResponse.ok) {
    const err = await signResponse.json().catch(() => ({}));
    throw new Error(err.message || `Signing failed (${signResponse.status})`);
  }

  const signatureData = (await signResponse.json()) as CloudinarySignResponse;
  const uploadUrl = `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/${signatureData.resourceType}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signatureData.apiKey);
  formData.append('timestamp', String(signatureData.timestamp));
  formData.append('signature', signatureData.signature);
  formData.append('folder', signatureData.folder);

  if (signatureData.publicId) {
    formData.append('public_id', signatureData.publicId);
  }
  if (signatureData.tags) {
    formData.append('tags', signatureData.tags);
  }

  const uploadResponse = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  const payload = await uploadResponse.json().catch(() => ({}));
  if (!uploadResponse.ok) {
    const message =
      typeof payload?.error?.message === 'string'
        ? payload.error.message
        : `Upload failed (${uploadResponse.status})`;
    throw new Error(toFriendlyCloudinaryError(message));
  }

  return {
    secureUrl: payload.secure_url,
    bytes: payload.bytes,
    format: payload.format,
    resourceType: payload.resource_type,
    originalFilename: payload.original_filename,
  };
}

export async function uploadFileToSupabaseStorage(
  file: File,
  options: SupabaseFileUploadOptions
): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', options.folder);

  const uploadResponse = await fetch('/api/admin/upload/supabase-file', {
    method: 'POST',
    body: formData,
  });

  const payload = (await uploadResponse.json().catch(() => ({}))) as Partial<SupabaseFileUploadResponse> & {
    message?: string;
  };

  if (!uploadResponse.ok) {
    throw new Error(payload.message || `Supabase upload failed (${uploadResponse.status})`);
  }

  if (!payload.fileUrl) {
    throw new Error('Supabase upload succeeded but no public URL was returned.');
  }

  return {
    secureUrl: payload.fileUrl,
    bytes: file.size,
    format: getFileExtension(file.name),
    resourceType: 'raw',
    originalFilename: file.name,
  };
}
