"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  UserRound,
  Ambulance,
  LoaderCircle,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks";
import { getDashboardRoute, getMessage } from "@/lib/utils";
import { Role } from "@/types/enums";

const demoAccounts = [
  {
    role: Role.PATIENT,
    title: "Patient",
    icon: UserRound,
    email: process.env.NEXT_PUBLIC_DEMO_PATIENT_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_PATIENT_PASSWORD,
  },
  {
    role: Role.DRIVER,
    title: "Driver",
    icon: Ambulance,
    email: process.env.NEXT_PUBLIC_DEMO_DRIVER_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_DRIVER_PASSWORD,
  },
  {
    role: Role.ADMIN,
    title: "Admin",
    icon: ShieldCheck,
    email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD,
  },
];

type DemoAccount = (typeof demoAccounts)[number];

export default function HeroDemoLogin() {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  async function handleDemoLogin(account: DemoAccount) {
    if (isPending || selectedRole) return;

    if (!account.email?.trim() || !account.password) {
      toast.error(`${account.title} demo account is not configured yet.`);
      return;
    }

    setSelectedRole(account.role);

    try {
      const response = await login({
        email: account.email.trim(),
        password: account.password,
      });

      const actualRole = response?.data?.role as Role | undefined;

      if (!actualRole || !Object.values(Role).includes(actualRole)) {
        throw new Error("The login response did not contain a valid role.");
      }

      if (actualRole !== account.role) {
        toast.error("Demo account role mismatch. Check your demo credentials.");
      } else {
        toast.success(`${account.title} demo login successful.`);
      }

      router.replace(getDashboardRoute(actualRole));
    } catch (error) {
      toast.error(getMessage(error, "Demo login failed. Please try again."));
    } finally {
      setSelectedRole(null);
    }
  }

  return (
    <div className="mt-9 rounded-2xl border border-white/15 bg-white/[0.07] p-4 shadow-xl shadow-black/10 backdrop-blur-md sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">
            Explore live demo dashboards
          </p>

          <p className="mt-1 text-xs text-emerald-50/60">
            One-click access for each role
          </p>
        </div>

        <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-emerald-200">
          DEMO ACCESS
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {demoAccounts.map((account) => {
          const Icon = account.icon;

          const loading = selectedRole === account.role && isPending;

          return (
            <Button
              key={account.role}
              type="button"
              variant="outline"
              disabled={isPending || selectedRole !== null}
              onClick={() => void handleDemoLogin(account)}
              aria-label={`Sign in as demo ${account.title}`}
              className="group h-auto min-h-24 flex-col gap-2 rounded-xl border-white/15 bg-white/10 px-2 py-3 text-white shadow-none transition-all hover:-translate-y-0.5 hover:border-emerald-300/50 hover:bg-white/20 hover:text-white disabled:opacity-50 sm:min-h-25"
            >
              {loading ? (
                <LoaderCircle className="size-5 animate-spin text-emerald-200" />
              ) : (
                <Icon className="size-5 text-emerald-200" aria-hidden="true" />
              )}

              <span className="text-xs font-semibold sm:text-sm">
                {loading ? "Signing in..." : account.title}
              </span>

              {!loading && (
                <ArrowUpRight
                  className="size-3.5 opacity-60"
                  aria-hidden="true"
                />
              )}
            </Button>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] leading-5 text-emerald-50/55">
        Demo accounts are for evaluation. Never use private account credentials.
      </p>
    </div>
  );
}
