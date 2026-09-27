"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/dashboard/teacher", label: "Teacher" },
  { href: "/dashboard/parent", label: "Parent" },
  { href: "#trust", label: "Trust" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-6 md:px-10">
        <Link href="/" className="text-sm font-semibold tracking-tight text-white" onClick={() => setOpen(false)}>
          ChildDevOS
        </Link>
        <nav className="hidden items-center gap-3 text-sm text-white/70 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-3 py-1.5 hover:bg-white/5 hover:text-white">
              {l.label}
            </Link>
          ))}
          <Link href="/dashboard/teacher" className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-950">
            Teacher app
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/dashboard/teacher" className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-950" onClick={() => setOpen(false)}>
            Teacher
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white"
            aria-expanded={open}
            aria-controls="childdevos-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="childdevos-mobile-nav"
          className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/10 px-6 py-4 md:hidden"
          aria-label="Mobile"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-3 text-white/90 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
