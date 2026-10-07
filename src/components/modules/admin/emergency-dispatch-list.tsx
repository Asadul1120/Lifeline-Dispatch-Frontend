"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  useAdminEmergencyRequests,
  useAdminAmbulances,
  useAssignAmbulance,
} from "@/hooks";

import { getMessage } from "@/lib/utils";

import type { AdminAmbulance, AdminEmergencyRequest } from "@/types";

export default function EmergencyDispatchList() {
  const [page, setPage] = useState(1);

  const requestsQuery = useAdminEmergencyRequests(page);
  const ambulancesQuery = useAdminAmbulances();
  const assignMutation = useAssignAmbulance();

  const requests = requestsQuery.data?.data.data ?? [];
  const pagination = requestsQuery.data?.data.pagination;
  const ambulances = ambulancesQuery.data?.data ?? [];

  const availableAmbulances = ambulances.filter(
    (ambulance) =>
      ambulance.status === "AVAILABLE" &&
      ambulance.driver.isAvailable &&
      ambulance.driver.applicationStatus === "APPROVED",
  );

  const handleAssign = (requestId: string, ambulanceId: string) => {
    if (assignMutation.isPending) return;

    const isAvailable = availableAmbulances.some(
      (ambulance) => ambulance.id === ambulanceId,
    );

    if (!isAvailable) {
      toast.error("Select an available ambulance.");
      return;
    }

    assignMutation.mutate(
      { requestId, ambulanceId },
      {
        onSuccess: () => {
          toast.success("Ambulance assigned successfully.");
        },
        onError: (error) => {
          toast.error(getMessage(error, "Could not assign ambulance."));
        },
      },
    );
  };

  const isLoading = requestsQuery.isPending || ambulancesQuery.isPending;

  const hasError = requestsQuery.isError || ambulancesQuery.isError;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-900">
        Pending emergency requests
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Oldest requests appear first.
      </p>

      {isLoading && (
        <p className="mt-4 text-sm text-slate-500">
          Loading requests and ambulances...
        </p>
      )}

      {hasError && (
        <div className="mt-4 text-sm text-red-600">
          Could not load dispatch information.
          <button
            type="button"
            onClick={() => {
              void requestsQuery.refetch();
              void ambulancesQuery.refetch();
            }}
            className="ml-2 underline"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !hasError && (
        <>
          <p className="mt-4 text-sm text-slate-600">
            Pending requests: {pagination?.total ?? 0}
            {" · "}
            Available ambulances: {availableAmbulances.length}
          </p>

          {requests.length === 0 && (
            <p className="mt-4 text-sm text-slate-500">
              No pending requests on this page.
            </p>
          )}

          <div className="mt-5 space-y-4">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                ambulances={availableAmbulances}
                isAssigning={assignMutation.isPending}
                onAssign={handleAssign}
              />
            ))}
          </div>
        </>
      )}

      {(page > 1 || pagination?.hasNextPage) && (
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-slate-500">Page {page}</span>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 1 || requestsQuery.isFetching}
              onClick={() => setPage(page - 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                !pagination?.hasNextPage ||
                requestsQuery.isFetching ||
                requestsQuery.isError
              }
              onClick={() => setPage(page + 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

type RequestCardProps = {
  request: AdminEmergencyRequest;
  ambulances: AdminAmbulance[];
  isAssigning: boolean;
  onAssign: (requestId: string, ambulanceId: string) => void;
};

function RequestCard({
  request,
  ambulances,
  isAssigning,
  onAssign,
}: RequestCardProps) {
  const [ambulanceId, setAmbulanceId] = useState("");

  const selectedAmbulanceExists = ambulances.some(
    (ambulance) => ambulance.id === ambulanceId,
  );

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex flex-wrap justify-between gap-3">
        <h3 className="font-semibold text-slate-900">
          {request.emergencyType}
        </h3>

        <span className="text-sm font-semibold text-amber-700">
          {request.priority}
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-700">
        Patient: {request.patient.name}
      </p>

      <p className="break-all text-sm text-slate-500">
        {request.patient.email}
      </p>

      <p className="mt-3 text-sm text-slate-700">
        Pickup: {request.pickupLocation}
      </p>

      <p className="mt-1 text-sm text-slate-700">
        Destination: {request.destination || "Not provided"}
      </p>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <label
          htmlFor={`ambulance-${request.id}`}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Available ambulance
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            id={`ambulance-${request.id}`}
            value={selectedAmbulanceExists ? ambulanceId : ""}
            onChange={(event) => setAmbulanceId(event.target.value)}
            disabled={isAssigning || ambulances.length === 0}
            className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="">
              {ambulances.length === 0
                ? "No available ambulance"
                : "Select an ambulance"}
            </option>

            {ambulances.map((ambulance) => (
              <option key={ambulance.id} value={ambulance.id}>
                {ambulance.vehicleNumber} · {ambulance.type} ·{" "}
                {ambulance.driver.user.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            disabled={!selectedAmbulanceExists || isAssigning}
            onClick={() => onAssign(request.id, ambulanceId)}
            className="h-11 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
          >
            Assign ambulance
          </button>
        </div>
      </div>
    </div>
  );
}
