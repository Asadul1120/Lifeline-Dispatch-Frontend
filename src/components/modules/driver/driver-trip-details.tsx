"use client";

import { ArrowLeft, MapPin, Phone, UserRound } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrip } from "@/hooks";

const statusClasses: Record<string, string> = {
  STARTED: "border-blue-200 bg-blue-50 text-blue-700",
  ONGOING: "border-amber-200 bg-amber-50 text-amber-700",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED: "border-red-200 bg-red-50 text-red-700",
};

export default function DriverTripDetails({ tripId }: { tripId: string }) {
  const { data: response, isLoading, isError } = useTrip(tripId);
  const trip = response?.data;

  if (isLoading) {
    return (
      <div className="p-8 text-sm text-slate-500">Loading trip details…</div>
    );
  }

  if (isError || !trip) {
    return (
      <div className="p-8 text-sm text-red-600">
        Trip details could not be loaded.
      </div>
    );
  }

  const patientPhone = trip.request.patient.patient?.phone;

  return (
    <main className="min-h-svh bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <Button
          variant="outline"
          render={<Link href="/dashboard/driver" />}
          nativeButton={false}
          className="gap-2 bg-white"
        >
          <ArrowLeft className="size-4" /> Back to dashboard
        </Button>
        <Card className="border-slate-200/70 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-slate-100">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                Trip details
              </p>
              <CardTitle className="mt-2 text-2xl">
                {trip.request.emergencyType}
              </CardTitle>
              <p className="mt-2 text-sm text-slate-500">
                Started{" "}
                {trip.startTime ? formatDate(trip.startTime) : "Not started"}
              </p>
            </div>
            <Badge className={statusClasses[trip.status] ?? ""}>
              {trip.status}
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
            <Detail
              icon={MapPin}
              label="Pickup"
              value={trip.request.pickupLocation}
            />
            <Detail
              icon={MapPin}
              label="Destination"
              value={trip.request.destination ?? "Not provided"}
            />
            <Detail
              icon={UserRound}
              label="Patient"
              value={trip.request.patient.name}
            />
            <Detail
              icon={Phone}
              label="Contact"
              value={patientPhone ?? trip.request.patient.email}
            />
            <Detail
              icon={MapPin}
              label="Requested"
              value={formatDate(trip.request.createdAt)}
            />
            <Detail
              icon={MapPin}
              label="Completed"
              value={trip.endTime ? formatDate(trip.endTime) : "Not completed"}
            />
            {trip.cancelReason && (
              <Detail
                icon={MapPin}
                label="Cancellation reason"
                value={trip.cancelReason}
              />
            )}
          </CardContent>
          <div className="border-t border-slate-100 p-6">
            {patientPhone ? (
              <a
                href={`tel:${patientPhone}`}
                className="inline-flex items-center gap-2 font-medium text-emerald-700"
              >
                <Phone className="size-4" /> Call patient
              </a>
            ) : (
              <a
                href={`mailto:${trip.request.patient.email}`}
                className="font-medium text-emerald-700"
              >
                Email patient
              </a>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-emerald-700" />
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
