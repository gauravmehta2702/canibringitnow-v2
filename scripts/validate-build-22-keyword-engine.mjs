import fs from 'node:fs';

const required = [
  'src/lib/keywordOpportunityEngine.ts',
  'src/components/rules/RelatedSearchOpportunities.tsx',
  'src/app/first-page-opportunities/page.tsx',
  'src/app/content-coverage-matrix/page.tsx',
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing Build 22 keyword engine file: ${file}`);
}
const rulePage = fs.readFileSync('src/app/rules/[slug]/page.tsx', 'utf8');
if (!rulePage.includes('RelatedSearchOpportunities')) throw new Error('RelatedSearchOpportunities is not integrated into rule pages.');
console.log('Build 22 keyword opportunity engine validation passed.');
