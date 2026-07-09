import { notFound } from 'next/navigation';
import { countries } from '@/data/rules';
import DestinationIntelligencePage from '@/components/destinations/DestinationIntelligencePage';
import { destinationSlug, getDestinationProfile } from '@/lib/v3DestinationIntelligence';

export function generateStaticParams() {
  return countries.map((country) => ({ country: destinationSlug(country) }));
}

export function generateMetadata({ params }: { params: { country: string } }) {
  const country = countries.find((item) => destinationSlug(item) === params.country);
  if (!country) return { title: 'Destination not found | Can I Bring It Now' };
  const profile = getDestinationProfile(country);
  return {
    title: `${country} Travel Preparation Guide | Can I Bring It Now`,
    description: profile.intro,
    alternates: { canonical: `/destinations/${profile.slug}/` },
  };
}

export default function DestinationPage({ params }: { params: { country: string } }) {
  const country = countries.find((item) => destinationSlug(item) === params.country);
  if (!country) notFound();

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/destination-intelligence/" className="text-sm font-semibold text-brand-600">← Destination Intelligence</a>
          <DestinationIntelligencePage country={country} />
        </div>
      </section>
    </main>
  );
}
