"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import SpotlightCard from "@/Components/ui/SpotlightCard";

export default function LoginCTA() {
  return (
    <section id="login" className="relative py-20 sm:py-28 text-left w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="eyebrow-pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
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

        {/* Two Premium Skipper UI Spotlight Panels */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Panel 1: Student / Member */}
          <SpotlightCard
            spotlightColor="rgba(255, 255, 255, 0.06)"
            borderColor="rgba(255, 255, 255, 0.25)"
            className="p-8 sm:p-9 shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black shadow-xs">
                  <HiOutlineAcademicCap className="text-2xl" />
                </div>
                <span className="badge-pill font-mono text-xs text-neutral-400 uppercase tracking-widest bg-white/[0.04] border border-white/8 px-3 py-1 rounded-full">
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
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Instant membership applications with real-time status</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Digital QR event passes for campus workshops and hackathons</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Official club announcements and direct recruitment alerts</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-white/8 space-y-3">
              <Link
                href="/student"
                className="group/btn flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm transition-all hover:bg-neutral-200 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer shadow-xs"
              >
                <span>Enter Student Portal</span>
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
          </SpotlightCard>

          {/* Panel 2: Club President / Leadership */}
          <SpotlightCard
            spotlightColor="rgba(139, 92, 246, 0.12)"
            borderColor="rgba(139, 92, 246, 0.4)"
            className="p-8 sm:p-9 shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/[0.08] text-violet-300">
                  <HiOutlineShieldCheck className="text-2xl" />
                </div>
                <span className="font-mono text-xs text-violet-300 uppercase tracking-widest bg-violet-500/[0.06] border border-violet-500/20 px-3 py-1 rounded-full">
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
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Passkey-protected executive authorization and signoffs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>1-click candidate review, approvals, and roster controls</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Publish official events with attendance tracking</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-white/8 space-y-3">
              <Link
                href="/president"
                className="group/btn flex h-12 w-full items-center justify-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/[0.06] text-white font-semibold text-xs sm:text-sm transition-all hover:bg-violet-500/[0.12] hover:border-violet-500/50 hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] active:scale-95 cursor-pointer backdrop-blur-md"
              >
                <span>Enter President Portal</span>
                <HiOutlineArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
              </Link>

              <div className="text-center">
                <span className="text-[11px] font-mono text-neutral-400">
                  Protected with executive passkey authentication
                </span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
