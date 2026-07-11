import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ruleFile = path.join(root, 'src', 'data', 'rules.ts');
const reportDir = path.join(root, 'reports');
const source = await fs.readFile(ruleFile, 'utf8');

function extractExportedStringArray(name) {
  const match = source.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\];`));
  if (!match) return [];
  return Array.from(match[1].matchAll(/'([^']+)'/g), (entry) => entry[1]);
}

function extractString(block, field) {
  const match = block.match(new RegExp(`${field}:\\s*'((?:\\\\'|[^'])*)'`));
  return match ? match[1].replace(/\\'/g, "'") : '';
}

function extractStringArray(block, field) {
  const match = block.match(new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`));
  if (!match) return [];
  return Array.from(match[1].matchAll(/'((?:\\'|[^'])*)'/g), (entry) => entry[1].replace(/\\'/g, "'"));
}

function extractRuleObjects() {
  const start = source.indexOf('export const rules: Rule[] = [');
  const end = source.indexOf('\n];\n\nexport const categories', start);
  if (start < 0 || end < 0) throw new Error('Unable to locate rules array.');
  const body = source.slice(start, end);
  const objects = [];
  let depth = 0;
  let quote = false;
  let escape = false;
  let objectStart = -1;

  for (let i = body.indexOf('[') + 1; i < body.length; i += 1) {
    const char = body[i];
    if (quote) {
      if (escape) escape = false;
      else if (char === '\\') escape = true;
      else if (char === "'") quote = false;
      continue;
    }
    if (char === "'") { quote = true; continue; }
    if (char === '{') {
      if (depth === 0) objectStart = i;
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0 && objectStart >= 0) {
        objects.push(body.slice(objectStart, i + 1));
        objectStart = -1;
      }
    }
  }

  return objects.map((block) => ({
    slug: extractString(block, 'slug'),
    item: extractString(block, 'item'),
    category: extractString(block, 'category'),
    shortAnswer: extractString(block, 'shortAnswer'),
    warning: extractString(block, 'warning'),
    sourceNote: extractString(block, 'sourceNote'),
    updated: extractString(block, 'updated'),
    tags: extractStringArray(block, 'tags'),
  })).filter((rule) => rule.slug);
}

const rules = extractRuleObjects();
const airlines = extractExportedStringArray('airlines');
const countries = extractExportedStringArray('countries');
const categories = extractExportedStringArray('categories');

const normalise = (value = '') => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
const entityMentioned = (rule, entity) => {
  const needle = normalise(entity);
  return [rule.item, rule.shortAnswer, rule.warning, rule.sourceNote, ...rule.tags]
    .map(normalise)
    .some((text) => text === needle || text.includes(needle));
};

const ruleRows = rules.map((rule) => {
  const airlineLinks = airlines.filter((airline) => entityMentioned(rule, airline));
  const countryLinks = countries.filter((country) => entityMentioned(rule, country));
  const namedUrl = /https?:\/\//i.test(rule.sourceNote || '');
  return {
    slug: rule.slug,
    title: rule.item,
    category: rule.category,
    airlines: airlineLinks,
    countries: countryLinks,
    updated: rule.updated,
    sourceStatus: namedUrl ? 'named source present' : 'needs named official source',
  };
});

const summary = {
  generatedAt: new Date().toISOString(),
  rules: rules.length,
  airlines: airlines.length,
  countries: countries.length,
  categories: categories.length,
  rulesWithAirlineLinks: ruleRows.filter((row) => row.airlines.length).length,
  rulesWithCountryLinks: ruleRows.filter((row) => row.countries.length).length,
  rulesNeedingNamedOfficialSources: ruleRows.filter((row) => row.sourceStatus !== 'named source present').length,
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
await fs.mkdir(reportDir, { recursive: true });
await fs.writeFile(path.join(reportDir, 'travel-graph-summary.json'), JSON.stringify({ summary, rules: ruleRows }, null, 2));
const cards = Object.entries(summary)
  .filter(([key]) => key !== 'generatedAt')
  .map(([key, value]) => `<div class="card"><div class="n">${escapeHtml(value)}</div><div>${escapeHtml(key)}</div></div>`)
  .join('');
const rows = ruleRows.map((row) => `<tr><td>${escapeHtml(row.title)}<br><small>${escapeHtml(row.slug)}</small></td><td>${escapeHtml(row.category)}</td><td>${escapeHtml(row.airlines.join(', ') || '—')}</td><td>${escapeHtml(row.countries.join(', ') || '—')}</td><td>${escapeHtml(row.sourceStatus)}</td></tr>`).join('');
const html = `<!doctype html><html><head><meta charset="utf-8"><title>Travel Intelligence Graph</title><style>body{font-family:system-ui;margin:32px;color:#0f172a}table{border-collapse:collapse;width:100%;font-size:13px}th,td{padding:10px;border:1px solid #e2e8f0;text-align:left}th{background:#f8fafc}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:24px 0}.card{padding:18px;border:1px solid #e2e8f0;border-radius:16px}.n{font-size:28px;font-weight:800}</style></head><body><h1>Travel Intelligence Graph</h1><p>Local architecture report. This file is not published.</p><div class="cards">${cards}</div><table><thead><tr><th>Rule</th><th>Category</th><th>Airlines</th><th>Countries</th><th>Source status</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
await fs.writeFile(path.join(reportDir, 'travel-graph-summary.html'), html);
console.log(`Generated Travel Intelligence Graph report for ${rules.length} rules.`);
