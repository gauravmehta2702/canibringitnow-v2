import { countries } from '@/data/rules';
import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitDealGrid from '@/components/orbit/OrbitDealGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import { getOrbitDeals, orbitSlug } from '@/lib/orbitEngine';

export const metadata = {
  title: 'Travel Deals Intelligence | Can I Bring It Now',
  description: 'Contextual travel-deal ideas for flights, hotels, eSIMs, insurance, travel gear and electronics.',
  alternates: { canonical: '/travel-deals/' },
};

export default function TravelDealsPage() {
  const countryCards = countries.slice(0, 24).map((country) => ({
    title: `${country} travel deals`,
    href: `/travel-deals/${orbitSlug(country)}/`,
    label: 'Destination deals',
    description: `Flight, hotel, eSIM, insurance and travel gear deal ideas for ${country}.`,
  }));

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit/" className="text-sm font-semibold text-brand-600">← ORBIT</a>
          <OrbitHero eyebrow="Deals intelligence" title="Cheap flights, hotels and travel gear ideas" description="This is the contextual deals layer: useful offer ideas linked to the traveller's destination and trip needs. Affiliate links can be added later." />
          <OrbitDealGrid deals={getOrbitDeals('Japan')} />
          <OrbitCardGrid title="Destination deal hubs" eyebrow="Deals by country" cards={countryCards} />
        </div>
      </section>
    </main>
  );
}
