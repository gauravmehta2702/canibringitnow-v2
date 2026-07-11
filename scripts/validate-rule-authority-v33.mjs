import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const requiredFiles = [
  'src/lib/ruleAuthority.ts',
  'src/components/rules/RuleAuthorityExpansion.tsx',
  'src/components/rules/RuleHelpfulFeedback.tsx',
  'src/app/rules/[slug]/page.tsx',
];

for (const relative of requiredFiles) {
  await fs.access(path.join(root, relative));
}

const rulePage = await fs.readFile(path.join(root, 'src/app/rules/[slug]/page.tsx'), 'utf8');
const authorityComponent = await fs.readFile(path.join(root, 'src/components/rules/RuleAuthorityExpansion.tsx'), 'utf8');
const feedbackComponent = await fs.readFile(path.join(root, 'src/components/rules/RuleHelpfulFeedback.tsx'), 'utf8');
const sitemap = await fs.readFile(path.join(root, 'public/sitemap.xml'), 'utf8');

const checks = [
  [rulePage.includes('buildAuthorityFaqItems(rule)'), 'expanded authority FAQ integration'],
  [rulePage.includes('<RuleAuthorityExpansion rule={rule} />'), 'authority expansion component'],
  [rulePage.includes('<RuleHelpfulFeedback slug={rule.slug} />'), 'helpfulness feedback component'],
  [authorityComponent.includes('Airline differences'), 'airline differences section'],
  [authorityComponent.includes('Destination considerations'), 'destination considerations section'],
  [authorityComponent.includes('Common traveller mistakes'), 'common mistakes section'],
  [authorityComponent.includes('Review and source transparency'), 'freshness and source transparency section'],
  [feedbackComponent.includes('rule_helpfulness'), 'analytics-ready helpfulness event'],
  [sitemap.includes('/rules/power-bank-ryanair/'), 'rule sitemap coverage'],
];

const failed = checks.filter(([passed]) => !passed);
if (failed.length) {
  for (const [, label] of failed) console.error(`Missing Version 3.3 requirement: ${label}`);
  process.exit(1);
}

console.log('Validated Version 3.3 rule authority expansion, FAQ depth, freshness and helpfulness integration.');
