import { ArrowRight, BarChart3, Plane } from 'lucide-react';
import { getComparisonTopics } from '@/lib/travelKnowledgeGraph';
import { buildSeoMetadata } from '@/lib/siteSeo';

export const metadata = buildSeoMetadata({
  title: 'Compare Airline Baggage Rules by Item',
  description: 'Compare cabin and checked baggage rules across airlines for power banks and other commonly searched travel items.',
  path: '/compare-airlines/',
});

export default function CompareAirlinesPage() {
  const topics = getComparisonTopics();
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <div className="rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-slate-200 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-black text-brand-700"><BarChart3 className="h-4 w-4" /> Airline comparison engine</div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Compare airline baggage rules before you fly</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Choose an item to compare cabin and checked-baggage decisions across multiple airlines. Always confirm the latest policy with the airline before travel.</p>

            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {topics.map((topic) => (
                <a key={topic.slug} href={`/compare-airlines/${topic.slug}/`} className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-brand-400 hover:bg-brand-50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-brand-600">{topic.category}</p>
                      <h2 className="mt-2 text-2xl font-black text-slate-950">{topic.name}</h2>
                      <p className="mt-3 text-sm leading-6 text-slate-600">Compare {topic.entries.length} airlines side by side.</p>
                    </div>
                    <Plane className="h-6 w-6 text-slate-400 group-hover:text-brand-600" />
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 font-bold text-brand-700">Open comparison <ArrowRight className="h-4 w-4" /></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
