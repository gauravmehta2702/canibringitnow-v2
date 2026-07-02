import { ArrowRight } from 'lucide-react';
export default function DiscoverySections(){
const trending=['Power bank on Ryanair','Medication on a plane','Baby formula','Liquids TSA','Food to Japan','Perfume'];
const categories=['Batteries','Medication','Baby Items','Food','Cosmetics','Electronics','Liquids','Drones'];
const airlines=['Ryanair','EasyJet','British Airways','Emirates','Qatar Airways','Air India'];
const countries=['UK','USA','Japan','UAE','Australia','Canada','Singapore','India'];
return <section className='mx-auto max-w-7xl px-5 py-16 space-y-16'>
<div><h2 className='text-3xl font-bold mb-6'>🔥 Trending Searches</h2><div className='grid md:grid-cols-2 gap-3'>{trending.map(t=><a key={t} href={'/search/?q='+encodeURIComponent(t)} className='border rounded-2xl p-4 flex justify-between hover:bg-slate-50'><span>{t}</span><ArrowRight className='h-4 w-4'/></a>)}</div></div>
<div><h2 className='text-3xl font-bold mb-6'>Browse by Category</h2><div className='grid grid-cols-2 md:grid-cols-4 gap-4'>{categories.map(c=><a key={c} href={'/search/?q='+encodeURIComponent(c)} className='border rounded-2xl p-5 text-center hover:bg-slate-50'>{c}</a>)}</div></div>
<div className='grid md:grid-cols-2 gap-8'><div><h2 className='text-3xl font-bold mb-4'>Airlines</h2>{airlines.map(a=><a key={a} href={'/search/?q='+encodeURIComponent(a)} className='inline-block border rounded-full px-4 py-2 mr-2 mb-2'>{a}</a>)}</div><div><h2 className='text-3xl font-bold mb-4'>Countries</h2>{countries.map(c=><a key={c} href={'/search/?q='+encodeURIComponent(c)} className='inline-block border rounded-full px-4 py-2 mr-2 mb-2'>{c}</a>)}</div></div>
<div className='rounded-3xl border p-8 bg-slate-50'><h2 className='text-2xl font-bold'>Official Sources</h2><p className='mt-3'>Always verify important restrictions with airlines, airport security and customs before travelling.</p></div>
</section>}