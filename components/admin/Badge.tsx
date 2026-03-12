'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'default';
  children: ReactNode;
}

const variantClasses = {
  success: 'bg-cartoon-green text-black border-2 border-black shadow-neo-sm',
  danger: 'bg-cartoon-pink text-black border-2 border-black shadow-neo-sm',
  warning: 'bg-cartoon-yellow text-black border-2 border-black shadow-neo-sm',
  info: 'bg-cartoon-blue text-black border-2 border-black shadow-neo-sm',
  default: 'bg-white text-black border-2 border-black shadow-neo-sm',
};

export default function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span className={`px-4 py-1.5 rounded-lg text-sm font-black uppercase tracking-wide inline-block ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
