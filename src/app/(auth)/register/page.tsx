import RegisterForm from "@/components/form/register-form";
import { Activity, Ambulance, Check, HeartPulse } from "lucide-react";
import Link from "next/link";



export default function RegisterPage() {
  return (
    <main className="flex min-h-svh items-center bg-[#f5f8f7] p-4 sm:p-6 lg:p-10">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_24px_90px_-35px_rgba(15,23,42,0.22)] lg:min-h-[740px] lg:grid-cols-[1fr_1.05fr]">
        <aside className="relative overflow-hidden bg-[#073e34] p-7 text-white sm:p-10 lg:flex lg:flex-col lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 -left-32 size-[600px] rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-10 size-[370px] rounded-full border border-white/10"
          />

          <Link
            href="/"
            className="relative inline-flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-300 text-[#073e34]">
              <HeartPulse aria-hidden="true" className="size-6" />
            </span>

            <span className="text-lg font-bold tracking-tight">
              Lifeline{" "}
              <span className="font-normal text-emerald-100">Dispatch</span>
            </span>
          </Link>

          <p className="relative mt-5 text-sm text-emerald-100/80 lg:hidden">
            Connected care. When it matters.
          </p>

          <div className="relative mt-20 hidden lg:block">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/5 px-3 py-1.5 text-[11px] font-medium tracking-widest text-emerald-100">
              <Activity aria-hidden="true" className="size-3.5" />
              CONNECTED CARE
            </span>

            <h1 className="mt-6 max-w-sm text-5xl font-semibold leading-[1.15] tracking-tight">
              A little preparation.
              <br />
              <span className="text-emerald-300">
                A lifeline when it matters.
              </span>
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-50/75">
              Your first step to staying connected with emergency transport and
              the people who help.
            </p>

            <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-200">
                  <Ambulance aria-hidden="true" className="size-7" />
                </span>

                <div>
                  <p className="text-sm font-semibold">
                    Care starts with connection
                  </p>
                  <p className="mt-1 text-xs text-emerald-100/65">
                    People. Transport. Peace of mind.
                  </p>
                </div>
              </div>

              <div aria-hidden="true" className="mt-5 flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-300" />
                <span className="h-px flex-1 bg-emerald-300/30" />
                <HeartPulse className="size-5 text-emerald-300" />
                <span className="h-px flex-1 bg-emerald-300/30" />
                <span className="size-2 rounded-full bg-emerald-300" />
              </div>
            </div>

            <p className="mt-7 flex items-center gap-2 text-xs text-emerald-100/75">
              <Check aria-hidden="true" className="size-4 text-emerald-300" />
              One account. A more connected journey.
            </p>
          </div>

          <p className="relative mt-auto hidden pt-10 text-[11px] tracking-wide text-emerald-100/50 lg:block">
            LIFELINE DISPATCH · EVERY CONNECTION MATTERS
          </p>
        </aside>

        <section
          aria-labelledby="register-heading"
          className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14"
        >
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-emerald-700">
                LET’S GET YOU STARTED
              </p>

              <h2
                id="register-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-[34px]"
              >
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                A few details today. A better connection tomorrow.
              </p>
            </div>

            <RegisterForm />

            <p className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="rounded font-semibold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-emerald-600"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-7 text-center text-xs text-slate-400">
              Be ready for the moments that matter.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
