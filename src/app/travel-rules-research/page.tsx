import type { Metadata } from 'next';
import { ArrowRight, BarChart3, Database, Download, FileCheck2, ShieldCheck } from 'lucide-react';
import { buildTravelResearchSnapshot, percentage } from '@/lib/travelResearch';

export const metadata: Metadata = {
  title: 'Travel Rules Research Database & Statistics | Can I Bring It Now',
  description:
    'Explore a transparent snapshot of the Can I Bring It Now travel-rules database, including cabin and checked baggage decisions by category.',
  alternates: { canonical: '/travel-rules-research/' },
  openGraph: {
    title: 'Travel Rules Research Database & Statistics',
    description: 'A transparent, downloadable snapshot of structured travel-item guidance.',
    url: '/travel-rules-research/',
    type: 'article',
  },
};

const snapshot = buildTravelResearchSnapshot();

const headlineStats = [
  { label: 'Structured rule records', value: snapshot.totalRules.toLocaleString(), icon: Database },
  { label: 'Travel categories', value: snapshot.totalCategories.toLocaleString(), icon: BarChart3 },
  { label: 'Unique search tags', value: snapshot.uniqueTags.toLocaleString(), icon: FileCheck2 },
  { label: 'Records with warnings', value: snapshot.withWarnings.toLocaleString(), icon: ShieldCheck },
];

export default function TravelRulesResearchPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-bold text-sky-300">Original database snapshot</p>
          <h1 className="mt-3 max-w-5xl text-4xl font-black tracking-tight md:text-7xl">
            Travel rules research, organised for travellers, writers and researchers.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            This page summarises the structured records used by Can I Bring It Now. It is designed to make our coverage visible, downloadable and easy to cite without presenting the database as official airline or government data.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/downloads/canibringitnow-travel-rules-snapshot.csv" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-slate-950">
              <Download className="h-4 w-4" /> Download CSV snapshot
            </a>
            <a href="#methodology" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-bold text-white ring-1 ring-white/20">
              Read methodology <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-5 text-sm text-slate-400">Database latest review date: {snapshot.latestReview || 'Not available'}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {headlineStats.map(({ label, value, icon: Icon }) => (
            <article key={label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Icon className="h-7 w-7 text-brand-600" />
              <p className="mt-5 text-3xl font-black text-slate-950">{value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-600">Cabin baggage decisions</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">How the current records are classified</h2>
            <div className="mt-6 space-y-4">
              {[
                ['Allowed', snapshot.cabin.allowed],
                ['Restricted', snapshot.cabin.restricted],
                ['Not allowed', snapshot.cabin.notAllowed],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-slate-800">{label}</span>
                    <span className="font-black text-slate-950">{value as number} ({percentage(value as number, snapshot.totalRules)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-600">Checked baggage decisions</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Where checked-bag rules differ</h2>
            <div className="mt-6 space-y-4">
              {[
                ['Allowed', snapshot.checked.allowed],
                ['Restricted', snapshot.checked.restricted],
                ['Not allowed', snapshot.checked.notAllowed],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-slate-800">{label}</span>
                    <span className="font-black text-slate-950">{value as number} ({percentage(value as number, snapshot.totalRules)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-200 p-7">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-600">Category breakdown</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Coverage and decisions by travel category</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  {['Category', 'Records', 'Cabin allowed', 'Cabin restricted', 'Cabin not allowed', 'Checked allowed', 'Checked restricted', 'Checked not allowed'].map((heading) => (
                    <th key={heading} className="whitespace-nowrap px-5 py-4 font-black">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {snapshot.categories.map((row) => (
                  <tr key={row.category}>
                    <td className="whitespace-nowrap px-5 py-4 font-bold text-slate-950">{row.category}</td>
                    <td className="px-5 py-4">{row.total}</td>
                    <td className="px-5 py-4">{row.cabinAllowed}</td>
                    <td className="px-5 py-4">{row.cabinRestricted}</td>
                    <td className="px-5 py-4">{row.cabinNotAllowed}</td>
                    <td className="px-5 py-4">{row.checkedAllowed}</td>
                    <td className="px-5 py-4">{row.checkedRestricted}</td>
                    <td className="px-5 py-4">{row.checkedNotAllowed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="methodology" className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <p className="font-bold text-brand-600">Methodology and responsible use</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">What this dataset does—and does not—represent</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              ['Source', 'The figures are calculated directly from the structured Can I Bring It Now rule database at build time.'],
              ['Classification', 'Each record contains separate cabin and checked baggage classifications: Allowed, Restricted or Not allowed.'],
              ['Limitations', 'Records simplify complex policies and may not reflect every route, airport, aircraft, jurisdiction or personal circumstance.'],
              ['Verification', 'Travellers must confirm important restrictions with the relevant airline, airport and government authority before travel.'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <h3 className="text-lg font-black text-slate-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-200">
            <p className="font-bold text-amber-950">Citation guidance</p>
            <p className="mt-2 leading-7 text-amber-900">
              You may cite this page as a snapshot of the Can I Bring It Now database. Do not describe these figures as official global aviation statistics. For questions, corrections or media requests, use our contact page.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contact/" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 font-bold text-white">Contact the editorial team <ArrowRight className="h-4 w-4" /></a>
            <a href="/source-policy/" className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-3 font-bold text-slate-900">Read our source policy</a>
          </div>
        </div>
      </section>
    </main>
  );
}
