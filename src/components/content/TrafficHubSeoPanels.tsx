import { AlertTriangle, ArrowRight, CheckCircle2, CircleX, HelpCircle, ListChecks, PlaneTakeoff } from 'lucide-react';
import type { UniversalContentPage } from '@/lib/contentEngine';
import { buildHubFaqJsonLd, getTrafficHubProfile } from '@/lib/trafficHubSeo';

function statusStyle(status: string) {
  if (status === 'Allowed') return 'bg-green-50 text-green-900 ring-green-200';
  if (status === 'Restricted') return 'bg-amber-50 text-amber-900 ring-amber-200';
  return 'bg-red-50 text-red-900 ring-red-200';
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'Allowed') return <CheckCircle2 className="h-5 w-5" />;
  if (status === 'Restricted') return <AlertTriangle className="h-5 w-5" />;
  return <CircleX className="h-5 w-5" />;
}

export default function TrafficHubSeoPanels({ page }: { page: UniversalContentPage }) {
  const profile = getTrafficHubProfile(page);
  if (!profile) return null;

  const faqJsonLd = buildHubFaqJsonLd(page, profile);

  return (
    <section className="mt-8 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-brand-50 p-3 text-brand-700 ring-1 ring-brand-100">
            <PlaneTakeoff className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-brand-600">Search-demand travel hub</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">{profile.heading}</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-600">{profile.intro}</p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-slate-200">
          <div className="grid grid-cols-[1fr_100px_100px] bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-wide text-white sm:grid-cols-[1fr_140px_140px]">
            <span>Rule outcome</span>
            <span className="text-center">Cabin</span>
            <span className="text-center">Checked</span>
          </div>
          {profile.statusSummary.map((row) => (
            <div key={row.status} className="grid grid-cols-[1fr_100px_100px] items-center border-t border-slate-200 px-4 py-4 sm:grid-cols-[1fr_140px_140px]">
              <div className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-black ring-1 ${statusStyle(row.status)}`}>
                <StatusIcon status={row.status} /> {row.status}
              </div>
              <span className="text-center text-lg font-black text-slate-950">{row.cabin}</span>
              <span className="text-center text-lg font-black text-slate-950">{row.checked}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">Counts summarise the linked rules on this hub. They are not a substitute for reading the exact item rule.</p>
      </div>

      {profile.topics.length > 0 && (
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
          <div className="flex items-center gap-3">
            <ListChecks className="h-6 w-6 text-sky-300" />
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-sky-300">Most checked topics</p>
              <h2 className="mt-1 text-2xl font-black">Explore the busiest item groups</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profile.topics.map((topic) => (
              <a key={topic.href} href={topic.href} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/15">
                <p className="text-lg font-black">{topic.name}</p>
                <p className="mt-2 text-sm text-slate-300">{topic.ruleCount} linked rule{topic.ruleCount === 1 ? '' : 's'}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                  {topic.allowedCabin > 0 && <span className="rounded-full bg-green-400/15 px-2 py-1 text-green-200">{topic.allowedCabin} cabin allowed</span>}
                  {topic.restrictedCabin > 0 && <span className="rounded-full bg-amber-400/15 px-2 py-1 text-amber-200">{topic.restrictedCabin} restricted</span>}
                  {topic.blockedCabin > 0 && <span className="rounded-full bg-red-400/15 px-2 py-1 text-red-200">{topic.blockedCabin} blocked</span>}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-sky-300">Open item guide <ArrowRight className="h-4 w-4" /></span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-brand-600" />
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-brand-600">Questions travellers ask</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">Common questions about {page.name}</h2>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {profile.questions.map((item) => (
            <details key={item.question} className="group rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 open:bg-white open:shadow-soft">
              <summary className="cursor-pointer list-none font-black text-slate-950">{item.question}</summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
              {item.href && (
                <a href={item.href} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-600">
                  {item.linkLabel || 'Learn more'} <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </details>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] bg-gradient-to-r from-brand-600 to-sky-600 p-6 text-white shadow-soft md:flex md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-white/75">Personalised travel check</p>
          <h2 className="mt-2 text-2xl font-black">{profile.tripCheckerLabel}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85">Add multiple items, choose cabin or checked baggage and receive one combined decision summary.</p>
        </div>
        <a href="/trip-checker/" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-brand-700 hover:bg-slate-50 md:mt-0">
          Open Trip Checker <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
