"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useGetMe } from "@/hooks/auth.hook";
import { getDashboardRoute } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

function GuestOnlyGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { data, isPending, isSuccess } = useGetMe();

  const role = isSuccess ? data?.data?.role : undefined;

  useEffect(() => {
    if (!role) return;

    router.replace(getDashboardRoute(role));
  }, [role, router]);

  if (isPending) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#f5f8f7]">
        <div role="status" className="flex flex-col items-center gap-3">
          <Spinner className="size-7 text-emerald-700" />

          <p className="text-sm font-medium text-slate-500">
            Checking session...
          </p>
        </div>
      </div>
    );
  }

  if (role) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#f5f8f7]">
        <div role="status" className="flex flex-col items-center gap-3">
          <Spinner className="size-7 text-emerald-700" />

          <p className="text-sm font-medium text-slate-500">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/verify-email") {
    return <>{children}</>;
  }

  return <GuestOnlyGuard>{children}</GuestOnlyGuard>;
}
