import { promises as fs } from 'node:fs';
import path from 'node:path';

const required = [
  'src/lib/travelKnowledgeGraph.ts',
  'src/components/rules/AirlineComparisonCta.tsx',
  'src/app/compare-airlines/page.tsx',
  'src/app/compare-airlines/[item]/page.tsx',
];

for (const file of required) {
  await fs.access(path.join(process.cwd(), file));
}

const rulePage = await fs.readFile(path.join(process.cwd(), 'src/app/rules/[slug]/page.tsx'), 'utf8');
if (!rulePage.includes('AirlineComparisonCta')) throw new Error('Growth Release 13 comparison CTA is not connected to rule pages.');

const outputDir = path.join(process.cwd(), 'out', 'compare-airlines');
await fs.access(outputDir);
const entries = await fs.readdir(outputDir, { withFileTypes: true });
if (!entries.some((entry) => entry.isDirectory())) throw new Error('No static airline comparison detail pages were generated.');

console.log('Validated Growth Release 13: knowledge graph, airline comparisons, internal links and static routes.');
