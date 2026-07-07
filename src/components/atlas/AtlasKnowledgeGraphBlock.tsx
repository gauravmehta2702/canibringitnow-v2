import { ArrowRight, Network } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getAtlasEntityLinks } from '@/lib/atlasSeoEngine';

export default function AtlasKnowledgeGraphBlock({ rule }: { rule: Rule }) {
  const links = getAtlasEntityLinks(rule, 18);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Network className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">ATLAS knowledge graph</p>
          <h2 className="text-2xl font-black text-slate-950">Related travel decisions</h2>
        </div>
      </div>

      <p className="mt-3 max-w-3xl leading-7 text-slate-600">
        This page is connected to related items, airlines, destinations and planning tools to help travellers continue the right checks.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {links.map((link) => (
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
    </section>
  );
}
