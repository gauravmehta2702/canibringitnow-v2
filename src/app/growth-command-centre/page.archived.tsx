import GrowthGrid from '@/components/growth8/GrowthGrid';
import GrowthHero from '@/components/growth8/GrowthHero';
import { getGrowthModules } from '@/lib/growth8Engine';

export const metadata = {
  title: 'Growth Command Centre | Can I Bring It Now',
  description: 'One place to manage indexing, backlinks, high-intent pages, UTM tracking, social distribution and revenue readiness.',
  alternates: { canonical: '/growth-command-centre/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/launch-control/" className="text-sm font-semibold text-brand-600">← Launch control</a>
          <GrowthHero eyebrow="Growth Command Centre" title="Get visitors faster with a weekly growth system" description="One place to manage indexing, backlinks, high-intent pages, UTM tracking, social distribution and revenue readiness." />
          <GrowthGrid title="Growth modules" eyebrow="Traffic priority" cards={getGrowthModules()} />
        </div>
      </section>
    </main>
  );
}
