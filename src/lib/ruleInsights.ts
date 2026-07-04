import { rules, type Rule, type RuleStatus } from '@/data/rules';

export function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function statusTone(status: RuleStatus) {
  if (status === 'Allowed') return 'green';
  if (status === 'Not allowed') return 'red';
  return 'amber';
}

export function statusLabel(status: RuleStatus) {
  if (status === 'Allowed') return 'Allowed';
  if (status === 'Not allowed') return 'Not allowed';
  return 'Restricted';
}

export function getRiskLevel(rule: Rule): 'Low' | 'Medium' | 'High' {
  const text = [rule.category, rule.item, rule.shortAnswer, rule.warning || '', ...rule.tags].join(' ').toLowerCase();

  if (
    rule.checked === 'Not allowed' ||
    rule.cabin === 'Not allowed' ||
    text.includes('customs') ||
    text.includes('declare') ||
    text.includes('quarantine') ||
    text.includes('controlled') ||
    text.includes('lithium')
  ) {
    return 'High';
  }

  if (rule.cabin === 'Restricted' || rule.checked === 'Restricted' || rule.warning) return 'Medium';

  return 'Low';
}

export function getDecisionScore(rule: Rule) {
  let score = 94;

  if (rule.cabin === 'Restricted') score -= 8;
  if (rule.cabin === 'Not allowed') score -= 20;
  if (rule.checked === 'Restricted') score -= 6;
  if (rule.checked === 'Not allowed') score -= 10;
  if (rule.warning) score -= 6;

  const risk = getRiskLevel(rule);
  if (risk === 'High') score -= 6;
  if (risk === 'Medium') score -= 3;

  return Math.max(65, Math.min(98, score));
}

export function getConfidenceLabel(score: number) {
  if (score >= 90) return 'High confidence';
  if (score >= 78) return 'Good confidence';
  return 'Check carefully';
}

export function getMonthYear(dateText: string) {
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) return dateText;
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export function getRelatedRules(current: Rule, limit = 6) {
  return rules
    .filter((rule) => rule.slug !== current.slug)
    .map((rule) => {
      let score = 0;
      if (rule.category === current.category) score += 5;
      score += rule.tags.filter((tag) => current.tags.includes(tag)).length * 2;
      if (rule.cabin === current.cabin) score += 1;
      return { rule, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.rule);
}

export function getPeopleAlsoSearch(rule: Rule) {
  const base = new Set<string>();
  rule.tags.forEach((tag) => base.add(tag));

  if (rule.category === 'Batteries') {
    ['portable charger', 'battery pack', 'lithium battery', 'camera battery', 'laptop charger'].forEach((item) => base.add(item));
  }
  if (rule.category === 'Medication') {
    ['insulin', 'diabetes medicine', 'liquid medicine', 'prescription tablets', 'doctor letter'].forEach((item) => base.add(item));
  }
  if (rule.category === 'Baby travel') {
    ['baby formula', 'baby milk', 'baby food', 'stroller', 'breast milk'].forEach((item) => base.add(item));
  }
  if (rule.category === 'Food & customs') {
    ['food customs', 'chocolate', 'fruit', 'meat', 'packed snacks'].forEach((item) => base.add(item));
  }
  if (rule.category === 'Liquids' || rule.category === 'Cosmetics') {
    ['100ml liquids', 'perfume', 'deodorant', 'toiletries', 'aerosol'].forEach((item) => base.add(item));
  }

  return Array.from(base).slice(0, 8);
}

export function getSourceChecks(rule: Rule) {
  const sources = [
    {
      title: 'Airline baggage rules',
      description: 'Check your airline rules before flying, especially for restricted items or batteries.',
    },
    {
      title: 'Airport security guidance',
      description: 'Airport security can make the final decision during screening.',
    },
  ];

  const needsCustoms = rule.category === 'Food & customs' || rule.tags.some((tag) => ['customs', 'declare', 'japan', 'quarantine'].includes(tag));
  if (needsCustoms) {
    sources.push({
      title: 'Destination customs authority',
      description: 'Customs rules can vary by country and may require declaration or approval.',
    });
  }

  return sources;
}

export function getProductRecommendations(rule: Rule) {
  if (rule.category === 'Batteries') return ['Travel-safe power bank', 'Electronics organiser', 'Cable pouch'];
  if (rule.category === 'Medication') return ['Medicine travel organiser', 'Prescription document pouch', 'Cooling pouch'];
  if (rule.category === 'Baby travel') return ['Baby travel pouch', 'Formula container', 'Insulated bottle bag'];
  if (rule.category === 'Liquids') return ['Clear liquids bag', 'Travel bottle set', 'Leakproof toiletry pouch'];
  if (rule.category === 'Cosmetics') return ['Travel-size toiletries', 'Clear cosmetic pouch', 'Solid toiletries'];
  if (rule.category === 'Food & customs') return ['Travel snack organiser', 'Reusable food pouch', 'Document pouch for declarations'];
  return ['Packing cubes', 'Cabin luggage organiser', 'Travel document pouch'];
}

export function buildRuleJsonLd(rule: Rule) {
  const url = `https://canibringitnow.com/rules/${rule.slug}/`;
  const faqs = [
    {
      question: `Can I bring ${rule.item}?`,
      answer: rule.shortAnswer,
    },
    {
      question: `Can I take ${rule.item} in cabin baggage?`,
      answer: `Cabin baggage status: ${rule.cabin}. Always check your airline and airport security guidance before travelling.`,
    },
    {
      question: `Can I pack ${rule.item} in checked baggage?`,
      answer: `Checked baggage status: ${rule.checked}. Restrictions can vary by airline, airport and destination.`,
    },
  ];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${rule.item} | Can I Bring It Now`,
      description: rule.shortAnswer,
      url,
      dateModified: rule.updated,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Can I Bring It Now',
        url: 'https://canibringitnow.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://canibringitnow.com/' },
        { '@type': 'ListItem', position: 2, name: rule.category, item: `https://canibringitnow.com/categories/${slugify(rule.category)}/` },
        { '@type': 'ListItem', position: 3, name: rule.item, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];
}
