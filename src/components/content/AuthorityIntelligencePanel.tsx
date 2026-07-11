import { AlertTriangle, BadgeCheck, CheckCircle2, ExternalLink, Plane, ShieldCheck } from 'lucide-react';
import { getAuthorityIntelligence, type AuthorityIntelligence } from '@/lib/authorityIntelligence';
import type { UniversalContentPage } from '@/lib/contentEngine';

function ConfidenceBadge({ value }: { value: AuthorityIntelligence['confidence'] }) {
  const classes = value === 'High'
    ? 'bg-green-50 text-green-800 ring-green-200'
    : value === 'Medium'
      ? 'bg-amber-50 text-amber-800 ring-amber-200'
      : 'bg-red-50 text-red-800 ring-red-200';
  return <span className={`rounded-full px-4 py-2 text-sm font-black ring-1 ${classes}`}>Guidance confidence: {value}</span>;
}

export default function AuthorityIntelligencePanel({ page }: { page: UniversalContentPage }) {
  const intelligence = getAuthorityIntelligence(page);
  if (!intelligence) return null;

  const isAirline = page.kind === 'airline';

  return (
    <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-wide text-brand-600">{isAirline ? 'Airline intelligence' : 'Destination intelligence'}</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">What to verify before your journey</h2>
          <p className="mt-4 leading-7 text-slate-600">{intelligence.intro}</p>
        </div>
        <ConfidenceBadge value={intelligence.confidence} />
      </div>

      {intelligence.alerts.length > 0 && (
        <div className="mt-6 rounded-3xl bg-amber-50 p-5 ring-1 ring-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
            <div>
              <h3 className="font-black text-amber-950">Important points for {page.name}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-amber-900">
                {intelligence.alerts.map((alert) => <li key={alert}>{alert}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {intelligence.sections.map((section, index) => (
          <article key={section.title} className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              {index % 2 === 0 ? <Plane className="h-6 w-6 text-brand-600" /> : <ShieldCheck className="h-6 w-6 text-brand-600" />}
              <h3 className="text-xl font-black text-slate-950">{section.title}</h3>
            </div>
            <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
            <ul className="mt-4 space-y-2">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-green-700" /> {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-7 rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100">
        <div className="flex items-center gap-3">
          <BadgeCheck className="h-6 w-6 text-brand-700" />
          <h3 className="text-xl font-black text-slate-950">Official checks to complete</h3>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {intelligence.officialChecks.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-brand-100">
              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">These are verification prompts, not claims that a particular allowance is current. Always use the latest official policy for your exact route and travel date.</p>
      </div>
    </section>
  );
}
