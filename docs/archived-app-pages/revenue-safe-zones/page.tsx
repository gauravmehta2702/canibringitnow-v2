import Orbit4CardGrid from '@/components/orbit4/Orbit4CardGrid';
import Orbit4Hero from '@/components/orbit4/Orbit4Hero';
import { getRevenueSafeZones } from '@/lib/orbit4Engine';

export const metadata = {
  title: 'Revenue Safe Zones | Can I Bring It Now',
  description: 'Ads and affiliate links should support the traveller. Never block the main answer or official-source warnings.',
  alternates: { canonical: '/revenue-safe-zones/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-3/" className="text-sm font-semibold text-brand-600">← ORBIT Release 3</a>
          <Orbit4Hero eyebrow="Revenue Safe Zones" title="Earn without damaging trust" description="Ads and affiliate links should support the traveller. Never block the main answer or official-source warnings." />
          <Orbit4CardGrid title="Safe monetisation placements" eyebrow="Revenue readiness" cards={getRevenueSafeZones()} />
        </div>
      </section>
    </main>
  );
}
