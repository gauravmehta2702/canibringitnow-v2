import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import { getDiscoverStories } from '@/lib/orbitEngine';

export const metadata = {
  title: 'Travel Tips and Airport Stories | Can I Bring It Now',
  description: 'Google Discover-friendly travel tips, airport mistakes, baggage rules and travel preparation stories.',
  alternates: { canonical: '/discover-travel/' },
};

export default function DiscoverTravelPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit/" className="text-sm font-semibold text-brand-600">← ORBIT</a>
          <OrbitHero eyebrow="Google Discover" title="Travel tips people want to click" description="Story-led travel content ideas designed for curiosity, sharing and Google Discover while still linking back to useful rule pages." />
          <OrbitCardGrid title="Discover-friendly story ideas" eyebrow="Traffic magnets" cards={getDiscoverStories()} />
        </div>
      </section>
    </main>
  );
}
