import { airlines, countries, rules, type Rule } from '@/data/rules';

export type AtlasSearchResult = {
  rule: Rule;
  score: number;
  reasons: string[];
};

export type AtlasSearchIntent = {
  query: string;
  normalised: string;
  terms: string[];
  expandedTerms: string[];
  detectedAirlines: string[];
  detectedCountries: string[];
  detectedCategories: string[];
  detectedIntent: string[];
};

export type AtlasSearchCluster = {
  title: string;
  href: string;
  label: string;
  description: string;
};

const intentGroups: Record<string, string[]> = {
  medication: [
    'medication',
    'medicine',
    'medicines',
    'tablet',
    'tablets',
    'pill',
    'pills',
    'prescription',
    'doctor letter',
    'insulin',
    'diabetes',
    'diabetic',
    'injection',
    'medical',
    'drug',
    'pharmacy',
    'controlled medicine',
    'painkiller',
    'paracetamol',
    'ibuprofen',
  ],
  battery: [
    'power bank',
    'powerbank',
    'portable charger',
    'battery pack',
    'external battery',
    'lithium',
    'lithium battery',
    'spare battery',
    'camera battery',
    'drone battery',
    'phone charger',
    'charger',
    'usb charger',
    'charging bank',
    'mAh',
    'wh rating',
  ],
  liquids: [
    'liquids',
    'liquid',
    '100ml',
    'toiletries',
    'gel',
    'cream',
    'spray',
    'aerosol',
    'perfume',
    'aftershave',
    'cologne',
    'deodorant',
    'shampoo',
    'makeup',
  ],
  baby: [
    'baby',
    'infant',
    'toddler',
    'formula',
    'baby formula',
    'baby milk',
    'infant milk',
    'breast milk',
    'baby food',
    'stroller',
    'pram',
    'pushchair',
    'bottle',
    'nappies',
  ],
  food: [
    'food',
    'snack',
    'snacks',
    'fruit',
    'meat',
    'cheese',
    'chocolate',
    'protein powder',
    'powder',
    'supplement',
    'customs',
    'declare',
    'import',
    'fresh food',
    'packed food',
  ],
  electronics: [
    'electronics',
    'laptop',
    'computer',
    'macbook',
    'tablet',
    'ipad',
    'camera',
    'gopro',
    'drone',
    'headphones',
    'charger',
    'adapter',
    'usb',
    'portable monitor',
  ],
  grooming: [
    'razor',
    'blade',
    'shaving',
    'trimmer',
    'scissors',
    'nail cutter',
    'grooming',
    'electric razor',
  ],
};

const phraseBoosts: Record<string, string[]> = {
  'hand luggage': ['cabin', 'carry on', 'carry-on', 'hand baggage'],
  'cabin bag': ['hand luggage', 'carry on', 'carry-on', 'cabin baggage'],
  'checked bag': ['checked luggage', 'hold luggage', 'checked baggage', 'hold baggage'],
  customs: ['declare', 'destination', 'border', 'import'],
  airline: ['baggage', 'cabin', 'checked', 'policy'],
};

export function atlasNormalise(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenise(value: string) {
  return atlasNormalise(value)
    .split(' ')
    .filter((term) => term.length > 1);
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function includesLoose(haystack: string, needle: string) {
  const h = atlasNormalise(haystack);
  const n = atlasNormalise(needle);
  return h.includes(n) || n.includes(h);
}

function fuzzyMatch(a: string, b: string) {
  if (a.length < 4 || b.length < 4) return false;
  return a.includes(b) || b.includes(a) || a.slice(0, 5) === b.slice(0, 5);
}

export function analyseAtlasSearch(query: string): AtlasSearchIntent {
  const normalised = atlasNormalise(query);
  const terms = tokenise(query);
  const expanded = new Set<string>(terms);

  Object.entries(intentGroups).forEach(([intent, synonyms]) => {
    const hit = normalised.includes(intent) || synonyms.some((synonym) => normalised.includes(atlasNormalise(synonym)));
    if (hit) {
      expanded.add(intent);
      synonyms.forEach((synonym) => tokenise(synonym).forEach((term) => expanded.add(term)));
    }
  });

  Object.entries(phraseBoosts).forEach(([phrase, synonyms]) => {
    if (normalised.includes(phrase) || synonyms.some((synonym) => normalised.includes(atlasNormalise(synonym)))) {
      tokenise(phrase).forEach((term) => expanded.add(term));
      synonyms.forEach((synonym) => tokenise(synonym).forEach((term) => expanded.add(term)));
    }
  });

  const detectedAirlines = airlines.filter((airline) => includesLoose(normalised, airline));
  const detectedCountries = countries.filter((country) => includesLoose(normalised, country));
  const detectedCategories = unique(
    Object.keys(intentGroups).filter((intent) =>
      normalised.includes(intent) || intentGroups[intent].some((synonym) => normalised.includes(atlasNormalise(synonym))),
    ),
  );

  const detectedIntent = unique([
    ...detectedCategories,
    detectedAirlines.length ? 'airline-specific' : '',
    detectedCountries.length ? 'country-specific' : '',
    normalised.includes('customs') || normalised.includes('declare') ? 'customs' : '',
    normalised.includes('checked') ? 'checked baggage' : '',
    normalised.includes('cabin') || normalised.includes('hand luggage') || normalised.includes('carry on') ? 'cabin baggage' : '',
  ]);

  return {
    query,
    normalised,
    terms,
    expandedTerms: unique(Array.from(expanded)),
    detectedAirlines,
    detectedCountries,
    detectedCategories,
    detectedIntent,
  };
}

export function atlasSearch(query: string, limit = 12): AtlasSearchResult[] {
  const intent = analyseAtlasSearch(query);
  if (!intent.normalised) {
    return rules.slice(0, limit).map((rule, index) => ({
      rule,
      score: Math.max(1, 100 - index),
      reasons: ['Popular travel rule'],
    }));
  }

  return rules
    .map((rule) => {
      const item = atlasNormalise(rule.item);
      const category = atlasNormalise(rule.category);
      const answer = atlasNormalise(rule.shortAnswer);
      const tags = rule.tags.map(atlasNormalise);
      const restrictions = rule.restrictions.map(atlasNormalise);
      const tips = rule.tips.map(atlasNormalise);
      const allText = [item, category, answer, ...tags, ...restrictions, ...tips, atlasNormalise(rule.sourceNote)].join(' ');

      let score = 0;
      const reasons: string[] = [];

      if (item === intent.normalised) {
        score += 90;
        reasons.push('Exact item match');
      }

      if (item.includes(intent.normalised)) {
        score += 55;
        reasons.push('Item contains your search');
      }

      if (tags.some((tag) => tag === intent.normalised || intent.normalised.includes(tag))) {
        score += 35;
        reasons.push('Tag match');
      }

      for (const airline of intent.detectedAirlines) {
        if (allText.includes(atlasNormalise(airline))) {
          score += 32;
          reasons.push(`${airline} match`);
        }
      }

      for (const country of intent.detectedCountries) {
        if (allText.includes(atlasNormalise(country))) {
          score += 32;
          reasons.push(`${country} match`);
        }
      }

      for (const categoryIntent of intent.detectedCategories) {
        if (category.includes(categoryIntent) || allText.includes(categoryIntent)) {
          score += 18;
          reasons.push(`${categoryIntent} intent`);
        }
      }

      intent.expandedTerms.forEach((term) => {
        if (item.includes(term)) score += 9;
        if (tags.some((tag) => tag.includes(term))) score += 8;
        if (category.includes(term)) score += 5;
        if (answer.includes(term)) score += 4;
        if (restrictions.some((restriction) => restriction.includes(term))) score += 4;
        if (tips.some((tip) => tip.includes(term))) score += 3;
        if (allText.includes(term)) score += 1;
        if (fuzzyMatch(item, term) || tags.some((tag) => fuzzyMatch(tag, term))) score += 2;
      });

      if (intent.normalised.includes('checked') && rule.checked !== 'Allowed') score += 10;
      if ((intent.normalised.includes('cabin') || intent.normalised.includes('hand luggage') || intent.normalised.includes('carry on')) && rule.cabin !== 'Allowed') score += 10;
      if ((intent.normalised.includes('can i') || intent.normalised.includes('bring') || intent.normalised.includes('take')) && rule.shortAnswer) score += 4;

      return { rule, score, reasons: unique(reasons).slice(0, 4) };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.rule.item.localeCompare(b.rule.item))
    .slice(0, limit);
}

export function atlasSmartSearch(query: string, limit = 12): Rule[] {
  return atlasSearch(query, limit).map((result) => result.rule);
}

export function getAtlasSmartAnswer(query: string) {
  return atlasSearch(query, 1)[0]?.rule || null;
}

export function getAtlasSearchSuggestions(query: string, limit = 8) {
  const intent = analyseAtlasSearch(query);
  const results = atlasSearch(query, limit);
  const suggestions = results.map((result) => result.rule.item);

  const extras: string[] = [];
  const mainItem = suggestions[0] || intent.query || 'power bank';

  if (intent.detectedAirlines.length === 0) {
    airlines.slice(0, 3).forEach((airline) => extras.push(`${mainItem} on ${airline}`));
  }

  if (intent.detectedCountries.length === 0) {
    countries.slice(0, 3).forEach((country) => extras.push(`${mainItem} to ${country}`));
  }

  return unique([...suggestions, ...extras]).slice(0, limit);
}

export function getAtlasSearchClusters(query: string): AtlasSearchCluster[] {
  const intent = analyseAtlasSearch(query);
  const best = atlasSearch(query, 1)[0]?.rule;
  const item = best?.item || query || 'Power bank';

  const airline = intent.detectedAirlines[0] || 'Emirates';
  const country = intent.detectedCountries[0] || 'Japan';

  return [
    {
      title: `${item} on ${airline}`,
      href: `/search/?q=${encodeURIComponent(`${item} on ${airline}`)}`,
      label: 'Airline check',
      description: `Check this item with ${airline} baggage context.`,
    },
    {
      title: `${item} to ${country}`,
      href: `/search/?q=${encodeURIComponent(`${item} to ${country}`)}`,
      label: 'Destination check',
      description: `Check this item with ${country} destination/customs context.`,
    },
    {
      title: `${item} in cabin baggage`,
      href: `/search/?q=${encodeURIComponent(`${item} in cabin baggage`)}`,
      label: 'Cabin bag',
      description: 'Check whether the item belongs in hand luggage.',
    },
    {
      title: `${item} in checked baggage`,
      href: `/search/?q=${encodeURIComponent(`${item} in checked baggage`)}`,
      label: 'Checked bag',
      description: 'Check whether the item can go in the hold.',
    },
    {
      title: `Ask a complete trip question`,
      href: `/trip-planner/`,
      label: 'Trip planner',
      description: 'Combine your airline, destination, travellers and items.',
    },
    {
      title: `Travel Intelligence`,
      href: `/travel-intelligence/`,
      label: 'Connected answer',
      description: 'Use the travel intelligence engine for a connected answer.',
    },
  ];
}
