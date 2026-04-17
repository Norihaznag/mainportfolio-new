import type {
  MentorAnalysisResult,
  MentorCampaignGuidance,
  MentorMarket,
  MentorMarketRecommendation,
  MentorPricingTierRecommendation,
  PackageSignalSummary,
} from '@/lib/mentor-types';

function roundUsd(value: number): number {
  return Math.max(19, Math.round(value / 5) * 5);
}

function annualFromMonthly(monthlyUsd: number): number {
  return roundUsd(monthlyUsd * 10);
}

function setupFromMonthly(monthlyUsd: number): number {
  return roundUsd(monthlyUsd * 2);
}

function getBaseMonthlyPrice(summary: PackageSignalSummary): number {
  const tierBoost: Record<PackageSignalSummary['complexityTier'], number> = {
    simple: 0,
    standard: 25,
    advanced: 70,
    enterprise: 140,
  };

  return roundUsd(45 + summary.complexityScore * 2.4 + tierBoost[summary.complexityTier]);
}

function buildTierFeatures(summary: PackageSignalSummary, market: MentorMarket, tierName: string): string[] {
  const frameworkLine =
    summary.detectedFrameworks.length > 0
      ? `Optimized for ${summary.detectedFrameworks.slice(0, 2).join(' + ')}`
      : 'Framework-agnostic implementation support';

  const marketLine =
    market === 'morocco'
      ? 'Pricing psychology tuned for cost-sensitive Moroccan buyers'
      : 'Value framing tuned for GCC decision makers and procurement teams';

  const tierSpecific: Record<string, string[]> = {
    Starter: [
      'Core setup with clear scope boundaries',
      'Weekly progress snapshot and roadmap visibility',
      'Essential performance and conversion tracking',
    ],
    Growth: [
      'Advanced onboarding and retention flows',
      'Campaign-ready positioning and messaging assets',
      'Monthly optimization sprint and prioritized backlog',
    ],
    Scale: [
      'Multi-channel growth loops and experimentation plan',
      'High-intent funnel refinement and CRO iterations',
      'Executive reporting with margin and CAC visibility',
    ],
  };

  return [frameworkLine, marketLine, ...tierSpecific[tierName]];
}

function buildTier(
  summary: PackageSignalSummary,
  market: MentorMarket,
  tierName: string,
  baseMonthly: number,
  multiplier: number,
  rationale: string
): MentorPricingTierRecommendation {
  const monthlyUsd = roundUsd(baseMonthly * multiplier);

  return {
    name: tierName,
    monthlyUsd,
    annualUsd: annualFromMonthly(monthlyUsd),
    setupUsd: setupFromMonthly(monthlyUsd),
    keyFeatures: buildTierFeatures(summary, market, tierName),
    rationale,
  };
}

function buildMarketRecommendation(summary: PackageSignalSummary, market: MentorMarket): MentorMarketRecommendation {
  const baseMonthly = getBaseMonthlyPrice(summary);

  if (market === 'morocco') {
    return {
      market,
      targetPersona: 'Price-conscious owner who needs clear ROI before committing long term.',
      positioningAngle:
        'Lead with immediate revenue protection and operational clarity. Show how every dollar saves manual work or improves close rate.',
      pricingTiers: [
        buildTier(
          summary,
          market,
          'Starter',
          baseMonthly,
          0.58,
          'Entry anchor for high-conversion tests while protecting service quality.'
        ),
        buildTier(
          summary,
          market,
          'Growth',
          baseMonthly,
          0.84,
          'Default offer for SMEs ready to pay when outcomes are measurable.'
        ),
        buildTier(
          summary,
          market,
          'Scale',
          baseMonthly,
          1.22,
          'Premium option for businesses needing speed, support, and structured growth.'
        ),
      ],
      launchOffer: 'Offer first 30-day onboarding sprint with a measurable KPI target and a fixed execution checklist.',
      discountGuidance:
        'Keep list price visible, then offer annual commitment discount only after value proof. Avoid permanent deep discounts.',
      objectionsToHandle: [
        '"Why is this not a one-time payment?"',
        '"Can we start cheaper and upgrade later?"',
        '"How fast can we recover the subscription cost?"',
      ],
    };
  }

  return {
    market,
    targetPersona: 'Growth-oriented operator or founder optimizing for speed, reliability, and execution capacity.',
    positioningAngle:
      'Position as a revenue acceleration partner, not a freelancer. Emphasize predictable delivery and strategic support.',
    pricingTiers: [
      buildTier(
        summary,
        market,
        'Starter',
        baseMonthly,
        0.95,
        'Low-friction GCC entry offer while preserving implementation depth.'
      ),
      buildTier(
        summary,
        market,
        'Growth',
        baseMonthly,
        1.33,
        'Primary GCC offer balancing service depth and decision speed.'
      ),
      buildTier(
        summary,
        market,
        'Scale',
        baseMonthly,
        1.88,
        'Executive tier for aggressive growth teams requiring dedicated support.'
      ),
    ],
    launchOffer: 'Bundle onboarding, analytics dashboard, and first campaign sprint as a fast-start package.',
    discountGuidance:
      'Keep premium framing. Offer annual discount only for multi-quarter partnership or prepaid execution blocks.',
    objectionsToHandle: [
      '"How is this better than adding one internal hire?"',
      '"What reporting cadence do we get?"',
      '"Can you adapt quickly to stakeholder requests?"',
    ],
  };
}

function buildCampaignGuidance(summary: PackageSignalSummary): MentorCampaignGuidance {
  const budgetBase =
    summary.complexityTier === 'enterprise'
      ? 3600
      : summary.complexityTier === 'advanced'
      ? 2200
      : summary.complexityTier === 'standard'
      ? 1200
      : 700;

  return {
    launchPlan: [
      {
        phase: 'Day 1-30',
        goals: ['Validate offer-message fit', 'Collect first qualified lead cohort'],
        actions: [
          'Launch one core offer page with single CTA and proof-focused headline.',
          'Run two ad angles: cost-saving angle and growth-speed angle.',
          'Track inquiry source, lead quality score, and first-call show-up rate daily.',
        ],
      },
      {
        phase: 'Day 31-60',
        goals: ['Improve lead quality', 'Raise conversion from call to proposal'],
        actions: [
          'Pause low-intent audiences and reallocate budget to high-intent segments.',
          'Introduce testimonial-driven creative and objection-handling copy.',
          'Add retargeting sequence for visitors who viewed pricing but did not book.',
        ],
      },
      {
        phase: 'Day 61-90',
        goals: ['Scale profitable channels', 'Stabilize CAC and payback period'],
        actions: [
          'Expand winning campaign angle to adjacent audience clusters.',
          'Introduce annual-plan incentive after second touchpoint.',
          'Set weekly leadership review with CAC, close rate, and gross margin by package.',
        ],
      },
    ],
    adHooks: [
      'Stop losing qualified leads because your product story is unclear.',
      'Turn your current traffic into booked calls with a proof-first funnel.',
      'Get a growth system built for action, not endless planning meetings.',
      'Compete with larger brands by selling clarity and speed.',
      'Convert price-sensitive buyers by showing ROI in the first 30 days.',
      'Scale in GCC with premium framing while keeping your offer simple to buy.',
    ],
    budgetSplit: [
      {
        channel: 'Meta Ads',
        objective: 'Top-of-funnel demand capture',
        monthlyBudgetUsd: roundUsd(budgetBase * 0.45),
        targeting: 'Founder/operator interests + lookalikes from qualified leads',
        creativeAngle: 'Pain-to-outcome storytelling with before/after proof',
        kpiTarget: 'CTR >= 1.5% and CPL <= baseline target for market',
        killRule: 'Pause any ad set with spend > 2x target CPL and no qualified calls',
      },
      {
        channel: 'Google Search',
        objective: 'High-intent conversion',
        monthlyBudgetUsd: roundUsd(budgetBase * 0.35),
        targeting: 'Commercial intent keywords around development + automation outcomes',
        creativeAngle: 'Direct promise + clear turnaround + trust signals',
        kpiTarget: 'Lead-to-call rate >= 30%',
        killRule: 'Pause keyword groups with zero qualified leads after 25 clicks',
      },
      {
        channel: 'Retargeting',
        objective: 'Recover warm traffic and close delayed decisions',
        monthlyBudgetUsd: roundUsd(budgetBase * 0.2),
        targeting: 'Site visitors, pricing viewers, and engaged social audiences',
        creativeAngle: 'Case proof, FAQ objections, and urgency with structured offer',
        kpiTarget: 'Retargeted CPL <= 70% of cold CPL',
        killRule: 'Refresh creatives if frequency > 3.5 and CTR drops below 0.8%',
      },
    ],
    landingPageRecommendations: [
      'Use one headline focused on financial outcome, not technology details.',
      'Place pricing anchor near fold with what is included in the first 30 days.',
      'Add social proof blocks tied to concrete outcomes and timelines.',
      'Include a clear comparison against doing nothing and hiring internally.',
      'Show one CTA path for Morocco and one for GCC if audiences are mixed.',
      'Surface risk-reversal policy and onboarding timeline above the final CTA.',
    ],
    kpiTargets: [
      'Landing page conversion to booked call: 2.5%+ (cold) / 5%+ (retargeted).',
      'Call show-up rate: 70%+ using reminder sequence.',
      'Proposal acceptance rate: 25%+ in first 60 days, 35%+ after messaging refinement.',
      'CAC payback target: <= 3 months for Growth tier customers.',
      'Gross margin guardrail: keep delivery cost <= 45% of monthly package revenue.',
    ],
    killRules: [
      'Pause any channel with CPL above 1.8x target for 7 days in a row.',
      'Rewrite offer framing if proposal acceptance stays below 20% for 10 calls.',
      'Cut audiences with low call quality score (< 6/10) after 20 leads.',
      'Do not scale spend until lead-to-close ratio is stable for two consecutive weeks.',
      'Stop discounting if win rate does not improve after two discount tests.',
    ],
  };
}

export function createFallbackMentorAnalysis(summary: PackageSignalSummary): MentorAnalysisResult {
  return {
    packageSummary: summary,
    markets: [buildMarketRecommendation(summary, 'morocco'), buildMarketRecommendation(summary, 'gcc')],
    campaign: buildCampaignGuidance(summary),
    currency: 'USD',
    modelName: 'fallback-rules-v1',
    usedFallback: true,
    generatedAt: new Date().toISOString(),
  };
}
