// Server component — generates static params for all app slugs
import { apps } from '@/lib/apps-data';
import AppDetailClient from './AppDetailClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const app = apps.find((a) => a.slug === params.slug);
  if (!app) return {};
  return {
    title: `${app.name} — Applications SaaS | Azinag`,
    description: app.description,
  };
}

export default function AppDetailPage({ params }: { params: { slug: string } }) {
  const app = apps.find((a) => a.slug === params.slug);
  if (!app) notFound();
  return <AppDetailClient app={app} />;
}
