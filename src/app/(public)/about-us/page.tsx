import {
  Ambulance,
  ArrowRight,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: HeartPulse,
    title: "Care Comes First",
    description:
      "Every feature we build is designed around one goal: helping people get the care and transport they need at the right time.",
  },
  {
    icon: ShieldCheck,
    title: "Safe and Reliable",
    description:
      "We focus on secure accounts, verified drivers, dependable ambulances and a transparent dispatch experience.",
  },
  {
    icon: UsersRound,
    title: "Connected Community",
    description:
      "Patients, drivers and administrators work together through one connected platform built for emergency response.",
  },
];

const features = [
  {
    icon: Ambulance,
    title: "Emergency Ambulance Requests",
    description:
      "Patients can submit emergency requests with pickup location, destination, emergency type and priority.",
  },
  {
    icon: MapPin,
    title: "Connected Dispatch",
    description:
      "The platform helps coordinate patients, drivers and ambulance operations from one central system.",
  },
  {
    icon: Stethoscope,
    title: "Patient-focused Experience",
    description:
      "From account registration to trip tracking and payment, the journey is designed to stay simple and clear.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero section */}
      <section className="relative isolate bg-emerald-950">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18),transparent_38%)]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
              <HeartPulse className="size-4" />
              Connected care for every moment
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About <span className="text-emerald-300">Lifeline Dispatch</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/75">
              Lifeline Dispatch is an emergency ambulance dispatch platform
              designed to connect patients with ambulance drivers and the people
              who help when every second matters.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-300"
              >
                Get started
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore the platform
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-emerald-400/10 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-300 text-emerald-950">
                    <HeartPulse className="size-6" />
                  </span>

                  <div>
                    <p className="font-semibold text-white">
                      Lifeline Dispatch
                    </p>
                    <p className="text-sm text-emerald-100/60">
                      Every connection matters
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-2 rounded-full bg-emerald-300/15 px-3 py-1.5 text-xs font-medium text-emerald-200">
                  <span className="size-2 rounded-full bg-emerald-300" />
                  Connected
                </span>
              </div>

              <div className="space-y-4 py-6">
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-300">
                      <Ambulance className="size-5" />
                    </span>

                    <div>
                      <p className="font-semibold text-white">
                        Emergency response
                      </p>
                      <p className="mt-1 text-sm leading-6 text-emerald-100/60">
                        Bringing patients, drivers and dispatch teams closer
                        together.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-bold text-emerald-300">24/7</p>
                    <p className="mt-1 text-sm text-emerald-100/60">
                      Ready when needed
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-bold text-emerald-300">3</p>
                    <p className="mt-1 text-sm text-emerald-100/60">
                      Connected roles
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-emerald-100/70">
                <ShieldCheck className="size-5 text-emerald-300" />
                Built with safety, clarity and trust in mind.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
              Our mission
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Making emergency transport more connected.
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-8 text-slate-600">
            <p>
              During an emergency, finding the right ambulance and getting
              reliable support should not feel complicated. Lifeline Dispatch
              brings the essential parts of that journey together in one
              platform.
            </p>

            <p>
              Patients can request emergency transport, drivers can manage
              trips, and administrators can coordinate operations through a
              structured and transparent system.
            </p>

            <p>
              Our vision is simple: use thoughtful technology to help people
              reach care with less uncertainty and more peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
              What guides us
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Built around people, not just technology.
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Every part of Lifeline Dispatch is shaped by the needs of
              patients, drivers and healthcare communities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Icon className="size-6" />
                  </span>

                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
              One connected platform
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Supporting the complete emergency journey.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              From the first request to the completed trip, Lifeline Dispatch
              helps each role stay informed and connected.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-5 font-semibold leading-6 text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-emerald-700 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="absolute -right-20 -top-24 size-64 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 size-64 rounded-full bg-emerald-950/20 blur-3xl" />

          <div className="relative">
            <HeartPulse className="mx-auto size-10 text-emerald-200" />

            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Be ready for the moments that matter.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-emerald-50/80">
              Join Lifeline Dispatch and experience a more connected way to
              manage emergency transport.
            </p>

            <Link
              href="/login"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
            >
              Sign in to continue
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
