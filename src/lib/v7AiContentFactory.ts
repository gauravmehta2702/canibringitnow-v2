import { airlines, countries, rules } from '@/data/rules';

export type ContentFactoryItem = {
  title: string;
  href: string;
  type: string;
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
  prompt: string;
};

function pick<T>(items: T[], count: number) {
  return items.slice(0, count);
}

export function getAiContentFactoryQueue(): ContentFactoryItem[] {
  const topRules = pick(rules, 8);
  const topAirlines = pick(airlines, 5);
  const topCountries = pick(countries, 5);

  const seoPages = topRules.slice(0, 6).map((rule) => ({
    title: `${rule.item}: full travel rule guide`,
    href: `/rules/${rule.slug}/`,
    type: 'SEO refresh',
    priority: 'High' as const,
    reason: 'Core travel rule page with high long-tail potential.',
    prompt: `Improve the page for ${rule.item}. Add clearer cabin vs checked guidance, FAQs, related items, airline/country search paths and preparation tips.`,
  }));

  const airlinePages = topRules.slice(0, 5).flatMap((rule) =>
    topAirlines.slice(0, 3).map((airline) => {
      const q = `${rule.item} on ${airline}`;
      return {
        title: q,
        href: `/search/?q=${encodeURIComponent(q)}`,
        type: 'Airline SEO',
        priority: 'High' as const,
        reason: 'High-intent airline + item search combination.',
        prompt: `Create a helpful guide for "${q}". Include cabin rules, checked baggage, airline verification warning, FAQs and internal links.`,
      };
    }),
  );

  const countryPages = topRules.slice(0, 5).flatMap((rule) =>
    topCountries.slice(0, 3).map((country) => {
      const q = `${rule.item} to ${country}`;
      return {
        title: q,
        href: `/search/?q=${encodeURIComponent(q)}`,
        type: 'Country SEO',
        priority: 'Medium' as const,
        reason: 'Destination and customs-style search combination.',
        prompt: `Create a useful destination guide section for "${q}". Include customs warning, airport security, packing and related rules.`,
      };
    }),
  );

  return [...seoPages, ...airlinePages, ...countryPages].slice(0, 30);
}

export function getVideoScriptQueue(): ContentFactoryItem[] {
  return rules.slice(0, 12).map((rule) => ({
    title: `Can you take ${rule.item.toLowerCase()} on a plane?`,
    href: `/rules/${rule.slug}/`,
    type: 'Short video',
    priority: 'Medium' as const,
    reason: 'Simple travel question suitable for Shorts/Reels/TikTok.',
    prompt: `Create a 25-35 second vertical video script about ${rule.item}. Hook: "Can you take this on a plane?" Explain cabin/checked basics and end with "Check before you fly at CanIBringItNow.com".`,
  }));
}

export function getPinterestQueue(): ContentFactoryItem[] {
  const topics = [
    'Airport security checklist',
    'Power bank flight rules',
    'Medication travel checklist',
    'Baby formula airport security',
    'Liquids hand luggage guide',
    'Japan packing checklist',
    'Emirates baggage checklist',
    'Family travel packing list',
  ];

  return topics.map((topic) => ({
    title: topic,
    href: `/search/?q=${encodeURIComponent(topic)}`,
    type: 'Pinterest pin',
    priority: 'Low' as const,
    reason: 'Evergreen visual travel preparation content.',
    prompt: `Create a Pinterest pin concept for "${topic}" with a clear title, 5 bullet tips and a call-to-action to CanIBringItNow.com.`,
  }));
}

export function getWeeklyActionPlan() {
  return [
    'Review 10 high-priority SEO ideas.',
    'Publish or improve 3 rule pages.',
    'Create 3 short video scripts.',
    'Create 5 Pinterest pins.',
    'Answer 2 Quora/Reddit questions only where helpful.',
    'Check Search Console once available.',
    'Add internal links from new content to rule, airline, country and trip-planner pages.',
  ];
}
