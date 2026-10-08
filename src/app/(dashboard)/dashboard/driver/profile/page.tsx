import { ArrowLeft, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import DriverProfileForm from "@/components/modules/driver/driver-profile-form";

export const metadata: Metadata = {
  title: "Driver Profile | Lifeline Dispatch",
  description: "View and update your Lifeline Dispatch driver profile.",
};

export default function DriverProfilePage() {
  return (
    <main className="min-h-svh bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/dashboard/driver"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to dashboard
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <UserRound aria-hidden="true" className="size-6" />
            </span>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                My profile
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Keep your driver profile up to date
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add a profile photo and update your contact and driver details.
              </p>
            </div>
          </div>

          <DriverProfileForm />
        </div>
      </div>
    </main>
  );
}
