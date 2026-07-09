import { notFound } from 'next/navigation';
import { countries } from '@/data/rules';
import OrbitDealGrid from '@/components/orbit/OrbitDealGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import { getCountryHubCards, getOrbitCountryHub, getOrbitDeals, orbitSlug } from '@/lib/orbitEngine';

export function generateStaticParams() {
  return countries.slice(0, 20).map((country) => ({ country: orbitSlug(country) }));
}

export function generateMetadata({ params }: { params: { country: string } }) {
  const country = getOrbitCountryHub(params.country);
  if (!country) return { title: 'Travel deals not found | Can I Bring It Now' };
  return {
    title: `${country} Travel Deals and Budget Trip Ideas | Can I Bring It Now`,
    description: `Cheap flights, hotels, airport hotels, eSIMs, insurance and travel gear ideas for ${country}.`,
    alternates: { canonical: `/travel-deals/${orbitSlug(country)}/` },
  };
}

export default function CountryDealsPage({ params }: { params: { country: string } }) {
  const country = getOrbitCountryHub(params.country);
  if (!country) notFound();

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/travel-deals/" className="text-sm font-semibold text-brand-600">← Travel deals</a>
          <OrbitHero eyebrow="Destination deals" title={`${country} travel deals and budget trip ideas`} description={`Research cheaper flights, hotels, eSIMs, insurance and travel gear before travelling to ${country}.`} />
          <OrbitDealGrid deals={getOrbitDeals(country)} />
          <OrbitCardGrid title={`Also check before travelling to ${country}`} eyebrow="Travel rules" cards={getCountryHubCards(country).slice(0, 9)} />
        </div>
      </section>
    </main>
  );
}
