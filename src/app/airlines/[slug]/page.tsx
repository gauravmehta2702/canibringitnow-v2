import { notFound } from 'next/navigation';
import UniversalContentPageView from '@/components/content/UniversalContentPageView';
import { buildContentMetadata, getContentPage, getContentPagesByKind } from '@/lib/contentEngine';

export function generateStaticParams() {
  return getContentPagesByKind('airline').map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return buildContentMetadata(getContentPage('airline', params.slug), 'Airline not found');
}

export default function AirlinePage({ params }: { params: { slug: string } }) {
  const page = getContentPage('airline', params.slug);
  if (!page) notFound();

  return <UniversalContentPageView page={page} />;
}
