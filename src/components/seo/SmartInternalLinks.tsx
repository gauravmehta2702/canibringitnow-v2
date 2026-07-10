import { ArrowRight, Compass, Link2 } from 'lucide-react';
import type { RelatedLink } from '@/lib/relatedContentEngine';

type Props = {
  title?: string;
  eyebrow?: string;
  links: RelatedLink[];
  compact?: boolean;
};

export default function SmartInternalLinks({
  title = 'Explore related travel guidance',
  eyebrow = 'Recommended next checks',
  links,
  compact = false,
}: Props) {
  if (!links.length) return null;

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-brand-50 p-3 text-brand-700 ring-1 ring-brand-100">
          {compact ? <Link2 className="h-5 w-5" /> : <Compass className="h-6 w-6" />}
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-brand-600">{eyebrow}</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">{title}</h2>
        </div>
      </div>

      <div className={`mt-6 grid gap-4 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
          >
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.eyebrow}</p>
            <h3 className="mt-2 text-lg font-black text-slate-950">{link.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{link.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-600">
              Open guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
