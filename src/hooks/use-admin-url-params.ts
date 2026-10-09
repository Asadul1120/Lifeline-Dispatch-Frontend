"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Changes = Record<string, string | number | null | undefined>;

export function useAdminUrlParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParams(changes: Changes) {
    const next = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(changes)) {
      const normalized = String(value ?? "").trim();

      if (normalized) {
        next.set(key, normalized);
      } else {
        next.delete(key);
      }
    }

    const query = next.toString();

    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return { searchParams, updateParams };
}

export function positivePage(raw: string | null) {
  if (!raw || !/^\d+$/.test(raw)) return 1;

  const value = Number(raw);

  return Number.isSafeInteger(value) && value > 0 && value <= 100000
    ? value
    : 1;
}

export function validChoice(
  raw: string | null,
  options: readonly string[],
  fallback = "",
) {
  return raw && options.includes(raw) ? raw : fallback;
}
