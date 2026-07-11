import type { SourceAuthorityType, SourceRecord } from './types';

/**
 * The registry intentionally starts with editorial-source records only.
 * Named official URLs must be added after human verification; the graph never
 * invents an official citation merely to improve a quality score.
 */
export const sourceRegistry: SourceRecord[] = [
  {
    id: 'editorial-general-travel-guidance',
    title: 'Can I Bring It Now editorial travel guidance',
    authorityType: 'editorial',
    appliesTo: ['*'],
    status: 'editorial-summary',
  },
];

export function requiredSourceTypes(input: {
  hasAirline: boolean;
  hasCountry: boolean;
  category: string;
}): SourceAuthorityType[] {
  const required = new Set<SourceAuthorityType>(['aviation-regulator']);
  if (input.hasAirline) required.add('airline');
  if (input.hasCountry) required.add('customs');
  if (/medication/i.test(input.category)) required.add('government');
  if (/food|customs|baby/i.test(input.category) && input.hasCountry) required.add('customs');
  return Array.from(required);
}
