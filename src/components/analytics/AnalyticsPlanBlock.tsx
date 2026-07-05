import { BarChart3 } from 'lucide-react';
import { getAnalyticsPlan } from '@/lib/v2AnalyticsPlan';

export default function AnalyticsPlanBlock() {
  const events = getAnalyticsPlan();

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">Analytics blueprint</p>
          <h2 className="text-2xl font-black text-slate-950">Track these events next</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {events.map((event) => (
          <div key={event.event} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{event.priority} priority</p>
            <p className="mt-1 font-black text-slate-950">{event.event}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600"><strong>Trigger:</strong> {event.trigger}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600"><strong>Purpose:</strong> {event.purpose}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
