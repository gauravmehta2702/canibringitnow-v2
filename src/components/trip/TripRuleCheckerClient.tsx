'use client';

import { useEffect, useMemo, useState } from 'react';
import { getTripContextAlerts } from '@/lib/authorityIntelligence';
import { buildTravelIntelligenceReport, type TravellerType } from '@/lib/travelIntelligence';
import { getTravelGraphContextAlerts } from '@/lib/travelIntelligenceGraph';
import {
  buildSmartPackingChecklist,
  decodeShareableTrip,
  encodeShareableTrip,
  findPackingAssistantMatches,
} from '@/lib/travelLaunchTools';
import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  Link2,
  Luggage,
  Plus,
  Printer,
  RotateCcw,
  Search,
  Sparkles,
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
const CHECKLIST_STORAGE_KEY = 'cibn-trip-checker-checklist-v1';

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
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [simulatedAirline, setSimulatedAirline] = useState('');
  const [simulatedDestination, setSimulatedDestination] = useState('');
  const [simulatedBagMode, setSimulatedBagMode] = useState<BagMode>('cabin');
  const [simulatedRemovedSlugs, setSimulatedRemovedSlugs] = useState<string[]>([]);
  const [assistantQuery, setAssistantQuery] = useState('');
  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>([]);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [sharedTripLoaded, setSharedTripLoaded] = useState(false);

  useEffect(() => {
    try {
      const sharedValue = new URLSearchParams(window.location.search).get('trip');
      const sharedTrip = sharedValue ? decodeShareableTrip(sharedValue) : undefined;

      if (sharedTrip) {
        setAirline(sharedTrip.airline);
        setDeparture(sharedTrip.departure);
        setDestination(sharedTrip.destination);
        setBagMode(sharedTrip.bagMode);
        setTravellerType(sharedTrip.travellerType);
        setSelectedSlugs(
          Array.from(
            new Set(
              sharedTrip.selectedSlugs.filter((slug) =>
                rules.some((rule) => rule.slug === slug),
              ),
            ),
          ),
        );
        setSharedTripLoaded(true);
      } else {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as Partial<SavedTrip>;
          if (typeof saved.airline === 'string') setAirline(saved.airline);
          if (typeof saved.departure === 'string') setDeparture(saved.departure);
          if (typeof saved.destination === 'string') setDestination(saved.destination);
          if (saved.bagMode === 'cabin' || saved.bagMode === 'checked') setBagMode(saved.bagMode);
          if (['general', 'family', 'business', 'student', 'medical', 'photographer'].includes(saved.travellerType || '')) {
            setTravellerType(saved.travellerType as TravellerType);
          }
          if (Array.isArray(saved.selectedSlugs)) {
            const valid = saved.selectedSlugs.filter(
              (slug): slug is string =>
                typeof slug === 'string' &&
                rules.some((rule) => rule.slug === slug),
            );
            setSelectedSlugs(Array.from(new Set(valid)));
          }
        }
      }

      const checklistRaw = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (checklistRaw) {
        const completed = JSON.parse(checklistRaw);
        if (Array.isArray(completed)) {
          setCompletedChecklistIds(
            completed.filter((value): value is string => typeof value === 'string'),
          );
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(CHECKLIST_STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, [rules]);

  useEffect(() => {
    if (!hydrated) return;
    const saved: SavedTrip = { airline, departure, destination, bagMode, travellerType, selectedSlugs };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [airline, bagMode, departure, destination, hydrated, selectedSlugs, travellerType]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      CHECKLIST_STORAGE_KEY,
      JSON.stringify(completedChecklistIds),
    );
  }, [completedChecklistIds, hydrated]);

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

  const contextAlerts = useMemo(() => {
    const authorityAlerts = getTripContextAlerts(airline, destination, selectedRules.map((rule) => rule.category));
    const graphAlerts = getTravelGraphContextAlerts({
      airline,
      destination,
      ruleSlugs: selectedRules.map((rule) => rule.slug),
    });
    return Array.from(new Set([...authorityAlerts, ...graphAlerts])).slice(0, 10);
  }, [airline, destination, selectedRules]);

  const intelligenceReport = useMemo(() => buildTravelIntelligenceReport(
    { airline, departure, destination, bagMode, travellerType },
    selectedRules,
    contextAlerts,
  ), [airline, bagMode, contextAlerts, departure, destination, selectedRules, travellerType]);

  const readiness = intelligenceReport.readiness;

  const packingChecklist = useMemo(
    () =>
      buildSmartPackingChecklist({
        airline,
        departure,
        destination,
        bagMode,
        travellerType,
        rules: selectedRules,
        report: intelligenceReport,
      }),
    [
      airline,
      bagMode,
      departure,
      destination,
      intelligenceReport,
      selectedRules,
      travellerType,
    ],
  );

  const assistantMatches = useMemo(
    () => findPackingAssistantMatches(assistantQuery, rules),
    [assistantQuery, rules],
  );

  const completedChecklistCount = packingChecklist.filter((item) =>
    completedChecklistIds.includes(item.id),
  ).length;

  const simulatedRules = useMemo(
    () => selectedRules.filter((rule) => !simulatedRemovedSlugs.includes(rule.slug)),
    [selectedRules, simulatedRemovedSlugs],
  );

  const simulatedContextAlerts = useMemo(() => {
    if (!simulatorOpen) return [];
    const authorityAlerts = getTripContextAlerts(
      simulatedAirline,
      simulatedDestination,
      simulatedRules.map((rule) => rule.category),
    );
    const graphAlerts = getTravelGraphContextAlerts({
      airline: simulatedAirline,
      destination: simulatedDestination,
      ruleSlugs: simulatedRules.map((rule) => rule.slug),
    });
    return Array.from(new Set([...authorityAlerts, ...graphAlerts])).slice(0, 10);
  }, [simulatedAirline, simulatedDestination, simulatedRules, simulatorOpen]);

  const simulatedReport = useMemo(() => {
    if (!simulatorOpen) return undefined;
    return buildTravelIntelligenceReport(
      {
        airline: simulatedAirline,
        departure,
        destination: simulatedDestination,
        bagMode: simulatedBagMode,
        travellerType,
      },
      simulatedRules,
      simulatedContextAlerts,
    );
  }, [departure, simulatedAirline, simulatedBagMode, simulatedContextAlerts, simulatedDestination, simulatedRules, simulatorOpen, travellerType]);

  const scoreDifference = simulatedReport ? simulatedReport.readiness - readiness : 0;

  function trackEvent(name: string, parameters: Record<string, string | number | boolean>) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, parameters);
    }
  }

  function openSimulator() {
    setSimulatedAirline(airline);
    setSimulatedDestination(destination);
    setSimulatedBagMode(bagMode);
    setSimulatedRemovedSlugs([]);
    setSimulatorOpen(true);
    trackEvent('trip_simulator_opened', {
      current_score: readiness,
      selected_items: selectedRules.length,
    });
  }

  function toggleSimulatedRemoval(slug: string) {
    setSimulatedRemovedSlugs((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  }

  function applySimulation() {
    if (!simulatedReport) return;
    setAirline(simulatedAirline);
    setDestination(simulatedDestination);
    setBagMode(simulatedBagMode);
    setSelectedSlugs((current) => current.filter((slug) => !simulatedRemovedSlugs.includes(slug)));
    trackEvent('trip_simulation_applied', {
      previous_score: readiness,
      simulated_score: simulatedReport.readiness,
      score_change: simulatedReport.readiness - readiness,
      removed_items: simulatedRemovedSlugs.length,
      airline_changed: simulatedAirline !== airline,
      destination_changed: simulatedDestination !== destination,
      bag_changed: simulatedBagMode !== bagMode,
    });
    setSimulatorOpen(false);
  }

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
    setSimulatorOpen(false);
    setSimulatedRemovedSlugs([]);
    setAssistantQuery('');
    setCompletedChecklistIds([]);
    setSharedTripLoaded(false);
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(CHECKLIST_STORAGE_KEY);
    window.history.replaceState({}, '', window.location.pathname);
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
      `Risk level: ${intelligenceReport.riskLevel}`,
      `Decision: ${intelligenceReport.decisionSummary}`,
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

  function toggleChecklistItem(id: string) {
    setCompletedChecklistIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    trackEvent('packing_checklist_item_completed', {
      checklist_item: id,
      completed: !completedChecklistIds.includes(id),
    });
  }

  async function copyChecklist() {
    const lines = packingChecklist.map((item) => {
      const checked = completedChecklistIds.includes(item.id) ? '✓' : '☐';
      return `${checked} ${item.title} — ${item.detail}`;
    });
    await navigator.clipboard.writeText(
      ['My smart packing checklist', ...lines, '', 'Generated by Can I Bring It Now'].join('\n'),
    );
    trackEvent('packing_checklist_generated', {
      checklist_items: packingChecklist.length,
      completed_items: completedChecklistCount,
    });
  }

  async function createShareLink() {
    const payload = encodeShareableTrip({
      airline,
      departure,
      destination,
      bagMode,
      travellerType,
      selectedSlugs,
    });
    const url = `${window.location.origin}${window.location.pathname}?trip=${payload}`;
    await navigator.clipboard.writeText(url);
    setShareLinkCopied(true);
    window.setTimeout(() => setShareLinkCopied(false), 1800);
    trackEvent('trip_share_link_created', {
      selected_items: selectedSlugs.length,
      has_airline: Boolean(airline),
      has_destination: Boolean(destination),
    });
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8 print:hidden">
        {sharedTripLoaded && (
          <div className="mb-6 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-900 ring-1 ring-green-200">
            Shared trip loaded. Review every choice before relying on the result.
          </div>
        )}
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

        <div className="mt-8 border-t border-slate-200 pt-7">
          <div className="rounded-3xl bg-violet-50 p-5 ring-1 ring-violet-100">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-violet-700" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black uppercase tracking-wide text-violet-700">
                  Guided packing assistant
                </p>
                <h3 className="mt-2 text-xl font-black text-slate-950">
                  Describe what you want to check
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This searches the site's rule database. It does not invent or replace official guidance.
                </p>
                <input
                  value={assistantQuery}
                  onChange={(event) => {
                    setAssistantQuery(event.target.value);
                    if (event.target.value.trim().length === 3) {
                      trackEvent('packing_assistant_query', {
                        query_length: event.target.value.trim().length,
                      });
                    }
                  }}
                  placeholder="Example: camera batteries, medicine documents, baby milk"
                  className="mt-4 w-full rounded-2xl border border-violet-200 bg-white p-4 text-sm font-semibold outline-none focus:border-violet-500"
                />
                {assistantQuery.trim().length > 2 && (
                  <div className="mt-3 space-y-2">
                    {assistantMatches.length > 0 ? (
                      assistantMatches.map((rule) => (
                        <button
                          key={rule.slug}
                          type="button"
                          onClick={() => addRule(rule)}
                          className="flex w-full items-start justify-between gap-3 rounded-2xl bg-white p-4 text-left ring-1 ring-violet-100 hover:bg-violet-100"
                        >
                          <span>
                            <span className="block font-black text-slate-950">{rule.item}</span>
                            <span className="mt-1 block text-xs leading-5 text-slate-600">{rule.shortAnswer}</span>
                          </span>
                          <Plus className="h-5 w-5 shrink-0 text-violet-700" />
                        </button>
                      ))
                    ) : (
                      <p className="rounded-2xl bg-white p-4 text-sm text-slate-600 ring-1 ring-violet-100">
                        No close rule was found. Try a shorter item name such as “battery”, “medicine” or “milk”.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {selectedRules.length > 0 && (
          <div className="mt-8 border-t border-slate-200 pt-7">
            {!simulatorOpen ? (
              <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-sky-50 p-5 ring-1 ring-indigo-100">
                <p className="text-sm font-black uppercase tracking-wide text-indigo-700">What-if simulator</p>
                <h3 className="mt-2 text-xl font-black text-slate-950">Test a change before updating your trip</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Compare another airline, destination or bag type, or temporarily remove an item. Your saved trip stays unchanged until you apply the simulation.</p>
                <button type="button" onClick={openSimulator} className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white hover:bg-indigo-700">
                  <ShieldCheck className="h-4 w-4" /> Start a what-if check
                </button>
              </div>
            ) : (
              <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-sky-300">What-if simulator</p>
                    <h3 className="mt-2 text-xl font-black">Compare a different trip setup</h3>
                  </div>
                  <button type="button" onClick={() => setSimulatorOpen(false)} className="rounded-xl bg-white/10 px-3 py-2 text-sm font-black ring-1 ring-white/20 hover:bg-white/20">Close</button>
                </div>

                <div className="mt-5 grid gap-4">
                  <label className="grid gap-2 text-sm font-bold text-slate-200">
                    Try another airline
                    <select value={simulatedAirline} onChange={(event) => setSimulatedAirline(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-900 p-3 text-white outline-none focus:border-sky-300">
                      <option value="">Any airline</option>
                      {airlines.map((name) => <option key={name} value={name}>{name}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-slate-200">
                    Try another destination
                    <select value={simulatedDestination} onChange={(event) => setSimulatedDestination(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-900 p-3 text-white outline-none focus:border-sky-300">
                      <option value="">No destination selected</option>
                      {countries.map((name) => <option key={name} value={name}>{name}</option>)}
                    </select>
                  </label>
                  <fieldset>
                    <legend className="text-sm font-bold text-slate-200">Try another bag</legend>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {([['cabin', 'Cabin bag'], ['checked', 'Checked bag']] as const).map(([value, label]) => (
                        <button key={value} type="button" onClick={() => setSimulatedBagMode(value)} className={`rounded-xl px-3 py-3 text-sm font-black ring-1 ${simulatedBagMode === value ? 'bg-sky-300 text-slate-950 ring-sky-300' : 'bg-white/10 text-white ring-white/20'}`}>{label}</button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-black text-slate-200">Temporarily remove items</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedRules.map((rule) => {
                      const removed = simulatedRemovedSlugs.includes(rule.slug);
                      return (
                        <button key={rule.slug} type="button" onClick={() => toggleSimulatedRemoval(rule.slug)} className={`rounded-full px-3 py-2 text-xs font-black ring-1 ${removed ? 'bg-red-400/20 text-red-200 ring-red-300/30 line-through' : 'bg-white/10 text-white ring-white/20'}`}>
                          {removed ? 'Removed: ' : ''}{rule.item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {simulatedReport && (
                  <div className="mt-5 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-sky-300">Simulated readiness</p>
                        <p className="mt-1 text-3xl font-black">{simulatedReport.readiness}/100</p>
                        <p className="mt-1 text-sm font-bold text-slate-300">{simulatedReport.riskLevel}</p>
                      </div>
                      <div className={`rounded-full px-3 py-2 text-sm font-black ${scoreDifference > 0 ? 'bg-green-400/20 text-green-200' : scoreDifference < 0 ? 'bg-red-400/20 text-red-200' : 'bg-white/10 text-slate-200'}`}>
                        {scoreDifference > 0 ? '+' : ''}{scoreDifference} points
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{simulatedReport.decisionSummary}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {simulatedReport.scoreBreakdown.slice(0, 4).map((factor) => (
                        <div key={factor.id} className="rounded-xl bg-black/20 p-3">
                          <div className="flex justify-between gap-2 text-xs font-black"><span>{factor.label}</span><span className={factor.points >= 0 ? 'text-green-300' : 'text-red-300'}>{factor.points >= 0 ? '+' : ''}{factor.points}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={applySimulation} className="inline-flex items-center gap-2 rounded-2xl bg-sky-300 px-5 py-3 text-sm font-black text-slate-950 hover:bg-sky-200"><CheckCircle2 className="h-4 w-4" /> Apply changes</button>
                  <button type="button" onClick={openSimulator} className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-black text-white ring-1 ring-white/20 hover:bg-white/20">Reset simulation</button>
                </div>
              </div>
            )}
          </div>
        )}
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

        {selectedRules.length > 0 && (
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 print:bg-slate-50 print:ring-slate-200">
              <p className="text-sm font-black uppercase tracking-wide text-sky-300 print:text-brand-700">Decision intelligence</p>
              <p className="mt-2 text-xl font-black">{intelligenceReport.riskLevel}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300 print:text-slate-700">{intelligenceReport.decisionSummary}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 print:bg-slate-50 print:ring-slate-200">
              <p className="text-sm font-black uppercase tracking-wide text-sky-300 print:text-brand-700">Why this score?</p>
              <div className="mt-3 space-y-2">
                {intelligenceReport.scoreBreakdown.slice(0, 6).map((factor) => (
                  <div key={factor.id} className="flex items-start justify-between gap-4 text-sm">
                    <div>
                      <p className="font-bold">{factor.label}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400 print:text-slate-600">{factor.explanation}</p>
                    </div>
                    <span className={`shrink-0 font-black ${factor.points >= 0 ? 'text-green-300 print:text-green-800' : 'text-red-300 print:text-red-800'}`}>
                      {factor.points >= 0 ? '+' : ''}{factor.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {intelligenceReport.priorityActions.length > 0 && selectedRules.length > 0 && (
          <div className="mt-7 rounded-3xl bg-sky-400/10 p-5 ring-1 ring-sky-300/20 print:bg-sky-50 print:ring-sky-200">
            <p className="text-sm font-black uppercase tracking-wide text-sky-300 print:text-brand-700">What to do next</p>
            <div className="mt-4 space-y-3">
              {intelligenceReport.priorityActions.slice(0, 5).map((action, index) => (
                <div key={action.id} className="flex gap-3 rounded-2xl bg-black/20 p-4 ring-1 ring-white/10 print:bg-white print:ring-slate-200">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-300 text-sm font-black text-slate-950">{index + 1}</span>
                  <div>
                    <p className="font-black">{action.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300 print:text-slate-700">{action.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedRules.length > 0 && (
          <div className="mt-7 rounded-3xl bg-emerald-400/10 p-5 ring-1 ring-emerald-300/20 print:bg-emerald-50 print:ring-emerald-200">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-emerald-300 print:text-emerald-800">
                  Smart packing checklist
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300 print:text-slate-700">
                  {completedChecklistCount} of {packingChecklist.length} tasks completed. Progress is saved on this device.
                </p>
              </div>
              <button
                type="button"
                onClick={copyChecklist}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-black text-white ring-1 ring-white/20 hover:bg-white/20 print:hidden"
              >
                <ClipboardCheck className="h-4 w-4" /> Copy checklist
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {packingChecklist.map((item) => {
                const complete = completedChecklistIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`flex w-full items-start gap-3 rounded-2xl p-4 text-left ring-1 transition ${
                      complete
                        ? 'bg-emerald-300/15 ring-emerald-300/30'
                        : 'bg-black/20 ring-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ring-1 ${
                      complete ? 'bg-emerald-300 text-slate-950 ring-emerald-300' : 'bg-white/10 text-white ring-white/30'
                    }`}>
                      {complete ? <CheckCircle2 className="h-4 w-4" /> : null}
                    </span>
                    <span>
                      <span className={`block font-black ${complete ? 'line-through opacity-75' : ''}`}>{item.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-300 print:text-slate-700">{item.detail}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
            <button type="button" onClick={createShareLink} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-black text-white ring-1 ring-white/20 hover:bg-white/20"><Link2 className="h-4 w-4" /> {shareLinkCopied ? 'Link copied' : 'Copy trip link'}</button>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-black text-white ring-1 ring-white/20 hover:bg-white/20"><Printer className="h-4 w-4" /> Print checklist</button>
          </div>
        )}

        <p className="mt-7 text-xs leading-5 text-slate-400 print:text-slate-600">This tool provides general guidance from the site's rule database. Airline approval, airport security and destination authorities make the final decision.</p>
      </section>
    </div>
  );
}
