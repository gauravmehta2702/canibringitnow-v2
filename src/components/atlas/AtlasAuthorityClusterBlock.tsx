import { ArrowRight, Network } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getAuthorityClusters, getSeasonalAuthorityLinks } from '@/lib/atlasAuthorityEngine';

export default function AtlasAuthorityClusterBlock({ rule }: { rule: Rule }) {
  const clusters = getAuthorityClusters(rule);
  const seasonal = getSeasonalAuthorityLinks(rule);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Network className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">Authority cluster</p>
          <h2 className="text-2xl font-black text-slate-950">Explore connected travel checks</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {clusters.map((link) => (
          <a key={`${link.href}-${link.title}`} href={link.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.label}</p>
            <p className="mt-1 font-black text-slate-950">{link.title}</p>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{link.description}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">
              Open <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-8">
        <p className="font-bold text-brand-600">Seasonal and trip contexts</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {seasonal.map((link) => (
            <a key={link.title} href={link.href} className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
