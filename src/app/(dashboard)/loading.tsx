
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div role="status" aria-label="Loading dashboard" className="min-h-svh bg-[#f5f8f7] p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-28 rounded-lg" />
            <Skeleton className="h-9 w-64 rounded-lg" />
          </div>
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-5 h-10 w-24" />
              <Skeleton className="mt-4 h-3 w-32" />
            </div>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <Skeleton className="mb-6 h-6 w-44" />
            <div className="space-y-4">
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <Skeleton className="mb-6 h-6 w-36" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading dashboard content.</span>
    </div>
  );
}
