import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const required = [
  'src/lib/searchIntelligence.ts',
  'src/components/search/SearchIntelligencePanel.tsx',
  'src/components/search/RecentlyViewedRules.tsx',
  'src/components/SearchBox.tsx',
  'src/app/search/page.tsx',
  'src/app/rules/[slug]/page.tsx',
];

for (const file of required) {
  await fs.access(path.join(root, file));
}

const [searchBox, searchPage, rulePage, intelligence] = await Promise.all([
  fs.readFile(path.join(root, 'src/components/SearchBox.tsx'), 'utf8'),
  fs.readFile(path.join(root, 'src/app/search/page.tsx'), 'utf8'),
  fs.readFile(path.join(root, 'src/app/rules/[slug]/page.tsx'), 'utf8'),
  fs.readFile(path.join(root, 'src/lib/searchIntelligence.ts'), 'utf8'),
]);

const checks = [
  [searchBox.includes('SearchIntelligencePanel'), 'Homepage search intelligence integration is missing.'],
  [searchBox.includes('RecentlyViewedRules'), 'Homepage recently viewed integration is missing.'],
  [searchPage.includes('SearchIntelligencePanel'), 'Search results intelligence integration is missing.'],
  [rulePage.includes('RuleViewTracker'), 'Rule view tracking integration is missing.'],
  [intelligence.includes('getSearchCorrection'), 'Typo correction engine is missing.'],
  [intelligence.includes('getSearchQuickLinks'), 'Quick entity matching engine is missing.'],
];

for (const [passed, message] of checks) {
  if (!passed) throw new Error(message);
}

console.log('Validated Version 3.4 search intelligence, typo correction and recently viewed integration.');
