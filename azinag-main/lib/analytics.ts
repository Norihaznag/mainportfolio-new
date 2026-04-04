// GA4/Google Ads event tracking utilities.
// All functions are safe to call in any environment — they check for gtag before firing.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function track(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params ?? {});
  }
}

export function trackBookCallClick(source?: string) {
  track('book_call_click', { source: source ?? 'unknown' });
}

export function trackPricingCtaClick(source?: string) {
  track('pricing_cta_click', { source: source ?? 'unknown' });
}

export function trackWorkCtaClick(source?: string) {
  track('work_cta_click', { source: source ?? 'unknown' });
}

export function trackLpPrimaryCtaClick(page?: string) {
  track('lp_primary_cta_click', { page: page ?? 'unknown' });
}
