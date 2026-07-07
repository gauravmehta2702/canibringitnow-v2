import { ArrowRight, Layers3 } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getAuthorityClusters, getFeaturedSnippetBlock } from '@/lib/atlasAuthorityEngine';
import AtlasTravelTimeline from '@/components/atlas/AtlasTravelTimeline';

export default function AtlasTopicPageView({
  title,
  description,
  rule,
  type,
}: {
  title: string;
  description: string;
  rule: Rule;
  type: string;
}) {
  const snippet = getFeaturedSnippetBlock(rule);
  const clusters = getAuthorityClusters(rule);

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
        <div className="flex items-center gap-3">
          <Layers3 className="h-8 w-8 text-brand-600" />
          <p className="font-bold text-brand-600">{type}</p>
        </div>

        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{description}</p>

        <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
          <p className="font-bold text-sky-300">Fast answer</p>
          <h2 className="mt-3 text-3xl font-black">{snippet.question}</h2>
          <p className="mt-3 leading-7 text-slate-300">{snippet.directAnswer}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {snippet.bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl bg-white/10 p-4 text-sm font-bold leading-6 text-slate-200 ring-1 ring-white/10">
                {bullet}
              </div>
            ))}
          </div>
        </section>

        <a href={`/rules/${rule.slug}/`} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700">
          Open full rule <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      <AtlasTravelTimeline rule={rule} />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <p className="font-bold text-brand-600">Connected pages</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Continue from this topic</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {clusters.map((link) => (
            <a key={`${link.href}-${link.title}`} href={link.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.label}</p>
              <p className="mt-1 font-black text-slate-950">{link.title}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{link.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
