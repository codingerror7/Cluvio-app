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
  HiOutlineCheckCircle,
} from "react-icons/hi2";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-[#FAFAFA] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <div className="grid min-h-screen lg:h-full lg:grid-cols-12">
        {/* Left Branding Showcase (Desktop - Sleek Landing Page Minimalist Theme) */}
        <section className="relative hidden lg:col-span-5 lg:flex xl:col-span-5 flex-col justify-between p-8 xl:p-10 border-r border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
          {/* Ambient Lighting Blurs Matching Hero */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-100/20 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 transition-transform hover:scale-[1.01]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                <HiOutlineSquares2X2 className="text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold tracking-tight text-slate-900">
                    BroClubs
                  </span>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.2 text-[10px] font-semibold text-slate-700">
                    Campus OS
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  By BroCodes Technologies
                </p>
              </div>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
            >
              <HiOutlineArrowLeft className="text-xs" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Center Showcase Narrative */}
          <div className="relative z-10 my-auto py-4 max-w-md space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Next-Gen Campus Life OS</span>
            </div>

            <h2 className="text-3xl xl:text-[38px] font-black tracking-tight text-slate-900 leading-[1.15]">
              Where Student Ambition{" "}
              <span className="block bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Finds Its True Tribe.
              </span>
            </h2>

            <p className="text-xs xl:text-sm text-slate-600 leading-relaxed font-normal">
              The all-in-one minimalist platform for university clubs, fests, and verified student memberships.
            </p>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="rounded-2xl bg-white border border-slate-200/80 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-left">
                <p className="text-lg font-black text-slate-900">50+</p>
                <p className="text-[10px] text-slate-500 font-semibold">Campus Clubs</p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200/80 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-left">
                <p className="text-lg font-black text-slate-900">3,800+</p>
                <p className="text-[10px] text-slate-500 font-semibold">Students</p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200/80 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-left">
                <p className="text-lg font-black text-slate-900">98%</p>
                <p className="text-[10px] text-slate-500 font-semibold">Satisfaction</p>
              </div>
            </div>

            {/* Role Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700">
                🎓 Student
              </span>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                👥 Member
              </span>
              <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700">
                👑 Club Head
              </span>
            </div>
          </div>

          {/* Left Footer */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200/70">
            <span>© {new Date().getFullYear()} BroClubs</span>
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              brocodestech.in ↗
            </a>
          </div>
        </section>

        {/* Right Form Container */}
        <section className="flex lg:col-span-7 xl:col-span-7 flex-col justify-center items-center px-4 py-6 sm:px-6 lg:px-8 h-full overflow-y-auto bg-[#FAFAFA] relative">
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-blue-100/25 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-indigo-100/20 blur-3xl pointer-events-none" />

          {/* Mobile Top Brand Header */}
          <div className="w-full max-w-[460px] mb-4 flex items-center justify-between lg:hidden z-10">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white shadow-2xs">
                <HiOutlineSquares2X2 className="text-base" />
              </div>
              <span className="text-base font-bold text-slate-900">BroClubs</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <HiOutlineArrowLeft className="text-xs" />
              <span>Home</span>
            </Link>
          </div>

          {/* Form Content Area */}
          <div className="w-full max-w-[460px] sm:max-w-[480px] my-auto relative z-10">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
