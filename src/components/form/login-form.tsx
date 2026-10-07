"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { getDashboardRoute, getMessage } from "@/lib/utils";
import { loginSchema } from "@/validation";
import { useLogin } from "@/hooks";

import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending: loginPending } = useLogin();

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      if (loginPending) return;

      const loginData = {
        email: value.email.trim(),
        password: value.password,
      };

      login(loginData, {
        onSuccess: (response) => {
          toast.success(getMessage(response, "Login successful."));
          router.push(getDashboardRoute(response.data.role));
        },
        onError: (error) => {
          toast.error(getMessage(error, "Login failed. Please try again."));
        },
      });
    },
  });

  return (
    <div className="w-full">
      <form
        noValidate
        aria-busy={loginPending}
        onSubmit={(event) => {
          event.preventDefault();

          if (loginPending) return;

          void form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel
                    htmlFor="login-email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email address
                  </FieldLabel>

                  <div className="relative">
                    <Mail
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                      id="login-email"
                      name={field.name}
                      type="email"
                      autoComplete="username"
                      inputMode="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      placeholder="you@example.com"
                      required
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      disabled={loginPending}
                      aria-invalid={isInvalid}
                      aria-describedby={
                        isInvalid ? "login-email-error" : undefined
                      }
                      className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 md:text-sm"
                    />
                  </div>

                  {isInvalid && (
                    <FieldError
                      id="login-email-error"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel
                    htmlFor="login-password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <LockKeyhole
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                      id="login-password"
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      disabled={loginPending}
                      aria-invalid={isInvalid}
                      aria-describedby={
                        isInvalid ? "login-password-error" : undefined
                      }
                      className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pl-11 pr-14 text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 md:text-sm"
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={loginPending}
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-controls="login-password"
                      aria-pressed={showPassword}
                      className="absolute right-1 top-1/2 size-10 -translate-y-1/2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff aria-hidden="true" className="size-4" />
                      ) : (
                        <Eye aria-hidden="true" className="size-4" />
                      )}
                    </Button>
                  </div>

                  {isInvalid && (
                    <FieldError
                      id="login-password-error"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => {
              const isLoading = loginPending || isSubmitting;

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
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight aria-hidden="true" className="ml-1 size-4" />
                    </>
                  )}
                </Button>
              );
            }}
          </form.Subscribe>
        </FieldGroup>
      </form>

      {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() && (
        <FieldGroup className="mt-7 gap-5">
          <FieldSeparator className="text-xs text-slate-400">
            Or continue with
          </FieldSeparator>

          <Field>
            <GoogleLoginComponent />
          </Field>
        </FieldGroup>
      )}
    </div>
  );
}
