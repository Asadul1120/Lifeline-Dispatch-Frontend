import type { Metadata } from "next";

import LoginForm from "@/components/form/login-form";

export const metadata: Metadata = {
  title: "Login | Lifeline Dispatch",
  description: "Sign in to your Lifeline Dispatch account.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
