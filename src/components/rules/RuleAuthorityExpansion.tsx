import {
  AlertTriangle,
  BriefcaseBusiness,
  CalendarClock,
  Camera,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Plane,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getAirlineBySlug } from '@/lib/airlineUtils';
import {
  airlineSlug,
  getAirlineDifferencePoints,
  getAuthorityScenarios,
  getCommonMistakes,
  getDestinationConsiderations,
  getRuleFreshness,
  getTravellerProfiles,
} from '@/lib/ruleAuthority';

const profileIcons = {
  family: Users,
  business: BriefcaseBusiness,
  student: GraduationCap,
  specialist: Camera,
};

export default function RuleAuthorityExpansion({ rule }: { rule: Rule }) {
  const airline = getAirlineDifferencePoints(rule);
  const airlinePage = airline.namedAirline ? getAirlineBySlug(airlineSlug(airline.namedAirline)) : undefined;
  const destinationPoints = getDestinationConsiderations(rule);
  const mistakes = getCommonMistakes(rule);
  const scenarios = getAuthorityScenarios(rule);
  const profiles = getTravellerProfiles(rule);
  const freshness = getRuleFreshness(rule);

  return (
    <section className="mt-8 space-y-8" data-rule-authority-expansion>
      <div className="rounded-[2rem] bg-slate-950 p-6 text-white md:p-8">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-sky-300" />
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-sky-300">Rule authority guide</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Important differences beyond the quick answer</h2>
            <p className="mt-4 max-w-4xl leading-8 text-slate-300">
              A baggage answer can be affected by the operating airline, departure airport, connecting airports and destination customs rules. Use these checks to understand where the practical answer can change.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 md:p-8">
          <div className="flex items-center gap-3">
            <Plane className="h-6 w-6 text-brand-600" />
            <h2 className="text-2xl font-black text-slate-950">Airline differences</h2>
          </div>
          {airline.namedAirline && (
            <p className="mt-4 leading-7 text-slate-700">
              This rule is associated with <strong className="capitalize">{airline.namedAirline}</strong>. Review its current airline guide as well as the policy of any codeshare operating carrier.
            </p>
          )}
          <ul className="mt-5 space-y-3">
            {airline.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                {point}
              </li>
            ))}
          </ul>
          {airlinePage && (
            <a
              href={`/airlines/${airlinePage.slug}/`}
              className="mt-6 inline-flex items-center gap-2 font-black text-brand-600 hover:text-brand-700"
            >
              Open the airline guide <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </article>

        <article className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 md:p-8">
          <div className="flex items-center gap-3">
            <ExternalLink className="h-6 w-6 text-brand-600" />
            <h2 className="text-2xl font-black text-slate-950">Destination considerations</h2>
          </div>
          <p className="mt-4 leading-7 text-slate-700">
            Being accepted by an airline or departure airport does not automatically mean the item can legally enter the destination country.
          </p>
          <ul className="mt-5 space-y-3">
            {destinationPoints.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                {point}
              </li>
            ))}
          </ul>
          <a href="/countries/" className="mt-6 inline-flex items-center gap-2 font-black text-brand-600 hover:text-brand-700">
            Browse destination guides <ExternalLink className="h-4 w-4" />
          </a>
        </article>
      </div>

      <section>
        <p className="font-black uppercase tracking-wide text-brand-600">Real journey situations</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">How the answer can change in practice</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((scenario) => (
            <article key={scenario.title} className="rounded-3xl bg-sky-50 p-5 ring-1 ring-sky-100">
              <Plane className="h-5 w-5 text-brand-700" />
              <h3 className="mt-3 font-black text-slate-950">{scenario.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{scenario.body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100 md:p-8">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-700" />
            <h2 className="text-2xl font-black text-amber-950">Common traveller mistakes</h2>
          </div>
          <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-amber-900">
            {mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
          </ul>
        </article>

        <article className="rounded-3xl bg-green-50 p-6 ring-1 ring-green-100 md:p-8">
          <div className="flex items-center gap-3">
            <CalendarClock className="h-6 w-6 text-green-700" />
            <h2 className="text-2xl font-black text-green-950">Review and source transparency</h2>
          </div>
          <p className="mt-4 leading-7 text-green-900">
            <strong>{freshness.status}.</strong> This page was last reviewed on {rule.updated}.
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-green-900">
            <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />Airline baggage policy should be checked before departure.</li>
            <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />Departure-airport security guidance can affect screening.</li>
            <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />Destination customs guidance must be checked when import rules may apply.</li>
          </ul>
          <p className="mt-5 text-sm leading-6 text-green-800">{rule.sourceNote}</p>
        </article>
      </div>

      <section className="rounded-[2rem] bg-white p-6 ring-1 ring-slate-200 md:p-8">
        <p className="text-sm font-black uppercase tracking-wide text-brand-600">Advice by traveller type</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Checks that matter for different journeys</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {profiles.map((profile) => {
            const Icon = profileIcons[profile.kind];
            return (
              <article key={profile.title} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <Icon className="h-5 w-5 text-brand-600" />
                <h3 className="mt-3 font-black text-slate-950">{profile.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{profile.body}</p>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
