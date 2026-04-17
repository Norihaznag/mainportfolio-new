'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AdminShell } from '../_shell';
import type {
  MentorAnalysisResult,
  MentorMarketRecommendation,
  MentorPricingTierRecommendation,
  MentorSessionSummary,
  PricingPrefillPayload,
} from '@/lib/mentor-types';

function formatUsd(value: number): string {
  return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

function marketLabel(market: string): string {
  return market === 'morocco' ? 'Morocco' : 'GCC';
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function toPricingPrefill(
  market: MentorMarketRecommendation,
  tier: MentorPricingTierRecommendation
): PricingPrefillPayload {
  return {
    name: `${marketLabel(market.market)} ${tier.name}`,
    price: String(tier.monthlyUsd),
    description: `${marketLabel(market.market)} package: ${market.positioningAngle}`,
    features: tier.keyFeatures.join('\n'),
    sort_order: '0',
    active: true,
    is_featured: market.market === 'gcc',
  };
}

export default function MentorPage() {
  const router = useRouter();

  const [packageFile, setPackageFile] = useState<File | null>(null);
  const [packageJsonText, setPackageJsonText] = useState('');
  const [analysis, setAnalysis] = useState<MentorAnalysisResult | null>(null);
  const [history, setHistory] = useState<MentorSessionSummary[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/mentor/sessions?limit=10&t=${Date.now()}`, { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : { sessions: [] }))
      .then((payload) => setHistory(payload.sessions || []))
      .catch(() => setHistory([]))
      .finally(() => setLoadingHistory(false));
  }, []);

  const handleAnalyze = async () => {
    if (!packageFile && !packageJsonText.trim()) {
      setError('Upload a package.json or paste JSON first.');
      return;
    }

    setError(null);
    setAnalyzing(true);

    try {
      let response: Response;

      if (packageFile) {
        const formData = new FormData();
        formData.append('packageJsonFile', packageFile);
        if (packageJsonText.trim()) {
          formData.append('packageJsonText', packageJsonText.trim());
        }

        response = await fetch('/api/admin/mentor/analyze', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('/api/admin/mentor/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ packageJsonText: packageJsonText.trim() }),
        });
      }

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message || `Analyze failed (${response.status})`);
      }

      setAnalysis(payload.analysis || null);
      if (payload.session) {
        setHistory((prev) => [payload.session, ...prev.filter((item) => item.id !== payload.session.id)].slice(0, 10));
      }
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Analyze failed.';
      setError(message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplyTier = (market: MentorMarketRecommendation, tier: MentorPricingTierRecommendation) => {
    if (typeof window === 'undefined') return;

    const prefill = toPricingPrefill(market, tier);
    window.localStorage.setItem('mentor_pricing_prefill', JSON.stringify(prefill));
    router.push('/adminos/pricing?source=mentor');
  };

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-ink">Mentor</h1>
        <p className="text-sm text-ink-muted mt-0.5">
          Upload package.json to get monthly and annual pricing guidance for Morocco and GCC in USD.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <section className="lg:col-span-2 border border-border-subtle rounded-2xl bg-surface p-6">
          <h2 className="text-sm font-semibold text-ink mb-4">Input</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                Upload package.json
              </label>
              <input
                type="file"
                accept="application/json,.json"
                onChange={(event) => setPackageFile(event.target.files?.[0] || null)}
                className="text-sm"
              />
              {packageFile && (
                <p className="text-xs text-ink-faint mt-1">
                  Selected {packageFile.name} ({Math.round(packageFile.size / 1024)} KB)
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                Or paste package.json
              </label>
              <textarea
                rows={10}
                value={packageJsonText}
                onChange={(event) => setPackageJsonText(event.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle text-xs text-ink bg-canvas font-mono resize-y"
                placeholder='{"name":"my-app","dependencies":{}}'
              />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <div className="flex items-center gap-3">
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="px-4 py-2 bg-ink text-white text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50"
              >
                {analyzing ? 'Analyzing...' : 'Analyze with Mentor'}
              </button>
              <button
                onClick={() => {
                  setPackageFile(null);
                  setPackageJsonText('');
                  setError(null);
                }}
                className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        <section className="border border-border-subtle rounded-2xl bg-surface p-6">
          <h2 className="text-sm font-semibold text-ink mb-4">Recent Sessions</h2>
          {loadingHistory ? (
            <div className="flex justify-center py-10">
              <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
          ) : history.length === 0 ? (
            <p className="text-sm text-ink-muted">No mentor sessions yet.</p>
          ) : (
            <div className="space-y-3">
              {history.map((session) => (
                <div key={session.id} className="border border-border-subtle rounded-xl p-3 bg-canvas">
                  <p className="text-sm font-semibold text-ink truncate">{session.package_name}</p>
                  <p className="text-xs text-ink-faint mt-0.5">{formatDate(session.created_at)}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent-light text-accent font-medium">
                      {session.currency}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-raised text-ink-faint font-medium">
                      {(session.markets || []).map((item) => marketLabel(item)).join(' + ')}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        session.used_fallback ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {session.used_fallback ? 'Fallback' : session.model_name || 'Gemma'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {!analysis ? (
        <div className="border border-border-subtle rounded-2xl bg-surface p-10 text-center">
          <p className="text-sm text-ink-muted">Mentor results will appear here after analysis.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <section className="border border-border-subtle rounded-2xl bg-surface p-6">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <h2 className="text-base font-semibold text-ink">Analysis Result</h2>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  analysis.usedFallback ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {analysis.usedFallback ? 'Rules fallback' : `Gemma: ${analysis.modelName}`}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="border border-border-subtle rounded-xl p-3 bg-canvas">
                <p className="text-xs text-ink-faint uppercase tracking-wide">Package</p>
                <p className="text-sm font-semibold text-ink mt-1">{analysis.packageSummary.packageName}</p>
              </div>
              <div className="border border-border-subtle rounded-xl p-3 bg-canvas">
                <p className="text-xs text-ink-faint uppercase tracking-wide">Complexity</p>
                <p className="text-sm font-semibold text-ink mt-1">
                  {analysis.packageSummary.complexityTier} ({analysis.packageSummary.complexityScore}/100)
                </p>
              </div>
              <div className="border border-border-subtle rounded-xl p-3 bg-canvas">
                <p className="text-xs text-ink-faint uppercase tracking-wide">Dependencies</p>
                <p className="text-sm font-semibold text-ink mt-1">{analysis.packageSummary.dependencyCount}</p>
              </div>
              <div className="border border-border-subtle rounded-xl p-3 bg-canvas">
                <p className="text-xs text-ink-faint uppercase tracking-wide">Frameworks</p>
                <p className="text-sm font-semibold text-ink mt-1">
                  {analysis.packageSummary.detectedFrameworks.length > 0
                    ? analysis.packageSummary.detectedFrameworks.join(', ')
                    : 'General JS'}
                </p>
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-6">
            {analysis.markets.map((market) => (
              <article key={market.market} className="border border-border-subtle rounded-2xl bg-surface p-6">
                <h3 className="text-base font-semibold text-ink">{marketLabel(market.market)} Pricing Strategy</h3>
                <p className="text-sm text-ink-muted mt-1">{market.targetPersona}</p>
                <p className="text-sm text-ink mt-3 leading-relaxed">{market.positioningAngle}</p>

                <div className="space-y-3 mt-4">
                  {market.pricingTiers.map((tier) => (
                    <div key={tier.name} className="border border-border-subtle rounded-xl p-4 bg-canvas">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div>
                          <p className="text-sm font-semibold text-ink">{tier.name}</p>
                          <p className="text-xs text-ink-muted mt-0.5">{tier.rationale}</p>
                        </div>
                        <button
                          onClick={() => handleApplyTier(market, tier)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-ink text-white hover:bg-ink/90 transition-colors"
                        >
                          Apply to Pricing
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                        <div>
                          <p className="text-xs text-ink-faint uppercase tracking-wide">Monthly</p>
                          <p className="font-semibold text-ink">{formatUsd(tier.monthlyUsd)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-ink-faint uppercase tracking-wide">Annual</p>
                          <p className="font-semibold text-ink">{formatUsd(tier.annualUsd)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-ink-faint uppercase tracking-wide">Setup</p>
                          <p className="font-semibold text-ink">{formatUsd(tier.setupUsd)}</p>
                        </div>
                      </div>

                      <ul className="mt-3 space-y-1">
                        {tier.keyFeatures.map((feature, index) => (
                          <li key={`${tier.name}-${index}`} className="text-xs text-ink-muted">- {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section className="border border-border-subtle rounded-2xl bg-surface p-6 space-y-6">
            <h2 className="text-base font-semibold text-ink">Campaign Guidance</h2>

            <div className="grid lg:grid-cols-3 gap-4">
              {analysis.campaign.launchPlan.map((phase) => (
                <div key={phase.phase} className="border border-border-subtle rounded-xl p-4 bg-canvas">
                  <p className="text-sm font-semibold text-ink">{phase.phase}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mt-2">Goals</p>
                  <ul className="space-y-1 mt-1">
                    {phase.goals.map((goal, index) => (
                      <li key={`${phase.phase}-goal-${index}`} className="text-xs text-ink-muted">- {goal}</li>
                    ))}
                  </ul>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mt-2">Actions</p>
                  <ul className="space-y-1 mt-1">
                    {phase.actions.map((action, index) => (
                      <li key={`${phase.phase}-action-${index}`} className="text-xs text-ink-muted">- {action}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="border border-border-subtle rounded-xl p-4 bg-canvas">
                <p className="text-sm font-semibold text-ink">Ad Hooks</p>
                <ul className="space-y-1 mt-2">
                  {analysis.campaign.adHooks.map((item, index) => (
                    <li key={`hook-${index}`} className="text-xs text-ink-muted">- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-border-subtle rounded-xl p-4 bg-canvas">
                <p className="text-sm font-semibold text-ink">Landing Page Recommendations</p>
                <ul className="space-y-1 mt-2">
                  {analysis.campaign.landingPageRecommendations.map((item, index) => (
                    <li key={`lp-${index}`} className="text-xs text-ink-muted">- {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="border border-border-subtle rounded-xl p-4 bg-canvas">
                <p className="text-sm font-semibold text-ink">KPI Targets</p>
                <ul className="space-y-1 mt-2">
                  {analysis.campaign.kpiTargets.map((item, index) => (
                    <li key={`kpi-${index}`} className="text-xs text-ink-muted">- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-border-subtle rounded-xl p-4 bg-canvas">
                <p className="text-sm font-semibold text-ink">Kill Rules</p>
                <ul className="space-y-1 mt-2">
                  {analysis.campaign.killRules.map((item, index) => (
                    <li key={`kill-${index}`} className="text-xs text-ink-muted">- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </AdminShell>
  );
}
