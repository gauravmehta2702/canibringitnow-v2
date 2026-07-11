'use client';

import { useMemo } from 'react';
import { ArrowRight, Plane, Search, Sparkles } from 'lucide-react';
import { getSearchCorrection, getSearchPromptSuggestions, getSearchQuickLinks } from '@/lib/searchIntelligence';

type Props = {
  query: string;
  onChoose?: (value: string) => void;
  compact?: boolean;
};

const typeLabel = {
  rule: 'Rule',
  airline: 'Airline',
  country: 'Country',
  category: 'Category',
};

export default function SearchIntelligencePanel({ query, onChoose, compact = false }: Props) {
  const correction = useMemo(() => getSearchCorrection(query), [query]);
  const quickLinks = useMemo(() => getSearchQuickLinks(correction?.corrected || query, compact ? 5 : 8), [query, correction, compact]);
  const promptSuggestions = useMemo(() => getSearchPromptSuggestions(correction?.corrected || query), [query, correction]);

  if (!query.trim()) return null;

  return (
    <div className="mt-4 overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-soft">
      {correction && (
        <div className="border-b border-slate-200 bg-amber-50 px-5 py-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-amber-950">
            <Sparkles className="h-4 w-4" />
            <span>Did you mean</span>
            <button
              type="button"
              onClick={() => onChoose ? onChoose(correction.corrected) : (window.location.href = `/search/?q=${encodeURIComponent(correction.corrected)}`)}
              className="font-black underline decoration-amber-400 underline-offset-4"
            >
              {correction.corrected}
            </button>
            <span>?</span>
          </div>
        </div>
      )}

      {quickLinks.length > 0 && (
        <div className="p-4 md:p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
            <Search className="h-4 w-4" /> Quick matches
          </div>
          <div className="grid gap-2">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="group flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200 hover:bg-brand-50 hover:ring-brand-200">
                <div>
                  <span className="text-xs font-black uppercase tracking-wide text-brand-600">{typeLabel[link.type]}</span>
                  <p className="mt-0.5 font-bold text-slate-950">{link.label}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand-600 transition group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {!compact && promptSuggestions.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
            <Plane className="h-4 w-4" /> Try a complete travel question
          </div>
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onChoose ? onChoose(suggestion) : (window.location.href = `/search/?q=${encodeURIComponent(suggestion)}`)}
                className="rounded-full bg-white px-3 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
