import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList, Plus } from "lucide-react";
import EmergencyRequestList from "@/components/modules/patient/emergency-request-list";

export const metadata: Metadata = {
  title: "Patient Dashboard | Lifeline Dispatch",
  description: "View and manage your emergency ambulance requests.",
};

export default function PatientDashboardPage() {
  return (
    <main className="min-h-svh bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Patient dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Your emergency requests
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Check the latest status of your requests or create a new ambulance
              request when you need help.
            </p>
          </div>

          <Link
            href="/dashboard/patient/emergency-request"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <Plus aria-hidden="true" className="size-4" />
            Request an ambulance
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={<ClipboardList aria-hidden="true" className="size-5" />}
            title="Request history"
            description="All your ambulance requests in one place."
          />
          <SummaryCard
            icon={<ArrowRight aria-hidden="true" className="size-5" />}
            title="Live status"
            description="See when your request is assigned or on the way."
          />
          <SummaryCard
            icon={<Plus aria-hidden="true" className="size-5" />}
            title="Need help again?"
            description="Create a new request in a few simple steps."
          />
        </div>

        <EmergencyRequestList />
      </div>
    </main>
  );
}

type SummaryCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function SummaryCard({ icon, title, description }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        {icon}
      </span>
      <h2 className="mt-4 text-sm font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
    </div>
  );
}
