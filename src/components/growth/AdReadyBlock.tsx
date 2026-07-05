import { BadgePoundSterling } from 'lucide-react';
import { getAdPlacementLabel } from '@/lib/growthMonetisation';

export default function AdReadyBlock({ slot = 'middle' }: { slot?: 'top' | 'middle' | 'bottom' }) {
  return (
    <section className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 ring-1 ring-slate-200">
        <BadgePoundSterling className="h-4 w-4 text-brand-600" />
        {getAdPlacementLabel(slot)}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">Reserved ad/affiliate placement. Keep this relevant and low-distraction for better trust and conversions.</p>
    </section>
  );
}
