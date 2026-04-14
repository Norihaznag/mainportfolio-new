import { DynamicIcon } from './DynamicIcon';

interface TrustBarProps {
  className?: string;
}

const TRUST_ITEMS = [
  { icon: 'Lock', label: 'Secure & Encrypted', detail: 'TLS + AES-256' },
  { icon: 'Calendar', label: '14-day Free Trial', detail: 'No credit card required' },
  { icon: 'LogOut', label: 'Cancel Anytime', detail: 'No long-term commitment' },
  { icon: 'MessageCircle', label: 'WhatsApp Support', detail: 'Response within 2 hours' },
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
