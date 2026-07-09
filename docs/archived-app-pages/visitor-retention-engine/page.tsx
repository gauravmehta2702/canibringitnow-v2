import Orbit4CardGrid from '@/components/orbit4/Orbit4CardGrid';
import Orbit4Hero from '@/components/orbit4/Orbit4Hero';
import { getRetentionPaths } from '@/lib/orbit4Engine';

export const metadata = {
  title: 'Visitor Retention Engine | Can I Bring It Now',
  description: 'A user should not leave after one rule. Move them naturally to airline, country, packing, trip planner and deal pages.',
  alternates: { canonical: '/visitor-retention-engine/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-3/" className="text-sm font-semibold text-brand-600">← ORBIT Release 3</a>
          <Orbit4Hero eyebrow="Visitor Retention Engine" title="Keep visitors planning after the answer" description="A user should not leave after one rule. Move them naturally to airline, country, packing, trip planner and deal pages." />
          <Orbit4CardGrid title="Retention paths" eyebrow="Engagement" cards={getRetentionPaths()} />
        </div>
      </section>
    </main>
  );
}
