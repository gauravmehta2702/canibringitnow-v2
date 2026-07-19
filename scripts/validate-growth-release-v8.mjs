import { promises as fs } from 'node:fs';

const requiredFiles = [
  'src/lib/ruleAuthoritySeo.ts',
  'src/components/rules/RuleAuthoritySeoPanels.tsx',
  'src/app/rules/[slug]/page.tsx',
];

const [engine, component, rulePage] = await Promise.all(
  requiredFiles.map((file) => fs.readFile(file, 'utf8')),
);

const checks = [
  [engine.includes('getAuthoritySourceCards'), 'Authority source engine missing'],
  [engine.includes('getAirlineComparisonRows'), 'Airline comparison engine missing'],
  [engine.includes('getPeopleAskAnswers'), 'People-also-ask engine missing'],
  [component.includes('Official-source status for this rule'), 'Official-source panel missing'],
  [component.includes('Compare this item across airlines'), 'Airline comparison panel missing'],
  [component.includes('Questions travellers also ask'), 'People-also-ask panel missing'],
  [rulePage.includes('<RuleAuthoritySeoPanels rule={rule} />'), 'Rule-page integration missing'],
  [rulePage.includes('id="cabin-and-checked-comparison"'), 'Baggage comparison anchor missing'],
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Validated Growth Release 8 authority sources, airline comparisons and traveller question panels.');
