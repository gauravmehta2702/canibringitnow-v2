import { ArrowRight, Globe2 } from 'lucide-react';
import { getTopCountryHubs } from '@/lib/countryEcosystem';

export default function CountryHubGrid() {
  const hubs = getTopCountryHubs(12);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Globe2 className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">G7 Country ecosystem</p>
          <h2 className="text-2xl font-black text-slate-950">Popular destination rule hubs</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {hubs.map((hub) => (
          <a key={hub.slug} href={`/countries/${hub.slug}/`} className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:ring-brand-200">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">Destination guide</p>
            <p className="mt-1 font-black text-slate-950">{hub.name}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{hub.rules.length > 0 ? `${hub.rules.length} destination checks available` : 'Open destination guide'}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">Open hub <ArrowRight className="h-4 w-4" /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
