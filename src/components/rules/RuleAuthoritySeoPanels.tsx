import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CircleAlert,
  ExternalLink,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import type { Rule, RuleStatus } from '@/data/rules';
import {
  getAirlineComparisonRows,
  getAuthoritySourceCards,
  getNextReviewDate,
  getPeopleAskAnswers,
} from '@/lib/ruleAuthoritySeo';
import { getMonthYear } from '@/lib/ruleInsights';

function statusStyle(status: RuleStatus) {
  if (status === 'Allowed') return 'bg-green-50 text-green-900 ring-green-200';
  if (status === 'Not allowed') return 'bg-red-50 text-red-900 ring-red-200';
  return 'bg-amber-50 text-amber-900 ring-amber-200';
}

function sourceStyle(status: 'verified' | 'editorial' | 'required') {
  if (status === 'verified') return 'bg-green-50 text-green-950 ring-green-200';
  if (status === 'required') return 'bg-amber-50 text-amber-950 ring-amber-200';
  return 'bg-slate-50 text-slate-950 ring-slate-200';
}

export default function RuleAuthoritySeoPanels({ rule }: { rule: Rule }) {
  const sources = getAuthoritySourceCards(rule);
  const comparisonRows = getAirlineComparisonRows(rule, 8);
  const peopleAsk = getPeopleAskAnswers(rule);

  return (
    <>
      <section className="mt-8 rounded-[2rem] bg-white p-6 ring-1 ring-slate-200 md:p-8" aria-labelledby="source-confidence-heading">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-black text-brand-700 ring-1 ring-brand-100">
              <ShieldCheck className="h-4 w-4" /> Source confidence
            </div>
            <h2 id="source-confidence-heading" className="mt-4 text-3xl font-black text-slate-950">Official-source status for this rule</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              We keep editorial summaries separate from named official verification. Missing source coverage remains visible so travellers know what still needs checking.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white">
            <p className="text-xs font-black uppercase tracking-wide text-sky-300">Review schedule</p>
            <p className="mt-1 font-black">Next review: {getNextReviewDate(rule.updated)}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sources.map((source) => (
            <article key={source.id} className={`rounded-3xl p-5 ring-1 ${sourceStyle(source.status)}`}>
              <div className="flex items-start gap-3">
                {source.status === 'verified' ? (
                  <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-green-700" />
                ) : source.status === 'required' ? (
                  <CircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
                ) : (
                  <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-slate-600" />
                )}
                <div>
                  <p className="text-xs font-black uppercase tracking-wide opacity-70">
                    {source.status === 'verified' ? 'Verified source' : source.status === 'required' ? 'Verification gap' : 'Editorial summary'}
                  </p>
                  <h3 className="mt-1 text-lg font-black">{source.title}</h3>
                  <p className="mt-2 text-sm leading-6 opacity-80">{source.description}</p>
                  {source.checkedOn && <p className="mt-3 text-xs font-bold opacity-70">Checked {getMonthYear(source.checkedOn)}</p>}
                  {source.href && (
                    <a href={source.href} className="mt-4 inline-flex items-center gap-2 text-sm font-black underline underline-offset-4" {...(source.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      Open source or guide <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-sky-50 p-4 text-sm leading-6 text-sky-950 ring-1 ring-sky-100">
          <CalendarClock className="mt-0.5 h-5 w-5 shrink-0" />
          <p><strong>Last reviewed:</strong> {getMonthYear(rule.updated)}. Rules can change between reviews, so always confirm time-sensitive restrictions before departure.</p>
        </div>
      </section>

      {comparisonRows.length >= 2 && (
        <section id="airline-comparison" className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8" aria-labelledby="airline-comparison-heading">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-sky-300">Airline comparison</p>
            <h2 id="airline-comparison-heading" className="mt-2 text-3xl font-black">Compare this item across airlines</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              These rows compare existing rule records in the site database. Open the airline-specific rule before relying on a result.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-white/10">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead className="bg-white/10 text-xs font-black uppercase tracking-wide text-sky-200">
                <tr>
                  <th className="px-4 py-4">Airline</th>
                  <th className="px-4 py-4">Cabin</th>
                  <th className="px-4 py-4">Checked</th>
                  <th className="px-4 py-4">Open rule</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.airline} className={`border-t border-white/10 ${row.isCurrent ? 'bg-sky-300/10' : 'bg-transparent'}`}>
                    <td className="px-4 py-4">
                      <p className="font-black">{row.airline}</p>
                      {row.isCurrent && <span className="mt-1 inline-block text-xs font-black text-sky-300">Current page</span>}
                    </td>
                    <td className="px-4 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${statusStyle(row.cabin)}`}>{row.cabin}</span></td>
                    <td className="px-4 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${statusStyle(row.checked)}`}>{row.checked}</span></td>
                    <td className="px-4 py-4">
                      <a href={`/rules/${row.ruleSlug}/`} className="inline-flex items-center gap-2 text-sm font-black text-sky-300 hover:text-sky-200">
                        View details <ArrowRight className="h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-400">A matching status does not guarantee identical quantity limits, packaging requirements or approval rules.</p>
        </section>
      )}

      <section className="mt-8 rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-sky-50 p-6 ring-1 ring-brand-100 md:p-8" aria-labelledby="people-ask-heading">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-7 w-7 text-brand-600" />
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-brand-600">Quick answers</p>
            <h2 id="people-ask-heading" className="mt-1 text-3xl font-black text-slate-950">Questions travellers also ask</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {peopleAsk.map((item) => (
            <article key={item.question} className="rounded-3xl bg-white p-5 ring-1 ring-slate-200">
              <h3 className="text-lg font-black text-slate-950">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
              {item.href && (
                <a href={item.href} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-600 hover:text-brand-700">
                  {item.linkLabel || 'Continue checking'} <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
