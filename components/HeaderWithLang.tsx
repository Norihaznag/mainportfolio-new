import Link from 'next/link';
import { translations } from '@/lib/translations';

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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${lang}`} className="text-2xl font-bold text-gray-900">
            Azinag
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <Link
                href={`/${lang}/showcase`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {lang === 'ar' ? 'الأعمال' : 'Portfolio'}
              </Link>
              <Link
                href={`/${lang}/pricing`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {lang === 'ar' ? 'الأثمنة' : lang === 'fr' ? 'Tarifs' : 'Pricing'}
              </Link>
              <Link
                href={`/${lang}/how-it-works`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {lang === 'ar' ? 'كيفاش كنخدمو' : lang === 'fr' ? 'Comment ça marche' : 'How It Works'}
              </Link>
              <Link
                href={`/${lang}/about`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {lang === 'ar' ? 'علينا' : lang === 'fr' ? 'À propos' : 'About'}
              </Link>
              <Link
                href={`/${lang}/order`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {lang === 'ar' ? 'طلب دابا' : lang === 'fr' ? 'Commander' : 'Order Now'}
              </Link>
            </nav>
            <div className="border-l border-gray-200 pl-8">
              <div className="flex gap-2">
                <Link
                  href="/ar"
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    lang === 'ar'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  العربية
                </Link>
                <Link
                  href="/fr"
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    lang === 'fr'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Français
                </Link>
                <Link
                  href="/en"
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    lang === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  English
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
