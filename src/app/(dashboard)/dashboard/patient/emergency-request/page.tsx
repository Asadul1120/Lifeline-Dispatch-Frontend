import type { Metadata } from "next";
import { Ambulance, Clock3, ShieldCheck } from "lucide-react";
import EmergencyRequestForm from "@/components/form/emergency-request-form";

export const metadata: Metadata = {
  title: "Patient Dashboard | Lifeline Dispatch",
  description: "Request an emergency ambulance from Lifeline Dispatch.",
};

export default function PatientDashboardPage() {
  return (
    <main className="min-h-svh bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Patient dashboard
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Get help when it matters.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Share your pickup and emergency details. Our dispatch team will help
            connect you with an ambulance.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7 flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Ambulance aria-hidden="true" className="size-6" />
              </span>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Request an ambulance
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Tell us where you are and what kind of help you need.
                </p>
              </div>
            </div>
            <EmergencyRequestForm />
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-[#073e34] p-6 text-white shadow-sm sm:p-8">
              <ShieldCheck className="size-8 text-emerald-300" />
              <h2 className="mt-5 text-xl font-semibold">
                Stay calm. We are here.
              </h2>
              <p className="mt-3 text-sm leading-6 text-emerald-50/75">
                For immediate danger, contact your local emergency service
                first, then use Lifeline Dispatch to arrange transport.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
              <Clock3 className="size-7 text-emerald-700" />
              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                What happens next?
              </h2>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>1. Your request is added to the dispatch queue.</li>
                <li>2. An admin assigns an available ambulance.</li>
                <li>
                  3. You can follow the request status from your dashboard.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
