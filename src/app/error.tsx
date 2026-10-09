"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, HeartPulse, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      role="alert"
      className="flex min-h-svh items-center justify-center bg-[#f5f8f7] px-4 py-16"
    >
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-lg shadow-slate-900/5 sm:px-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <AlertTriangle className="size-8" aria-hidden="true" />
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          We hit an unexpected issue.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600">
          The page couldn&apos;t load correctly. You can try again, or return to
          the home page.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={() => reset()}
            className="h-11 rounded-xl bg-emerald-700 px-6 text-sm text-white hover:bg-emerald-800"
          >
            <RefreshCw className="mr-2 size-4" aria-hidden="true" /> Try again
          </Button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
          </Link>
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <HeartPulse className="size-4" aria-hidden="true" /> Lifeline Dispatch
        </p>
      </div>
    </main>
  );
}
