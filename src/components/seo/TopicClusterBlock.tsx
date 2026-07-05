import { ArrowRight, Network } from 'lucide-react';
import { getTopicClusterLinks } from '@/lib/topicClusters';

export default function TopicClusterBlock({
  slug,
  item,
}: {
  slug?: string;
  item?: string;
}) {
  const links = getTopicClusterLinks(slug, item);
  if (!links.length) return null;

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Network className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">G4.5B Topic cluster</p>
          <h2 className="text-2xl font-black text-slate-950">More connected travel checks</h2>
        </div>
      </div>

      <p className="mt-3 leading-7 text-slate-600">
        Similar items, airline-specific checks, destination rules and high-intent searches help visitors continue browsing.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:ring-brand-200"
          >
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.label}</p>
            <p className="mt-1 font-black text-slate-950">{link.title}</p>
            {link.description && (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{link.description}</p>
            )}
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">
              Open <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
