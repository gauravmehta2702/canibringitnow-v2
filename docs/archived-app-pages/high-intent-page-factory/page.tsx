import GrowthGrid from '@/components/growth8/GrowthGrid';
import GrowthHero from '@/components/growth8/GrowthHero';
import { getHighIntentPages } from '@/lib/growth8Engine';

export const metadata = {
  title: 'High-Intent Page Factory | Can I Bring It Now',
  description: 'Prioritise pages with item, airline, country, baggage and customs intent.',
  alternates: { canonical: '/high-intent-page-factory/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/launch-control/" className="text-sm font-semibold text-brand-600">← Launch control</a>
          <GrowthHero eyebrow="High-Intent Page Factory" title="Build pages people are already searching for" description="Prioritise pages with item, airline, country, baggage and customs intent." />
          <GrowthGrid title="High-intent page queue" eyebrow="SEO content" cards={getHighIntentPages()} />
        </div>
      </section>
    </main>
  );
}
