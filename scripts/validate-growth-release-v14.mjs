import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'src/lib/ruleSeoEngine.ts',
  'src/components/rules/RuleSeoSnapshot.tsx',
  'src/components/rules/SameItemAirlines.tsx',
  'src/app/rules/[slug]/page.tsx',
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Growth Release 14 missing ${file}`);
}

const rulePage = fs.readFileSync(path.join(root, 'src/app/rules/[slug]/page.tsx'), 'utf8');
for (const marker of ['buildRuleSeoProfile', 'RuleSeoSnapshot', 'SameItemAirlines', 'buildRuleWebPageJsonLd']) {
  if (!rulePage.includes(marker)) throw new Error(`Growth Release 14 marker missing: ${marker}`);
}

const rulesSource = fs.readFileSync(path.join(root, 'src/data/rules.ts'), 'utf8');
const slugs = [...rulesSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
if (duplicates.length) throw new Error(`Duplicate rule slugs: ${[...new Set(duplicates)].join(', ')}`);
if (slugs.length < 10) throw new Error('Unexpectedly small rule library.');

console.log(`Validated Growth Release 14 SEO Intelligence Engine across ${slugs.length} rule pages.`);
