'use client';

import { useEffect, useState } from 'react';
import { Clock, X } from 'lucide-react';

export type ViewedRule = {
  slug: string;
  item: string;
  category: string;
  viewedAt: string;
};

const STORAGE_KEY = 'cibin_recently_viewed_rules_v1';

export function rememberViewedRule(rule: Omit<ViewedRule, 'viewedAt'>) {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') as ViewedRule[];
    const next = [
      { ...rule, viewedAt: new Date().toISOString() },
      ...existing.filter((item) => item.slug !== rule.slug),
    ].slice(0, 8);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
}

export function getRecentlyViewedRules(limit = 6): ViewedRule[] {
  if (typeof window === 'undefined') return [];
  try {
    return (JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') as ViewedRule[]).slice(0, limit);
  } catch {
    return [];
  }
}

export function clearRecentlyViewedRules() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function RuleViewTracker({ slug, item, category }: Omit<ViewedRule, 'viewedAt'>) {
  useEffect(() => rememberViewedRule({ slug, item, category }), [slug, item, category]);
  return null;
}

export default function RecentlyViewedRules({ limit = 5 }: { limit?: number }) {
  const [items, setItems] = useState<ViewedRule[]>([]);

  useEffect(() => setItems(getRecentlyViewedRules(limit)), [limit]);
  if (!items.length) return null;

  const clear = () => {
    clearRecentlyViewedRules();
    setItems([]);
  };

  return (
    <section className="mt-6 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-black text-slate-950"><Clock className="h-4 w-4 text-brand-600" /> Recently viewed</div>
        <button type="button" onClick={clear} className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900"><X className="h-3.5 w-3.5" /> Clear</button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <a key={item.slug} href={`/rules/${item.slug}/`} className="rounded-full bg-white px-3 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">
            {item.item}
          </a>
        ))}
      </div>
    </section>
  );
}
