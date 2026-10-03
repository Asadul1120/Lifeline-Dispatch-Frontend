"use client";

import { useForm } from "@tanstack/react-form";
import { Ambulance, MapPin, Navigation, Send, Siren } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { getMessage } from "@/lib/utils";
import {
  CreateEmergencyRequestPayload,
  Priority,
  Priority as PriorityValues,
} from "@/types";
import { createEmergencyRequestSchema } from "@/validation";
import { useCreateEmergencyRequest } from "@/hooks";

const priorityOptions: Array<{ value: Priority; label: string }> = [
  { value: PriorityValues.LOW, label: "Low" },
  { value: PriorityValues.MEDIUM, label: "Medium" },
  { value: PriorityValues.HIGH, label: "High" },
  { value: PriorityValues.CRITICAL, label: "Critical" },
];

export default function EmergencyRequestForm() {
  const { mutate: createRequest, isPending } = useCreateEmergencyRequest();

  const form = useForm({
    defaultValues: {
      pickupLocation: "",
      destination: "",
      emergencyType: "",
      priority: PriorityValues.MEDIUM as Priority,
    },
    validators: {
      onChange: createEmergencyRequestSchema,
      onSubmit: createEmergencyRequestSchema,
    },
    onSubmit: ({ value }) => {
      if (isPending) return;

      const payload: CreateEmergencyRequestPayload = {
        pickupLocation: value.pickupLocation.trim(),
        destination: value.destination.trim() || undefined,
        emergencyType: value.emergencyType.trim(),
        priority: value.priority,
      };

      createRequest(payload, {
        onSuccess: (response) => {
          toast.success(
            getMessage(
              response,
              "Emergency request created. We are finding an ambulance for you.",
            ),
          );
          form.reset();
        },
        onError: (error) => {
          toast.error(
            getMessage(error, "Could not create the emergency request."),
          );
        },
      });
    },
  });

  return (
    <form
      noValidate
      aria-busy={isPending}
      onSubmit={(event) => {
        event.preventDefault();
        if (!isPending) void form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-5">
        <form.Field name="pickupLocation">
          {(field) => (
            <LocationField
              field={field}
              id="pickup-location"
              label="Pickup location"
              placeholder="Example: Dhanmondi, Dhaka"
              icon={MapPin}
              disabled={isPending}
            />
          )}
        </form.Field>

        <form.Field name="destination">
          {(field) => (
            <LocationField
              field={field}
              id="destination"
              label="Destination (optional)"
              placeholder="Example: Dhaka Medical College Hospital"
              icon={Navigation}
              disabled={isPending}
            />
          )}
        </form.Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <form.Field name="emergencyType">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel htmlFor="emergency-type">
                    Emergency type
                  </FieldLabel>
                  <div className="relative">
                    <Siren className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="emergency-type"
                      name={field.name}
                      placeholder="Example: Accident"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      disabled={isPending}
                      aria-invalid={isInvalid}
                      className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pl-11 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="priority">
            {(field) => (
              <Field className="gap-2">
                <FieldLabel htmlFor="request-priority">Priority</FieldLabel>
                <select
                  id="request-priority"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(event.target.value as Priority)
                  }
                  disabled={isPending}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </form.Field>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="mt-2 h-12 w-full rounded-xl bg-emerald-700 font-semibold text-white hover:bg-emerald-800"
        >
          {isPending ? (
            <>
              <Spinner className="size-4" />
              Sending request…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="size-4" />
              Request an ambulance
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}

type LocationFieldProps = {
  field: any;
  id: string;
  label: string;
  placeholder: string;
  icon: typeof MapPin;
  disabled: boolean;
};

function LocationField({
  field,
  id,
  label,
  placeholder,
  icon: Icon,
  disabled,
}: LocationFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className="gap-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
        />
        <Input
          id={id}
          name={field.name}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          disabled={disabled}
          aria-invalid={isInvalid}
          className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pl-11 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
        />
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
