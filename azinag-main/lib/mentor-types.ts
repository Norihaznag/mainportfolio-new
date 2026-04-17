export type MentorMarket = 'morocco' | 'gcc';
export type ComplexityTier = 'simple' | 'standard' | 'advanced' | 'enterprise';

export interface PackageSignalSummary {
  packageName: string;
  version: string;
  dependencyCount: number;
  devDependencyCount: number;
  scriptCount: number;
  detectedFrameworks: string[];
  detectedCapabilities: string[];
  complexityScore: number;
  complexityTier: ComplexityTier;
  notes: string[];
}

export interface MentorPricingTierRecommendation {
  name: string;
  monthlyUsd: number;
  annualUsd: number;
  setupUsd: number;
  keyFeatures: string[];
  rationale: string;
}

export interface MentorMarketRecommendation {
  market: MentorMarket;
  targetPersona: string;
  positioningAngle: string;
  pricingTiers: MentorPricingTierRecommendation[];
  launchOffer: string;
  discountGuidance: string;
  objectionsToHandle: string[];
}

export interface CampaignChannelBudget {
  channel: string;
  objective: string;
  monthlyBudgetUsd: number;
  targeting: string;
  creativeAngle: string;
  kpiTarget: string;
  killRule: string;
}

export interface CampaignPhasePlan {
  phase: string;
  goals: string[];
  actions: string[];
}

export interface MentorCampaignGuidance {
  launchPlan: CampaignPhasePlan[];
  adHooks: string[];
  budgetSplit: CampaignChannelBudget[];
  landingPageRecommendations: string[];
  kpiTargets: string[];
  killRules: string[];
}

export interface MentorAnalysisResult {
  packageSummary: PackageSignalSummary;
  markets: MentorMarketRecommendation[];
  campaign: MentorCampaignGuidance;
  currency: 'USD';
  modelName: string;
  usedFallback: boolean;
  generatedAt: string;
}

export interface MentorSessionSummary {
  id: string;
  package_name: string;
  markets: string[];
  currency: string;
  model_name: string | null;
  used_fallback: boolean;
  created_by: string;
  created_at: string;
  pricing_recommendations?: MentorMarketRecommendation[];
  campaign_guidance?: MentorCampaignGuidance;
  analysis_result?: MentorAnalysisResult;
}

export interface PricingPrefillPayload {
  name: string;
  price: string;
  description: string;
  features: string;
  sort_order: string;
  active: boolean;
  is_featured: boolean;
}
