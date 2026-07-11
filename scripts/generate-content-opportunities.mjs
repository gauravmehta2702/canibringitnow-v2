import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import vm from 'node:vm';

const ROOT = process.cwd();
const REPORTS_DIR = path.join(ROOT, 'reports');
const RULES_FILE = path.join(ROOT, 'src', 'data', 'rules.ts');
const NOW = new Date();
const STALE_AFTER_DAYS = 180;

function normalise(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function wordCount(values) {
  return values
    .filter(Boolean)
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function daysSince(dateValue) {
  const date = new Date(`${dateValue}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return 9999;
  return Math.max(0, Math.floor((NOW.getTime() - date.getTime()) / 86_400_000));
}

async function loadRules() {
  const source = await fs.readFile(RULES_FILE, 'utf8');
  const marker = 'export const rules: Rule[] =';
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('Could not locate the exported rules array.');
  const arrayStart = source.indexOf('[', start + marker.length);
  if (arrayStart < 0) throw new Error('Could not parse the rules array.');

  let depth = 0;
  let quote = null;
  let escaped = false;
  let arrayEnd = -1;
  for (let index = arrayStart; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '[') depth += 1;
    if (char === ']') {
      depth -= 1;
      if (depth === 0) {
        arrayEnd = index;
        break;
      }
    }
  }
  if (arrayEnd < arrayStart) throw new Error('Could not find the end of the rules array.');
  const arrayLiteral = source.slice(arrayStart, arrayEnd + 1);
  return new vm.Script(`(${arrayLiteral})`, { filename: RULES_FILE }).runInNewContext({});
}

function scoreRule(rule, context) {
  const combinedWords = wordCount([
    rule.item,
    rule.shortAnswer,
    rule.warning,
    ...(rule.restrictions || []),
    ...(rule.tips || []),
    rule.sourceNote,
  ]);

  const restrictionCount = rule.restrictions?.length || 0;
  const tipCount = rule.tips?.length || 0;
  const uniqueTags = unique((rule.tags || []).map(normalise));
  const ageDays = daysSince(rule.updated);
  const genericSource = /general travel guidance|common airline baggage rules/i.test(rule.sourceNote || '');
  const officialSourceNamed = /(iata|icao|tsa|faa|caa|government|customs|official|airline policy|airport security authority)/i.test(rule.sourceNote || '');
  const peers = context.categoryCounts.get(rule.category) || 0;
  const exactAnswerDuplicates = context.answerCounts.get(normalise(rule.shortAnswer)) || 0;

  const depth = Math.min(100,
    20 +
    Math.min(30, combinedWords * 0.35) +
    Math.min(20, restrictionCount * 5) +
    Math.min(20, tipCount * 5) +
    (rule.warning ? 10 : 0)
  );

  const trust = Math.max(0, Math.min(100,
    30 +
    (rule.updated ? 15 : 0) +
    (rule.sourceNote ? 20 : 0) +
    (officialSourceNamed ? 30 : 0) -
    (genericSource ? 20 : 0) -
    (ageDays > STALE_AFTER_DAYS ? 20 : 0)
  ));

  const discoverability = Math.min(100,
    35 +
    Math.min(20, uniqueTags.length * 2) +
    Math.min(20, peers) +
    (rule.affiliateType ? 5 : 0) +
    (rule.category ? 10 : 0) +
    (rule.slug ? 10 : 0)
  );

  const originality = Math.max(0, Math.min(100,
    100 - Math.max(0, exactAnswerDuplicates - 1) * 18 - Math.max(0, 8 - uniqueTags.length) * 3
  ));

  const freshness = ageDays <= 90 ? 100 : ageDays <= STALE_AFTER_DAYS ? 75 : ageDays <= 365 ? 45 : 20;
  const overall = Math.round(depth * 0.28 + trust * 0.25 + discoverability * 0.17 + originality * 0.18 + freshness * 0.12);

  const issues = [];
  if (combinedWords < 120) issues.push({ code: 'thin-source-data', label: 'Expand unique source data', impact: 10, effort: 6 });
  if (restrictionCount < 3) issues.push({ code: 'few-restrictions', label: 'Add specific restrictions', impact: 7, effort: 3 });
  if (tipCount < 3) issues.push({ code: 'few-tips', label: 'Add practical packing tips', impact: 6, effort: 3 });
  if (!rule.warning) issues.push({ code: 'missing-warning', label: 'Review whether a warning is needed', impact: 4, effort: 2 });
  if (genericSource || !officialSourceNamed) issues.push({ code: 'official-source', label: 'Add named official references', impact: 10, effort: 5 });
  if (ageDays > STALE_AFTER_DAYS) issues.push({ code: 'stale', label: 'Reverify and update review date', impact: 9, effort: 4 });
  if (uniqueTags.length < 8) issues.push({ code: 'weak-tags', label: 'Improve search terms and synonyms', impact: 5, effort: 2 });
  if (exactAnswerDuplicates > 4) issues.push({ code: 'duplicate-answer', label: 'Differentiate the direct answer', impact: 8, effort: 4 });

  const opportunityScore = Math.min(100, Math.round(
    (100 - overall) * 0.62 +
    issues.reduce((sum, issue) => sum + issue.impact, 0) * 0.65 +
    Math.min(15, peers / 3)
  ));

  const priority = opportunityScore >= 70 ? 'P0' : opportunityScore >= 50 ? 'P1' : opportunityScore >= 30 ? 'P2' : 'P3';

  return {
    slug: rule.slug,
    item: rule.item,
    category: rule.category,
    href: `/rules/${rule.slug}/`,
    updated: rule.updated,
    ageDays,
    combinedWords,
    restrictionCount,
    tipCount,
    tagCount: uniqueTags.length,
    scores: {
      overall,
      depth: Math.round(depth),
      trust: Math.round(trust),
      discoverability: Math.round(discoverability),
      originality: Math.round(originality),
      freshness,
      opportunity: opportunityScore,
    },
    priority,
    issues,
  };
}

function buildSummary(rows) {
  const byPriority = Object.fromEntries(['P0', 'P1', 'P2', 'P3'].map((p) => [p, rows.filter((r) => r.priority === p).length]));
  const issueCounts = new Map();
  for (const row of rows) {
    for (const issue of row.issues) issueCounts.set(issue.label, (issueCounts.get(issue.label) || 0) + 1);
  }
  const topIssues = [...issueCounts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const averages = {};
  for (const key of ['overall', 'depth', 'trust', 'discoverability', 'originality', 'freshness', 'opportunity']) {
    averages[key] = Math.round(rows.reduce((sum, row) => sum + row.scores[key], 0) / Math.max(1, rows.length));
  }

  return { totalRules: rows.length, byPriority, topIssues, averages };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createHtml(report) {
  const data = JSON.stringify(report).replaceAll('<', '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Content Opportunities Dashboard — Can I Bring It Now</title>
<style>
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#0f172a;background:#f8fafc}*{box-sizing:border-box}body{margin:0}.wrap{max-width:1500px;margin:auto;padding:28px}.hero{background:#0f172a;color:white;border-radius:28px;padding:28px}.hero p{color:#cbd5e1;max-width:850px}.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin:20px 0}.metric,.panel{background:white;border:1px solid #e2e8f0;border-radius:20px;padding:18px;box-shadow:0 10px 30px rgba(15,23,42,.05)}.metric strong{display:block;font-size:30px}.filters{display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:12px;margin:20px 0}.filters input,.filters select,.filters button{border:1px solid #cbd5e1;border-radius:12px;padding:12px;background:white;font:inherit}.filters button{cursor:pointer;font-weight:700}.layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:18px}.table-wrap{overflow:auto}.table{width:100%;border-collapse:collapse;font-size:14px}.table th,.table td{text-align:left;padding:12px;border-bottom:1px solid #e2e8f0;vertical-align:top}.table th{position:sticky;top:0;background:white;z-index:1}.score{font-weight:800}.badge{display:inline-block;border-radius:999px;padding:5px 9px;font-size:12px;font-weight:800;background:#e2e8f0}.issues{margin:0;padding-left:18px}.issues li{margin-bottom:4px}.muted{color:#64748b}.top-issues{padding-left:20px}.top-issues li{margin:10px 0}.empty{padding:40px;text-align:center;color:#64748b}@media(max-width:950px){.layout{grid-template-columns:1fr}.filters{grid-template-columns:1fr}.wrap{padding:16px}.hero{border-radius:20px}.table{min-width:1050px}}
</style>
</head>
<body>
<main class="wrap">
<section class="hero">
<p style="font-weight:800;text-transform:uppercase;letter-spacing:.08em">Internal operations report</p>
<h1>Content Opportunities Dashboard</h1>
<p>Generated locally from the structured rule database. This file is not a public website route and should not be uploaded as visitor-facing content.</p>
<p class="muted">Generated ${escapeHtml(report.generatedAt)}</p>
</section>
<section class="metrics" id="metrics"></section>
<section class="filters">
<input id="query" placeholder="Search item, slug, category or issue">
<select id="priority"><option value="">All priorities</option><option>P0</option><option>P1</option><option>P2</option><option>P3</option></select>
<select id="category"><option value="">All categories</option></select>
<button id="reset">Reset</button>
</section>
<div class="layout">
<section class="panel table-wrap">
<table class="table"><thead><tr><th>Priority</th><th>Page</th><th>Overall</th><th>Opportunity</th><th>Trust</th><th>Depth</th><th>Freshness</th><th>Recommended actions</th></tr></thead><tbody id="rows"></tbody></table>
<div class="empty" id="empty" hidden>No matching pages.</div>
</section>
<aside class="panel"><h2>Site-wide issues</h2><ol class="top-issues" id="topIssues"></ol><h2>How to use this</h2><p class="muted">Start with P0 pages, but improve them in small batches. Add official references and genuinely unique guidance before creating more URLs.</p></aside>
</div>
</main>
<script>
const report=${data};
const state={query:'',priority:'',category:''};
const e=(s)=>document.querySelector(s);
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
function metric(label,value){return '<article class="metric"><span class="muted">'+esc(label)+'</span><strong>'+esc(value)+'</strong></article>';}
e('#metrics').innerHTML=[metric('Rules audited',report.summary.totalRules),metric('P0 critical',report.summary.byPriority.P0),metric('P1 high',report.summary.byPriority.P1),metric('Average quality',report.summary.averages.overall+'/100'),metric('Average trust',report.summary.averages.trust+'/100'),metric('Average opportunity',report.summary.averages.opportunity+'/100')].join('');
const categories=[...new Set(report.rows.map(r=>r.category))].sort();
e('#category').innerHTML+=[...categories].map(c=>'<option>'+esc(c)+'</option>').join('');
e('#topIssues').innerHTML=report.summary.topIssues.map(i=>'<li><strong>'+esc(i.count)+'</strong> '+esc(i.label)+'</li>').join('');
function render(){const q=state.query.toLowerCase();const filtered=report.rows.filter(r=>(!state.priority||r.priority===state.priority)&&(!state.category||r.category===state.category)&&(!q||[r.item,r.slug,r.category,...r.issues.map(i=>i.label)].join(' ').toLowerCase().includes(q))).sort((a,b)=>b.scores.opportunity-a.scores.opportunity||a.item.localeCompare(b.item));e('#rows').innerHTML=filtered.map(r=>'<tr><td><span class="badge">'+esc(r.priority)+'</span></td><td><strong>'+esc(r.item)+'</strong><br><span class="muted">'+esc(r.href)+' · '+esc(r.category)+'</span></td><td class="score">'+r.scores.overall+'</td><td class="score">'+r.scores.opportunity+'</td><td>'+r.scores.trust+'</td><td>'+r.scores.depth+'</td><td>'+r.scores.freshness+'</td><td><ul class="issues">'+r.issues.slice(0,5).map(i=>'<li>'+esc(i.label)+'</li>').join('')+'</ul></td></tr>').join('');e('#empty').hidden=filtered.length!==0;}
e('#query').addEventListener('input',ev=>{state.query=ev.target.value;render()});e('#priority').addEventListener('change',ev=>{state.priority=ev.target.value;render()});e('#category').addEventListener('change',ev=>{state.category=ev.target.value;render()});e('#reset').addEventListener('click',()=>{state.query='';state.priority='';state.category='';e('#query').value='';e('#priority').value='';e('#category').value='';render()});render();
</script>
</body></html>`;
}

async function main() {
  const rules = await loadRules();
  const categoryCounts = new Map();
  const answerCounts = new Map();
  for (const rule of rules) {
    categoryCounts.set(rule.category, (categoryCounts.get(rule.category) || 0) + 1);
    const key = normalise(rule.shortAnswer);
    answerCounts.set(key, (answerCounts.get(key) || 0) + 1);
  }

  const rows = rules.map((rule) => scoreRule(rule, { categoryCounts, answerCounts }));
  const report = {
    version: '3.5.0',
    generatedAt: NOW.toISOString(),
    methodology: {
      staleAfterDays: STALE_AFTER_DAYS,
      note: 'Scores are prioritisation aids, not Google ranking predictions.',
    },
    summary: buildSummary(rows),
    rows,
  };

  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.writeFile(path.join(REPORTS_DIR, 'content-opportunities.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  await fs.writeFile(path.join(REPORTS_DIR, 'content-opportunities.html'), createHtml(report), 'utf8');
  console.log(`Generated local content opportunities dashboard for ${rows.length} rules.`);
  console.log(`Open: ${path.join(REPORTS_DIR, 'content-opportunities.html')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
