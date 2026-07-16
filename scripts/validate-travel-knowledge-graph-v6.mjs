import { promises as fs } from 'node:fs';

const requiredFiles = [
  'src/data/travel-intelligence/types.ts',
  'src/lib/travelIntelligenceGraph.ts',
  'src/components/rules/TravelGraphConnections.tsx',
  'src/app/rules/[slug]/page.tsx',
  'src/components/trip/TripRuleCheckerClient.tsx',
];

for (const file of requiredFiles) {
  await fs.access(file);
}

const [
  types,
  graph,
  rulePage,
  tripChecker,
  graphComponent,
] = await Promise.all([
  fs.readFile(requiredFiles[0], 'utf8'),
  fs.readFile(requiredFiles[1], 'utf8'),
  fs.readFile(requiredFiles[3], 'utf8'),
  fs.readFile(requiredFiles[4], 'utf8'),
  fs.readFile(requiredFiles[2], 'utf8'),
]);

const checks = [
  [
    types.includes("version: '2.0'"),
    'Graph schema version 2.0 missing',
  ],
  [
    types.includes('TravelGraphEdge'),
    'Weighted graph edge type missing',
  ],
  [
    graph.includes('buildEdges'),
    'Graph edge builder missing',
  ],
  [
    graph.includes('getGraphRecommendationsForRule'),
    'Rule recommendation query missing',
  ],
  [
    graph.includes('assessJourneyGraph'),
    'Journey graph assessment engine missing',
  ],
  [
    graph.includes('getTravelGraphContextAlerts'),
    'Journey context-alert helper missing',
  ],
  [
    rulePage.includes('<TravelGraphConnections'),
    'Rule-page graph integration missing',
  ],
  [
    tripChecker.includes('getTravelGraphContextAlerts'),
    'Trip Checker graph-context integration missing',
  ],
  [
    tripChecker.includes('buildTravelIntelligenceReport'),
    'Trip Checker intelligence-report integration missing',
  ],
  [
    graphComponent.includes('Source-quality safeguard'),
    'Visible source-quality safeguard missing',
  ],
];

const failures = checks
  .filter(([passed]) => !passed)
  .map(([, message]) => message);

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(
  'Validated Release 6 Travel Intelligence Graph, weighted relationships, rule connections and Trip Checker context integration.',
);