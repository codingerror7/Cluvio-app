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
      subtitle: "Campus Explorer & Member",
      badge: "Open Access",
      keyRequired: false,
      icon: HiOutlineAcademicCap,
      features: [
        "Discover 50+ campus clubs by category",
        "View club charters & meeting schedules",
        "1-click membership applications",
        "Track pending request approval statuses",
      ],
    },
    {
      title: "Club Member",
      subtitle: "Active Contributor & Participant",
      badge: "Key: admin123",
      keyRequired: true,
      icon: HiOutlineUserGroup,
      features: [
        "Verified 'Club Member' status badge",
        "Internal project & activity tracking",
        "Exclusive member RSVP & privileges",
        "Protected with passcode 'admin123'",
      ],
    },
    {
      title: "Club Head",
      subtitle: "Club President & Executive Leader",
      badge: "Key: admin123",
      keyRequired: true,
      icon: HiOutlineShieldCheck,
      features: [
        "Review & approve/reject membership requests",
        "Publish events, passes & announcements",
        "Manage leadership rosters & handovers",
        "Club Head Management Console access",
      ],
    },
  ];

  return (
    <section id="roles" className="py-8 sm:py-12 relative">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE: Heading + Paragraph + Key Benefits */}
          <div className="lg:col-span-4 order-1 lg:sticky lg:top-24 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span>Role-Based Campus Architecture</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-black text-slate-900 tracking-tight leading-tight">
              <span className="block">Built for Students,</span>
              <span className="block text-slate-900">Trusted by Club Leaders.</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              BroClubs features dedicated portals tailored to each participant&apos;s campus duties. Secret key authorization protects leadership accounts.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <HiOutlineCheckCircle className="text-blue-600 text-base shrink-0" />
                <span>3 customized access portals for students & heads</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <HiOutlineCheckCircle className="text-blue-600 text-base shrink-0" />
                <span>Passkey-protected executive privilege verification</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <HiOutlineCheckCircle className="text-blue-600 text-base shrink-0" />
                <span>Instant sync between club applicants and rosters</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
              >
                <span>Get Started with BroClubs</span>
                <HiOutlineArrowRight className="text-sm" />
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: 3 Cards (Row 1: 2 Cards side-by-side, Row 2: 3rd Card lamba/wide) */}
          <div className="lg:col-span-8 order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left">
              {/* Card 1: Student */}
              <div className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.04)]">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl border border-blue-100">
                      <HiOutlineAcademicCap />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border bg-blue-50 border-blue-200 text-blue-700">
                      Open Access
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-900 tracking-tight">Student</h3>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">Campus Explorer & Member</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    The standard campus access tier for all enrolled students seeking community and extracurricular growth.
                  </p>

                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                    {roles[0].features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                        <HiOutlineCheckCircle className="text-sm shrink-0 mt-0.5 text-blue-600" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  <Link
                    href="/Login"
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all shadow-xs bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <span>Sign In as Student</span>
                    <HiOutlineArrowRight className="text-xs" />
                  </Link>
                  <div className="text-center">
                    <Link href="/register" className="text-[11px] text-slate-500 hover:text-slate-900 font-medium">
                      Or register an account →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2: Club Member */}
              <div className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.04)]">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-xl border border-emerald-100">
                      <HiOutlineUserGroup />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border bg-emerald-50 border-emerald-200 text-emerald-700">
                      <HiOutlineKey className="text-xs" />
                      Key: admin123
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-900 tracking-tight">Club Member</h3>
                  <p className="text-xs font-semibold text-emerald-600 mt-0.5">Active Contributor & Participant</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Designed for students appointed to club committees, organizing workshops, and managing societies.
                  </p>

                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                    {roles[1].features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                        <HiOutlineCheckCircle className="text-sm shrink-0 mt-0.5 text-emerald-600" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  <Link
                    href="/Login"
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all shadow-xs bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <span>Sign In as Club Member</span>
                    <HiOutlineArrowRight className="text-xs" />
                  </Link>
                  <div className="text-center">
                    <Link href="/register" className="text-[11px] text-slate-500 hover:text-slate-900 font-medium">
                      Or register an account →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 3: Club Head (Wide / Lamba Sa Card Spanning 2 Columns) */}
              <div className="sm:col-span-2 relative rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left Info & Badges */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 text-xl border border-amber-200">
                        <HiOutlineShieldCheck />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                            Club Head
                          </h3>
                          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border bg-amber-50 border-amber-200 text-amber-700">
                            <HiOutlineKey className="text-xs" />
                            Key: admin123
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-amber-600">
                          Club President & Executive Leader
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600">
                      Full administrative power for club presidents, coordinators, and college leadership teams to run campus operations with zero friction.
                    </p>

                    {/* Features list in 2 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {roles[2].features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                          <HiOutlineCheckCircle className="text-sm shrink-0 mt-0.5 text-amber-600" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Actions Box */}
                  <div className="md:col-span-5 flex flex-col justify-center items-stretch md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 space-y-3">
                    <div className="w-full space-y-2.5">
                      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-left">
                        <p className="text-[11px] font-bold text-slate-800">Leadership Authorization</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Requires verified secret passkey to access executive club management tools.</p>
                      </div>
                      <Link
                        href="/Login"
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all shadow-xs bg-slate-900 text-white hover:bg-slate-800"
                      >
                        <span>Sign In as Club Head</span>
                        <HiOutlineArrowRight className="text-xs" />
                      </Link>
                      <div className="text-center">
                        <Link
                          href="/register"
                          className="text-[11px] text-slate-500 hover:text-slate-900 font-medium transition-colors"
                        >
                          Or register an executive account →
                        </Link>
                      </div>
                    </div>
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
