import type { Metadata } from 'next';
import { getKeywordOpportunities } from '@/lib/keywordOpportunityEngine';

export const metadata: Metadata = {
  title: 'First-Page Opportunities | Can I Bring It Now',
  description: 'Internal heuristic dashboard for prioritising specific travel queries before Search Console and SEMrush data are imported.',
  robots: { index: false, follow: false },
};

export default function FirstPageOpportunitiesPage() {
  const rows = getKeywordOpportunities();
  const quickWins = rows.filter((row) => row.tier === 'Quick win').length;
  const medium = rows.filter((row) => row.tier === 'Medium opportunity').length;

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-black text-brand-600">Build 22 · Internal SEO tool</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">First-Page Opportunity Engine</h1>
        <p className="mt-4 max-w-4xl leading-7 text-slate-600">A transparent heuristic ranking of specific item + airline opportunities. It does not invent search volume or keyword difficulty. Replace or enrich these scores with Search Console and SEMrush exports when available.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200"><p className="text-sm font-bold text-slate-500">Opportunities assessed</p><p className="mt-2 text-4xl font-black">{rows.length}</p></div>
          <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100"><p className="text-sm font-bold text-emerald-700">Quick wins</p><p className="mt-2 text-4xl font-black text-emerald-950">{quickWins}</p></div>
          <div className="rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100"><p className="text-sm font-bold text-amber-700">Medium opportunities</p><p className="mt-2 text-4xl font-black text-amber-950">{medium}</p></div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/authority-dashboard/" className="rounded-full bg-slate-950 px-5 py-3 font-black text-white">Authority dashboard</a>
          <a href="/content-coverage-matrix/" className="rounded-full bg-white px-5 py-3 font-black text-slate-900 ring-1 ring-slate-200">Coverage matrix</a>
        </div>

        <div className="mt-8 overflow-x-auto rounded-3xl bg-white ring-1 ring-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-950 text-white"><tr><th className="p-4">Tier</th><th className="p-4">Score</th><th className="p-4">Target query</th><th className="p-4">Category</th><th className="p-4">Why it matters</th></tr></thead>
            <tbody>{rows.map((row) => <tr key={row.sourceSlug} className="border-t border-slate-100 align-top"><td className="p-4 font-black">{row.tier}</td><td className="p-4">{row.score}/100</td><td className="p-4"><a className="font-bold text-brand-700 hover:underline" href={row.pageHref}>{row.keyword}</a></td><td className="p-4">{row.category}</td><td className="p-4 text-slate-600">{row.rationale.slice(0, 3).join(' · ')}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
