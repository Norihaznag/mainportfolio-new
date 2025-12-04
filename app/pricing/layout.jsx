export const metadata = {
  title: 'Pricing',
  description: 'Transparent, value-driven pricing for custom mobile apps, PWAs, and ultra-fast websites. From lightweight PWA packages to custom web app solutions. Get a free consultation and personalized quote.',
  keywords: [
    'Azinag pricing',
    'PWA development cost',
    'custom app development pricing',
    'web development rates',
    'Next.js development pricing',
    'affordable web development',
  ],
  openGraph: {
    title: 'Pricing - Azinag Web Solutions',
    description: 'Transparent, value-driven pricing for custom mobile apps, PWAs, and ultra-fast websites. From lightweight PWA packages to custom web app solutions.',
    url: 'https://azinag.site/pricing',
    images: [
      {
        url: 'https://azinag.site/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Azinag Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Azinag Web Solutions',
    description: 'Transparent, value-driven pricing for custom mobile apps, PWAs, and ultra-fast websites.',
    images: ['https://azinag.site/og-image.jpg'],
  },
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingLayout({ children }) {
  return children;
}

