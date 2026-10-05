"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowLeft, Save, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
import type { UpdatePatientProfilePayload } from "@/types";
import { patientProfileSchema } from "@/validation";
import { useGetMe, useUpdatePatientProfile } from "@/hooks";

const bloodGroups = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function PatientProfileForm() {
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMe();
  const { mutate: updateProfile, isPending } = useUpdatePatientProfile();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const profile = profileResponse?.data;
  const patient = profile?.patient;

  const form = useForm({
    defaultValues: {
      name: profile?.name ?? "",
      phone: patient?.phone ?? "",
      address: patient?.address ?? "",
      bloodGroup: patient?.bloodGroup ?? "",
      emergencyContact: patient?.emergencyContact ?? "",
    },
    validators: {
      onChange: patientProfileSchema,
      onSubmit: patientProfileSchema,
    },
    onSubmit: ({ value }) => {
      if (isPending) return;

      const payload: UpdatePatientProfilePayload = {
        name: value.name.trim(),
        patient: {
          phone: value.phone.trim(),
          address: value.address.trim(),
          bloodGroup: value.bloodGroup || undefined,
          emergencyContact: value.emergencyContact.trim(),
        },
        profileImage: selectedImage,
      };

      updateProfile(payload, {
        onSuccess: (response) => {
          toast.success(getMessage(response, "Profile updated successfully."));
        },
        onError: (error) => {
          toast.error(getMessage(error, "Could not update your profile."));
        },
      });
    },
  });

  useEffect(() => {
    if (!profile) return;

    form.reset({
      name: profile.name,
      phone: profile.patient?.phone ?? "",
      address: profile.patient?.address ?? "",
      bloodGroup: profile.patient?.bloodGroup ?? "",
      emergencyContact: profile.patient?.emergencyContact ?? "",
    });
  }, [form, profile]);

  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(profile?.imageUrl ?? null);
      return;
    }

    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [profile?.imageUrl, selectedImage]);

  if (isProfileLoading || !profile) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner className="size-6 text-emerald-700" />
      </div>
    );
  }

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
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile preview"
              className="size-14 rounded-2xl object-cover"
            />
          ) : (
            <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <UserRound className="size-7" />
            </span>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Personal information
            </p>
            <p className="mt-1 text-sm text-slate-500">{profile.email}</p>
          </div>
        </div>

        <Field className="gap-2">
          <FieldLabel htmlFor="profile-image">Profile image</FieldLabel>
          <Input
            id="profile-image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            disabled={isPending}
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;

              if (file && file.size > 5 * 1024 * 1024) {
                toast.error("Image must be smaller than 5 MB.");
                event.target.value = "";
                return;
              }

              setSelectedImage(file);
            }}
            className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pt-2.5 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
          />
          <p className="text-xs text-slate-400">
            PNG, JPG or WEBP. Maximum file size: 5 MB.
          </p>
        </Field>

        <form.Field name="name">
          {(field) => (
            <TextField
              field={field}
              id="profile-name"
              label="Full name"
              disabled={isPending}
            />
          )}
        </form.Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <form.Field name="phone">
            {(field) => (
              <TextField
                field={field}
                id="profile-phone"
                label="Phone number"
                disabled={isPending}
              />
            )}
          </form.Field>
          <form.Field name="emergencyContact">
            {(field) => (
              <TextField
                field={field}
                id="profile-emergency-contact"
                label="Emergency contact"
                disabled={isPending}
              />
            )}
          </form.Field>
        </div>

        <form.Field name="address">
          {(field) => (
            <TextField
              field={field}
              id="profile-address"
              label="Address"
              disabled={isPending}
            />
          )}
        </form.Field>

        <form.Field name="bloodGroup">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="profile-blood-group">Blood group</FieldLabel>
              <select
                id="profile-blood-group"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                disabled={isPending}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="">Select blood group</option>
                {bloodGroups.slice(1).map((bloodGroup) => (
                  <option key={bloodGroup} value={bloodGroup}>
                    {bloodGroup}
                  </option>
                ))}
              </select>
            </Field>
          )}
        </form.Field>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            render={<Link href="/dashboard/patient" />}
            nativeButton={false}
            className="h-11 rounded-xl border-slate-200"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
            className="h-11 rounded-xl bg-emerald-700 font-semibold text-white hover:bg-emerald-800"
          >
            {isPending ? (
              <Spinner className="size-4" />
            ) : (
              <Save className="size-4" />
            )}
            {isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

type TextFieldProps = {
  field: any;
  id: string;
  label: string;
  disabled: boolean;
};

function TextField({ field, id, label, disabled }: TextFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className="gap-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        disabled={disabled}
        aria-invalid={isInvalid}
        className="h-12 rounded-xl border-slate-200 bg-slate-50/60 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
