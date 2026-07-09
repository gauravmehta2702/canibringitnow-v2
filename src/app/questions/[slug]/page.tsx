import { notFound } from 'next/navigation';
import AtlasQuestionPageView from '@/components/atlas/AtlasQuestionPageView';
import { buildQuestionJsonLd, getAtlasQuestionPage, getAtlasQuestionPages } from '@/lib/atlasQuestionEngine';
import { launchLimits } from '@/lib/launchLimits';

export function generateStaticParams() {
  return getAtlasQuestionPages().slice(0, launchLimits.questionPages).map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getAtlasQuestionPage(params.slug);
  if (!page) return { title: 'Travel question not found | Can I Bring It Now' };

  return {
    title: `${page.title} | Can I Bring It Now`,
    description: `${page.answer} Check cabin baggage, checked baggage, FAQs and related travel rules before you fly.`,
    alternates: {
      canonical: `/questions/${page.slug}/`,
    },
    openGraph: {
      title: page.title,
      description: page.answer,
      url: `https://canibringitnow.com/questions/${page.slug}/`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.answer,
    },
  };
}

export default function QuestionPage({ params }: { params: { slug: string } }) {
  const page = getAtlasQuestionPage(params.slug);
  if (!page) notFound();

  const jsonLd = buildQuestionJsonLd(page);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/search/" className="text-sm font-semibold text-brand-600">← Search travel rules</a>
          <AtlasQuestionPageView page={page} />
        </div>
      </section>
    </main>
  );
}
