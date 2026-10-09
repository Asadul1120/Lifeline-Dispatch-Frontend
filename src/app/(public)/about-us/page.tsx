import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  Activity,
  Ambulance,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
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

export const metadata: Metadata = {
  title: "About Us | Lifeline Dispatch",
  description:
    "Learn about Lifeline Dispatch, our mission, values and connected ambulance dispatch platform for patients, drivers and administrators.",
};

const values = [
  {
    icon: HeartPulse,
    number: "01",
    title: "Care Comes First",
    description:
      "Every feature we build focuses on helping people request care and emergency transport with greater clarity.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Safety & Trust",
    description:
      "We focus on managed driver onboarding, secure role-based access and transparent dispatch workflows.",
  },
  {
    icon: UsersRound,
    number: "03",
    title: "Connected Community",
    description:
      "Patients, ambulance drivers and administrators work together through one connected platform.",
  },
];

const features = [
  {
    icon: ClipboardList,
    title: "Emergency Requests",
    description:
      "Patients can submit emergency requests with pickup locations, destinations and emergency details.",
  },
  {
    icon: Ambulance,
    title: "Ambulance Coordination",
    description:
      "Administrators can manage ambulances, review requests and assign available resources.",
  },
  {
    icon: Navigation,
    title: "Trip Management",
    description:
      "Drivers can manage assigned trips while patients follow their trip status updates.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Dashboards",
    description:
      "Dedicated experiences for patients, drivers and administrators help keep information organized.",
  },
];

const workflow = [
  {
    number: "01",
    icon: UserRound,
    title: "Patient requests help",
    description:
      "An emergency request is created with the necessary information.",
  },
  {
    number: "02",
    icon: UsersRound,
    title: "Admin coordinates dispatch",
    description:
      "The request is reviewed and an available ambulance is assigned.",
  },
  {
    number: "03",
    icon: Ambulance,
    title: "Driver manages the trip",
    description:
      "The assigned driver updates the trip through its different stages.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden bg-[#052e2b] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(52,211,153,0.18),transparent_45%),radial-gradient(ellipse_at_0%_85%,rgba(16,185,129,0.13),transparent_45%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 size-[450px] rounded-full border border-white/10"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8 lg:py-24">
          {/* Hero Left */}
          <div className="relative z-10">
            <Badge className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 text-emerald-200 shadow-none">
              <HeartPulse className="mr-1.5 size-3.5" aria-hidden="true" />
              GET TO KNOW US
            </Badge>

            <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] sm:text-5xl lg:text-[3.7rem]">
              Driven by care.
              <span className="mt-2 block text-emerald-300">
                Connected by purpose.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-emerald-50/75 sm:text-lg">
              Lifeline Dispatch is an ambulance coordination platform connecting
              patients, drivers and dispatch teams through a simpler emergency
              transport experience.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/65">
              We believe thoughtful technology can make critical workflows
              clearer and help everyone involved stay better informed.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-300 px-6 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-200"
              >
                Get started
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href="#our-mission"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Discover our mission
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Hero Bottom Highlights */}
            <div className="mt-11 grid grid-cols-3 gap-3 border-t border-white/15 pt-6">
              {[
                {
                  icon: HeartHandshake,
                  label: "Patient care",
                },
                {
                  icon: Route,
                  label: "Dispatch",
                },
                {
                  icon: BadgeCheck,
                  label: "Teamwork",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>

                    <span className="text-xs font-medium text-emerald-50/80 sm:text-sm">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Right Photo */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2.4rem] border border-emerald-300/10 sm:-inset-4"
            />

            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-emerald-400/10 blur-3xl"
            />

            <div className="relative h-[430px] overflow-hidden rounded-[2rem] border border-white/20 bg-emerald-950 shadow-2xl shadow-black/30 sm:h-[530px] lg:h-[610px]">
              <Image
                src="https://images.unsplash.com/photo-1780570348966-051be4416237?auto=format&fit=crop&w=1500&q=85"
                alt="Emergency medical responders loading a stretcher into an ambulance"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#052e2b]/90 via-transparent to-black/20" />

              {/* Top Photo Badge */}
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#052e2b]/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:left-7 sm:top-7">
                <span className="size-2 rounded-full bg-emerald-300" />A
                people-first approach
              </div>

              {/* Glass Overlay Card */}
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-white/95 p-5 text-slate-900 shadow-xl backdrop-blur-xl sm:inset-x-7 sm:bottom-7 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <HeartPulse className="size-6" aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-700">
                      OUR PURPOSE
                    </p>

                    <h2 className="mt-1 text-lg font-bold sm:text-xl">
                      Every connection matters.
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
                      Bringing people, information and emergency transport
                      workflows together.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-right text-[10px] text-emerald-50/50">
              Photo: Jacob Narkiewicz / Unsplash
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTRO STRIP ================= */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              icon: UserRound,
              title: "For patients",
              description: "Accessible requests",
            },
            {
              icon: Ambulance,
              title: "For drivers",
              description: "Organized trips",
            },
            {
              icon: UsersRound,
              title: "For administrators",
              description: "Coordinated dispatch",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-3 sm:justify-center"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>

                <div>
                  <p className="text-sm font-bold">{item.title}</p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= OUR MISSION ================= */}
      <section id="our-mission" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Mission Photo */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -bottom-4 -left-4 size-36 rounded-3xl bg-emerald-100 sm:-bottom-6 sm:-left-6" />

            <div className="relative h-[350px] overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-900/10 sm:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1619025873875-59dfdd2bbbd6?auto=format&fit=crop&w=1400&q=85"
                alt="An ambulance travelling through a city street"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-300 text-emerald-950">
                    <Ambulance className="size-5" aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-sm font-bold">
                      Better connected journeys
                    </p>

                    <p className="text-xs text-white/75">
                      From request to completed trip
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Photography: Lalithmalhaar Gudi / Unsplash
            </p>
          </div>

          {/* Mission Content */}
          <div className="order-1 lg:order-2">
            <Badge className="rounded-full border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-700 shadow-none">
              OUR MISSION
            </Badge>

            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Making emergency transport
              <span className="block text-emerald-700">
                simpler and more connected.
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              During an emergency, finding the right ambulance and getting
              reliable support should not feel complicated.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Lifeline Dispatch brings patients, ambulance drivers and dispatch
              administrators together through a structured platform.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Simpler emergency request management",
                "Clear ambulance and driver coordination",
                "Organized trip status information",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    className="size-5 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              Join Lifeline Dispatch
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="bg-[#f6faf8] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.22em] text-emerald-700">
              WHAT GUIDES US
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Built around people.
              <span className="block text-emerald-700">Guided by purpose.</span>
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Our values shape how we design a more thoughtful emergency
              dispatch experience.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <Card
                  key={value.number}
                  className="group rounded-2xl border-slate-200 bg-white py-0 shadow-none transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/5"
                >
                  <CardContent className="p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-200">
                        <Icon className="size-7" aria-hidden="true" />
                      </span>

                      <span className="text-3xl font-bold text-emerald-100">
                        {value.number}
                      </span>
                    </div>

                    <h3 className="mt-7 text-xl font-bold text-slate-900">
                      {value.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PLATFORM FEATURES ================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-[0.2em] text-emerald-700">
                WHAT WE DO
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                One platform.
                <span className="block text-emerald-700">
                  A connected experience.
                </span>
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                From the first emergency request to the completed trip, our
                platform helps each role stay informed.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Explore platform
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="group rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition-shadow hover:shadow-lg hover:shadow-emerald-950/5"
                >
                  <CardContent className="p-6">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>

                    <h3 className="mt-6 text-lg font-bold text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CONNECTED WORKFLOW ================= */}
      <section className="bg-[#f6faf8] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Stethoscope className="size-7" aria-hidden="true" />
            </span>

            <p className="mt-7 text-xs font-bold tracking-[0.2em] text-emerald-700">
              HOW WE CONNECT
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Three roles.
              <span className="block text-emerald-700">
                One shared mission.
              </span>
            </h2>

            <p className="mt-6 max-w-md leading-8 text-slate-600">
              Patients, administrators and ambulance drivers each play an
              important part. Lifeline Dispatch provides a dedicated workflow
              for each role.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Explore the dashboards
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="space-y-0">
              {workflow.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.number} className="flex gap-4 sm:gap-5">
                    <div className="flex flex-col items-center">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>

                      {index !== workflow.length - 1 && (
                        <span className="my-2 h-12 w-px bg-emerald-200 sm:h-14" />
                      )}
                    </div>

                    <div className="min-w-0 pt-1">
                      <p className="text-[11px] font-bold tracking-widest text-emerald-700">
                        STEP {step.number}
                      </p>

                      <h3 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
              <Activity
                className="size-5 shrink-0 text-emerald-700"
                aria-hidden="true"
              />

              <p className="text-xs font-medium leading-6 text-emerald-900">
                Designed to keep the emergency journey organized, from request
                to trip completion.
              </p>
            </div>
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

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-emerald-950/30 blur-3xl"
          />

          <div className="relative">
            <HeartPulse
              className="mx-auto size-10 text-emerald-200"
              aria-hidden="true"
            />

            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              A more connected journey starts here.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-8 text-emerald-50/80">
              Join Lifeline Dispatch and discover a simpler way to request,
              coordinate and manage emergency ambulance transport.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-emerald-900 transition-colors hover:bg-emerald-50"
              >
                Create your account
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>

            <p className="mt-8 text-xs text-emerald-100/70">
              For an immediate life-threatening emergency, contact your local
              emergency services.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
