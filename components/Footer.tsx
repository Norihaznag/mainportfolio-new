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
  const t = translations[lang];

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

          {/* Contact via WhatsApp */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t.footer.contact}</h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                {t.footer.phone}
              </p>
              <p className="text-sm text-gray-400">
                {t.footer.email}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.906 1.235l-.345.207-.358-.118-1.474-.469 1.12 2.659.235.355-.127.433a9.876 9.876 0 001.516 4.938l.198.325.335.113 1.512.479-1.056-2.513.167-.346.348-.155c1.462-.875 2.652-2.303 3.203-3.916.226-.686.302-1.387.302-2.104 0-.044 0-.088 0-.133z"/>
                </svg>
                {t.footer.contactVia}
              </a>
            </div>
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
