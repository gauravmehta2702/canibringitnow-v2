import { ArrowRight, BookOpen } from 'lucide-react';
import type { KnowledgeGuide } from '@/data/knowledgeGuides';

export default function GuideCard({ guide }: { guide: KnowledgeGuide }) {
  return (
    <a href={`/guides/${guide.slug}/`} className="group rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-300">
      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand-600"><BookOpen className="h-4 w-4" />{guide.category}</div>
      <h2 className="mt-3 text-xl font-black text-slate-950">{guide.shortTitle}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{guide.description}</p>
      <div className="mt-5 flex items-center justify-between text-sm"><span className="font-semibold text-slate-500">{guide.readingMinutes} min read</span><span className="inline-flex items-center gap-2 font-black text-brand-600">Read guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
    </a>
  );
}
