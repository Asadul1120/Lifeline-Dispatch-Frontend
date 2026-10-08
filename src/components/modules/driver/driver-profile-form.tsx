"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowLeft, Save, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
import { useGetMe, useUpdateDriverProfile } from "@/hooks";
import { getMessage } from "@/lib/utils";
import type { UpdateDriverProfilePayload, UserProfile } from "@/types";
import { driverProfileSchema } from "@/validation";

const imageTypes = ["image/png", "image/jpeg", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;

export default function DriverProfileForm() {
  const { data, isLoading, isError, error, refetch } = useGetMe();

  const profile = data?.data as UserProfile | undefined;

  if (isLoading) {
    return (
      <output className="flex items-center justify-center gap-3 py-16">
        <Spinner className="size-6 text-emerald-700" />
        <span className="text-sm text-slate-500">Loading your profile…</span>
      </output>
    );
  }

  if (isError || !profile) {
    return (
      <div className="space-y-4 rounded-xl border border-red-200 bg-red-50 p-5">
        <p role="alert" className="text-sm text-red-700">
          {getMessage(error, "Could not load your profile. Please try again.")}
        </p>

        <Button type="button" variant="outline" onClick={() => void refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  if (profile.role !== "DRIVER" || !profile.driver) {
    return (
      <p role="alert" className="text-sm text-red-700">
        A driver profile is required to use this page.
      </p>
    );
  }

  return <DriverProfileEditor key={profile.id} profile={profile} />;
}

function getProfileValues(profile: UserProfile) {
  return {
    name: profile.name,
    licenseNumber: profile.driver?.licenseNumber ?? "",
    experience: profile.driver?.experience ?? 0,
    currentLocation: profile.driver?.currentLocation ?? "",
    contactNumber: profile.driver?.contactNumber ?? "",
  };
}

function DriverProfileEditor({ profile }: { profile: UserProfile }) {
  const { mutate: updateProfile, isPending } = useUpdateDriverProfile();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [imageError, setImageError] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const clearImageSelection = () => {
    setSelectedImage(null);
    setImageError(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const form = useForm({
    defaultValues: getProfileValues(profile),

    validators: {
      onChange: driverProfileSchema,
      onSubmit: driverProfileSchema,
    },

    onSubmit: ({ value }) => {
      if (isPending || imageError) return;

      const payload: UpdateDriverProfilePayload = {
        name: value.name.trim(),

        driver: {
          licenseNumber: value.licenseNumber.trim(),
          experience: value.experience,
          currentLocation: value.currentLocation.trim(),
          contactNumber: value.contactNumber.trim(),
        },

        profileImage: selectedImage,
      };

      updateProfile(payload, {
        onSuccess: (response) => {
          clearImageSelection();
          form.reset(getProfileValues(response.data));

          toast.success(getMessage(response, "Profile updated successfully."));
        },

        onError: (error) => {
          toast.error(getMessage(error, "Could not update your profile."));
        },
      });
    },
  });

  useEffect(() => {
    if (!selectedImage) return;

    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImage]);

  const previewUrl = selectedImage ? imagePreview : profile.imageUrl;

  return (
    <form
      noValidate
      aria-busy={isPending}
      onSubmit={(event) => {
        event.preventDefault();

        if (!isPending && !imageError) {
          void form.handleSubmit();
        }
      }}
    >
      <FieldGroup className="gap-5">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Driver profile preview"
              width={80}
              height={80}
              unoptimized
              className="size-20 shrink-0 rounded-2xl object-cover"
            />
          ) : (
            <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <UserRound aria-hidden="true" className="size-9" />
            </span>
          )}

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Driver information
            </p>

            <p className="mt-1 break-all text-sm text-slate-500">
              {profile.email}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Application status:{" "}
              {profile.driver?.applicationStatus.toLowerCase()}
            </p>
          </div>
        </div>

        <Field data-invalid={Boolean(imageError)} className="gap-2">
          <FieldLabel htmlFor="driver-profile-image">Profile image</FieldLabel>

          <Input
            ref={imageInputRef}
            id="driver-profile-image"
            type="file"
            accept={imageTypes.join(",")}
            disabled={isPending}
            aria-invalid={Boolean(imageError)}
            aria-describedby={
              imageError
                ? "driver-image-help driver-image-error"
                : "driver-image-help"
            }
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;

              let message: string | null = null;

              if (file && !imageTypes.includes(file.type)) {
                message = "Choose a PNG, JPG or WEBP image.";
              } else if (file && file.size > maxImageSize) {
                message = "Image must be 5 MB or smaller.";
              }

              setImageError(message);
              setSelectedImage(message ? null : file);

              if (message) {
                event.target.value = "";
                toast.error(message);
              }
            }}
            className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pt-2.5 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
          />

          <p id="driver-image-help" className="text-xs text-slate-400">
            PNG, JPG or WEBP. Maximum file size: 5 MB. Select Save changes to
            upload.
          </p>

          {imageError && (
            <FieldError id="driver-image-error">{imageError}</FieldError>
          )}

          {(selectedImage || imageError) && (
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={clearImageSelection}
              className="w-fit rounded-xl"
            >
              Clear selection
            </Button>
          )}
        </Field>

        <form.Field name="name">
          {(field) => (
            <TextField
              field={field}
              id="driver-profile-name"
              label="Full name"
              disabled={isPending}
            />
          )}
        </form.Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <form.Field name="licenseNumber">
            {(field) => (
              <TextField
                field={field}
                id="driver-profile-license"
                label="License number"
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
                  <FieldLabel htmlFor="driver-profile-experience">
                    Experience (years)
                  </FieldLabel>

                  <Input
                    id="driver-profile-experience"
                    name={field.name}
                    type="number"
                    min={0}
                    step={1}
                    value={
                      Number.isNaN(field.state.value) ? "" : field.state.value
                    }
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.target.valueAsNumber)
                    }
                    disabled={isPending}
                    aria-invalid={isInvalid}
                    aria-describedby={
                      isInvalid ? "driver-profile-experience-error" : undefined
                    }
                    className="h-12 rounded-xl border-slate-200 bg-slate-50/60 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />

                  {isInvalid && (
                    <FieldError
                      id="driver-profile-experience-error"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="contactNumber">
          {(field) => (
            <TextField
              field={field}
              id="driver-profile-phone"
              label="Phone number"
              type="tel"
              disabled={isPending}
            />
          )}
        </form.Field>

        <form.Field name="currentLocation">
          {(field) => (
            <TextField
              field={field}
              id="driver-profile-location"
              label="Current location"
              disabled={isPending}
            />
          )}
        </form.Field>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            render={<Link href="/dashboard/driver" />}
            nativeButton={false}
            className="h-11 rounded-xl border-slate-200"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to dashboard
          </Button>

          <Button
            type="submit"
            disabled={isPending || Boolean(imageError)}
            aria-busy={isPending}
            className="h-11 rounded-xl bg-emerald-700 font-semibold text-white hover:bg-emerald-800"
          >
            {isPending ? (
              <Spinner className="size-4" />
            ) : (
              <Save aria-hidden="true" className="size-4" />
            )}

            {isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

type TextFieldProps = {
  field: {
    name: string;

    state: {
      value: string;

      meta: {
        isTouched: boolean;
        isValid: boolean;
        errors: Array<{ message?: string } | undefined>;
      };
    };

    handleBlur: () => void;
    handleChange: (value: string) => void;
  };

  id: string;
  label: string;
  type?: "text" | "tel";
  disabled: boolean;
};

function TextField({
  field,
  id,
  label,
  type = "text",
  disabled,
}: TextFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className="gap-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <Input
        id={id}
        name={field.name}
        type={type}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        disabled={disabled}
        aria-invalid={isInvalid}
        aria-describedby={isInvalid ? `${id}-error` : undefined}
        className="h-12 rounded-xl border-slate-200 bg-slate-50/60 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
      />

      {isInvalid && (
        <FieldError id={`${id}-error`} errors={field.state.meta.errors} />
      )}
    </Field>
  );
}
