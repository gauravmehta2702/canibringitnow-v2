import { AlertTriangle, BriefcaseBusiness, CheckCircle2, GraduationCap, Plane, Users } from 'lucide-react';
import type { Rule } from '@/data/rules';

type Guidance = {
  why: string;
  screening: string[];
  scenarios: { title: string; body: string }[];
  travellerAdvice: { title: string; body: string; icon: 'family' | 'business' | 'student' }[];
};

const categoryGuidance: Record<string, Guidance> = {
  Batteries: {
    why: 'Lithium batteries can overheat or short-circuit. Cabin carriage allows crew to respond quickly if a battery becomes hot, damaged or starts smoking.',
    screening: ['Find the watt-hour rating before travel.', 'Protect exposed terminals and keep spare batteries separate.', 'Do not use a swollen, damaged or recalled battery.', 'Expect large-capacity batteries to receive extra scrutiny.'],
    scenarios: [
      { title: 'Connecting flights', body: 'The strictest airline or airport on your itinerary may determine what is accepted, so check every operating carrier.' },
      { title: 'Gate-checked cabin bags', body: 'Remove power banks and spare lithium batteries before a cabin bag is placed in the aircraft hold.' },
      { title: 'Several batteries', body: 'Airlines may limit the number or capacity of spare batteries, particularly above common consumer sizes.' },
    ],
    travellerAdvice: [
      { title: 'Families', body: 'Keep charging equipment together and away from loose metal objects in a labelled pouch.', icon: 'family' },
      { title: 'Business travellers', body: 'Carry the specification label or product page when battery capacity is not clearly printed.', icon: 'business' },
      { title: 'Students', body: 'Check low-cost airline cabin-bag limits so the battery never ends up in a checked bag at the gate.', icon: 'student' },
    ],
  },
  Medication: {
    why: 'Medication is normally permitted because travellers need access to treatment, but controlled drugs, liquids, needles and temperature-sensitive medicines can require extra documentation.',
    screening: ['Keep essential medicine in cabin baggage.', 'Retain original labels where practical.', 'Carry a prescription or clinician letter for important or controlled medicines.', 'Check destination-country import limits before departure.'],
    scenarios: [
      { title: 'Liquid medicine', body: 'Medical liquids can receive an exemption from ordinary cabin liquid limits, but screening staff may inspect or test them.' },
      { title: 'Controlled medicine', body: 'Some destinations require prior permission even when the medicine was legally prescribed at home.' },
      { title: 'Refrigerated medicine', body: 'Use an appropriate travel cooler and confirm whether cooling packs need separate screening.' },
    ],
    travellerAdvice: [
      { title: 'Families', body: 'Carry children’s prescriptions and dosage instructions in the same pouch as the medicine.', icon: 'family' },
      { title: 'Business travellers', body: 'Pack enough medicine for delays and keep a digital copy of supporting documents.', icon: 'business' },
      { title: 'Students', body: 'Check long-stay import limits and arrange repeat prescriptions before travelling abroad.', icon: 'student' },
    ],
  },
  'Baby travel': {
    why: 'Airports commonly allow reasonable quantities of baby food, milk and sterilised water needed for the journey, although these items may be screened separately.',
    screening: ['Separate baby liquids from the rest of the bag.', 'Carry only a reasonable journey quantity.', 'Allow extra time for inspection.', 'Check transit-airport rules as well as departure rules.'],
    scenarios: [
      { title: 'Prepared formula', body: 'Security may ask for containers to be opened or tested, depending on local procedures.' },
      { title: 'Frozen packs', body: 'Cooling packs may be accepted when needed for infant food, but their state at screening can affect handling.' },
      { title: 'Long delays', body: 'Carry a sensible reserve while remaining within airline baggage and destination import rules.' },
    ],
    travellerAdvice: [
      { title: 'Families', body: 'Pack feeding items at the top of the cabin bag and use clearly labelled containers.', icon: 'family' },
      { title: 'Business travellers', body: 'When travelling with a child during work trips, confirm lounge and onboard warming facilities in advance.', icon: 'business' },
      { title: 'Students', body: 'Young parents travelling abroad should check both airport exemptions and destination food-import rules.', icon: 'student' },
    ],
  },
};

function defaultGuidance(rule: Rule): Guidance {
  return {
    why: `${rule.item} may be affected by aviation safety, security screening, airline baggage and destination customs requirements. These systems apply different tests, so an item accepted by one authority can still be restricted by another.`,
    screening: ['Keep the item accessible for inspection.', 'Check dimensions, quantity and packaging restrictions.', 'Review the operating airline rather than only the booking website.', 'Check destination customs rules when the item will enter another country.'],
    scenarios: [
      { title: 'Connecting flight', body: 'A transit airport can apply different security rules, even when the item was accepted at departure.' },
      { title: 'Cabin bag moved to the hold', body: 'Remove anything prohibited in checked baggage before handing over a cabin bag at the gate.' },
      { title: 'Final decision at the airport', body: 'Security officers, airline staff and customs officers retain authority to inspect or refuse an item.' },
    ],
    travellerAdvice: [
      { title: 'Families', body: 'Organise important items so they can be removed quickly without unpacking the entire bag.', icon: 'family' },
      { title: 'Business travellers', body: 'Carry receipts, specifications or supporting documents for unusual or valuable equipment.', icon: 'business' },
      { title: 'Students', body: 'Check budget-airline size and weight limits as well as the item rule itself.', icon: 'student' },
    ],
  };
}

const iconMap = { family: Users, business: BriefcaseBusiness, student: GraduationCap };

export default function RuleContentDepth({ rule }: { rule: Rule }) {
  const guidance = categoryGuidance[rule.category] || defaultGuidance(rule);
  const airlineName = rule.tags.find((tag) => /airways|airlines|ryanair|easyjet|emirates|jet2|wizz|lufthansa|klm|delta|united|qantas|virgin|indigo/i.test(tag));

  return (
    <div className="mt-8 space-y-8">
      <section className="rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100 md:p-8">
        <div className="flex items-start gap-3"><Plane className="mt-1 h-6 w-6 text-brand-600" /><div><p className="text-sm font-black uppercase tracking-wide text-brand-600">Detailed guidance</p><h2 className="mt-1 text-2xl font-black text-slate-950">Why this rule matters</h2></div></div>
        <p className="mt-4 leading-8 text-slate-700">{guidance.why}</p>
        {airlineName && <p className="mt-4 leading-8 text-slate-700">Because this page relates to <strong>{airlineName}</strong>, check the policy of the operating carrier shortly before departure. Codeshare flights can be operated by a different airline from the one shown prominently on the booking.</p>}
      </section>

      <section className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 md:p-8">
        <h2 className="text-2xl font-black text-slate-950">What to expect at security</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {guidance.screening.map((point) => <div key={point} className="flex gap-3 rounded-2xl bg-slate-50 p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" /><p className="text-sm leading-6 text-slate-700">{point}</p></div>)}
        </div>
      </section>

      <section>
        <p className="font-bold text-brand-600">Practical examples</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Situations that can change the answer</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {guidance.scenarios.map((scenario) => <article key={scenario.title} className="rounded-3xl bg-white p-5 ring-1 ring-slate-200"><AlertTriangle className="h-5 w-5 text-amber-600" /><h3 className="mt-3 font-black text-slate-950">{scenario.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{scenario.body}</p></article>)}
        </div>
      </section>

      <section className="rounded-3xl bg-slate-950 p-6 text-white md:p-8">
        <p className="text-sm font-black uppercase tracking-wide text-sky-300">Advice by traveller type</p>
        <h2 className="mt-2 text-2xl font-black">Extra checks for different journeys</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {guidance.travellerAdvice.map((advice) => { const Icon = iconMap[advice.icon]; return <article key={advice.title} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10"><Icon className="h-5 w-5 text-sky-300" /><h3 className="mt-3 font-black">{advice.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{advice.body}</p></article>; })}
        </div>
      </section>

      <section className="rounded-3xl bg-green-50 p-6 ring-1 ring-green-100 md:p-8">
        <h2 className="text-2xl font-black text-green-950">Final packing checklist</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7 text-green-900">
          <li>Confirm the item status shown above for both cabin and checked baggage.</li>
          <li>Review the operating airline and departure-airport guidance.</li>
          <li>Check destination customs or import rules when relevant.</li>
          <li>Pack the item so security staff can inspect it without delay.</li>
          <li>Recheck shortly before travel because policies and enforcement can change.</li>
        </ol>
      </section>
    </div>
  );
}
