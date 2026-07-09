import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import { getOrbitItemHubs } from '@/lib/orbitEngine';

export const metadata = {
  title: 'Travel Item Guides | Can I Bring It Now',
  description: 'Browse item-led travel rule hubs for baggage, customs, airport security and packing guidance.',
  alternates: { canonical: '/item-guides/' },
};

export default function ItemGuidesPage() {
  const cards = getOrbitItemHubs(60).map((hub) => ({
    title: hub.item,
    href: `/item-guides/${hub.slug}/`,
    label: hub.rule.category,
    description: hub.rule.shortAnswer,
  }));

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit/" className="text-sm font-semibold text-brand-600">← ORBIT</a>
          <OrbitHero eyebrow="Item hubs" title="Travel item guides" description="Item-led hubs help Google and travellers connect rules, airlines, countries, questions and packing guidance." />
          <OrbitCardGrid title="Browse item hubs" eyebrow="Rules by item" cards={cards} />
        </div>
      </section>
    </main>
  );
}
