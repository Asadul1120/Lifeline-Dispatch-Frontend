"use client";

import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useMyPayments } from "@/hooks";

export default function PaymentHistory() {
  const { data: response, isLoading, isError } = useMyPayments();
  const payments = response?.data ?? [];

  return (
    <section className="mt-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <CreditCard className="size-5 text-emerald-700" />
        <h2 className="text-xl font-semibold text-slate-900">
          Payment history
        </h2>
      </div>
      {isLoading && (
        <p className="mt-5 text-sm text-slate-500">Loading payments…</p>
      )}
      {isError && (
        <p className="mt-5 text-sm text-red-600">
          Could not load payment history.
        </p>
      )}
      {!isLoading && !isError && payments.length === 0 && (
        <p className="mt-5 text-sm text-slate-500">No payments yet.</p>
      )}
      {!isLoading && !isError && payments.length > 0 && (
        <div className="mt-5 space-y-3">
          {payments.map((payment: any) => (
            <div
              key={payment.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  BDT {payment.amount}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {new Date(payment.createdAt).toLocaleString("en-BD")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600">
                  {payment.status}
                </span>
                {payment.requestId && (
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/dashboard/patient/emergency-request/${payment.requestId}`}
                      className="text-sm font-semibold text-emerald-700 hover:underline"
                    >
                      View request
                    </Link>
                    {(payment.status === "FAILED" ||
                      payment.status === "PENDING") && (
                      <Link
                        href={`/dashboard/patient/emergency-request/${payment.requestId}`}
                        className="text-sm font-semibold text-amber-700 hover:underline"
                      >
                        {payment.status === "PENDING"
                          ? "Continue payment"
                          : "Retry payment"}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
