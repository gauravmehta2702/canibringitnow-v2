import type { RuleStatus } from '@/data/rules';

export type TravellerType =
  | 'general'
  | 'family'
  | 'business'
  | 'student'
  | 'medical'
  | 'photographer';

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

export type ReadinessFactor = {
  id: string;
  label: string;
  points: number;
  explanation: string;
};

export type PriorityAction = {
  id: string;
  priority: 'urgent' | 'important' | 'recommended';
  title: string;
  detail: string;
};

export type JourneyStage = {
  stage:
    | 'Before leaving home'
    | 'Airport security'
    | 'Boarding and gate check'
    | 'On arrival';
  actions: string[];
};

export type TravelIntelligenceReport = {
  readiness: number;
  label:
    | 'Not ready'
    | 'Needs attention'
    | 'Nearly ready'
    | 'Ready to verify';
  riskLevel: 'High risk' | 'Moderate risk' | 'Low risk' | 'Final checks';
  decisionSummary: string;
  findings: IntelligenceFinding[];
  scoreBreakdown: ReadinessFactor[];
  priorityActions: PriorityAction[];
  timeline: JourneyStage[];
  summary: string;
};

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function pluralise(count: number, singular: string, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}

function travellerAdvice(
  travellerType: TravellerType,
): IntelligenceFinding | undefined {
  switch (travellerType) {
    case 'family':
      return {
        id: 'traveller-family',
        severity: 'check',
        title: 'Prepare family items for separate screening',
        detail:
          'Keep baby food, milk, medicines and essential child supplies easy to remove. Allow extra time for security checks.',
      };
    case 'business':
      return {
        id: 'traveller-business',
        severity: 'info',
        title: 'Protect essential work equipment',
        detail:
          'Keep laptops, chargers, batteries, documents and valuables accessible, especially if your cabin bag may be gate checked.',
      };
    case 'student':
      return {
        id: 'traveller-student',
        severity: 'info',
        title: 'Keep documents and electronics accessible',
        detail:
          'Carry travel, study and accommodation documents separately from checked baggage. Verify batteries and electronics before departure.',
      };
    case 'medical':
      return {
        id: 'traveller-medical',
        severity: 'warning',
        title: 'Carry medical evidence and essential supplies in cabin baggage',
        detail:
          'Keep medicines labelled and carry prescriptions, medical letters or supporting documents where appropriate. Check storage requirements.',
      };
    case 'photographer':
      return {
        id: 'traveller-photographer',
        severity: 'check',
        title: 'Check batteries and specialist equipment',
        detail:
          'Protect spare battery terminals, keep lithium batteries in cabin baggage and verify restrictions for tripods, drones and oversized equipment.',
      };
    default:
      return undefined;
  }
}

export function buildTravelIntelligenceReport(
  profile: TravelProfile,
  items: IntelligenceItem[],
  contextAlerts: string[] = [],
): TravelIntelligenceReport {
  const findings: IntelligenceFinding[] = [];
  const scoreBreakdown: ReadinessFactor[] = [];
  const priorityActions: PriorityAction[] = [];

  const selectedStatuses = items.map((item) =>
    profile.bagMode === 'cabin' ? item.cabin : item.checked,
  );
  const blocked = selectedStatuses.filter((status) => status === 'Not allowed').length;
  const restricted = selectedStatuses.filter((status) => status === 'Restricted').length;
  const allowed = selectedStatuses.filter((status) => status === 'Allowed').length;
  const categories = items.map((item) => item.category.toLowerCase());
  const hasMedication = categories.some((category) => category.includes('medication'));
  const hasBatteryOrElectronic = categories.some((category) =>
    /battery|batteries|electronic|electronics/.test(category),
  );
  const hasFoodOrBabyItem = categories.some((category) =>
    /food|baby|infant|milk|formula/.test(category),
  );

  let readiness = 20;
  scoreBreakdown.push({
    id: 'base',
    label: 'Base journey check',
    points: 20,
    explanation: 'Every report starts with a basic preparation score.',
  });

  if (profile.airline) {
    readiness += 12;
    scoreBreakdown.push({ id: 'airline', label: 'Operating airline selected', points: 12, explanation: `The report can compare rules with ${profile.airline}.` });
  } else {
    findings.push({ id: 'missing-airline', severity: 'check', title: 'Select the operating airline', detail: 'Airlines can apply stricter baggage, battery, medical-equipment and infant-item rules than general guidance.' });
    priorityActions.push({ id: 'select-airline', priority: 'important', title: 'Select the operating airline', detail: 'This is needed to detect airline-specific rule mismatches.' });
  }

  if (profile.departure) {
    readiness += 8;
    scoreBreakdown.push({ id: 'departure', label: 'Departure selected', points: 8, explanation: `Departure screening context is set to ${profile.departure}.` });
  } else {
    findings.push({ id: 'missing-departure', severity: 'info', title: 'Add the departure country', detail: 'Departure security controls screening, liquid restrictions and local exemptions.' });
  }

  if (profile.destination) {
    readiness += 12;
    scoreBreakdown.push({ id: 'destination', label: 'Destination selected', points: 12, explanation: `Customs and arrival context is set to ${profile.destination}.` });
  } else {
    findings.push({ id: 'missing-destination', severity: 'check', title: 'Select the destination', detail: 'Airport security permission does not automatically mean destination customs permits an item.' });
    priorityActions.push({ id: 'select-destination', priority: 'important', title: 'Select the destination', detail: 'This is needed for customs, biosecurity and medicine reminders.' });
  }

  readiness += 8;
  scoreBreakdown.push({ id: 'bag-mode', label: 'Bag type selected', points: 8, explanation: `Rules are being checked for ${profile.bagMode === 'cabin' ? 'cabin baggage' : 'checked baggage'}.` });

  if (items.length > 0) {
    const itemPoints = Math.min(18, items.length * 6);
    readiness += itemPoints;
    scoreBreakdown.push({ id: 'items', label: `${items.length} ${pluralise(items.length, 'item')} checked`, points: itemPoints, explanation: 'Adding items makes the report specific to the packing list.' });
  } else {
    findings.push({ id: 'missing-items', severity: 'check', title: 'Add the items you are packing', detail: 'The report becomes useful after at least one item has been selected.' });
    priorityActions.push({ id: 'add-items', priority: 'urgent', title: 'Add at least one item', detail: 'No packing decision can be made until an item is selected.' });
  }

  if (allowed > 0) {
    const allowedPoints = Math.min(10, allowed * 3);
    readiness += allowedPoints;
    scoreBreakdown.push({ id: 'allowed-items', label: `${allowed} allowed ${pluralise(allowed, 'item')}`, points: allowedPoints, explanation: 'Allowed items improve readiness, but final verification still matters.' });
  }

  items.forEach((item) => {
    const status = profile.bagMode === 'cabin' ? item.cabin : item.checked;
    if (status === 'Not allowed') {
      findings.push({ id: `blocked-${item.slug}`, severity: 'blocker', title: `${item.item} is not allowed in this bag`, detail: item.warning || `${item.shortAnswer} Remove it, change bags or confirm an authorised alternative before travelling.` });
      priorityActions.push({ id: `remove-${item.slug}`, priority: 'urgent', title: `Remove or repack ${item.item}`, detail: `It is marked not allowed in ${profile.bagMode === 'cabin' ? 'cabin' : 'checked'} baggage.` });
    } else if (status === 'Restricted') {
      findings.push({ id: `restricted-${item.slug}`, severity: 'warning', title: `${item.item} needs additional checks`, detail: item.warning || `${item.shortAnswer} Verify quantity, size, documentation and airline-specific conditions.` });
      priorityActions.push({ id: `verify-${item.slug}`, priority: 'important', title: `Verify conditions for ${item.item}`, detail: 'Check quantity, size, documents and airline approval before departure.' });
    }
  });

  contextAlerts.forEach((detail, index) => {
    const lower = detail.toLowerCase();
    const isAirlineMismatch = lower.includes('selected airline') || lower.includes('another airline') || lower.includes('based on');
    const isDestinationMismatch = lower.includes('selected destination') || lower.includes('customs rules separately');
    const isSourceGap = lower.includes('official-source') || lower.includes('official source');
    const title = isAirlineMismatch
      ? 'Selected rule and airline do not match'
      : isDestinationMismatch
        ? 'Selected rule and destination may not match'
        : isSourceGap
          ? 'Official verification is still required'
          : 'Important journey-context check';
    findings.push({ id: `context-${index}`, severity: 'warning', title, detail });
    priorityActions.push({
      id: `context-action-${index}`,
      priority: isAirlineMismatch || isDestinationMismatch ? 'urgent' : 'important',
      title: isAirlineMismatch ? 'Verify the selected airline policy' : isDestinationMismatch ? 'Verify destination rules' : 'Open the relevant official source',
      detail,
    });
  });

  if (hasMedication) {
    findings.push({ id: 'medical-documents', severity: profile.travellerType === 'medical' ? 'warning' : 'check', title: 'Carry medicine documents', detail: 'Keep medicines in labelled packaging and carry a prescription, doctor letter or supporting evidence where appropriate.' });
    priorityActions.push({ id: 'medicine-documents', priority: 'important', title: 'Prepare medicine documents', detail: 'Keep prescriptions or medical evidence accessible during the journey.' });
  }
  if (hasBatteryOrElectronic) {
    findings.push({ id: 'battery-access', severity: 'check', title: 'Keep lithium batteries accessible', detail: 'Power banks and spare lithium batteries normally belong in cabin baggage. Protect terminals and check watt-hour and quantity limits.' });
  }
  if (hasFoodOrBabyItem) {
    findings.push({ id: 'customs-food', severity: 'check', title: 'Security permission is not customs permission', detail: 'Baby-food and liquid screening exceptions do not override destination biosecurity, food-import or declaration requirements.' });
    priorityActions.push({ id: 'food-customs', priority: 'important', title: 'Check food and baby-item declarations', detail: 'Confirm destination import and biosecurity rules before travel.' });
  }

  const tailoredAdvice = travellerAdvice(profile.travellerType);
  if (tailoredAdvice) findings.push(tailoredAdvice);

  if (blocked > 0) {
    const deduction = blocked * 28;
    readiness -= deduction;
    scoreBreakdown.push({ id: 'blocked-deduction', label: `${blocked} prohibited ${pluralise(blocked, 'item')}`, points: -deduction, explanation: 'A prohibited item is a major readiness risk.' });
  }
  if (restricted > 0) {
    const deduction = restricted * 10;
    readiness -= deduction;
    scoreBreakdown.push({ id: 'restricted-deduction', label: `${restricted} restricted ${pluralise(restricted, 'item')}`, points: -deduction, explanation: 'Restricted items need extra checks or documents.' });
  }
  if (contextAlerts.length > 0) {
    const deduction = Math.min(18, contextAlerts.length * 4);
    readiness -= deduction;
    scoreBreakdown.push({ id: 'context-deduction', label: `${contextAlerts.length} unresolved context ${pluralise(contextAlerts.length, 'warning')}`, points: -deduction, explanation: 'Airline, destination or source mismatches reduce confidence.' });
  }
  if (hasMedication) readiness -= 3;
  if (hasBatteryOrElectronic) readiness -= 2;
  if (hasFoodOrBabyItem && profile.destination) readiness -= 3;

  readiness = Math.max(0, Math.min(100, readiness));
  const label: TravelIntelligenceReport['label'] = readiness < 40 ? 'Not ready' : readiness < 65 ? 'Needs attention' : readiness < 85 ? 'Nearly ready' : 'Ready to verify';
  const riskLevel: TravelIntelligenceReport['riskLevel'] = blocked > 0 || readiness < 40 ? 'High risk' : restricted > 0 || contextAlerts.length > 1 || readiness < 65 ? 'Moderate risk' : readiness < 85 ? 'Low risk' : 'Final checks';

  const decisionSummary = blocked > 0
    ? `Do not travel with the current packing setup until ${blocked} prohibited ${pluralise(blocked, 'item')} are removed or repacked.`
    : restricted > 0
      ? `The trip can proceed only after the conditions for ${restricted} restricted ${pluralise(restricted, 'item')} are confirmed.`
      : contextAlerts.length > 0
        ? 'The selected items are not prohibited in this bag, but the journey context is not fully verified.'
        : items.length > 0
          ? 'The selected items appear broadly compatible with this bag. Complete final official checks before departure.'
          : 'Add items to receive a journey-specific packing decision.';

  const beforeHome = unique([
    profile.airline ? `Confirm ${profile.airline}'s current baggage and restricted-item policies.` : 'Select the operating airline and confirm its current baggage policy.',
    profile.destination ? `Review ${profile.destination} customs, medicine and declaration guidance.` : 'Add a destination to receive customs and arrival reminders.',
    blocked > 0 ? `Remove or repack ${blocked} ${pluralise(blocked, 'item')} marked not allowed.` : 'Keep important rule pages and supporting documents available offline.',
    contextAlerts.length > 0 ? 'Resolve every airline, destination and official-source warning before departure.' : '',
    hasMedication ? 'Pack prescriptions, doctor letters and medicine documents where appropriate.' : '',
    hasBatteryOrElectronic ? 'Check lithium-battery watt-hour and quantity limits.' : '',
  ]);
  const security = unique([
    'Keep liquids, medication, batteries and baby supplies easy to remove for screening.',
    hasBatteryOrElectronic ? 'Protect spare battery terminals and keep power banks in cabin baggage.' : '',
    hasMedication ? 'Present medicine documents if requested.' : '',
    hasFoodOrBabyItem ? 'Expect baby food, milk or formula to be screened separately.' : '',
  ]);
  const boarding = unique([
    'Be ready to remove valuables, medicines and batteries if the cabin bag is gate checked.',
    'Follow the operating carrier when a codeshare itinerary names more than one airline.',
    restricted > 0 ? `Keep evidence for ${restricted} restricted ${pluralise(restricted, 'item')} accessible.` : '',
  ]);
  const arrival = unique([
    profile.destination ? `Read the ${profile.destination} declaration carefully and declare uncertain goods.` : 'Check destination declarations before arrival.',
    hasFoodOrBabyItem ? 'Declare food, plant, animal or agricultural products when required.' : '',
    hasMedication ? 'Keep medicines and supporting documents available until customs checks are complete.' : '',
  ]);

  const summary = blocked > 0
    ? `${blocked} ${pluralise(blocked, 'item')} must be removed or repacked before travel.`
    : restricted > 0
      ? `${restricted} ${pluralise(restricted, 'item')} need additional checks, documents or approval.`
      : contextAlerts.length > 0
        ? 'The selected bag contains no prohibited item, but airline, destination or official-source checks remain unresolved.'
        : items.length > 0
          ? 'No prohibited item was found in the selected bag. Complete final official checks before travelling.'
          : 'Add your journey and packing list to generate a personalised report.';

  return {
    readiness,
    label,
    riskLevel,
    decisionSummary,
    findings: findings.slice(0, 16),
    scoreBreakdown,
    priorityActions: priorityActions.slice(0, 8),
    timeline: [
      { stage: 'Before leaving home', actions: beforeHome },
      { stage: 'Airport security', actions: security },
      { stage: 'Boarding and gate check', actions: boarding },
      { stage: 'On arrival', actions: arrival },
    ],
    summary,
  };
}
