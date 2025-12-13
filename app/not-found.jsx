"use client";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center" dir="rtl">
      <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-4">الصفحة غير موجودة</h2>
      <p className="text-muted-foreground mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link href="/" className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors">
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}
