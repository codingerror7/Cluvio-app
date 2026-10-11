"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlinePlay,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineShieldCheck,
  HiOutlineBuildingOffice2,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineBell,
  HiOutlineShare,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

export default function HeroShowcase() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <section id="home" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Background Soft Mesh Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/40 via-indigo-50/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION SPLIT: Left Copy + Right Interactive Dashboard Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                For Colleges. By Cluvio.
              </span>

              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                <span>BroCodes Technologies Product</span>
                <span className="text-[10px] text-indigo-500 font-mono">brocodestech.in ↗</span>
              </a>
            </div>

            {/* Main Headline (Exact Typography & Styling of Reference Image) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Smarter Club Management
              <br />
              <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                Stronger Campus Communities.
              </span>
            </h1>

            {/* Description Subtitle */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl">
              Cluvio is the complete college club operations platform — helping colleges manage their clubs, events, memberships and more, while connecting club heads and students across colleges.
            </p>

            {/* Action Buttons: Get Started Free + Watch Demo / Sign In */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-7 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Get Started Free</span>
                <HiOutlineArrowRight className="text-base transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/Login"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <HiOutlinePlay className="text-xs ml-0.5 fill-blue-700" />
                </div>
                <span>Sign In to Portal</span>
              </Link>
            </div>

            {/* Trust Checks (Matching Reference Image) */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="text-base text-blue-600 shrink-0" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="text-base text-blue-600 shrink-0" />
                <span>Quick setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="text-base text-blue-600 shrink-0" />
                <span>Trusted by forward-thinking colleges</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Dashboard Mockup Graphic (Replicating Screenshot Layout) */}
          <div className="lg:col-span-6 relative">
            {/* Background Decorative Line Graphics */}
            <svg
              className="absolute -right-8 top-1/2 -translate-y-1/2 w-80 h-80 text-blue-200/50 -z-10 pointer-events-none"
              fill="none"
              viewBox="0 0 200 200"
            >
              <path
                d="M10 80 Q 90 20 180 80 T 190 180"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Main Dashboard Card Window */}
            <div className="relative rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              {/* Header Bar inside Mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold">
                    <HiOutlineSquares2X2 className="text-sm" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">Cluvio</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <HiOutlineBell className="text-base" />
                  </div>

                  {/* Profile Pill inside Mockup */}
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 px-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Aashirwad Singh"
                      className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-300"
                    />
                    <div className="text-left text-[11px] leading-tight">
                      <p className="font-bold text-slate-800">Aashirwad Singh</p>
                      <p className="text-[9px] text-slate-400">Club Head</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Greeting row */}
              <div className="py-3 text-left">
                <p className="text-xs font-bold text-slate-800">Good Morning, Aashirwad!</p>
                <p className="text-[10px] text-slate-500">Here's what's happening in your college clubs today.</p>
              </div>

              {/* 4 Stat Cards Row (Exact Match of Screenshot) */}
              <div className="grid grid-cols-4 gap-2 text-left">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <div className="h-6 w-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs mb-1.5">
                    👥
                  </div>
                  <p className="text-base font-black text-slate-800">12</p>
                  <p className="text-[9px] text-slate-500 font-medium truncate">Total Clubs</p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <div className="h-6 w-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-xs mb-1.5">
                    👤
                  </div>
                  <p className="text-base font-black text-slate-800">248</p>
                  <p className="text-[9px] text-slate-500 font-medium truncate">Total Members</p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <div className="h-6 w-6 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center text-xs mb-1.5">
                    📅
                  </div>
                  <p className="text-base font-black text-slate-800">8</p>
                  <p className="text-[9px] text-slate-500 font-medium truncate">Upcoming Events</p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <div className="h-6 w-6 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center text-xs mb-1.5">
                    📋
                  </div>
                  <p className="text-base font-black text-slate-800">5</p>
                  <p className="text-[9px] text-slate-500 font-medium truncate">Pending Join Requests</p>
                </div>
              </div>

              {/* Split Content: Upcoming Events + Recent Activity */}
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {/* Upcoming Events Box */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[10px]">
                    <span className="font-bold text-slate-800">Upcoming Events</span>
                    <span className="text-blue-600 font-semibold cursor-pointer">View All →</span>
                  </div>

                  <div className="space-y-2 text-[10px]">
                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                      <div>
                        <p className="font-bold text-slate-800">TechHacks 2026</p>
                        <p className="text-[9px] text-slate-400">Coding Club • 22 Apr 2026</p>
                      </div>
                      <span className="rounded-md bg-blue-50 text-blue-700 px-2 py-0.5 font-bold text-[9px]">
                        Register
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                      <div>
                        <p className="font-bold text-slate-800">Cultural Fest Auditions</p>
                        <p className="text-[9px] text-slate-400">Cultural Club • 25 Apr 2026</p>
                      </div>
                      <span className="rounded-md bg-blue-50 text-blue-700 px-2 py-0.5 font-bold text-[9px]">
                        Register
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                      <div>
                        <p className="font-bold text-slate-800">Design Workshop</p>
                        <p className="text-[9px] text-slate-400">Design Club • 28 Apr 2026</p>
                      </div>
                      <span className="rounded-md bg-blue-50 text-blue-700 px-2 py-0.5 font-bold text-[9px]">
                        Register
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Box */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                  <div className="pb-2 mb-2 border-b border-slate-100 text-[10px] font-bold text-slate-800">
                    Recent Activity
                  </div>

                  <div className="space-y-2 text-[10px]">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-100">
                      <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                      <p className="text-slate-600 truncate">Riya Sharma joined Design Club</p>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-100">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                      <p className="text-slate-600 truncate">New comment on Tech Club post</p>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-100">
                      <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                      <p className="text-slate-600 truncate">Event registration closed for CodeFest</p>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-100">
                      <div className="h-2 w-2 rounded-full bg-purple-500 shrink-0" />
                      <p className="text-slate-600 truncate">New message from Cultural Club</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Pill Card 1: Inter-College Community (Bottom Left - Matching Screenshot) */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 text-lg">
                <HiOutlineUserGroup />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Inter-College Community</p>
                <p className="text-[10px] text-slate-500">Connect • Share • Collaborate</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-50 text-purple-600 text-xs ml-2">
                →
              </div>
            </div>

            {/* Floating Pill Card 2: Private & Secure (Top Right - Matching Screenshot) */}
            <div className="hidden sm:flex absolute -top-4 -right-4 items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/95 py-2.5 px-4 shadow-xl backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <HiOutlineShieldCheck className="text-lg" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Private & Secure</p>
                <p className="text-[10px] text-slate-500">Your college data stays yours</p>
              </div>
            </div>
          </div>
        </div>

        {/* HORIZONTAL FEATURES RIBBON (Exact 5 Items Matching the Reference Image) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left">
          {/* 1. Club Management */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-3 text-lg">
              <HiOutlineBuildingOffice2 />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Club Management</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Create, manage and grow your college clubs with ease.
            </p>
          </div>

          {/* 2. Event Management */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3 text-lg">
              <HiOutlineCalendarDays />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Event Management</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Plan, register, track and analyze your events.
            </p>
          </div>

          {/* 3. Student Engagement */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3 text-lg">
              <HiOutlineUser />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Student Engagement</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Simplify membership, recruitment and communication.
            </p>
          </div>

          {/* 4. Inter-College Community */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-3 text-lg">
              <HiOutlineUserGroup />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Inter-College Community</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Discuss, collaborate and learn from other colleges.
            </p>
          </div>

          {/* 5. Secure & Private */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mb-3 text-lg">
              <HiOutlineShieldCheck />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Secure & Private</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Your college's data, always protected & key verified.
            </p>
          </div>
        </div>

        {/* IMPACT METRICS SECTION (Exact Match with Bottom of Reference Image) */}
        <div className="mt-16 pt-8 border-t border-slate-200/70 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              — OUR IMPACT
            </span>
            <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Built for Modern Colleges
            </h3>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl">
                🏛️
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">100+</p>
                <p className="text-[11px] text-slate-500 font-medium">Colleges Onboarded</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl">
                👥
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">2,500+</p>
                <p className="text-[11px] text-slate-500 font-medium">Active Club Members</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl">
                📅
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">500+</p>
                <p className="text-[11px] text-slate-500 font-medium">Events Managed</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl">
                🌐
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">15+</p>
                <p className="text-[11px] text-slate-500 font-medium">Inter-College Collabs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
