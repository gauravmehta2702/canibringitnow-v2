import { rules } from '@/data/rules';

export function getVisitorPaths() {
  return [
    {
      title: 'I know the item',
      href: '/search/',
      description: 'Search the item directly, for example power bank, medication, liquids or baby formula.',
    },
    {
      title: 'I know the airline',
      href: '/airline-hub/',
      description: 'Start with the airline, then open item-specific rules.',
    },
    {
      title: 'I know the destination',
      href: '/country-hub/',
      description: 'Start with the country, then check customs-style travel guidance.',
    },
    {
      title: 'I want a full trip answer',
      href: '/v2-travel-brain/',
      description: 'Use the AI Travel Brain for a combined answer.',
    },
    {
      title: 'I need a packing list',
      href: '/packing-planner/',
      description: 'Generate a checklist for destination, airline and trip length.',
    },
    {
      title: 'I want popular checks',
      href: '/trending/',
      description: 'Browse common questions other travellers ask.',
    },
  ];
}

export function getFastRuleShortcuts(limit = 12) {
  return rules.slice(0, limit).map((rule) => ({
    title: rule.item,
    href: `/rules/${rule.slug}/`,
    description: rule.shortAnswer,
  }));
}
