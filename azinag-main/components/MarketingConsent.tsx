'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'azinag_cookie_consent';
const GA_MEASUREMENT_ID = 'G-PRFYHRG5PQ';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type ConsentValue = 'accepted' | 'declined';

function isConsentValue(value: string | null): value is ConsentValue {
  return value === 'accepted' || value === 'declined';
}

export function MarketingConsent() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (isConsentValue(stored)) {
      setConsent(stored);
    }
    setReady(true);
  }, []);

  const saveConsent = (value: ConsentValue) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="azinag-ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
          {META_PIXEL_ID && (
            <Script id="azinag-meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)
                }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
          )}
        </>
      )}

      {ready && consent === null && (
        <div
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-lg border border-border-subtle bg-white p-4 shadow-card"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">Optional cookies</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                We use optional analytics and marketing cookies only if you accept them. Necessary cookies and local
                storage keep the site working and remember this choice.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="h-10 rounded-lg border border-border-subtle bg-white px-4 text-sm font-semibold text-ink hover:bg-surface-raised transition-colors"
                onClick={() => saveConsent('declined')}
              >
                Decline
              </button>
              <button
                type="button"
                className="h-10 rounded-lg bg-accent px-4 text-sm font-semibold text-white hover:bg-[#D93621] transition-colors"
                onClick={() => saveConsent('accepted')}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
