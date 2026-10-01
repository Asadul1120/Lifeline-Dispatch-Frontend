export { cn } from "cn";
import type { MessageSource } from "@/types/api";

export function getMessage(value: unknown, fallback: string): string {
  if (typeof value === "string") {
    return value.trim() ? value : fallback;
  }
  const source = value as MessageSource | null | undefined;
  const message =
    source?.response?.data?.message ?? source?.data?.message ?? source?.message;

  return typeof message === "string" && message.trim() ? message : fallback;
}
