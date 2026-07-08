import { countries } from '@/data/rules';
import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';
import { orbitSlug } from '@/lib/orbitEngine';

export const metadata = {
  title: 'Country Travel Rule Guides | Can I Bring It Now',
  description: 'Browse country-led customs, airport security and destination travel rule hubs.',
  alternates: { canonical: '/country-guides/' },
};

export default function CountryGuidesPage() {
  const cards = countries.map((country) => ({
    title: country,
    href: `/country-guides/${orbitSlug(country)}/`,
    label: 'Country hub',
    description: `Customs, medication, food, batteries, airport security and packing guidance for ${country}.`,
  }));

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit/" className="text-sm font-semibold text-brand-600">← ORBIT</a>
          <OrbitHero eyebrow="Country hubs" title="Country travel rule guides" description="Country hubs connect customs, destination rules, packing, hotels, deals and trip planning." />
          <OrbitCardGrid title="Browse country hubs" eyebrow="Rules by destination" cards={cards} />
        </div>
      </section>
    </main>
  );
}
