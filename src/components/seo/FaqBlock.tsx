import type { FaqItem } from '@/lib/siteSeo';

export default function FaqBlock({ title = 'Frequently asked questions', items }: { title?: string; items: FaqItem[] }) {
  if (!items.length) return null;

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-xl font-bold text-slate-950">{title}</h2>
      <div className="mt-5 space-y-5">
        {items.map((item) => (
          <div key={item.question}>
            <h3 className="font-bold text-slate-950">{item.question}</h3>
            <p className="mt-1 leading-7 text-slate-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
