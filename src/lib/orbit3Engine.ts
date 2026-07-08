import { airlines, countries, rules } from '@/data/rules';

export type Orbit3Card = { title: string; href: string; label: string; description: string; };
export type Orbit3Trend = Orbit3Card & { priority: 'High' | 'Medium' | 'Low'; reason: string; };
export function orbit3Slug(value: string) { return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
export function getOrbit3ProductionModules(): Orbit3Card[] { return [
 { title:'Homepage 2.0', href:'/home-2/', label:'Public UX', description:'A stronger landing page focused on travel search, countries, airlines and trip planning.'},
 { title:'Trending Travel Questions', href:'/trending-travel-questions/', label:'SEO', description:'Question-led traffic pages for Google, AI Overviews and social discovery.'},
 { title:'Seasonal Travel Hub', href:'/seasonal-travel/', label:'Seasonal SEO', description:'Summer, winter, family, student and holiday travel content paths.'},
 { title:'Travel Knowledge Graph', href:'/travel-knowledge-graph/', label:'Authority', description:'Entity relationships connecting items, airlines, countries, airports and tools.'},
 { title:'Analytics Intelligence', href:'/analytics-intelligence/', label:'Growth', description:'What to watch weekly after deployment: searches, paths, countries and conversion opportunities.'},
 { title:'AdSense Layout System', href:'/adsense-layout/', label:'Revenue', description:'Ad placement planning that protects the answer and user trust.'},
 { title:'Affiliate Components', href:'/affiliate-components/', label:'Revenue', description:'Contextual affiliate-ready modules for eSIM, hotels, insurance and travel gear.'},
 { title:'Social Export Studio', href:'/social-export-studio/', label:'Marketing', description:'Turn site pages into short-video, Pinterest and social content ideas.'},
]; }
export function getTrendingTravelQuestions(limit = 60): Orbit3Trend[] { const priorityRules = rules.slice(0, 30); const templates = [
 {label:'Cabin baggage', template:(item:string)=>`Can I take ${item} in cabin baggage?`, reason:'Strong direct search intent.'},
 {label:'Checked baggage', template:(item:string)=>`Can I pack ${item} in checked baggage?`, reason:'Good for baggage-specific searches.'},
 {label:'Airport security', template:(item:string)=>`Will airport security stop ${item}?`, reason:'High curiosity and practical concern.'},
 {label:'Airline rules', template:(item:string)=>`Do airlines allow ${item}?`, reason:'Broad airline-rule intent.'},
 ]; return priorityRules.flatMap((rule)=>{ const item=rule.item.replace(/\bon a plane\b/gi,'').trim(); return templates.map((t)=>{ const title=t.template(item); return { title, href:`/search/?q=${encodeURIComponent(title)}`, label:t.label, description: rule.shortAnswer, priority: rule.warning ? 'High' as const : 'Medium' as const, reason:t.reason};});}).slice(0,limit);}
export function getSeasonalTravelCards(): Orbit3Card[] { return [
 {title:'Summer holiday packing rules',href:'/seasonal-travel/summer-holidays/',label:'Summer',description:'Liquids, sunscreen, batteries, family travel and hot-weather packing.'},
 {title:'Winter travel packing rules',href:'/seasonal-travel/winter-travel/',label:'Winter',description:'Ski gear, batteries, medication, coats, boots and winter airport delays.'},
 {title:'Family travel with babies',href:'/seasonal-travel/family-travel/',label:'Family',description:'Baby milk, formula, strollers, medicine, toys and airport security.'},
 {title:'Student travel checklist',href:'/seasonal-travel/student-travel/',label:'Students',description:'Laptops, chargers, medication, documents, luggage and budget travel.'},
 {title:'Christmas travel rules',href:'/seasonal-travel/christmas-travel/',label:'Christmas',description:'Gifts, food, batteries, liquids, wrapped presents and duty-free.'},
 {title:'Long-haul flight preparation',href:'/seasonal-travel/long-haul-flights/',label:'Long-haul',description:'Power banks, medication, baby travel, comfort items and destination checks.'},
 ];}
export function getSeasonalTravelPage(slug: string) { return getSeasonalTravelCards().find((card)=>card.href.endsWith(`/${slug}/`)); }
export function getKnowledgeGraphNodes(): Orbit3Card[] { const itemNodes=rules.slice(0,18).map(rule=>({title:rule.item,href:`/rules/${rule.slug}/`,label:rule.category,description:rule.shortAnswer})); const airlineNodes=airlines.slice(0,12).map(a=>({title:a,href:`/airline-guides/${orbit3Slug(a)}/`,label:'Airline',description:'Airline hub for baggage, item rules and trip planning.'})); const countryNodes=countries.slice(0,12).map(c=>({title:c,href:`/country-guides/${orbit3Slug(c)}/`,label:'Country',description:'Country hub for customs, packing, hotels and travel rules.'})); return [...itemNodes,...airlineNodes,...countryNodes];}
export function getHomepage2Sections(): Orbit3Card[] { return [
 {title:'Search an item',href:'/search/',label:'Start here',description:'Check power banks, medicine, baby milk, food, electronics and more.'},
 {title:'Plan a full trip',href:'/trip-planner/',label:'Trip planner',description:'Combine destination, airline, travellers and packed items.'},
 {title:'Browse country guides',href:'/country-guides/',label:'Countries',description:'Customs, hotels, airport guidance and travel rules by destination.'},
 {title:'Browse airline guides',href:'/airline-guides/',label:'Airlines',description:'Baggage and item guidance by airline.'},
 {title:'Airport guides',href:'/airport-guides/',label:'Airports',description:'Security, hotels, transport and family travel by airport.'},
 {title:'Cheap travel and deals',href:'/travel-deals/',label:'Deals',description:'Flight, hotel, eSIM, insurance and travel gear ideas.'},
 {title:'Trending questions',href:'/trending-travel-questions/',label:'Questions',description:'Question-led answers travellers are likely to search.'},
 {title:'Seasonal travel',href:'/seasonal-travel/',label:'Seasonal',description:'Summer, winter, family, student and Christmas travel hubs.'},
 ];}
export function getAnalyticsChecklist(): Orbit3Trend[] { return [
 {title:'Top visited pages',href:'/analytics-intelligence/',label:'Cloudflare',description:'Check which pages already get visits and improve those first.',priority:'High',reason:'Improving pages with existing traffic is faster than guessing.'},
 {title:'Top search queries',href:'/analytics-intelligence/',label:'Search Console',description:'Watch impressions, clicks and CTR once Google starts testing pages.',priority:'High',reason:'This tells us what Google is willing to rank.'},
 {title:'Low CTR pages',href:'/ctr-booster/',label:'CTR',description:'Rewrite titles and snippets for pages with impressions but few clicks.',priority:'High',reason:'CTR gains can increase traffic without new content.'},
 {title:'Countries sending traffic',href:'/orbit-international/',label:'International',description:'Use real country traffic to choose translation priorities.',priority:'Medium',reason:'Translation should follow demand.'},
 {title:'Internal search terms',href:'/search/',label:'Site search',description:'Track what visitors search on your site and create pages for those topics.',priority:'High',reason:'Internal search shows real visitor needs.'},
 {title:'Exit paths',href:'/analytics-intelligence/',label:'Engagement',description:'Improve pages where people leave after one page view.',priority:'Medium',reason:'More internal clicks help engagement and revenue potential.'},
 ];}
export function getAdSenseLayouts(): Orbit3Card[] { return [
 {title:'Answer-first layout',href:'/adsense-layout/#answer-first',label:'Recommended',description:'Show the travel answer first, then ads below the core decision.'},
 {title:'In-content ad after trust block',href:'/adsense-layout/#content-ad',label:'Safe',description:'Place ads after official-source reminder and key decision blocks.'},
 {title:'Sidebar desktop ad',href:'/adsense-layout/#sidebar',label:'Desktop',description:'Useful for desktop without interrupting mobile experience.'},
 {title:'Bottom related-content ad',href:'/adsense-layout/#bottom',label:'Safe',description:'Show ads after related rules, FAQs and next actions.'},
 {title:'Avoid top-heavy ads',href:'/adsense-layout/#avoid',label:'Avoid',description:'Do not place ads above or over the main answer.'},
 {title:'Mobile restraint',href:'/adsense-layout/#mobile',label:'Mobile',description:'Keep mobile pages fast and uncluttered; avoid intrusive ads.'},
 ];}
export function getAffiliateComponents(): Orbit3Card[] { return [
 {title:'Destination eSIM card',href:'/travel-deals/',label:'eSIM',description:'Best on country guides, trip planner and destination pages.'},
 {title:'Airport hotel card',href:'/airport-guides/',label:'Hotels',description:'Best on airport hubs and country deal pages.'},
 {title:'Travel insurance card',href:'/revenue-launch/',label:'Insurance',description:'Best after trip planning and destination guidance.'},
 {title:'Universal adapter card',href:'/travel-gear-deals/',label:'Gear',description:'Best on country, packing and electronics pages.'},
 {title:'Power bank card',href:'/travel-gear-deals/',label:'Electronics',description:'Best below battery rule warnings and airline guidance.'},
 {title:'Luggage scale card',href:'/travel-gear-deals/',label:'Baggage',description:'Best on airline baggage and packing pages.'},
 ];}
export function getSocialExportIdeas(): Orbit3Card[] { return getTrendingTravelQuestions(12).map(q=>({title:q.title,href:q.href,label:'Short video',description:`Hook: "${q.title}" Explain in 25 seconds and send viewers to CanIBringItNow.com.`}));}
