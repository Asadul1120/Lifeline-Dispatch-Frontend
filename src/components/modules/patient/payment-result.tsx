// import Link from "next/link";

// export default function PaymentResult({
//   title,
//   message,
// }: {
//   title: string;
//   message: string;
// }) {
//   return (
//     <main className="flex min-h-svh items-center justify-center bg-slate-50 px-4">
//       <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
//         <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
//           ✓
//         </div>
//         <h1 className="mt-5 text-2xl font-bold text-slate-900">{title}</h1>
//         <p className="mt-3 text-sm leading-6 text-slate-500">{message}</p>
//         <Link
//           href="/dashboard/patient"
//           className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800"
//         >
//           Back to dashboard
//         </Link>
//       </div>
//     </main>
//   );
// }

import {
  ArrowLeft,
  CircleCheck,
  CircleHelp,
  CircleX,
  History,
  OctagonX,
} from "lucide-react";
import Link from "next/link";

const resultConfig = {
  success: {
    icon: CircleCheck,
    title: "Checkout complete",
    message:
      "You have returned from bKash checkout. Open your payment history to confirm the recorded payment status.",
    iconClassName: "bg-emerald-100 text-emerald-700",
  },
  failed: {
    icon: CircleX,
    title: "Payment could not be completed",
    message:
      "Check your payment history for the latest status. If money was deducted, keep your bKash transaction ID for support.",
    iconClassName: "bg-red-100 text-red-600",
  },
  cancel: {
    icon: OctagonX,
    title: "Checkout cancelled",
    message:
      "You have returned from the cancelled checkout. Check your payment history before attempting another payment.",
    iconClassName: "bg-amber-100 text-amber-700",
  },
  unknown: {
    icon: CircleHelp,
    title: "Payment status unclear",
    message:
      "We could not determine the checkout result. Check your payment history before attempting another payment.",
    iconClassName: "bg-slate-100 text-slate-600",
  },
};

type PaymentResultProps = {
  status: keyof typeof resultConfig;
};

export default function PaymentResult({ status }: PaymentResultProps) {
  const result = resultConfig[status];
  const Icon = result.icon;

  return (
    <main className="flex min-h-svh items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <div
          className={`mx-auto flex size-16 items-center justify-center rounded-full ${result.iconClassName}`}
        >
          <Icon aria-hidden="true" className="size-8" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Lifeline Dispatch
        </p>

        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          {result.title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {result.message}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/dashboard/patient/payments"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <History aria-hidden="true" className="size-4" />
            View payment history
          </Link>

          <Link
            href="/dashboard/patient"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
