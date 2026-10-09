import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Ambulance,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  ClipboardCheck,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Navigation,
  Route,
  ShieldCheck,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import HeroDemoLogin from "@/components/form/hero-demo-login";

export const metadata: Metadata = {
  title: "Lifeline Dispatch | Smarter Ambulance Coordination",
  description:
    "Connect patients, ambulance drivers and dispatch teams with coordinated requests and trip updates through Lifeline Dispatch.",
};

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Request assistance",
    description:
      "Share emergency details, pickup address and destination in a simple request.",
  },
  {
    number: "02",
    icon: Ambulance,
    title: "Get assigned",
    description:
      "Dispatch admins review the request and coordinate an available ambulance.",
  },
  {
    number: "03",
    icon: Navigation,
    title: "Follow trip updates",
    description:
      "Stay informed as the driver progresses through the assigned trip.",
  },
];

const roleCards = [
  {
    icon: UserRound,
    eyebrow: "PATIENT PORTAL",
    title: "Care begins with a request.",
    description:
      "Create emergency requests, review trip information and keep your profile updated.",
    href: "/register",
    action: "Get started",
  },
  {
    icon: Ambulance,
    eyebrow: "DRIVER PORTAL",
    title: "Be part of the response.",
    description:
      "Complete onboarding, manage availability and stay on top of assigned trips.",
    href: "/driver-apply",
    action: "Apply as driver",
  },
  {
    icon: UsersRound,
    eyebrow: "ADMIN PORTAL",
    title: "One place to coordinate.",
    description:
      "Manage ambulance resources, driver approvals and emergency assignments.",
    href: "/login",
    action: "Explore dashboard",
  },
];

const benefits = [
  {
    icon: MapPin,
    title: "Structured locations",
    description: "Keep pickup and destination details organized for the team.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    description:
      "Purpose-built spaces for patients, drivers and dispatch admins.",
  },
  {
    icon: Activity,
    title: "Visible progress",
    description:
      "Follow request and trip status from the appropriate dashboard.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-[#052e2b] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_15%,rgba(52,211,153,0.18),transparent_40%),radial-gradient(ellipse_at_0%_85%,rgba(16,185,129,0.12),transparent_46%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-140px] top-[-190px] size-[430px] rounded-full border border-emerald-200/10"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14 lg:px-8 lg:py-24">
          {/* Hero Left Content */}
          <div className="relative z-10">
            <Badge className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 text-emerald-200 shadow-none">
              <HeartPulse className="mr-1.5 size-3.5" aria-hidden="true" />
              Built for more connected emergency care
            </Badge>

            <h1 className="mt-7 max-w-1xl text-[2.7rem] leading-[1.08] font-bold tracking-[-0.045em] sm:text-6xl lg:text-[4rem] xl:text-[4.45rem]">
              Every moment matters.
              <span className="mt-2 block text-emerald-300">
                Every connection counts.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-emerald-50/75 sm:text-lg">
              From emergency requests to ambulance assignment and trip updates,
              Lifeline Dispatch keeps patients, drivers and dispatch teams
              connected.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-300 px-6 text-sm font-bold text-[#052e2b] shadow-lg shadow-black/10 transition hover:bg-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
              >
                Request an ambulance
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
              >
                How it works
                <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Three Demo Login Buttons */}
            <HeroDemoLogin />

            <p className="mt-5 text-xs leading-5 text-emerald-50/60">
              Facing an immediate life-threatening emergency? Contact your local
              emergency service directly.
            </p>
          </div>

          {/* Hero Right Ambulance Photo */}
          <div className="relative mx-auto w-full max-w-[590px] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2.5rem] border border-white/10 sm:-inset-4"
            />

            <div className="relative h-[410px] overflow-hidden rounded-[2rem] border border-white/20 bg-emerald-950 shadow-2xl shadow-black/30 sm:h-[510px] lg:h-[670px]">
              <Image
                src="https://images.unsplash.com/photo-1742016102687-46ee5f824f49?auto=format&fit=crop&w=1400&q=85"
                alt="Ambulance travelling along a city street with emergency lights on"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-[52%_center]"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#052e2b]/95 via-[#052e2b]/5 to-black/20"
              />

              {/* Photo Top Badge */}
              <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#052e2b]/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md sm:left-7 sm:top-7">
                <span className="mr-2 inline-block size-2 rounded-full bg-emerald-300" />
                Emergency transport coordination
              </div>

              {/* Floating Dispatch Workflow Card */}
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-white/95 p-4 text-slate-900 shadow-xl backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-5">
                <p className="text-[11px] font-bold tracking-[0.16em] text-emerald-700">
                  THE RESPONSE JOURNEY
                </p>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    {
                      icon: ClipboardCheck,
                      text: "Request",
                    },
                    {
                      icon: Ambulance,
                      text: "Dispatch",
                    },
                    {
                      icon: Navigation,
                      text: "Trip",
                    },
                  ].map(({ icon: Icon, text }, index) => (
                    <div key={text} className="flex items-center gap-2">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 sm:size-10">
                        <Icon className="size-4 sm:size-5" aria-hidden="true" />
                      </span>

                      <span className="text-xs font-semibold sm:text-sm">
                        {text}
                      </span>

                      {index !== 2 && (
                        <ChevronRight
                          className="hidden size-3 shrink-0 text-emerald-600 sm:block"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-[10px] text-slate-400">
                  Illustrative workflow · Not real-time dispatch data
                </p>
              </div>
            </div>

            <p className="mt-3 text-right text-[10px] text-emerald-50/50">
              Photo: Anthony Maw / Unsplash
            </p>
          </div>
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-7 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              icon: HeartHandshake,
              label: "Patient-focused",
              detail: "Simple emergency requests",
            },
            {
              icon: Route,
              label: "Coordinated dispatch",
              detail: "Clear ambulance assignment",
            },
            {
              icon: BadgeCheck,
              label: "Role-specific tools",
              detail: "Built for every team member",
            },
          ].map(({ icon: Icon, label, detail }) => (
            <div
              key={label}
              className="flex items-center gap-3 sm:justify-center"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="size-5" aria-hidden="true" />
              </span>

              <div>
                <p className="text-sm font-bold text-slate-900">{label}</p>

                <p className="mt-1 text-xs text-slate-500">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-[#f6faf8] px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-emerald-700">
              HOW IT WORKS
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              From request to response. Made simple.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A connected workflow that brings key updates and people together.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.number}
                  className="rounded-2xl border-slate-200 bg-white py-0 shadow-none transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/5"
                >
                  <CardContent className="p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>

                      <span className="text-3xl font-bold text-emerald-100">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-7 text-xl font-bold">{step.title}</h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Three User Roles */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-emerald-700">
              ONE PLATFORM · THREE ROLES
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Designed for everyone in the journey.
            </h2>
          </div>

          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            About our platform
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {roleCards.map((role) => {
            const Icon = role.icon;

            return (
              <Card
                key={role.eyebrow}
                className="group rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition-shadow hover:shadow-lg hover:shadow-emerald-950/5"
              >
                <CardContent className="flex h-full flex-col p-7">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
                    <Icon className="size-7" aria-hidden="true" />
                  </span>

                  <p className="mt-7 text-xs font-bold tracking-[0.15em] text-emerald-700">
                    {role.eyebrow}
                  </p>

                  <h3 className="mt-3 text-xl font-bold">{role.title}</h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {role.description}
                  </p>

                  <Link
                    href={role.href}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                  >
                    {role.action}

                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Why Choose Lifeline */}
      <section className="bg-[#f6faf8] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Stethoscope className="size-7" aria-hidden="true" />
            </span>

            <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
              Technology designed around care.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              A clearer way to submit requests, coordinate ambulance resources
              and follow trips—without unnecessary confusion.
            </p>

            <Link
              href="/about-us"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Learn more
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <Icon
                    className="size-7 text-emerald-700"
                    aria-hidden="true"
                  />

                  <h3 className="mt-5 font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-emerald-700 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-emerald-400/20 blur-3xl"
          />

          <HeartPulse
            className="relative mx-auto size-10 text-emerald-200"
            aria-hidden="true"
          />

          <h2 className="relative mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build a more connected response.
          </h2>

          <p className="relative mx-auto mt-5 max-w-xl leading-7 text-emerald-50/80">
            Create an account to get started or sign in to access your
            role-based dashboard.
          </p>

          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
            >
              Create account
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>

            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>

          <p className="relative mt-8 text-xs text-emerald-100/70">
            For life-threatening emergencies, contact your local emergency
            service.
          </p>
        </div>
      </section>
    </div>
  );
}
