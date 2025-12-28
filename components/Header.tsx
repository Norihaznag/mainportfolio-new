import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Azinag
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              الثمن / Tarif
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              كيفاش كتشتغل / Fonctionnement
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              علينا / À propos
            </Link>
            <Link
              href="/order"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              طلب دابا / Commander
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
