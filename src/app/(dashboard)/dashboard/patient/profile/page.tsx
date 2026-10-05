import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UserRound } from "lucide-react";
import PatientProfileForm from "@/components/modules/patient/patient-profile-form";

export const metadata: Metadata = {
  title: "My Profile | Lifeline Dispatch",
  description: "View and update your Lifeline Dispatch patient profile.",
};

export default function PatientProfilePage() {
  return (
    <main className="min-h-svh bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/dashboard/patient"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-start gap-4">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <UserRound className="size-6" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                My profile
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Keep your details up to date
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Accurate contact details help our team support you during an
                emergency.
              </p>
            </div>
          </div>

          <PatientProfileForm />
        </div>
      </div>
    </main>
  );
}
