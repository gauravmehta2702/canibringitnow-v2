import { Network } from 'lucide-react';
import { getSeoClusters } from '@/lib/g4SeoNetwork';

export default function SeoNetworkBlock() {
  const links = getSeoClusters();

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Network className="h-6 w-6 text-brand-600" />
        <h2 className="text-2xl font-black text-slate-950">Explore more travel rules</h2>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50"
          >
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.label}</p>
            <p className="mt-1 font-black text-slate-950">{link.title}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
