"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
  HiOutlineCheckCircle2,
  HiOutlineQrCode,
  HiOutlineKey,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export default function LoginCTA() {
  return (
    <section id="login" className="relative py-20 sm:py-28 text-left w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300">
              02 / Role-Based Portals
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Find Your Place on Campus.
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
            Choose your role to access your dedicated workspace. Tailored for
            curious students and visionary club leaders alike.
          </p>
        </div>

        {/* Two Premium Glass Panels */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Panel 1: Student / Member */}
          <div className="group relative rounded-3xl border border-white/12 bg-[#0b0b0e]/90 p-8 sm:p-9 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:bg-[#101014] hover:-translate-y-1">
            {/* Inner highlight */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black shadow-xs">
                  <HiOutlineAcademicCap className="text-2xl" />
                </div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest bg-white/[0.04] border border-white/8 px-3 py-1 rounded-full">
                  Student Portal
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Student / Club Member
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                  Explore clubs, submit 1-click membership requests, claim digital event passes, and collaborate with peers across campus.
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="pt-2 space-y-2.5 border-t border-white/8 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Instant membership applications with real-time status</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Digital QR event passes for campus workshops and hackathons</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Official club announcements and direct recruitment alerts</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-white/8 space-y-3">
              <Link
                href="/Login"
                className="group/btn flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm transition-all hover:bg-neutral-200 active:scale-95 cursor-pointer shadow-xs"
              >
                <span>Login as Student</span>
                <HiOutlineArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
              </Link>

              <div className="text-center">
                <Link
                  href="/register"
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  New to BroClubs? <span className="underline font-medium text-white">Create a student account →</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Panel 2: Club President / Leadership */}
          <div className="group relative rounded-3xl border border-white/12 bg-[#0b0b0e]/90 p-8 sm:p-9 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:bg-[#101014] hover:-translate-y-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] text-white">
                  <HiOutlineShieldCheck className="text-2xl text-white" />
                </div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest bg-white/[0.04] border border-white/8 px-3 py-1 rounded-full">
                  Executive Console
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Club President / Head
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                  Manage your club charter, review membership candidate rosters, coordinate executive permissions, and publish official campus events.
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="pt-2 space-y-2.5 border-t border-white/8 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Passkey-protected executive authorization and signoffs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>1-click candidate review, approvals, and roster controls</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Publish official events with attendance tracking</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-white/8 space-y-3">
              <Link
                href="/Login"
                className="group/btn flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] text-white font-semibold text-xs sm:text-sm transition-all hover:bg-white/[0.12] hover:border-white/30 active:scale-95 cursor-pointer backdrop-blur-md"
              >
                <span>Login as President</span>
                <HiOutlineArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
              </Link>

              <div className="text-center">
                <span className="text-[11px] font-mono text-neutral-400">
                  Protected with executive passkey authentication
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
