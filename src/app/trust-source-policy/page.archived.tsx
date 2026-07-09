import GrowthGrid from '@/components/growth8/GrowthGrid';
import GrowthHero from '@/components/growth8/GrowthHero';
import { getTrustPolicyCards } from '@/lib/growth8Engine';

export const metadata = {
  title: 'Trust & Source Policy | Can I Bring It Now',
  description: 'Travel rules change. Clear sourcing, update dates and honest uncertainty will matter for Google and users.',
  alternates: { canonical: '/trust-source-policy/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/launch-control/" className="text-sm font-semibold text-brand-600">← Launch control</a>
          <GrowthHero eyebrow="Trust & Source Policy" title="Make the site trustworthy before scaling" description="Travel rules change. Clear sourcing, update dates and honest uncertainty will matter for Google and users." />
          <GrowthGrid title="Trust standards" eyebrow="Authority" cards={getTrustPolicyCards()} />
        </div>
      </section>
    </main>
  );
}
