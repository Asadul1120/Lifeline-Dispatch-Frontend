import { Skeleton } from "@/components/ui/skeleton";

type DashboardSkeletonVariant =
  | "admin-overview"
  | "admin-users"
  | "admin-emergency"
  | "driver-overview"
  | "driver-trips"
  | "patient-overview"
  | "patient-payments";

type DashboardRouteSkeletonProps = {
  variant: DashboardSkeletonVariant;
};

function skeletonKeys(count: number, prefix: string): string[] {
  return Array.from({ length: count }, (_, index) => `${prefix}-${index}`);
}

const variantCopy: Record<DashboardSkeletonVariant, string> = {
  "admin-overview": "Loading admin overview",
  "admin-users": "Loading user management",
  "admin-emergency": "Loading emergency requests",
  "driver-overview": "Loading driver dashboard",
  "driver-trips": "Loading your trips",
  "patient-overview": "Loading patient dashboard",
  "patient-payments": "Loading payment history",
};

function HeaderSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-3">
        <Skeleton className="h-3 w-28 rounded-md" />
        <Skeleton className="h-8 w-64 max-w-[80vw] rounded-lg" />
        <Skeleton className="h-4 w-80 max-w-[90vw] rounded-md" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-24 rounded-xl" />
        <Skeleton className="size-10 rounded-xl" />
      </div>
      <span className="sr-only">{label}. Please wait.</span>
    </div>
  );
}

function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {skeletonKeys(count, "stat").map((key) => (
        <div
          key={key}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-3 w-24 rounded-md" />
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>
            <Skeleton className="size-11 rounded-xl bg-emerald-100" />
          </div>
          <Skeleton className="mt-6 h-3 w-32 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40 rounded-lg" />
          <Skeleton className="h-3 w-56 rounded-md" />
        </div>
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <div className="mt-7 flex h-56 items-end justify-around gap-3 border-b border-slate-100 px-2">
        {[35, 55, 42, 78, 62, 88, 68].map((height) => (
          <Skeleton
            key={height}
            className="w-full max-w-10 rounded-t-lg bg-emerald-100"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40 rounded-lg" />
          <Skeleton className="h-3 w-52 rounded-md" />
        </div>
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <div className="mt-5 divide-y divide-slate-100">
        {skeletonKeys(rows, "list").map((key) => (
          <div key={key} className="flex items-center gap-3 py-4 first:pt-0">
            <Skeleton className="size-10 shrink-0 rounded-xl bg-emerald-50" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-3.5 w-40 max-w-full rounded-md" />
              <Skeleton className="h-3 w-56 max-w-full rounded-md" />
            </div>
            <Skeleton className="hidden h-7 w-20 rounded-full sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44 rounded-lg" />
          <Skeleton className="h-3 w-60 rounded-md" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-48 rounded-xl" />
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>
      <div className="mt-6 hidden grid-cols-4 gap-5 rounded-xl bg-slate-50 px-5 py-4 sm:grid">
        {skeletonKeys(4, "table-heading").map((key) => (
          <Skeleton key={key} className="h-3 w-20 rounded-md" />
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {skeletonKeys(rows, "table-row").map((key) => (
          <div
            key={key}
            className="grid grid-cols-[1fr_auto] items-center gap-4 py-5 sm:grid-cols-4 sm:gap-5 sm:px-5"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-xl bg-emerald-50" />
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-28 rounded-md" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
            <Skeleton className="hidden h-3.5 w-28 rounded-md sm:block" />
            <Skeleton className="hidden h-7 w-20 rounded-full sm:block" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-between border-t border-slate-100 pt-5">
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

function PageShell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-svh overflow-hidden bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <output aria-live="polite" className="sr-only">
        {label}. Please wait.
      </output>
      <div className="mx-auto max-w-7xl space-y-6">
        <HeaderSkeleton label={label} />
        {children}
      </div>
    </main>
  );
}

export default function DashboardRouteSkeleton({
  variant,
}: DashboardRouteSkeletonProps) {
  const label = variantCopy[variant];

  switch (variant) {
    case "admin-overview":
      return (
        <PageShell label={label}>
          <StatsSkeleton />
          <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
            <ChartSkeleton />
            <ListSkeleton rows={4} />
          </div>
          <TableSkeleton rows={5} />
        </PageShell>
      );
    case "admin-users":
      return (
        <PageShell label={label}>
          <StatsSkeleton count={3} />
          <TableSkeleton />
        </PageShell>
      );
    case "admin-emergency":
      return (
        <PageShell label={label}>
          <StatsSkeleton count={4} />
          <TableSkeleton rows={5} />
        </PageShell>
      );
    case "driver-overview":
      return (
        <PageShell label={label}>
          <StatsSkeleton count={3} />
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <ListSkeleton rows={5} />
            <ChartSkeleton />
          </div>
        </PageShell>
      );
    case "driver-trips":
      return (
        <PageShell label={label}>
          <div className="grid gap-5 lg:grid-cols-[1fr_0.32fr]">
            <TableSkeleton rows={6} />
            <ListSkeleton rows={4} />
          </div>
        </PageShell>
      );
    case "patient-overview":
      return (
        <PageShell label={label}>
          <StatsSkeleton count={3} />
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <ListSkeleton rows={5} />
            <ListSkeleton rows={4} />
          </div>
        </PageShell>
      );
    case "patient-payments":
      return (
        <PageShell label={label}>
          <StatsSkeleton count={3} />
          <TableSkeleton rows={5} />
        </PageShell>
      );
  }
}
