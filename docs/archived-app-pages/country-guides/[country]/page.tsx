import { notFound } from 'next/navigation';
import { countries } from '@/data/rules';
import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import OrbitDealGrid from '@/components/orbit/OrbitDealGrid';
import { getCountryHubCards, getOrbitCountryHub, getOrbitDeals, orbitSlug } from '@/lib/orbitEngine';

export function generateStaticParams() {
  return countries.map((country) => ({ country: orbitSlug(country) }));
}

export function generateMetadata({ params }: { params: { country: string } }) {
  const country = getOrbitCountryHub(params.country);
  if (!country) return { title: 'Country guide not found | Can I Bring It Now' };
  return {
    title: `${country} Travel Rules and Customs Guide | Can I Bring It Now`,
    description: `Check customs, medication, food, batteries, airport security, packing and travel-deal context for ${country}.`,
    alternates: { canonical: `/country-guides/${orbitSlug(country)}/` },
  };
}

export default function CountryHubPage({ params }: { params: { country: string } }) {
  const country = getOrbitCountryHub(params.country);
  if (!country) notFound();

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/country-guides/" className="text-sm font-semibold text-brand-600">← Country guides</a>
          <OrbitHero eyebrow="Country guide" title={`${country} travel rules and customs guide`} description={`Check what to pack, what to verify and what to prepare before travelling to ${country}.`} />
          <OrbitCardGrid title={`Popular ${country} checks`} eyebrow="Country authority hub" cards={getCountryHubCards(country)} />
          <OrbitDealGrid deals={getOrbitDeals(country)} />
        </div>
      </section>
    </main>
  );
}
