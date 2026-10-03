import { Role } from "@/types";

export { cn } from "cn";


export type MessageSource = {
  message?: unknown;
  data?: {
    message?: unknown;
  } | null;
  response?: {
    data?: {
      message?: unknown;
    } | null;
  } | null;
};

export function getMessage(value: unknown, fallback: string): string {
  if (typeof value === "string") {
    return value.trim() ? value : fallback;
  }
  const source = value as MessageSource | null | undefined;
  const message =
    source?.response?.data?.message ?? source?.data?.message ?? source?.message;

  return typeof message === "string" && message.trim() ? message : fallback;
}





export function getDashboardRoute(role: Role): string {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin";
    case "DRIVER":
      return "/dashboard/driver";
    default:
      return "/dashboard/patient";
  }
}
