import { airlines, rules, type Rule, type RuleStatus } from '@/data/rules';
import { airlineSlug } from '@/lib/airlineUtils';
import { getBaseItemName, itemSlug } from '@/lib/itemUtils';
import { getRuleGraphContext } from '@/lib/travelIntelligenceGraph';

export type AuthoritySourceCard = {
  id: string;
  title: string;
  description: string;
  status: 'verified' | 'editorial' | 'required';
  href?: string;
  checkedOn?: string;
};

export type AirlineComparisonRow = {
  airline: string;
  slug: string;
  ruleSlug: string;
  cabin: RuleStatus;
  checked: RuleStatus;
  warning?: string;
  isCurrent: boolean;
};

export type PeopleAskAnswer = {
  question: string;
  answer: string;
  href?: string;
  linkLabel?: string;
};

function normalise(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
}

function findNamedAirline(rule: Rule) {
  const haystack = ` ${normalise([rule.item, ...rule.tags].join(' '))} `;
  return airlines.find((airline) => haystack.includes(` ${normalise(airline)} `));
}

function formatAuthorityType(type: string) {
  return type
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getAuthoritySourceCards(rule: Rule): AuthoritySourceCard[] {
  const context = getRuleGraphContext(rule.slug);
  const airline = findNamedAirline(rule);
  const cards: AuthoritySourceCard[] = [];

  context?.sources.forEach((source) => {
    cards.push({
      id: source.id,
      title: source.title,
      description:
        source.status === 'verified'
          ? `A named ${formatAuthorityType(source.authorityType).toLowerCase()} source has been attached to this rule.`
          : 'This is an editorial summary. It is not presented as a substitute for current official policy.',
      status: source.status === 'verified' ? 'verified' : 'editorial',
      href: source.url,
      checkedOn: source.checkedOn,
    });
  });

  context?.missingSourceTypes.forEach((type) => {
    const id = `required-${type}`;
    if (cards.some((card) => card.id === id)) return;

    const destination = type === 'customs' ? 'destination customs or government authority' : formatAuthorityType(type).toLowerCase();
    cards.push({
      id,
      title: `${formatAuthorityType(type)} verification required`,
      description: `Confirm this rule with the current ${destination} before relying on it for travel.`,
      status: 'required',
      href: airline && type === 'airline' ? `/airlines/${airlineSlug(airline)}/` : undefined,
    });
  });

  if (cards.length === 0) {
    cards.push({
      id: 'editorial-fallback',
      title: 'Editorial travel guidance',
      description: 'This page summarises general baggage and travel guidance. Verify important restrictions with official sources before departure.',
      status: 'editorial',
    });
  }

  return cards.slice(0, 6);
}

export function getAirlineComparisonRows(rule: Rule, limit = 8): AirlineComparisonRow[] {
  const baseSlug = itemSlug(getBaseItemName(rule.item));
  const currentAirline = findNamedAirline(rule);

  const rows = rules
    .filter((candidate) => itemSlug(getBaseItemName(candidate.item)) === baseSlug)
    .map((candidate) => {
      const airline = findNamedAirline(candidate);
      if (!airline) return undefined;
      return {
        airline,
        slug: airlineSlug(airline),
        ruleSlug: candidate.slug,
        cabin: candidate.cabin,
        checked: candidate.checked,
        warning: candidate.warning,
        isCurrent: candidate.slug === rule.slug,
      } satisfies AirlineComparisonRow;
    })
    .filter(Boolean) as AirlineComparisonRow[];

  const unique = Array.from(new Map(rows.map((row) => [row.airline, row])).values());
  unique.sort((a, b) => {
    if (a.isCurrent) return -1;
    if (b.isCurrent) return 1;
    if (currentAirline && a.airline === currentAirline) return -1;
    return a.airline.localeCompare(b.airline);
  });

  return unique.slice(0, limit);
}

export function getPeopleAskAnswers(rule: Rule): PeopleAskAnswer[] {
  const baseItem = getBaseItemName(rule.item);
  const airline = findNamedAirline(rule);
  const itemHref = `/items/${itemSlug(baseItem)}/`;
  const answers: PeopleAskAnswer[] = [
    {
      question: `Can I take ${baseItem.toLowerCase()} in cabin baggage?`,
      answer: `The cabin-baggage status on this page is ${rule.cabin}. Packaging, quantity, battery, liquid or documentation conditions may still apply.`,
      href: `/rules/${rule.slug}/#cabin-and-checked-comparison`,
      linkLabel: 'Compare cabin and checked baggage',
    },
    {
      question: `Can I put ${baseItem.toLowerCase()} in checked baggage?`,
      answer: `The checked-baggage status on this page is ${rule.checked}. A cabin allowance does not automatically mean checked baggage is permitted.`,
      href: `/rules/${rule.slug}/#cabin-and-checked-comparison`,
      linkLabel: 'See the baggage decision',
    },
    {
      question: `What should I verify before travelling with ${baseItem.toLowerCase()}?`,
      answer: 'Check the operating airline, departure-airport security guidance and any destination customs or import rules that apply to the item.',
      href: '/official-source-center/',
      linkLabel: 'Open the official-source centre',
    },
    {
      question: `Are ${baseItem.toLowerCase()} rules the same on every airline?`,
      answer: airline
        ? `No. This page is written for ${airline}, and another carrier may apply different limits, packaging rules or approval requirements.`
        : 'No. Airlines may apply different limits, packaging rules or approval requirements even when the general safety principle is similar.',
      href: itemHref,
      linkLabel: `Compare ${baseItem.toLowerCase()} rules`,
    },
  ];

  if (rule.warning) {
    answers.push({
      question: `What is the main warning for ${baseItem.toLowerCase()}?`,
      answer: rule.warning,
    });
  }

  return answers.slice(0, 5);
}

export function getNextReviewDate(updated: string) {
  const date = new Date(updated);
  if (Number.isNaN(date.getTime())) return 'Review scheduled';
  date.setMonth(date.getMonth() + 3);
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}
