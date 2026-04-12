'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { trackBookCallClick, trackPricingCtaClick, trackWorkCtaClick, trackLpPrimaryCtaClick } from '@/lib/analytics';

type TrackEvent = 'book_call' | 'pricing_cta' | 'work_cta' | 'lp_primary_cta';

interface CTAButtonProps {
  label: string;
  trackEvent?: TrackEvent;
  trackSource?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fallbackHref?: string;
}

const baseClass =
  'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 select-none';

const variants = {
  primary:
    'bg-accent text-white hover:bg-blue-700 active:scale-[0.98]',
  secondary:
    'bg-white text-ink border border-border-subtle hover:border-accent hover:text-accent active:scale-[0.98]',
  ghost:
    'bg-white text-ink border border-border-subtle hover:bg-surface-raised active:scale-[0.98]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[0.9375rem]',
  lg: 'px-8 py-4 text-base',
};

export function CTAButton({
  label,
  trackEvent = 'book_call',
  trackSource,
  variant = 'primary',
  size = 'md',
  className = '',
  fallbackHref = '/contact',
}: CTAButtonProps) {
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/public/settings')
      .then((r) => r.json())
      .then((data) => {
        setBookingUrl(data.booking_url || null);
      })
      .catch(() => setBookingUrl(null))
      .finally(() => setLoaded(true));
  }, []);

  const handleClick = useCallback(() => {
    const src = trackSource ?? 'unknown';
    switch (trackEvent) {
      case 'book_call':
        trackBookCallClick(src);
        break;
      case 'pricing_cta':
        trackPricingCtaClick(src);
        break;
      case 'work_cta':
        trackWorkCtaClick(src);
        break;
      case 'lp_primary_cta':
        trackLpPrimaryCtaClick(src);
        break;
    }

    // Meta Pixel — fire Schedule on every booking CTA click
    if (typeof window !== 'undefined' && typeof (window as Window & { fbq?: (...args: unknown[]) => void }).fbq === 'function') {
      (window as Window & { fbq: (...args: unknown[]) => void }).fbq('track', 'Schedule');
    }

    // Preserve UTM params when navigating to external booking URL
    if (bookingUrl && typeof window !== 'undefined') {
      const currentSearch = window.location.search;
      const utmParams = new URLSearchParams(currentSearch);
      const utm = new URLSearchParams();
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
        const v = utmParams.get(k);
        if (v) utm.set(k, v);
      });
      const qs = utm.toString();
      const dest = bookingUrl + (qs ? (bookingUrl.includes('?') ? '&' : '?') + qs : '');
      window.open(dest, '_blank', 'noopener,noreferrer');
    }
  }, [trackEvent, trackSource, bookingUrl]);

  const classes = `${baseClass} ${variants[variant]} ${sizes[size]} ${className}`;

  // If booking URL exists, use button (opens externally via JS)
  if (loaded && bookingUrl) {
    return (
      <button type="button" onClick={handleClick} className={classes}>
        {label}
      </button>
    );
  }

  // Fallback to /contact (or internal link while loading)
  return (
    <Link href={fallbackHref} onClick={handleClick} className={classes}>
      {label}
    </Link>
  );
}
