export const launchLimits = {
  rules: 8,
  items: 12,
  itemGuides: 12,
  knowledgePages: 20,
  questionPages: 30,
  topicPages: 20,
  airlines: 20,
  airlineGuides: 20,
  countries: 20,
  countryGuides: 20,
  destinationPages: 12,
  airportGuides: 12,
  travelDeals: 12,
  seasonalPages: 12,
  backlinkResources: 10,
} as const;

export const launchLimitNote =
  'Growth Release 9 keeps the first indexing batch focused and build-safe. Increase these limits gradually only after successful Cloudflare builds and Search Console indexing checks.';
