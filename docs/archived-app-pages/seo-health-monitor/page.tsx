import Orbit4Hero from '@/components/orbit4/Orbit4Hero';
import Orbit4ScoreGrid from '@/components/orbit4/Orbit4ScoreGrid';
import { getSeoHealthScores } from '@/lib/orbit4Engine';

export const metadata = {
  title: 'SEO Health Monitor | Can I Bring It Now',
  description: 'SEO health checklist for technical speed, indexing, internal linking, revenue readiness and international expansion.',
  alternates: { canonical: '/seo-health-monitor/' },
};

export default function SeoHealthMonitorPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-4/" className="text-sm font-semibold text-brand-600">← ORBIT Release 4</a>
          <Orbit4Hero eyebrow="SEO Health Monitor" title="What to improve before scaling content" description="Do not simply add more pages. Improve indexing, internal links, CTR and high-value pages first." />
          <Orbit4ScoreGrid scores={getSeoHealthScores()} />
        </div>
      </section>
    </main>
  );
}
