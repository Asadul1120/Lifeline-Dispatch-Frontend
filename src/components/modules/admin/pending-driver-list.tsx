"use client";

import { toast } from "sonner";

import {
  usePendingDrivers,
  useApproveDriver,
  useRejectDriver,
} from "@/hooks";

import { getMessage } from "@/lib/utils";

export default function PendingDriverList() {
  const driversQuery = usePendingDrivers();
  const approveMutation = useApproveDriver();
  const rejectMutation = useRejectDriver();

  const drivers = driversQuery.data?.data ?? [];

  const isSaving = approveMutation.isPending || rejectMutation.isPending;

  const handleApprove = (driverId: string) => {
    if (isSaving) return;

    approveMutation.mutate(driverId, {
      onSuccess: () => {
        toast.success("Driver approved successfully.");
      },
      onError: (error) => {
        toast.error(getMessage(error, "Could not approve driver."));
      },
    });
  };

  const handleReject = (driverId: string) => {
    if (isSaving) return;

    const confirmed = window.confirm("Do you want to reject this application?");

    if (!confirmed) return;

    rejectMutation.mutate(driverId, {
      onSuccess: () => {
        toast.success("Driver application rejected.");
      },
      onError: (error) => {
        toast.error(getMessage(error, "Could not reject driver."));
      },
    });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-900">
        Pending driver applications
      </h2>

      {driversQuery.isPending && (
        <p className="mt-4 text-sm text-slate-500">Loading applications...</p>
      )}

      {driversQuery.isError && (
        <div className="mt-4 text-sm text-red-600">
          Could not load applications.
          <button
            type="button"
            onClick={() => void driversQuery.refetch()}
            className="ml-2 underline"
          >
            Retry
          </button>
        </div>
      )}

      {driversQuery.isSuccess && drivers.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">No pending applications.</p>
      )}

      {driversQuery.isSuccess && (
        <div className="mt-5 space-y-4">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="font-semibold text-slate-900">
                  {driver.user.name}
                </h3>

                <p className="break-all text-sm text-slate-500">
                  {driver.user.email}
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  License: {driver.licenseNumber}
                </p>

                <p className="text-sm text-slate-600">
                  Experience: {driver.experience} years
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleApprove(driver.id)}
                  className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
                >
                  {approveMutation.isPending &&
                  approveMutation.variables === driver.id
                    ? "Approving..."
                    : "Approve"}
                </button>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleReject(driver.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {rejectMutation.isPending &&
                  rejectMutation.variables === driver.id
                    ? "Rejecting..."
                    : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
