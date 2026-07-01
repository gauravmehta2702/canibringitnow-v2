import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowLeft, Calendar, CheckCircle2, Luggage, ShieldCheck, ShoppingBag } from 'lucide-react';
import { rules } from '@/data/rules';

export function generateStaticParams() {
  return rules.map((rule) => ({ slug: rule.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const rule = rules.find((r) => r.slug === params.slug);
  if (!rule) return { title: 'Travel rule not found' };
  return { title: `${rule.item} | Can I Bring It Now`, description: rule.shortAnswer };
}

export default function RulePage({ params }: { params: { slug: string } }) {
  const rule = rules.find((r) => r.slug === params.slug);
  if (!rule) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600"><ArrowLeft className="h-4 w-4" />Back to search</a>
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <p className="font-semibold text-brand-600">{rule.category}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{rule.item}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{rule.shortAnswer}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-green-50 p-5 ring-1 ring-green-100"><div className="flex items-center gap-3"><CheckCircle2 className="h-6 w-6 text-green-700" /><h2 className="text-lg font-bold text-green-950">Cabin baggage</h2></div><p className="mt-3 text-green-800">{rule.cabin}</p></div>
              <div className="rounded-3xl bg-orange-50 p-5 ring-1 ring-orange-100"><div className="flex items-center gap-3"><Luggage className="h-6 w-6 text-orange-700" /><h2 className="text-lg font-bold text-orange-950">Checked baggage</h2></div><p className="mt-3 text-orange-800">{rule.checked}</p></div>
            </div>
            {rule.warning && <div className="mt-6 rounded-3xl bg-amber-50 p-5 ring-1 ring-amber-100"><div className="flex items-start gap-3"><AlertTriangle className="mt-1 h-6 w-6 text-amber-700" /><div><h2 className="font-bold text-amber-950">Important warning</h2><p className="mt-2 text-amber-800">{rule.warning}</p></div></div></div>}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <section className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200"><h2 className="text-xl font-bold text-slate-950">Restrictions</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">{rule.restrictions.map((x) => <li key={x}>{x}</li>)}</ul></section>
              <section className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200"><h2 className="text-xl font-bold text-slate-950">Travel tips</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">{rule.tips.map((x) => <li key={x}>{x}</li>)}</ul></section>
            </div>
            <div className="mt-8 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200"><div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-brand-600" /><h2 className="text-xl font-bold text-slate-950">Source note</h2></div><p className="mt-3 leading-7 text-slate-600">{rule.sourceNote}</p></div>
            {rule.affiliateType && <div className="mt-8 rounded-3xl bg-gradient-to-br from-white to-brand-50 p-6 ring-1 ring-slate-200"><ShoppingBag className="h-7 w-7 text-brand-600" /><p className="mt-3 font-semibold text-brand-600">Travel essentials</p><h2 className="mt-2 text-xl font-bold text-slate-950">Useful for this trip: {rule.affiliateType}</h2><p className="mt-2 text-slate-600">This space is ready for carefully selected recommendations once the page has enough useful content and traffic.</p></div>}
            <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200"><h2 className="text-xl font-bold text-slate-950">Related questions</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{rules.filter((r) => r.slug !== rule.slug).slice(0, 4).map((r) => <a key={r.slug} href={`/rules/${r.slug}/`} className="rounded-2xl border border-slate-200 p-4 font-semibold text-slate-800 hover:border-brand-500 hover:bg-brand-50">{r.item}</a>)}</div></section>
            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500"><Calendar className="h-4 w-4" />Last reviewed: {rule.updated}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
