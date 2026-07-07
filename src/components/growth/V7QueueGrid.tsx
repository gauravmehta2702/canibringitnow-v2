import { ArrowRight } from 'lucide-react';

type Item = {
  title: string;
  href: string;
  type: string;
  priority: string;
  reason: string;
  prompt: string;
};

export default function V7QueueGrid({ title, eyebrow, items }: { title: string; eyebrow: string; items: Item[] }) {
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <p className="font-bold text-brand-600">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <a key={`${item.type}-${item.title}`} href={item.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{item.priority} · {item.type}</p>
            <p className="mt-1 font-black text-slate-950">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
            <p className="mt-3 rounded-xl bg-white p-3 text-xs leading-5 text-slate-500 ring-1 ring-slate-200">{item.prompt}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">
              Open <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
