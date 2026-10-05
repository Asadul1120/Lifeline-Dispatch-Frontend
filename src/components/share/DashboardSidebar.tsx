"use client";

import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  CreditCard,
  HeartPulse,
  House,
  LayoutDashboard,
  LogOut,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useLogout } from "@/hooks";
import { getMessage } from "@/lib/utils";
import type { Role } from "@/types";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

const navigation: Record<Role, NavItem[]> = {
  PATIENT: [
    {
      label: "Dashboard",
      href: "/dashboard/patient",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Request ambulance",
      href: "/dashboard/patient/emergency-request",
      icon: Ambulance,
    },
    {
      label: "Payments",
      href: "/dashboard/patient/payments",
      icon: CreditCard,
    },
    {
      label: "My profile",
      href: "/dashboard/patient/profile",
      icon: UserRound,
    },
  ],
  DRIVER: [
    {
      label: "Dashboard",
      href: "/dashboard/driver",
      icon: LayoutDashboard,
    },
  ],
  ADMIN: [
    {
      label: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
  ],
};

type DashboardSidebarProps = {
  role: Role;
  name: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function DashboardSidebar({
  role,
  name,
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    if (isLoggingOut) return;

    logout(undefined, {
      onSuccess: () => {
        onClose();
        toast.success("You have been logged out.");
        router.replace("/login");
      },
      onError: (error) => {
        toast.error(getMessage(error, "Logout failed. Please try again."));
      },
    });
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      <aside
        id="dashboard-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-slate-200 bg-white shadow-xl lg:sticky lg:top-0 lg:flex lg:h-svh lg:shrink-0 lg:shadow-none ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <HeartPulse aria-hidden="true" className="size-6" />
            </span>
            <span>
              <span className="block text-lg font-bold leading-tight text-slate-900">
                Lifeline
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Dispatch
              </span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav
          aria-label="Dashboard navigation"
          className="flex-1 overflow-y-auto px-3 py-6"
        >
          <p className="px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Menu
          </p>

          <ul className="mt-3 space-y-1">
            {navigation[role].map(({ label, href, icon: Icon, exact }) => {
              const isActive = exact
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-1 border-t border-slate-100 p-3">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <House aria-hidden="true" className="size-5" />
            Back to website
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <LogOut aria-hidden="true" className="size-5" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>

          <div className="border-t border-slate-100 px-3 pt-4">
            <p className="truncate text-sm font-semibold text-slate-800">
              {name}
            </p>
            <p className="text-xs capitalize text-slate-500">
              {role.toLowerCase()}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
