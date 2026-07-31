import type { Metadata } from 'next';
import { getSearchConsoleSummary, getTrafficTargets, travelSectorExpansion } from '@/lib/trafficAccelerationEngine';

export const metadata: Metadata = {
  title: 'Traffic War Room | Can I Bring It Now',
  description: 'Internal Search Console priority dashboard for ranking and traffic decisions.',
  robots: { index: false, follow: false },
};

function pct(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

export default function TrafficWarRoomPage() {
  const summary = getSearchConsoleSummary();
  const targets = getTrafficTargets(80);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-black text-brand-600">Build 23 · Search Console intelligence</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Traffic Acceleration War Room</h1>
        <p className="mt-4 max-w-4xl leading-7 text-slate-600">This dashboard uses the uploaded Google Search Console snapshot dated {summary.snapshotDate}. It prioritises pages already earning impressions instead of inventing keyword volume or difficulty.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200"><p className="text-sm font-bold text-slate-500">Rule pages with data</p><p className="mt-2 text-4xl font-black">{summary.rulePageCount}</p></div>
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200"><p className="text-sm font-bold text-slate-500">Recorded impressions</p><p className="mt-2 text-4xl font-black">{summary.totalImpressions.toLocaleString()}</p></div>
          <div className="rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100"><p className="text-sm font-bold text-amber-700">CTR repairs</p><p className="mt-2 text-4xl font-black text-amber-950">{summary.ctrRepairs}</p></div>
          <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100"><p className="text-sm font-bold text-emerald-700">Page-one pushes</p><p className="mt-2 text-4xl font-black text-emerald-950">{summary.pageOnePushes}</p></div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/first-page-opportunities/" className="rounded-full bg-slate-950 px-5 py-3 font-black text-white">Heuristic opportunities</a>
          <a href="/authority-dashboard/" className="rounded-full bg-white px-5 py-3 font-black text-slate-900 ring-1 ring-slate-200">Authority audit</a>
          <a href="/content-coverage-matrix/" className="rounded-full bg-white px-5 py-3 font-black text-slate-900 ring-1 ring-slate-200">Coverage matrix</a>
        </div>

        <div className="mt-8 overflow-x-auto rounded-3xl bg-white ring-1 ring-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-950 text-white"><tr><th className="p-4">Score</th><th className="p-4">Priority</th><th className="p-4">Page</th><th className="p-4">Impressions</th><th className="p-4">CTR</th><th className="p-4">Position</th><th className="p-4">Next action</th></tr></thead>
            <tbody>{targets.map((target) => <tr key={target.slug} className="border-t border-slate-100 align-top"><td className="p-4 font-black">{target.opportunityScore}</td><td className="p-4 font-black">{target.priority}</td><td className="p-4"><a href={`/rules/${target.slug}/`} className="font-black text-brand-700 hover:underline">{target.rule?.item || target.slug}</a>{target.matchingQueries[0] && <p className="mt-1 text-xs text-slate-500">Query: {target.matchingQueries[0].query}</p>}</td><td className="p-4">{target.impressions}</td><td className="p-4">{pct(target.ctr)}</td><td className="p-4">{target.position.toFixed(2)}</td><td className="max-w-md p-4 leading-6 text-slate-600">{target.expectedAction}</td></tr>)}</tbody>
          </table>
        </div>

        <section className="mt-10 rounded-[2rem] bg-slate-950 p-7 text-white md:p-9">
          <p className="font-black text-sky-300">Whole travel industry expansion</p>
          <h2 className="mt-2 text-3xl font-black">Broaden from proven authority without losing focus</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {travelSectorExpansion.map((sector) => <a key={sector.sector} href={sector.route} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10"><h3 className="text-xl font-black">{sector.sector}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{sector.purpose}</p></a>)}
          </div>
        </section>
      </div>
    </main>
  );
}
