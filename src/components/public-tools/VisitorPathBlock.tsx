import { ArrowRight, Route } from 'lucide-react';
import { getFastRuleShortcuts, getVisitorPaths } from '@/lib/visitorPathEngine';

export default function VisitorPathBlock() {
  const paths = getVisitorPaths();
  const shortcuts = getFastRuleShortcuts(12);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Route className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">Visitor path engine</p>
          <h2 className="text-2xl font-black text-slate-950">Choose how you want to check</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {paths.map((path) => (
          <a key={path.href} href={path.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
            <p className="font-black text-slate-950">{path.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{path.description}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">
              Start <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-8">
        <p className="font-bold text-brand-600">Fast shortcuts</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {shortcuts.map((rule) => (
            <a key={rule.href} href={rule.href} className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">
              {rule.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
