import { notFound } from 'next/navigation';
import { rules } from '@/data/rules';
import { AlertTriangle, CheckCircle2, Luggage, ShieldCheck, ShoppingBag } from 'lucide-react';

export function generateStaticParams() { return rules.map(rule => ({ slug: rule.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }) {
  const rule = rules.find(r => r.slug === params.slug);
  if (!rule) return {};
  return { title: `${rule.item} | Can I Bring It Now`, description: rule.shortAnswer };
}

export default function RulePage({ params }: { params: { slug: string } }) {
  const rule = rules.find(r => r.slug === params.slug);
  if (!rule) notFound();
  return <main className="min-h-screen bg-slate-50">
    <header className="bg-white border-b border-slate-200"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5"><a href="/" className="flex items-center gap-3 font-bold"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white"><Luggage className="h-5 w-5" /></span>Can I Bring It Now</a><a href="/" className="text-sm font-semibold text-brand-600">Search another item</a></div></header>
    <article className="mx-auto max-w-5xl px-5 py-10">
      <p className="font-semibold text-brand-600">{rule.category}</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{rule.item}</h1>
      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-bold">Short answer</h2><p className="mt-3 text-lg leading-8 text-slate-700">{rule.shortAnswer}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-green-50 p-5"><CheckCircle2 className="h-7 w-7 text-green-700" /><p className="mt-2 font-bold text-green-900">Cabin baggage</p><p className="text-green-800">{rule.cabin}</p></div>
          <div className="rounded-2xl bg-orange-50 p-5"><AlertTriangle className="h-7 w-7 text-orange-700" /><p className="mt-2 font-bold text-orange-900">Checked baggage</p><p className="text-orange-800">{rule.checked}</p></div>
        </div>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <section className="md:col-span-2 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><ShieldCheck className="h-7 w-7 text-brand-600" /><h2 className="mt-3 text-2xl font-bold">Important note</h2><p className="mt-3 leading-7 text-slate-700">{rule.warning || 'Rules may vary by airline, airport and destination. Always check official guidance before travelling.'}</p><p className="mt-4 text-sm text-slate-500">Last updated: {rule.updated}</p></section>
        <aside className="rounded-3xl border border-dashed border-slate-300 bg-white p-6"><ShoppingBag className="h-7 w-7 text-brand-600" /><h2 className="mt-3 text-xl font-bold">Related travel essentials</h2><p className="mt-3 text-sm leading-6 text-slate-600">Future monetisation space for relevant affiliate recommendations: {rule.affiliateType || 'travel essentials'}.</p></aside>
      </div>
      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h2 className="text-2xl font-bold">Related questions</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{rules.filter(r => r.slug !== rule.slug).slice(0,4).map(r => <a key={r.slug} href={`/rules/${r.slug}/`} className="rounded-2xl border border-slate-200 p-4 font-semibold hover:border-brand-500">{r.item}</a>)}</div></section>
    </article>
  </main>;
}
