"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  HeartPulse,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetMe, useLogout } from "@/hooks";
import { getMessage } from "@/lib/utils";

const routes = [
  { name: "Home", url: "/" },
  { name: "About us", url: "/about-us" },
];

type HeaderUser = {
  name: string;
  email: string;
};

function getHeaderUser(value: unknown): HeaderUser | null {
  if (!value || typeof value !== "object") return null;

  const record = value as Record<string, unknown>;

  if (typeof record.name === "string" && typeof record.email === "string") {
    return {
      name: record.name,
      email: record.email,
    };
  }

  return getHeaderUser(record.data) ?? getHeaderUser(record.user);
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHandlingLogout, setIsHandlingLogout] = useState(false);

  const { data, isLoading } = useGetMe();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  const user = getHeaderUser(data);
  const isBusy = isLoggingOut || isHandlingLogout;

  const handleLogout = async () => {
    if (isBusy) return;

    setIsHandlingLogout(true);

    try {
      const response = await logout();

      // Prevent an older user request from restoring cached user data.
      await queryClient.cancelQueries({
        queryKey: ["user"],
        exact: true,
      });

      // Immediately update components using this query.
      queryClient.setQueryData(["user"], null);

      setIsMenuOpen(false);

      toast.success(getMessage(response, "Logout successful."));

      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(getMessage(error, "Logout failed. Please try again."));
    } finally {
      setIsHandlingLogout(false);
    }
  };

  const authActions = isLoading ? (
    <div
      role="status"
      className="flex h-10 w-full items-center justify-center md:w-24"
    >
      <Spinner className="size-5 text-emerald-700" />
      <span className="sr-only">Loading account…</span>
    </div>
  ) : user ? (
    <>
      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 md:hidden lg:flex">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <UserRound aria-hidden="true" className="size-4" />
        </span>

        <span className="truncate text-sm font-medium text-slate-700 lg:max-w-32">
          {user.name || "Account"}
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={isBusy}
        aria-busy={isBusy}
        onClick={() => void handleLogout()}
        className="h-10 w-full rounded-xl border-slate-200 px-4 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 md:w-auto"
      >
        {isBusy ? (
          <Spinner className="size-4" />
        ) : (
          <LogOut aria-hidden="true" className="size-4" />
        )}

        {isBusy ? "Leaving…" : "Logout"}
      </Button>
    </>
  ) : (
    <Button
      render={<Link href="/login" onClick={() => setIsMenuOpen(false)} />}
      nativeButton={false}
      className="h-10 w-full rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:ring-emerald-500/30 md:w-auto"
    >
      Sign in
      <ArrowRight aria-hidden="true" className="size-4" />
    </Button>
  );

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setIsMenuOpen(false);
        }
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Lifeline Dispatch home"
          className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm transition-colors group-hover:bg-emerald-800">
            <HeartPulse aria-hidden="true" className="size-6" />
          </span>

          <span className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-tight text-slate-900">
              Lifeline
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Dispatch
            </span>
          </span>
        </Link>

        <nav
          id="header-navigation"
          aria-label="Main navigation"
          className={`absolute inset-x-0 top-full border-b border-slate-200 bg-white p-4 shadow-sm md:static md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <ul className="flex flex-col gap-1 rounded-2xl bg-slate-50 p-1.5 md:flex-row md:items-center md:rounded-full">
            {routes.map((route) => {
              const isActive = pathname === route.url;

              return (
                <li key={route.url}>
                  <Link
                    href={route.url}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-xl px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 md:rounded-full ${
                      isActive
                        ? "bg-white text-emerald-700 shadow-sm"
                        : "text-slate-600 hover:bg-white hover:text-emerald-700"
                    }`}
                  >
                    {route.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 md:hidden">
            {authActions}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {authActions}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="header-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="size-10 shrink-0 rounded-xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 md:hidden"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
