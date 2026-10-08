"use client";

import {
  ArrowRight,
  ChevronDown,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetMe, useLogout } from "@/hooks";
import { getDashboardRoute } from "@/lib/utils";

const routes = [
  { name: "Home", url: "/" },
  { name: "About us", url: "/about-us" },
];

export default function Header() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetMe();

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const user = data?.data;

  const dashboardUrl = user?.role ? getDashboardRoute(user.role) : "/login";

  const profileUrl =
    user?.role === "PATIENT" || user?.role === "DRIVER"
      ? `${dashboardUrl}/profile`
      : null;

  useEffect(() => {
    if (!isAccountOpen && !isMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        isAccountOpen &&
        !accountRef.current?.contains(event.target as Node)
      ) {
        setIsAccountOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAccountOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAccountOpen, isMenuOpen]);

  const handleLogout = () => {
    if (isLoggingOut) return;

    logout(undefined, {
      onSuccess: (res) => {
        setIsMenuOpen(false);
        setIsAccountOpen(false);

        toast.success(res?.message || "You have been logged out successfully.");
      },

      onError: (err) => {
        toast.error(
          err?.message ||
            "An error occurred while logging out. Please try again.",
        );
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
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

        {/* Navigation */}
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

          {/* Mobile account options */}
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4 md:hidden">
            {isLoading ? (
              <Spinner className="mx-auto size-5 text-emerald-700" />
            ) : user ? (
              <>
                <p className="px-3 py-2 text-sm font-semibold text-slate-800">
                  {user.name || "Account"}
                </p>

                <Link
                  href={dashboardUrl}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Dashboard
                </Link>

                {profileUrl && (
                  <Link
                    href={profileUrl}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Profile
                  </Link>
                )}

                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="mt-1 w-full rounded-xl"
                >
                  <LogOut aria-hidden="true" className="size-4" />

                  {isLoggingOut ? "Leaving…" : "Logout"}
                </Button>
              </>
            ) : (
              <Button
                render={
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} />
                }
                nativeButton={false}
                className="w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-800"
              >
                Sign in
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            )}
          </div>
        </nav>

        {/* Desktop account dropdown */}
        <div className="hidden shrink-0 md:flex">
          {isLoading ? (
            <output className="flex h-10 w-24 items-center justify-center">
              <Spinner className="size-5 text-emerald-700" />
              <span className="sr-only">Loading account…</span>
            </output>
          ) : user ? (
            <div ref={accountRef} className="relative">
              <button
                type="button"
                aria-expanded={isAccountOpen}
                aria-controls="account-dropdown"
                onClick={() => setIsAccountOpen((current) => !current)}
                className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt=""
                      width={32}
                      height={32}
                      unoptimized
                      className="size-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserRound aria-hidden="true" className="size-4" />
                  )}
                </span>

                <span className="max-w-32 truncate">
                  {user.name || "Account"}
                </span>

                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 transition-transform ${
                    isAccountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAccountOpen && (
                <div
                  id="account-dropdown"
                  className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
                >
                  <p className="truncate border-b border-slate-100 px-3 py-2 text-sm font-semibold text-slate-900">
                    {user.name || "Account"}
                  </p>

                  <Link
                    href={dashboardUrl}
                    onClick={() => setIsAccountOpen(false)}
                    className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <LayoutDashboard aria-hidden="true" className="size-4" />
                    Dashboard
                  </Link>

                  {profileUrl && (
                    <Link
                      href={profileUrl}
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <UserRound aria-hidden="true" className="size-4" />
                      Profile
                    </Link>
                  )}

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    disabled={isLoggingOut}
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut aria-hidden="true" className="size-4" />

                    {isLoggingOut ? "Leaving…" : "Logout"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              render={<Link href="/login" />}
              nativeButton={false}
              className="h-10 rounded-xl bg-emerald-700 px-5 text-white hover:bg-emerald-800"
            >
              Sign in
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
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
