"use client";

import Link from "next/link";
import {
  Activity,
  Ambulance,
  ArrowUpRight,
  Clock3,
  RefreshCw,
  Users,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AdminPage,
  AdminPanel,
  EmptyState,
  QueryMessage,
  StatusBadge,
} from "./admin-shared";
import { useAdminDashboardSummary } from "@/hooks";

export default function AdminDashboard() {
  const query = useAdminDashboardSummary();
  const data = query.data?.data;

  if (!query.isSuccess || !data) {
    return (
      <AdminPage title="Operations overview">
        <QueryMessage
          loading={query.isPending}
          error={query.error}
          retry={() => void query.refetch()}
        />
      </AdminPage>
    );
  }

  const statistics = [
    {
      title: "Registered users",
      value: data.users.total.toLocaleString(),
      description: "Across all account roles",
      icon: Users,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Waiting for dispatch",
      value: data.requests.pending.toLocaleString(),
      description: "Pending emergency requests",
      icon: Clock3,
      color: "bg-amber-50 text-amber-700",
    },
    {
      title: "Available fleet",
      value: `${data.fleet.available} / ${data.fleet.total}`,
      description: "Vehicles marked available",
      icon: Ambulance,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Paid amount",
      value: `৳${Number(data.payments.paidAmount).toLocaleString("en-BD", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      description: "Recorded paid payments · all time",
      icon: Wallet,
      color: "bg-violet-50 text-violet-700",
    },
  ];

  const sections = [
    {
      title: "Accounts",
      href: "/dashboard/admin/users",
      rows: [
        { label: "Patients", value: data.users.patients },
        { label: "Drivers", value: data.users.drivers },
        { label: "Admins", value: data.users.admins },
        { label: "Suspended", value: data.users.suspended },
        { label: "Banned", value: data.users.banned },
      ],
    },
    {
      title: "Driver applications",
      href: "/dashboard/admin/drivers",
      rows: [
        { label: "Pending review", value: data.applications.pending },
        { label: "Approved", value: data.applications.approved },
        { label: "Rejected", value: data.applications.rejected },
      ],
    },
    {
      title: "Emergency requests",
      href: "/dashboard/admin/emergency-requests",
      rows: [
        { label: "Total", value: data.requests.total },
        { label: "Pending", value: data.requests.pending },
        { label: "Active", value: data.requests.active },
        { label: "Completed", value: data.requests.completed },
        { label: "Cancelled", value: data.requests.cancelled },
      ],
    },
    {
      title: "Fleet status",
      href: "/dashboard/admin/ambulances",
      rows: [
        { label: "Total vehicles", value: data.fleet.total },
        { label: "Available", value: data.fleet.available },
        { label: "Busy", value: data.fleet.busy },
        { label: "Maintenance", value: data.fleet.maintenance },
      ],
    },
    {
      title: "Trip progress",
      href: "/dashboard/admin/emergency-requests",
      rows: [
        { label: "Total trips", value: data.trips.total },
        { label: "Active", value: data.trips.active },
        { label: "Completed", value: data.trips.completed },
        { label: "Cancelled", value: data.trips.cancelled },
      ],
    },
    {
      title: "Payment records",
      href: "/dashboard/admin/emergency-requests",
      rows: [
        { label: "Total records", value: data.payments.total },
        { label: "Paid", value: data.payments.paid },
        { label: "Pending", value: data.payments.pending },
        { label: "Failed", value: data.payments.failed },
      ],
    },
  ];

  return (
    <AdminPage
      title="Operations overview"
      description={`All-time summary · Updated ${new Date(
        data.generatedAt,
      ).toLocaleTimeString("en-BD")}`}
      action={
        <Button
          type="button"
          variant="outline"
          disabled={query.isFetching}
          onClick={() => void query.refetch()}
          className="h-10 gap-2 rounded-xl px-4"
        >
          <RefreshCw
            className={`size-4 ${query.isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => (
          <AdminPanel key={item.title}>
            <div className="flex items-start justify-between gap-3 pt-1">
              <p className="text-sm font-medium text-slate-500">{item.title}</p>
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
              >
                <item.icon className="size-5" />
              </span>
            </div>
            <div>
              <p className="wrap-break-word text-3xl font-bold tracking-tight text-slate-900">
                {item.value}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {item.description}
              </p>
            </div>
          </AdminPanel>
        ))}
      </div>

      {(data.requests.pending > 0 || data.applications.pending > 0) && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-center gap-3">
            <Activity className="size-5 text-amber-700" />
            <p className="text-sm text-amber-900">
              {data.requests.pending} requests awaiting dispatch
              {" · "}
              {data.applications.pending} driver applications awaiting review
            </p>
          </div>

          <Link
            href="/dashboard/admin/emergency-requests"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-900"
          >
            Open dispatch
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <AdminPanel
            key={section.title}
            title={section.title}
            action={
              <Link
                href={section.href}
                aria-label={`Open ${section.title}`}
                className="rounded-lg p-1 text-slate-400 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <ArrowUpRight className="size-5" />
              </Link>
            }
          >
            <div className="divide-y divide-slate-100">
              {section.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <span className="text-sm text-slate-500">{row.label}</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {row.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </AdminPanel>
        ))}
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[1.5fr_1fr]">
        <AdminPanel
          title="Recent requests"
          action={
            <Link
              href="/dashboard/admin/emergency-requests"
              className="text-xs font-semibold text-emerald-700"
            >
              View all
            </Link>
          }
        >
          {data.recentRequests.length === 0 ? (
            <EmptyState message="No emergency requests yet." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient / emergency</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="py-4">
                      <Link
                        href={`/dashboard/admin/emergency-requests/${request.id}`}
                        className="font-semibold text-slate-800 hover:text-emerald-700"
                      >
                        {request.patient.name}
                      </Link>
                      <p className="mt-1 text-xs text-slate-500">
                        {request.emergencyType}
                      </p>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.priority} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </AdminPanel>

        <AdminPanel
          title="Recent activity"
          action={
            <Link
              href="/dashboard/admin/audit-logs"
              className="text-xs font-semibold text-emerald-700"
            >
              View all
            </Link>
          }
        >
          {data.recentActivity.length === 0 ? (
            <EmptyState message="No activity has been recorded." />
          ) : (
            <div className="divide-y divide-slate-100">
              {data.recentActivity.map((item) => (
                <div key={item.id} className="flex gap-3 py-4 first:pt-0">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {item.action.replaceAll("_", " ")}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.user.name} · {item.entity}
                    </p>
                    <p className="mt-2 text-[11px] text-slate-400">
                      {new Date(item.createdAt).toLocaleString("en-BD")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminPanel>
      </div>
    </AdminPage>
  );
}
