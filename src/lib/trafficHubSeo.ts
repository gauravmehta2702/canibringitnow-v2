import type { Rule, RuleStatus } from '@/data/rules';
import { getBaseItemName, itemSlug } from '@/lib/itemUtils';
import type { UniversalContentPage } from '@/lib/contentEngine';

export type HubStatusSummary = {
  status: RuleStatus;
  cabin: number;
  checked: number;
};

export type HubTopic = {
  name: string;
  href: string;
  ruleCount: number;
  allowedCabin: number;
  restrictedCabin: number;
  blockedCabin: number;
};

export type HubQuestion = {
  question: string;
  answer: string;
  href?: string;
  linkLabel?: string;
};

export type TrafficHubProfile = {
  heading: string;
  intro: string;
  statusSummary: HubStatusSummary[];
  topics: HubTopic[];
  questions: HubQuestion[];
  tripCheckerLabel: string;
};

const statuses: RuleStatus[] = ['Allowed', 'Restricted', 'Not allowed'];

function countStatus(rules: Rule[], bag: 'cabin' | 'checked', status: RuleStatus) {
  return rules.filter((rule) => rule[bag] === status).length;
}

function buildStatusSummary(rules: Rule[]): HubStatusSummary[] {
  return statuses.map((status) => ({
    status,
    cabin: countStatus(rules, 'cabin', status),
    checked: countStatus(rules, 'checked', status),
  }));
}

function buildTopics(page: UniversalContentPage): HubTopic[] {
  const groups = new Map<string, Rule[]>();

  page.rules.forEach((rule) => {
    const item = getBaseItemName(rule.item);
    const existing = groups.get(item) || [];
    existing.push(rule);
    groups.set(item, existing);
  });

  return Array.from(groups.entries())
    .map(([name, rules]) => ({
      name,
      href: `/items/${itemSlug(name)}/`,
      ruleCount: rules.length,
      allowedCabin: countStatus(rules, 'cabin', 'Allowed'),
      restrictedCabin: countStatus(rules, 'cabin', 'Restricted'),
      blockedCabin: countStatus(rules, 'cabin', 'Not allowed'),
    }))
    .sort((a, b) => b.ruleCount - a.ruleCount || a.name.localeCompare(b.name))
    .slice(0, 8);
}

function firstRuleHref(page: UniversalContentPage) {
  const first = page.rules[0];
  return first ? `/rules/${first.slug}/` : page.href;
}

function buildAirlineQuestions(page: UniversalContentPage): HubQuestion[] {
  const cabinAllowed = countStatus(page.rules, 'cabin', 'Allowed');
  const cabinRestricted = countStatus(page.rules, 'cabin', 'Restricted');
  const checkedBlocked = countStatus(page.rules, 'checked', 'Not allowed');

  return [
    {
      question: `What items can I take in cabin baggage on ${page.name}?`,
      answer: `${cabinAllowed} linked rules currently show an allowed cabin-baggage outcome, while ${cabinRestricted} require extra checks. Always open the individual rule because quantity, packaging and route conditions can still apply.`,
      href: firstRuleHref(page),
      linkLabel: 'Open a detailed rule',
    },
    {
      question: `What should not go in checked baggage on ${page.name}?`,
      answer: `${checkedBlocked} linked rules currently show a not-allowed checked-baggage outcome. Batteries, valuables, medicine and other sensitive items often need special attention, so compare the exact item before packing.`,
      href: '/trip-checker/',
      linkLabel: 'Check a full packing list',
    },
    {
      question: `Are ${page.name} rules the same at every airport?`,
      answer: 'No. The airline controls its baggage policy, while departure security and destination customs apply separate rules. A permitted airline item may still need screening, documentation or declaration.',
    },
    {
      question: `How recently was this ${page.name} guide reviewed?`,
      answer: `The linked rule collection was last reviewed in ${new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(page.updated))}. Important restrictions should still be confirmed with current official sources before travel.`,
    },
  ];
}

function buildCountryQuestions(page: UniversalContentPage): HubQuestion[] {
  const restricted = page.rules.filter((rule) => rule.cabin === 'Restricted' || rule.checked === 'Restricted').length;
  const blocked = page.rules.filter((rule) => rule.cabin === 'Not allowed' || rule.checked === 'Not allowed').length;

  return [
    {
      question: `What must I check before travelling to ${page.name}?`,
      answer: `Review destination customs, declarations, medicine controls and biosecurity rules. This hub currently contains ${page.rules.length} linked travel checks, including ${restricted} restricted and ${blocked} not-allowed outcomes across cabin or checked baggage.`,
      href: firstRuleHref(page),
      linkLabel: 'Open a detailed travel check',
    },
    {
      question: `Does airport security approval mean an item can enter ${page.name}?`,
      answer: 'No. Airport security determines whether an item can pass screening, but customs and border authorities decide whether it can enter the destination. Food, medicine, plants and animal products commonly need separate checks.',
    },
    {
      question: `Should I declare an item when arriving in ${page.name}?`,
      answer: 'Declare goods whenever the arrival form or border guidance requires it, and declare uncertain items rather than assuming they are permitted. The final decision belongs to the destination authority.',
      href: '/trip-checker/',
      linkLabel: 'Build a destination checklist',
    },
    {
      question: `Are airline rules enough for a trip to ${page.name}?`,
      answer: 'No. Airline baggage rules, departure security and destination customs are three separate layers. Check all three for important or unusual items.',
    },
  ];
}

export function getTrafficHubProfile(page: UniversalContentPage): TrafficHubProfile | undefined {
  if (page.kind !== 'airline' && page.kind !== 'country') return undefined;

  const isAirline = page.kind === 'airline';

  return {
    heading: isAirline
      ? `${page.name} baggage rules at a glance`
      : `Planning a trip to ${page.name}`,
    intro: isAirline
      ? `Use the live rule collection below to compare common items for ${page.name}, then confirm important restrictions with the airline and your departure airport.`
      : `Use these linked checks to prepare for security, customs and arrival requirements for ${page.name}.`,
    statusSummary: buildStatusSummary(page.rules),
    topics: buildTopics(page),
    questions: isAirline ? buildAirlineQuestions(page) : buildCountryQuestions(page),
    tripCheckerLabel: isAirline
      ? `Check my full ${page.name} packing list`
      : `Build my ${page.name} packing checklist`,
  };
}

export function buildHubFaqJsonLd(page: UniversalContentPage, profile: TrafficHubProfile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: profile.questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
