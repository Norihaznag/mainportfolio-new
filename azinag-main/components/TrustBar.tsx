'use client';

interface TrustBarProps {
  className?: string;
}

const trustItems = [
  { icon: '🔒', label: 'Paiement sécurisé' },
  { icon: '📅', label: 'Sans engagement' },
  { icon: '🚪', label: 'Résiliable à tout moment' },
  { icon: '🎧', label: 'Support prioritaire' },
];

export function TrustBar({ className = '' }: TrustBarProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted py-4 ${className}`}
      aria-label="Garanties d'abonnement"
    >
      {trustItems.map((item, idx) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
          {idx < trustItems.length - 1 && (
            <span className="hidden sm:inline ml-6 text-border-subtle" aria-hidden="true">·</span>
          )}
        </span>
      ))}
    </div>
  );
}
