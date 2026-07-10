import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredPages = [
  'about', 'contact', 'privacy', 'cookie-policy', 'terms', 'disclaimer',
  'editorial-policy', 'fact-checking', 'corrections-policy', 'source-policy',
  'advertising-policy', 'affiliate-disclosure',
];

const errors = [];
for (const slug of requiredPages) {
  const source = path.join(root, 'src', 'app', slug, 'page.tsx');
  const output = path.join(root, 'out', slug, 'index.html');
  try { await fs.access(source); } catch { errors.push(`Missing source page: /${slug}/`); }
  try { await fs.access(output); } catch { errors.push(`Missing exported page: /${slug}/`); }
}

const rulePage = await fs.readFile(path.join(root, 'src', 'app', 'rules', '[slug]', 'page.tsx'), 'utf8');
for (const required of ['RuleContentDepth', 'FaqBlock', 'TrustPanel', 'Official sources to check', 'Last reviewed']) {
  if (!rulePage.includes(required)) errors.push(`Rule template is missing required quality feature: ${required}`);
}

const layout = await fs.readFile(path.join(root, 'src', 'app', 'layout.tsx'), 'utf8');
if (!layout.includes('SiteFooter')) errors.push('Global SiteFooter is not installed in the root layout.');

const sitemap = await fs.readFile(path.join(root, 'out', 'sitemap.xml'), 'utf8');
for (const slug of requiredPages) {
  if (!sitemap.includes(`https://canibringitnow.com/${slug}/`)) errors.push(`Sitemap is missing /${slug}/`);
}

if (errors.length) {
  console.error('\nAdSense readiness validation failed:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validated ${requiredPages.length} trust/legal pages, global footer, rule-quality sections and sitemap coverage.`);
