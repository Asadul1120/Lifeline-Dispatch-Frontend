import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, HeartPulse, Home, MapPinOff } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Lifeline Dispatch",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#f5f8f7] px-4 py-16">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-32 size-96 rounded-full bg-emerald-100/70 blur-3xl"
      />
      <div className="relative w-full max-w-xl text-center">
        <Link
          href="/"
          aria-label="Lifeline Dispatch home"
          className="mx-auto inline-flex items-center gap-2 text-sm font-bold text-emerald-800"
        >
          <HeartPulse className="size-6" aria-hidden="true" /> Lifeline Dispatch
        </Link>
        <div className="mx-auto mt-10 flex size-24 items-center justify-center rounded-[2rem] border border-emerald-100 bg-white text-emerald-700 shadow-sm">
          <MapPinOff className="size-11" aria-hidden="true" />
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          This page is off the map.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-8 text-slate-600">
          We couldn&apos;t find the page you requested. It may have moved, or
          the address may be incorrect.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <Home className="size-4" aria-hidden="true" /> Back to home
          </Link>
          <Link
            href="/about-us"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Compass className="size-4" aria-hidden="true" /> About the platform
          </Link>
        </div>
        <Link
          href="/login"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Return to sign in
        </Link>
      </div>
    </main>
  );
}
