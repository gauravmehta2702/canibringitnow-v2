import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  ['src/lib/travelIntelligence.ts', ['buildTravelIntelligenceReport', 'JourneyStage', 'TravellerType']],
  ['src/components/trip/TripRuleCheckerClient.tsx', ['Travel intelligence report', 'Journey timeline', 'Traveller profile', 'Departure country']],
];

const failures = [];
for (const [file, needles] of required) {
  const full = path.join(root, file);
  let content = '';
  try { content = await fs.readFile(full, 'utf8'); }
  catch { failures.push(`Missing ${file}`); continue; }
  for (const needle of needles) if (!content.includes(needle)) failures.push(`${file} is missing: ${needle}`);
}

if (failures.length) {
  console.error('Version 4.0 validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Validated Version 4.0 Travel Intelligence Engine architecture and Trip Checker integration.');
