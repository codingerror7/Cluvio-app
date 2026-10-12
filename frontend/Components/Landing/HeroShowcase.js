"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlinePlay,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineBuildingOffice2,
  HiOutlineSquares2X2,
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineRocketLaunch,
  HiOutlineChartBar,
  HiOutlineTicket,
  HiOutlineCheck,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

const impactStats = [
  {
    icon: HiOutlineBuildingOffice2,
    value: "50+",
    label: "Campus Clubs",
    accent: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    icon: HiOutlineUserGroup,
    value: "3,800+",
    label: "Students Enrolled",
    accent: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    icon: HiOutlineCalendarDays,
    value: "150+",
    label: "Events Hosted",
    accent: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    icon: HiOutlineSparkles,
    value: "98%",
    label: "Student Satisfaction",
    accent: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
];

export default function HeroShowcase() {
  return (
    <section id="home" className="relative pt-6 pb-10 sm:pt-10 sm:pb-14 overflow-hidden">
      {/* Aesthetic Minimalist Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[500px] bg-gradient-to-b from-slate-100/60 via-blue-50/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 left-1/4 w-72 h-72 bg-indigo-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION SPLIT: Left Minimalist Copy + Right AI Generated Students Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Badges */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-slate-900 font-bold tracking-tight">BroClubs</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-normal">Next-Gen Campus Life OS</span>
              </div>

              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50/90 px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
              >
                <span>⚡ By BroCodes Technologies</span>
                <span className="text-[10px] text-slate-400 font-mono">↗</span>
              </a>
            </div>

            {/* Main Aesthetic Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black tracking-tight text-slate-900 leading-[1.12]">
              Where Student Ambition
              <br />
              <span className="bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Finds Its True Tribe.
              </span>
            </h1>

            {/* Description Subtitle */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-500 max-w-xl font-normal">
              BroClubs is the minimalist campus platform for college clubs, hackathons, and creative societies.
              Discover vibrant clubs, RSVP to campus fests, and streamline member recruitments with seamless real-time sync.
            </p>

            {/* Minimalist Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:bg-slate-800 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Join BroClubs Free</span>
                <HiOutlineArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#clubs"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                  <HiOutlinePlay className="text-xs ml-0.5 fill-slate-700" />
                </div>
                <span>Explore Active Clubs</span>
              </a>
            </div>

            {/* Minimalist Social Proof & Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="text-base text-slate-900 shrink-0" />
                <span>1-Click Member Approvals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="text-base text-slate-900 shrink-0" />
                <span>Live Hackathon RSVPs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="text-base text-slate-900 shrink-0" />
                <span>Verified Leadership Rosters</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Generated College Students with Clean Seamless Aesthetic */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Soft Ambient Radial Backdrop */}
            <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-blue-100/60 via-indigo-50/40 to-slate-100/70 blur-2xl pointer-events-none -z-10" />

            {/* Clean Container for Cutout Students */}
            <div className="relative w-full max-w-lg lg:max-w-xl mx-auto flex items-center justify-center">
              {/* Cutout AI Generated College Students Image */}
              <div className="relative z-10 w-full flex items-center justify-center overflow-hidden rounded-3xl">
                <img
                  src="/hero-students.jpg"
                  alt="BroClubs University Students"
                  className="w-full h-auto object-contain max-h-[520px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-transform duration-500 hover:scale-[1.01]"
                />
              </div>

              {/* Floating Minimalist Aesthetic Card 1 (Top Right): Live RSVP Badge */}
              <div className="hidden sm:flex absolute -top-4 -right-2 z-20 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white text-lg shadow-xs">
                  <HiOutlineFire />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-slate-900">TechHacks 2026</p>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">180+ Students RSVP'd</p>
                  <div className="flex items-center -space-x-1.5 mt-1">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                      alt="Student"
                      className="h-4 w-4 rounded-full ring-1 ring-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&auto=format&fit=crop&q=80"
                      alt="Student"
                      className="h-4 w-4 rounded-full ring-1 ring-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                      alt="Student"
                      className="h-4 w-4 rounded-full ring-1 ring-white object-cover"
                    />
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-[8px] font-bold text-slate-700 ring-1 ring-white">
                      +24
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Minimalist Aesthetic Card 2 (Bottom Left): Active Clubs Verification */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 z-20 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white text-lg shadow-xs">
                  <HiOutlineRocketLaunch />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-slate-900">50+ Active Clubs</p>
                    <span className="rounded-full bg-emerald-50 text-emerald-700 px-1.5 py-0.2 text-[9px] font-bold border border-emerald-200">
                      Live
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Technical • Cultural • Sports • Design
                  </p>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-800 text-xs ml-1">
                  <HiOutlineCheck />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 MINIMALIST CORE PILLARS */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left">
          {/* 1. Club Hubs */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 mb-3.5 text-lg group-hover:scale-105 transition-transform">
              <HiOutlineBuildingOffice2 />
            </div>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">Club Operations</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
              Centralized leadership rosters, official charters, executive permissions, and announcements.
            </p>
          </div>

          {/* 2. Events & Hackathons */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 mb-3.5 text-lg group-hover:scale-105 transition-transform">
              <HiOutlineCalendarDays />
            </div>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">Events & Hackathons</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
              Interactive campus calendars, automated ticket passes, and live attendee check-in queues.
            </p>
          </div>

          {/* 3. Smart Recruitment */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 mb-3.5 text-lg group-hover:scale-105 transition-transform">
              <HiOutlineUserGroup />
            </div>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">Smart Recruitment</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
              Frictionless student applications, skill tagging, and 1-click approvals for club coordinators.
            </p>
          </div>

          {/* 4. Campus Community */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 mb-3.5 text-lg group-hover:scale-105 transition-transform">
              <HiOutlineChatBubbleLeftRight />
            </div>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">Campus Community</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
              Direct discussions, project collaboration showcases, and cross-society event partnerships.
            </p>
          </div>

          {/* 5. Leadership Analytics */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 mb-3.5 text-lg group-hover:scale-105 transition-transform">
              <HiOutlineChartBar />
            </div>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">Growth Analytics</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
              Monitor roster growth, event turnouts, and club activity health from the executive console.
            </p>
          </div>
        </div>

        {/* MINIMALIST IMPACT METRICS SECTION - INFINITE CONTINUOUS MARQUEE */}
        <div className="mt-10 pt-6 border-t border-slate-200/60 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center text-left">
          <div className="lg:col-span-4 shrink-0">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              — OUR CAMPUS IMPACT
            </span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Built for Modern Universities
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-normal">
              Empowering student bodies and club leaders with real-time operational scale.
            </p>
          </div>

          <div className="lg:col-span-8 relative overflow-hidden py-2">
            {/* Smooth Edge Fades for Seamless Infinite Effect */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

            <div className="flex animate-marquee py-1 select-none">
              {/* Loop Track 1 */}
              <div className="flex gap-4 shrink-0 pr-4">
                {[...impactStats, ...impactStats].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={`track1-${idx}`}
                      className="w-[220px] sm:w-[240px] shrink-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-slate-300 transition-all flex items-center gap-3.5 group cursor-default"
                    >
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${stat.accent} text-xl transition-transform group-hover:scale-105`}>
                        <Icon />
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                          {stat.value}
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-semibold whitespace-nowrap">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Loop Track 2 (Exact Duplicate for Infinite Seamless Marquee) */}
              <div className="flex gap-4 shrink-0 pr-4" aria-hidden="true">
                {[...impactStats, ...impactStats].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={`track2-${idx}`}
                      className="w-[220px] sm:w-[240px] shrink-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-slate-300 transition-all flex items-center gap-3.5 group cursor-default"
                    >
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${stat.accent} text-xl transition-transform group-hover:scale-105`}>
                        <Icon />
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                          {stat.value}
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-semibold whitespace-nowrap">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
