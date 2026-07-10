import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const RULE_PAGE = path.join(ROOT, 'src', 'app', 'rules', '[slug]', 'page.tsx');
const COMPONENT = path.join(ROOT, 'src', 'components', 'rules', 'RuleLongformGuide.tsx');
const DATA = path.join(ROOT, 'src', 'data', 'rules.ts');

const requiredCategories = ['Batteries', 'Medication', 'Baby travel', 'Liquids', 'Cosmetics', 'Electronics', 'Food & customs'];
const requiredHeadings = [
  'Cabin baggage: what to consider',
  'Checked baggage: what to consider',
  'Airport screening and connecting flights',
  'Destination and customs considerations',
  'Common mistakes to avoid',
  'Practical journey examples',
];

async function main() {
  const [page, component, data] = await Promise.all([
    fs.readFile(RULE_PAGE, 'utf8'),
    fs.readFile(COMPONENT, 'utf8'),
    fs.readFile(DATA, 'utf8'),
  ]);

  const errors = [];
  if (!page.includes("import RuleLongformGuide from '@/components/rules/RuleLongformGuide'")) errors.push('Rule page does not import RuleLongformGuide.');
  if (!page.includes('<RuleLongformGuide rule={rule} />')) errors.push('Rule page does not render RuleLongformGuide.');

  for (const category of requiredCategories) {
    if (!data.includes(`category: '${category}'`)) errors.push(`Rule data no longer contains expected category: ${category}`);
    if (!component.includes(`${category}: {`) && !component.includes(`'${category}': {`)) errors.push(`Long-form guide is missing category coverage: ${category}`);
  }

  for (const heading of requiredHeadings) {
    if (!component.includes(heading)) errors.push(`Long-form guide is missing required section: ${heading}`);
  }

  const componentWords = component
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^A-Za-z0-9'’-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (componentWords < 1800) errors.push(`Long-form content library is unexpectedly small (${componentWords} words).`);

  if (errors.length) {
    console.error('Rule-depth validation failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Validated long-form rule guidance for ${requiredCategories.length} categories (${componentWords} source words).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
