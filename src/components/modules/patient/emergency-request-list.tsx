"use client";

import { Ambulance, MapPin, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { getMessage } from "@/lib/utils";
import {
  EmergencyRequestFilters,
  EmergencyRequestItem,
  RequestStatus,
} from "@/types";
import { useCancelEmergencyRequest, useMyEmergencyRequests } from "@/hooks";

const statusStyles: Record<RequestStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  ASSIGNED: "bg-blue-50 text-blue-700",
  ON_THE_WAY: "bg-indigo-50 text-indigo-700",
  PICKED_UP: "bg-purple-50 text-purple-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-slate-100 text-slate-600",
};

const statusLabels: Record<RequestStatus, string> = {
  PENDING: "Waiting for ambulance",
  ASSIGNED: "Ambulance assigned",
  ON_THE_WAY: "Ambulance is on the way",
  PICKED_UP: "Patient picked up",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export default function EmergencyRequestList() {
  const [filters, setFilters] = useState<EmergencyRequestFilters>({
    page: 1,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useMyEmergencyRequests(filters);

  const { mutate: cancelRequest, isPending: isCancelling } =
    useCancelEmergencyRequest();

  const requests = response?.data?.data ?? [];
  const pagination = response?.data?.pagination;

  const updateFilter = (changes: EmergencyRequestFilters) => {
    setFilters((current) => ({ ...current, ...changes, page: 1 }));
  };

  const handleCancel = (requestId: string) => {
    if (!window.confirm("Cancel this pending emergency request?")) return;

    cancelRequest(requestId, {
      onSuccess: (result) =>
        toast.success(getMessage(result, "Request cancelled.")),
      onError: (error) =>
        toast.error(getMessage(error, "Could not cancel request.")),
    });
  };

  return (
    <section className="mt-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Request history
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            Your emergency requests
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Follow the latest status of your ambulance requests.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-50"
        >
          <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input
          value={filters.search ?? ""}
          onChange={(event) =>
            updateFilter({ search: event.target.value || undefined })
          }
          placeholder="Search location or emergency type"
          className="h-10 rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
        <select
          value={filters.status ?? ""}
          onChange={(event) =>
            updateFilter({ status: event.target.value as RequestStatus | "" })
          }
          className="h-10 rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">All statuses</option>
          {Object.keys(statusLabels).map((status) => (
            <option key={status} value={status}>
              {statusLabels[status as RequestStatus]}
            </option>
          ))}
        </select>
        <select
          value={filters.priority ?? ""}
          onChange={(event) =>
            updateFilter({
              priority: event.target
                .value as EmergencyRequestFilters["priority"],
            })
          }
          className="h-10 rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">All priorities</option>
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      {isLoading && (
        <p className="mt-8 text-center text-sm text-slate-500">
          Loading your requests…
        </p>
      )}
      {isError && !isLoading && (
        <div className="mt-8 rounded-2xl bg-red-50 p-4 text-center text-sm text-red-700">
          Could not load your requests. Please try again.
        </div>
      )}
      {!isLoading && !isError && requests.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 px-5 py-10 text-center">
          <Ambulance className="mx-auto size-8 text-slate-300" />
          <p className="mt-3 text-sm font-medium text-slate-700">
            No matching emergency requests.
          </p>
        </div>
      )}
      {!isLoading && !isError && requests.length > 0 && (
        <div className="mt-6 space-y-3">
          {requests.map((request: EmergencyRequestItem) => (
            <RequestCard
              key={request.id}
              request={request}
              isCancelling={isCancelling}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
          <span className="text-slate-500">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!pagination.hasPreviousPage || isLoading}
              onClick={() =>
                setFilters((current) => ({
                  ...current,
                  page: (current.page ?? 1) - 1,
                }))
              }
              className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!pagination.hasNextPage || isLoading}
              onClick={() =>
                setFilters((current) => ({
                  ...current,
                  page: (current.page ?? 1) + 1,
                }))
              }
              className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function RequestCard({
  request,
  isCancelling,
  onCancel,
}: {
  request: EmergencyRequestItem;
  isCancelling: boolean;
  onCancel: (requestId: string) => void;
}) {
  const createdAt = new Date(request.createdAt).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const driverName = request.ambulance?.driver?.user?.name;

  return (
    <article className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {request.emergencyType}
          </p>
          <p className="mt-1 text-xs text-slate-500">Requested {createdAt}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[request.status]}`}
        >
          {statusLabels[request.status]}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-700" />
          <span>
            <span className="block text-xs text-slate-400">Pickup</span>
            {request.pickupLocation}
          </span>
        </p>
        {request.destination && (
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <span>
              <span className="block text-xs text-slate-400">Destination</span>
              {request.destination}
            </span>
          </p>
        )}
      </div>
      {driverName && (
        <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-600">
          Driver:{" "}
          <span className="font-semibold text-slate-900">{driverName}</span>
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-200 pt-3">
        <Link
          href={`/dashboard/patient/emergency-request/${request.id}`}
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          View details
        </Link>
        {request.status === "PENDING" && (
          <button
            type="button"
            disabled={isCancelling}
            onClick={() => onCancel(request.id)}
            className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
          >
            {isCancelling ? "Cancelling…" : "Cancel request"}
          </button>
        )}
      </div>
    </article>
  );
}
