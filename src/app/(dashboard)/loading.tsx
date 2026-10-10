import { Activity, HeartPulse, ShieldCheck } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

const chartBars = [
  "h-[42%]",
  "h-[68%]",
  "h-[53%]",
  "h-[82%]",
  "h-[60%]",
  "h-[92%]",
  "h-[73%]",
];

function StatCardSkeleton({ index }: { index: number }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="absolute -right-8 -top-8 size-28 rounded-full bg-emerald-50/70" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-3.5 w-24 rounded-md" />

          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>

        <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50">
          <Skeleton className="size-6 rounded-md bg-emerald-200/70" />
        </div>
      </div>

      <div className="relative mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
        <Skeleton className="h-5 w-12 rounded-full bg-emerald-100" />

        <Skeleton
          className={`h-3 rounded-md ${index % 2 === 0 ? "w-24" : "w-16"}`}
        />
      </div>
    </div>
  );
}

function SectionHeadingSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
      <div className="space-y-2">
        <Skeleton className="h-5 w-40 rounded-lg" />

        <Skeleton className="h-3 w-52 max-w-full rounded-md" />
      </div>

      <Skeleton className="h-9 w-24 rounded-lg" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeadingSkeleton />

      <div className="mt-7 flex items-center justify-between gap-3">
        <Skeleton className="h-7 w-28 rounded-lg" />

        <div className="flex gap-2">
          <Skeleton className="h-7 w-14 rounded-md" />
          <Skeleton className="h-7 w-14 rounded-md" />
        </div>
      </div>

      <div className="relative mt-9 h-60 sm:h-72">
        {/* Chart background grid */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="border-t border-dashed border-slate-100"
            />
          ))}
        </div>

        {/* Chart bars */}
        <div className="relative flex h-full items-end justify-around gap-3 px-2 sm:gap-5">
          {chartBars.map((height, index) => (
            <div
              key={index}
              className="flex h-full flex-1 flex-col items-center justify-end gap-3"
            >
              <Skeleton
                className={`w-full max-w-10 rounded-t-lg rounded-b-sm bg-emerald-100 ${height}`}
              />

              <Skeleton className="h-3 w-5 rounded-sm" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-5 border-t border-slate-100 pt-5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-emerald-300" />

          <Skeleton className="h-3 w-20" />
        </div>

        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-slate-300" />

          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeadingSkeleton />

      <div className="mt-6 space-y-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <div className="flex flex-col items-center">
              <Skeleton className="size-10 shrink-0 rounded-xl bg-emerald-100" />

              {index < 4 && <div className="mt-2 h-5 w-px bg-emerald-100" />}
            </div>

            <div className="min-w-0 flex-1 space-y-2 pt-1">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-4 w-28 rounded-md sm:w-36" />

                <Skeleton className="h-3 w-10 rounded-md" />
              </div>

              <Skeleton className="h-3 w-4/5 max-w-56 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeadingSkeleton />

      {/* Table filters */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-10 w-full rounded-xl sm:w-64" />

        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded-xl" />
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>
      </div>

      {/* Table header */}
      <div className="mt-6 hidden grid-cols-[1.5fr_1fr_1fr_0.8fr] gap-6 rounded-xl bg-slate-50 px-5 py-4 sm:grid">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-3 w-16 rounded-md" />
        ))}
      </div>

      {/* Table rows */}
      <div className="divide-y divide-slate-100">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_auto] items-center gap-4 py-5 sm:grid-cols-[1.5fr_1fr_1fr_0.8fr] sm:gap-6 sm:px-5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-xl bg-emerald-50" />

              <div className="min-w-0 space-y-2">
                <Skeleton className="h-3.5 w-24 rounded-md" />

                <Skeleton className="h-3 w-16 rounded-md" />
              </div>
            </div>

            <Skeleton className="hidden h-4 w-24 rounded-md sm:block" />

            <Skeleton className="hidden h-7 w-20 rounded-full sm:block" />

            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
        <Skeleton className="h-3 w-32 rounded-md" />

        <div className="flex gap-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="size-8 rounded-lg bg-emerald-100" />
          <Skeleton className="size-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-label="Loading Lifeline Dispatch dashboard"
      className="relative min-h-svh overflow-hidden bg-[#f5f8f7]"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-emerald-100/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 size-96 rounded-full bg-teal-100/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="relative mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10"
      >
        {/* Loading Header */}
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/15">
              <HeartPulse className="size-7 motion-safe:animate-pulse" />

              <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-[#f5f8f7] bg-emerald-400" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Lifeline Dispatch
              </p>

              <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Preparing your workspace
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Loading your dashboard information...
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 shadow-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-50 motion-safe:animate-ping" />

              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>

            <span className="text-xs font-semibold text-emerald-800">
              Loading dashboard
            </span>
          </div>
        </div>

        {/* Greeting Skeleton */}
        <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-4 w-32 rounded-md" />

              <Skeleton className="h-8 w-56 max-w-full rounded-lg sm:w-72" />

              <Skeleton className="h-3.5 w-44 rounded-md sm:w-64" />
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <Skeleton className="size-10 rounded-xl" />
              <Skeleton className="size-10 rounded-xl" />
              <Skeleton className="size-11 rounded-full bg-emerald-100" />
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} index={index} />
          ))}
        </div>

        {/* Chart & Recent Activities */}
        <div className="grid items-start gap-5 lg:grid-cols-[1.55fr_1fr]">
          <ChartSkeleton />
          <ActivitySkeleton />
        </div>

        {/* Data Table */}
        <TableSkeleton />

        {/* Bottom Status */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4 text-center text-xs text-slate-400">
          <ShieldCheck className="size-4 text-emerald-600" />

          <span>Lifeline Dispatch — Connected emergency care</span>

          <Activity className="size-4 text-emerald-500" />
        </div>
      </div>

      <span className="sr-only">
        Dashboard content is loading. Please wait.
      </span>
    </main>
  );
}
