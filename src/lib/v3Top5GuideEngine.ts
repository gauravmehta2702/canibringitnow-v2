export type Top5GuideItem = {
  rank: number;
  name: string;
  bestFor: string;
  why: string;
};

export function getTop5Guide(destination = 'Tokyo', guideType = 'affordable hotels') {
  const items: Top5GuideItem[] = [
    { rank: 1, name: `${destination} Central Stay`, bestFor: 'First-time visitors', why: 'Good base for transport, sightseeing and short stays.' },
    { rank: 2, name: `${destination} Budget Comfort`, bestFor: 'Affordable trips', why: 'Useful for travellers who want value without being too far from main areas.' },
    { rank: 3, name: `${destination} Family Base`, bestFor: 'Families', why: 'Better for travellers needing easier access and practical facilities.' },
    { rank: 4, name: `${destination} Airport Stopover`, bestFor: 'Early flights', why: 'Helpful for late arrivals, early departures and short connections.' },
    { rank: 5, name: `${destination} Quiet Stay`, bestFor: 'Longer stays', why: 'Better for travellers who want a calmer base after sightseeing.' },
  ];

  return {
    title: `Top 5 ${guideType} in ${destination}`,
    description: `A starter editorial guide template for ${guideType} in ${destination}. Replace placeholder hotel names with researched affiliate-ready recommendations later.`,
    items,
  };
}
