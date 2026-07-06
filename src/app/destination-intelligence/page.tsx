import { getTopDestinationProfiles } from '@/lib/v3DestinationIntelligence';
import DestinationCardGrid from '@/components/destinations/DestinationCardGrid';
import DestinationIntelligencePage from '@/components/destinations/DestinationIntelligencePage';

export const metadata = {
  title: 'Destination Intelligence | Can I Bring It Now',
  description: 'Destination travel preparation guides with travel rules, packing, customs questions and hotel guide ideas.',
  alternates: { canonical: '/destination-intelligence/' },
};

export default function DestinationIntelligenceHomePage() {
  const destinations = getTopDestinationProfiles(12).map((profile) => ({
    title: profile.country,
    href: `/destinations/${profile.slug}/`,
    label: 'Destination guide',
    description: profile.intro,
  }));

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <DestinationIntelligencePage country="Japan" />
          <DestinationCardGrid title="More destination guides" eyebrow="Explore destinations" cards={destinations} />
        </div>
      </section>
    </main>
  );
}
