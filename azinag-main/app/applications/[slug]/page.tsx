import { fetchPublishedAppBySlug } from '@/lib/apps-server';
import AppDetailClient from './AppDetailClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const app = await fetchPublishedAppBySlug(params.slug);
  if (!app) return {};
  return {
    title: `${app.name} — Applications SaaS | Azinag`,
    description: app.description,
  };
}

export default async function AppDetailPage({ params }: { params: { slug: string } }) {
  const app = await fetchPublishedAppBySlug(params.slug);
  if (!app) notFound();
  return <AppDetailClient app={app} />;
}
