"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineSquares2X2,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineShieldCheck,
  HiOutlineArrowLeft,
} from "react-icons/hi2";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="grid min-h-screen lg:h-full lg:grid-cols-12">
        {/* Left Branding Showcase (Desktop - Light Theme) */}
        <section className="relative hidden lg:col-span-5 lg:flex xl:col-span-5 flex-col justify-between p-8 xl:p-10 border-r border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 overflow-hidden">
          {/* Subtle decorative dot pattern & ambient glows */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-blue-200/35 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-[100px] pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 transition-transform hover:scale-[1.01]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/25">
                <HiOutlineSquares2X2 className="text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold tracking-tight text-slate-900">
                    Cluvio
                  </span>
                  <span className="rounded-md bg-blue-50 border border-blue-200 px-1.5 py-0.2 text-[10px] font-semibold text-blue-700">
                    Campus OS
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  By BroCodes Technologies
                </p>
              </div>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <HiOutlineArrowLeft className="text-sm" />
              <span>Back</span>
            </Link>
          </div>

          {/* Center Showcase Copy */}
          <div className="relative z-10 my-auto py-4 max-w-md">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/90 px-3 py-1 text-xs font-semibold text-blue-700 mb-4 shadow-2xs">
              <HiOutlineSparkles className="text-sm text-blue-600" />
              <span>Modern Campus Club Operating System</span>
            </div>

            <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              One Workspace for All{" "}
              <span className="text-blue-600 underline decoration-blue-200 underline-offset-4">
                Campus Clubs.
              </span>
            </h2>

            <p className="mt-3 text-xs xl:text-sm text-slate-600 leading-relaxed">
              Empowering students to discover passions, club members to collaborate seamlessly, and club heads to manage registrations, budgets, and campus events.
            </p>

            {/* 3 Metric Badges */}
            <div className="mt-6 grid grid-cols-3 gap-2.5 border-y border-slate-200/80 py-4">
              <div className="rounded-xl bg-white/80 p-2.5 border border-slate-200/70 shadow-2xs">
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mb-0.5">
                  <HiOutlineUserGroup className="text-blue-600 text-xs" />
                  <span>Clubs</span>
                </div>
                <p className="text-lg font-bold text-slate-900">50+</p>
                <p className="text-[10px] text-slate-400">Active Orgs</p>
              </div>

              <div className="rounded-xl bg-white/80 p-2.5 border border-slate-200/70 shadow-2xs">
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mb-0.5">
                  <HiOutlineCalendarDays className="text-emerald-600 text-xs" />
                  <span>Events</span>
                </div>
                <p className="text-lg font-bold text-slate-900">200+</p>
                <p className="text-[10px] text-slate-400">Annual Fests</p>
              </div>

              <div className="rounded-xl bg-white/80 p-2.5 border border-slate-200/70 shadow-2xs">
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mb-0.5">
                  <HiOutlineShieldCheck className="text-amber-600 text-xs" />
                  <span>Access</span>
                </div>
                <p className="text-lg font-bold text-slate-900">100%</p>
                <p className="text-[10px] text-slate-400">RBAC Verified</p>
              </div>
            </div>

            {/* 3 Role Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-medium text-slate-400 mr-1">
                Roles:
              </span>
              <span className="rounded-lg bg-blue-50 border border-blue-200/70 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                🎓 Student
              </span>
              <span className="rounded-lg bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                👥 Club Member
              </span>
              <span className="rounded-lg bg-amber-50 border border-amber-200/70 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                👑 Club Head
              </span>
            </div>
          </div>

          {/* Left Footer */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
            <span>© {new Date().getFullYear()} Cluvio by BroCodes</span>
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 hover:underline"
            >
              brocodestech.in
            </a>
          </div>
        </section>

        {/* Right Form Container (Centered, light background, no scroll on standard desktop) */}
        <section className="flex lg:col-span-7 xl:col-span-7 flex-col justify-center items-center px-4 py-4 sm:px-6 lg:px-8 h-full overflow-y-auto lg:overflow-hidden bg-[#F8FAFC]">
          {/* Mobile Top Brand Header */}
          <div className="w-full max-w-[440px] mb-3 flex items-center justify-between lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-2xs">
                <HiOutlineSquares2X2 className="text-base" />
              </div>
              <span className="text-base font-bold text-slate-900">Cluvio</span>
            </Link>

            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              ← Home
            </Link>
          </div>

          {/* Form Content Area */}
          <div className="w-full max-w-[440px] my-auto">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
