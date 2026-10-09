
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Ambulance,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Headphones,
  HeartPulse,
  LifeBuoy,
  Mail,
  MessageCircle,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/modules/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Lifeline Dispatch",
  description:
    "Get in touch with Lifeline Dispatch for patient support, driver assistance, account questions, and platform inquiries.",
};

const supportTopics = [
  {
    icon: UserRound,
    title: "Patient Support",
    description:
      "Questions about your patient account, emergency requests, or trip information.",
    label: "Patient inquiries",
  },
  {
    icon: Ambulance,
    title: "Driver Assistance",
    description:
      "Get guidance on driver applications, account access, and assigned trips.",
    label: "Driver inquiries",
  },
  {
    icon: UsersRound,
    title: "General Inquiries",
    description:
      "Have a question about Lifeline Dispatch or want to share feedback?",
    label: "Platform inquiries",
  },
];

const faqs = [
  {
    question: "How can I request an ambulance?",
    answer:
      "Register as a patient, sign in to your dashboard, and create an emergency request with the required pickup and emergency details.",
  },
  {
    question: "How do I apply to become a driver?",
    answer:
      "Visit the driver application page, provide the required information, and submit your application for administrator review.",
  },
  {
    question: "Where can I check my trip status?",
    answer:
      "Sign in to your patient dashboard to review your emergency requests and available trip status information.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Complete the contact form on this page. It prepares an email draft, which you can send using your email application.",
  },
];

export default function ContactPage() {
  const supportEmail =
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "";

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden bg-[#052e2b] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_10%,rgba(52,211,153,0.18),transparent_45%),radial-gradient(ellipse_at_5%_90%,rgba(16,185,129,0.13),transparent_45%)]"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8 lg:py-24">
          {/* Hero Content */}
          <div className="relative z-10">
            <Badge className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-1.5 text-emerald-200 shadow-none">
              <MessageCircle className="mr-2 size-4" />
              CONTACT & SUPPORT
            </Badge>

            <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] sm:text-5xl lg:text-[3.9rem]">
              Here to listen.
              <span className="mt-2 block text-emerald-300">
                Here to help.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-emerald-50/75 sm:text-lg">
              Have a question about your account, driver
              application, emergency request or trip?
              Lifeline Dispatch makes it easier to find
              information and get in touch.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/60">
              Choose a support topic, prepare your message,
              and connect through our contact email.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#contact-form"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-300 px-6 text-sm font-bold text-emerald-950 transition hover:bg-emerald-200"
              >
                Send a message
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="#faq"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse FAQs
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            {/* Small Hero Features */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">
                    Dedicated topics
                  </p>
                  <p className="text-xs text-white/55">
                    Organized inquiries
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                  <LifeBuoy className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">
                    Helpful answers
                  </p>
                  <p className="text-xs text-white/55">
                    Support and FAQs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Ambulance Image */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2.5rem] border border-emerald-300/10 sm:-inset-4"
            />

            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-emerald-400/10 blur-3xl"
            />

            <div className="relative h-[430px] overflow-hidden rounded-[2rem] border border-white/20 bg-emerald-950 shadow-2xl shadow-black/30 sm:h-[520px] lg:h-[610px]">
              <Image
                src="https://images.unsplash.com/photo-1619025873875-59dfdd2bbbd6?auto=format&fit=crop&w=1500&q=85"
                alt="Emergency ambulance representing medical transport and response services"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#052e2b]/90 via-[#052e2b]/10 to-black/20" />

              {/* Floating Top Label */}
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#052e2b]/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:left-7 sm:top-7">
                <span className="size-2 rounded-full bg-emerald-300" />
                Lifeline Dispatch
              </div>

              {/* Glass Information Card */}
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-white/95 p-5 text-slate-900 shadow-xl backdrop-blur-xl sm:inset-x-7 sm:bottom-7 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Headphones className="size-6" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-700">
                      SUPPORT & CONNECTION
                    </p>

                    <h2 className="mt-1 text-lg font-bold sm:text-xl">
                      Let&apos;s stay connected.
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
                      Questions, feedback, and support
                      inquiries in one convenient place.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  {["Patient", "Driver", "General"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700"
                      >
                        {item} Support
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT TOPICS ================= */}
      <section className="bg-[#f6faf8] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-emerald-700">
              HOW CAN WE HELP?
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Find the right support.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Whether you&apos;re a patient, driver, or
              exploring the platform, you can reach out
              with your questions.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {supportTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <Card
                  key={topic.title}
                  className="group rounded-2xl border-slate-200 bg-white py-0 shadow-none transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/5"
                >
                  <CardContent className="flex h-full flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-200">
                        <Icon className="size-7" />
                      </span>

                      <ArrowUpRight className="size-5 text-slate-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-700" />
                    </div>

                    <p className="mt-7 text-xs font-bold tracking-[0.12em] text-emerald-700">
                      {topic.label.toUpperCase()}
                    </p>

                    <h3 className="mt-3 text-xl font-bold">
                      {topic.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                      {topic.description}
                    </p>

                    <Link
                      href="#contact-form"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                    >
                      Contact us
                      <ArrowRight className="size-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section
        id="contact-form"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left Information */}
          <div>
            <Badge className="border-emerald-100 bg-emerald-50 px-3 py-1.5 text-emerald-700 shadow-none">
              LET&apos;S TALK
            </Badge>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Start a conversation.
              <span className="mt-1 block text-emerald-700">
                We&apos;re listening.
              </span>
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-slate-600">
              Share your questions, feedback, or concerns
              through our contact form. We&apos;ve made it
              simple to prepare an email with all the
              necessary details.
            </p>

            {/* Contact Information */}
            <div className="mt-9 space-y-5">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Mail className="size-5" />
                </span>

                <div className="min-w-0">
                  <p className="font-bold">
                    Email support
                  </p>

                  {supportEmail ? (
                    <a
                      href={`mailto:${supportEmail}`}
                      className="mt-1 block break-all text-sm text-emerald-700 hover:underline"
                    >
                      {supportEmail}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-slate-500">
                      Support email not configured
                    </p>
                  )}

                  <p className="mt-2 text-xs text-slate-500">
                    For non-emergency inquiries
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Clock3 className="size-5" />
                </span>

                <div>
                  <p className="font-bold">
                    General support
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This email channel is intended
                    for questions and feedback, not
                    urgent dispatch.
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <Activity className="mt-0.5 size-6 shrink-0 text-amber-700" />

                <div>
                  <p className="font-bold text-amber-950">
                    Experiencing a medical emergency?
                  </p>

                  <p className="mt-2 text-sm leading-7 text-amber-900/85">
                    Do not use this contact form for an
                    immediate life-threatening emergency.
                    Contact your local emergency services
                    directly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Existing Validated Form */}
          <ContactForm supportEmail={supportEmail} />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section
        id="faq"
        className="scroll-mt-24 bg-[#f6faf8] px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <MessageCircle className="size-7" />
            </span>

            <p className="mt-6 text-xs font-bold tracking-[0.2em] text-emerald-700">
              FREQUENTLY ASKED QUESTIONS
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Have questions?
              <span className="block text-emerald-700">
                Find your answers.
              </span>
            </h2>

            <p className="mt-5 text-slate-600">
              Here are some common questions about
              Lifeline Dispatch.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition-shadow open:shadow-md sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  {faq.question}

                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
                  </span>
                </summary>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-emerald-700 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-emerald-400/20 blur-3xl"
          />

          <HeartPulse className="relative mx-auto size-10 text-emerald-200" />

          <h2 className="relative mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Stay connected with Lifeline Dispatch.
          </h2>

          <p className="relative mx-auto mt-5 max-w-xl leading-7 text-emerald-50/80">
            Explore our platform, get started as a patient,
            or learn more about how we connect emergency
            transport workflows.
          </p>

          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50"
            >
              Create account
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/about-us"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              About us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
