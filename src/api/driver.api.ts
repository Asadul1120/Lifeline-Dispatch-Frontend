import apiClient from "@/lib/apiClient";
import type {
  DriverApplyPayload,
  UpdateDriverProfilePayload,
  UserProfileResponse,
  VerifyEmailPayload,
} from "@/types";

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

export const updateDriverProfile = (payload: UpdateDriverProfilePayload) => {
  const body = new FormData();

  body.append(
    "data",
    JSON.stringify({
      name: payload.name,
      driver: payload.driver,
    }),
  );

  if (payload.profileImage) {
    body.append("profileImage", payload.profileImage);
  }

  return apiClient<UserProfileResponse>("/user/me", {
    method: "PATCH",
    body,
  });
};
