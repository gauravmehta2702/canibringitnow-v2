'use client';

import { useMemo, useState } from 'react';

export default function UtmBuilder() {
  const [url, setUrl] = useState('https://canibringitnow.com/rules/power-bank-virgin-atlantic/');
  const [source, setSource] = useState('youtube');
  const [medium, setMedium] = useState('shorts');
  const [campaign, setCampaign] = useState('power-bank-rules');
  const [content, setContent] = useState('video-1');

  const finalUrl = useMemo(() => {
    try {
      const nextUrl = new URL(url);
      nextUrl.searchParams.set('utm_source', source);
      nextUrl.searchParams.set('utm_medium', medium);
      nextUrl.searchParams.set('utm_campaign', campaign);
      if (content) nextUrl.searchParams.set('utm_content', content);
      return nextUrl.toString();
    } catch {
      return 'Enter a valid URL';
    }
  }, [url, source, medium, campaign, content]);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <p className="font-bold text-brand-600">UTM builder</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">Track every shared link</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {[
          ['URL', url, setUrl],
          ['Source', source, setSource],
          ['Medium', medium, setMedium],
          ['Campaign', campaign, setCampaign],
          ['Content', content, setContent],
        ].map(([label, value, setter]) => (
          <label key={label as string} className="block">
            <span className="text-sm font-bold text-slate-600">{label as string}</span>
            <input value={value as string} onChange={(event) => (setter as (value: string) => void)(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500" />
          </label>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-sm font-bold leading-6 text-slate-100 break-all">{finalUrl}</div>
    </section>
  );
}
