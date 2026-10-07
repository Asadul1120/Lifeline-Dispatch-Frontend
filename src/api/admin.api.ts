import apiClient from "@/lib/apiClient";

import type {
  PendingDriver,
  AdminAmbulance,
  AdminEmergencyRequestList,
  AssignAmbulancePayload,
} from "@/types";

export const getPendingDrivers = () => {
  return apiClient<{ data: PendingDriver[] }>("/admin/drivers/pending", {
    method: "GET",
  });
};

export const approveDriver = (driverId: string) => {
  return apiClient(`/admin/drivers/approve/${driverId}`, {
    method: "PATCH",
  });
};

export const rejectDriver = (driverId: string) => {
  return apiClient(`/admin/drivers/reject/${driverId}`, {
    method: "PATCH",
  });
};

export const getAdminEmergencyRequests = (page: number) => {
  return apiClient<{ data: AdminEmergencyRequestList }>(
    "/admin/emergency-requests",
    {
      method: "GET",
      query: {
        status: "PENDING",
        page,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "asc",
      },
    },
  );
};

export const getAdminAmbulances = () => {
  return apiClient<{ data: AdminAmbulance[] }>("/ambulance", {
    method: "GET",
  });
};

export const assignAmbulanceToRequest = (payload: AssignAmbulancePayload) => {
  return apiClient(`/admin/emergency-requests/assign/${payload.requestId}`, {
    method: "PATCH",
    body: {
      ambulanceId: payload.ambulanceId,
    },
  });
};
