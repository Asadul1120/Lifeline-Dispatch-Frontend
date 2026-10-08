"use client";

import { CheckCircle2, Navigation, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  useCancelTrip,
  useMarkTripPickedUp,
  useUpdateTripStatus,
} from "@/hooks";
import { getMessage } from "@/lib/utils";
import type { DriverTrip } from "@/types";
import { cancelTripSchema } from "@/validation";

export default function DriverTripActions({ trip }: { trip: DriverTrip }) {
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateTripStatus();
  const { mutate: markPickedUp, isPending: isPickingUp } =
    useMarkTripPickedUp();
  const { mutate: cancelTrip, isPending: isCancelling } = useCancelTrip();

  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState<string | null>(null);

  const isPending = isUpdating || isPickingUp || isCancelling;
  const reasonId = `trip-cancel-reason-${trip.id}`;

  const handleStatus = (status: "ONGOING" | "COMPLETED") => {
    if (isPending) return;

    updateStatus(
      { tripId: trip.id, status },
      {
        onSuccess: (response) =>
          toast.success(getMessage(response, "Trip updated.")),
        onError: (error) =>
          toast.error(getMessage(error, "Could not update this trip.")),
      },
    );
  };

  const handlePickup = () => {
    if (isPending) return;

    markPickedUp(trip.id, {
      onSuccess: (response) =>
        toast.success(getMessage(response, "Patient pickup marked.")),
      onError: (error) =>
        toast.error(getMessage(error, "Could not mark patient pickup.")),
    });
  };

  if (trip.status === "COMPLETED" || trip.status === "CANCELLED") {
    return (
      <p className="text-sm text-slate-500">
        This trip is {trip.status.toLowerCase()}.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3" aria-busy={isPending}>
        {trip.status === "STARTED" && (
          <Button
            type="button"
            disabled={isPending}
            onClick={() => handleStatus("ONGOING")}
          >
            <Navigation aria-hidden="true" className="size-4" />
            {isUpdating ? "Updating…" : "Mark on the way"}
          </Button>
        )}

        {trip.status === "ONGOING" && trip.request.status === "ON_THE_WAY" && (
          <Button type="button" disabled={isPending} onClick={handlePickup}>
            <UserRound aria-hidden="true" className="size-4" />
            {isPickingUp ? "Updating…" : "Mark patient picked up"}
          </Button>
        )}

        {trip.status === "ONGOING" && trip.request.status === "PICKED_UP" && (
          <Button
            type="button"
            disabled={isPending}
            onClick={() => handleStatus("COMPLETED")}
          >
            <CheckCircle2 aria-hidden="true" className="size-4" />
            {isUpdating ? "Completing…" : "Complete trip"}
          </Button>
        )}

        <Button
          type="button"
          variant="destructive"
          disabled={isPending}
          onClick={() => setIsCancelOpen(true)}
        >
          Cancel trip
        </Button>
      </div>

      {trip.status === "ONGOING" && trip.request.status === "ON_THE_WAY" && (
        <p className="text-xs text-slate-500">
          Mark the patient as picked up before completing this trip.
        </p>
      )}

      <Dialog
        open={isCancelOpen}
        onOpenChange={(open) => {
          if (isPending) return;

          setIsCancelOpen(open);
          setReasonError(null);

          if (!open) setReason("");
        }}
      >
        <DialogContent showCloseButton={!isPending} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel this trip?</DialogTitle>
            <DialogDescription>
              Provide a reason. Cancelling ends the trip and releases the
              assigned ambulance.
            </DialogDescription>
          </DialogHeader>

          <form
            noValidate
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (isPending) return;

              const result = cancelTripSchema.safeParse({ reason });

              if (!result.success) {
                setReasonError(result.error.issues[0].message);
                return;
              }

              setReasonError(null);

              cancelTrip(
                { tripId: trip.id, reason: result.data.reason },
                {
                  onSuccess: (response) => {
                    setIsCancelOpen(false);
                    setReason("");
                    toast.success(getMessage(response, "Trip cancelled."));
                  },
                  onError: (error) =>
                    toast.error(
                      getMessage(
                        error,
                        "Could not cancel this trip. Please try again.",
                      ),
                    ),
                },
              );
            }}
          >
            <Field data-invalid={Boolean(reasonError)} className="gap-2">
              <FieldLabel htmlFor={reasonId}>Cancellation reason</FieldLabel>

              <textarea
                id={reasonId}
                name="reason"
                rows={3}
                maxLength={255}
                value={reason}
                disabled={isPending}
                aria-invalid={Boolean(reasonError)}
                aria-describedby={reasonError ? `${reasonId}-error` : undefined}
                onChange={(event) => {
                  setReason(event.target.value);
                  setReasonError(null);
                }}
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
              />

              {reasonError && (
                <FieldError id={`${reasonId}-error`}>{reasonError}</FieldError>
              )}
            </Field>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => {
                  setIsCancelOpen(false);
                  setReason("");
                  setReasonError(null);
                }}
              >
                Keep trip
              </Button>

              <Button
                type="submit"
                variant="destructive"
                disabled={isPending}
                aria-busy={isCancelling}
              >
                {isCancelling && <Spinner className="size-4" />}
                {isCancelling ? "Cancelling…" : "Confirm cancellation"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
