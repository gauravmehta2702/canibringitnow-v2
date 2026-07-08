import Orbit4CardGrid from '@/components/orbit4/Orbit4CardGrid';
import Orbit4Hero from '@/components/orbit4/Orbit4Hero';
import { getIndexablePageGroups } from '@/lib/orbit4Engine';

export const metadata = {
  title: 'Indexable Pages Map | Can I Bring It Now',
  description: 'Focus crawl and indexing on public travel answers, hubs, question pages and topic clusters.',
  alternates: { canonical: '/indexable-pages-map/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-3/" className="text-sm font-semibold text-brand-600">← ORBIT Release 3</a>
          <Orbit4Hero eyebrow="Indexable Pages Map" title="Show Google the right pages first" description="Focus crawl and indexing on public travel answers, hubs, question pages and topic clusters." />
          <Orbit4CardGrid title="Indexing priorities" eyebrow="Crawl strategy" cards={getIndexablePageGroups()} />
        </div>
      </section>
    </main>
  );
}
