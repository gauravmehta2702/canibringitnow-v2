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


export function getOverallDecision(rule: Rule) {
  if (rule.cabin === 'Allowed' && rule.checked === 'Allowed') return 'Yes — usually allowed for travel';
  if (rule.cabin === 'Allowed' && rule.checked === 'Not allowed') return 'Yes — carry it in cabin baggage only';
  if (rule.cabin === 'Allowed' && rule.checked === 'Restricted') return 'Yes — cabin is safest, checked baggage needs caution';
  if (rule.cabin === 'Restricted') return 'Usually yes — but check restrictions before flying';
  if (rule.cabin === 'Not allowed') return 'No — not allowed in cabin baggage';
  return 'Check carefully before travelling';
}

export function getCustomsDecision(rule: Rule) {
  const text = [rule.item, rule.category, rule.shortAnswer, rule.warning || '', ...rule.tags].join(' ').toLowerCase();
  if (text.includes('japan') || text.includes('australia') || text.includes('customs') || text.includes('declare') || text.includes('food')) {
    return {
      status: 'Check destination rules',
      tone: 'amber' as const,
      detail: 'Destination customs may inspect this item. Declare it if the official arrival form asks or if you are unsure.',
    };
  }
  if (rule.category === 'Medication') {
    return {
      status: 'Usually allowed with documents',
      tone: 'amber' as const,
      detail: 'Some countries restrict medicines. Carry prescriptions and check controlled-drug rules before travelling.',
    };
  }
  return {
    status: 'Usually no customs issue',
    tone: 'green' as const,
    detail: 'For ordinary personal travel quantities, customs restrictions are usually low, but local rules can still apply.',
  };
}

export function getSecurityDecision(rule: Rule) {
  if (rule.cabin === 'Restricted') return 'Security screening likely';
  if (rule.category === 'Batteries' || rule.category === 'Liquids' || rule.category === 'Cosmetics') return 'Screening possible';
  if (rule.category === 'Medication' || rule.category === 'Baby travel') return 'May be checked separately';
  return 'Normal screening';
}

export function getWhyExplanation(rule: Rule) {
  const category = rule.category.toLowerCase();
  if (category.includes('batter')) {
    return [
      'Power banks and spare lithium batteries can overheat if damaged or short-circuited.',
      'Airlines usually require them in cabin baggage so cabin crew can respond quickly if there is a problem.',
      'Checked baggage is normally not allowed for loose spare lithium batteries or power banks.',
    ];
  }
  if (category.includes('medication')) {
    return [
      'Medication is normally allowed because travellers may need it during the journey.',
      'The main risk is documentation and destination law, especially for controlled medicines.',
      'Keeping medicine labelled and carrying prescriptions reduces the chance of delays at security or customs.',
    ];
  }
  if (category.includes('baby')) {
    return [
      'Baby milk, formula and essential baby food are usually treated as journey necessities.',
      'Security may inspect or test containers separately, so these items should be easy to remove from your bag.',
      'Reasonable quantities for the journey are safer than large amounts with no explanation.',
    ];
  }
  if (category.includes('food')) {
    return [
      'Food and powders can be affected by destination customs, agriculture and quarantine rules.',
      'Even when an item is allowed on the aircraft, the destination country may still restrict or inspect it.',
      'Sealed, labelled packaging and declaring when required reduces customs risk.',
    ];
  }
  if (category.includes('liquid') || category.includes('cosmetic')) {
    return [
      'Liquids, gels, aerosols and creams are usually restricted during airport security screening.',
      'Cabin baggage limits are designed to make screening quicker and reduce security risks.',
      'Larger containers are usually safer in checked baggage unless the item is medically or baby-related.',
    ];
  }
  return [
    'Travel rules depend on airline baggage policy, airport security screening and destination customs.',
    'The cabin and checked baggage rules can differ, so always check both before packing.',
    'When in doubt, keep important or restricted items accessible and verify official guidance before flying.',
  ];
}

export function getDecisionChecklist(rule: Rule) {
  const checklist = new Set<string>();
  rule.tips.forEach((tip) => checklist.add(tip));
  if (rule.cabin === 'Allowed') checklist.add('Pack it where airport security can inspect it quickly.');
  if (rule.checked === 'Not allowed') checklist.add('Do not place it in checked baggage.');
  if (rule.warning) checklist.add('Read the warning and check the official airline or destination source.');
  if (rule.category === 'Batteries') {
    checklist.add('Check the watt-hour rating before travel.');
    checklist.add('Protect battery terminals from short circuit.');
  }
  if (rule.category === 'Medication') {
    checklist.add('Carry prescriptions or a doctor letter where possible.');
    checklist.add('Keep medicine in original packaging.');
  }
  if (rule.category === 'Food & customs') {
    checklist.add('Keep food sealed and labelled.');
    checklist.add('Declare it if customs guidance or the arrival form asks.');
  }
  return Array.from(checklist).slice(0, 7);
}

export function getDestinationInsights(rule: Rule) {
  const text = [rule.slug, rule.item, ...rule.tags].join(' ').toLowerCase();
  let destination = '';
  for (const country of ['japan', 'usa', 'uae', 'australia', 'india', 'canada', 'singapore']) {
    if (text.includes(country)) destination = country;
  }
  const label = destination ? destination.replace(/\b\w/g, (c) => c.toUpperCase()) : 'Your destination';
  const customs = getCustomsDecision(rule);
  return {
    label,
    declaration: customs.tone === 'green' ? 'Usually not required' : 'Check before arrival',
    inspection: customs.tone === 'green' ? 'Unlikely but possible' : 'Possible',
    permit: rule.category === 'Medication' ? 'May be needed for controlled medicines' : 'Usually not needed for personal use',
    note: customs.detail,
  };
}

export function getAirlineInsights(rule: Rule) {
  const knownAirlines = ['Ryanair','easyJet','British Airways','Emirates','Qatar Airways','Air India','Virgin Atlantic','Lufthansa','Turkish Airlines','Singapore Airlines','Etihad Airways'];
  const match = knownAirlines.find((airline) => rule.item.toLowerCase().includes(airline.toLowerCase()) || rule.tags.some((tag) => tag.toLowerCase() === airline.toLowerCase() || tag.toLowerCase() === slugify(airline)));
  return {
    label: match || 'Your airline',
    cabin: rule.cabin,
    checked: rule.checked,
    note: match ? `Confirm the latest ${match} baggage policy before travelling.` : 'Confirm the latest airline baggage policy before travelling.',
    approval: rule.category === 'Batteries' || rule.cabin === 'Restricted' || rule.checked === 'Restricted' ? 'May be needed for restricted quantities' : 'Usually not required',
  };
}

export function getExpandedFaqs(rule: Rule) {
  const airportSecurity = getSecurityDecision(rule);
  const faqs = [
    {
      question: `Can I bring ${rule.item}?`,
      answer: rule.shortAnswer,
    },
    {
      question: `Can I take ${rule.item} in cabin baggage?`,
      answer: `Cabin baggage status: ${rule.cabin}. Keep it accessible for screening and confirm with your airline before travelling.`,
    },
    {
      question: `Can I pack ${rule.item} in checked baggage?`,
      answer: `Checked baggage status: ${rule.checked}. If checked baggage is not allowed, remove it before bag drop.`,
    },
    {
      question: `Will airport security inspect ${rule.item}?`,
      answer: `${airportSecurity}. Security officers can still make the final decision at the airport.`,
    },
    {
      question: `Do I need to check official rules for ${rule.item}?`,
      answer: 'Yes. Rules can change by airline, airport and destination, especially for restricted items, medication, batteries, liquids and food.',
    },
  ];
  if (rule.warning) {
    faqs.push({ question: `What is the main warning for ${rule.item}?`, answer: rule.warning });
  }
  return faqs;
}

export function getAiRelatedQuestions(rule: Rule) {
  const base = getPeopleAlsoSearch(rule);
  const item = rule.item.replace(/ when travelling to .*/i, '').replace(/ on .*/i, '');
  return [
    `Can I take ${item} in hand luggage?`,
    `Can I put ${item} in checked baggage?`,
    `Will airport security inspect ${item}?`,
    `Do I need to declare ${item}?`,
    ...base.map((term) => `Can I travel with ${term}?`),
  ].slice(0, 8);
}

export function buildRuleJsonLd(rule: Rule) {
  const url = `https://canibringitnow.com/rules/${rule.slug}/`;
  const faqs = getExpandedFaqs(rule);

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
