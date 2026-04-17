import type {
  MentorAnalysisResult,
  MentorCampaignGuidance,
  MentorMarketRecommendation,
  PackageSignalSummary,
} from '@/lib/mentor-types';

type UnknownRecord = Record<string, unknown>;

type OllamaGenerateResponse = {
  response?: string;
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asNumber(value: unknown, fallback: number, min: number, max: number): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function asString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asStringArray(value: unknown, maxItems: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => asString(item))
    .filter((item): item is string => !!item)
    .slice(0, maxItems);
}

function roundUsd(value: number): number {
  return Math.max(19, Math.round(value / 5) * 5);
}

function getOllamaBaseUrl(): string {
  const baseUrl = process.env.OLLAMA_BASE_URL?.trim();
  if (!baseUrl) return 'http://127.0.0.1:11434';
  return baseUrl.replace(/\/$/, '');
}

function getOllamaModel(): string {
  return process.env.OLLAMA_MODEL?.trim() || 'gemma3:4b';
}

function getOllamaTimeoutMs(): number {
  const configured = Number(process.env.OLLAMA_TIMEOUT_MS);
  if (Number.isFinite(configured) && configured > 2000) {
    return configured;
  }
  return 14000;
}

function extractJsonBlock(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed;
  }

  const fencedMatch = trimmed.match(/```json\s*([\s\S]*?)```/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
}

function buildPrompt(summary: PackageSignalSummary, baseline: MentorAnalysisResult): string {
  return [
    'You are a senior pricing and growth mentor.',
    'Your task is to refine baseline package pricing and campaign messaging.',
    'Important constraints:',
    '1) Keep currency in USD only.',
    '2) Return strict JSON object only, no markdown, no commentary.',
    '3) Keep recommendations practical for Morocco and GCC.',
    '4) Stay realistic: multipliers in suggested range only.',
    'Expected JSON shape:',
    '{',
    '  "moroccoMultiplier": number between 0.7 and 1.4,',
    '  "gccMultiplier": number between 0.8 and 1.9,',
    '  "moroccoPositioning": "short string",',
    '  "gccPositioning": "short string",',
    '  "adHooks": ["string"],',
    '  "landingPageRecommendations": ["string"],',
    '  "kpiTargets": ["string"],',
    '  "killRules": ["string"],',
    '  "day30": ["string"],',
    '  "day60": ["string"],',
    '  "day90": ["string"]',
    '}',
    `Package summary: ${JSON.stringify(summary)}`,
    `Baseline recommendations: ${JSON.stringify({ markets: baseline.markets, campaign: baseline.campaign })}`,
  ].join('\n');
}

function applyMultiplier(market: MentorMarketRecommendation, multiplier: number, positioning: string | null): MentorMarketRecommendation {
  return {
    ...market,
    positioningAngle: positioning || market.positioningAngle,
    pricingTiers: market.pricingTiers.map((tier) => {
      const monthlyUsd = roundUsd(tier.monthlyUsd * multiplier);
      return {
        ...tier,
        monthlyUsd,
        annualUsd: roundUsd(monthlyUsd * 10),
        setupUsd: roundUsd(monthlyUsd * 2),
      };
    }),
  };
}

function mergeCampaign(
  baseline: MentorCampaignGuidance,
  modelPayload: UnknownRecord
): MentorCampaignGuidance {
  const updatedLaunchPlan = baseline.launchPlan.map((phase) => {
    if (phase.phase === 'Day 1-30') {
      const actions = asStringArray(modelPayload.day30, 8);
      return actions.length > 0 ? { ...phase, actions } : phase;
    }
    if (phase.phase === 'Day 31-60') {
      const actions = asStringArray(modelPayload.day60, 8);
      return actions.length > 0 ? { ...phase, actions } : phase;
    }
    if (phase.phase === 'Day 61-90') {
      const actions = asStringArray(modelPayload.day90, 8);
      return actions.length > 0 ? { ...phase, actions } : phase;
    }
    return phase;
  });

  const adHooks = asStringArray(modelPayload.adHooks, 8);
  const landingPageRecommendations = asStringArray(modelPayload.landingPageRecommendations, 8);
  const kpiTargets = asStringArray(modelPayload.kpiTargets, 8);
  const killRules = asStringArray(modelPayload.killRules, 8);

  return {
    ...baseline,
    launchPlan: updatedLaunchPlan,
    adHooks: adHooks.length > 0 ? adHooks : baseline.adHooks,
    landingPageRecommendations:
      landingPageRecommendations.length > 0 ? landingPageRecommendations : baseline.landingPageRecommendations,
    kpiTargets: kpiTargets.length > 0 ? kpiTargets : baseline.kpiTargets,
    killRules: killRules.length > 0 ? killRules : baseline.killRules,
  };
}

export function shouldUseOllamaMentor(): boolean {
  return (process.env.MENTOR_DISABLE_OLLAMA || '').toLowerCase() !== 'true';
}

export async function enhanceMentorAnalysisWithGemma(
  summary: PackageSignalSummary,
  baseline: MentorAnalysisResult
): Promise<MentorAnalysisResult> {
  const baseUrl = getOllamaBaseUrl();
  const model = getOllamaModel();
  const timeoutMs = getOllamaTimeoutMs();

  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), timeoutMs);

  try {
    const response = await fetch(`${baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: abortController.signal,
      body: JSON.stringify({
        model,
        stream: false,
        format: 'json',
        options: {
          temperature: 0.25,
        },
        prompt: buildPrompt(summary, baseline),
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as OllamaGenerateResponse;
    const responseText = asString(payload.response);
    if (!responseText) {
      throw new Error('Ollama returned empty response.');
    }

    const modelPayload = JSON.parse(extractJsonBlock(responseText));
    if (!isRecord(modelPayload)) {
      throw new Error('Model output is not a JSON object.');
    }

    const morocco = baseline.markets.find((market) => market.market === 'morocco');
    const gcc = baseline.markets.find((market) => market.market === 'gcc');
    if (!morocco || !gcc) {
      throw new Error('Baseline analysis is missing market entries.');
    }

    const moroccoMultiplier = asNumber(modelPayload.moroccoMultiplier, 1, 0.7, 1.4);
    const gccMultiplier = asNumber(modelPayload.gccMultiplier, 1, 0.8, 1.9);

    const improvedMorocco = applyMultiplier(
      morocco,
      moroccoMultiplier,
      asString(modelPayload.moroccoPositioning)
    );
    const improvedGcc = applyMultiplier(gcc, gccMultiplier, asString(modelPayload.gccPositioning));

    return {
      ...baseline,
      markets: [improvedMorocco, improvedGcc],
      campaign: mergeCampaign(baseline.campaign, modelPayload),
      modelName: model,
      usedFallback: false,
      generatedAt: new Date().toISOString(),
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
