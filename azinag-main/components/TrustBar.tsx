'use client';

interface TrustBarProps {
  className?: string;
}

const TRUST_ITEMS = [
  { icon: '🔒', label: 'Secure & Encrypted', detail: 'TLS + AES-256' },
  { icon: '📅', label: '14-day Free Trial', detail: 'No credit card required' },
  { icon: '🚪', label: 'Cancel Anytime', detail: 'No long-term commitment' },
  { icon: '🎧', label: 'WhatsApp Support', detail: 'Response within 2 hours' },
];

export function TrustBar({ className = '' }: TrustBarProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}
      aria-label="Trust signals"
    >
      {TRUST_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-xs text-ink-muted">
          <span aria-hidden="true" className="text-base">{item.icon}</span>
          <span>
            <strong className="font-semibold text-ink">{item.label}</strong>
            {' · '}
            {item.detail}
          </span>
        </div>
      ))}
    </div>
  );
}
