import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PaymentHistory from "@/components/modules/patient/payment-history";

export const metadata: Metadata = { title: "Payments | Lifeline Dispatch" };

export default function PatientPaymentsPage() {
  return (
    <main className="min-h-svh bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard/patient"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Link>
        <PaymentHistory />
      </div>
    </main>
  );
}
