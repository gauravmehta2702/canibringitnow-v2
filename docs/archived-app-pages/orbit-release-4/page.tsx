import Orbit4CardGrid from '@/components/orbit4/Orbit4CardGrid';
import Orbit4Hero from '@/components/orbit4/Orbit4Hero';
import { getOrbit4Modules } from '@/lib/orbit4Engine';

export const metadata = {
  title: 'ORBIT Release 4 | Can I Bring It Now',
  description: 'This release is about execution: indexing, internal links, content priorities, retention paths and revenue-safe placements.',
  alternates: { canonical: '/orbit-release-4/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-3/" className="text-sm font-semibold text-brand-600">← ORBIT Release 3</a>
          <Orbit4Hero eyebrow="ORBIT Release 4" title="Launch control and growth operations" description="This release is about execution: indexing, internal links, content priorities, retention paths and revenue-safe placements." />
          <Orbit4CardGrid title="Release 4 modules" eyebrow="Launch control" cards={getOrbit4Modules()} />
        </div>
      </section>
    </main>
  );
}
