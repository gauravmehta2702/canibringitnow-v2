'use client';

import { useEffect, useMemo, useState } from 'react';
import { getTripContextAlerts } from '@/lib/authorityIntelligence';
import { buildTravelIntelligenceReport, type TravellerType } from '@/lib/travelIntelligence';
import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  Luggage,
  Plus,
  Printer,
  RotateCcw,
  Search,
  Share2,
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

type SavedTrip = {
  airline: string;
  departure: string;
  destination: string;
  bagMode: BagMode;
  travellerType: TravellerType;
  selectedSlugs: string[];
};

const STORAGE_KEY = 'cibn-trip-checker-v1';

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
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [bagMode, setBagMode] = useState<BagMode>('cabin');
  const [travellerType, setTravellerType] = useState<TravellerType>('general');
  const [query, setQuery] = useState('');
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<SavedTrip>;
        if (typeof saved.airline === 'string') setAirline(saved.airline);
        if (typeof saved.departure === 'string') setDeparture(saved.departure);
        if (typeof saved.destination === 'string') setDestination(saved.destination);
        if (saved.bagMode === 'cabin' || saved.bagMode === 'checked') setBagMode(saved.bagMode);
        if (['general', 'family', 'business', 'student', 'medical', 'photographer'].includes(saved.travellerType || '')) setTravellerType(saved.travellerType as TravellerType);
        if (Array.isArray(saved.selectedSlugs)) {
          const valid = saved.selectedSlugs.filter((slug): slug is string => typeof slug === 'string' && rules.some((rule) => rule.slug === slug));
          setSelectedSlugs(Array.from(new Set(valid)));
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, [rules]);

  useEffect(() => {
    if (!hydrated) return;
    const saved: SavedTrip = { airline, departure, destination, bagMode, travellerType, selectedSlugs };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [airline, bagMode, departure, destination, hydrated, selectedSlugs, travellerType]);

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

  const counts = useMemo(() => selectedRules.reduce(
    (acc, rule) => {
      const status = bagMode === 'cabin' ? rule.cabin : rule.checked;
      if (status === 'Allowed') acc.allowed += 1;
      else if (status === 'Not allowed') acc.notAllowed += 1;
      else acc.restricted += 1;
      return acc;
    },
    { allowed: 0, restricted: 0, notAllowed: 0 },
  ), [bagMode, selectedRules]);

  const contextAlerts = useMemo(
    () => getTripContextAlerts(airline, destination, selectedRules.map((rule) => rule.category)),
    [airline, destination, selectedRules],
  );

  const intelligenceReport = useMemo(() => buildTravelIntelligenceReport(
    { airline, departure, destination, bagMode, travellerType },
    selectedRules,
    contextAlerts,
  ), [airline, bagMode, contextAlerts, departure, destination, selectedRules, travellerType]);

  const readiness = intelligenceReport.readiness;

  function addRule(rule: TripRuleOption) {
    setSelectedSlugs((current) => current.includes(rule.slug) ? current : [...current, rule.slug]);
    setQuery('');
  }

  function removeRule(slug: string) {
    setSelectedSlugs((current) => current.filter((item) => item !== slug));
  }

  function startNewTrip() {
    const confirmed = window.confirm('Start a new trip? This will remove your saved airline, destination, bag choice and items.');
    if (!confirmed) return;
    setAirline('');
    setDeparture('');
    setDestination('');
    setBagMode('cabin');
    setTravellerType('general');
    setSelectedSlugs([]);
    setQuery('');
    window.localStorage.removeItem(STORAGE_KEY);
  }

  function buildSummary() {
    const header = `My trip packing check${airline ? ` • ${airline}` : ''}${destination ? ` • ${destination}` : ''}`;
    const lines = selectedRules.map((rule) => {
      const status = bagMode === 'cabin' ? rule.cabin : rule.checked;
      return `${status}: ${rule.item} — ${rule.shortAnswer}`;
    });
    return [
      header,
      `Departure: ${departure || 'Not selected'}`,
      `Bag: ${bagMode === 'cabin' ? 'Cabin baggage' : 'Checked baggage'}`,
      `Traveller: ${travellerType}`,
      `Trip readiness: ${readiness}/100 (${intelligenceReport.label})`,
      '',
      ...lines,
      '',
      'Generated by Can I Bring It Now',
      'Always verify important restrictions with official airline, airport and destination sources.',
    ].join('\n');
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function shareSummary() {
    const text = buildSummary();
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My trip packing check', text });
        return;
      } catch {
        // User cancelled or sharing was unavailable; fall back to clipboard.
      }
    }
    await copySummary();
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8 print:hidden">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-brand-600">Step 1</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Describe your journey</h2>
          </div>
          {(airline || destination || selectedRules.length > 0) && (
            <button type="button" onClick={startNewTrip} className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-700 hover:bg-red-50 hover:text-red-700">
              <RotateCcw className="h-4 w-4" /> Start new trip
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Airline (optional)
            <select value={airline} onChange={(event) => setAirline(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base outline-none focus:border-brand-500">
              <option value="">Select airline</option>
              {airlines.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Departure country (optional)
            <select value={departure} onChange={(event) => setDeparture(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base outline-none focus:border-brand-500">
              <option value="">Select departure</option>
              {countries.map((name) => <option key={name} value={name}>{name}</option>)}
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
            <legend className="text-sm font-bold text-slate-700">Traveller profile</legend>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {([
                ['general', 'General'], ['family', 'Family'], ['business', 'Business'],
                ['student', 'Student'], ['medical', 'Medical'], ['photographer', 'Photographer'],
              ] as const).map(([value, label]) => (
                <button key={value} type="button" onClick={() => setTravellerType(value)} className={`rounded-xl px-3 py-3 text-sm font-black ring-1 transition ${travellerType === value ? 'bg-brand-600 text-white ring-brand-600' : 'bg-slate-50 text-slate-700 ring-slate-200 hover:bg-brand-50'}`}>
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

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
                  <span><span className="block font-bold text-slate-950">{rule.item}</span><span className="block text-xs text-slate-500">{rule.category}</span></span>
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

      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8 print:bg-white print:text-black print:shadow-none print:ring-0">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-sky-300 print:text-slate-700">Your trip result</p>
            <h2 className="mt-2 text-3xl font-black">Packing decision summary</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300 print:text-slate-700">{airline || 'Any airline'}{departure ? ` • From: ${departure}` : ''}{destination ? ` • To: ${destination}` : ''} • {bagMode === 'cabin' ? 'Cabin baggage' : 'Checked baggage'}</p>
          </div>
          <Luggage className="h-10 w-10 text-sky-300 print:text-slate-700" />
        </div>

        <div className="mt-7 rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 print:bg-slate-50 print:ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-sm font-black uppercase tracking-wide text-sky-300 print:text-brand-700">Trip readiness</p><p className="mt-1 text-3xl font-black">{readiness}/100</p><p className="mt-1 text-sm font-black text-sky-200 print:text-slate-700">{intelligenceReport.label}</p></div>
            <p className="max-w-xs text-right text-sm leading-6 text-slate-300 print:text-slate-700">{counts.notAllowed > 0 ? 'Resolve prohibited items before you travel.' : counts.restricted > 0 ? 'Review restrictions and supporting documents.' : selectedRules.length ? 'Your selected items look broadly ready.' : 'Add items to calculate your readiness.'}</p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10 print:bg-slate-200"><div className="h-full rounded-full bg-sky-300 print:bg-slate-700" style={{ width: `${readiness}%` }} /></div>
        </div>

        {contextAlerts.length > 0 && (
          <div className="mt-7 rounded-3xl bg-amber-400/10 p-5 ring-1 ring-amber-300/20 print:bg-amber-50 print:ring-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300 print:text-amber-700" />
              <div>
                <p className="font-black text-amber-100 print:text-amber-950">Airline and destination checks</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-amber-100/90 print:text-amber-900">
                  {contextAlerts.map((alert) => <li key={alert}>{alert}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}

        {intelligenceReport.findings.length > 0 && (
          <div className="mt-7 rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 print:bg-slate-50 print:ring-slate-200">
            <p className="text-sm font-black uppercase tracking-wide text-sky-300 print:text-brand-700">Travel intelligence report</p>
            <p className="mt-2 text-sm leading-6 text-slate-300 print:text-slate-700">{intelligenceReport.summary}</p>
            <div className="mt-4 space-y-3">
              {intelligenceReport.findings.slice(0, 6).map((finding) => (
                <div key={finding.id} className="rounded-2xl bg-black/20 p-4 ring-1 ring-white/10 print:bg-white print:ring-slate-200">
                  <p className="font-black">{finding.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300 print:text-slate-700">{finding.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedRules.length > 0 && (
          <div className="mt-7 rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 print:bg-slate-50 print:ring-slate-200">
            <p className="text-sm font-black uppercase tracking-wide text-sky-300 print:text-brand-700">Journey timeline</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {intelligenceReport.timeline.map((stage) => (
                <div key={stage.stage} className="rounded-2xl bg-black/20 p-4 ring-1 ring-white/10 print:bg-white print:ring-slate-200">
                  <p className="font-black">{stage.stage}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-300 print:text-slate-700">
                    {stage.actions.map((action) => <li key={action}>{action}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-7 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-green-400/10 p-4 text-center ring-1 ring-green-300/20"><p className="text-3xl font-black text-green-300 print:text-green-800">{counts.allowed}</p><p className="mt-1 text-xs font-bold">Allowed</p></div>
          <div className="rounded-2xl bg-amber-400/10 p-4 text-center ring-1 ring-amber-300/20"><p className="text-3xl font-black text-amber-300 print:text-amber-800">{counts.restricted}</p><p className="mt-1 text-xs font-bold">Restricted</p></div>
          <div className="rounded-2xl bg-red-400/10 p-4 text-center ring-1 ring-red-300/20"><p className="text-3xl font-black text-red-300 print:text-red-800">{counts.notAllowed}</p><p className="mt-1 text-xs font-bold">Not allowed</p></div>
        </div>

        {selectedRules.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white/10 p-7 text-center ring-1 ring-white/10"><ShieldCheck className="mx-auto h-10 w-10 text-sky-300" /><p className="mt-4 text-xl font-black">Add your first item</p><p className="mt-2 text-sm leading-6 text-slate-300">Search on the left to build a personalised packing check.</p></div>
        ) : (
          <div className="mt-7 space-y-4">
            {selectedRules.map((rule) => {
              const status = bagMode === 'cabin' ? rule.cabin : rule.checked;
              return (
                <article key={rule.slug} className={`rounded-3xl p-5 text-slate-950 ring-1 ${statusClasses(status)}`}>
                  <div className="flex items-start gap-3"><StatusIcon status={status} /><div className="min-w-0 flex-1"><p className="text-xs font-black uppercase tracking-wide opacity-70">{status} • {rule.category}</p><h3 className="mt-1 text-lg font-black">{rule.item}</h3><p className="mt-2 text-sm leading-6 opacity-80">{rule.shortAnswer}</p>{rule.warning && <p className="mt-3 text-sm font-bold">Important: {rule.warning}</p>}<a href={`/rules/${rule.slug}/?from=trip-checker`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-black underline underline-offset-4 print:hidden">Read the full rule in a new tab</a></div></div>
                </article>
              );
            })}
          </div>
        )}

        {selectedRules.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3 print:hidden">
            <button type="button" onClick={copySummary} className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700"><Clipboard className="h-4 w-4" /> {copied ? 'Copied' : 'Copy summary'}</button>
            <button type="button" onClick={shareSummary} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-black text-white ring-1 ring-white/20 hover:bg-white/20"><Share2 className="h-4 w-4" /> Share trip</button>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-black text-white ring-1 ring-white/20 hover:bg-white/20"><Printer className="h-4 w-4" /> Print checklist</button>
          </div>
        )}

        <p className="mt-7 text-xs leading-5 text-slate-400 print:text-slate-600">This tool provides general guidance from the site's rule database. Airline approval, airport security and destination authorities make the final decision.</p>
      </section>
    </div>
  );
}
