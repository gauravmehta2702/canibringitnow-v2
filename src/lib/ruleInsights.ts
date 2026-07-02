import { rules, type Rule, type RuleStatus } from '@/data/rules';

export type RiskLevel = 'Low' | 'Medium' | 'High';

export type SourceType = 'Airline' | 'Airport security' | 'Customs' | 'Government' | 'General';

export type RuleSource = {
  label: string;
  type: SourceType;
  note: string;
};

function sharedTagCount(a: Rule, b: Rule) {
  return b.tags.filter((tag) => a.tags.includes(tag)).length;
}

export function getRuleBySlug(slug: string) {
  return rules.find((rule) => rule.slug === slug);
}

export function getRelatedRules(rule: Rule, limit = 6) {
  return rules
    .filter((candidate) => candidate.slug !== rule.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === rule.category) score += 5;
      score += sharedTagCount(rule, candidate) * 2;
      if (candidate.cabin === rule.cabin) score += 1;
      if (candidate.checked === rule.checked) score += 1;
      return { rule: candidate, score };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((candidate) => candidate.rule);
}

export function getRiskLevel(rule: Rule): RiskLevel {
  const warningText = `${rule.warning || ''} ${rule.shortAnswer} ${rule.restrictions.join(' ')}`.toLowerCase();

  if (rule.checked === 'Not allowed' || warningText.includes('customs') || warningText.includes('controlled') || warningText.includes('restricted')) {
    return 'High';
  }

  if (rule.cabin === 'Restricted' || rule.checked === 'Restricted' || rule.warning) {
    return 'Medium';
  }

  return 'Low';
}

export function getDecisionScore(rule: Rule) {
  let score = 94;
  const risk = getRiskLevel(rule);

  if (risk === 'High') score -= 14;
  if (risk === 'Medium') score -= 7;
  if (rule.cabin === 'Restricted') score -= 4;
  if (rule.checked === 'Restricted') score -= 4;
  if (rule.checked === 'Not allowed') score -= 3;
  if (rule.warning) score -= 2;

  return Math.max(60, Math.min(98, score));
}

export function getConfidenceLabel(score: number) {
  if (score >= 90) return 'High confidence';
  if (score >= 78) return 'Good confidence';
  return 'Check carefully';
}

export function getStatusTone(status: RuleStatus) {
  if (status === 'Allowed') return 'green';
  if (status === 'Not allowed') return 'red';
  return 'amber';
}

export function getStatusSummary(status: RuleStatus) {
  if (status === 'Allowed') return 'Usually allowed';
  if (status === 'Not allowed') return 'Usually not allowed';
  return 'Allowed with restrictions';
}

export function getOfficialSources(rule: Rule): RuleSource[] {
  const sources: RuleSource[] = [
    {
      label: 'Airline baggage rules',
      type: 'Airline',
      note: 'Confirm size, weight and item-specific restrictions with your airline before flying.',
    },
    {
      label: 'Departure airport security guidance',
      type: 'Airport security',
      note: 'Airport screening staff can make the final decision at security.',
    },
  ];

  if (rule.category.toLowerCase().includes('food') || rule.shortAnswer.toLowerCase().includes('customs') || rule.sourceNote.toLowerCase().includes('customs')) {
    sources.push({
      label: 'Destination customs authority',
      type: 'Customs',
      note: 'Customs rules depend on the destination country and the exact item being carried.',
    });
  }

  if (rule.category.toLowerCase().includes('medication') || rule.tags.some((tag) => ['medicine', 'medication', 'prescription'].includes(tag))) {
    sources.push({
      label: 'Destination medicine import guidance',
      type: 'Government',
      note: 'Some medicines may be controlled or require documentation when travelling internationally.',
    });
  }

  return sources;
}

export function getRuleFaqs(rule: Rule) {
  const item = rule.item.toLowerCase();

  return [
    {
      question: `Can I bring ${item}?`,
      answer: rule.shortAnswer,
    },
    {
      question: `Can ${item} go in cabin baggage?`,
      answer: `Cabin baggage status: ${rule.cabin}. ${getStatusSummary(rule.cabin)}. Always check the latest airport security rules before travelling.`,
    },
    {
      question: `Can ${item} go in checked baggage?`,
      answer: `Checked baggage status: ${rule.checked}. ${getStatusSummary(rule.checked)}. Airline and safety rules can vary, so confirm before flying.`,
    },
    {
      question: 'Who makes the final decision at the airport?',
      answer: 'Airport security officers, airline staff and customs officers can make the final decision. Use this page as guidance and verify important restrictions before travel.',
    },
  ];
}

export function getAffiliateIdeas(rule: Rule) {
  if (!rule.affiliateType) return [];

  const category = rule.category.toLowerCase();

  if (category.includes('battery')) {
    return ['Travel-safe power banks', 'Cable organisers', 'Electronics pouch'];
  }

  if (category.includes('baby')) {
    return ['Baby travel pouch', 'Insulated bottle bag', 'Compact changing kit'];
  }

  if (category.includes('medication')) {
    return ['Medicine travel organiser', 'Cooling pouch', 'Document wallet'];
  }

  if (category.includes('liquid') || category.includes('cosmetic')) {
    return ['Clear liquids bag', 'Refillable travel bottles', 'Toiletry organiser'];
  }

  if (category.includes('food')) {
    return ['Travel snack organiser', 'Reusable food pouch', 'Packing labels'];
  }

  return [rule.affiliateType, 'Travel organiser', 'Packing accessories'];
}

export function buildRuleJsonLd(rule: Rule, url: string) {
  const faqs = getRuleFaqs(rule);

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
        { '@type': 'ListItem', position: 2, name: rule.category, item: `https://canibringitnow.com/categories/${rule.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/` },
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
