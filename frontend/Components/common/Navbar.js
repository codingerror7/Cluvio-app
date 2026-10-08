"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/About" },
  { label: "How It Works", href: "/Howitworks" },
  { label: "Documentation", href: "/Documentation" },
  { label: "Contact", href: "/Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.toLowerCase().startsWith(href.toLowerCase());
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070B13]/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/30 transition-transform group-hover:scale-105">
            <HiOutlineSquares2X2 className="text-2xl text-[var(--accent)]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">Cluvio</span>
              <span className="rounded-full bg-[var(--accent)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)] uppercase tracking-wider">
                Campus
              </span>
            </div>
            <p className="text-[11px] text-white/40 font-medium">Club Management Platform</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`
                  rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-white/10 text-white shadow-xs"
                      : "text-white/65 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/Login"
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)] active:scale-95"
          >
            <span>Get Started</span>
            <HiOutlineArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {mobileMenuOpen ? (
              <HiOutlineXMark className="text-2xl" />
            ) : (
              <HiOutlineBars3 className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0B1120] px-4 py-6 sm:px-6 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition
                    ${
                      active
                        ? "bg-white/10 text-white border-l-2 border-[var(--accent)]"
                        : "text-white/65 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <span>{link.label}</span>
                  {active && <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5">
            <Link
              href="/Login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-sm font-semibold text-black transition hover:brightness-110"
            >
              <span>Get Started Free</span>
              <HiOutlineArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
