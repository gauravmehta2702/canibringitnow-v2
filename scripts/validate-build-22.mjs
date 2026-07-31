import fs from 'node:fs';
const checks = [
  ['src/lib/authorityEngine.ts', ['buildAuthorityInsight', 'getAuthorityAudit']],
  ['src/components/rules/AuthorityDecisionCard.tsx', ['30-second verified travel answer']],
  ['src/components/rules/AuthorityJourneyGuide.tsx', ['Common traveller mistakes', 'Traveller checklist']],
  ['src/app/authority-dashboard/page.tsx', ['robots:', 'Authority Dashboard']],
  ['src/app/rules/[slug]/page.tsx', ['<AuthorityDecisionCard rule={rule} />', '<AuthorityJourneyGuide rule={rule} />']],
];
let failed = false;
for (const [file, needles] of checks) {
  const text = fs.readFileSync(file, 'utf8');
  for (const needle of needles) if (!text.includes(needle)) { console.error(`Missing ${needle} in ${file}`); failed = true; }
}
if (failed) process.exit(1);
console.log('Build 22 authority engine validation passed.');
