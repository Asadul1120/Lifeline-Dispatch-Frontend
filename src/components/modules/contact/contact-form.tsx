"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.email("Enter a valid email address."),
  subject: z.enum(
    [
      "General Inquiry",
      "Account Support",
      "Driver Application",
      "Trip or Payment",
      "Other",
    ],
    { error: "Choose a subject." },
  ),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message is too long."),
});

type ContactValues = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactValues, string>>;

const initialValues: ContactValues = {
  name: "",
  email: "",
  subject: "General Inquiry",
  message: "",
};

export default function ContactForm({
  supportEmail,
}: {
  supportEmail: string;
}) {
  const [values, setValues] = useState<ContactValues>(initialValues);

  const [errors, setErrors] = useState<FormErrors>({});

  const configured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supportEmail);

  function updateField<K extends keyof ContactValues>(
    key: K,
    value: ContactValues[K],
  ) {
    setValues((previous) => ({
      ...previous,
      [key]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [key]: undefined,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FormErrors = {};

      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactValues | undefined;

        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }

      setErrors(nextErrors);

      toast.error("Please check the form fields.");
      return;
    }

    if (!configured) {
      toast.error("Support email is not configured.");
      return;
    }

    const data = parsed.data;

    const emailSubject = `[Lifeline Dispatch] ${data.subject}`;

    const emailBody = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Topic: ${data.subject}`,
      "",
      "Message:",
      data.message,
    ].join("\n");

    const mailtoUrl =
      `mailto:${supportEmail}` +
      `?subject=${encodeURIComponent(emailSubject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;

    toast.info(
      "Your email application should open. Please press Send there to submit your message.",
    );
  }

  return (
    <Card className="rounded-[2rem] border border-slate-200 bg-white py-0 shadow-xl shadow-slate-900/5">
      <CardContent className="p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Mail className="size-6" />
          </span>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Send us a message
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fill out the form to compose an email.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Full Name *</Label>

              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
                className="h-12 rounded-xl bg-slate-50 px-4 text-sm"
              />

              {errors.name && (
                <p id="contact-name-error" className="text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Email Address *</Label>

              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                className="h-12 rounded-xl bg-slate-50 px-4 text-sm"
              />

              {errors.email && (
                <p id="contact-email-error" className="text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-subject">Subject *</Label>

            <select
              id="contact-subject"
              name="subject"
              value={values.subject}
              onChange={(event) =>
                updateField(
                  "subject",
                  event.target.value as ContactValues["subject"],
                )
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="General Inquiry">General Inquiry</option>

              <option value="Account Support">Account Support</option>

              <option value="Driver Application">Driver Application</option>

              <option value="Trip or Payment">Trip or Payment</option>

              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Your Message *</Label>

            <textarea
              id="contact-message"
              name="message"
              rows={6}
              maxLength={2000}
              placeholder="Tell us how we can help..."
              value={values.message}
              onChange={(event) => updateField("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />

            <div className="flex items-center justify-between gap-3">
              {errors.message ? (
                <p id="contact-message-error" className="text-xs text-red-600">
                  {errors.message}
                </p>
              ) : (
                <p className="text-xs text-slate-500">At least 10 characters</p>
              )}

              <span className="text-xs text-slate-400">
                {values.message.length}/2000
              </span>
            </div>
          </div>

          {!configured && (
            <p
              role="status"
              className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-6 text-amber-800"
            >
              Email contact is not set up yet. Configure
              NEXT_PUBLIC_SUPPORT_EMAIL to activate this form.
            </p>
          )}

          <Button
            type="submit"
            disabled={!configured}
            className="h-12 w-full rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            <Send className="mr-2 size-4" />
            Continue in email app
          </Button>

          <p className="text-center text-xs leading-6 text-slate-500">
            This opens an email draft. Your message is not sent until you press
            Send in your email app.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
