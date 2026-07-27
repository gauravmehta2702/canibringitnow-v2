import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, Search, ShieldCheck } from 'lucide-react';
import { getTravelService, travelServices } from '@/data/travelServices';

export const dynamicParams = false;
export function generateStaticParams() { return travelServices.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getTravelService(params.slug); if (!service) return {};
  return { title: `${service.name} Guide: What to Compare Before Booking`, description: service.description, alternates: { canonical: `/travel-services/${service.slug}/` } };
}

export default function TravelServicePage({ params }: { params: { slug: string } }) {
  const service = getTravelService(params.slug); if (!service) notFound();
  const relatedServices = travelServices.filter((item) => item.slug !== service.slug).slice(0, 3);
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: service.questions.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) };
  return <main className="bg-slate-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50"><div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p className="font-black uppercase tracking-widest text-brand-600">{service.eyebrow}</p><h1 className="mt-4 text-4xl font-black text-slate-950 md:text-6xl">{service.name}: what to check before you book</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{service.description}</p>
    </div></section>
    <div className="mx-auto grid max-w-5xl gap-8 px-5 py-14 md:px-8 lg:grid-cols-[1fr_0.72fr]">
      <div className="space-y-8">
        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200"><h2 className="text-2xl font-black text-slate-950">Five checks that prevent expensive mistakes</h2><div className="mt-6 space-y-4">{service.checklist.map((item) => <div key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600"/><p className="font-semibold text-slate-700">{item}</p></div>)}</div></section>
        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200"><h2 className="text-2xl font-black text-slate-950">Common questions</h2><div className="mt-6 space-y-6">{service.questions.map((item) => <div key={item.question}><h3 className="font-black text-slate-950">{item.question}</h3><p className="mt-2 leading-7 text-slate-600">{item.answer}</p></div>)}</div></section>
      </div>
      <aside className="space-y-6">
        <section className="rounded-3xl bg-slate-950 p-7 text-white"><Search className="h-7 w-7 text-sky-300"/><h2 className="mt-4 text-2xl font-black">Searches this guide helps answer</h2><div className="mt-5 flex flex-wrap gap-2">{service.searchIntents.map((item) => <span key={item} className="rounded-full bg-white/10 px-3 py-2 text-sm">{item}</span>)}</div></section>
        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200"><ShieldCheck className="h-7 w-7 text-brand-600"/><h2 className="mt-4 text-xl font-black text-slate-950">Continue planning</h2><div className="mt-4 space-y-3">{service.related.map((item) => <a key={item.href} href={item.href} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 font-bold text-slate-800 hover:bg-brand-50">{item.label}<ArrowRight className="h-4 w-4"/></a>)}</div></section>
      </aside>
    </div>
    <section className="mx-auto max-w-5xl px-5 pb-16 md:px-8"><h2 className="text-2xl font-black text-slate-950">More travel services</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{relatedServices.map((item) => <a key={item.slug} href={`/travel-services/${item.slug}/`} className="rounded-3xl bg-white p-5 font-black text-slate-950 shadow-sm ring-1 ring-slate-200 hover:ring-brand-300">{item.name}<ArrowRight className="mt-4 h-4 w-4 text-brand-600"/></a>)}</div></section>
  </main>;
}
