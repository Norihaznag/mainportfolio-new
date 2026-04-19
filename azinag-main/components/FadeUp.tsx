'use client';

import { ReactNode } from 'react';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
  delay?: number;
}

export function FadeUp({ children, className }: FadeUpProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerContainer({ children, className }: StaggerProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function AnimatedHeadline({ text, className }: AnimatedHeadlineProps) {
  return <span className={className}>{text}</span>;
}

export function SlideIn({ children, className }: FadeUpProps) {
  return <div className={className}>{children}</div>;
}

export function ScaleIn({ children, className }: FadeUpProps) {
  return <div className={className}>{children}</div>;
}
