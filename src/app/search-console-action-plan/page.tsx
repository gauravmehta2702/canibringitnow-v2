import GrowthGrid from '@/components/growth8/GrowthGrid';
import GrowthHero from '@/components/growth8/GrowthHero';
import { getSearchConsoleActions } from '@/lib/growth8Engine';

export const metadata = {
  title: 'Search Console Action Plan | Can I Bring It Now',
  description: 'Improve pages Google is already testing instead of guessing.',
  alternates: { canonical: '/search-console-action-plan/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/launch-control/" className="text-sm font-semibold text-brand-600">← Launch control</a>
          <GrowthHero eyebrow="Search Console Action Plan" title="Use Google data to decide what to improve" description="Improve pages Google is already testing instead of guessing." />
          <GrowthGrid title="Weekly Search Console actions" eyebrow="Indexing and CTR" cards={getSearchConsoleActions()} />
        </div>
      </section>
    </main>
  );
}
