import { airlines, countries, rules } from '@/data/rules';

export function getWeeklyMarketingSeeds(limit = 24) {
  const topRules = rules.slice(0, 8);
  const topAirlines = airlines.slice(0, 4);
  const topCountries = countries.slice(0, 4);

  const seo = topRules.slice(0, 6).map((rule) => ({
    title: `${rule.item}: complete travel check`,
    type: 'SEO page',
    prompt: `Write a helpful travel rule page for ${rule.item}. Include cabin baggage, checked baggage, restrictions, tips and related searches.`,
  }));

  const videos = topRules.slice(0, 6).map((rule) => ({
    title: `Can you take ${rule.item.toLowerCase()} on a plane?`,
    type: 'Short video',
    prompt: `Create a 30-second video script explaining whether travellers can take ${rule.item.toLowerCase()} on a plane. End with CanIBringItNow.com.`,
  }));

  const pinterest = topCountries.slice(0, 6).map((country) => ({
    title: `${country} travel checklist pin`,
    type: 'Pinterest pin',
    prompt: `Create a Pinterest pin idea for travellers going to ${country}. Focus on packing, customs and travel rules.`,
  }));

  const social = topAirlines.slice(0, 6).map((airline) => ({
    title: `${airline} baggage answer draft`,
    type: 'Social answer',
    prompt: `Draft a helpful Quora/Reddit style answer about baggage and travel rules on ${airline}. Avoid spam. Link only if useful.`,
  }));

  return [...seo, ...videos, ...pinterest, ...social].slice(0, limit);
}
