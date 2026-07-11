import type { RuleStatus } from '@/data/rules';

export type TravellerType = 'general' | 'family' | 'business' | 'student' | 'medical' | 'photographer';
export type BagMode = 'cabin' | 'checked';

export type TravelProfile = {
  airline: string;
  departure: string;
  destination: string;
  bagMode: BagMode;
  travellerType: TravellerType;
};

export type IntelligenceItem = {
  slug: string;
  item: string;
  category: string;
  shortAnswer: string;
  cabin: RuleStatus;
  checked: RuleStatus;
  warning?: string;
};

export type IntelligenceFinding = {
  id: string;
  severity: 'info' | 'check' | 'warning' | 'blocker';
  title: string;
  detail: string;
};

export type JourneyStage = {
  stage: 'Before leaving home' | 'Airport security' | 'Boarding and gate check' | 'On arrival';
  actions: string[];
};

export type TravelIntelligenceReport = {
  readiness: number;
  label: 'Not ready' | 'Needs attention' | 'Nearly ready' | 'Ready to verify';
  findings: IntelligenceFinding[];
  timeline: JourneyStage[];
  summary: string;
};

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function buildTravelIntelligenceReport(
  profile: TravelProfile,
  items: IntelligenceItem[],
  contextAlerts: string[] = [],
): TravelIntelligenceReport {
  const findings: IntelligenceFinding[] = [];
  const selectedStatuses = items.map((item) => profile.bagMode === 'cabin' ? item.cabin : item.checked);
  const blocked = selectedStatuses.filter((status) => status === 'Not allowed').length;
  const restricted = selectedStatuses.filter((status) => status === 'Restricted').length;
  const categories = items.map((item) => item.category.toLowerCase());

  if (!profile.airline) findings.push({ id: 'airline', severity: 'check', title: 'Select the operating airline', detail: 'The operating airline can apply stricter baggage and battery rules than a general travel rule.' });
  if (!profile.departure) findings.push({ id: 'departure', severity: 'info', title: 'Add the departure country', detail: 'Departure airport security controls liquids, screening and local exemptions.' });
  if (!profile.destination) findings.push({ id: 'destination', severity: 'check', title: 'Select the destination', detail: 'Destination customs and medicine rules are separate from airport security.' });
  if (items.length === 0) findings.push({ id: 'items', severity: 'check', title: 'Add the items you are packing', detail: 'The report becomes useful after at least one item is checked.' });

  items.forEach((item) => {
    const status = profile.bagMode === 'cabin' ? item.cabin : item.checked;
    if (status === 'Not allowed') findings.push({ id: `blocked-${item.slug}`, severity: 'blocker', title: `${item.item} is not allowed in this bag`, detail: item.warning || item.shortAnswer });
    else if (status === 'Restricted') findings.push({ id: `restricted-${item.slug}`, severity: 'warning', title: `${item.item} needs extra checks`, detail: item.warning || item.shortAnswer });
  });

  contextAlerts.forEach((detail, index) => findings.push({ id: `context-${index}`, severity: 'warning', title: 'Airline or destination reminder', detail }));

  if (categories.some((category) => category.includes('medication'))) {
    findings.push({ id: 'medical-docs', severity: profile.travellerType === 'medical' ? 'warning' : 'check', title: 'Carry medicine documents', detail: 'Keep important medicines labelled and carry a prescription or doctor letter where appropriate.' });
  }
  if (categories.some((category) => /battery|electronic/.test(category))) {
    findings.push({ id: 'battery-access', severity: 'check', title: 'Keep batteries accessible', detail: 'Power banks and spare lithium batteries normally belong in cabin baggage with terminals protected.' });
  }
  if (categories.some((category) => /food|baby/.test(category))) {
    findings.push({ id: 'customs-food', severity: 'check', title: 'Security permission is not customs permission', detail: 'Food and baby-item screening exceptions do not override destination biosecurity and import rules.' });
  }

  const profileComplete = [profile.airline, profile.departure, profile.destination].filter(Boolean).length;
  let readiness = 25 + profileComplete * 10 + Math.min(items.length * 6, 24);
  readiness -= blocked * 25;
  readiness -= restricted * 8;
  readiness -= contextAlerts.length * 2;
  if (items.length && blocked === 0) readiness += 8;
  readiness = Math.max(0, Math.min(100, readiness));

  const label = readiness < 40 ? 'Not ready' : readiness < 65 ? 'Needs attention' : readiness < 85 ? 'Nearly ready' : 'Ready to verify';

  const beforeHome = unique([
    'Confirm the operating airline and current baggage policy.',
    profile.destination ? `Review ${profile.destination} customs guidance for restricted or declarable goods.` : 'Add a destination to receive customs reminders.',
    blocked ? 'Remove or repack every item marked not allowed.' : 'Keep rule pages and supporting documents available offline.',
  ]);
  const security = unique([
    'Keep liquids, medication, batteries and baby supplies easy to remove for screening.',
    categories.some((category) => /battery|electronic/.test(category)) ? 'Protect spare battery terminals and keep power banks in cabin baggage.' : '',
    categories.some((category) => /medication/.test(category)) ? 'Present medicine documents if requested.' : '',
  ]);
  const boarding = unique([
    'Be ready to remove valuables, medicines and batteries if the cabin bag is gate checked.',
    'Follow the operating carrier when a codeshare itinerary names more than one airline.',
  ]);
  const arrival = unique([
    profile.destination ? `Read the ${profile.destination} declaration carefully and declare uncertain goods.` : 'Check destination declarations before arrival.',
    categories.some((category) => /food|baby/.test(category)) ? 'Declare food, plant, animal or agricultural products when required.' : '',
  ]);

  return {
    readiness,
    label,
    findings: findings.slice(0, 12),
    timeline: [
      { stage: 'Before leaving home', actions: beforeHome },
      { stage: 'Airport security', actions: security },
      { stage: 'Boarding and gate check', actions: boarding },
      { stage: 'On arrival', actions: arrival },
    ],
    summary: blocked > 0
      ? `${blocked} item${blocked === 1 ? '' : 's'} must be removed or repacked before travel.`
      : restricted > 0
        ? `${restricted} item${restricted === 1 ? '' : 's'} need additional checks or documents.`
        : items.length
          ? 'No prohibited item was found in the selected bag, but official verification still matters.'
          : 'Add your journey and packing list to generate a personalised report.',
  };
}
