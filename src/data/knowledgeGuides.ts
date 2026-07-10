export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type KnowledgeGuide = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  audience: string;
  updated: string;
  readingMinutes: number;
  tags: string[];
  relatedRuleTerms: string[];
  keyTakeaways: string[];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  officialChecks: { label: string; description: string }[];
};

export const knowledgeGuides: KnowledgeGuide[] = [
  {
    slug: 'airport-security-screening-guide',
    title: 'Airport Security Screening: What Travellers Should Expect',
    shortTitle: 'Airport security screening',
    description: 'A practical guide to preparing cabin baggage, liquids, electronics, medication and family items for airport security screening.',
    category: 'Airport security', audience: 'All travellers', updated: '2026-07-10', readingMinutes: 10,
    tags: ['security', 'airport', 'screening', 'liquids', 'electronics', 'medication'],
    relatedRuleTerms: ['liquid', 'laptop', 'power bank', 'medicine', 'baby milk', 'aerosol'],
    keyTakeaways: ['Security officers make the final decision at the checkpoint.', 'Keep items likely to need inspection easy to reach.', 'Rules can differ by departure airport and transit point.', 'Allow extra time when carrying medical, baby or unusual items.'],
    sections: [
      { heading: 'How airport screening decisions are made', paragraphs: ['Airport security rules are designed to reduce risks in the aircraft cabin. Screening staff assess the item, its packaging, quantity and condition rather than relying only on its name.', 'An item can be generally permitted yet still receive additional inspection. The final decision rests with the security authority at the airport.'] },
      { heading: 'Prepare your cabin bag before leaving home', paragraphs: ['Put liquids, large electronics, batteries, medicines and baby supplies where they can be removed without unpacking the entire bag. Clear labelling makes explanations easier.'], bullets: ['Check the airport website for local procedures.', 'Use secure containers and protect sharp edges or battery terminals.', 'Carry supporting documents for essential medicines.', 'Avoid packing unknown powders or unlabelled liquids.'] },
      { heading: 'Connecting flights and transit screening', paragraphs: ['A connection may involve another security check. Duty-free liquids, medicines and other items accepted at the first airport may be assessed again under different local procedures.', 'Plan around the strictest checkpoint on the journey, not only the departure airport.'] },
      { heading: 'What to do if an item is questioned', paragraphs: ['Stay calm, explain the purpose of the item and show labels or documents. Do not argue with screening staff. If the item cannot travel, ask whether it can be checked, surrendered or collected by someone who is not travelling.'] },
    ],
    faqs: [
      { question: 'Can security refuse an item that an airline allows?', answer: 'Yes. Airline acceptance and airport security approval are separate decisions.' },
      { question: 'Do all airports use the same liquid rules?', answer: 'No. Technology and local regulations vary, so check the departure and transit airports.' },
      { question: 'Should medicines be removed from the bag?', answer: 'Keep them accessible. Staff may ask to inspect them or supporting documents.' },
    ],
    officialChecks: [{ label: 'Departure airport', description: 'Check the security and prohibited-items pages for your terminal.' }, { label: 'Operating airline', description: 'Confirm cabin baggage and dangerous-goods conditions.' }, { label: 'Destination authority', description: 'Check customs and import restrictions separately.' }],
  },
  {
    slug: 'lithium-battery-power-bank-guide',
    title: 'Lithium Batteries and Power Banks on Flights', shortTitle: 'Lithium batteries and power banks',
    description: 'Understand watt-hours, cabin-only rules, spare battery protection and common airline restrictions for lithium batteries and power banks.',
    category: 'Batteries', audience: 'Travellers carrying electronics', updated: '2026-07-10', readingMinutes: 12,
    tags: ['battery', 'power bank', 'lithium', 'watt hour', 'electronics'], relatedRuleTerms: ['power bank', 'battery', 'laptop', 'camera', 'charger'],
    keyTakeaways: ['Power banks and spare lithium batteries normally belong in cabin baggage.', 'Capacity is commonly measured in watt-hours.', 'Damaged or swollen batteries should never travel.', 'Airline approval may be needed for higher-capacity batteries.'],
    sections: [
      { heading: 'Why lithium batteries receive special treatment', paragraphs: ['Lithium batteries can release heat if damaged, short-circuited or defective. A problem in the cabin can be detected and managed more quickly than one hidden in the aircraft hold.'] },
      { heading: 'Understanding watt-hours', paragraphs: ['Watt-hours indicate stored energy. If only milliamp-hours and voltage are shown, watt-hours can be calculated by multiplying amp-hours by voltage.', 'Do not rely on appearance alone. A compact specialist battery may have a higher rating than a physically larger consumer power bank.'], bullets: ['Locate the Wh marking before travel.', 'Keep the product label readable.', 'Carry evidence of specifications if the marking is unclear.'] },
      { heading: 'Packing batteries safely', paragraphs: ['Protect exposed terminals from metal objects. Use the original case, individual sleeves or terminal covers. Keep batteries dry and do not carry recalled, punctured or swollen products.'] },
      { heading: 'Gate checking and connecting flights', paragraphs: ['Remove power banks and spare batteries before a cabin bag is gate-checked. On multi-airline trips, verify every operating carrier because approval thresholds and quantity limits can differ.'] },
    ],
    faqs: [
      { question: 'Can a power bank go in checked baggage?', answer: 'Usually no. Power banks are generally treated as spare lithium batteries and should remain in cabin baggage.' },
      { question: 'What if the watt-hour rating is missing?', answer: 'The airline or security team may refuse it if capacity cannot be verified.' },
      { question: 'Can I use a power bank during the flight?', answer: 'Some airlines restrict charging or use onboard. Follow crew instructions and the airline policy.' },
    ],
    officialChecks: [{ label: 'Airline dangerous-goods policy', description: 'Confirm capacity, quantity and onboard-use rules.' }, { label: 'Battery manufacturer', description: 'Verify specifications, condition and recall status.' }],
  },
  {
    slug: 'flying-with-medication-guide',
    title: 'Flying With Medication: Documents, Liquids and Controlled Drugs', shortTitle: 'Flying with medication',
    description: 'Prepare prescriptions, liquid medicines, needles, cooling equipment and controlled medication for international air travel.',
    category: 'Medication', audience: 'Travellers with medical needs', updated: '2026-07-10', readingMinutes: 13,
    tags: ['medication', 'medicine', 'prescription', 'liquid medicine', 'controlled drug'], relatedRuleTerms: ['medicine', 'medication', 'insulin', 'syringe', 'inhaler'],
    keyTakeaways: ['Keep essential medicine in cabin baggage.', 'Check destination laws for controlled medicines.', 'Carry labels and supporting documents.', 'Plan for delays and temperature requirements.'],
    sections: [
      { heading: 'Carry essential treatment in the cabin', paragraphs: ['Checked baggage can be delayed or exposed to unsuitable temperatures. Keep medicine needed during the journey and a sensible reserve in cabin baggage, within airline limits.'] },
      { heading: 'Documents and original packaging', paragraphs: ['A prescription copy or clinician letter can explain the medicine, dosage, medical devices and needles. Original pharmacy labels help match the medicine to the traveller.'], bullets: ['Use the name shown on your passport.', 'List generic and brand names where possible.', 'Carry translated documents for complex journeys when practical.'] },
      { heading: 'Controlled and restricted medicines', paragraphs: ['A medicine legally prescribed at home can be restricted at the destination. Some countries impose quantity limits or require advance approval.', 'Check the embassy, health ministry or medicines authority well before departure.'] },
      { heading: 'Liquid and refrigerated medicines', paragraphs: ['Medical liquids may be exempt from normal cabin liquid limits but can be inspected separately. Cooling packs and insulated containers should be declared at screening.', 'Ask the manufacturer or clinician for safe temperature ranges rather than improvising storage.'] },
    ],
    faqs: [
      { question: 'Do I need a doctor letter for ordinary medication?', answer: 'Not always, but it is useful for essential, controlled, liquid or injectable medicines.' },
      { question: 'Can I carry needles or syringes?', answer: 'Often yes when medically necessary, but carry supporting documentation and check airline and destination rules.' },
      { question: 'How much medicine should I take?', answer: 'Take enough for the trip and reasonable delays, while respecting destination import limits.' },
    ],
    officialChecks: [{ label: 'Destination government', description: 'Check medicine import and controlled-drug requirements.' }, { label: 'Airline medical assistance', description: 'Confirm devices, oxygen, cooling and onboard procedures.' }, { label: 'Clinician or pharmacist', description: 'Confirm documentation, dosage and storage needs.' }],
  },
  {
    slug: 'baby-food-milk-air-travel-guide',
    title: 'Baby Milk, Food and Feeding Supplies at the Airport', shortTitle: 'Baby milk and food travel',
    description: 'A parent-focused guide to baby milk, formula, food, sterilised water, cooling packs and airport screening.',
    category: 'Baby travel', audience: 'Parents and carers', updated: '2026-07-10', readingMinutes: 10,
    tags: ['baby milk', 'formula', 'baby food', 'sterilised water', 'family travel'], relatedRuleTerms: ['baby milk', 'baby food', 'formula', 'stroller'],
    keyTakeaways: ['Reasonable journey quantities are commonly allowed.', 'Baby liquids may be screened separately.', 'Pack feeding supplies where they are easy to remove.', 'Check transit and destination food rules.'],
    sections: [
      { heading: 'Security exemptions for baby supplies', paragraphs: ['Many airports permit baby milk, formula, food and sterilised water needed for the journey even when ordinary liquid limits would be exceeded. Screening methods and definitions of a reasonable quantity vary.'] },
      { heading: 'Packing for a smoother checkpoint', paragraphs: ['Separate feeding items from other liquids and tell staff before screening. Use clearly labelled, leak-resistant containers.'], bullets: ['Allow extra time.', 'Carry a small reserve for delays.', 'Keep cleaning and sterilising supplies within local liquid rules.', 'Check whether cooling packs must be frozen or medically justified.'] },
      { heading: 'Onboard and transit planning', paragraphs: ['Ask the airline about hot water, bottle warming and onboard baby food. A transit airport may screen supplies again, so retain packaging and avoid relying on a single large container.'] },
      { heading: 'Destination customs', paragraphs: ['Dairy, meat, fruit and homemade food can face import controls. An item permitted through airport security is not automatically permitted through destination customs.'] },
    ],
    faqs: [
      { question: 'Can baby milk exceed 100 ml?', answer: 'Often yes when needed for the journey, but the airport may inspect it and local rules vary.' },
      { question: 'Can I take frozen cooling packs?', answer: 'They may be accepted for baby food or medical needs, but confirm with the airport.' },
      { question: 'Will security open the bottle?', answer: 'They may inspect, test or ask for the container to be opened depending on local procedures.' },
    ],
    officialChecks: [{ label: 'Airport security', description: 'Confirm baby-liquid exemptions and screening procedures.' }, { label: 'Airline family service', description: 'Check onboard feeding and baggage facilities.' }, { label: 'Destination customs', description: 'Check food and dairy import restrictions.' }],
  },
  {
    slug: 'cabin-vs-checked-baggage-guide',
    title: 'Cabin Baggage vs Checked Baggage: Where Should Items Go?', shortTitle: 'Cabin vs checked baggage',
    description: 'Learn how safety, security, theft risk, temperature and airline policy affect where travel items should be packed.',
    category: 'Baggage basics', audience: 'All travellers', updated: '2026-07-10', readingMinutes: 9,
    tags: ['cabin baggage', 'checked baggage', 'packing', 'carry on'], relatedRuleTerms: ['power bank', 'laptop', 'medicine', 'liquid', 'razor'],
    keyTakeaways: ['Some items are cabin-only for safety reasons.', 'Valuables and essential medicines are safer with you.', 'Liquids may be easier in checked baggage but customs rules still apply.', 'Gate-checked bags must be repacked when they contain cabin-only items.'],
    sections: [
      { heading: 'Why baggage location matters', paragraphs: ['Cabin and checked baggage are subject to different controls. Fire risk, pressure, access during flight, security screening and baggage handling all influence the correct location.'] },
      { heading: 'Items usually better in cabin baggage', paragraphs: ['Essential medicines, valuables, travel documents and many spare lithium batteries should stay with the traveller. Cabin baggage also reduces loss and temperature exposure.'] },
      { heading: 'Items often better in checked baggage', paragraphs: ['Larger toiletries, some tools and securely packed non-valuable items may be more practical in checked baggage, provided dangerous-goods and destination rules allow them.'] },
      { heading: 'Avoid problems at the boarding gate', paragraphs: ['If a cabin bag is unexpectedly gate-checked, remove power banks, spare batteries, medication, documents and valuables before handing it over.'] },
    ],
    faqs: [{ question: 'Is an allowed item automatically allowed in both bags?', answer: 'No. Many items have different cabin and checked baggage status.' }, { question: 'What should never be checked?', answer: 'Travel documents, essential medicine and valuables should normally remain with you; spare batteries are commonly cabin-only.' }],
    officialChecks: [{ label: 'Operating airline', description: 'Check baggage size, weight and dangerous-goods policies.' }, { label: 'Airport security', description: 'Confirm cabin screening restrictions.' }],
  },
  {
    slug: 'food-customs-international-travel-guide',
    title: 'Taking Food Across Borders: Security and Customs Guide', shortTitle: 'Food and customs',
    description: 'Understand the difference between airport security and customs rules for packaged food, meat, dairy, fruit and homemade items.',
    category: 'Food and customs', audience: 'International travellers', updated: '2026-07-10', readingMinutes: 11,
    tags: ['food', 'customs', 'meat', 'dairy', 'fruit', 'import'], relatedRuleTerms: ['food', 'chocolate', 'fruit', 'meat', 'cheese', 'powder'],
    keyTakeaways: ['Security approval does not equal customs approval.', 'Animal products and fresh produce face the strictest controls.', 'Declare food when required.', 'Keep commercial packaging and ingredient labels.'],
    sections: [
      { heading: 'Two separate checks', paragraphs: ['Departure security focuses on aviation safety. Destination customs and biosecurity focus on protecting agriculture, health and local ecosystems. A food item can pass security and still be prohibited at arrival.'] },
      { heading: 'Higher-risk food groups', paragraphs: ['Fresh meat, dairy, eggs, plants, seeds and fruit commonly face restrictions. Rules depend on origin, destination, processing and quantity.'] },
      { heading: 'Packaging and declarations', paragraphs: ['Factory-sealed products with ingredient labels are easier to assess than homemade or unlabelled food. When a declaration is required, declare honestly even if you believe the product is permitted.'] },
      { heading: 'Liquids, sauces and powders', paragraphs: ['Cabin liquid limits can apply to sauces, spreads and semi-liquid foods. Powders may receive additional screening, especially in larger quantities.'] },
    ],
    faqs: [{ question: 'Can I take packaged snacks abroad?', answer: 'Often, but ingredients and destination import rules determine whether they can enter the country.' }, { question: 'What happens if I declare food?', answer: 'An officer may inspect it and permit, treat or confiscate it. Declaration can help avoid penalties.' }],
    officialChecks: [{ label: 'Destination customs or biosecurity agency', description: 'Check current import rules and declaration requirements.' }, { label: 'Departure airport', description: 'Check liquid and powder screening rules.' }],
  },
  {
    slug: 'liquids-aerosols-gels-guide',
    title: 'Liquids, Aerosols and Gels in Hand Luggage', shortTitle: 'Liquids, aerosols and gels',
    description: 'A clear guide to containers, clear bags, medicines, baby items, duty-free liquids and airport-specific screening.',
    category: 'Liquids', audience: 'Cabin-baggage travellers', updated: '2026-07-10', readingMinutes: 10,
    tags: ['liquid', 'aerosol', 'gel', 'toiletries', '100 ml'], relatedRuleTerms: ['perfume', 'deodorant', 'shampoo', 'toothpaste', 'liquid'],
    keyTakeaways: ['Container size matters, not the amount remaining.', 'Airport technology and local rules differ.', 'Medical and baby exemptions may apply.', 'Duty-free liquids require sealed evidence and can be re-screened in transit.'],
    sections: [
      { heading: 'What counts as a liquid', paragraphs: ['Liquids rules often cover gels, creams, pastes, sprays, foams and semi-liquid foods—not only drinks. Toothpaste, mascara, yoghurt and soft spreads may be treated as liquids.'] },
      { heading: 'Containers and clear bags', paragraphs: ['Where traditional limits apply, each container must be within the stated maximum even if partly empty. Place containers in the required transparent, resealable bag.'] },
      { heading: 'Exemptions', paragraphs: ['Essential medicines and baby supplies can receive exemptions, but staff may inspect them separately. Carry supporting information and only a reasonable quantity for the journey.'] },
      { heading: 'Duty-free and connections', paragraphs: ['Keep duty-free liquids sealed with the receipt. Transit screening may apply different rules, especially when changing airports or leaving the secure area.'] },
    ],
    faqs: [{ question: 'Does a half-full large bottle count by content or bottle size?', answer: 'Usually by container capacity, so a large bottle can be refused even when nearly empty.' }, { question: 'Are solid toiletries easier?', answer: 'Solid alternatives can avoid liquid-bag limits, provided no other restriction applies.' }],
    officialChecks: [{ label: 'Departure airport', description: 'Confirm current liquid limits and security technology.' }, { label: 'Transit airport', description: 'Check rules for connecting passengers and duty-free liquids.' }],
  },
  {
    slug: 'electronics-on-flights-guide',
    title: 'Laptops, Tablets, Cameras and Electronics on Flights', shortTitle: 'Electronics on flights',
    description: 'Prepare electronic devices, installed batteries, chargers and accessories for security and airline travel.',
    category: 'Electronics', audience: 'Travellers carrying devices', updated: '2026-07-10', readingMinutes: 9,
    tags: ['electronics', 'laptop', 'tablet', 'camera', 'charger'], relatedRuleTerms: ['laptop', 'tablet', 'camera', 'charger', 'battery'],
    keyTakeaways: ['Protect devices from damage and accidental activation.', 'Large electronics may need to be removed at screening.', 'Spare batteries follow stricter rules than batteries installed in devices.', 'Keep valuable equipment in cabin baggage when possible.'],
    sections: [
      { heading: 'Security screening', paragraphs: ['Some checkpoints require laptops and large electronics to be removed, while newer scanners may allow them to remain packed. Follow local instructions rather than assuming one universal procedure.'] },
      { heading: 'Installed and spare batteries', paragraphs: ['A battery installed securely in a device can be treated differently from a spare battery or power bank. Switch devices off when required and protect them from accidental activation.'] },
      { heading: 'Checked baggage risks', paragraphs: ['Electronics in checked baggage face impact, theft and temperature risks. If checking a permitted device, protect it carefully, power it down and follow airline battery requirements.'] },
      { heading: 'Professional equipment', paragraphs: ['Photographers and business travellers should check cabin weight limits, oversized equipment procedures and any approval required for high-capacity batteries.'] },
    ],
    faqs: [{ question: 'Can a laptop go in checked baggage?', answer: 'It may be permitted by some airlines, but cabin baggage is generally safer and battery conditions still apply.' }, { question: 'Do chargers count as batteries?', answer: 'Ordinary plug chargers do not store energy, but power banks and battery cases do.' }],
    officialChecks: [{ label: 'Airline baggage policy', description: 'Confirm device, battery and cabin-weight rules.' }, { label: 'Airport security', description: 'Check whether electronics must be removed at screening.' }],
  },
];

export function getKnowledgeGuide(slug: string) {
  return knowledgeGuides.find((guide) => guide.slug === slug);
}
