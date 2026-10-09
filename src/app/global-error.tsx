"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-svh items-center justify-center bg-[#f5f8f7] px-4 text-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <AlertTriangle
              className="mx-auto size-12 text-amber-600"
              aria-hidden="true"
            />
            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              Unable to load Lifeline Dispatch
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              An unexpected issue occurred. Please try loading the application
              again.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              <RefreshCw className="size-4" aria-hidden="true" /> Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
