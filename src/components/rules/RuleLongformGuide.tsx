import {
  BookOpenCheck,
  CircleAlert,
  ClipboardCheck,
  Globe2,
  Luggage,
  PlaneTakeoff,
} from 'lucide-react';
import type { Rule } from '@/data/rules';

type Section = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type CategoryGuide = {
  overview: string;
  cabin: string;
  checked: string;
  airport: string;
  destination: string;
  mistakes: string[];
  examples: string[];
};

const categoryGuides: Record<string, CategoryGuide> = {
  Batteries: {
    overview:
      'Battery rules focus on preventing short circuits, overheating and thermal runaway. The safest packing method depends on whether the battery is installed in equipment, carried as a spare or used as a power bank. Capacity markings, physical condition and terminal protection can all affect the decision made by an airline or security officer.',
    cabin:
      'Cabin baggage is generally the safer location for spare lithium batteries and power banks because smoke, heat or damage can be noticed and managed more quickly. Keep the battery accessible, protect the terminals and avoid placing it beside loose coins, keys or metal objects. If a cabin bag is taken at the gate for loading into the hold, remove all items that must remain with you.',
    checked:
      'Checked-baggage rules can be stricter because a battery incident in the hold may be harder to identify. Equipment containing a battery may be treated differently from a loose battery, so check both the item rule and the battery rule. Switch devices fully off, protect them from accidental activation and do not pack damaged or recalled batteries.',
    airport:
      'Security staff may ask to see the capacity label, inspect the battery casing or confirm that terminals are protected. A missing or unreadable specification can make assessment more difficult. Keep a product specification, receipt or manufacturer page available for unusual batteries, especially when the watt-hour rating is not printed clearly.',
    destination:
      'Aviation rules mainly govern the flight, while destination customs rules govern what may enter the country. Commercial quantities, high-value electronics and specialised batteries can attract additional questions. Connecting flights also matter because each airport and operating airline can apply its own procedures.',
    mistakes: [
      'Packing a power bank or spare battery in checked baggage.',
      'Travelling with a swollen, cracked, leaking or recalled battery.',
      'Leaving terminals exposed where they can contact metal objects.',
      'Assuming the marketing capacity in mAh is enough when the airline asks for watt-hours.',
    ],
    examples: [
      'A normal phone power bank with a readable label is kept in cabin baggage and removed before a gate-checked bag is handed over.',
      'A traveller with several camera batteries uses individual covers and checks whether the airline limits the number of spares.',
      'A large professional battery is reviewed with the airline before travel rather than being presented without notice at the airport.',
    ],
  },
  Medication: {
    overview:
      'Medication is usually permitted because travellers need continued access to treatment, but the exact process can depend on the medicine, quantity, packaging and destination. Controlled drugs, injectable medicines, liquid medicines and temperature-sensitive products may require stronger supporting evidence than ordinary tablets.',
    cabin:
      'Essential medicine is normally best kept in cabin baggage so it remains available during the journey and is not lost with checked luggage. Keep original labels where practical and carry a prescription, dispensing label or clinician letter for important treatment. Pack enough for reasonable delays while respecting destination import limits.',
    checked:
      'Non-essential supplies may sometimes travel in checked baggage, but temperature changes, loss and delayed delivery create practical risks. Medicines that must remain cool or be taken during the journey should stay with the passenger. Do not place all supplies in one bag when a disruption could leave you without treatment.',
    airport:
      'Security may inspect liquid medicines, needles, syringes, cooling packs or medical devices separately. Present them clearly and explain their medical purpose. Allow extra time and keep documentation together with the medicine. Airport screening permission does not automatically confirm that the destination permits the medicine.',
    destination:
      'Countries classify controlled medicines differently. A medicine available on prescription at home may be restricted, limited or prohibited elsewhere. Check the destination embassy, health authority or customs guidance well before travel, especially for strong painkillers, sedatives, stimulants and long stays.',
    mistakes: [
      'Assuming a home-country prescription automatically makes the medicine legal abroad.',
      'Packing all essential medicine in checked baggage.',
      'Removing medicine from labelled packaging without carrying supporting documents.',
      'Forgetting to plan for delays, time-zone changes or refrigeration needs.',
    ],
    examples: [
      'A passenger carries daily tablets in labelled packaging together with a copy of the prescription.',
      'Liquid medicine above ordinary cabin limits is presented separately for screening with supporting evidence.',
      'A traveller checks destination approval requirements before carrying a controlled medicine for a long stay.',
    ],
  },
  'Baby travel': {
    overview:
      'Baby food, milk, formula and sterilised water often receive practical exemptions because they are needed during the journey. The amount should still be reasonable for the trip, and security staff may inspect containers separately. Airline baggage limits and destination food-import rules remain separate considerations.',
    cabin:
      'Keep feeding supplies in cabin baggage where they are available during delays and the flight. Place bottles, pouches and containers near the top of the bag so they can be removed quickly. Label items clearly and separate them from ordinary toiletries to make screening easier.',
    checked:
      'Backup supplies may be placed in checked baggage when suitable, but consider leakage, temperature and delay risks. Powdered formula and sealed products are often easier to manage than prepared liquids, although destination customs rules can still apply. Keep enough essential supplies with you for the journey.',
    airport:
      'Security may ask to open, test or visually inspect baby liquids. Procedures vary by airport, and transit screening can repeat the process. Arrive early, explain what each container is for and keep cooling packs or sterilised water with the feeding items they support.',
    destination:
      'Food and agricultural controls can restrict fresh dairy, meat, fruit or homemade food even when airport security allowed it through. Check the destination customs authority before carrying large quantities or unsealed foods. Transit countries may also impose controls when bags are collected and rechecked.',
    mistakes: [
      'Packing every feeding item deep inside a full cabin bag.',
      'Assuming the departure-airport exemption also guarantees entry through customs.',
      'Carrying far more than a reasonable journey quantity without checking the rules.',
      'Failing to allow extra time for separate inspection.',
    ],
    examples: [
      'Parents place bottles and formula in one accessible pouch and present it separately at security.',
      'A family carries enough milk for the flight and delays, while checking whether extra sealed tins may enter the destination.',
      'Cooling packs are packed with the food or medicine they are intended to protect and shown together at screening.',
    ],
  },
  Liquids: {
    overview:
      'Liquid restrictions are designed to make security screening manageable. Gels, creams, pastes, aerosols and similar products can be treated as liquids even when they do not pour like water. Container size, packaging, exemptions and airport equipment can all affect what is accepted in cabin baggage.',
    cabin:
      'Use containers that meet the departure airport’s current limit and place them in the required transparent bag when instructed. The container capacity matters, not merely the amount remaining inside it. Keep exemptions such as medicine, baby supplies and special dietary liquids separate and ready to explain.',
    checked:
      'Larger toiletries and non-hazardous liquids are often simpler to pack in checked baggage. Prevent leaks by tightening lids, using protective bags and leaving space for expansion. Aerosols, alcohol and flammable products can have additional limits, so do not assume every liquid is acceptable in the hold.',
    airport:
      'Some airports use newer scanners, but implementation and temporary procedures vary. Follow the rule displayed by the airport you are departing from rather than relying on an experience at another terminal. Connecting passengers may be screened again under different requirements.',
    destination:
      'Customs rules can restrict alcohol, food liquids, plant products and commercial quantities. Duty-free liquids may need to remain sealed with proof of purchase during transit. Check how transfers are handled before opening tamper-evident bags.',
    mistakes: [
      'Using an oversized container that contains only a small amount of product.',
      'Forgetting that gels, creams, pastes and sprays may count as liquids.',
      'Relying on a new-scanner exemption without checking the specific airport and terminal.',
      'Opening sealed duty-free liquids before a connecting security check.',
    ],
    examples: [
      'A traveller transfers toiletries into compliant containers and keeps the clear bag easy to remove.',
      'A medically required liquid is separated from ordinary toiletries and supported with documentation.',
      'Duty-free liquid remains sealed during a connection where another security screening is expected.',
    ],
  },
  Cosmetics: {
    overview:
      'Cosmetics can fall under several rule types. Solid products are usually straightforward, while creams, gels, perfumes and aerosols may be treated as liquids. Flammability, pressure, container size and total quantity can affect whether a product belongs in cabin or checked baggage.',
    cabin:
      'Keep liquid and gel cosmetics within the airport’s cabin-liquid rules. Solid alternatives can simplify packing. Protect glass perfume bottles, cap sprays and avoid carrying unnecessary duplicates. Items with blades or sharp applicators may also be assessed under security rules for sharp objects.',
    checked:
      'Full-size non-hazardous products are often better suited to checked baggage, but they should be sealed against leakage and protected from impact. Aerosols and high-alcohol products may be limited by quantity or type. Products marked flammable or intended for professional use deserve additional checking.',
    airport:
      'Security officers classify products by physical form rather than marketing name. Mascara, foundation, lip gloss, roll-on products and creams may count toward the liquid allowance. Keep labels visible if the product is unusual or medically required.',
    destination:
      'Personal-use quantities are normally simpler than commercial quantities. Large numbers of identical products, expensive goods or restricted ingredients can raise customs questions. Check local rules when carrying professional kits or products containing controlled substances.',
    mistakes: [
      'Assuming a cosmetic does not count as a liquid because it is thick or sold in a compact package.',
      'Packing an aerosol without checking whether it is permitted and properly capped.',
      'Carrying many identical products without considering customs treatment.',
      'Leaving fragile bottles unprotected inside checked baggage.',
    ],
    examples: [
      'A passenger uses solid toiletries to reduce the number of items in the liquids bag.',
      'A perfume bottle is packed within the cabin limit and protected from breakage.',
      'A professional makeup kit is reviewed for liquids, aerosols, sharp tools and customs quantity concerns.',
    ],
  },
  Electronics: {
    overview:
      'Electronic devices are assessed for battery safety, security screening, size and baggage handling. Most ordinary consumer devices are familiar to airlines, but spare batteries, damaged equipment, specialist tools and large devices can create additional restrictions.',
    cabin:
      'Cabin baggage is usually preferable for valuable electronics and devices containing lithium batteries. Charge devices sufficiently to demonstrate operation if requested, protect screens and ports, and keep large electronics accessible for screening. Remove prohibited accessories before packing the main device.',
    checked:
      'Checked baggage exposes electronics to impact, loss and temperature changes. When a device is permitted in the hold, switch it fully off and protect it from accidental activation. Spare lithium batteries and power banks often need to remain in the cabin even when the device itself can be checked.',
    airport:
      'Laptops, tablets, cameras and larger devices may need to be removed from the bag unless the airport uses procedures that allow them to remain inside. Security can inspect cables, dense equipment or unusual electronics separately. Keep the device organised and easy to access.',
    destination:
      'Customs may ask about high-value equipment, professional use, temporary imports or multiple new devices. Drones, radio transmitters and recording equipment can be subject to separate local rules. Check permits and declaration requirements before travel.',
    mistakes: [
      'Leaving a power bank inside a cabin bag that is unexpectedly gate-checked.',
      'Packing a device with a damaged or swollen battery.',
      'Assuming permission to fly with a device also grants permission to use it at the destination.',
      'Carrying expensive professional equipment without considering customs documentation.',
    ],
    examples: [
      'A laptop is charged, protected and positioned for easy removal at security.',
      'A camera travels in the cabin while spare batteries use individual terminal covers.',
      'A professional checks temporary-import and permit requirements before travelling with specialist equipment.',
    ],
  },
  'Food & customs': {
    overview:
      'Food can pass airport security yet still be refused by destination customs. Security focuses on aviation risk and liquid consistency, while customs protects agriculture, public health and local markets. Freshness, ingredients, packaging, origin and quantity all matter.',
    cabin:
      'Solid packaged foods are often easier to carry through security than liquids, sauces or spreads. Keep food sealed and labelled, and consider smell, leakage and allergy concerns for other passengers. Food needed during the journey should still comply with airline and airport rules.',
    checked:
      'Checked baggage can suit robust, sealed foods, but temperature-sensitive or fragile items may spoil or break. Liquids and alcohol can have baggage-specific limits. Packing food in checked baggage does not bypass destination declaration requirements.',
    airport:
      'Security may treat sauces, jams, soft cheeses, spreads and similar foods as liquids or gels. Frozen items can be assessed differently depending on whether they remain fully frozen. Present unusual foods separately and allow time for inspection.',
    destination:
      'Meat, dairy, fruit, vegetables, seeds, plants and homemade foods are commonly controlled. Declare items when required; declaration is often safer than guessing. Penalties can apply even when the food was permitted on the aircraft.',
    mistakes: [
      'Confusing airport-security permission with customs permission.',
      'Failing to declare controlled food because it is sealed or commercially packaged.',
      'Packing soft or spreadable food without considering cabin-liquid rules.',
      'Carrying large quantities that appear commercial rather than personal.',
    ],
    examples: [
      'A traveller checks the destination biosecurity list before packing snacks containing meat or dairy.',
      'A spreadable food is treated as a liquid for cabin screening and packed accordingly.',
      'A passenger declares uncertain food on arrival instead of attempting to conceal it.',
    ],
  },
};

function fallbackGuide(rule: Rule): CategoryGuide {
  return {
    overview: `${rule.item} can be affected by four separate layers: airport security, airline baggage policy, aviation safety rules and destination customs. A positive answer from one layer does not automatically settle the others. The safest approach is to check how the item is packed, where it is carried, what quantity is involved and whether the destination regulates it.`,
    cabin: `Cabin baggage keeps ${rule.item.toLowerCase()} accessible for inspection, but space, liquid, battery, sharp-object and dangerous-goods rules can still apply. Pack it so that security staff can identify it quickly and so that it cannot leak, activate or damage other belongings.`,
    checked: `Checked baggage can be suitable for items that are bulky or restricted in the cabin, but valuables, essentials and anything prohibited in the hold should remain with you. Protect the item from impact and accidental operation, and confirm that the airline accepts it in checked baggage.`,
    airport: `Screening procedures differ between airports and can change with equipment, security alerts and local law. Keep supporting information available for unusual items and follow the instructions given at the checkpoint. The officer’s decision applies at that time and place.`,
    destination: `Customs rules begin where aviation screening ends. The destination may restrict ingredients, value, quantity, commercial use or controlled materials. Check official destination guidance and declare the item when required.`,
    mistakes: [
      'Checking only the booking airline rather than the operating carrier.',
      'Ignoring transit-airport screening and destination customs.',
      'Packing the item where it cannot be removed quickly for inspection.',
      'Assuming a previous trip guarantees the same decision today.',
    ],
    examples: [
      'A traveller checks both cabin and checked status before deciding where to pack the item.',
      'A connecting passenger reviews the strictest airport and airline on the full itinerary.',
      'An unusual item is supported by clear labels, specifications or documents.',
    ],
  };
}

function buildSections(rule: Rule, guide: CategoryGuide): Section[] {
  const cabinStatus = rule.cabin.toLowerCase();
  const checkedStatus = rule.checked.toLowerCase();

  return [
    {
      heading: `Understanding the rule for ${rule.item}`,
      paragraphs: [
        guide.overview,
        `For this specific page, the current summary is cabin baggage: ${cabinStatus}; checked baggage: ${checkedStatus}. That summary is a starting point, not a substitute for the operating airline, departure airport and destination authority. The item’s condition, capacity, quantity and packaging can change how the rule is applied.`,
      ],
    },
    {
      heading: 'Cabin baggage: what to consider',
      paragraphs: [
        guide.cabin,
        rule.cabin === 'Allowed'
          ? '“Allowed” does not mean unrestricted. Airline size and weight limits still apply, and security may inspect the item or require it to be repacked.'
          : rule.cabin === 'Restricted'
            ? '“Restricted” means the item may be accepted only when conditions such as size, quantity, packaging or documentation are met.'
            : 'Because the item is marked not allowed in cabin baggage, do not present it at security unless official guidance confirms a specific exemption.',
      ],
    },
    {
      heading: 'Checked baggage: what to consider',
      paragraphs: [
        guide.checked,
        rule.checked === 'Allowed'
          ? 'Even when checked baggage is allowed, use protective packaging and consider whether loss, delay, temperature or rough handling could create a problem.'
          : rule.checked === 'Restricted'
            ? 'A restricted checked-baggage status requires careful attention to conditions and packaging. Confirm the latest airline wording before placing the item in the hold.'
            : 'Because the item is marked not allowed in checked baggage, remove it before bag drop or before a cabin bag is gate-checked.',
      ],
    },
    {
      heading: 'Airport screening and connecting flights',
      paragraphs: [
        guide.airport,
        'A connection can introduce a second screening point. The strictest applicable rule may determine the outcome, especially when you leave the secure area, collect baggage or change airlines. Keep the item accessible until all security checks are complete.',
      ],
    },
    {
      heading: 'Destination and customs considerations',
      paragraphs: [
        guide.destination,
        'Use official government, customs, health or aviation sources for the destination. Airline approval concerns carriage on the aircraft; it does not guarantee legal import, possession or use after arrival.',
      ],
    },
  ];
}

export default function RuleLongformGuide({ rule }: { rule: Rule }) {
  const guide = categoryGuides[rule.category] || fallbackGuide(rule);
  const sections = buildSections(rule, guide);

  return (
    <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-brand-50 p-3 text-brand-700 ring-1 ring-brand-100">
          <BookOpenCheck className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-brand-600">In-depth travel guide</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
            What travellers should know about {rule.item.toLowerCase()}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-slate-600">
            Use this detailed explanation together with the quick decision summary above. Rules can change and the final decision remains with the relevant airline, airport security and customs authorities.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {sections.map((section, index) => {
          const icons = [BookOpenCheck, Luggage, ClipboardCheck, PlaneTakeoff, Globe2];
          const Icon = icons[index] || BookOpenCheck;
          return (
            <article key={section.heading} className="border-t border-slate-200 pt-7 first:border-t-0 first:pt-0">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-brand-600" />
                <h3 className="text-xl font-black text-slate-950">{section.heading}</h3>
              </div>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-9 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100">
          <div className="flex items-center gap-3">
            <CircleAlert className="h-6 w-6 text-amber-700" />
            <h3 className="text-xl font-black text-amber-950">Common mistakes to avoid</h3>
          </div>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-amber-900">
            {guide.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
          </ul>
        </article>

        <article className="rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100">
          <div className="flex items-center gap-3">
            <PlaneTakeoff className="h-6 w-6 text-brand-700" />
            <h3 className="text-xl font-black text-slate-950">Practical journey examples</h3>
          </div>
          <ul className="mt-4 space-y-3 leading-7 text-slate-700">
            {guide.examples.map((example, index) => (
              <li key={example} className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-brand-700 ring-1 ring-brand-100">{index + 1}</span>
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
