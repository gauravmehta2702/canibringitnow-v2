import { airlines, countries } from '@/data/rules';
import { getOrbitItemHubs, orbitAirports, orbitSlug } from '@/lib/orbitEngine';

export const metadata = {
  title: 'ORBIT Sitemap | Can I Bring It Now',
  description: 'Human-readable sitemap for ORBIT travel hubs, airline guides, country guides, item guides, airports and deals.',
  alternates: { canonical: '/orbit-sitemap/' },
};

export default function OrbitSitemapPage() {
  const itemHubs = getOrbitItemHubs(120);

  const links = [
    { title: 'ORBIT hub', href: '/orbit/' },
    { title: 'Item guides', href: '/item-guides/' },
    { title: 'Airline guides', href: '/airline-guides/' },
    { title: 'Country guides', href: '/country-guides/' },
    { title: 'Airport guides', href: '/airport-guides/' },
    { title: 'Travel deals', href: '/travel-deals/' },
    { title: 'Cheap travel', href: '/cheap-travel/' },
    { title: 'Travel gear deals', href: '/travel-gear-deals/' },
    { title: 'Discover travel', href: '/discover-travel/' },
    ...itemHubs.map((hub) => ({ title: hub.item, href: `/item-guides/${hub.slug}/` })),
    ...airlines.map((airline) => ({ title: airline, href: `/airline-guides/${orbitSlug(airline)}/` })),
    ...countries.map((country) => ({ title: country, href: `/country-guides/${orbitSlug(country)}/` })),
    ...countries.slice(0, 40).map((country) => ({ title: `${country} travel deals`, href: `/travel-deals/${orbitSlug(country)}/` })),
    ...orbitAirports.map((airport) => ({ title: airport.name, href: `/airport-guides/${airport.slug}/` })),
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <p className="font-bold text-brand-600">ORBIT sitemap</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">ORBIT hub links</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">A crawlable list of ORBIT pages for visitors and search engines.</p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">
                  {link.title}
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
