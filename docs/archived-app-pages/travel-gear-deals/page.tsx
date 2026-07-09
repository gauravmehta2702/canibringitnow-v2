import OrbitCardGrid from '@/components/orbit/OrbitCardGrid';
import OrbitHero from '@/components/orbit/OrbitHero';

export const metadata = {
  title: 'Travel Gear Deals | Can I Bring It Now',
  description: 'Travel gear ideas for power banks, adapters, luggage scales, packing cubes, electronics and airport security.',
  alternates: { canonical: '/travel-gear-deals/' },
};

const gear = [
  { title: 'Best power banks for travel', href: '/search/?q=best%20power%20banks%20for%20travel', label: 'Electronics', description: 'Power bank content connected to battery and airline rules.' },
  { title: 'Best universal travel adapters', href: '/search/?q=best%20universal%20travel%20adapter', label: 'Adapters', description: 'Useful for country guides and international travel.' },
  { title: 'Best luggage scales', href: '/search/?q=best%20digital%20luggage%20scale', label: 'Baggage', description: 'Useful for airline baggage and packing pages.' },
  { title: 'Best packing cubes', href: '/search/?q=best%20packing%20cubes%20for%20travel', label: 'Packing', description: 'Useful for trip planner and packing guide pages.' },
  { title: 'Best clear liquids bags', href: '/search/?q=best%20clear%20liquids%20bag%20airport', label: 'Security', description: 'Useful for airport security and liquids pages.' },
  { title: 'Best travel medicine organisers', href: '/search/?q=best%20travel%20medicine%20organiser', label: 'Medication', description: 'Useful for medication travel pages.' },
];

export default function TravelGearDealsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit/" className="text-sm font-semibold text-brand-600">← ORBIT</a>
          <OrbitHero eyebrow="Travel gear" title="Travel gear deals and buying guides" description="Affiliate-ready content ideas for gear that genuinely helps travellers prepare before flying." />
          <OrbitCardGrid title="Travel gear opportunities" eyebrow="Revenue later, usefulness first" cards={gear} />
        </div>
      </section>
    </main>
  );
}
