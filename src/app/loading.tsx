import {
  Activity,
  Ambulance,
  HeartPulse,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

function LoadingIndicator() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-4 py-2.5 shadow-sm shadow-emerald-900/5">
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />

        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-600" />
      </span>

      <span className="text-xs font-semibold tracking-wide text-emerald-800">
        Preparing your experience
      </span>
    </div>
  );
}

function HeroContentSkeleton() {
  return (
    <div className="relative z-10 flex flex-col justify-center">
      {/* Brand */}
      <div className="mb-7 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/15">
          <HeartPulse
            aria-hidden="true"
            className="size-6 motion-safe:animate-pulse"
          />
        </div>

        <div>
          <p className="text-sm font-bold tracking-tight text-slate-900">
            Lifeline Dispatch
          </p>

          <p className="mt-0.5 text-xs font-medium text-emerald-700">
            Connected Emergency Care
          </p>
        </div>
      </div>

      <LoadingIndicator />

      {/* Headline */}
      <div className="mt-8 space-y-4">
        <Skeleton className="h-10 w-full max-w-[480px] rounded-xl bg-slate-200/90 sm:h-12" />

        <Skeleton className="h-10 w-[86%] max-w-[400px] rounded-xl bg-emerald-100 sm:h-12" />

        <Skeleton className="h-10 w-[65%] max-w-[310px] rounded-xl bg-slate-200/80 sm:h-12" />
      </div>

      {/* Description */}
      <div className="mt-7 space-y-3">
        <Skeleton className="h-4 w-full max-w-[460px] rounded-md" />

        <Skeleton className="h-4 w-[90%] max-w-[420px] rounded-md" />

        <Skeleton className="h-4 w-[65%] max-w-[300px] rounded-md" />
      </div>

      {/* Action buttons */}
      <div className="mt-9 flex flex-wrap gap-3">
        <Skeleton className="h-12 w-44 rounded-xl bg-emerald-200/80" />

        <Skeleton className="h-12 w-40 rounded-xl border border-slate-200 bg-white" />
      </div>

      {/* Trust indicators */}
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-slate-200 pt-7">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50">
            <ShieldCheck
              aria-hidden="true"
              className="size-4 text-emerald-700"
            />
          </div>

          <Skeleton className="h-3.5 w-24 rounded-md" />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50">
            <Activity aria-hidden="true" className="size-4 text-emerald-700" />
          </div>

          <Skeleton className="h-3.5 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function DispatchVisualSkeleton() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 rounded-[3rem] bg-emerald-200/30 blur-3xl"
      />

      {/* Main Visual Card */}
      <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100/80 bg-white p-4 shadow-2xl shadow-emerald-900/10 sm:p-6">
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-emerald-50" />

        {/* Card header */}
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-700 text-white">
              <Ambulance aria-hidden="true" className="size-6" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded-md" />

              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2">
            <span className="relative flex size-2">
              <span className="absolute size-full rounded-full bg-emerald-400 motion-safe:animate-ping" />

              <span className="relative size-2 rounded-full bg-emerald-600" />
            </span>

            <Skeleton className="h-3 w-10 rounded-md bg-emerald-200/80" />
          </div>
        </div>

        {/* Map-like visual */}
        <div className="relative mt-6 h-60 overflow-hidden rounded-2xl border border-emerald-100 bg-[#edf7f3] sm:h-72">
          {/* Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, #cde5da 1px, transparent 1px), linear-gradient(to bottom, #cde5da 1px, transparent 1px)",
              backgroundSize: "35px 35px",
            }}
          />

          {/* Decorative roads */}
          <div
            aria-hidden="true"
            className="absolute left-[15%] top-[-15%] h-[140%] w-5 rotate-[35deg] bg-white/80 shadow-sm"
          />

          <div
            aria-hidden="true"
            className="absolute left-[-10%] top-[45%] h-5 w-[125%] -rotate-[18deg] bg-white/80 shadow-sm"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[-20%] right-[20%] h-[140%] w-3 rotate-[-35deg] bg-white/60"
          />

          {/* Origin */}
          <div className="absolute left-[20%] top-[30%] flex size-10 items-center justify-center rounded-full border-4 border-white bg-emerald-600 shadow-lg shadow-emerald-900/15">
            <Ambulance aria-hidden="true" className="size-5 text-white" />
          </div>

          {/* Route indicator */}
          <div className="absolute left-[35%] top-[43%] h-0 w-[35%] -rotate-[20deg] border-t-[3px] border-dashed border-emerald-500" />

          {/* Destination */}
          <div className="absolute bottom-[24%] right-[19%] flex size-11 items-center justify-center rounded-full border-4 border-white bg-slate-800 shadow-lg shadow-slate-900/15">
            <MapPin aria-hidden="true" className="size-5 text-white" />
          </div>

          {/* Floating information card */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl border border-white/80 bg-white/95 p-3 shadow-lg shadow-slate-900/5 backdrop-blur-sm sm:right-auto sm:w-64">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <HeartPulse
                aria-hidden="true"
                className="size-5 text-emerald-700 motion-safe:animate-pulse"
              />
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-3.5 w-28 rounded-md" />

              <Skeleton className="h-3 w-20 rounded-md" />
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-100 bg-slate-50/80 p-3"
            >
              <Skeleton className="h-3 w-full max-w-20 rounded-md" />

              <Skeleton className="mt-3 h-5 w-3/4 max-w-16 rounded-md bg-emerald-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom floating detail */}
      <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-emerald-100 bg-white px-5 py-3 shadow-xl shadow-emerald-900/10">
        <Activity
          aria-hidden="true"
          className="size-4 text-emerald-600 motion-safe:animate-pulse"
        />

        <span className="text-xs font-semibold text-slate-600">
          Connecting care, saving time
        </span>
      </div>
    </div>
  );
}

function FeatureSkeletons() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-start gap-4">
            <Skeleton className="size-12 shrink-0 rounded-2xl bg-emerald-100/80" />

            <div className="min-w-0 flex-1 space-y-3">
              <Skeleton className="h-4 w-3/4 max-w-40 rounded-md" />

              <Skeleton className="h-3 w-full max-w-56 rounded-md" />

              <Skeleton className="h-3 w-4/5 max-w-40 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Loading() {
  return (
    <main
      role="status"
      aria-label="Loading Lifeline Dispatch"
      className="relative isolate min-h-svh overflow-hidden bg-[#f5f8f7]"
    >
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 size-[450px] rounded-full bg-emerald-100/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[450px] rounded-full bg-teal-100/50 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Hero section */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <HeroContentSkeleton />

          <DispatchVisualSkeleton />
        </div>

        {/* Section divider */}
        <div className="mt-20 flex items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:mt-24">
          <div className="space-y-2">
            <Skeleton className="h-6 w-44 rounded-lg" />

            <Skeleton className="h-3.5 w-56 max-w-full rounded-md" />
          </div>

          <Skeleton className="hidden h-9 w-28 rounded-xl sm:block" />
        </div>

        {/* Feature cards */}
        <div className="mt-6">
          <FeatureSkeletons />
        </div>

        {/* Footer message */}
        <div className="mt-12 flex items-center justify-center gap-2 pb-4 text-center">
          <HeartPulse
            aria-hidden="true"
            className="size-4 text-emerald-700 motion-safe:animate-pulse"
          />

          <p className="text-xs font-medium text-slate-500">
            Lifeline Dispatch — Connected Emergency Care
          </p>
        </div>
      </div>

      <span className="sr-only">Page content is loading.</span>
    </main>
  );
}
