"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Menu, ShieldAlert } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import DashboardSidebar from "@/components/share/DashboardSidebar";
import { Spinner } from "@/components/ui/spinner";
import { useGetMe } from "@/hooks/auth.hook";
import { getDashboardRoute } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading, isError } = useGetMe();

  useEffect(() => {
    if (isError) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (data?.data.role) {
      const correctRoute = getDashboardRoute(data.data.role);

      if (
        pathname !== correctRoute &&
        !pathname.startsWith(`${correctRoute}/`)
      ) {
        router.replace(correctRoute);
      }
    }
  }, [data, isError, pathname, router]);

  if (isLoading || !data) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <Spinner className="size-5 text-emerald-700" />
          Checking your account…
        </div>
      </div>
    );
  }

  const { role, name } = data.data;
  const correctRoute = getDashboardRoute(role);
  const hasCorrectRole =
    pathname === correctRoute || pathname.startsWith(`${correctRoute}/`);

  if (!hasCorrectRole) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <ShieldAlert className="mx-auto size-8 text-amber-600" />
          <h1 className="mt-3 text-xl font-semibold text-slate-900">
            Redirecting…
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            This dashboard is not available for your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full bg-[#f5f8f7]">
      <DashboardSidebar
        role={role}
        name={name || "Account"}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={isSidebarOpen}
            aria-controls="dashboard-sidebar"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
          <span className="font-semibold text-slate-900">
            Lifeline Dashboard
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
