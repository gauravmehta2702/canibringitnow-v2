import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import { getOrbitIndexCards } from '@/lib/orbitEngine';

export const metadata = {
  title: 'ORBIT Global Travel Hub | Can I Bring It Now',
  description: 'Global travel hubs connecting rules, airlines, countries, airports, hotels, deals and trip planning.',
  alternates: { canonical: '/orbit/' },
};

export default function OrbitPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <OrbitHero
            eyebrow="Project ORBIT · Combined Release"
            title="Global travel hub engine"
            description="A single release that creates item hubs, airline hubs, country hubs, airport guides, travel-deal pages and Discover-friendly content paths."
          />
          <OrbitCardGrid title="Explore ORBIT hubs" eyebrow="Traffic architecture" cards={getOrbitIndexCards()} />
        </div>
      </section>
    </main>
  );
}
