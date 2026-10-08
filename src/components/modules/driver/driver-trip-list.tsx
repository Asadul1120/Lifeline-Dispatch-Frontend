"use client";

import {
  Ambulance,
  CalendarDays,
  ChevronRight,
  Filter,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useMyTrips } from "@/hooks";
import type { TripStatus } from "@/types";

const labels: Record<TripStatus, string> = {
  STARTED: "Started",
  ONGOING: "On the way",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const classes: Record<TripStatus, string> = {
  STARTED: "border-blue-200 bg-blue-50 text-blue-700",
  ONGOING: "border-amber-200 bg-amber-50 text-amber-700",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED: "border-red-200 bg-red-50 text-red-700",
};

export default function DriverTripList() {
  const { data, isLoading, isError, refetch, isFetching } = useMyTrips();
  const [status, setStatus] = useState<"ALL" | TripStatus>("ALL");
  const trips = data?.data ?? [];
  const filteredTrips = useMemo(
    () =>
      status === "ALL" ? trips : trips.filter((trip) => trip.status === status),
    [status, trips],
  );

  return (
    <main className="min-h-svh bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Driver workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              My trips
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review active, completed and cancelled emergency trips.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="gap-2 bg-white"
          >
            <CalendarDays className="size-4" />{" "}
            {isFetching ? "Refreshing…" : "Refresh"}
          </Button>
        </div>

        <Card className="mt-6 border-slate-200/70 bg-white shadow-sm">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg">Trip history</CardTitle>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <Filter className="size-4 text-emerald-700" />
              <span className="sr-only">Filter trips by status</span>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as "ALL" | TripStatus)
                }
                className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 outline-none focus:border-emerald-500"
              >
                <option value="ALL">All statuses ({trips.length})</option>
                <option value="STARTED">Started</option>
                <option value="ONGOING">On the way</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </label>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <Spinner className="size-6 text-emerald-700" />
              </div>
            ) : isError ? (
              <div className="p-10 text-center">
                <p className="text-sm text-red-600">
                  Trips could not be loaded.
                </p>
                <Button className="mt-4" onClick={() => void refetch()}>
                  Try again
                </Button>
              </div>
            ) : !filteredTrips.length ? (
              <div className="p-12 text-center text-sm text-slate-500">
                No trips match this filter.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredTrips.map((trip) => (
                  <Link
                    key={trip.id}
                    href={`/dashboard/driver/trips/${trip.id}`}
                    className="group flex flex-col gap-4 p-5 transition-colors hover:bg-emerald-50/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Ambulance className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {trip.request.emergencyType}
                        </p>
                        <p className="mt-1 flex items-center gap-1 truncate text-sm text-slate-500">
                          <MapPin className="size-3.5 shrink-0" />
                          {trip.request.pickupLocation} →{" "}
                          {trip.request.destination ?? "No destination"}
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                          {formatDate(trip.createdAt)} · Patient:{" "}
                          {trip.request.patient.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <Badge className={`${classes[trip.status]} shrink-0`}>
                        {labels[trip.status]}
                      </Badge>
                      <ChevronRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
