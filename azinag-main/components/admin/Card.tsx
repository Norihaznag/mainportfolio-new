'use client';

import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl border-4 border-black shadow-neo p-8 ${className}`}>
      {title && <h2 className="text-3xl font-bold text-black mb-6 uppercase tracking-wide">{title}</h2>}
      {children}
    </div>
  );
}
