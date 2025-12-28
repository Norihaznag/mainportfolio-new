import { Card } from '@/components/Card';

interface OrderProps {
  params: Promise<{
    lang: 'en' | 'fr' | 'ar';
  }>;
}

export default async function Order({ params }: OrderProps) {
  const { lang } = await params;

  const content = {
    en: {
      title: 'Order Your Website',
      subtitle: 'Fill out the form below and we will contact you soon',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      company: 'Company Name',
      description: 'Describe Your Project',
      budget: 'Budget',
      submit: 'Submit Order',
      whatsapp: 'Or contact us on WhatsApp',
    },
    fr: {
      title: 'Commandez Votre Site Web',
      subtitle: 'Remplissez le formulaire ci-dessous et nous vous contacterons bientôt',
      name: 'Nom Complet',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone',
      company: 'Nom de l\'Entreprise',
      description: 'Décrivez Votre Projet',
      budget: 'Budget',
      submit: 'Soumettre la Commande',
      whatsapp: 'Ou contactez-nous sur WhatsApp',
    },
    ar: {
      title: 'طلب موقعك دابا',
      subtitle: 'عمّر الاستمارة وغادي نتاصلو معاك فالقريب',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      company: 'اسم الشركة',
      description: 'شرح المشروع',
      budget: 'الميزانية',
      submit: 'صيفط الطلب',
      whatsapp: 'ولا تاصل معنا فالواتساب',
    },
  };

  const t = content[lang as keyof typeof content] || content.ar;

  return (
    <div>
      {/* Header */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={t.name}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder={t.email}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder={t.phone}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.company}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={t.company}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.description}
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={t.description}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.budget}
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option>Under $1000</option>
                    <option>$1000 - $5000</option>
                    <option>$5000 - $10000</option>
                    <option>$10000+</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.submit}
                </button>

                <div className="text-center pt-6 border-t">
                  <p className="text-gray-600 mb-4">{t.whatsapp}</p>
                  <a
                    href="https://wa.me/212661234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
