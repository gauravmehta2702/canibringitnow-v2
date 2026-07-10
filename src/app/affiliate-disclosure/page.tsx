import TrustPage from '@/components/trust/TrustPage';
export const metadata={title:'Affiliate Disclosure | Can I Bring It Now',description:'Disclosure of potential affiliate commissions.'};
export default function Page(){return <TrustPage title="Affiliate Disclosure" description="Some product links may earn Can I Bring It Now a commission at no additional cost to the visitor." sections={[
{title:'How affiliate links work',body:<p>If a visitor follows an eligible link and makes a purchase, the retailer may pay us a commission.</p>},
{title:'Editorial independence',body:<p>A commercial relationship does not determine the travel-rule answer. Products are included only where they are relevant to the traveller’s task.</p>},
{title:'No guarantee',body:<p>A product link does not guarantee airline, airport or destination acceptance. Travellers must still check specifications and official restrictions.</p>},
{title:'Pricing and availability',body:<p>Retail prices, availability and product specifications can change after publication.</p>}
]}/>}
