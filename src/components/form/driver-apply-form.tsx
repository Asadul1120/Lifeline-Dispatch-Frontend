"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  CarFront,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
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
import { useDriverApply } from "@/hooks";
import { getMessage } from "@/lib/utils";
import type { DriverApplyPayload } from "@/types/driver.type";
import { driverApplySchema } from "@/validation";

export default function DriverApplyForm() {
  const router = useRouter();
  const { mutate: applyAsDriver, isPending } = useDriverApply();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      licenseNumber: "",
      experience: 0,
      currentLocation: "",
      contactNumber: "",
    },
    validators: {
      onChange: driverApplySchema,
      onSubmit: driverApplySchema,
    },
    onSubmit: ({ value }) => {
      if (isPending) return;

      const payload: DriverApplyPayload = {
        ...value,
        name: value.name.trim(),
        email: value.email.trim(),
        licenseNumber: value.licenseNumber.trim(),
        currentLocation: value.currentLocation.trim() || undefined,
        contactNumber: value.contactNumber.trim() || undefined,
      };

      applyAsDriver(payload, {
        onSuccess: (response) => {
          toast.success(
            getMessage(
              response,
              "Application submitted. Check your email for the verification code.",
            ),
          );
          router.push(
            `/driver-verify?email=${encodeURIComponent(payload.email)}`,
          );
        },
        onError: (error) => {
          toast.error(
            getMessage(error, "Driver application failed. Please try again."),
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
        <form.Field name="name">
          {(field) => (
            <TextField
              field={field}
              id="driver-name"
              label="Full name"
              placeholder="Your full name"
              type="text"
              icon={UserRound}
              disabled={isPending}
            />
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <TextField
              field={field}
              id="driver-email"
              label="Email address"
              placeholder="you@example.com"
              type="email"
              icon={Mail}
              disabled={isPending}
            />
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <TextField
              field={field}
              id="driver-password"
              label="Password"
              placeholder="Create a password"
              type="password"
              icon={LockKeyhole}
              disabled={isPending}
            />
          )}
        </form.Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <form.Field name="licenseNumber">
            {(field) => (
              <TextField
                field={field}
                id="driver-license"
                label="License number"
                placeholder="DL-12345"
                type="text"
                icon={CarFront}
                disabled={isPending}
              />
            )}
          </form.Field>

          <form.Field name="experience">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel htmlFor="driver-experience">
                    Experience (years)
                  </FieldLabel>
                  <Input
                    id="driver-experience"
                    name={field.name}
                    type="number"
                    min={0}
                    step={1}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(Number(event.target.value))
                    }
                    disabled={isPending}
                    aria-invalid={isInvalid}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50/60 text-base focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 md:text-sm"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="currentLocation">
          {(field) => (
            <TextField
              field={field}
              id="driver-location"
              label="Current location (optional)"
              placeholder="Dhanmondi, Dhaka"
              type="text"
              icon={MapPin}
              disabled={isPending}
            />
          )}
        </form.Field>

        <form.Field name="contactNumber">
          {(field) => (
            <TextField
              field={field}
              id="driver-phone"
              label="Phone number (optional)"
              placeholder="01712345678"
              type="tel"
              icon={Phone}
              disabled={isPending}
            />
          )}
        </form.Field>

        <Button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="mt-2 h-12 w-full rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          {isPending ? (
            <>
              <Spinner className="size-4" />
              Submitting application…
            </>
          ) : (
            <>
              Apply as driver
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}

type TextFieldProps = {
  field: any;
  id: string;
  label: string;
  placeholder: string;
  type: string;
  icon: LucideIcon;
  disabled: boolean;
};

function TextField({
  field,
  id,
  label,
  placeholder,
  type,
  icon: Icon,
  disabled,
}: TextFieldProps) {
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
          type={type}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          disabled={disabled}
          aria-invalid={isInvalid}
          className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-base focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 md:text-sm"
        />
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
