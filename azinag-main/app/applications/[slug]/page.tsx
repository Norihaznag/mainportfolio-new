import { notFound } from 'next/navigation';
import { fetchPublishedAppBySlug } from '@/lib/apps-server';
import AppDetailClient from './AppDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const app = await fetchPublishedAppBySlug(params.slug);
  if (!app) return {};
  return {
    title: `${app.name} - Azinag Application`,
    description: app.description,
  };
}

export default async function AppDetailPage({ params }: { params: { slug: string } }) {
  const app = await fetchPublishedAppBySlug(params.slug);
  if (!app) notFound();
  return <AppDetailClient app={app} />;
}
