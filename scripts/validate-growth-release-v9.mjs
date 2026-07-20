import { promises as fs } from 'node:fs';

const files = {
  view: 'src/components/content/UniversalContentPageView.tsx',
  panel: 'src/components/content/TrafficHubSeoPanels.tsx',
  engine: 'src/lib/trafficHubSeo.ts',
};

const content = Object.fromEntries(
  await Promise.all(Object.entries(files).map(async ([key, file]) => [key, await fs.readFile(file, 'utf8')]))
);

const required = [
  [content.view.includes('TrafficHubSeoPanels'), 'Universal hub-page integration missing'],
  [content.panel.includes('Search-demand travel hub'), 'Traffic-hub summary panel missing'],
  [content.panel.includes('Most checked topics'), 'Popular topic clusters missing'],
  [content.panel.includes('Questions travellers ask'), 'Traveller FAQ panel missing'],
  [content.panel.includes('Open Trip Checker'), 'Trip Checker conversion link missing'],
  [content.engine.includes('buildHubFaqJsonLd'), 'FAQ structured-data builder missing'],
  [content.engine.includes("page.kind !== 'airline' && page.kind !== 'country'"), 'Airline/country quality scope missing'],
];

const failures = required.filter(([passed]) => !passed).map(([, message]) => message);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Validated Growth Release 9 search-demand airline and destination hubs, topic clusters, FAQs and Trip Checker conversion links.');
