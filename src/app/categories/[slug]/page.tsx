import { notFound } from 'next/navigation';
import UniversalContentPageView from '@/components/content/UniversalContentPageView';
import { buildContentMetadata, getContentPage, getContentPagesByKind } from '@/lib/contentEngine';

export function generateStaticParams() {
  return getContentPagesByKind('category').map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return buildContentMetadata(getContentPage('category', params.slug), 'Category not found');
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const page = getContentPage('category', params.slug);
  if (!page) notFound();

  return <UniversalContentPageView page={page} />;
}
