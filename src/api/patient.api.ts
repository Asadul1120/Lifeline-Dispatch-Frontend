import apiClient from "@/lib/apiClient";
import type {
  CreatePaymentPayload,
  CreateEmergencyRequestPayload,
  EmergencyRequestFilters,
  UpdatePatientProfilePayload,
} from "@/types";

export const createEmergencyRequest = (
  payload: CreateEmergencyRequestPayload,
) => {
  return apiClient("/emergencyRequest/create", {
    method: "POST",
    body: payload,
  });
};

export const getMyEmergencyRequests = (filters?: EmergencyRequestFilters) => {
  return apiClient("/emergencyRequest/my", {
    method: "GET",
    query: filters,
  });
};

export const getEmergencyRequest = (requestId: string) => {
  return apiClient(`/emergencyRequest/${requestId}`, { method: "GET" });
};

export const cancelEmergencyRequest = (requestId: string) => {
  return apiClient(`/emergencyRequest/cancel/${requestId}`, {
    method: "PATCH",
  });
};

export const createPayment = (payload: CreatePaymentPayload) => {
  return apiClient("/payment/create", { method: "POST", body: payload });
};

export const getMyPayments = () => {
  return apiClient("/payment/my", { method: "GET" });
};

export const updatePatientProfile = (payload: UpdatePatientProfilePayload) => {
  const body = new FormData();
  body.append(
    "data",
    JSON.stringify({
      name: payload.name,
      patient: payload.patient,
    }),
  );

  if (payload.profileImage) {
    body.append("profileImage", payload.profileImage);
  }

  return apiClient("/user/me", {
    method: "PATCH",
    body,
  });
};
