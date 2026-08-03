import type { Rule } from '@/data/rules';

const categoryIntent: Record<string, { pillar: string; entities: string[]; checks: string[] }> = {
  Batteries: { pillar: 'Battery and power bank travel rules', entities: ['lithium battery', 'watt-hour rating', 'spare battery', 'airport security'], checks: ['Check the Wh rating', 'Keep spare batteries in cabin baggage', 'Protect exposed terminals'] },
  Medication: { pillar: 'Medication and medical travel rules', entities: ['prescription', 'doctor letter', 'controlled medicine', 'airport screening'], checks: ['Keep medicine labelled', 'Carry supporting documents', 'Check destination controls'] },
  Liquids: { pillar: 'Liquids and airport security rules', entities: ['100 ml rule', 'clear liquids bag', 'security screening', 'duty-free liquids'], checks: ['Check the departure airport limit', 'Separate exemptions for screening', 'Keep receipts for sealed duty-free items'] },
  'Baby travel': { pillar: 'Baby and family travel rules', entities: ['baby formula', 'breast milk', 'pushchair', 'family security'], checks: ['Pack feeding supplies accessibly', 'Allow extra screening time', 'Check airline family baggage rules'] },
  Electronics: { pillar: 'Electronics and devices in baggage', entities: ['laptop', 'lithium battery', 'cabin baggage', 'device screening'], checks: ['Protect the device', 'Check battery restrictions', 'Keep valuable electronics in cabin baggage'] },
};

const fallback = { pillar: 'Travel item rules and packing guidance', entities: ['cabin baggage', 'checked baggage', 'airport security', 'destination rules'], checks: ['Check airline policy', 'Check airport screening rules', 'Check destination customs rules'] };

export function getAuthorityProfile(rule: Rule) {
  const intent = categoryIntent[rule.category] ?? fallback;
  const queryStem = rule.item.replace(/\s+on\s+.+$/i, '').replace(/\s+in\s+.+$/i, '').trim();
  const questions = [
    `Can I take ${queryStem} in cabin baggage?`,
    `Can ${queryStem} go in checked baggage?`,
    `Will ${queryStem} need separate airport screening?`,
    `Do destination customs rules affect ${queryStem}?`,
  ];
  return { ...intent, queryStem, questions };
}

export function buildClusterSummary(rules: Rule[]) {
  const counts = new Map<string, number>();
  for (const rule of rules) counts.set(rule.category, (counts.get(rule.category) ?? 0) + 1);
  return [...counts.entries()].map(([category, count]) => ({ category, count })).sort((a, b) => b.count - a.count);
}
