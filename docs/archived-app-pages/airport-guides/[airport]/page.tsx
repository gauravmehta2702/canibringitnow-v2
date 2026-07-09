import { notFound } from 'next/navigation';
import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import OrbitDealGrid from '@/components/orbit/OrbitDealGrid';
import { getAirportHubCards, getOrbitAirport, getOrbitDeals, orbitAirports } from '@/lib/orbitEngine';

export function generateStaticParams() {
  return orbitAirports.map((airport) => ({ airport: airport.slug }));
}

export function generateMetadata({ params }: { params: { airport: string } }) {
  const airport = getOrbitAirport(params.airport);
  if (!airport) return { title: 'Airport guide not found | Can I Bring It Now' };
  return {
    title: `${airport.name} Travel Guide | Can I Bring It Now`,
    description: `Airport guide for ${airport.name}: security, packing, hotels, transport, family travel and travel questions.`,
    alternates: { canonical: `/airport-guides/${airport.slug}/` },
  };
}

export default function AirportGuidePage({ params }: { params: { airport: string } }) {
  const airport = getOrbitAirport(params.airport);
  if (!airport) notFound();

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/airport-guides/" className="text-sm font-semibold text-brand-600">← Airport guides</a>
          <OrbitHero eyebrow={`${airport.country} · ${airport.code}`} title={`${airport.name} travel guide`} description={`Plan airport security, packing, transport, hotels and family travel around ${airport.name}.`} />
          <OrbitCardGrid title={`${airport.name} travel topics`} eyebrow="Airport authority hub" cards={getAirportHubCards(airport)} />
          <OrbitDealGrid deals={getOrbitDeals(airport.city)} />
        </div>
      </section>
    </main>
  );
}
