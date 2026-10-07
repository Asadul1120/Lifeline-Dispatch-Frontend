import type { ReactNode } from "react";
import { AlertCircle, ChevronLeft, ChevronRight, Inbox } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMessage } from "@/lib/utils";

export function AdminPage({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-svh px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-7">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Lifeline administration
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            )}
          </div>
          {action}
        </header>

        {children}
      </div>
    </main>
  );
}

export function AdminPanel({
  title,
  action,
  children,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="rounded-2xl bg-white shadow-sm">
      {title && (
        <CardHeader className="flex flex-row items-center justify-between gap-4 px-6">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {action}
        </CardHeader>
      )}
      <CardContent className="space-y-5 px-6">{children}</CardContent>
    </Card>
  );
}

export function StatusBadge({ status }: { status: string }) {
  let color = "bg-slate-100 text-slate-700";

  if (
    [
      "ACTIVE",
      "APPROVED",
      "AVAILABLE",
      "COMPLETED",
      "PAID",
      "VERIFIED",
    ].includes(status)
  ) {
    color = "bg-emerald-50 text-emerald-700";
  } else if (["BANNED", "REJECTED", "FAILED", "CRITICAL"].includes(status)) {
    color = "bg-red-50 text-red-700";
  } else if (
    ["PENDING", "SUSPENDED", "MAINTENANCE", "HIGH", "UNVERIFIED"].includes(
      status,
    )
  ) {
    color = "bg-amber-50 text-amber-700";
  } else if (
    [
      "ASSIGNED",
      "BUSY",
      "ON_THE_WAY",
      "PICKED_UP",
      "ONGOING",
      "STARTED",
    ].includes(status)
  ) {
    color = "bg-blue-50 text-blue-700";
  }

  return (
    <Badge
      variant="secondary"
      className={`rounded-full border-0 px-2.5 py-1 text-[11px] font-semibold ${color}`}
    >
      {status.replaceAll("_", " ")}
    </Badge>
  );
}

export function QueryMessage({
  loading,
  error,
  retry,
}: {
  loading: boolean;
  error: unknown;
  retry: () => void;
}) {
  if (loading) {
    return (
      <div role="status" aria-label="Loading" className="space-y-3 py-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex flex-wrap items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4"
      >
        <AlertCircle className="size-5 text-red-600" />
        <p className="flex-1 text-sm text-red-700">
          {getMessage(error, "Could not load information.")}
        </p>
        <Button type="button" variant="outline" onClick={retry}>
          Retry
        </Button>
      </div>
    );
  }

  return null;
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
      <Inbox className="mx-auto size-8 text-slate-300" />
      <p className="mt-3 text-sm text-slate-500">{message}</p>
    </div>
  );
}

export function AdminPagination({
  page,
  hasNextPage,
  loading,
  onChange,
}: {
  page: number;
  hasNextPage: boolean;
  loading: boolean;
  onChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
      <p className="text-sm text-slate-500">Page {page}</p>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={page <= 1 || loading}
          onClick={() => onChange(page - 1)}
          className="h-9 rounded-lg px-3"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!hasNextPage || loading}
          onClick={() => onChange(page + 1)}
          className="h-9 rounded-lg px-3"
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function InfoItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="mt-2 wrap-break-word text-sm font-semibold text-slate-800">
        {value || "Not provided"}
      </div>
    </div>
  );
}
