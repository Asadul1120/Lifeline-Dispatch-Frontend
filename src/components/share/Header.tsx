"use client";

import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
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
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

import { Spinner } from "@/components/ui/spinner";
import { useGetMe, useLogout } from "@/hooks";
import { getDashboardRoute } from "@/lib/utils";

const routes = [
  { name: "Home", url: "/" },
  { name: "About us", url: "/about-us" },
  { name: "Contact", url: "/contact" },
  { name: "Apply Driver", url: "/driver-apply" },
  { name: "Register", url: "/register" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const accountButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const previousPathname = useRef(pathname);
  const drawerId = useId();
  const drawerTitleId = useId();
  const accountDropdownId = useId();

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const user = data?.data;
  const dashboardUrl = user?.role ? getDashboardRoute(user.role) : "/login";
  const profileUrl =
    user?.role === "PATIENT" || user?.role === "DRIVER"
      ? `${dashboardUrl}/profile`
      : null;
  const initial = user?.name?.trim().charAt(0).toUpperCase() || "U";

  const isActiveRoute = (url: string) =>
    url === "/"
      ? pathname === "/"
      : pathname === url || pathname?.startsWith(`${url}/`);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setIsMenuOpen(false);
      setIsAccountOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isAccountOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAccountOpen(false);
        accountButtonRef.current?.focus();
      }
    };

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => {
      if (!desktopQuery.matches) setIsAccountOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleResize);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleResize);
    };
  }, [isAccountOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawer.showModal();

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setIsMenuOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    closeOnDesktop();

    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
      drawer.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-lg">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Lifeline Dispatch home"
          className="group flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm transition-colors group-hover:bg-emerald-800 sm:h-11 sm:w-11">
            <HeartPulse size={22} aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Lifeline
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">
              Dispatch
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <ul className="flex items-center gap-1 rounded-full bg-slate-50 p-1.5">
            {routes.map((route) => {
              const active = isActiveRoute(route.url);

              return (
                <li key={route.url}>
                  <Link
                    href={route.url}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      active
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
        </nav>

        {/* Desktop account */}
        <div className="hidden shrink-0 lg:block">
          {isLoading ? (
            <div
              role="status"
              className="flex h-10 w-24 items-center justify-center"
            >
              <Spinner className="size-5 text-emerald-700" />
              <span className="sr-only">Loading account…</span>
            </div>
          ) : user ? (
            <div
              ref={accountRef}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsAccountOpen(false);
                }
              }}
              className="relative"
            >
              <button
                ref={accountButtonRef}
                type="button"
                onClick={() => setIsAccountOpen((current) => !current)}
                aria-label="Account options"
                aria-expanded={isAccountOpen}
                aria-controls={isAccountOpen ? accountDropdownId : undefined}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pr-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-700 text-sm font-bold text-white">
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt=""
                      width={36}
                      height={36}
                      unoptimized
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    initial
                  )}
                </span>
                <span className="hidden max-w-[7rem] text-left xl:block">
                  <span className="block truncate text-sm font-semibold text-slate-900">
                    {user.name || "Account"}
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    {user.role}
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`text-slate-500 transition-transform ${
                    isAccountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAccountOpen && (
                <div
                  id={accountDropdownId}
                  className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                >
                  <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                    <p className="truncate font-semibold text-slate-900">
                      {user.name || "Account"}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                      {user.role}
                    </span>
                  </div>
                  <div className="p-2">
                    {profileUrl && (
                      <Link
                        href={profileUrl}
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        <UserRound size={18} aria-hidden="true" /> My Profile
                      </Link>
                    )}
                    <Link
                      href={dashboardUrl}
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <LayoutDashboard size={18} aria-hidden="true" /> My
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      disabled={isLoggingOut}
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <Spinner className="size-4" />
                      ) : (
                        <LogOut size={18} aria-hidden="true" />
                      )}
                      {isLoggingOut ? "Leaving…" : "Logout"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Sign in <ArrowRight size={17} aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls={isMenuOpen ? drawerId : undefined}
          aria-haspopup="dialog"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 lg:hidden"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile drawer */}
      {isMenuOpen &&
        createPortal(
          <>
            <style>{`
              @keyframes lifeline-drawer-in {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
              .lifeline-mobile-drawer[open] {
                animation: lifeline-drawer-in 250ms ease-out;
              }
              @media (prefers-reduced-motion: reduce) {
                .lifeline-mobile-drawer[open] { animation: none; }
              }
            `}</style>
            <dialog
              ref={drawerRef}
              id={drawerId}
              aria-labelledby={drawerTitleId}
              onCancel={(event) => {
                event.preventDefault();
                setIsMenuOpen(false);
              }}
              onClick={(event) => {
                if (event.target === event.currentTarget) setIsMenuOpen(false);
              }}
              className="lifeline-mobile-drawer fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-80 max-w-[88vw] border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
            >
              <div className="flex h-full flex-col">
                <div className="flex min-h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5">
                  <div>
                    <h2
                      id={drawerTitleId}
                      className="text-lg font-bold text-slate-900"
                    >
                      Lifeline
                    </h2>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                      Dispatch
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <X size={21} aria-hidden="true" />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
                  {!isLoading && user && (
                    <div className="border-b border-slate-100 p-4">
                      <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-700 font-bold text-white">
                          {user.imageUrl ? (
                            <Image
                              src={user.imageUrl}
                              alt=""
                              width={44}
                              height={44}
                              unoptimized
                              className="h-11 w-11 rounded-full object-cover"
                            />
                          ) : (
                            initial
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {user.name || "Account"}
                          </p>
                          <p className="mt-1 truncate text-xs font-semibold text-emerald-700">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <nav aria-label="Mobile navigation" className="p-4">
                    <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Navigation
                    </p>
                    <ul className="space-y-1">
                      {routes.map((route) => {
                        const active = isActiveRoute(route.url);
                        return (
                          <li key={route.url}>
                            <Link
                              href={route.url}
                              onClick={() => setIsMenuOpen(false)}
                              aria-current={active ? "page" : undefined}
                              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                                active
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              {route.name}
                              <ChevronRight size={17} aria-hidden="true" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>

                  <div className="border-t border-slate-100 p-4">
                    {isLoading ? (
                      <div
                        role="status"
                        className="flex items-center justify-center py-4"
                      >
                        <Spinner className="size-5 text-emerald-700" />
                        <span className="sr-only">Loading account…</span>
                      </div>
                    ) : user ? (
                      <div className="space-y-2">
                        {profileUrl && (
                          <Link
                            href={profileUrl}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                          >
                            <UserRound size={18} aria-hidden="true" /> My
                            Profile
                          </Link>
                        )}
                        <Link
                          href={dashboardUrl}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >
                          <LayoutDashboard size={18} aria-hidden="true" /> My
                          Dashboard
                        </Link>
                        <button
                          type="button"
                          disabled={isLoggingOut}
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isLoggingOut ? (
                            <Spinner className="size-4" />
                          ) : (
                            <LogOut size={18} aria-hidden="true" />
                          )}
                          {isLoggingOut ? "Leaving…" : "Logout"}
                        </button>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      >
                        Sign in <ArrowRight size={18} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </dialog>
          </>,
          document.body,
        )}
    </header>
  );
}
