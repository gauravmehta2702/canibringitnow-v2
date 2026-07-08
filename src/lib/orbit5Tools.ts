export type ToolCard = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export function getOrbit5Tools(): ToolCard[] {
  return [
    { title: 'Travel Tools Hub', href: '/travel-tools/', label: 'Hub', description: 'All interactive travel tools in one place.' },
    { title: 'Baggage Allowance Calculator', href: '/tools/baggage-allowance-calculator/', label: 'Baggage', description: 'Estimate cabin and checked baggage planning needs.' },
    { title: 'Cabin Bag Size Checker', href: '/tools/cabin-bag-size-checker/', label: 'Cabin bag', description: 'Check whether a bag size looks suitable before flying.' },
    { title: 'Travel Budget Calculator', href: '/tools/travel-budget-calculator/', label: 'Budget', description: 'Estimate trip cost from flights, hotels, food and extras.' },
    { title: 'Travel Checklist Builder', href: '/tools/travel-checklist-builder/', label: 'Checklist', description: 'Create a practical pre-flight checklist.' },
    { title: 'Passport Validity Checker', href: '/tools/passport-validity-checker/', label: 'Documents', description: 'Check whether passport validity may need attention.' },
    { title: 'Duty-Free Allowance Planner', href: '/tools/duty-free-allowance-planner/', label: 'Customs', description: 'Plan what to verify before buying duty-free goods.' },
    { title: 'Airport Delay Readiness Checker', href: '/tools/airport-delay-readiness-checker/', label: 'Airport', description: 'Prepare for possible delays before leaving home.' },
    { title: 'Flight Status Checker Framework', href: '/tools/flight-status-checker/', label: 'API-ready', description: 'Future-ready flight status tool placeholder.' },
  ];
}

export function getDefaultChecklist(travellerType: string, destination: string, airline: string, items: string) {
  const list = [
    'Passport and travel documents', 'Visa or entry requirement check', 'Travel insurance', 'Flight booking and airline app',
    'Hotel or accommodation confirmation', 'Airport transfer or transport plan', 'Medication and prescriptions',
    'Phone charger and travel adapter', 'Power bank in cabin baggage', 'Liquids packed according to airport rules',
    'Cabin bag and checked bag weight check', 'Destination customs check',
  ];
  const lower = `${travellerType} ${destination} ${airline} ${items}`.toLowerCase();
  if (lower.includes('baby') || lower.includes('infant') || lower.includes('child')) list.push('Baby milk or formula', 'Baby food', 'Nappies and wipes', 'Stroller or carrier', 'Baby medication');
  if (lower.includes('japan')) list.push('Japan customs check', 'Plug adapter for Japan', 'eSIM or roaming plan for Japan');
  if (lower.includes('medicine') || lower.includes('medication') || lower.includes('insulin')) list.push('Doctor letter or prescription copy', 'Medication in original packaging', 'Destination medicine rules check');
  if (lower.includes('power') || lower.includes('battery') || lower.includes('charger')) list.push('Check battery capacity', 'Keep spare batteries in cabin bag', 'Do not pack power banks in checked baggage');
  return Array.from(new Set(list));
}

export function getToolInternalLinks(): ToolCard[] {
  return [
    { title: 'Search travel rules', href: '/search/', label: 'Rules', description: 'Search items, airlines and countries.' },
    { title: 'Trip Planner', href: '/trip-planner/', label: 'Planner', description: 'Plan a full trip with airline and destination context.' },
    { title: 'Country Guides', href: '/country-guides/', label: 'Countries', description: 'Customs, packing and destination checks.' },
    { title: 'Airline Guides', href: '/airline-guides/', label: 'Airlines', description: 'Baggage and item guidance by airline.' },
    { title: 'Airport Guides', href: '/airport-guides/', label: 'Airports', description: 'Security, hotels and transport guidance.' },
    { title: 'Travel Deals', href: '/travel-deals/', label: 'Deals', description: 'Flight, hotel, eSIM and travel gear ideas.' },
  ];
}
