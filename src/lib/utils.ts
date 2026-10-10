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

export function getSafeDashboardRedirect(
  role: Role,
  requested: string | null,
): string {
  const dashboard = getDashboardRoute(role);

  if (
    !requested ||
    !requested.startsWith("/") ||
    requested.startsWith("//") ||
    requested.includes("\\")
  ) {
    return dashboard;
  }

  try {
    const base = "https://lifeline-dispatch-fontend.netlify.app";
    const url = new URL(requested, base);

    if (url.origin !== base) {
      return dashboard;
    }

    const allowed =
      url.pathname === dashboard || url.pathname.startsWith(`${dashboard}/`);

    if (!allowed) {
      return dashboard;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return dashboard;
  }
}
