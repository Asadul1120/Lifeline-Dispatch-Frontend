import apiClient from "@/lib/apiClient";
import { DriverApplyPayload, VerifyEmailPayload } from "@/types";

export const applyAsDriver = (payload: DriverApplyPayload) => {
  return apiClient("/driver/apply", {
    method: "POST",
    body: payload,
  });
};

export const verifyDriverEmail = (payload: VerifyEmailPayload) => {
  return apiClient("/driver/driver-verify", {
    method: "POST",
    body: payload,
  });
};
