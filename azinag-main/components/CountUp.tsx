'use client';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({ end, suffix = '', prefix = '', className }: CountUpProps) {
  return (
    <span className={className}>
      {prefix}{end}{suffix}
    </span>
  );
}
