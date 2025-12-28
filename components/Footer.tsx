export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Azinag</h3>
            <p className="text-gray-600 text-sm">
              تطوير الويب والتطبيقات للشركات المغربية
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">الروابط</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/pricing" className="hover:text-gray-900">
                  السعر
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="hover:text-gray-900">
                  كيف يعمل
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-900">
                  عننا
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">القانونية</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  شروط الخدمة
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">التواصل</h4>
            <p className="text-sm text-gray-600">
              هاتف: +212 661 23 45 67
              <br />
              البريد: hello@azinag.site
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Azinag. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
