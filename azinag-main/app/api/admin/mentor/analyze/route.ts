import { NextRequest, NextResponse } from 'next/server';

import { getAdminSessionFromRequest } from '@/lib/admin-auth';
import { analyzePackageJson, sanitizePackageJsonObject } from '@/lib/mentor-analyzer';
import { createFallbackMentorAnalysis } from '@/lib/mentor-fallback';
import { enhanceMentorAnalysisWithGemma, shouldUseOllamaMentor } from '@/lib/mentor-gemma';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const MAX_PACKAGE_BYTES = 200 * 1024;

class RequestValidationError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function ensureSizeLimit(rawText: string) {
  const bytes = Buffer.byteLength(rawText, 'utf-8');
  if (bytes > MAX_PACKAGE_BYTES) {
    throw new RequestValidationError('package.json is too large. Keep it under 200KB.');
  }
}

async function parseMultipartPayload(request: NextRequest): Promise<{ rawText: string; inputMode: string }> {
  const formData = await request.formData();
  const packageFile = formData.get('packageJsonFile');
  const packageText = formData.get('packageJsonText');

  if (packageFile instanceof File && packageFile.size > 0) {
    if (packageFile.size > MAX_PACKAGE_BYTES) {
      throw new RequestValidationError('Uploaded package.json is too large. Keep it under 200KB.');
    }

    return {
      rawText: await packageFile.text(),
      inputMode: 'file',
    };
  }

  if (typeof packageText === 'string' && packageText.trim().length > 0) {
    return {
      rawText: packageText.trim(),
      inputMode: 'textarea',
    };
  }

  throw new RequestValidationError('Please upload a package.json file or paste JSON content.');
}

async function parseJsonPayload(request: NextRequest): Promise<{ rawText: string; inputMode: string }> {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  if (!body) {
    throw new RequestValidationError('Invalid JSON request payload.');
  }

  if (typeof body.packageJsonText === 'string' && body.packageJsonText.trim().length > 0) {
    return {
      rawText: body.packageJsonText.trim(),
      inputMode: 'json-text',
    };
  }

  if (typeof body.packageJson === 'string' && body.packageJson.trim().length > 0) {
    return {
      rawText: body.packageJson.trim(),
      inputMode: 'json-string',
    };
  }

  if (typeof body.packageJson === 'object' && body.packageJson !== null) {
    return {
      rawText: JSON.stringify(body.packageJson),
      inputMode: 'json-object',
    };
  }

  throw new RequestValidationError('Missing packageJson payload.');
}

async function extractRequestPayload(request: NextRequest): Promise<{ rawText: string; inputMode: string }> {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('multipart/form-data')) {
    return parseMultipartPayload(request);
  }

  if (contentType.includes('application/json')) {
    return parseJsonPayload(request);
  }

  const fallbackRawText = await request.text();
  if (!fallbackRawText.trim()) {
    throw new RequestValidationError('No package.json payload was provided.');
  }

  return {
    rawText: fallbackRawText.trim(),
    inputMode: 'raw-text',
  };
}

export async function POST(request: NextRequest) {
  const adminSession = getAdminSessionFromRequest(request);
  if (!adminSession) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { rawText, inputMode } = await extractRequestPayload(request);
    ensureSizeLimit(rawText);

    const parsedPackageJson = JSON.parse(rawText);
    const sanitizedPackageJson = sanitizePackageJsonObject(parsedPackageJson);

    if (!sanitizedPackageJson) {
      throw new RequestValidationError('package.json must be a JSON object.');
    }

    const packageSummary = analyzePackageJson(sanitizedPackageJson);

    let analysis = createFallbackMentorAnalysis(packageSummary);

    if (shouldUseOllamaMentor()) {
      try {
        analysis = await enhanceMentorAnalysisWithGemma(packageSummary, analysis);
      } catch (error) {
        console.error('Mentor Gemma enhancement failed. Falling back to rules.', error);
      }
    }

    let sessionSummary: Record<string, unknown> | null = null;

    try {
      const sessionPayload = {
        package_name: packageSummary.packageName,
        package_json: parsedPackageJson,
        analysis_result: analysis,
        pricing_recommendations: analysis.markets,
        campaign_guidance: analysis.campaign,
        markets: analysis.markets.map((market) => market.market),
        currency: analysis.currency,
        model_name: analysis.modelName,
        used_fallback: analysis.usedFallback,
        created_by: adminSession.email,
      };

      const { data, error } = await supabase
        .from('mentor_sessions')
        .insert([sessionPayload])
        .select('id, package_name, markets, currency, model_name, used_fallback, created_by, created_at')
        .maybeSingle();

      if (error) {
        console.error('Failed to persist mentor session:', error.message);
      } else if (data) {
        sessionSummary = data;
      }
    } catch (error) {
      console.error('Unexpected mentor session persistence error:', error);
    }

    return NextResponse.json({
      analysis,
      session: sessionSummary,
      inputMode,
    });
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: 'package.json is not valid JSON.' },
        { status: 400 }
      );
    }

    console.error('Mentor analyze error:', error);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}
