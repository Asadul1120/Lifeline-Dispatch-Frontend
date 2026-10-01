"use client";

import { ArrowRight, HeartPulse, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const routes = [
  { name: "Home", url: "/" },
  { name: "About us", url: "/about-us" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur"
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsMenuOpen(false);
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Lifeline Dispatch home"
          className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm transition-colors group-hover:bg-emerald-800">
            <HeartPulse aria-hidden="true" className="size-6" />
          </span>

          <span className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-tight text-slate-900">
              Lifeline
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Dispatch
            </span>
          </span>
        </Link>

        <nav
          id="header-navigation"
          aria-label="Main navigation"
          className={`absolute inset-x-0 top-full border-b border-slate-200 bg-white p-4 shadow-sm md:static md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <ul className="flex flex-col gap-1 rounded-2xl bg-slate-50 p-1.5 md:flex-row md:items-center md:rounded-full">
            {routes.map((route) => {
              const isActive = pathname === route.url;

              return (
                <li key={route.url}>
                  <Link
                    href={route.url}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-xl px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 md:rounded-full ${
                      isActive
                        ? "bg-white text-emerald-700 shadow-sm"
                        : "text-slate-600 hover:bg-white hover:text-emerald-700"
                    }`}
                  >
                    {route.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            render={<Link href="/login" onClick={() => setIsMenuOpen(false)} />}
            nativeButton={false}
            className="h-10 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:ring-emerald-500/30 sm:px-5"
          >
            Sign in
            <ArrowRight aria-hidden="true" className="hidden size-4 sm:block" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            aria-controls="header-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="size-10 rounded-xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 md:hidden"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
