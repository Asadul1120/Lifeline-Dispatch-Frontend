import { HeartPulse } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading Lifeline Dispatch"
      className="min-h-svh bg-[#f5f8f7]"
    >
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 text-emerald-700">
            <HeartPulse className="size-8" aria-hidden="true" />
            <span className="font-bold text-slate-900">Lifeline Dispatch</span>
          </div>
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div className="space-y-5">
          <Skeleton className="h-7 w-44 rounded-full" />
          <Skeleton className="h-12 w-full max-w-lg rounded-xl" />
          <Skeleton className="h-12 w-4/5 max-w-md rounded-xl" />
          <Skeleton className="h-5 w-full max-w-lg" />
          <Skeleton className="h-5 w-3/4 max-w-md" />
          <div className="flex gap-3 pt-3">
            <Skeleton className="h-12 w-36 rounded-xl" />
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-80 w-full rounded-[2rem] sm:h-96" />
      </div>
      <span className="sr-only">Loading page, please wait.</span>
    </div>
  );
}
