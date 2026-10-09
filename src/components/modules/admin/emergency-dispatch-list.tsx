// "use client";

// import { useState } from "react";
// import { toast } from "sonner";

// import {
//   useAdminEmergencyRequests,
//   useAdminAmbulances,
//   useAssignAmbulance,
// } from "@/hooks";

// import { getMessage } from "@/lib/utils";

// import type { AdminAmbulance, AdminEmergencyRequest } from "@/types";

// export default function EmergencyDispatchList() {
//   const [page, setPage] = useState(1);

//   const requestsQuery = useAdminEmergencyRequests(page);
//   const ambulancesQuery = useAdminAmbulances();
//   const assignMutation = useAssignAmbulance();

//   const requests = requestsQuery.data?.data.data ?? [];
//   const pagination = requestsQuery.data?.data.pagination;
//   const ambulances = ambulancesQuery.data?.data ?? [];

//   // console.log("requests", requests);
//   console.log("pagination", pagination);
//   // console.log("ambulances", ambulances);

//   const availableAmbulances = ambulances.filter(
//     (ambulance) =>
//       ambulance.status === "AVAILABLE" &&
//       ambulance.driver.isAvailable &&
//       ambulance.driver.applicationStatus === "APPROVED",
//   );

//   const handleAssign = (requestId: string, ambulanceId: string) => {
//     if (assignMutation.isPending) return;

//     const isAvailable = availableAmbulances.some(
//       (ambulance) => ambulance.id === ambulanceId,
//     );

//     if (!isAvailable) {
//       toast.error("Select an available ambulance.");
//       return;
//     }

//     assignMutation.mutate(
//       { requestId, ambulanceId },
//       {
//         onSuccess: () => {
//           toast.success("Ambulance assigned successfully.");
//         },
//         onError: (error) => {
//           toast.error(getMessage(error, "Could not assign ambulance."));
//         },
//       },
//     );
//   };

//   const isLoading = requestsQuery.isPending || ambulancesQuery.isPending;

//   const hasError = requestsQuery.isError || ambulancesQuery.isError;

//   return (
//     <section className="rounded-2xl border border-slate-200 bg-white p-6">
//       <h2 className="text-xl font-semibold text-slate-900">
//         Pending emergency requests
//       </h2>

//       <p className="mt-1 text-sm text-slate-500">
//         Oldest requests appear first.
//       </p>

//       {isLoading && (
//         <p className="mt-4 text-sm text-slate-500">
//           Loading requests and ambulances...
//         </p>
//       )}

//       {hasError && (
//         <div className="mt-4 text-sm text-red-600">
//           Could not load dispatch information.
//           <button
//             type="button"
//             onClick={() => {
//               void requestsQuery.refetch();
//               void ambulancesQuery.refetch();
//             }}
//             className="ml-2 underline"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {!isLoading && !hasError && (
//         <>
//           <p className="mt-4 text-sm text-slate-600">
//             Pending requests: {pagination?.total ?? 0}
//             {" · "}
//             Available ambulances: {availableAmbulances.length}
//           </p>

//           {requests.length === 0 && (
//             <p className="mt-4 text-sm text-slate-500">
//               No pending requests on this page.
//             </p>
//           )}

//           <div className="mt-5 space-y-4">
//             {requests.map((request) => (
//               <RequestCard
//                 key={request.id}
//                 request={request}
//                 ambulances={availableAmbulances}
//                 isAssigning={assignMutation.isPending}
//                 onAssign={handleAssign}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {(page > 1 || pagination?.hasNextPage) && (
//         <div className="mt-6 flex items-center justify-between">
//           <span className="text-sm text-slate-500">Page {page}</span>

//           <div className="flex gap-2">
//             <button
//               type="button"
//               disabled={page === 1 || requestsQuery.isFetching}
//               onClick={() => setPage(page - 1)}
//               className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
//             >
//               Previous
//             </button>

//             <button
//               type="button"
//               disabled={
//                 !pagination?.hasNextPage ||
//                 requestsQuery.isFetching ||
//                 requestsQuery.isError
//               }
//               onClick={() => setPage(page + 1)}
//               className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// type RequestCardProps = {
//   request: AdminEmergencyRequest;
//   ambulances: AdminAmbulance[];
//   isAssigning: boolean;
//   onAssign: (requestId: string, ambulanceId: string) => void;
// };

// function RequestCard({
//   request,
//   ambulances,
//   isAssigning,
//   onAssign,
// }: RequestCardProps) {
//   const [ambulanceId, setAmbulanceId] = useState("");

//   const selectedAmbulanceExists = ambulances.some(
//     (ambulance) => ambulance.id === ambulanceId,
//   );

//   return (
//     <div className="rounded-xl border border-slate-200 p-4">
//       <div className="flex flex-wrap justify-between gap-3">
//         <h3 className="font-semibold text-slate-900">
//           {request.emergencyType}
//         </h3>

//         <span className="text-sm font-semibold text-amber-700">
//           {request.priority}
//         </span>
//       </div>

//       <p className="mt-2 text-sm text-slate-700">
//         Patient: {request.patient.name}
//       </p>

//       <p className="break-all text-sm text-slate-500">
//         {request.patient.email}
//       </p>

//       <p className="mt-3 text-sm text-slate-700">
//         Pickup: {request.pickupLocation}
//       </p>

//       <p className="mt-1 text-sm text-slate-700">
//         Destination: {request.destination || "Not provided"}
//       </p>

//       <div className="mt-4 border-t border-slate-100 pt-4">
//         <label
//           htmlFor={`ambulance-${request.id}`}
//           className="mb-2 block text-sm font-medium text-slate-700"
//         >
//           Available ambulance
//         </label>

//         <div className="flex flex-col gap-3 sm:flex-row">
//           <select
//             id={`ambulance-${request.id}`}
//             value={selectedAmbulanceExists ? ambulanceId : ""}
//             onChange={(event) => setAmbulanceId(event.target.value)}
//             disabled={isAssigning || ambulances.length === 0}
//             className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm"
//           >
//             <option value="">
//               {ambulances.length === 0
//                 ? "No available ambulance"
//                 : "Select an ambulance"}
//             </option>

//             {ambulances.map((ambulance) => (
//               <option key={ambulance.id} value={ambulance.id}>
//                 {ambulance.vehicleNumber} · {ambulance.type} ·{" "}
//                 {ambulance.driver.user.name}
//               </option>
//             ))}
//           </select>

//           <button
//             type="button"
//             disabled={!selectedAmbulanceExists || isAssigning}
//             onClick={() => onAssign(request.id, ambulanceId)}
//             className="h-11 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
//           >
//             Assign ambulance
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  useAdminEmergencyRequests,
  useAdminAmbulances,
  useAssignAmbulance,
} from "@/hooks";

import { getMessage } from "@/lib/utils";

import type { AdminAmbulance, AdminEmergencyRequest } from "@/types";

// Main component with Suspense boundary
export default function EmergencyDispatchList() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">
            Loading emergency dispatch...
          </p>
        </div>
      }
    >
      <EmergencyDispatchContent />
    </Suspense>
  );
}

function EmergencyDispatchContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read current page from URL
  const rawPage = searchParams.get("dispatchPage");
  const parsedPage = Number(rawPage);

  const page =
    rawPage &&
    /^\d+$/.test(rawPage) &&
    Number.isSafeInteger(parsedPage) &&
    parsedPage >= 1 &&
    parsedPage <= 100000
      ? parsedPage
      : 1;

  // Backend API hooks
  const requestsQuery = useAdminEmergencyRequests(page);
  const ambulancesQuery = useAdminAmbulances();
  const assignMutation = useAssignAmbulance();

  const requests = requestsQuery.data?.data.data ?? [];
  const pagination = requestsQuery.data?.data.pagination;
  const ambulances = ambulancesQuery.data?.data ?? [];

  // Keep pagination in browser URL
  const updatePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > 100000 || nextPage === page) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (nextPage === 1) {
      params.delete("dispatchPage");
    } else {
      params.set("dispatchPage", String(nextPage));
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // Only show ambulances that can be dispatched
  const availableAmbulances = ambulances.filter(
    (ambulance) =>
      ambulance.status === "AVAILABLE" &&
      ambulance.driver.isAvailable &&
      ambulance.driver.applicationStatus === "APPROVED",
  );

  // Assign ambulance to emergency request
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
      {
        requestId,
        ambulanceId,
      },
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Pending emergency requests
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Oldest requests appear first.
          </p>
        </div>

        {requestsQuery.isFetching && !isLoading && (
          <span role="status" className="text-xs text-emerald-700">
            Refreshing...
          </span>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <p role="status" className="mt-4 text-sm text-slate-500">
          Loading requests and ambulances...
        </p>
      )}

      {/* Error */}
      {hasError && (
        <div
          role="alert"
          className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700"
        >
          <p>Could not load dispatch information.</p>

          <button
            type="button"
            onClick={() => {
              void requestsQuery.refetch();
              void ambulancesQuery.refetch();
            }}
            className="mt-2 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Requests */}
      {!isLoading && !hasError && (
        <>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
            <p>
              Pending requests: <strong>{pagination?.total ?? 0}</strong>
            </p>

            <p>
              Available ambulances:{" "}
              <strong>{availableAmbulances.length}</strong>
            </p>
          </div>

          {/* Empty state */}
          {requests.length === 0 && (
            <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">
                No pending requests on this page.
              </p>

              {page > 1 && (
                <button
                  type="button"
                  onClick={() => updatePage(1)}
                  className="mt-3 text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Return to first page
                </button>
              )}
            </div>
          )}

          {/* Request cards */}
          {requests.length > 0 && (
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
          )}

          {/* URL-based Pagination */}
          {(page > 1 || pagination?.hasNextPage) && (
            <nav
              aria-label="Pending requests pagination"
              className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5"
            >
              <span className="text-sm font-medium text-slate-600">
                Page {page}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page === 1 || requestsQuery.isFetching}
                  onClick={() => updatePage(page - 1)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={
                    !pagination?.hasNextPage ||
                    requestsQuery.isFetching ||
                    page >= 100000
                  }
                  onClick={() => updatePage(page + 1)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </section>
  );
}

// Individual request card types
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
      {/* Emergency summary */}
      <div className="flex flex-wrap justify-between gap-3">
        <h3 className="font-semibold text-slate-900">
          {request.emergencyType}
        </h3>

        <span className="text-sm font-semibold text-amber-700">
          {request.priority}
        </span>
      </div>

      {/* Patient */}
      <p className="mt-2 text-sm text-slate-700">
        Patient: {request.patient.name}
      </p>

      <p className="break-all text-sm text-slate-500">
        {request.patient.email}
      </p>

      {/* Locations */}
      <p className="mt-3 text-sm text-slate-700">
        Pickup: {request.pickupLocation}
      </p>

      <p className="mt-1 text-sm text-slate-700">
        Destination: {request.destination || "Not provided"}
      </p>

      {/* Ambulance selection */}
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
            className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-emerald-600 focus:outline-none"
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
            className="h-11 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAssigning ? "Assigning..." : "Assign ambulance"}
          </button>
        </div>

        {ambulances.length === 0 && (
          <p className="mt-2 text-xs text-amber-700">
            No approved driver with an available ambulance was found.
          </p>
        )}
      </div>
    </div>
  );
}
