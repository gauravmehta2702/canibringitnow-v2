import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'src/lib/authorityIntelligence.ts',
  'src/components/content/AuthorityIntelligencePanel.tsx',
  'src/components/content/UniversalContentPageView.tsx',
  'src/components/trip/TripRuleCheckerClient.tsx',
];

for (const file of requiredFiles) {
  await fs.access(path.join(root, file));
}

const view = await fs.readFile(path.join(root, 'src/components/content/UniversalContentPageView.tsx'), 'utf8');
const trip = await fs.readFile(path.join(root, 'src/components/trip/TripRuleCheckerClient.tsx'), 'utf8');
const intelligence = await fs.readFile(path.join(root, 'src/lib/authorityIntelligence.ts'), 'utf8');

const checks = [
  [view.includes('AuthorityIntelligencePanel'), 'Authority panel is not connected to hub pages.'],
  [trip.includes('Airline and destination checks'), 'Trip Checker contextual intelligence is missing.'],
  [intelligence.includes("page.kind === 'airline'"), 'Airline intelligence is missing.'],
  [intelligence.includes("page.kind === 'country'"), 'Country intelligence is missing.'],
];

for (const [ok, message] of checks) {
  if (!ok) throw new Error(message);
}

const sitemap = await fs.readFile(path.join(root, 'out/sitemap.xml'), 'utf8');
if (!sitemap.includes('/airlines/') || !sitemap.includes('/countries/')) {
  throw new Error('Airline or country hubs are missing from the generated sitemap.');
}

console.log('Validated Version 3.2 airline, country and Trip Checker intelligence integration.');
