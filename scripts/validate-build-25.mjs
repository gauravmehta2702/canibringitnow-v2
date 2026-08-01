import fs from 'node:fs';

const required = [
  'src/lib/travelResearch.ts',
  'src/app/travel-rules-research/page.tsx',
  'public/downloads/canibringitnow-travel-rules-snapshot.csv',
];

for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Build 25 missing required file: ${file}`);
}

const page = fs.readFileSync('src/app/travel-rules-research/page.tsx', 'utf8');
for (const marker of ['Methodology and responsible use', 'Download CSV snapshot', 'Citation guidance']) {
  if (!page.includes(marker)) throw new Error(`Build 25 research page missing marker: ${marker}`);
}

const csv = fs.readFileSync('public/downloads/canibringitnow-travel-rules-snapshot.csv', 'utf8').trim().split(/\r?\n/);
if (csv.length < 10) throw new Error('Build 25 CSV contains too few rows.');

console.log(`Validated Build 25: research centre and ${csv.length - 1} downloadable rule records.`);
