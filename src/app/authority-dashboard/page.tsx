import type { Metadata } from 'next';
import { getAuthorityAudit } from '@/lib/authorityEngine';

export const metadata: Metadata = {
  title: 'Authority Dashboard | Can I Bring It Now',
  description: 'Internal content-quality dashboard for prioritising travel-rule improvements.',
  robots: { index: false, follow: false },
};

export default function AuthorityDashboardPage() {
  const rows = getAuthorityAudit();
  const high = rows.filter((row) => row.priority === 'High').length;
  const medium = rows.filter((row) => row.priority === 'Medium').length;
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-black text-brand-600">Build 22 · Internal tool</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Authority Dashboard</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">Prioritise pages using source specificity, content depth and review age. Search Console ranking and CTR data should be layered onto this list during the daily growth routine.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200"><p className="text-sm font-bold text-slate-500">Rules audited</p><p className="mt-2 text-4xl font-black">{rows.length}</p></div>
          <div className="rounded-3xl bg-red-50 p-6 ring-1 ring-red-100"><p className="text-sm font-bold text-red-700">High priority</p><p className="mt-2 text-4xl font-black text-red-950">{high}</p></div>
          <div className="rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100"><p className="text-sm font-bold text-amber-700">Medium priority</p><p className="mt-2 text-4xl font-black text-amber-950">{medium}</p></div>
        </div>
        <div className="mt-8 overflow-x-auto rounded-3xl bg-white ring-1 ring-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-950 text-white"><tr><th className="p-4">Priority</th><th className="p-4">Score</th><th className="p-4">Page</th><th className="p-4">Category</th><th className="p-4">Source</th><th className="p-4">Review age</th></tr></thead>
            <tbody>{rows.slice(0, 250).map((row) => <tr key={row.slug} className="border-t border-slate-100"><td className="p-4 font-black">{row.priority}</td><td className="p-4">{row.score}/100</td><td className="p-4"><a className="font-bold text-brand-700 hover:underline" href={`/rules/${row.slug}/`}>{row.item}</a></td><td className="p-4">{row.category}</td><td className="p-4">{row.genericSource ? 'Needs specific source' : 'Specific context'}</td><td className="p-4">{row.ageDays} days</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
