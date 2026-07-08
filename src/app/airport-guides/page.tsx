import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import { orbitAirports } from '@/lib/orbitEngine';

export const metadata = {
  title: 'Airport Travel Guides | Can I Bring It Now',
  description: 'Browse airport guides for security, liquids, batteries, family travel, hotels and transport.',
  alternates: { canonical: '/airport-guides/' },
};

export default function AirportGuidesPage() {
  const cards = orbitAirports.map((airport) => ({
    title: `${airport.name} (${airport.code})`,
    href: `/airport-guides/${airport.slug}/`,
    label: airport.country,
    description: `${airport.city} airport guide for security, packing, hotels, transport and travel questions.`,
  }));

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit/" className="text-sm font-semibold text-brand-600">← ORBIT</a>
          <OrbitHero eyebrow="Airport hubs" title="Airport travel guides" description="Airport hubs target travellers before they fly with security, hotels, transport and family travel guidance." />
          <OrbitCardGrid title="Browse airport guides" eyebrow="Airport authority" cards={cards} />
        </div>
      </section>
    </main>
  );
}
