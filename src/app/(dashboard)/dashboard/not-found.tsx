"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Home,
  LayoutDashboard,
  MapPinOff,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function DashboardNotFound() {
  const pathname = usePathname();

  const role = pathname.split("/")[2];

  const dashboards: Record<string, { title: string; href: string }> = {
    admin: {
      title: "Admin Dashboard",
      href: "/dashboard/admin",
    },
    driver: {
      title: "Driver Dashboard",
      href: "/dashboard/driver",
    },
    patient: {
      title: "Patient Dashboard",
      href: "/dashboard/patient",
    },
  };

  const currentDashboard = dashboards[role];

  return (
    <main className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-[#f5f8f7] px-4 py-12 sm:px-6">
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-emerald-100/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-teal-100/60 blur-3xl"
      />

      <div className="relative w-full max-w-2xl">
        <Card className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white py-0 shadow-xl shadow-slate-900/5">
          <CardContent className="p-7 text-center sm:p-12">
            {/* Illustration */}
            <div className="relative mx-auto flex h-36 w-44 items-center justify-center">
              <div className="absolute size-32 rounded-full bg-emerald-50" />

              <div className="absolute size-24 rounded-full border border-emerald-200" />

              <div className="relative flex size-20 items-center justify-center rounded-3xl border border-emerald-100 bg-white shadow-lg shadow-emerald-900/10">
                <MapPinOff
                  className="size-10 text-emerald-700"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </div>

              <span className="absolute right-0 top-4 rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                404
              </span>
            </div>

            {/* Heading */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Dashboard navigation
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Oops! Page not found.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
              The dashboard page you are looking for doesn&apos;t exist or may
              have been moved. Please check the URL or return to your dashboard.
            </p>

            {/* Current URL */}
            <div className="mx-auto mt-6 max-w-lg rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="mb-1 text-xs font-medium text-slate-400">
                Requested path
              </p>

              <code className="block break-all text-xs text-slate-600 sm:text-sm">
                {pathname}
              </code>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {currentDashboard && (
                <Link
                  href={currentDashboard.href}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                >
                  <LayoutDashboard className="size-4" aria-hidden="true" />
                  Back to Dashboard
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}

              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Home className="size-4" aria-hidden="true" />
                Go to Homepage
              </Link>
            </div>

            <div className="mt-9 flex items-center justify-center gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Use the sidebar to navigate between available pages.
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-400">
          Lifeline Dispatch — Connected Emergency Care
        </p>
      </div>
    </main>
  );
}
