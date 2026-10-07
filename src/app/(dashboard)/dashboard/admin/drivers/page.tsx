import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PendingDriverList from "@/components/modules/admin/pending-driver-list";

export default function AdminDriversPage() {
  return (
    <main className="min-h-screen bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard/admin"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Link>

        <div className="mb-8 mt-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Driver applications
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Review each driver's details before approving their application.
          </p>
        </div>

        <PendingDriverList />
      </div>
    </main>
  );
}
