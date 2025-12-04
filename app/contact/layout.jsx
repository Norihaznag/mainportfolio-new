export const metadata = {
  title: 'Contact Us',
  description: 'Contact Azinag to launch your Progressive Web App (PWA) for desktop and mobile, with WhatsApp ordering for faster sales. Fast, installable SaaS apps for business. Get in touch for a free consultation.',
  keywords: [
    'contact Azinag',
    'web development consultation',
    'PWA development quote',
    'custom app development contact',
    'WhatsApp integration services',
  ],
  openGraph: {
    title: 'Contact Us - Azinag Web Solutions',
    description: 'Contact Azinag to launch your PWA for desktop and mobile with WhatsApp checkout. Fast, native-like, and ready for business. Get in touch for a free consultation.',
    url: 'https://azinag.site/contact',
    images: [
      {
        url: 'https://azinag.site/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Azinag Web Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Azinag Web Solutions',
    description: 'Contact Azinag to launch your PWA for desktop and mobile with WhatsApp checkout. Fast, native-like, and ready for business.',
    images: ['https://azinag.site/og-image.jpg'],
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }) {
  return children;
}

