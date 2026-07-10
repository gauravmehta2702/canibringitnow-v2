import TrustPage from '@/components/trust/TrustPage';
export const metadata={title:'Advertising Policy | Can I Bring It Now',description:'How advertising is kept separate from editorial travel guidance.'};
export default function Page(){return <TrustPage title="Advertising Policy" description="Advertising may support the cost of running the website, but it does not control editorial answers." sections={[
{title:'Separation from content',body:<p>Advertisements are visually separated from editorial content and should not be presented as official recommendations or travel rules.</p>},
{title:'No paid rule outcomes',body:<p>Advertisers cannot pay to change whether an item is described as allowed, restricted or not allowed.</p>},
{title:'Ad placement',body:<p>We aim to avoid deceptive placements, excessive interruptions and layouts that make it difficult to distinguish advertising from navigation or content.</p>},
{title:'Restricted advertising',body:<p>We reserve the right to block advertising that is misleading, unsafe, unlawful or inconsistent with the purpose of the website.</p>}
]}/>}
