import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";

const popularSearches = [
  "Power bank",
  "Medication",
  "Baby milk",
  "Liquids",
  "Perfume",
  "Laptop",
  "Food",
  "Drone",
  "Razor",
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-6 py-20">

        <div className="text-center">

          <p className="font-semibold text-blue-600">
            Error 404
          </p>

          <h1 className="mt-4 text-5xl font-black text-slate-900">
            We couldn't find that travel rule
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            The page you're looking for doesn't exist or may have moved.
            Try one of our popular searches below.
          </p>

        </div>

        <div className="mt-10 flex justify-center">

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Home className="h-5 w-5" />
            Back to Homepage
          </Link>

        </div>

        <div className="mt-16 rounded-3xl bg-white p-8 shadow-sm">

          <div className="flex items-center gap-2">

            <Search className="h-5 w-5 text-blue-600"/>

            <h2 className="text-2xl font-bold">
              Popular Searches
            </h2>

          </div>

          <div className="mt-8 flex flex-wrap gap-3">

            {popularSearches.map((item) => (

              <Link
                key={item}
                href={`/search?q=${encodeURIComponent(item)}`}
                className="rounded-full border border-slate-200 px-4 py-2 hover:bg-blue-50"
              >
                {item}
              </Link>

            ))}

          </div>

        </div>

        <div className="mt-14 text-center">

          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold text-blue-600"
          >
            Return to Search
            <ArrowRight className="h-4 w-4"/>
          </Link>

        </div>

      </section>
    </main>
  );
}
