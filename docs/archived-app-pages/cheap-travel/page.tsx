import OrbitDealGrid from '@/components/orbit/OrbitDealGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import { getOrbitDeals } from '@/lib/orbitEngine';

export const metadata = {
  title: 'Cheap Travel Ideas | Can I Bring It Now',
  description: 'Cheap flights, budget hotels, airport hotels, eSIMs, insurance and travel gear ideas.',
  alternates: { canonical: '/cheap-travel/' },
};

export default function CheapTravelPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit/" className="text-sm font-semibold text-brand-600">← ORBIT</a>
          <OrbitHero eyebrow="Budget travel" title="Cheap travel ideas before you fly" description="A budget travel hub for cheap flights, budget hotels, airport hotels, eSIMs, insurance and useful travel gear." />
          <OrbitDealGrid deals={getOrbitDeals('your destination')} />
        </div>
      </section>
    </main>
  );
}
