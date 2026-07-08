import { notFound } from 'next/navigation';
import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import OrbitDealGrid from '@/components/orbit/OrbitDealGrid';
import { getHubCardsForRule, getOrbitDeals, getOrbitItemHub, getOrbitItemHubs } from '@/lib/orbitEngine';

export function generateStaticParams() {
  return getOrbitItemHubs(120).map((hub) => ({ item: hub.slug }));
}

export function generateMetadata({ params }: { params: { item: string } }) {
  const hub = getOrbitItemHub(params.item);
  if (!hub) return { title: 'Item guide not found | Can I Bring It Now' };
  return {
    title: `${hub.item} Travel Guide | Can I Bring It Now`,
    description: `${hub.rule.shortAnswer} Check rules, airlines, countries, questions, packing and travel-deal context.`,
    alternates: { canonical: `/item-guides/${hub.slug}/` },
  };
}

export default function ItemHubPage({ params }: { params: { item: string } }) {
  const hub = getOrbitItemHub(params.item);
  if (!hub) notFound();

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/item-guides/" className="text-sm font-semibold text-brand-600">← Item guides</a>
          <OrbitHero eyebrow={hub.rule.category} title={`${hub.item} travel guide`} description={hub.rule.shortAnswer} />
          <OrbitCardGrid title={`Plan with ${hub.item}`} eyebrow="Connected travel decisions" cards={getHubCardsForRule(hub.rule)} />
          <OrbitDealGrid deals={getOrbitDeals(hub.item)} />
        </div>
      </section>
    </main>
  );
}
