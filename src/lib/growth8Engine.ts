import { airlines, countries, rules } from '@/data/rules';

export type GrowthCard = { title: string; href: string; label: string; description: string; };

export function gSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getGrowthModules(): GrowthCard[] {
  return [
    { title: 'Backlink Outreach Hub', href: '/backlink-outreach-hub/', label: 'Backlinks', description: 'Prospects and pitch angles for travel bloggers, universities, family sites and communities.' },
    { title: 'UTM Campaign Builder', href: '/utm-campaign-builder/', label: 'Tracking', description: 'Track YouTube Shorts, Reels, Pinterest, Reddit, Quora and newsletter links.' },
    { title: 'Search Console Action Plan', href: '/search-console-action-plan/', label: 'SEO', description: 'Weekly workflow for impressions, CTR, indexing and page improvements.' },
    { title: 'High-Intent Page Factory', href: '/high-intent-page-factory/', label: 'Content', description: 'Pages most likely to bring visitors and future revenue.' },
    { title: 'Social Distribution Plan', href: '/social-distribution-plan/', label: 'Social', description: 'Reusable post ideas for Shorts, TikTok, Reels, Pinterest, Reddit and Quora.' },
    { title: 'Trust & Source Policy', href: '/trust-source-policy/', label: 'Trust', description: 'Editorial standards, update notes and source verification policy.' },
    { title: 'Revenue Readiness Score', href: '/revenue-readiness-score/', label: 'Money', description: 'Checklist before pushing AdSense and affiliates live.' },
  ];
}

export function getHighIntentPages(): GrowthCard[] {
  const r = rules.slice(0, 18).map((rule) => ({
    title: `${rule.item} travel rules`,
    href: `/rules/${rule.slug}/`,
    label: rule.category,
    description: 'Improve this page for cabin baggage, checked baggage, airline and country searches.',
  }));
  const c = countries.slice(0, 10).map((country) => ({
    title: `${country} customs and travel rules`,
    href: `/country-guides/${gSlug(country)}/`,
    label: 'Country hub',
    description: `Build ${country} into a destination hub with customs, medication, food, electronics, hotels and eSIMs.`,
  }));
  const a = airlines.slice(0, 10).map((airline) => ({
    title: `${airline} baggage rules`,
    href: `/airline-guides/${gSlug(airline)}/`,
    label: 'Airline hub',
    description: `Build ${airline} into a hub for baggage, cabin bags, checked bags and common item checks.`,
  }));
  return [...r, ...c, ...a];
}

export function getBacklinkProspects(): GrowthCard[] {
  return [
    { title: 'Travel bloggers', href: '/backlink-resources/', label: 'High', description: 'Offer airport security and packing checklists they can cite.' },
    { title: 'University travel offices', href: '/backlink-resources/student-travel-checklist/', label: 'High', description: 'Share student travel checklists for international student pages.' },
    { title: 'Family travel communities', href: '/backlink-resources/family-travel-checklist/', label: 'High', description: 'Share baby and family airport travel checklists.' },
    { title: 'Study abroad blogs', href: '/backlink-resources/student-travel-checklist/', label: 'Medium', description: 'Offer packing and airport security resources for students.' },
    { title: 'Airport guide websites', href: '/airport-guides/', label: 'Medium', description: 'Share security, transport and hotel-linked airport resources.' },
    { title: 'Reddit and Quora answers', href: '/knowledge/', label: 'Low', description: 'Answer genuinely and link only when directly helpful.' },
  ];
}

export function getSearchConsoleActions(): GrowthCard[] {
  return [
    { title: 'Submit sitemap.xml', href: '/sitemap.xml', label: 'Indexing', description: 'Submit sitemap and inspect priority URLs manually.' },
    { title: 'Watch impressions first', href: '/search-console-action-plan/', label: 'Data', description: 'Impressions show pages Google may rank soon.' },
    { title: 'Improve low CTR pages', href: '/ctr-booster/', label: 'CTR', description: 'Rewrite title, meta description and first answer.' },
    { title: 'Fix crawled not indexed', href: '/search-console-action-plan/', label: 'Quality', description: 'Improve thin pages with original details, FAQs, links and source notes.' },
    { title: 'Build around winning queries', href: '/high-intent-page-factory/', label: 'Expansion', description: 'Create related pages after Search Console shows demand.' },
    { title: 'Check mobile usability', href: '/seo-health-monitor/', label: 'UX', description: 'Travellers mostly use mobile, so scanability matters.' },
  ];
}

export function getSocialPosts(): GrowthCard[] {
  const posts = rules.slice(0, 12).map((rule) => {
    const item = rule.item.replace(/\\bon a plane\\b/gi, '').trim();
    return { title: `Can you take ${item} on a plane?`, href: `/rules/${rule.slug}/`, label: 'Short video', description: 'Hook: Airport security might stop this if you pack it wrong. Explain cabin vs checked in 20 seconds.' };
  });
  return [
    ...posts,
    { title: 'Airport security checklist pin', href: '/backlink-resources/airport-security-checklist/', label: 'Pinterest', description: 'Create a vertical checklist pin with five quick checks before flying.' },
    { title: 'Medication travel checklist post', href: '/backlink-resources/medication-travel-checklist/', label: 'Pinterest', description: 'Create a medication checklist for international travel.' },
    { title: 'Family travel checklist post', href: '/backlink-resources/family-travel-checklist/', label: 'Pinterest', description: 'Create a checklist for baby milk, formula, stroller and baby medication.' },
  ];
}

export function getTrustPolicyCards(): GrowthCard[] {
  return [
    { title: 'Clear answer first', href: '/trust-source-policy/', label: 'Editorial', description: 'Every important page must answer the user before extra content.' },
    { title: 'Official-source reminder', href: '/official-source-center/', label: 'Trust', description: 'Rules change, so pages should guide users to verify official sources.' },
    { title: 'Last updated field', href: '/trust-source-policy/', label: 'Freshness', description: 'Show updated or reviewed dates where data supports it.' },
    { title: 'Do not fake certainty', href: '/trust-source-policy/', label: 'Accuracy', description: 'Use restricted or verify language when rules depend on airline, airport or destination.' },
    { title: 'Affiliate separation', href: '/revenue-safe-zones/', label: 'Revenue', description: 'Commercial suggestions should not change the travel rule answer.' },
    { title: 'User correction path', href: '/trust-source-policy/', label: 'Feedback', description: 'Add a future reporting route for outdated or wrong rules.' },
  ];
}

export function getRevenueScores() {
  return [
    { title: 'Indexed public pages', score: 45, description: 'Needs Search Console confirmation before heavy monetisation.' },
    { title: 'Helpful content depth', score: 70, description: 'Top pages need richer detail and source review.' },
    { title: 'Traffic stability', score: 30, description: 'Wait until organic traffic is consistent.' },
    { title: 'Affiliate fit', score: 75, description: 'Hotels, eSIMs, insurance and gear fit naturally after the answer.' },
    { title: 'AdSense readiness', score: 55, description: 'Apply after stronger indexed content and stable organic traffic.' },
    { title: 'Trust signals', score: 65, description: 'Add policy, source notes and update review process.' },
  ];
}
