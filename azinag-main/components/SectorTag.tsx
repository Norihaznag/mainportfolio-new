'use client';

interface SectorTagProps {
  label: string;
  className?: string;
}

export function SectorTag({ label, className = '' }: SectorTagProps) {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-surface border border-border-subtle text-ink-muted ${className}`}
    >
      {label}
    </span>
  );
}

// Full sector grid for the homepage Industries section
export const INDUSTRIES = [
  { icon: '🏭', label: 'Manufacturing' },
  { icon: '🛒', label: 'E-commerce' },
  { icon: '🏥', label: 'Healthcare' },
  { icon: '💰', label: 'Finance' },
  { icon: '📚', label: 'Education' },
  { icon: '🚚', label: 'Logistics' },
  { icon: '🍽️', label: 'Hospitality' },
  { icon: '🎓', label: 'Professional Services' },
  { icon: '🏪', label: 'Retail' },
  { icon: '🎯', label: 'Marketing' },
  { icon: '⚖️', label: 'Legal' },
  { icon: '👥', label: 'Human Resources' },
  { icon: '🏗️', label: 'Construction' },
  { icon: '📡', label: 'Telecommunications' },
  { icon: '🌱', label: 'Agriculture' },
  { icon: '✈️', label: 'Travel & Tourism' },
];
