"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

import { useLogin } from "@/hooks/auth.hook";
import { getMessage } from "@/lib/utils";
import { loginSchema } from "@/validation";

import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending: loginPending } = useLogin();

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
        },
        onError: (error) => {
          toast.error(getMessage(error, "Login failed. Please try again."));
        },
      });
    },
  });

  return (
    <Card className="w-full gap-6 rounded-2xl border-border/60 py-8 shadow-xl shadow-black/5">
      <CardHeader className="space-y-4 px-6 text-center sm:px-8">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Activity className="size-6" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Lifeline Dispatch
          </p>

          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome back
          </CardTitle>

          <CardDescription className="text-sm">
            Enter your details to sign in to your account.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-6 sm:px-8">
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
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="login-email">Email address</FieldLabel>

                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />

                      <Input
                        id="login-email"
                        name={field.name}
                        type="email"
                        autoComplete="username"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder="you@example.com"
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
                        className="h-11 rounded-lg pl-10"
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
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>

                    <div className="relative">
                      <LockKeyhole
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />

                      <Input
                        id="login-password"
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
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
                        className="h-11 rounded-lg pl-10 pr-12"
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={loginPending}
                        className="absolute right-1 top-1/2 size-9 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        aria-controls="login-password"
                        aria-pressed={showPassword}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" aria-hidden="true" />
                        ) : (
                          <Eye className="size-4" aria-hidden="true" />
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
                    className="h-11 w-full rounded-lg font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="size-4" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                );
              }}
            </form.Subscribe>
          </FieldGroup>
        </form>

        <FieldGroup className="mt-6 gap-5">
          <FieldSeparator>Or continue with</FieldSeparator>

          <Field>
            <GoogleLoginComponent />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
