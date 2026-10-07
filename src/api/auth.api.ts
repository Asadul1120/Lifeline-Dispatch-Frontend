import apiClient from "@/lib/apiClient";
import { RegisterPayload, VerifyEmailPayload, LoginPayload } from "@/types";

export const userRegister = (payload: RegisterPayload) => {
  return apiClient("/auth/register", { method: "POST", body: payload });
};

export const emailVerification = (payload: VerifyEmailPayload) => {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
};

export const userLogin = (payload: LoginPayload) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};

export const googleOAuth = (payload: { idToken: string }) => {
  return apiClient("/auth/google", { method: "POST", body: payload });
};

export const userLogout = () => {
  return apiClient("/auth/logout", { method: "POST" });
};

export const getMe = () => {
  return apiClient("/user/me" , { method: "GET" });
};
