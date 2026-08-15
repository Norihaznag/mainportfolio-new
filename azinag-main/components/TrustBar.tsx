import { DynamicIcon } from './DynamicIcon';

interface TrustBarProps {
  className?: string;
}

const TRUST_ITEMS = [
  { icon: 'Lock', label: 'Secure Checkout', detail: 'Website-based payment flow' },
  { icon: 'BadgeCheck', label: 'Clear Pricing', detail: 'MAD pricing shown before purchase' },
  { icon: 'RefreshCw', label: 'Software Updates', detail: 'Versioned releases for active customers' },
  { icon: 'LifeBuoy', label: 'Support and Billing Help', detail: 'Email and contact form assistance' },
];

export function TrustBar({ className = '' }: TrustBarProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}
      aria-label="Trust signals"
    >
      {TRUST_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-xs text-ink-muted">
          <DynamicIcon name={item.icon} className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
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
