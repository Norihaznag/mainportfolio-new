import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Azinag',
  description: 'Manage your site content and operations',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
