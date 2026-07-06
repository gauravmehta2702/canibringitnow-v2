import { Globe2, Hotel, Plane } from 'lucide-react';
import DestinationCardGrid from '@/components/destinations/DestinationCardGrid';
import { getDestinationProfile } from '@/lib/v3DestinationIntelligence';

export default function DestinationIntelligencePage({ country = 'Japan' }: { country?: string }) {
  const profile = getDestinationProfile(country);

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <Globe2 className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">Destination Intelligence</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">{profile.headline}</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">{profile.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/v2-travel-brain/" className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700">
                <Plane className="h-5 w-5" /> Ask AI Travel Brain
              </a>
              <a href="/packing-planner/" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-black text-white ring-1 ring-white/10 hover:bg-white/15">
                <Hotel className="h-5 w-5" /> Build packing list
              </a>
            </div>
          </div>
        </div>
      </section>
      <DestinationCardGrid title={`Travel rules for ${profile.country}`} eyebrow="Know before you go" cards={profile.travelRuleLinks} />
      <DestinationCardGrid title={`Planning your stay in ${profile.country}`} eyebrow="Hotel guide ideas" cards={profile.hotelGuides} />
      <DestinationCardGrid title={`Prepare for ${profile.country}`} eyebrow="Trip preparation" cards={profile.preparationLinks} />
    </div>
  );
}
