import apiClient from "@/lib/apiClient";

import type {
  AdminResult,
  AdminPage,
  AdminUser,
  ManagedAmbulance,
  AmbulanceFormData,
  NewAmbulance,
  AdminRequestInfo,
  AdminAuditLog,
  AdminFilters,
  AdminDashboardSummary,
} from "@/types";

export const getAdminUsers = (filters: AdminFilters) => {
  return apiClient<AdminResult<AdminPage<AdminUser>>>("/admin/users", {
    query: filters,
  });
};

export const getAdminUser = (userId: string) => {
  return apiClient<AdminResult<AdminUser>>(`/admin/users/${userId}`);
};

export const changeUserStatus = (payload: {
  userId: string;
  status: string;
}) => {
  return apiClient(`/admin/users/status/${payload.userId}`, {
    method: "PATCH",
    body: { status: payload.status },
  });
};

export const getManagedAmbulances = () => {
  return apiClient<AdminResult<ManagedAmbulance[]>>("/ambulance");
};

export const getManagedAmbulance = (ambulanceId: string) => {
  return apiClient<AdminResult<ManagedAmbulance>>(`/ambulance/${ambulanceId}`);
};

export const createAdminAmbulance = (payload: NewAmbulance) => {
  return apiClient("/ambulance/create", {
    method: "POST",
    body: payload,
  });
};

export const updateAdminAmbulance = (payload: {
  ambulanceId: string;
  data: AmbulanceFormData;
}) => {
  return apiClient(`/ambulance/${payload.ambulanceId}`, {
    method: "PATCH",
    body: payload.data,
  });
};

export const changeAmbulanceStatus = (payload: {
  ambulanceId: string;
  status: string;
}) => {
  return apiClient(`/ambulance/status/${payload.ambulanceId}`, {
    method: "PATCH",
    body: { status: payload.status },
  });
};

export const getAllAdminRequests = (filters: AdminFilters) => {
  return apiClient<AdminResult<AdminPage<AdminRequestInfo>>>(
    "/admin/emergency-requests",
    { query: filters },
  );
};

export const getAdminRequestDetails = (requestId: string) => {
  return apiClient<AdminResult<AdminRequestInfo>>(
    `/admin/emergency-requests/${requestId}`,
  );
};

export const getAdminAuditLogs = (filters: AdminFilters, userId?: string) => {
  const url = userId ? `/audit-log/user/${userId}` : "/audit-log";

  return apiClient<AdminResult<AdminPage<AdminAuditLog>>>(url, {
    query: filters,
  });
};

export const getAdminDashboardSummary = () => {
  return apiClient<AdminResult<AdminDashboardSummary>>("/admin/dashboard", {
    method: "GET",
  });
};
