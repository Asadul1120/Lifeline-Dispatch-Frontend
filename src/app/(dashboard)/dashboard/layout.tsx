"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import { useGetMe } from "@/hooks/auth.hook";
import { getDashboardRoute } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading, isError } = useGetMe();

  useEffect(() => {
    if (isError) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (data?.data.role) {
      const correctRoute = getDashboardRoute(data.data.role);

      if (!pathname.startsWith(correctRoute)) {
        router.replace(correctRoute);
      }
    }
  }, [data, isError, pathname, router]);

  if (isLoading || !data) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <Spinner className="size-6 text-emerald-700" />
          <p className="text-sm text-slate-500">Checking your account…</p>
        </div>
      </main>
    );
  }

  const correctRoute = getDashboardRoute(data.data.role);
  const hasCorrectRole = pathname.startsWith(correctRoute);

  if (!hasCorrectRole) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-slate-50 px-4">
        <div className="flex max-w-sm flex-col items-center gap-3 text-center">
          <ShieldAlert className="size-8 text-amber-600" />
          <h1 className="text-xl font-semibold text-slate-900">Redirecting…</h1>
          <p className="text-sm text-slate-500">
            This dashboard is not available for your account.
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
