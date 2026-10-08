"use client";

import {
  Ambulance,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  useAssignedRequests,
  useCancelTrip,
  useGetMe,
  useMarkTripPickedUp,
  useMyTrips,
  useStartTrip,
  useUpdateDriverAvailability,
  useUpdateDriverLocation,
  useUpdateTripStatus,
} from "@/hooks";
import { getMessage } from "@/lib/utils";
import type {
  AssignedDriverRequest,
  DriverTrip,
  TripStatus,
  UserProfile,
} from "@/types";

const statusLabels: Record<TripStatus, string> = {
  STARTED: "Started",
  ONGOING: "On the way",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const statusClasses: Record<TripStatus, string> = {
  STARTED: "border-blue-200 bg-blue-50 text-blue-700",
  ONGOING: "border-amber-200 bg-amber-50 text-amber-700",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED: "border-red-200 bg-red-50 text-red-700",
};

export default function DriverDashboard() {
  const { data: meResponse } = useGetMe();
  const {
    data: tripsResponse,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useMyTrips();
  const {
    data: assignedResponse,
    isLoading: isAssignedLoading,
    isError: isAssignedError,
    refetch: refetchAssigned,
  } = useAssignedRequests();
  const { mutate: startTrip, isPending: isStartingTrip } = useStartTrip();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateTripStatus();
  const { mutate: markPickedUp, isPending: isPickingUp } =
    useMarkTripPickedUp();
  const { mutate: cancelTrip, isPending: isCancelling } = useCancelTrip();
  const { mutate: updateAvailability, isPending: isUpdatingAvailability } =
    useUpdateDriverAvailability();
  const { mutate: updateLocation, isPending: isUpdatingLocation } =
    useUpdateDriverLocation();
  const [locationInput, setLocationInput] = useState("");

  const profile = meResponse?.data as UserProfile | undefined;
  const trips = tripsResponse?.data ?? [];
  const assignedRequests = assignedResponse?.data ?? [];
  const activeTrip = trips.find(
    (trip) => trip.status === "STARTED" || trip.status === "ONGOING",
  );
  const completedTrips = trips.filter((trip) => trip.status === "COMPLETED");
  const cancelledTrips = trips.filter((trip) => trip.status === "CANCELLED");
  const driver = profile?.driver;

  useEffect(() => {
    setLocationInput(driver?.currentLocation ?? "");
  }, [driver?.currentLocation]);

  const handleStartTrip = (requestId: string) => {
    startTrip(requestId, {
      onSuccess: (result) => {
        toast.success(getMessage(result, "Trip started successfully."));
      },
      onError: (error) => {
        toast.error(getMessage(error, "Could not start this trip."));
      },
    });
  };

  const handleUpdateStatus = (
    trip: DriverTrip,
    status: "ONGOING" | "COMPLETED" | "CANCELLED",
  ) => {
    if (status === "CANCELLED") {
      const reason = window.prompt("Why are you cancelling this trip?");
      if (!reason?.trim()) return;

      cancelTrip(
        { tripId: trip.id, reason: reason.trim() },
        {
          onSuccess: (result) =>
            toast.success(getMessage(result, "Trip cancelled.")),
          onError: (error) =>
            toast.error(getMessage(error, "Could not cancel trip.")),
        },
      );
      return;
    }

    updateStatus(
      { tripId: trip.id, status },
      {
        onSuccess: (result) => {
          toast.success(getMessage(result, "Trip status updated."));
        },
        onError: (error) => {
          toast.error(getMessage(error, "Could not update trip status."));
        },
      },
    );
  };

  const handlePickedUp = (tripId: string) => {
    markPickedUp(tripId, {
      onSuccess: (result) =>
        toast.success(getMessage(result, "Patient pickup marked.")),
      onError: (error) =>
        toast.error(getMessage(error, "Could not mark pickup.")),
    });
  };

  const handleAvailability = () => {
    updateAvailability(!driver?.isAvailable, {
      onSuccess: (result) =>
        toast.success(getMessage(result, "Availability updated.")),
      onError: (error) =>
        toast.error(getMessage(error, "Could not update availability.")),
    });
  };

  const handleLocation = () => {
    if (!locationInput.trim()) return;
    updateLocation(locationInput.trim(), {
      onSuccess: (result) =>
        toast.success(getMessage(result, "Location updated.")),
      onError: (error) =>
        toast.error(getMessage(error, "Could not update location.")),
    });
  };

  return (
    <main className="min-h-svh bg-[#f5f8f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Driver workspace
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {profile?.name
                ? `Good to see you, ${profile.name.split(" ")[0]}.`
                : "Driver dashboard"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Keep an eye on your assigned trips, update progress, and help
              every patient reach care safely.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              void Promise.all([refetch(), refetchAssigned()]);
            }}
            disabled={isFetching}
            className="w-fit gap-2 border-slate-200 bg-white"
          >
            <RefreshCw
              className={isFetching ? "size-4 animate-spin" : "size-4"}
            />
            Refresh trips
          </Button>
        </header>

        <section
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Trip summary"
        >
          <SummaryCard
            icon={Navigation}
            label="Active trip"
            value={activeTrip ? "1" : "0"}
            tone="emerald"
          />
          <SummaryCard
            icon={CheckCircle2}
            label="Completed trips"
            value={String(completedTrips.length)}
            tone="blue"
          />
          <SummaryCard
            icon={Clock3}
            label="Assigned requests"
            value={String(assignedRequests.length)}
            tone="amber"
          />
          <SummaryCard
            icon={ShieldCheck}
            label="Service record"
            value={`${completedTrips.length} completed`}
            tone="slate"
          />
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Current assignment
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your active trip or newly assigned requests appear here.
                </p>
              </div>
              {activeTrip && (
                <Badge className={statusClasses[activeTrip.status]}>
                  {statusLabels[activeTrip.status]}
                </Badge>
              )}
            </div>

            {isLoading ? (
              <LoadingCard />
            ) : isError ? (
              <MessageCard
                message="Trips could not be loaded. Please try again."
                onRetry={() => refetch()}
              />
            ) : activeTrip ? (
              <ActiveTripCard
                trip={activeTrip}
                isUpdating={isUpdating || isCancelling}
                onUpdateStatus={handleUpdateStatus}
                isPickingUp={isPickingUp}
                onPickedUp={handlePickedUp}
              />
            ) : isAssignedLoading ? (
              <LoadingCard />
            ) : isAssignedError ? (
              <MessageCard
                message="Assigned requests could not be loaded. Please try again."
                onRetry={() => refetchAssigned()}
              />
            ) : assignedRequests.length ? (
              <AssignedRequestsCard
                requests={assignedRequests}
                isStarting={isStartingTrip}
                onStart={handleStartTrip}
              />
            ) : (
              <EmptyCard />
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Driver profile
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your approved driver information.
            </p>
            <DriverProfileCard
              profile={profile}
              driver={driver}
              locationInput={locationInput}
              onLocationChange={setLocationInput}
              onSaveLocation={handleLocation}
              onToggleAvailability={handleAvailability}
              isUpdatingLocation={isUpdatingLocation}
              isUpdatingAvailability={isUpdatingAvailability}
            />
          </section>
        </div>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Trip history
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A record of trips handled through Lifeline Dispatch.
              </p>
            </div>
            {cancelledTrips.length > 0 && (
              <span className="text-xs text-slate-400">
                {cancelledTrips.length} cancelled
              </span>
            )}
          </div>
          <TripHistory
            trips={trips.filter((trip) => trip.id !== activeTrip?.id)}
          />
        </section>
      </div>
    </main>
  );
}

type Tone = "emerald" | "blue" | "amber" | "slate";

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Ambulance;
  label: string;
  value: string;
  tone: Tone;
}) {
  const tones: Record<Tone, string> = {
    emerald: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <Card className="border-slate-200/70 bg-white shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${tones[tone]}`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ActiveTripCard({
  trip,
  isUpdating,
  onUpdateStatus,
  isPickingUp,
  onPickedUp,
}: {
  trip: DriverTrip;
  isUpdating: boolean;
  isPickingUp: boolean;
  onPickedUp: (tripId: string) => void;
  onUpdateStatus: (
    trip: DriverTrip,
    status: "ONGOING" | "COMPLETED" | "CANCELLED",
  ) => void;
}) {
  const { request } = trip;

  return (
    <Card className="overflow-hidden border-slate-200/70 bg-white shadow-sm">
      <div className="h-1.5 bg-emerald-600" />
      <CardHeader className="border-b border-slate-100 p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Emergency request
            </p>
            <CardTitle className="mt-2 text-2xl font-bold text-slate-900">
              {request.emergencyType}
            </CardTitle>
            <CardDescription className="mt-2">
              Request ID: {request.id.slice(0, 8)}…
            </CardDescription>
          </div>
          <Badge className={statusClasses[trip.status]}>
            {statusLabels[trip.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <Detail
            icon={MapPin}
            label="Pickup location"
            value={request.pickupLocation}
          />
          <Detail
            icon={Navigation}
            label="Destination"
            value={request.destination ?? "Not provided"}
          />
          <Detail
            icon={UserRound}
            label="Patient"
            value={request.patient.name}
          />
          <Detail
            icon={CalendarDays}
            label="Requested"
            value={formatDate(request.createdAt)}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
          {trip.status === "STARTED" && (
            <Button
              onClick={() => onUpdateStatus(trip, "ONGOING")}
              disabled={isUpdating}
              className="gap-2"
            >
              <Navigation className="size-4" />
              {isUpdating ? "Updating…" : "Mark on the way"}
            </Button>
          )}
          {trip.status === "ONGOING" && (
            <>
              {request.status === "ON_THE_WAY" && (
                <Button
                  onClick={() => onPickedUp(trip.id)}
                  disabled={isPickingUp || isUpdating}
                  className="gap-2"
                >
                  <UserRound className="size-4" />
                  {isPickingUp ? "Updating…" : "Mark patient picked up"}
                </Button>
              )}
              <Button
                onClick={() => onUpdateStatus(trip, "COMPLETED")}
                disabled={isUpdating || isPickingUp}
                className="gap-2"
              >
                <CheckCircle2 className="size-4" />
                {isUpdating ? "Updating…" : "Complete trip"}
              </Button>
            </>
          )}
          <Button
            variant="destructive"
            onClick={() => onUpdateStatus(trip, "CANCELLED")}
            disabled={isUpdating}
            className="gap-2"
          >
            Cancel trip
          </Button>
          {request.patient.email && (
            <a
              href={`mailto:${request.patient.email}`}
              className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
            >
              <Phone className="size-4" /> Contact patient
            </a>
          )}
          {request.patient.patient?.phone && (
            <a
              href={`tel:${request.patient.patient.phone}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
            >
              <Phone className="size-4" /> Call patient
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AssignedRequestsCard({
  requests,
  isStarting,
  onStart,
}: {
  requests: AssignedDriverRequest[];
  isStarting: boolean;
  onStart: (requestId: string) => void;
}) {
  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card
          key={request.id}
          className="border-amber-200/80 bg-white shadow-sm"
        >
          <CardHeader className="border-b border-amber-100 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                  Assigned request
                </p>
                <CardTitle className="mt-2 text-xl font-bold text-slate-900">
                  {request.emergencyType}
                </CardTitle>
                <CardDescription className="mt-1">
                  Assigned {formatDate(request.createdAt)}
                </CardDescription>
              </div>
              <Badge className="border-amber-200 bg-amber-50 text-amber-700">
                {request.priority} priority
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail
                icon={MapPin}
                label="Pickup location"
                value={request.pickupLocation}
              />
              <Detail
                icon={Navigation}
                label="Destination"
                value={request.destination ?? "Not provided"}
              />
              <Detail
                icon={UserRound}
                label="Patient"
                value={request.patient.name}
              />
              <Detail
                icon={Ambulance}
                label="Ambulance"
                value={request.ambulance?.vehicleNumber ?? "Assigned ambulance"}
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
              <p className="text-xs text-slate-500">
                Start the trip when you are ready to respond.
              </p>
              <Button
                onClick={() => onStart(request.id)}
                disabled={isStarting}
                className="gap-2"
              >
                <Navigation className="size-4" />
                {isStarting ? "Starting…" : "Start trip"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DriverProfileCard({
  profile,
  driver,
  locationInput,
  onLocationChange,
  onSaveLocation,
  onToggleAvailability,
  isUpdatingLocation,
  isUpdatingAvailability,
}: {
  profile?: UserProfile;
  driver?: UserProfile["driver"];
  locationInput: string;
  onLocationChange: (value: string) => void;
  onSaveLocation: () => void;
  onToggleAvailability: () => void;
  isUpdatingLocation: boolean;
  isUpdatingAvailability: boolean;
}) {
  return (
    <Card className="mt-4 border-slate-200/70 bg-white shadow-sm">
      <CardContent className="space-y-5 p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-[#073e34] text-white">
            <UserRound className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">
              {profile?.name ?? "Driver"}
            </p>
            <p className="truncate text-sm text-slate-500">
              {profile?.email ?? "—"}
            </p>
          </div>
        </div>
        <div className="grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2 xl:grid-cols-1">
          <ProfileItem
            label="License number"
            value={driver?.licenseNumber ?? "—"}
          />
          <ProfileItem
            label="Experience"
            value={driver ? `${driver.experience} years` : "—"}
          />
          <ProfileItem
            label="Current location"
            value={driver?.currentLocation ?? "Not set"}
          />
          <ProfileItem
            label="Availability"
            value={driver?.isAvailable ? "Available" : "Busy / unavailable"}
          />
        </div>
        <div className="space-y-3 border-t border-slate-100 pt-5">
          <Button
            type="button"
            variant={driver?.isAvailable ? "outline" : "default"}
            onClick={onToggleAvailability}
            disabled={isUpdatingAvailability || !driver}
            className="w-full"
          >
            {isUpdatingAvailability
              ? "Updating availability…"
              : driver?.isAvailable
                ? "Go offline"
                : "Go available"}
          </Button>
          <div className="flex gap-2">
            <input
              value={locationInput}
              onChange={(event) => onLocationChange(event.target.value)}
              placeholder="Current location"
              className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Current location"
            />
            <Button
              type="button"
              variant="outline"
              onClick={onSaveLocation}
              disabled={isUpdatingLocation || !locationInput.trim()}
              className="shrink-0 gap-2"
            >
              <LocateFixed className="size-4" />
              {isUpdatingLocation ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TripHistory({ trips }: { trips: DriverTrip[] }) {
  if (!trips.length) {
    return (
      <Card className="border-dashed border-slate-300 bg-transparent shadow-none">
        <CardContent className="p-8 text-center text-sm text-slate-500">
          No previous trips yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
      <div className="divide-y divide-slate-100">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Ambulance className="size-5" />
              </span>
              <div className="min-w-0">
                <Link
                  href={`/dashboard/driver/trips/${trip.id}`}
                  className="truncate font-semibold text-slate-900 hover:text-emerald-700"
                >
                  {trip.request.emergencyType}
                </Link>
                <p className="mt-1 truncate text-sm text-slate-500">
                  {trip.request.pickupLocation} →{" "}
                  {trip.request.destination ?? "No destination"}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  {formatDate(trip.createdAt)} · Patient:{" "}
                  {trip.request.patient.name}
                </p>
              </div>
            </div>
            <Badge
              className={`${statusClasses[trip.status]} shrink-0 self-start sm:self-center`}
            >
              {statusLabels[trip.status]}
            </Badge>
          </div>
        ))}
      </div>
    </div>
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
    <div className="flex min-w-0 gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-emerald-700" />
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

function LoadingCard() {
  return (
    <Card className="border-slate-200/70 bg-white shadow-sm">
      <CardContent className="flex min-h-64 items-center justify-center gap-3 p-8 text-sm text-slate-500">
        <Spinner className="size-5 text-emerald-700" />
        Loading your trips…
      </CardContent>
    </Card>
  );
}

function MessageCard({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <Card className="border-red-200 bg-red-50/60 shadow-sm">
      <CardContent className="flex min-h-64 flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-sm text-red-700">{message}</p>
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}

function EmptyCard() {
  return (
    <Card className="border-dashed border-slate-300 bg-white/70 shadow-none">
      <CardContent className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Ambulance className="size-7" />
        </span>
        <h3 className="mt-4 font-semibold text-slate-900">No active trip</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          You are all caught up. Assigned trips will appear here once a trip has
          been started.
        </p>
      </CardContent>
    </Card>
  );
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
