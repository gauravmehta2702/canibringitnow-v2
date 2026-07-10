import { notFound } from 'next/navigation';
import { airlines } from '@/data/rules';
import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import OrbitDealGrid from '@/components/orbit/OrbitDealGrid';
import { getAirlineHubCards, getOrbitAirlineHub, getOrbitDeals, orbitSlug } from '@/lib/orbitEngine';
import { launchLimits } from '@/lib/launchLimits';
import SmartInternalLinks from '@/components/seo/SmartInternalLinks';
import { getContentPage } from '@/lib/contentEngine';
import { getRelatedHubLinks, getPopularHubLinks } from '@/lib/relatedContentEngine';

export function generateStaticParams() {
  return airlines.slice(0, launchLimits.airlineGuides).map((airline) => ({ airline: orbitSlug(airline) }));
}

export function generateMetadata({ params }: { params: { airline: string } }) {
  const airline = getOrbitAirlineHub(params.airline);
  if (!airline) return { title: 'Airline guide not found | Can I Bring It Now' };
  return {
    title: `${airline} Baggage and Travel Rules | Can I Bring It Now`,
    description: `Check item rules, cabin baggage, checked baggage, packing guidance and travel questions for ${airline}.`,
    alternates: { canonical: `/airline-guides/${orbitSlug(airline)}/` },
  };
}

export default function AirlineHubPage({ params }: { params: { airline: string } }) {
  const airline = getOrbitAirlineHub(params.airline);
  if (!airline) notFound();

  const contentPage = getContentPage('airline', params.airline);
  const relatedAirlines = contentPage ? getRelatedHubLinks(contentPage, 8) : getPopularHubLinks('airline', 8);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/airline-guides/" className="text-sm font-semibold text-brand-600">← Airline guides</a>
          <OrbitHero eyebrow="Airline guide" title={`${airline} baggage and travel rules`} description={`Check common items, baggage questions, trip planning and travel-deal context for ${airline}.`} />
          <OrbitCardGrid title={`Popular ${airline} checks`} eyebrow="Airline authority hub" cards={getAirlineHubCards(airline)} />
          <OrbitDealGrid deals={getOrbitDeals(airline)} />
          <SmartInternalLinks
            title={`Compare ${airline} with other airline guides`}
            eyebrow="Related airlines and baggage guides"
            links={relatedAirlines}
          />
        </div>
      </section>
    </main>
  );
}
