'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, MessageSquareText, ThumbsDown, ThumbsUp } from 'lucide-react';

type Vote = 'yes' | 'no' | null;

export default function RuleHelpfulFeedback({ slug }: { slug: string }) {
  const storageKey = `cibinow:rule-helpful:${slug}`;
  const [vote, setVote] = useState<Vote>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'yes' || saved === 'no') setVote(saved);
  }, [storageKey]);

  function choose(nextVote: Exclude<Vote, null>) {
    window.localStorage.setItem(storageKey, nextVote);
    setVote(nextVote);

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'rule_helpfulness', {
        rule_slug: slug,
        helpful: nextVote,
      });
    }
  }

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200 md:p-8" data-rule-helpful-feedback>
      <div className="flex items-start gap-3">
        <MessageSquareText className="mt-1 h-6 w-6 shrink-0 text-brand-600" />
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-brand-600">Help us improve</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Was this page helpful?</h2>
          <p className="mt-2 leading-7 text-slate-600">Your response is saved privately on this device and helps us measure which guides need improvement.</p>
        </div>
      </div>

      {vote ? (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-green-50 p-4 text-green-900 ring-1 ring-green-100">
          <CheckCircle2 className="h-5 w-5" />
          <p className="font-bold">Thank you. Your feedback has been recorded.</p>
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => choose('yes')} className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700">
            <ThumbsUp className="h-5 w-5" /> Yes, helpful
          </button>
          <button type="button" onClick={() => choose('no')} className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 font-black text-slate-800 hover:bg-slate-200">
            <ThumbsDown className="h-5 w-5" /> Needs improvement
          </button>
        </div>
      )}
    </section>
  );
}
