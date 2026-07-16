import type { TravellerType, TravelIntelligenceReport } from '@/lib/travelIntelligence';

export type LaunchBagMode = 'cabin' | 'checked';

export type LaunchRule = {
  slug: string;
  item: string;
  category: string;
  shortAnswer: string;
  cabin: 'Allowed' | 'Restricted' | 'Not allowed';
  checked: 'Allowed' | 'Restricted' | 'Not allowed';
  warning?: string;
  tags: string[];
};

export type PackingChecklistItem = {
  id: string;
  title: string;
  detail: string;
  priority: 'essential' | 'important' | 'recommended';
};

export type ShareableTrip = {
  airline: string;
  departure: string;
  destination: string;
  bagMode: LaunchBagMode;
  travellerType: TravellerType;
  selectedSlugs: string[];
};

function uniqueById(items: PackingChecklistItem[]) {
  return Array.from(new Map(items.map((item) => [item.id, item])).values());
}

export function buildSmartPackingChecklist(input: {
  airline: string;
  departure: string;
  destination: string;
  bagMode: LaunchBagMode;
  travellerType: TravellerType;
  rules: LaunchRule[];
  report: TravelIntelligenceReport;
}): PackingChecklistItem[] {
  const { airline, departure, destination, bagMode, travellerType, rules, report } = input;
  const text = rules
    .flatMap((rule) => [rule.item, rule.category, rule.shortAnswer, rule.warning || '', ...rule.tags])
    .join(' ')
    .toLowerCase();

  const checklist: PackingChecklistItem[] = [
    {
      id: 'travel-documents',
      title: 'Keep travel documents accessible',
      detail: 'Carry your passport, boarding pass and essential booking details where you can reach them quickly.',
      priority: 'essential',
    },
    {
      id: 'airline-policy',
      title: airline ? `Check ${airline}'s current policy` : 'Confirm the operating airline',
      detail: airline
        ? `Recheck ${airline}'s baggage and restricted-item pages shortly before departure.`
        : 'Select the operating airline so airline-specific differences can be detected.',
      priority: 'essential',
    },
    {
      id: 'bag-size-weight',
      title: 'Confirm bag size and weight',
      detail: `Check that your ${bagMode === 'cabin' ? 'cabin' : 'checked'} baggage meets the operating airline's current allowance.`,
      priority: 'important',
    },
  ];

  if (departure) {
    checklist.push({
      id: 'departure-security',
      title: `Review ${departure} departure-security guidance`,
      detail: 'Check current screening rules for liquids, electronics, medicines and family supplies.',
      priority: 'important',
    });
  }

  if (destination) {
    checklist.push({
      id: 'destination-customs',
      title: `Review ${destination} customs and declarations`,
      detail: 'Security permission does not replace customs, biosecurity, medicine or import requirements.',
      priority: 'essential',
    });
  }

  if (/battery|power bank|lithium|electronic/.test(text)) {
    checklist.push({
      id: 'battery-check',
      title: 'Protect and verify batteries',
      detail: 'Keep power banks and spare lithium batteries in cabin baggage, protect terminals and confirm watt-hour limits.',
      priority: 'essential',
    });
  }

  if (/medication|medicine|medical|prescription/.test(text) || travellerType === 'medical') {
    checklist.push({
      id: 'medicine-documents',
      title: 'Pack medicine documents',
      detail: 'Keep medicines labelled and carry prescriptions, doctor letters or supporting evidence where appropriate.',
      priority: 'essential',
    });
  }

  if (/baby|infant|milk|formula/.test(text) || travellerType === 'family') {
    checklist.push({
      id: 'family-screening',
      title: 'Prepare baby and family supplies for screening',
      detail: 'Keep baby milk, food, medicines and essential child supplies easy to remove and allow extra screening time.',
      priority: 'important',
    });
  }

  if (/food|plant|animal|agricultur|baby|milk|formula/.test(text)) {
    checklist.push({
      id: 'food-declaration',
      title: 'Check food and biosecurity declarations',
      detail: 'Declare uncertain food, plant, animal or agricultural products whenever destination rules require it.',
      priority: 'essential',
    });
  }

  if (/liquid|perfume|toiletr|cosmetic/.test(text)) {
    checklist.push({
      id: 'liquids-ready',
      title: 'Prepare liquids for security',
      detail: 'Use the required container and bag format and keep liquids easy to remove unless local screening rules say otherwise.',
      priority: 'important',
    });
  }

  if (travellerType === 'business') {
    checklist.push({
      id: 'business-backup',
      title: 'Protect essential work equipment',
      detail: 'Keep laptops, chargers, valuables and critical documents with you if a cabin bag is gate checked.',
      priority: 'recommended',
    });
  }

  if (travellerType === 'student') {
    checklist.push({
      id: 'student-documents',
      title: 'Separate study and accommodation documents',
      detail: 'Keep admission, visa, accommodation and travel evidence outside checked baggage.',
      priority: 'recommended',
    });
  }

  if (travellerType === 'photographer') {
    checklist.push({
      id: 'camera-equipment',
      title: 'Check specialist camera equipment',
      detail: 'Verify spare batteries, tripods, drones and oversized equipment with the airline and destination authorities.',
      priority: 'important',
    });
  }

  report.priorityActions.forEach((action) => {
    checklist.push({
      id: `report-${action.id}`,
      title: action.title,
      detail: action.detail,
      priority: action.priority === 'urgent' ? 'essential' : action.priority === 'important' ? 'important' : 'recommended',
    });
  });

  return uniqueById(checklist).slice(0, 14);
}

export function findPackingAssistantMatches(query: string, rules: LaunchRule[], limit = 6) {
  const terms = query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((term) => term.length > 2);

  if (terms.length === 0) return [];

  return rules
    .map((rule) => {
      const haystack = [rule.item, rule.category, rule.shortAnswer, rule.warning || '', ...rule.tags]
        .join(' ')
        .toLowerCase();
      const matched = terms.filter((term) => haystack.includes(term));
      const titleBonus = terms.some((term) => rule.item.toLowerCase().includes(term)) ? 8 : 0;
      return { rule, score: matched.length * 4 + titleBonus };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.rule.item.localeCompare(b.rule.item))
    .slice(0, limit)
    .map((entry) => entry.rule);
}

export function encodeShareableTrip(trip: ShareableTrip) {
  const json = JSON.stringify(trip);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function decodeShareableTrip(value: string): ShareableTrip | undefined {
  try {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as Partial<ShareableTrip>;

    if (
      typeof parsed.airline !== 'string' ||
      typeof parsed.departure !== 'string' ||
      typeof parsed.destination !== 'string' ||
      (parsed.bagMode !== 'cabin' && parsed.bagMode !== 'checked') ||
      !['general', 'family', 'business', 'student', 'medical', 'photographer'].includes(parsed.travellerType || '') ||
      !Array.isArray(parsed.selectedSlugs)
    ) {
      return undefined;
    }

    return {
      airline: parsed.airline,
      departure: parsed.departure,
      destination: parsed.destination,
      bagMode: parsed.bagMode,
      travellerType: parsed.travellerType as TravellerType,
      selectedSlugs: parsed.selectedSlugs.filter((slug): slug is string => typeof slug === 'string'),
    };
  } catch {
    return undefined;
  }
}
