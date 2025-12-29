'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { translations } from '@/lib/translations';
import type { Language } from '@/lib/translations';

const WHATSAPP_NUMBER = '212661234567'; // Morocco phone number format without +
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function Footer() {
  const params = useParams();
  const lang = (params?.lang as Language) || 'ar';
  const t = translations[lang] || translations.ar;

  if (!t?.footer) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-white text-lg mb-2">{t.footer.company}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t.footer.links}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link 
                  href={`/${lang}/pricing`} 
                  className="hover:text-white transition-colors"
                >
                  {t.footer.pricing}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${lang}/how-it-works`} 
                  className="hover:text-white transition-colors"
                >
                  {t.footer.howItWorks}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${lang}/about`} 
                  className="hover:text-white transition-colors"
                >
                  {t.footer.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.terms}
                </a>
              </li>
            </ul>
          </div>


        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
