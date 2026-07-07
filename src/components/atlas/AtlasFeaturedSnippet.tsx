import { SearchCheck } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getFeaturedSnippetBlock } from '@/lib/atlasAuthorityEngine';

export default function AtlasFeaturedSnippet({ rule }: { rule: Rule }) {
  const snippet = getFeaturedSnippetBlock(rule);

  return (
    <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <SearchCheck className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">Featured answer</p>
          <h2 className="text-2xl font-black text-slate-950">{snippet.question}</h2>
        </div>
      </div>

      <p className="mt-4 max-w-4xl text-xl font-bold leading-8 text-slate-800">{snippet.directAnswer}</p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {snippet.bullets.map((bullet) => (
          <div key={bullet} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700 ring-1 ring-slate-200">
            {bullet}
          </div>
        ))}
      </div>
    </section>
  );
}
