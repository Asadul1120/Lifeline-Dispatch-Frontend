import { Suspense } from "react";

import VerifyEmailForm from "@/components/form/verify-email-form";
import { Spinner } from "@/components/ui/spinner";

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Suspense
          fallback={
            <div
              role="status"
              className="flex items-center justify-center gap-2 py-10"
            >
              <Spinner className="size-5" />
              <span className="text-sm text-slate-500">Loading…</span>
            </div>
          }
        >
          <VerifyEmailForm />
        </Suspense>
      </div>
    </main>
  );
}
