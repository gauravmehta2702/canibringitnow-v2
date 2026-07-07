import { CalendarCheck, Megaphone, Sparkles } from 'lucide-react';
import V7QueueGrid from '@/components/growth/V7QueueGrid';
import { getAiContentFactoryQueue, getPinterestQueue, getVideoScriptQueue, getWeeklyActionPlan } from '@/lib/v7AiContentFactory';

export default function AiContentFactoryDashboard() {
  const weekly = getWeeklyActionPlan();

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <Sparkles className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">V7 AI Content Factory</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Weekly traffic ideas without daily manual work
            </h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              This internal dashboard gives SEO, video, Pinterest and social-answer ideas that support the product without interrupting development.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <CalendarCheck className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Weekly workflow</p>
            <h2 className="text-2xl font-black text-slate-950">2–3 hours per week after month one</h2>
          </div>
        </div>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {weekly.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-700 ring-1 ring-slate-200">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <V7QueueGrid title="SEO content queue" eyebrow="Search traffic" items={getAiContentFactoryQueue()} />
      <V7QueueGrid title="Short video queue" eyebrow="YouTube Shorts / Reels / TikTok" items={getVideoScriptQueue()} />
      <V7QueueGrid title="Pinterest queue" eyebrow="Evergreen visual traffic" items={getPinterestQueue()} />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <Megaphone className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Publishing rule</p>
            <h2 className="text-2xl font-black text-slate-950">Review before publishing</h2>
          </div>
        </div>
        <p className="mt-4 leading-7 text-slate-600">
          Use this page for ideas and drafts, not blind automation. Every public article or answer should be useful, accurate and checked before posting.
        </p>
      </section>
    </div>
  );
}
