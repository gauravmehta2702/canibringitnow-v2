import { promises as fs } from 'node:fs';

const file = await fs.readFile('src/components/trip/TripRuleCheckerClient.tsx', 'utf8');
const required = [
  'What-if simulator',
  'simulatedAirline',
  'simulatedDestination',
  'simulatedBagMode',
  'simulatedRemovedSlugs',
  'trip_simulator_opened',
  'trip_simulation_applied',
  'Apply changes',
  'Simulated readiness',
];
const missing = required.filter((token) => !file.includes(token));
if (missing.length) {
  console.error(`Release 6.2 validation failed. Missing: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Validated Release 6.2 what-if trip simulator, score comparison, temporary item removal and apply workflow.');
