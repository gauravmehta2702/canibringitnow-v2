import type { Rule } from '@/data/rules';
import { rules } from '@/data/rules';
import { splitRuleSubject } from '@/lib/ruleSeoEngine';

export type AuthorityInsight = {
  whyItExists: string;
  mistakes: string[];
  checklist: string[];
  verificationSteps: string[];
  journeyLinks: Array<{ title: string; description: string; href: string }>;
};

const categoryGuidance: Record<string, Omit<AuthorityInsight, 'journeyLinks'>> = {
  Batteries: {
    whyItExists: 'Lithium batteries can overheat or short-circuit. Keeping spare batteries and power banks in the cabin allows the crew to respond quickly if a battery becomes hot, damaged or starts smoking.',
    mistakes: [
      'Packing a power bank or spare lithium battery in checked baggage.',
      'Travelling without checking the watt-hour rating printed on the battery.',
      'Leaving terminals exposed where keys or coins could cause a short circuit.',
      'Assuming every airline applies exactly the same quantity and capacity limits.',
    ],
    checklist: [
      'Find the watt-hour (Wh) rating before leaving home.',
      'Keep the battery in cabin baggage and protect its terminals.',
      'Check the operating airline policy, including any approval requirement.',
      'Recheck the departure airport and destination rules before travel.',
    ],
    verificationSteps: ['Operating airline dangerous-goods page', 'Departure airport security guidance', 'Destination customs authority if importing several batteries'],
  },
  Medication: {
    whyItExists: 'Security teams need to distinguish genuine medical supplies from restricted liquids or controlled substances. Destination countries may also regulate medicines that are routinely prescribed elsewhere.',
    mistakes: [
      'Putting essential medicine only in checked baggage.',
      'Removing labels or travelling without prescription evidence.',
      'Assuming a UK, US or EU prescription automatically makes a medicine legal at the destination.',
      'Forgetting temperature-control or sharps arrangements for the full journey.',
    ],
    checklist: [
      'Keep essential medicine and documents in cabin baggage.',
      'Carry original labels, prescription copies and a doctor letter when useful.',
      'Check controlled-drug rules for every transit and destination country.',
      'Plan refrigeration, needles, pumps or other medical equipment in advance.',
    ],
    verificationSteps: ['Airline medical assistance page', 'Departure airport security guidance', 'Destination embassy or medicines authority'],
  },
  Liquids: {
    whyItExists: 'Cabin liquid limits are security-screening measures. Exemptions can apply to medicine, baby supplies and duty-free purchases, but the screening process and local implementation can differ by airport.',
    mistakes: [
      'Relying on the rules from the return airport instead of checking both directions.',
      'Treating gels, creams, pastes and aerosols as non-liquids.',
      'Packing oversized containers that are only partly full.',
      'Hiding the liquids bag deep inside hand luggage and slowing screening.',
    ],
    checklist: [
      'Check the departure airport liquid limit for each leg.',
      'Place cabin liquids in the required clear bag.',
      'Pack larger non-essential liquids in checked baggage.',
      'Keep exemptions and supporting documents easy to present.',
    ],
    verificationSteps: ['Departure airport security page', 'National aviation-security guidance', 'Airline baggage page for aerosols or unusual products'],
  },
  'Baby travel': {
    whyItExists: 'Baby food, milk and essential care items often receive practical exemptions, but they may need separate screening. The quantity must normally be reasonable for the journey.',
    mistakes: [
      'Assuming all airports apply exemptions in exactly the same way.',
      'Packing baby supplies where they cannot be removed quickly for inspection.',
      'Taking far more than is reasonably needed without checking first.',
      'Forgetting supplies for delays, connections or baggage disruption.',
    ],
    checklist: [
      'Keep milk, food and medicines together and accessible.',
      'Allow extra time for security screening.',
      'Carry enough for the journey plus a sensible delay allowance.',
      'Check stroller, car-seat and infant baggage allowances separately.',
    ],
    verificationSteps: ['Departure airport family-travel guidance', 'Airline infant baggage policy', 'Destination customs rules for food products'],
  },
};

const fallback = {
  whyItExists: 'Travel restrictions usually combine aviation safety, airport security, customs and local-law requirements. The correct answer can therefore change by airline, airport, route and destination.',
  mistakes: [
    'Checking only the airline and ignoring airport or destination rules.',
    'Assuming the same rule applies to cabin and checked baggage.',
    'Using an old forum answer instead of current official guidance.',
    'Waiting until the airport to resolve an unclear restriction.',
  ],
  checklist: [
    'Confirm whether the item belongs in cabin or checked baggage.',
    'Read the operating airline policy rather than only the ticket seller’s policy.',
    'Check departure, transit and destination requirements.',
    'Keep documents, packaging or approvals accessible during travel.',
  ],
  verificationSteps: ['Operating airline policy', 'Departure airport guidance', 'Destination customs or government travel guidance'],
};

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function buildAuthorityInsight(rule: Rule): AuthorityInsight {
  const base = categoryGuidance[rule.category] || fallback;
  const subject = splitRuleSubject(rule);
  const links: AuthorityInsight['journeyLinks'] = [
    {
      title: `Explore ${rule.category.toLowerCase()} guidance`,
      description: `See related rules and practical checks for ${rule.category.toLowerCase()}.`,
      href: `/categories/${slugify(rule.category)}/`,
    },
    {
      title: `Compare ${subject.baseItem.toLowerCase()} rules`,
      description: 'Check how the answer changes across airlines and related travel situations.',
      href: `/items/${slugify(subject.baseItem)}/`,
    },
    {
      title: 'Plan the complete journey',
      description: 'Combine item, airline, airport and destination checks before departure.',
      href: '/trip-checker/',
    },
  ];

  if (subject.airline) {
    links.unshift({
      title: `${subject.airline} travel hub`,
      description: `Continue with baggage, item and practical travel guidance for ${subject.airline}.`,
      href: `/airlines/${slugify(subject.airline)}/`,
    });
  }

  return { ...base, journeyLinks: links.slice(0, 4) };
}

export function getAuthorityAudit() {
  return rules.map((rule) => {
    const subject = splitRuleSubject(rule);
    const genericSource = /general travel guidance|common airline baggage rules/i.test(rule.sourceNote);
    const ageDays = Math.max(0, Math.floor((Date.now() - new Date(rule.updated).getTime()) / 86400000));
    const score = Math.max(0, 100
      - (genericSource ? 25 : 0)
      - (rule.restrictions.length < 3 ? 15 : 0)
      - (rule.tips.length < 3 ? 15 : 0)
      - (rule.tags.length < 8 ? 10 : 0)
      - (ageDays > 180 ? 20 : ageDays > 90 ? 10 : 0));

    return {
      slug: rule.slug,
      item: rule.item,
      category: rule.category,
      airline: subject.airline,
      score,
      genericSource,
      ageDays,
      priority: score < 60 ? 'High' : score < 80 ? 'Medium' : 'Maintain',
    };
  }).sort((a, b) => a.score - b.score || b.ageDays - a.ageDays);
}
