import fs from 'node:fs';
const required=['src/lib/build26Authority.ts','src/components/rules/FirstPageAuthorityPanel.tsx','src/app/travel-authority/page.tsx','src/app/low-competition-opportunities/page.tsx','public/downloads/canibringitnow-travel-rules-snapshot.csv'];
for(const file of required){if(!fs.existsSync(file)) throw new Error(`Build 26 missing required file: ${file}`)}
const csv=fs.readFileSync(required[4],'utf8').trim().split(/\r?\n/);
if(csv.length<100) throw new Error(`Build 26 CSV unexpectedly small: ${csv.length-1} records`);
const rulePage=fs.readFileSync('src/app/rules/[slug]/page.tsx','utf8');
if(!rulePage.includes('FirstPageAuthorityPanel')) throw new Error('Build 26 panel is not connected to rule pages');
console.log(`Build 26 validation passed with ${csv.length-1} downloadable rule records.`);
