import Orbit4CardGrid from '@/components/orbit4/Orbit4CardGrid';
import Orbit4Hero from '@/components/orbit4/Orbit4Hero';
import { getContentExpansionQueue } from '@/lib/orbit4Engine';

export const metadata = {
  title: 'Content Expansion Queue | Can I Bring It Now',
  description: 'Prioritise rule pages, airline hubs and country hubs before expanding into thousands of weaker pages.',
  alternates: { canonical: '/content-expansion-queue/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-3/" className="text-sm font-semibold text-brand-600">← ORBIT Release 3</a>
          <Orbit4Hero eyebrow="Content Expansion Queue" title="Improve the pages most likely to rank" description="Prioritise rule pages, airline hubs and country hubs before expanding into thousands of weaker pages." />
          <Orbit4CardGrid title="Priority content queue" eyebrow="Improve first" cards={getContentExpansionQueue()} />
        </div>
      </section>
    </main>
  );
}
