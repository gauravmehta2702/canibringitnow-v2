import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const required = [
  'scripts/generate-content-opportunities.mjs',
  'reports/content-opportunities.json',
  'reports/content-opportunities.html',
];

for (const relative of required) await fs.access(path.join(root, relative));

const report = JSON.parse(await fs.readFile(path.join(root, 'reports/content-opportunities.json'), 'utf8'));
const html = await fs.readFile(path.join(root, 'reports/content-opportunities.html'), 'utf8');

if (report.version !== '3.5.0') throw new Error('Content opportunities report version is incorrect.');
if (!Array.isArray(report.rows) || report.rows.length < 400) throw new Error('Content opportunities report did not audit the full rule library.');
if (!report.summary?.byPriority || typeof report.summary.averages?.overall !== 'number') throw new Error('Content opportunities summary is incomplete.');
if (!html.includes('Content Opportunities Dashboard')) throw new Error('Local dashboard HTML is incomplete.');
if (!html.includes('This file is not a public website route')) throw new Error('Local-only dashboard warning is missing.');

console.log(`Validated Version 3.5 local content opportunities dashboard across ${report.rows.length} rules.`);
