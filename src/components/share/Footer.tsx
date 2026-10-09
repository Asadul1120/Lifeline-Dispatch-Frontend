import Link from "next/link";
import { Ambulance, ArrowUpRight, HeartPulse, ShieldCheck } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Sign in", href: "/login" },
  { label: "Create account", href: "/register" },
];

const serviceLinks = [
  { label: "Become a driver", href: "/driver-apply" },
  { label: "Patient dashboard", href: "/dashboard/patient" },
  { label: "Driver dashboard", href: "/dashboard/driver" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#092d2a] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label="Lifeline Dispatch home"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-300 text-emerald-950">
              <HeartPulse className="size-6" aria-hidden="true" />
            </span>
            <span className="text-xl font-bold tracking-tight">
              Lifeline{" "}
              <span className="font-normal text-emerald-200">Dispatch</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-50/70">
            Connecting patients, ambulance drivers, and dispatch teams through a
            clearer emergency transport workflow.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-emerald-100/70">
            <span className="inline-flex items-center gap-2">
              <Ambulance className="size-4" aria-hidden="true" /> Dispatch
              coordination
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4" aria-hidden="true" /> Managed
              access
            </span>
          </div>
        </div>
        <nav aria-label="Footer quick links">
          <h2 className="text-sm font-semibold text-white">Explore</h2>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-emerald-50/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer services">
          <h2 className="text-sm font-semibold text-white">Get involved</h2>
          <ul className="mt-5 space-y-3">
            {serviceLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm text-emerald-50/70 transition-colors hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10 px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 text-xs text-emerald-50/60 sm:flex-row lg:px-2">
          <span>
            © {new Date().getFullYear()} Lifeline Dispatch. All rights reserved.
          </span>
          <span>
            For life-threatening emergencies, contact local emergency services.
          </span>
        </div>
      </div>
    </footer>
  );
}
