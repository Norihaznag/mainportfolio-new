import Link from 'next/link';
import { translations } from '@/lib/translations';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  lang: 'en' | 'fr' | 'ar';
}

function getLangSwitchPath(currentLang: string, newLang: string, pathname: string) {
  // Remove the current language from the pathname
  const pathWithoutLang = pathname.replace(/^\/(en|fr|ar)(\/|$)/, '/$1').replace(/^\/(en|fr|ar)$/, '/');
  // Add the new language
  return `/${newLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
}

export function Header({ lang }: HeaderProps) {
  const t = translations[lang];

  // Mobile menu items
  const mobileNavItems = [
    {
      href: `/${lang}/showcase`,
      label: lang === 'ar' ? 'الأعمال' : 'Portfolio',
      title: lang === 'ar' ? 'عرض الأعمال' : 'View our portfolio',
    },
    {
      href: `/${lang}/pricing`,
      label: lang === 'ar' ? 'الأثمنة' : lang === 'fr' ? 'Tarifs' : 'Pricing',
      title: lang === 'ar' ? 'عرض الأسعار' : 'View pricing',
    },
    {
      href: `/${lang}/how-it-works`,
      label: lang === 'ar' ? 'كيفاش كنخدمو' : lang === 'fr' ? 'Comment ça marche' : 'How It Works',
      title: lang === 'ar' ? 'كيف تعمل عملية الخدمة' : 'How our process works',
    },
    {
      href: `/${lang}/about`,
      label: lang === 'ar' ? 'علينا' : lang === 'fr' ? 'À propos' : 'About',
      title: lang === 'ar' ? 'معلومات عننا' : 'About us',
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href={`/${lang}`} 
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            aria-label="Azinag - Home"
          >
            Azinag
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8" role="navigation" aria-label="Main navigation">
              <Link
                href={`/${lang}/showcase`}
                className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1"
                title={lang === 'ar' ? 'عرض الأعمال' : 'View our portfolio'}
              >
                {lang === 'ar' ? 'الأعمال' : 'Portfolio'}
              </Link>
              <Link
                href={`/${lang}/pricing`}
                className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1"
                title={lang === 'ar' ? 'عرض الأسعار' : 'View pricing'}
              >
                {lang === 'ar' ? 'الأثمنة' : lang === 'fr' ? 'Tarifs' : 'Pricing'}
              </Link>
              <Link
                href={`/${lang}/how-it-works`}
                className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1"
                title={lang === 'ar' ? 'كيف تعمل عملية الخدمة' : 'How our process works'}
              >
                {lang === 'ar' ? 'كيفاش كنخدمو' : lang === 'fr' ? 'Comment ça marche' : 'How It Works'}
              </Link>
              <Link
                href={`/${lang}/about`}
                className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1"
                title={lang === 'ar' ? 'معلومات عننا' : 'About us'}
              >
                {lang === 'ar' ? 'علينا' : lang === 'fr' ? 'À propos' : 'About'}
              </Link>
              <Link
                href={`/${lang}/order`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 font-medium"
                aria-label={lang === 'ar' ? 'طلب خدمة جديدة' : 'Start a new order'}
              >
                {lang === 'ar' ? 'طلب دابا' : lang === 'fr' ? 'Commander' : 'Order Now'}
              </Link>
            </nav>
            <nav className="border-l border-gray-200 pl-8" role="navigation" aria-label="Language selection">
              <div className="flex gap-2">
                <Link
                  href="/ar"
                  lang="ar"
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
                    lang === 'ar'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label="Switch to Arabic"
                  aria-current={lang === 'ar' ? 'page' : undefined}
                >
                  العربية
                </Link>
                <Link
                  href="/fr"
                  lang="fr"
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
                    lang === 'fr'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label="Switch to French"
                  aria-current={lang === 'fr' ? 'page' : undefined}
                >
                  Français
                </Link>
                <Link
                  href="/en"
                  lang="en"
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
                    lang === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label="Switch to English"
                  aria-current={lang === 'en' ? 'page' : undefined}
                >
                  English
                </Link>
              </div>
            </nav>
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            lang={lang}
            navItems={mobileNavItems}
            orderLabel={lang === 'ar' ? 'طلب دابا' : lang === 'fr' ? 'Commander' : 'Order Now'}
            orderTitle={lang === 'ar' ? 'طلب خدمة جديدة' : 'Start a new order'}
            orderHref={`/${lang}/order`}
          />
        </div>
      </div>
    </header>
  );
}
