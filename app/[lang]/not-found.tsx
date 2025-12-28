import { Button } from '@/components/Button';

const messages = {
  en: {
    title: 'Page Not Found',
    subtitle: 'The page you are looking for does not exist.',
    button: 'Go Home',
  },
  fr: {
    title: 'Page Non Trouvée',
    subtitle: 'La page que vous recherchez n\'existe pas.',
    button: 'Retour à l\'accueil',
  },
  ar: {
    title: 'الصفحة غير موجودة',
    subtitle: 'الصفحة اللي بحثتي عليها ما كاينة.',
    button: 'روح للبيت',
  },
};

export default function NotFound() {
  const lang = 'ar';
  const t = messages[lang];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>
        <Button href={`/${lang}`}>{t.button}</Button>
      </div>
    </div>
  );
}
