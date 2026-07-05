import { ArrowRight } from 'lucide-react';
import type { V2Node } from '@/lib/v2Core';

export default function V2NodeGrid({
  title,
  eyebrow,
  nodes,
}: {
  title: string;
  eyebrow: string;
  nodes: V2Node[];
}) {
  if (!nodes.length) return null;

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <p className="font-bold text-brand-600">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {nodes.map((node) => (
          <a
            key={`${node.type}-${node.id}`}
            href={node.href}
            className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:ring-brand-200"
          >
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{node.label}</p>
            <p className="mt-1 font-black text-slate-950">{node.title}</p>
            {node.description && <p className="mt-2 text-sm leading-6 text-slate-600">{node.description}</p>}
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">
              Open <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
