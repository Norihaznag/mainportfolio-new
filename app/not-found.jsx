"use client";
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

export default function NotFound() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-4">{getTranslation('notFoundTitle', language) || 'Page Not Found'}</h2>
      <p className="text-muted-foreground mb-8">{getTranslation('notFoundDescription', language) || 'Sorry, the page you are looking for does not exist.'}</p>
      <Link href="/" className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors">
        {getTranslation('backToHome', language) || 'Back to Home'}
      </Link>
    </div>
  );
} 