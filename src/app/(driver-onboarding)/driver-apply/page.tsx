import type { Metadata } from "next";
import Link from "next/link";
import { Ambulance, HeartPulse } from "lucide-react";
import DriverApplyForm from "@/components/form/driver-apply-form";

export const metadata: Metadata = {
  title: "Apply as a Driver | Lifeline Dispatch",
  description: "Join Lifeline Dispatch as an ambulance driver.",
};

export default function DriverApplyPage() {
  return (
    <main className="min-h-svh bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_24px_90px_-35px_rgba(15,23,42,0.22)] lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="relative overflow-hidden bg-[#073e34] p-7 text-white sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 size-[520px] rounded-full border border-white/10"
          />
          <Link href="/" className="relative inline-flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-300 text-[#073e34]">
              <HeartPulse aria-hidden="true" className="size-6" />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Lifeline{" "}
              <span className="font-normal text-emerald-100">Dispatch</span>
            </span>
          </Link>
          <div className="relative mt-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/5 px-3 py-1.5 text-[11px] font-medium tracking-widest text-emerald-100">
              <Ambulance aria-hidden="true" className="size-3.5" />
              JOIN THE RESPONSE TEAM
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Drive care
              <br />
              <span className="text-emerald-300">when it matters.</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-50/75">
              Apply to become a Lifeline Dispatch driver and help connect people
              with emergency care.
            </p>
          </div>
        </aside>

        <section className="px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-emerald-700">
                DRIVER APPLICATION
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Become a driver
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Share your details. We will send a verification code to your
                email.
              </p>
            </div>

            <DriverApplyForm />

            <p className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-emerald-700 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
