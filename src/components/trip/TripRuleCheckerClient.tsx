'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  Luggage,
  Plus,
  Printer,
  Search,
  ShieldCheck,
  Trash2,
  XCircle,
} from 'lucide-react';

export type TripRuleOption = {
  slug: string;
  item: string;
  category: string;
  shortAnswer: string;
  cabin: 'Allowed' | 'Restricted' | 'Not allowed';
  checked: 'Allowed' | 'Restricted' | 'Not allowed';
  warning?: string;
  tags: string[];
};

type Props = {
  rules: TripRuleOption[];
  airlines: string[];
  countries: string[];
};

type BagMode = 'cabin' | 'checked';

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function statusClasses(status: TripRuleOption['cabin']) {
  if (status === 'Allowed') return 'bg-green-50 text-green-950 ring-green-200';
  if (status === 'Not allowed') return 'bg-red-50 text-red-950 ring-red-200';
  return 'bg-amber-50 text-amber-950 ring-amber-200';
}

function StatusIcon({ status }: { status: TripRuleOption['cabin'] }) {
  if (status === 'Allowed') return <CheckCircle2 className="h-5 w-5 text-green-700" />;
  if (status === 'Not allowed') return <XCircle className="h-5 w-5 text-red-700" />;
  return <AlertTriangle className="h-5 w-5 text-amber-700" />;
}

export default function TripRuleCheckerClient({ rules, airlines, countries }: Props) {
  const [airline, setAirline] = useState('');
  const [destination, setDestination] = useState('');
  const [bagMode, setBagMode] = useState<BagMode>('cabin');
  const [query, setQuery] = useState('');
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const selectedRules = useMemo(
    () => selectedSlugs.map((slug) => rules.find((rule) => rule.slug === slug)).filter(Boolean) as TripRuleOption[],
    [rules, selectedSlugs],
  );

  const suggestions = useMemo(() => {
    const needle = normalise(query);
    if (needle.length < 2) return [];
    const airlineNeedle = normalise(airline);

    return rules
      .filter((rule) => !selectedSlugs.includes(rule.slug))
      .map((rule) => {
        const haystack = normalise([rule.item, rule.category, ...rule.tags].join(' '));
        const direct = haystack.includes(needle) ? 20 : 0;
        const words = needle.split(' ').filter(Boolean);
        const wordScore = words.filter((word) => haystack.includes(word)).length * 4;
        const airlineScore = airlineNeedle && haystack.includes(airlineNeedle) ? 10 : 0;
        return { rule, score: direct + wordScore + airlineScore };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.rule.item.localeCompare(b.rule.item))
      .slice(0, 8)
      .map((entry) => entry.rule);
  }, [airline, query, rules, selectedSlugs]);

  const counts = useMemo(() => {
    return selectedRules.reduce(
      (acc, rule) => {
        const status = bagMode === 'cabin' ? rule.cabin : rule.checked;
        if (status === 'Allowed') acc.allowed += 1;
        else if (status === 'Not allowed') acc.notAllowed += 1;
        else acc.restricted += 1;
        return acc;
      },
      { allowed: 0, restricted: 0, notAllowed: 0 },
    );
  }, [bagMode, selectedRules]);

  function addRule(rule: TripRuleOption) {
    setSelectedSlugs((current) => [...current, rule.slug]);
    setQuery('');
  }

  function removeRule(slug: string) {
    setSelectedSlugs((current) => current.filter((item) => item !== slug));
  }

  async function copySummary() {
    const header = `Trip packing check${airline ? ` • ${airline}` : ''}${destination ? ` • ${destination}` : ''}`;
    const lines = selectedRules.map((rule) => {
      const status = bagMode === 'cabin' ? rule.cabin : rule.checked;
      return `${status}: ${rule.item} — ${rule.shortAnswer}`;
    });
    const text = [header, `Bag: ${bagMode === 'cabin' ? 'Cabin baggage' : 'Checked baggage'}`, '', ...lines, '', 'Always verify important restrictions with official airline, airport and destination sources.'].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
        <p className="text-sm font-black uppercase tracking-wide text-brand-600">Step 1</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Describe your journey</h2>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Airline (optional)
            <select value={airline} onChange={(event) => setAirline(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base outline-none focus:border-brand-500">
              <option value="">Select airline</option>
              {airlines.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Destination (optional)
            <select value={destination} onChange={(event) => setDestination(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base outline-none focus:border-brand-500">
              <option value="">Select destination</option>
              {countries.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>

          <fieldset>
            <legend className="text-sm font-bold text-slate-700">Which bag are you checking?</legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {([['cabin', 'Cabin bag'], ['checked', 'Checked bag']] as const).map(([value, label]) => (
                <button key={value} type="button" onClick={() => setBagMode(value)} className={`rounded-2xl p-4 text-left font-black ring-1 transition ${bagMode === value ? 'bg-brand-600 text-white ring-brand-600' : 'bg-slate-50 text-slate-800 ring-slate-200 hover:bg-brand-50'}`}>
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-7">
          <p className="text-sm font-black uppercase tracking-wide text-brand-600">Step 2</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Add the items you are packing</h2>
          <div className="relative mt-5">
            <Search className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try power bank, medicine, perfume..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-base font-semibold outline-none focus:border-brand-500" />
          </div>

          {suggestions.length > 0 && (
            <div className="mt-3 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
              {suggestions.map((rule) => (
                <button key={rule.slug} type="button" onClick={() => addRule(rule)} className="flex w-full items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 text-left last:border-0 hover:bg-brand-50">
                  <span>
                    <span className="block font-bold text-slate-950">{rule.item}</span>
                    <span className="block text-xs text-slate-500">{rule.category}</span>
                  </span>
                  <Plus className="h-5 w-5 shrink-0 text-brand-600" />
                </button>
              ))}
            </div>
          )}

          {selectedRules.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {selectedRules.map((rule) => (
                <button key={rule.slug} type="button" onClick={() => removeRule(rule.slug)} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-red-50 hover:text-red-700">
                  {rule.item}<Trash2 className="h-4 w-4" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-sky-300">Your trip result</p>
            <h2 className="mt-2 text-3xl font-black">Packing decision summary</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {airline || 'Any airline'}{destination ? ` • Destination: ${destination}` : ''} • {bagMode === 'cabin' ? 'Cabin baggage' : 'Checked baggage'}
            </p>
          </div>
          <Luggage className="h-10 w-10 text-sky-300" />
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-green-400/10 p-4 text-center ring-1 ring-green-300/20"><p className="text-3xl font-black text-green-300">{counts.allowed}</p><p className="mt-1 text-xs font-bold text-green-100">Allowed</p></div>
          <div className="rounded-2xl bg-amber-400/10 p-4 text-center ring-1 ring-amber-300/20"><p className="text-3xl font-black text-amber-300">{counts.restricted}</p><p className="mt-1 text-xs font-bold text-amber-100">Restricted</p></div>
          <div className="rounded-2xl bg-red-400/10 p-4 text-center ring-1 ring-red-300/20"><p className="text-3xl font-black text-red-300">{counts.notAllowed}</p><p className="mt-1 text-xs font-bold text-red-100">Not allowed</p></div>
        </div>

        {selectedRules.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white/10 p-7 text-center ring-1 ring-white/10">
            <ShieldCheck className="mx-auto h-10 w-10 text-sky-300" />
            <p className="mt-4 text-xl font-black">Add your first item</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Search on the left to build a personalised packing check.</p>
          </div>
        ) : (
          <div className="mt-7 space-y-4">
            {selectedRules.map((rule) => {
              const status = bagMode === 'cabin' ? rule.cabin : rule.checked;
              return (
                <article key={rule.slug} className={`rounded-3xl p-5 text-slate-950 ring-1 ${statusClasses(status)}`}>
                  <div className="flex items-start gap-3">
                    <StatusIcon status={status} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black uppercase tracking-wide opacity-70">{status} • {rule.category}</p>
                      <h3 className="mt-1 text-lg font-black">{rule.item}</h3>
                      <p className="mt-2 text-sm leading-6 opacity-80">{rule.shortAnswer}</p>
                      {rule.warning && <p className="mt-3 text-sm font-bold">Important: {rule.warning}</p>}
                      <a href={`/rules/${rule.slug}/`} className="mt-4 inline-flex text-sm font-black underline underline-offset-4">Read the full rule</a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {selectedRules.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3 print:hidden">
            <button type="button" onClick={copySummary} className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700">
              <Clipboard className="h-4 w-4" /> {copied ? 'Copied' : 'Copy summary'}
            </button>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-black text-white ring-1 ring-white/20 hover:bg-white/20">
              <Printer className="h-4 w-4" /> Print checklist
            </button>
          </div>
        )}

        <p className="mt-7 text-xs leading-5 text-slate-400">This tool provides general guidance from the site's rule database. Airline approval, airport security and destination authorities make the final decision.</p>
      </section>
    </div>
  );
}
