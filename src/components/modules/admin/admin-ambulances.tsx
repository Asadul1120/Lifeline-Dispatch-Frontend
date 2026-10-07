"use client";

import { useState } from "react";
import { Ambulance, CircleCheck, Wrench } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useManagedAmbulances } from "@/hooks/admin-management.hook";

import {
  AdminPage,
  AdminPanel,
  EmptyState,
  QueryMessage,
  StatusBadge,
} from "./admin-shared";

import {
  CreateAmbulanceDialog,
  AmbulanceDetailsDialog,
} from "./ambulance-dialogs";

export default function AdminAmbulances() {
  const query = useManagedAmbulances();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const ambulances = query.data?.data ?? [];

  const filteredAmbulances = ambulances.filter((ambulance) => {
    const text =
      `${ambulance.vehicleNumber} ${ambulance.driver.user.name}`.toLowerCase();

    return (
      text.includes(search.trim().toLowerCase()) &&
      (!status || ambulance.status === status)
    );
  });

  const summaries = [
    {
      title: "Total fleet",
      value: ambulances.length,
      icon: Ambulance,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Available vehicles",
      value: ambulances.filter((item) => item.status === "AVAILABLE").length,
      icon: CircleCheck,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "In maintenance",
      value: ambulances.filter((item) => item.status === "MAINTENANCE").length,
      icon: Wrench,
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <AdminPage
      title="Ambulance fleet"
      description="Manage vehicles, driver assignments and fleet availability."
      action={
        query.isSuccess ? (
          <CreateAmbulanceDialog ambulances={ambulances} />
        ) : undefined
      }
    >
      <QueryMessage
        loading={query.isPending}
        error={query.error}
        retry={() => void query.refetch()}
      />

      {query.isSuccess && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {summaries.map((item) => (
              <AdminPanel key={item.title}>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-sm text-slate-500">{item.title}</p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <item.icon className="size-6" />
                  </span>
                </div>
              </AdminPanel>
            ))}
          </div>

          <AdminPanel title="Vehicle directory">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                aria-label="Search vehicles"
                placeholder="Search vehicle or driver"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-11 flex-1 rounded-xl"
              />

              <NativeSelect
                aria-label="Filter by status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-11"
              >
                <NativeSelectOption value="">All statuses</NativeSelectOption>
                <NativeSelectOption value="AVAILABLE">
                  Available
                </NativeSelectOption>
                <NativeSelectOption value="BUSY">Busy</NativeSelectOption>
                <NativeSelectOption value="MAINTENANCE">
                  Maintenance
                </NativeSelectOption>
              </NativeSelect>
            </div>

            {filteredAmbulances.length === 0 ? (
              <EmptyState message="No vehicles match your search." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredAmbulances.map((ambulance) => (
                    <TableRow key={ambulance.id}>
                      <TableCell className="py-4">
                        <p className="font-semibold text-slate-900">
                          {ambulance.vehicleNumber}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {ambulance.type}
                        </p>
                      </TableCell>
                      <TableCell>{ambulance.driver.user.name}</TableCell>
                      <TableCell>
                        {ambulance.location || "Not provided"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={ambulance.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <AmbulanceDetailsDialog ambulanceId={ambulance.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </AdminPanel>
        </>
      )}
    </AdminPage>
  );
}
