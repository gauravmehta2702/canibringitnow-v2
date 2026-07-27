import type { Metadata } from 'next';
import { ArrowRight, BadgePoundSterling, BedDouble, Car, CircleParking, PlaneTakeoff, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import { travelServices } from '@/data/travelServices';

export const metadata: Metadata = {
  title: 'Travel Services: Insurance, Hotels, Parking, Cars and eSIMs',
  description: 'Plan the practical parts of your trip with useful guides to travel insurance, airport hotels, parking, transfers, car hire, eSIMs, lounges and flight disruption.',
  alternates: { canonical: '/travel-services/' },
};

const icons = [ShieldCheck, BedDouble, Car, CircleParking, PlaneTakeoff, Smartphone, Sparkles, BadgePoundSterling];

export default function TravelServicesPage() {
  return <main className="bg-slate-50">
    <section className="bg-slate-950 text-white"><div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <p className="font-black uppercase tracking-widest text-sky-300">Plan more than baggage</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-black md:text-6xl">Useful travel services for the whole journey</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Start with practical guidance, compare the details that matter and move naturally from packing to protection, accommodation, transport and connectivity.</p>
    </div></section>
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{travelServices.map((service, index) => { const Icon = icons[index]; return <a key={service.slug} href={`/travel-services/${service.slug}/`} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
        <Icon className="h-8 w-8 text-brand-600"/><p className="mt-5 text-xs font-black uppercase tracking-widest text-brand-600">{service.eyebrow}</p><h2 className="mt-2 text-2xl font-black text-slate-950">{service.name}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p><span className="mt-5 inline-flex items-center gap-2 font-bold text-brand-600">Open guide <ArrowRight className="h-4 w-4"/></span>
      </a>; })}</div>
    </section>
  </main>;
}
