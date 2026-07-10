import type { Metadata } from 'next';
import { BookOpenCheck, ShieldCheck } from 'lucide-react';
import GuideCard from '@/components/guides/GuideCard';
import { knowledgeGuides } from '@/data/knowledgeGuides';

export const metadata: Metadata = {
  title: 'Travel Knowledge Centre: Baggage, Security and Customs Guides',
  description: 'Detailed, practical guides to airport security, lithium batteries, medication, baby travel, liquids, food customs and electronic devices.',
  alternates: { canonical: '/guides/' },
};

export default function GuidesPage() {
  return <main className="min-h-screen bg-slate-50">
    <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50"><div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20"><div className="max-w-3xl"><p className="inline-flex items-center gap-2 font-black uppercase tracking-wide text-brand-600"><BookOpenCheck className="h-5 w-5" /> Travel Knowledge Centre</p><h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Understand the rules, not just the answer</h1><p className="mt-6 text-lg leading-8 text-slate-600">Evergreen travel guides explaining the safety, security, airline and customs principles behind common packing questions.</p></div><div className="mt-8 flex items-start gap-3 rounded-3xl bg-white p-5 ring-1 ring-slate-200"><ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-brand-600" /><p className="leading-7 text-slate-600">These guides provide general information. Important restrictions should always be confirmed with the operating airline, departure airport and destination authority.</p></div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{knowledgeGuides.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}</div></section>
  </main>;
}
