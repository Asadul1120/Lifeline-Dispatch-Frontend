"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { useRegister } from "@/hooks/auth.hook";
import { getMessage } from "@/lib/utils";
import type { RegisterPayload } from "@/types/auth.type";
import { registerSchema } from "@/validation";

const fields = [
  {
    name: "name",
    label: "Full name",
    placeholder: "Your full name",
    autoComplete: "name",
    icon: UserRound,
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "you@example.com",
    autoComplete: "email",
    icon: Mail,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Create a password",
    autoComplete: "new-password",
    icon: LockKeyhole,
  },
] as const;

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { mutate: register, isPending: registerPending } = useRegister();

  const isBusy = registerPending || isRedirecting;

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: registerSchema,
      onSubmit: registerSchema,
    },
    onSubmit: ({ value }) => {
      if (isBusy) return;

      const payload: RegisterPayload = {
        name: value.name.trim(),
        email: value.email.trim(),
        password: value.password,
      };

      register(payload, {
        onSuccess: (response) => {
          setIsRedirecting(true);

          toast.success(
            getMessage(
              response,
              "Registration successful. Check your email for the verification code.",
            ),
          );

          const params = new URLSearchParams({
            email: payload.email,
          });

          router.replace(`/verify-email?${params.toString()}`);
        },
        onError: (error) => {
          toast.error(
            getMessage(error, "Registration failed. Please try again."),
          );
        },
      });
    },
  });

  return (
    <div className="w-full">
      <form
        noValidate
        aria-busy={isBusy}
        onSubmit={(event) => {
          event.preventDefault();

          if (isBusy) return;

          void form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          {fields.map((config) => (
            <form.Field key={config.name} name={config.name}>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                const isPassword = config.name === "password";
                const isEmail = config.name === "email";

                const inputId = `register-${config.name}`;
                const errorId = `${inputId}-error`;
                const hintId = `${inputId}-hint`;
                const Icon = config.icon;

                const describedBy =
                  [
                    isPassword ? hintId : undefined,
                    isInvalid ? errorId : undefined,
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined;

                return (
                  <Field data-invalid={isInvalid} className="gap-2">
                    <FieldLabel
                      htmlFor={inputId}
                      className="text-sm font-medium text-slate-700"
                    >
                      {config.label}
                    </FieldLabel>

                    <div className="relative">
                      <Icon
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                      />

                      <Input
                        id={inputId}
                        name={field.name}
                        type={
                          isPassword
                            ? showPassword
                              ? "text"
                              : "password"
                            : isEmail
                              ? "email"
                              : "text"
                        }
                        autoComplete={config.autoComplete}
                        inputMode={isEmail ? "email" : undefined}
                        autoCapitalize={isEmail ? "none" : undefined}
                        spellCheck={isEmail || isPassword ? false : undefined}
                        placeholder={config.placeholder}
                        required
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        disabled={isBusy}
                        aria-invalid={isInvalid}
                        aria-describedby={describedBy}
                        className={`h-12 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 md:text-sm ${
                          isPassword ? "pr-14" : ""
                        }`}
                      />

                      {isPassword && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={isBusy}
                          onClick={() => setShowPassword((current) => !current)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          aria-controls={inputId}
                          aria-pressed={showPassword}
                          className="absolute right-1 top-1/2 size-10 -translate-y-1/2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        >
                          {showPassword ? (
                            <EyeOff aria-hidden="true" className="size-4" />
                          ) : (
                            <Eye aria-hidden="true" className="size-4" />
                          )}
                        </Button>
                      )}
                    </div>

                    {isPassword && (
                      <p id={hintId} className="text-xs text-slate-500">
                        Use at least 6 characters.
                      </p>
                    )}

                    {isInvalid && (
                      <FieldError
                        id={errorId}
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          ))}

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => {
              const isLoading = isBusy || isSubmitting;

              return (
                <Button
                  type="submit"
                  disabled={isLoading}
                  aria-busy={isLoading}
                  className="mt-2 h-12 w-full rounded-xl bg-emerald-700 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:ring-emerald-500/30"
                >
                  {isLoading ? (
                    <>
                      <Spinner className="size-4" />
                      {isRedirecting
                        ? "Opening verification…"
                        : "Creating account…"}
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight aria-hidden="true" className="ml-1 size-4" />
                    </>
                  )}
                </Button>
              );
            }}
          </form.Subscribe>
        </FieldGroup>
      </form>
    </div>
  );
}
