import apiClient from "@/lib/apiClient";
import { CreateEmergencyRequestPayload } from "@/types";

export const createEmergencyRequest = (
  payload: CreateEmergencyRequestPayload,
) => {
  return apiClient("/emergencyRequest/create", {
    method: "POST",
    body: payload,
  });
};
