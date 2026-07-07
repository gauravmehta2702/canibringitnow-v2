import { type Rule } from '@/data/rules';
import { atlasSmartSearch, getAtlasSmartAnswer, getAtlasSearchSuggestions } from '@/lib/atlasSearchEngine';

export function smartSearch(query: string, limit = 12): Rule[] {
  return atlasSmartSearch(query, limit);
}

export function getSmartAnswer(query: string) {
  return getAtlasSmartAnswer(query);
}

export function getSearchSuggestions(query: string) {
  return getAtlasSearchSuggestions(query, 5);
}
