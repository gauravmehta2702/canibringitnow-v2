import { ArrowRight, Hotel } from 'lucide-react';
import { getDestinationGuideCountries } from '@/lib/v6DestinationGuides';

export default function DestinationGuidesHub() {
  const countries = getDestinationGuideCountries(12);

  return (
    <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
      <div className="flex items-center gap-3">
        <Hotel className="h-8 w-8 text-brand-600" />
        <p className="font-bold text-brand-600">V6 Destination Guides</p>
      </div>

      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
        Top 5 hotels, restaurants and attractions
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        This creates the editorial guide layer for future hotel, restaurant and attraction content without turning the site into a booking engine.
      </p>

      <div className="mt-8 grid gap-5">
        {countries.map((country) => (
          <section key={country.slug} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm font-black uppercase tracking-wide text-brand-600">{country.country}</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{country.city} guide ideas</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {country.guides.map((guide) => (
                <a key={guide.title} href={guide.href} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 hover:bg-brand-50">
                  <p className="text-xs font-black uppercase tracking-wide text-brand-600">{guide.label}</p>
                  <p className="mt-1 font-black text-slate-950">{guide.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">Open <ArrowRight className="h-4 w-4" /></span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
