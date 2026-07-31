import type { Metadata } from 'next';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { getCoverageMatrix } from '@/lib/keywordOpportunityEngine';

export const metadata: Metadata = {
  title: 'Content Coverage Matrix | Can I Bring It Now',
  description: 'Internal topic-cluster coverage audit across airline, airport, country, customs and practical travel guidance.',
  robots: { index: false, follow: false },
};

const dimensions = ['Airline', 'Airport', 'Country', 'Customs', 'Travel tips'] as const;

export default function ContentCoverageMatrixPage() {
  const rows = getCoverageMatrix();
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-black text-brand-600">Build 22 · Internal SEO tool</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Content Coverage Matrix</h1>
        <p className="mt-4 max-w-4xl leading-7 text-slate-600">Highlights where an item cluster already connects to airline, airport, country, customs and practical travel guidance—and where focused expansion may be useful.</p>
        <div className="mt-6"><a href="/first-page-opportunities/" className="rounded-full bg-slate-950 px-5 py-3 font-black text-white">Open first-page opportunities</a></div>
        <div className="mt-8 overflow-x-auto rounded-3xl bg-white ring-1 ring-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-950 text-white"><tr><th className="p-4">Topic</th><th className="p-4">Category</th><th className="p-4">Pages</th>{dimensions.map((dimension) => <th key={dimension} className="p-4">{dimension}</th>)}<th className="p-4">Priority gaps</th></tr></thead>
            <tbody>{rows.slice(0, 300).map((row) => <tr key={row.topic} className="border-t border-slate-100"><td className="p-4 font-black text-slate-950">{row.topic}</td><td className="p-4">{row.category}</td><td className="p-4">{row.pageCount}</td>{dimensions.map((dimension) => <td key={dimension} className="p-4">{row.dimensions[dimension] ? <CheckCircle2 aria-label="Covered" className="h-5 w-5 text-emerald-600" /> : <CircleDashed aria-label="Gap" className="h-5 w-5 text-amber-600" />}</td>)}<td className="p-4 text-slate-600">{row.gaps.length ? row.gaps.join(', ') : 'Complete core coverage'}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
