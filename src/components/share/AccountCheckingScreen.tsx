import { Activity, HeartPulse, ShieldCheck } from "lucide-react";

type AccountCheckingScreenProps = {
  title?: string;
  description?: string;
};

export default function AccountCheckingScreen({
  title = "Checking your account",
  description = "Verifying your session and preparing your dashboard.",
}: AccountCheckingScreenProps) {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-label={title}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#f5f8f7] px-4 py-12"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 size-80 rounded-full bg-emerald-100/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-1/4 size-80 rounded-full bg-teal-100/60 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-2xl shadow-emerald-950/5">
          {/* Branding */}
          <div className="flex items-center justify-center gap-2.5 border-b border-slate-100 px-6 py-5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <HeartPulse className="size-5" aria-hidden="true" />
            </div>

            <div className="text-left">
              <p className="text-sm font-bold tracking-tight text-slate-900">
                Lifeline Dispatch
              </p>

              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Connected Emergency Care
              </p>
            </div>
          </div>

          {/* Verification */}
          <div className="px-6 pb-8 pt-10 text-center sm:px-10">
            {/* Animated Heart Icon */}
            <div className="relative mx-auto flex size-28 items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-emerald-200 motion-safe:animate-ping"
              />

              <span
                aria-hidden="true"
                className="absolute inset-3 rounded-full bg-emerald-50"
              />

              <div className="relative flex size-20 items-center justify-center rounded-3xl bg-emerald-700 text-white shadow-xl shadow-emerald-700/20">
                <HeartPulse
                  aria-hidden="true"
                  className="size-10 motion-safe:animate-pulse"
                  strokeWidth={1.7}
                />
              </div>

              <span
                aria-hidden="true"
                className="absolute -bottom-1 right-1 flex size-9 items-center justify-center rounded-xl border-4 border-white bg-emerald-100 text-emerald-700"
              >
                <ShieldCheck className="size-4" />
              </span>
            </div>

            {/* Text */}
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                Account verification
              </p>

              <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {title}
                <span className="motion-safe:animate-pulse text-emerald-600">
                  ...
                </span>
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-500">
                {description}
              </p>
            </div>

            {/* Verification Status */}
            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-left">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <Activity
                    aria-hidden="true"
                    className="size-5 motion-safe:animate-pulse"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Session verification
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Checking account permissions
                  </p>
                </div>

                <span className="relative flex size-2.5 shrink-0">
                  <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-600" />
                </span>
              </div>

              {/* Indeterminate loading indicator */}
              <div
                aria-hidden="true"
                className="mt-4 h-1.5 overflow-hidden rounded-full bg-emerald-100"
              >
                <div className="h-full w-2/5 rounded-full bg-emerald-600 motion-safe:animate-pulse" />
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Your workspace will open once verification completes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs font-medium text-slate-400">
          Lifeline Dispatch • Emergency Care Management
        </p>
      </div>
    </main>
  );
}
