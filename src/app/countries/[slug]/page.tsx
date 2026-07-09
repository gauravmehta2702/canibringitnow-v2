import { notFound } from 'next/navigation';
import UniversalContentPageView from '@/components/content/UniversalContentPageView';
import { buildContentMetadata, getContentPage, getContentPagesByKind } from '@/lib/contentEngine';

export function generateStaticParams() {
  return getContentPagesByKind('country').map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return buildContentMetadata(getContentPage('country', params.slug), 'Destination not found');
}

export default function CountryPage({ params }: { params: { slug: string } }) {
  const page = getContentPage('country', params.slug);
  if (!page) notFound();

  return <UniversalContentPageView page={page} />;
}
