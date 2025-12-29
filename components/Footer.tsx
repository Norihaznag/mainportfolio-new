import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Statement */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl">
            Build Your Digital Presence with Confidence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            We craft digital solutions that drive real business growth. From websites to web apps, we deliver quality that matters.
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Product */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Showcase
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Azinag. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm font-medium">
            Trusted by businesses across Morocco
          </p>
        </div>
      </div>
    </footer>
  );
}
