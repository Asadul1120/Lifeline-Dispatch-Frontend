"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { useEmailVerification } from "@/hooks/auth.hook";
import { getMessage } from "@/lib/utils";
import { verifyEmailSchema } from "@/validation/auth.validation";

export default function VerifyEmailForm() {
    
  const searchParams = useSearchParams();
  const email = searchParams.get("email")?.trim() ?? "";
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { mutate: verifyEmail, isPending } = useEmailVerification();

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
    },
    validators: {
      onChange: verifyEmailSchema,
      onSubmit: verifyEmailSchema,
    },
    onSubmit: ({ value }) => {
      if (!isValidEmail || isPending) return;

      verifyEmail(
        {
          email,
          otp: value.otp.trim(),
        },
        {
          onSuccess: (response) => {
            toast.success(
              getMessage(
                response,
                "Email verified successfully. You can now log in.",
              ),
            );
            router.push("/");
          },
          onError: (error) => {
            toast.error(
              getMessage(error, "Email verification failed. Please try again."),
            );
          },
        },
      );
    },
  });

  return (
    <div className="w-full">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <MailCheck aria-hidden="true" className="size-7" />
        </div>

        <h1 className="text-2xl font-semibold text-slate-900">
          Verify your email
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter the 6-digit verification code sent to your email.
        </p>
      </div>

      <form
        noValidate
        aria-busy={isPending}
        onSubmit={(event) => {
          event.preventDefault();

          if (!isValidEmail || isPending) return;

          void form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          <Field data-invalid={!isValidEmail} className="gap-2">
            <FieldLabel htmlFor="verify-email">Email address</FieldLabel>

            <Input
              id="verify-email"
              type="email"
              value={email}
              readOnly
              aria-invalid={!isValidEmail}
              aria-describedby={
                !isValidEmail ? "verify-email-error" : undefined
              }
              className="h-12 rounded-xl border-slate-200 bg-slate-100 text-slate-600"
            />

            {!isValidEmail && (
              <FieldError id="verify-email-error">
                Email is missing or invalid. Open the verification link again.
              </FieldError>
            )}
          </Field>

          <form.Field name="otp">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel htmlFor="verify-otp">
                    Verification code
                  </FieldLabel>

                  <Input
                    id="verify-otp"
                    name={field.name}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="000000"
                    maxLength={6}
                    required
                    disabled={isPending}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                    aria-describedby={
                      isInvalid ? "verify-otp-error" : undefined
                    }
                    className="h-12 rounded-xl border-slate-200 bg-slate-50/60 text-center font-mono text-xl tracking-[0.4em] focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 md:text-xl"
                  />

                  {isInvalid && (
                    <FieldError
                      id="verify-otp-error"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            disabled={isPending || !isValidEmail}
            aria-busy={isPending}
            className="h-12 w-full rounded-xl bg-emerald-700 font-semibold text-white hover:bg-emerald-800"
          >
            {isPending ? (
              <>
                <Spinner className="size-4" />
                Verifying email…
              </>
            ) : (
              <>
                Verify email
                <ArrowRight aria-hidden="true" className="size-4" />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already verified?{" "}
        <Link
          href="/login"
          className="font-medium text-emerald-700 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
