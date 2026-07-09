import { notFound } from 'next/navigation';
import AtlasTopicPageView from '@/components/atlas/AtlasTopicPageView';
import { buildAuthorityTopicJsonLd, getAuthorityTopicPage, getAuthorityTopicPages } from '@/lib/atlasAuthorityEngine';
import { launchLimits } from '@/lib/launchLimits';

export function generateStaticParams() {
  return getAuthorityTopicPages().slice(0, launchLimits.topicPages).map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getAuthorityTopicPage(params.slug);
  if (!page) return { title: 'Travel topic not found | Can I Bring It Now' };

  return {
    title: `${page.title} | Can I Bring It Now`,
    description: page.description,
    alternates: { canonical: `/topics/${page.slug}/` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://canibringitnow.com/topics/${page.slug}/`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const page = getAuthorityTopicPage(params.slug);
  if (!page) notFound();

  const jsonLd = buildAuthorityTopicJsonLd(page);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/topics/" className="text-sm font-semibold text-brand-600">← Travel topics</a>
          <AtlasTopicPageView title={page.heading} description={page.description} rule={page.rule} type={page.type} />
        </div>
      </section>
    </main>
  );
}
