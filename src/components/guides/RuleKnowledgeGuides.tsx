import { BookOpenCheck } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { knowledgeGuides } from '@/data/knowledgeGuides';
import GuideCard from './GuideCard';

function normalise(value: string) { return value.toLowerCase(); }

export default function RuleKnowledgeGuides({ rule }: { rule: Rule }) {
  const haystack = normalise([rule.item, rule.category, ...rule.tags].join(' '));
  const guides = knowledgeGuides
    .map((guide) => ({ guide, score: guide.relatedRuleTerms.reduce((score, term) => score + (haystack.includes(normalise(term)) ? 5 : 0), 0) + (normalise(guide.category) === normalise(rule.category) ? 20 : 0) }))
    .sort((a, b) => b.score - a.score)
    .filter((entry, index) => entry.score > 0 || index < 2)
    .slice(0, 3)
    .map((entry) => entry.guide);

  return (
    <section className="mt-8 rounded-3xl bg-gradient-to-br from-brand-50 to-sky-50 p-6 ring-1 ring-brand-100 md:p-8">
      <div className="flex items-start gap-3"><div className="rounded-2xl bg-white p-3 text-brand-700 ring-1 ring-brand-100"><BookOpenCheck className="h-6 w-6" /></div><div><p className="text-sm font-black uppercase tracking-wide text-brand-600">Knowledge centre</p><h2 className="mt-1 text-2xl font-black text-slate-950">Understand the rule before you pack</h2><p className="mt-2 text-sm leading-6 text-slate-600">Use these in-depth guides for the safety, security and customs context behind this answer.</p></div></div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">{guides.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}</div>
    </section>
  );
}
