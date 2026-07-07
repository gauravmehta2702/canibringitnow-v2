import { airlines, countries, rules, type Rule, type RuleStatus } from '@/data/rules';

export type AtlasLink = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export type AtlasTimelineStage = {
  title: string;
  label: string;
  items: string[];
};

export function atlasSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function atlasStatusLabel(status: RuleStatus) {
  if (status === 'Allowed') return 'Allowed';
  if (status === 'Not allowed') return 'Not allowed';
  return 'Restricted';
}

export function atlasStatusEmoji(status: RuleStatus) {
  if (status === 'Allowed') return '✅';
  if (status === 'Not allowed') return '❌';
  return '⚠️';
}

export function getAtlasFeaturedAnswer(rule: Rule) {
  const cabin = `${atlasStatusEmoji(rule.cabin)} Cabin bag: ${atlasStatusLabel(rule.cabin)}`;
  const checked = `${atlasStatusEmoji(rule.checked)} Checked bag: ${atlasStatusLabel(rule.checked)}`;

  return {
    title: `Can I bring ${rule.item}?`,
    answer: rule.shortAnswer,
    cabin,
    checked,
    snippet: `${rule.shortAnswer} ${cabin}. ${checked}. Always verify important restrictions with your airline or destination authority before flying.`,
  };
}

export function getAtlasRiskReason(rule: Rule) {
  const text = [rule.item, rule.category, rule.shortAnswer, rule.warning || '', ...rule.tags].join(' ').toLowerCase();

  if (rule.cabin === 'Not allowed' || rule.checked === 'Not allowed') {
    return 'One or more baggage types are marked as not allowed.';
  }

  if (text.includes('battery') || text.includes('lithium') || text.includes('power')) {
    return 'Battery and electronics rules often vary by airline and capacity.';
  }

  if (text.includes('medicine') || text.includes('medication') || text.includes('controlled')) {
    return 'Medication rules may depend on prescriptions, destination rules and controlled-substance restrictions.';
  }

  if (text.includes('food') || text.includes('customs') || text.includes('declare')) {
    return 'Food and customs rules may vary significantly by destination.';
  }

  if (rule.cabin === 'Restricted' || rule.checked === 'Restricted') {
    return 'The item is restricted and needs extra checks before travel.';
  }

  return 'This looks like a lower-risk item, but travellers should still confirm important details before flying.';
}

export function getAtlasAuthorityScore(rule: Rule) {
  let score = 55;
  if (rule.shortAnswer.length > 80) score += 8;
  if (rule.warning) score += 8;
  if (rule.restrictions.length >= 3) score += 8;
  if (rule.tips.length >= 3) score += 8;
  if (rule.sourceNote.length > 40) score += 8;
  if (rule.tags.length >= 3) score += 5;
  return Math.min(100, score);
}

export function getAtlasAuthorityLabel(score: number) {
  if (score >= 85) return 'Strong';
  if (score >= 70) return 'Good';
  return 'Needs review';
}

export function getAtlasReadingTime(rule: Rule) {
  const words = [
    rule.item,
    rule.shortAnswer,
    rule.warning || '',
    ...rule.restrictions,
    ...rule.tips,
    rule.sourceNote,
  ].join(' ').split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 180));
}

export function getAtlasEntityLinks(rule: Rule, limit = 18): AtlasLink[] {
  const text = [rule.item, rule.category, rule.shortAnswer, rule.warning || '', ...rule.tags].join(' ').toLowerCase();

  const categoryLinks: AtlasLink[] = [
    {
      title: `${rule.category} rules`,
      href: `/categories/${atlasSlug(rule.category)}/`,
      label: 'Category',
      description: `Browse more travel checks in ${rule.category}.`,
    },
  ];

  const relatedRuleLinks = rules
    .filter((candidate) => candidate.slug !== rule.slug)
    .map((candidate) => {
      const candidateText = `${candidate.item} ${candidate.category} ${candidate.tags.join(' ')}`.toLowerCase();
      let score = 0;
      if (candidate.category === rule.category) score += 5;
      for (const tag of rule.tags) {
        if (candidateText.includes(tag.toLowerCase())) score += 2;
      }
      for (const word of rule.item.toLowerCase().split(/[^a-z0-9]+/)) {
        if (word.length > 3 && candidateText.includes(word)) score += 1;
      }
      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ candidate }) => ({
      title: candidate.item,
      href: `/rules/${candidate.slug}/`,
      label: candidate.category,
      description: candidate.shortAnswer,
    }));

  const airlineLinks = airlines.slice(0, 5).map((airline) => ({
    title: `${rule.item} on ${airline}`,
    href: `/search/?q=${encodeURIComponent(`${rule.item} on ${airline}`)}`,
    label: 'Airline check',
    description: `Check this item with ${airline} baggage context.`,
  }));

  const countryLinks = countries.slice(0, 5).map((country) => ({
    title: `${rule.item} to ${country}`,
    href: `/search/?q=${encodeURIComponent(`${rule.item} to ${country}`)}`,
    label: 'Country check',
    description: `Check this item with ${country} destination context.`,
  }));

  const utilityLinks: AtlasLink[] = [
    {
      title: 'Trip Planner',
      href: '/trip-planner/',
      label: 'Planner',
      description: 'Build a full preparation plan using your airline, destination and items.',
    },
    {
      title: 'Packing Planner',
      href: '/packing-planner/',
      label: 'Packing',
      description: 'Create a checklist for your trip before you travel.',
    },
    {
      title: 'Travel Intelligence',
      href: '/travel-intelligence/',
      label: 'AI-style guidance',
      description: 'Ask one complete travel question and get connected next steps.',
    },
    {
      title: 'Official Source Center',
      href: '/official-source-center/',
      label: 'Trust',
      description: 'Understand which official sources travellers should verify.',
    },
  ];

  const priorityLinks = text.includes('battery') || text.includes('power')
    ? [
        {
          title: 'Battery and electronics travel checks',
          href: '/search/?q=battery%20electronics%20travel%20rules',
          label: 'Topic cluster',
          description: 'Explore related battery, lithium and electronics checks.',
        },
      ]
    : [];

  return [...categoryLinks, ...priorityLinks, ...relatedRuleLinks, ...airlineLinks, ...countryLinks, ...utilityLinks].slice(0, limit);
}

export function getAtlasFAQs(rule: Rule) {
  const base = [
    {
      question: `Can I bring ${rule.item} in cabin baggage?`,
      answer: `Cabin baggage status: ${atlasStatusLabel(rule.cabin)}. ${rule.shortAnswer}`,
    },
    {
      question: `Can I bring ${rule.item} in checked baggage?`,
      answer: `Checked baggage status: ${atlasStatusLabel(rule.checked)}. Check airline and airport rules before flying.`,
    },
    {
      question: `Can airport security still stop ${rule.item}?`,
      answer: 'Yes. Airport security officers and airline staff can make the final decision at the airport.',
    },
    {
      question: `Should I check official sources before travelling with ${rule.item}?`,
      answer: 'Yes. Rules can change, so verify important restrictions with your airline, airport, customs authority or destination government.',
    },
  ];

  if (rule.warning) {
    base.splice(2, 0, {
      question: `What is the biggest warning for ${rule.item}?`,
      answer: rule.warning,
    });
  }

  return base;
}

export function getAtlasTravelTimeline(rule: Rule): AtlasTimelineStage[] {
  const item = rule.item.toLowerCase();

  return [
    {
      title: 'Before packing',
      label: 'Home',
      items: [
        `Read the cabin and checked baggage decision for ${rule.item}.`,
        'Check the item size, quantity, packaging and documents if relevant.',
        rule.warning || 'If the item is important, verify with your airline before travel.',
      ],
    },
    {
      title: 'At airport security',
      label: 'Security',
      items: [
        'Keep restricted or inspectable items easy to access.',
        'Follow liquid, electronics and battery screening rules where relevant.',
        'Airport security can make the final decision.',
      ],
    },
    {
      title: 'Boarding and flight',
      label: 'Airline',
      items: [
        'Follow airline cabin baggage instructions.',
        rule.cabin === 'Allowed'
          ? `${rule.item} may be allowed in cabin baggage, but airline staff can still check it.`
          : `${rule.item} may not be straightforward in cabin baggage. Check before boarding.`,
        'Do not ignore staff instructions at the gate.',
      ],
    },
    {
      title: 'Arrival and customs',
      label: 'Destination',
      items: [
        'Check destination customs rules for food, medicine, batteries or high-value goods.',
        'Declare items if required by local rules.',
        'When unsure, choose official customs guidance over informal advice.',
      ],
    },
  ];
}

export function getAtlasPeopleAlsoAsk(rule: Rule) {
  const simpleItem = rule.item.replace(/\bon a plane\b/gi, '').trim();
  return [
    `Can I take ${simpleItem} in hand luggage?`,
    `Can I put ${simpleItem} in checked baggage?`,
    `Do airlines allow ${simpleItem}?`,
    `Do I need to declare ${simpleItem} at customs?`,
    `What happens if airport security stops ${simpleItem}?`,
  ];
}

export function buildAtlasJsonLd(rule: Rule) {
  const url = `https://canibringitnow.com/rules/${rule.slug}/`;
  const faqs = getAtlasFAQs(rule);

  return [
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
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://canibringitnow.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: rule.category,
          item: `https://canibringitnow.com/categories/${atlasSlug(rule.category)}/`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: rule.item,
          item: url,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${rule.item}: cabin and checked baggage rules`,
      description: rule.shortAnswer,
      dateModified: rule.updated,
      mainEntityOfPage: url,
      publisher: {
        '@type': 'Organization',
        name: 'Can I Bring It Now',
        url: 'https://canibringitnow.com/',
      },
    },
  ];
}

export function getAtlasAuditSummary() {
  const categoryCount = Array.from(new Set(rules.map((rule) => rule.category))).length;
  const averageAuthority = Math.round(
    rules.reduce((total, rule) => total + getAtlasAuthorityScore(rule), 0) / Math.max(1, rules.length),
  );

  return [
    {
      label: 'Rule pages',
      value: rules.length.toString(),
      description: 'Pages that can benefit from Atlas SEO, schema and internal linking.',
    },
    {
      label: 'Categories',
      value: categoryCount.toString(),
      description: 'Topical clusters that help Google understand site coverage.',
    },
    {
      label: 'Average authority',
      value: `${averageAuthority}/100`,
      description: 'Internal quality score based on content depth, warnings, tips and source notes.',
    },
    {
      label: 'Auto links per rule',
      value: '18+',
      description: 'Related item, airline, country and tool links generated by Atlas.',
    },
  ];
}
