"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLogin } from "@/hooks/auth.hook";
import { getDashboardRoute, getMessage } from "@/lib/utils";
import { Role } from "@/types/enums";

type DemoAccount = {
  role: Role;
  label: string;
  email?: string;
  password?: string;
};

const demoAccounts: DemoAccount[] = [
  {
    role: Role.PATIENT,
    label: "Patient",
    email: process.env.NEXT_PUBLIC_DEMO_PATIENT_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_PATIENT_PASSWORD,
  },
  {
    role: Role.DRIVER,
    label: "Driver",
    email: process.env.NEXT_PUBLIC_DEMO_DRIVER_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_DRIVER_PASSWORD,
  },
  {
    role: Role.ADMIN,
    label: "Admin",
    email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD,
  },
];

export default function DemoLoginButtons() {
  const router = useRouter();
  const { mutateAsync: login } = useLogin();

  const [loadingRole, setLoadingRole] = useState<Role | null>(null);

  const handleDemoLogin = async (account: DemoAccount) => {
    if (loadingRole) return;

    if (!account.email || !account.password) {
      toast.error("Demo account is not configured.");
      return;
    }

    setLoadingRole(account.role);

    try {
      const response = await login({
        email: account.email,
        password: account.password,
      });

      const loggedInRole = response?.data?.role;

      if (!loggedInRole) {
        toast.error("Login response did not include a role.");
        return;
      }

      if (loggedInRole !== account.role) {
        toast.error("Demo account role does not match.");
        router.replace(getDashboardRoute(loggedInRole));
        return;
      }

      toast.success(getMessage(response, `${account.label} login successful.`));

      router.replace(getDashboardRoute(loggedInRole));
    } catch (error) {
      toast.error(getMessage(error, "Demo login failed. Try again."));
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <div className="mt-6 border-t border-slate-200 pt-6">
      <p className="mb-4 text-center text-sm font-semibold text-slate-700">
        Quick Demo Login
      </p>

      <div className="grid grid-cols-3 gap-2">
        {demoAccounts.map((account) => (
          <button
            key={account.role}
            type="button"
            disabled={loadingRole !== null}
            onClick={() => void handleDemoLogin(account)}
            className="rounded-lg bg-emerald-700 px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingRole === account.role ? "Logging in..." : account.label}
          </button>
        ))}
      </div>
    </div>
  );
}
