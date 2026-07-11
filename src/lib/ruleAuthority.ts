import type { Rule } from '@/data/rules';
import type { FaqItem } from '@/lib/siteSeo';

export type AuthorityScenario = {
  title: string;
  body: string;
};

export type TravellerProfile = {
  title: string;
  body: string;
  kind: 'family' | 'business' | 'student' | 'specialist';
};

const airlinePatterns = [
  'ryanair', 'easyjet', 'emirates', 'british airways', 'air india', 'qatar airways',
  'lufthansa', 'klm', 'delta', 'united', 'american airlines', 'qantas', 'virgin atlantic',
  'indigo', 'jet2', 'wizz air', 'singapore airlines', 'turkish airlines', 'etihad',
];

export function getNamedAirline(rule: Rule) {
  const text = [rule.item, ...rule.tags].join(' ').toLowerCase();
  return airlinePatterns.find((name) => text.includes(name));
}

export function airlineSlug(name: string) {
  return name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getAirlineDifferencePoints(rule: Rule) {
  const namedAirline = getNamedAirline(rule);
  const points = [
    'The operating airline can apply stricter limits than general airport-security guidance.',
    'Codeshare journeys may follow the policy of the airline actually operating the flight.',
    'Gate-checked cabin bags must be cleared of anything that is not permitted in checked baggage.',
  ];

  if (rule.category === 'Batteries') {
    points.push('Airlines can set quantity limits or require approval for higher-capacity lithium batteries.');
  } else if (rule.category === 'Medication') {
    points.push('Airlines may ask for advance notice when medical equipment, sharps, oxygen or refrigeration is involved.');
  } else if (rule.category === 'Baby travel') {
    points.push('Infant baggage, warming facilities and accepted baby-equipment allowances vary by airline.');
  } else if (rule.category === 'Liquids' || rule.category === 'Cosmetics') {
    points.push('Airport security controls the cabin-liquid limit, while the airline controls baggage size and weight.');
  } else if (rule.category === 'Food & customs') {
    points.push('An airline may carry the food, but the destination can still prohibit or require declaration of it.');
  } else {
    points.push('Unusual, oversized or hazardous items may require advance approval even when generally permitted.');
  }

  return { namedAirline, points };
}

export function getDestinationConsiderations(rule: Rule) {
  const common = [
    'Check the destination customs authority, not only the departure-airport security page.',
    'Transit countries can impose their own rules when you clear security or customs during a connection.',
    'Keep receipts, prescriptions, product labels or permits when they could help explain the item.',
  ];

  if (rule.category === 'Medication') {
    common.unshift('Controlled medicines can need prior permission, quantity limits or translated supporting documents.');
  }
  if (rule.category === 'Food & customs' || rule.tags.some((tag) => /food|meat|fruit|plant|seed|customs|quarantine/i.test(tag))) {
    common.unshift('Food, plants and animal products can be restricted for agriculture and biosecurity reasons.');
  }
  if (rule.category === 'Batteries' || rule.category === 'Electronics') {
    common.unshift('Customs may ask about high-value electronics, commercial quantities or unfamiliar battery equipment.');
  }

  return common.slice(0, 5);
}

export function getCommonMistakes(rule: Rule) {
  const mistakes = [
    'Checking only the booking airline instead of the operating carrier.',
    'Assuming acceptance at departure guarantees acceptance on the return journey.',
    'Leaving the item buried in the bag when security may need to inspect it.',
  ];

  if (rule.checked === 'Not allowed') mistakes.unshift('Packing the item in checked baggage or leaving it inside a gate-checked cabin bag.');
  if (rule.cabin === 'Restricted') mistakes.unshift('Ignoring quantity, size, packaging or documentation limits that apply in cabin baggage.');
  if (rule.warning) mistakes.push(`Overlooking the page warning: ${rule.warning}`);

  return mistakes.slice(0, 6);
}

export function getAuthorityScenarios(rule: Rule): AuthorityScenario[] {
  const scenarios: AuthorityScenario[] = [
    {
      title: 'Direct flight',
      body: `For a direct journey, confirm the ${rule.cabin.toLowerCase()} cabin status and ${rule.checked.toLowerCase()} checked-baggage status with the operating airline before departure.`,
    },
    {
      title: 'Connecting itinerary',
      body: 'Check every operating carrier and any airport where you must clear security again. The strictest stage of the journey can determine the practical answer.',
    },
    {
      title: 'Cabin bag moved to the hold',
      body: rule.checked === 'Not allowed'
        ? 'Remove this item before handing over the bag because it is not permitted in checked baggage.'
        : 'Recheck that the item remains safely packed and complies with checked-baggage requirements.',
    },
  ];

  if (rule.category === 'Medication') {
    scenarios.push({ title: 'Long trip or delay', body: 'Carry essential doses and supporting documents in cabin baggage, with a reasonable reserve for disruption.' });
  } else if (rule.category === 'Batteries') {
    scenarios.push({ title: 'Capacity label missing', body: 'Security or airline staff may refuse a battery when its capacity cannot be identified clearly.' });
  } else if (rule.category === 'Food & customs') {
    scenarios.push({ title: 'Arrival declaration', body: 'Declare the item when required; failing to declare can matter more than whether it was allowed on the aircraft.' });
  }

  return scenarios.slice(0, 4);
}

export function getTravellerProfiles(rule: Rule): TravellerProfile[] {
  return [
    {
      title: 'Families',
      kind: 'family',
      body: rule.category === 'Baby travel'
        ? 'Keep feeding supplies grouped and easy to remove, and allow extra time for separate screening.'
        : 'Keep essential items organised so children’s supplies can be inspected without unpacking the whole bag.',
    },
    {
      title: 'Business travellers',
      kind: 'business',
      body: 'Carry specifications, receipts or supporting paperwork for important equipment and avoid placing essential work items in a bag that may be checked at the gate.',
    },
    {
      title: 'Students and long-stay travellers',
      kind: 'student',
      body: 'Check destination import limits and low-cost-airline baggage restrictions, especially when carrying several similar items or a long-term supply.',
    },
    {
      title: rule.category === 'Electronics' || rule.category === 'Batteries' ? 'Photographers and creators' : 'Travellers with special requirements',
      kind: 'specialist',
      body: rule.category === 'Electronics' || rule.category === 'Batteries'
        ? 'List every battery and device, protect terminals and confirm approval requirements for larger professional equipment.'
        : 'Contact the airline in advance when the item is medically necessary, oversized, fragile or difficult to replace.',
    },
  ];
}

export function getRuleFreshness(rule: Rule) {
  const updated = new Date(`${rule.updated}T00:00:00Z`);
  const now = new Date();
  const ageDays = Number.isNaN(updated.getTime()) ? null : Math.max(0, Math.floor((now.getTime() - updated.getTime()) / 86_400_000));
  const status = ageDays === null ? 'Review date supplied' : ageDays <= 90 ? 'Recently reviewed' : ageDays <= 180 ? 'Review recommended soon' : 'Recheck before relying on this page';
  return { ageDays, status };
}

export function buildAuthorityFaqItems(rule: Rule): FaqItem[] {
  const items: FaqItem[] = [
    { question: `Can I bring ${rule.item}?`, answer: rule.shortAnswer },
    { question: `Can I pack ${rule.item} in cabin baggage?`, answer: `Cabin baggage status: ${rule.cabin}. Check quantity, packaging, documentation and airline-specific conditions before travel.` },
    { question: `Can I pack ${rule.item} in checked baggage?`, answer: `Checked baggage status: ${rule.checked}. Remove the item from any cabin bag that is transferred to the hold when checked carriage is not permitted.` },
    { question: 'Can airport security still refuse the item?', answer: 'Yes. Security officers can inspect or refuse an item based on its condition, packaging, quantity or local procedures.' },
    { question: 'Do connecting flights change the answer?', answer: 'They can. Each operating airline and airport where you clear security again may apply different requirements.' },
    { question: 'Does the destination country matter?', answer: 'Yes. Customs and import rules apply separately from airline and airport-security rules.' },
    { question: 'What documents should I carry?', answer: 'Carry relevant prescriptions, permits, receipts, specifications or product labels when they help prove what the item is and why you need it.' },
    { question: 'What happens if my cabin bag is checked at the gate?', answer: rule.checked === 'Not allowed' ? 'Remove this item before handing over the bag because it is not allowed in checked baggage.' : 'Confirm that the item is safely packed and allowed in checked baggage before handing over the bag.' },
    { question: 'When should I recheck the rule?', answer: 'Recheck shortly before departure and again before the return journey because policies and enforcement can change.' },
    { question: 'Are the summaries on this page a guarantee?', answer: 'No. They are practical guidance. The operating airline, airport security and destination authorities make the final decision.' },
  ];

  if (rule.category === 'Batteries') {
    items.push({ question: 'Why does battery capacity matter?', answer: 'Airlines commonly use watt-hour capacity to decide whether a lithium battery is accepted, restricted or needs approval.' });
    items.push({ question: 'Can I carry more than one spare battery?', answer: 'Often yes for personal use, but airlines can impose quantity and capacity limits. Protect each battery against short circuit.' });
  } else if (rule.category === 'Medication') {
    items.push({ question: 'Do I need a prescription or doctor letter?', answer: 'It is strongly recommended for essential, liquid, injectable or controlled medicine and may be required by the destination.' });
    items.push({ question: 'Can liquid medicine exceed ordinary liquid limits?', answer: 'Medical liquids may receive an exemption, but they can require declaration, inspection or supporting documents.' });
  } else if (rule.category === 'Baby travel') {
    items.push({ question: 'Can baby milk exceed the normal liquid limit?', answer: 'Reasonable quantities needed for the journey are often exempt, although they may be screened separately.' });
    items.push({ question: 'Should I allow extra time at security?', answer: 'Yes. Baby food, milk, cooling packs and sterilised water can require additional inspection.' });
  } else if (rule.category === 'Food & customs') {
    items.push({ question: 'Does being allowed on the plane mean customs will allow it?', answer: 'No. Aviation carriage and destination import rules are separate decisions.' });
    items.push({ question: 'Should I declare food even when unsure?', answer: 'Where a declaration is available, declaring the item is generally safer than assuming it is permitted.' });
  }

  return items;
}
