"use client";

import { ArrowLeft, CreditCard, MapPin, UserRound } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  useCancelEmergencyRequest,
  useCreatePayment,
  useEmergencyRequest,
} from "@/hooks";
import { getMessage } from "@/lib/utils";

export default function EmergencyRequestDetailsPage() {
  const params = useParams<{ id: string }>();
  const requestId = params.id;
  const { data: response, isLoading, isError } = useEmergencyRequest(requestId);
  const { mutate: cancelRequest, isPending: isCancelling } =
    useCancelEmergencyRequest();
  const { mutate: createPayment, isPending: isPaying } = useCreatePayment();
  const [amount, setAmount] = useState("7499");
  const request = response?.data;

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !request) {
    return (
      <MessageState message="This emergency request could not be found." />
    );
  }

  const driver = request.ambulance?.driver?.user;
  const payment = request.payment;

  const handleCancel = () => {
    if (!window.confirm("Cancel this pending emergency request?")) return;
    cancelRequest(request.id, {
      onSuccess: (result) =>
        toast.success(getMessage(result, "Request cancelled.")),
      onError: (error) =>
        toast.error(getMessage(error, "Could not cancel request.")),
    });
  };

  const handlePayment = () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      toast.error("Enter a valid payment amount.");
      return;
    }

    createPayment(
      { requestId: request.id, amount: numericAmount },
      {
        onSuccess: (result) => {
          const paymentUrl = result?.data?.bkashURL;
          if (paymentUrl) {
            window.location.href = paymentUrl;
          } else {
            toast.success(getMessage(result, "Payment initialized."));
          }
        },
        onError: (error) =>
          toast.error(getMessage(error, "Could not start bKash payment.")),
      },
    );
  };

  return (
    <main className="min-h-svh bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/dashboard/patient"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft className="size-4" />
          Back to requests
        </Link>
        <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Emergency request
              </p>
              <h1 className="mt-2 text-2xl font-bold text-slate-900">
                {request.emergencyType}
              </h1>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              {request.status}
            </span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Info label="Pickup location" value={request.pickupLocation} />
            <Info
              label="Destination"
              value={request.destination ?? "Not provided"}
            />
            <Info label="Priority" value={request.priority} />
            <Info
              label="Requested"
              value={new Date(request.createdAt).toLocaleString("en-BD")}
            />
          </div>
          {driver && (
            <div className="mt-6 rounded-2xl bg-emerald-50 p-5">
              <div className="flex items-center gap-3 text-emerald-800">
                <UserRound className="size-5" />
                <h2 className="font-semibold">Assigned driver</h2>
              </div>
              <p className="mt-2 text-sm text-emerald-900">
                {driver.name} · {driver.email}
              </p>
            </div>
          )}
          {request.trip && (
            <div className="mt-4 rounded-2xl bg-blue-50 p-5 text-sm text-blue-800">
              Trip status: <strong>{request.trip.status}</strong>
              {request.trip.startTime &&
                ` · Started ${new Date(request.trip.startTime).toLocaleString("en-BD")}`}
            </div>
          )}

          {request.status === "PENDING" && (
            <button
              type="button"
              disabled={isCancelling}
              onClick={handleCancel}
              className="mt-6 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              {isCancelling ? "Cancelling…" : "Cancel request"}
            </button>
          )}

          {(!payment ||
            payment.status === "PENDING" ||
            payment.status === "FAILED") &&
            request.status !== "CANCELLED" && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="size-5 text-emerald-700" />
                  <h2 className="font-semibold text-slate-900">
                    {payment ? "Retry payment with bKash" : "Pay with bKash"}
                  </h2>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {payment
                    ? payment.status === "PENDING"
                      ? "Your previous checkout is still pending. You can open bKash again to continue or retry."
                      : "Your previous payment did not complete. You can safely try again."
                    : "Enter the amount and continue to the secure bKash checkout."}
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    disabled={isPaying}
                    onClick={handlePayment}
                    className="h-11 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
                  >
                    {isPaying
                      ? "Opening bKash…"
                      : payment
                        ? payment.status === "PENDING"
                          ? "Continue with bKash"
                          : "Retry with bKash"
                        : "Continue to bKash"}
                  </button>
                </div>
              </div>
            )}
          {payment && (
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h2 className="font-semibold text-slate-900">Payment</h2>
              <p className="mt-2 text-sm text-slate-600">
                Amount: BDT {payment.amount} · Status:{" "}
                <strong>{payment.status}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex items-start gap-2 text-sm text-slate-700">
      <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-700" />
      <span>
        <span className="block text-xs text-slate-400">{label}</span>
        {value}
      </span>
    </p>
  );
}
function LoadingState() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-slate-50">
      <Spinner className="size-6 text-emerald-700" />
    </main>
  );
}
function MessageState({ message }: { message: string }) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-slate-50 px-4">
      <p className="text-sm text-slate-500">{message}</p>
    </main>
  );
}
