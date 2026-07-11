'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Luggage } from 'lucide-react';

const STORAGE_KEY = 'cibn-trip-checker-v1';

export default function ReturnToTripChecker() {
  const [hasSavedTrip, setHasSavedTrip] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { airline?: string; destination?: string; selectedSlugs?: string[] };
      setHasSavedTrip(Boolean(saved.airline || saved.destination || saved.selectedSlugs?.length));
    } catch {
      setHasSavedTrip(false);
    }
  }, []);

  if (!hasSavedTrip) return null;

  return (
    <div className="mb-6 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Luggage className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
          <div>
            <p className="font-black text-slate-950">Your trip is still saved</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">Return to the Trip Checker without losing your airline, destination, bag choice or selected items.</p>
          </div>
        </div>
        <a href="/trip-checker/" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-black text-white hover:bg-brand-700">
          <ArrowLeft className="h-4 w-4" /> Return to Trip Checker
        </a>
      </div>
    </div>
  );
}
