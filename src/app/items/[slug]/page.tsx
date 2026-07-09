import { notFound } from 'next/navigation';
import UniversalContentPageView from '@/components/content/UniversalContentPageView';
import { buildContentMetadata, getContentPage, getContentPagesByKind } from '@/lib/contentEngine';

export function generateStaticParams() {
  return getContentPagesByKind('item').map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return buildContentMetadata(getContentPage('item', params.slug), 'Item not found');
}

export default function ItemPage({ params }: { params: { slug: string } }) {
  const page = getContentPage('item', params.slug);
  if (!page) notFound();

  return <UniversalContentPageView page={page} />;
}
