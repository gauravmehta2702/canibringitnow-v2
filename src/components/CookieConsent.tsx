"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, X } from "lucide-react";

type ConsentState = "accepted" | "declined" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("cibin_cookie_consent") as ConsentState;
    setConsent(saved);
  }, []);

  const saveConsent = (value: "accepted" | "declined") => {
    window.localStorage.setItem("cibin_cookie_consent", value);
    setConsent(value);
    window.dispatchEvent(new Event("cibin-cookie-consent"));
  };

  if (consent) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl md:bottom-6">
      <div className="flex gap-4">
        <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 sm:grid">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-bold text-slate-950">Help us improve Can I Bring It Now</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We use privacy-conscious analytics to understand searches, improve pages and fix issues.
                You can accept analytics cookies or continue with essential cookies only.
              </p>
            </div>

            <button
              aria-label="Close cookie notice"
              onClick={() => saveConsent("declined")}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => saveConsent("accepted")}
              className="rounded-2xl bg-brand-600 px-5 py-3 text-sm font-bold text-white hover:bg-brand-700"
            >
              Accept analytics
            </button>
            <button
              onClick={() => saveConsent("declined")}
              className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200"
            >
              Essential only
            </button>
            <a href="/privacy/" className="inline-flex items-center justify-center px-3 py-3 text-sm font-semibold text-brand-600">
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
