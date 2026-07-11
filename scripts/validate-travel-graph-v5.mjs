import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'src/data/travel-intelligence/types.ts',
  'src/data/travel-intelligence/sourceRegistry.ts',
  'src/lib/travelIntelligenceGraph.ts',
  'scripts/generate-travel-graph-report.mjs',
];

for (const file of requiredFiles) {
  await fs.access(path.join(root, file));
}

const packageJson = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));
if (!packageJson.scripts?.['travel-graph:report']) throw new Error('Missing travel-graph:report script.');
if (!packageJson.scripts?.['validate:travel-graph-v5']) throw new Error('Missing validate:travel-graph-v5 script.');

const graphSource = await fs.readFile(path.join(root, 'src/lib/travelIntelligenceGraph.ts'), 'utf8');
for (const token of ['buildTravelGraph', 'getRuleGraphContext', 'getTravelGraphStats', 'getTravelGraphContextAlerts']) {
  if (!graphSource.includes(token)) throw new Error(`Travel graph is missing ${token}.`);
}

const report = JSON.parse(await fs.readFile(path.join(root, 'reports/travel-graph-summary.json'), 'utf8'));
if (!report.summary?.rules || report.summary.rules < 400) throw new Error('Travel graph report contains too few rules.');
if (!Array.isArray(report.rules) || report.rules.length !== report.summary.rules) throw new Error('Travel graph report rule count is inconsistent.');

console.log(`Validated Version 5.0 Travel Intelligence Database foundation across ${report.summary.rules} rules.`);
