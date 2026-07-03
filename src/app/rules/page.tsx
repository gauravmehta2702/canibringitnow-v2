import { rules } from '@/data/rules';

export const metadata = {
  title: 'All Travel Rules | Can I Bring It Now',
  description: 'Browse all travel item rules for airlines, baggage, customs and airport security.',
};

export default function RulesIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <p className="font-semibold text-brand-600">Travel rules database</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">All travel rules</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Browse the growing Can I Bring It Now rule database.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rules.map((rule) => (
              <a key={rule.slug} href={`/rules/${rule.slug}/`} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft">
                <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
                <h2 className="mt-2 text-xl font-bold text-slate-950">{rule.item}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-500">Cabin</p><p className="font-bold text-slate-950">{rule.cabin}</p></div>
                  <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-500">Checked</p><p className="font-bold text-slate-950">{rule.checked}</p></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
