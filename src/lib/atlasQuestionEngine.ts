import { airlines, countries, rules, type Rule } from '@/data/rules';
import { atlasSlug, getAtlasEntityLinks, getAtlasFAQs, getAtlasPeopleAlsoAsk } from '@/lib/atlasSeoEngine';

export type AtlasQuestionPage = {
  slug: string;
  title: string;
  question: string;
  answer: string;
  rule: Rule;
  type: 'item' | 'airline' | 'country' | 'baggage';
  context: string;
};

function cleanItem(item: string) {
  return item
    .replace(/\bon a plane\b/gi, '')
    .replace(/\bin UK hand luggage\b/gi, '')
    .replace(/\bunder TSA rules\b/gi, '')
    .replace(/\bwhen travelling to\b/gi, 'to')
    .trim();
}

function buildPages(): AtlasQuestionPage[] {
  const priorityRules = rules.slice(0, 40);
  const pages: AtlasQuestionPage[] = [];

  priorityRules.forEach((rule) => {
    const item = cleanItem(rule.item);
    pages.push({
      slug: `can-i-bring-${rule.slug}`,
      title: `Can I bring ${item}?`,
      question: `Can I bring ${item}?`,
      answer: rule.shortAnswer,
      rule,
      type: 'item',
      context: 'General travel rule',
    });

    pages.push({
      slug: `${rule.slug}-cabin-baggage`,
      title: `Can I take ${item} in cabin baggage?`,
      question: `Can I take ${item} in cabin baggage?`,
      answer: `Cabin baggage status: ${rule.cabin}. ${rule.shortAnswer}`,
      rule,
      type: 'baggage',
      context: 'Cabin baggage',
    });

    pages.push({
      slug: `${rule.slug}-checked-baggage`,
      title: `Can I pack ${item} in checked baggage?`,
      question: `Can I pack ${item} in checked baggage?`,
      answer: `Checked baggage status: ${rule.checked}. ${rule.shortAnswer}`,
      rule,
      type: 'baggage',
      context: 'Checked baggage',
    });
  });

  const seedRules = rules.slice(0, 8);
  seedRules.forEach((rule) => {
    const item = cleanItem(rule.item);

    airlines.slice(0, 3).forEach((airline) => {
      pages.push({
        slug: `${atlasSlug(item)}-${atlasSlug(airline)}-rules`,
        title: `${item} on ${airline}`,
        question: `Can I take ${item} on ${airline}?`,
        answer: `${rule.shortAnswer} For ${airline}, confirm the latest cabin and checked baggage policy before you fly.`,
        rule,
        type: 'airline',
        context: airline,
      });
    });

    countries.slice(0, 3).forEach((country) => {
      pages.push({
        slug: `${atlasSlug(item)}-to-${atlasSlug(country)}-rules`,
        title: `${item} to ${country}`,
        question: `Can I take ${item} to ${country}?`,
        answer: `${rule.shortAnswer} For ${country}, destination customs or border rules may also apply.`,
        rule,
        type: 'country',
        context: country,
      });
    });
  });

  const seen = new Set<string>();
  return pages.filter((page) => {
    if (seen.has(page.slug)) return false;
    seen.add(page.slug);
    return true;
  }).slice(0, 150);
}

export const atlasQuestionPages = buildPages();

export function getAtlasQuestionPages() {
  return atlasQuestionPages;
}

export function getAtlasQuestionPage(slug: string) {
  return atlasQuestionPages.find((page) => page.slug === slug);
}

export function getQuestionRelatedLinks(page: AtlasQuestionPage) {
  return getAtlasEntityLinks(page.rule, 12);
}

export function getQuestionFAQs(page: AtlasQuestionPage) {
  const base = getAtlasFAQs(page.rule);
  const paa = getAtlasPeopleAlsoAsk(page.rule).slice(0, 4).map((question) => ({
    question,
    answer: `This depends on the item, airline, airport security and destination rules. Start with the full ${page.rule.item} rule and verify important details before flying.`,
  }));

  return [...base, ...paa].slice(0, 8);
}

export function buildQuestionJsonLd(page: AtlasQuestionPage) {
  const url = `https://canibringitnow.com/questions/${page.slug}/`;
  const faqs = getQuestionFAQs(page);

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
      '@type': 'WebPage',
      name: page.title,
      description: page.answer,
      url,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Can I Bring It Now',
        url: 'https://canibringitnow.com/',
      },
      about: [
        { '@type': 'Thing', name: page.rule.item },
        { '@type': 'Thing', name: page.rule.category },
        { '@type': 'Thing', name: page.context },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://canibringitnow.com/' },
        { '@type': 'ListItem', position: 2, name: 'Questions', item: 'https://canibringitnow.com/questions/' },
        { '@type': 'ListItem', position: 3, name: page.title, item: url },
      ],
    },
  ];
}
