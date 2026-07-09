import { getAuthorityTopicPages } from '@/lib/atlasAuthorityEngine';

export const metadata = {
  title: 'Authority Clusters | Can I Bring It Now',
  description: 'Internal overview of ATLAS authority clusters for travel rules, airlines, countries and packing guides.',
  alternates: { canonical: '/authority-clusters/' },
};

export default function AuthorityClustersPage() {
  const pages = getAuthorityTopicPages();

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>

          <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
            <p className="font-bold text-sky-300">Project ATLAS · Package 1C</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Google authority clusters</h1>
            <p className="mt-5 max-w-3xl leading-8 text-slate-300">
              This package creates topic cluster pages and strengthens rule-page internal linking for search engines.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-4xl font-black">{pages.length}</p>
                <p className="text-sm text-slate-300">Topic cluster pages</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-4xl font-black">3</p>
                <p className="text-sm text-slate-300">Cluster types per priority rule</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-4xl font-black">24+</p>
                <p className="text-sm text-slate-300">Authority links per rule</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
