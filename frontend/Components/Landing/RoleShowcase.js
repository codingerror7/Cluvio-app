"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineKey,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
} from "react-icons/hi2";

export default function RoleShowcase() {
  const roles = [
    {
      title: "Student",
      subtitle: "Campus Explorer",
      badge: "Open Access",
      keyRequired: false,
      icon: HiOutlineAcademicCap,
      description: "Explore 50+ clubs, apply with 1-click, and track approval status.",
      features: [
        "Discover 50+ campus clubs",
        "1-click membership applications",
        "Instant approval alerts",
      ],
    },
    {
      title: "Club Member",
      subtitle: "Active Contributor",
      badge: "Key Required",
      keyRequired: true,
      icon: HiOutlineUserGroup,
      description: "Participate in internal committees, societies, and member-only fests.",
      features: [
        "Verified member status badge",
        "Exclusive event RSVP access",
        "Protected with secret key",
      ],
    },
    {
      title: "Club Head",
      subtitle: "Club President & Executive Leader",
      badge: "Key Required",
      keyRequired: true,
      icon: HiOutlineShieldCheck,
      description: "Full administrative power to approve candidates, publish events, and manage rosters.",
      features: [
        "Review & approve candidate applications",
        "Publish events & digital QR entry passes",
        "Manage member rosters & semester handovers",
        "Full Executive Management Console access",
      ],
    },
  ];

  return (
    <section id="roles" className="py-7 sm:py-10 relative">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE: Heading + Paragraph + Key Benefits */}
          <div className="lg:col-span-4 order-1 lg:sticky lg:top-24 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span>Role-Based Campus Architecture</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-black text-slate-900 tracking-tight leading-tight">
              <span className="block">Built for Students,</span>
              <span className="block text-slate-900">Trusted by Club Leaders.</span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              Dedicated portals tailored for every campus role with secure passcode authorization.
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <HiOutlineCheckCircle className="text-blue-600 text-base shrink-0" />
                <span>3 customized access portals</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <HiOutlineCheckCircle className="text-blue-600 text-base shrink-0" />
                <span>Passkey-protected leadership</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <HiOutlineCheckCircle className="text-blue-600 text-base shrink-0" />
                <span>Live member & roster sync</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
              >
                <span>Get Started with BroClubs</span>
                <HiOutlineArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: 3 Cards (Row 1: 2 Cards side-by-side, Row 2: 3rd Card wide) */}
          <div className="lg:col-span-8 order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {/* Card 1: Student */}
              <div className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4.5 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-lg border border-blue-100">
                      <HiOutlineAcademicCap />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border bg-blue-50 border-blue-200 text-blue-700">
                      Open Access
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-lg font-bold text-slate-900 tracking-tight">Student</h3>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">{roles[0].subtitle}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {roles[0].description}
                  </p>

                  <div className="mt-3.5 space-y-1.5 border-t border-slate-100 pt-3">
                    {roles[0].features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                        <HiOutlineCheckCircle className="text-sm shrink-0 mt-0.5 text-blue-600" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <Link
                    href="/Login"
                    className="flex h-9.5 w-full items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all shadow-xs bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <span>Sign In as Student</span>
                    <HiOutlineArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>

              {/* Card 2: Club Member */}
              <div className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4.5 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-lg border border-emerald-100">
                      <HiOutlineUserGroup />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border bg-emerald-50 border-emerald-200 text-emerald-700">
                      <HiOutlineKey className="text-xs" />
                      Key Required
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-lg font-bold text-slate-900 tracking-tight">Club Member</h3>
                  <p className="text-xs font-semibold text-emerald-600 mt-0.5">{roles[1].subtitle}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {roles[1].description}
                  </p>

                  <div className="mt-3.5 space-y-1.5 border-t border-slate-100 pt-3">
                    {roles[1].features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                        <HiOutlineCheckCircle className="text-sm shrink-0 mt-0.5 text-emerald-600" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <Link
                    href="/Login"
                    className="flex h-9.5 w-full items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all shadow-xs bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <span>Sign In as Club Member</span>
                    <HiOutlineArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Club Head (Wide Card) */}
              <div className="sm:col-span-2 relative rounded-2xl border border-slate-200/80 bg-white p-4.5 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.04)]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Left Info & Badges */}
                  <div className="md:col-span-8 space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 text-lg border border-amber-200">
                        <HiOutlineShieldCheck />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                            Club Head
                          </h3>
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border bg-amber-50 border-amber-200 text-amber-700">
                            <HiOutlineKey className="text-xs" />
                            Key Required
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-amber-600">
                          Club President & Executive Leader
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {roles[2].description}
                    </p>

                    {/* Features list in 2 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {roles[2].features.map((feat) => (
                        <div key={feat} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <HiOutlineCheckCircle className="text-sm shrink-0 mt-0.5 text-amber-600" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Actions Box */}
                  <div className="md:col-span-4 flex flex-col justify-center items-stretch md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5 space-y-2">
                    <p className="text-[11px] font-semibold text-slate-500 text-center md:text-right">
                      Passkey authorization required
                    </p>
                    <Link
                      href="/Login"
                      className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all shadow-xs bg-slate-900 text-white hover:bg-slate-800"
                    >
                      <span>Sign In as Club Head</span>
                      <HiOutlineArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
