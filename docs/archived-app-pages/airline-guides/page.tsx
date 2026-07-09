import { airlines } from '@/data/rules';
import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import { orbitSlug } from '@/lib/orbitEngine';

export const metadata = {
  title: 'Airline Travel Rule Guides | Can I Bring It Now',
  description: 'Browse airline-led baggage and travel rule hubs.',
  alternates: { canonical: '/airline-guides/' },
};

export default function AirlineGuidesPage() {
  const cards = airlines.map((airline) => ({
    title: airline,
    href: `/airline-guides/${orbitSlug(airline)}/`,
    label: 'Airline hub',
    description: `Travel rules, baggage questions, packing guidance and item checks for ${airline}.`,
  }));

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit/" className="text-sm font-semibold text-brand-600">← ORBIT</a>
          <OrbitHero eyebrow="Airline hubs" title="Airline travel rule guides" description="Airline hubs connect baggage questions, travel items, destination checks and trip planning." />
          <OrbitCardGrid title="Browse airline hubs" eyebrow="Rules by airline" cards={cards} />
        </div>
      </section>
    </main>
  );
}
