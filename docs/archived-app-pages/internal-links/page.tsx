import InternalLinkBlock from '@/components/seo/InternalLinkBlock';

export const metadata={title:'Internal Link Engine | Can I Bring It Now'};

export default function Page(){
 return <main className="min-h-screen bg-slate-50"><div className="max-w-6xl mx-auto p-8">
 <h1 className="text-5xl font-black">G9 Internal Link Engine</h1>
 <p className="mt-4">Automatic internal linking between related travel rules.</p>
 <InternalLinkBlock slug="power-bank-virgin-atlantic"/>
 </div></main>
}
