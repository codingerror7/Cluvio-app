"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineSquares2X2,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#070B13] text-white">
      <div className="grid min-h-screen lg:grid-cols-12">
        {/* Left Branding Showcase (Desktop) */}
        <section className="relative hidden lg:col-span-5 lg:flex xl:col-span-5 overflow-hidden border-r border-white/10">
          {/* Ambient Lighting Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#070B13]" />
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[140px] pointer-events-none" />

          {/* Foreground Content */}
          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Header Brand */}
            <div>
              <Link
                href="/"
                className="group inline-flex items-center gap-3.5 transition-opacity hover:opacity-90"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/30 transition-transform group-hover:scale-105">
                  <HiOutlineSquares2X2 className="text-2xl text-[var(--accent)]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">
                    Cluvio
                  </h1>
                  <p className="text-xs text-white/45">
                    Club Management Platform
                  </p>
                </div>
              </Link>
            </div>

            {/* Hero Copy */}
            <div className="max-w-lg my-auto py-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[var(--accent)]">
                <HiOutlineSparkles className="text-sm" />
                Modern Campus Management
              </span>

              <h2 className="mt-8 text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] text-white">
                Build
                <br />
                <span className="text-[var(--accent)]">Better</span>
                <br />
                Communities.
              </h2>

              <p className="mt-6 text-base xl:text-lg leading-relaxed text-white/60">
                Join thousands of students and club leaders managing events, members, and student organizations from one beautifully unified platform.
              </p>

              {/* Feature Highlights */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40 mb-1">
                    <HiOutlineUserGroup className="text-sm text-[var(--accent)]" />
                    <span>Clubs</span>
                  </div>
                  <p className="text-xl font-bold text-white">50+</p>
                  <p className="text-[11px] text-white/40">Active Orgs</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40 mb-1">
                    <HiOutlineCalendarDays className="text-sm text-[var(--accent)]" />
                    <span>Events</span>
                  </div>
                  <p className="text-xl font-bold text-white">200+</p>
                  <p className="text-[11px] text-white/40">Per Semester</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40 mb-1">
                    <HiOutlineShieldCheck className="text-sm text-[var(--accent)]" />
                    <span>Verified</span>
                  </div>
                  <p className="text-xl font-bold text-white">100%</p>
                  <p className="text-[11px] text-white/40">Campus Safe</p>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="text-xs text-white/40 flex items-center justify-between">
              <span>© {new Date().getFullYear()} Cluvio Inc.</span>
              <Link href="/" className="hover:text-white transition-colors">
                ← Back to Homepage
              </Link>
            </div>
          </div>
        </section>

        {/* Right Form Area */}
        <section className="flex lg:col-span-7 xl:col-span-7 flex-col justify-center px-4 py-8 sm:px-8 sm:py-12 md:px-12 lg:px-16 overflow-y-auto">
          {/* Mobile Brand Header */}
          <div className="mb-8 flex items-center justify-between lg:hidden max-w-md mx-auto w-full">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/30">
                <HiOutlineSquares2X2 className="text-xl text-[var(--accent)]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Cluvio</h1>
                <p className="text-[11px] text-white/45">Club Platform</p>
              </div>
            </Link>

            <Link
              href="/"
              className="text-xs font-medium text-white/50 hover:text-white transition-colors"
            >
              Home →
            </Link>
          </div>

          {/* Auth Card Content */}
          <div className="w-full">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
