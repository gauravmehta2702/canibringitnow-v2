import Orbit6Grid from '@/components/orbit6/Orbit6Grid';
import Orbit6Hero from '@/components/orbit6/Orbit6Hero';
import { getEditorialCalendar } from '@/lib/orbit6Engine';

export const metadata = {
  title: 'Editorial Calendar | Can I Bring It Now',
  description: 'A practical content queue for SEO pages, rule updates, country guides, airline hubs and social content.',
  alternates: { canonical: '/editorial-calendar/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-5/" className="text-sm font-semibold text-brand-600">← ORBIT Release 5</a>
          <Orbit6Hero eyebrow="Editorial Calendar" title="What to publish and improve each week" description="A practical content queue for SEO pages, rule updates, country guides, airline hubs and social content." />
          <Orbit6Grid title="Weekly content queue" eyebrow="Content" cards={getEditorialCalendar()} />
        </div>
      </section>
    </main>
  );
}
