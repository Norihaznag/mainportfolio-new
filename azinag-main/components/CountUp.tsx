'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({ end, duration = 1.8, suffix = '', prefix = '', className }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = (now - startTime) / (duration * 1000);
      // Ease-out cubic
      const progress = 1 - Math.pow(1 - Math.min(elapsed, 1), 3);
      setCount(Math.round(progress * end));
      if (elapsed < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
