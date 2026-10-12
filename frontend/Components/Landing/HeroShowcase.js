"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlinePlay,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineBuildingOffice2,
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineSquares2X2,
  HiOutlineSparkles,
  HiOutlineBolt,
  HiOutlineFire,
  HiOutlineRocketLaunch,
  HiOutlineChartBar,
  HiOutlineTicket,
  HiOutlineCheck,
  HiOutlineArrowTrendingUp,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

export default function HeroShowcase() {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'events' | 'applicants'
  const [rsvpedEvents, setRsvpedEvents] = useState({
    e1: true,
    e2: false,
    e3: false,
  });
  const [approvedApplicants, setApprovedApplicants] = useState({
    a1: true,
  });

  const toggleRsvp = (id) => {
    setRsvpedEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleApplicant = (id) => {
    setApprovedApplicants((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="home" className="relative pt-6 pb-14 sm:pt-10 sm:pb-20 overflow-hidden">
      {/* Background Soft Mesh Ambient Lighting & Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1560px] h-[520px] bg-gradient-to-b from-blue-100/50 via-indigo-50/30 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-16 right-10 w-[420px] h-[420px] bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-36 left-8 w-[380px] h-[380px] bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2563eb 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1560px] px-3 sm:px-6 lg:px-8">
        {/* HERO SECTION SPLIT: Left Copy + Right Interactive Live Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Badges */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-2xs backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-blue-700 font-bold">Campus Life OS</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600">Built for Active Clubs</span>
              </div>

              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/90 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-all shadow-2xs"
              >
                <span>⚡ By BroCodes Technologies</span>
                <span className="text-[10px] text-indigo-500 font-mono">↗</span>
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-slate-900 leading-[1.12]">
              Where Student Ambition
              <br />
              <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                Builds Legendary Clubs.
              </span>
            </h1>

            {/* Description Subtitle */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl">
              Cluvio is the modern operating system for university clubs, societies, and hackathons.
              Discover active student chapters, RSVP to campus fests, and streamline member recruitments with seamless, real-time sync.
            </p>

            {/* Action Buttons: Get Started + Explore Clubs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-7 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Get Started Free</span>
                <HiOutlineArrowRight className="text-base transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#clubs"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <HiOutlinePlay className="text-xs ml-0.5 fill-blue-700" />
                </div>
                <span>Explore Active Clubs</span>
              </a>
            </div>

            {/* Key Value Props */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="text-base text-blue-600 shrink-0" />
                <span>1-Click Club Join Requests</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="text-base text-blue-600 shrink-0" />
                <span>Live Event Schedules & RSVPs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="text-base text-blue-600 shrink-0" />
                <span>Real-Time Member Rosters</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Club Console Graphic */}
          <div className="lg:col-span-6 relative">
            {/* Background Decorative Rings */}
            <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full border border-blue-200/40 pointer-events-none -z-10" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full border border-indigo-200/30 pointer-events-none -z-10" />

            {/* Main Interactive Card Window */}
            <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-6 shadow-[0_25px_65px_rgba(15,23,42,0.09)] backdrop-blur-xl">
              {/* Top Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  {/* macOS-style control dots */}
                  <div className="flex items-center gap-1.5 mr-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="h-6 w-6 rounded-lg bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold">
                    <HiOutlineSquares2X2 className="text-sm" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">Cluvio Club Console</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Sync
                  </span>

                  {/* Profile Badge inside Mockup */}
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 px-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Aashirwad Singh"
                      className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-300"
                    />
                    <div className="text-left text-[11px] leading-tight">
                      <p className="font-bold text-slate-800">Aashirwad S.</p>
                      <p className="text-[9px] text-blue-600 font-semibold">GDSC Lead</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Tabs Header */}
              <div className="mt-4 flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      activeTab === "overview"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                    }`}
                  >
                    📊 Live Overview
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("events")}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activeTab === "events"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                    }`}
                  >
                    <HiOutlineTicket className="text-xs" />
                    <span>Events</span>
                    <span className="rounded-full bg-blue-100 text-blue-700 px-1.5 py-0.2 text-[10px] font-bold">
                      3
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("applicants")}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activeTab === "applicants"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                    }`}
                  >
                    <HiOutlineUserGroup className="text-xs" />
                    <span>Applications</span>
                    <span className="rounded-full bg-amber-100 text-amber-700 px-1.5 py-0.2 text-[10px] font-bold">
                      3
                    </span>
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                  <HiOutlineBell className="text-sm text-slate-400" />
                  <span>3 updates</span>
                </div>
              </div>

              {/* TAB 1: OVERVIEW CONTENT */}
              {activeTab === "overview" && (
                <div className="mt-4 space-y-3.5 text-left animate-fadeIn">
                  {/* 4 Stat Cards */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 transition-all hover:bg-blue-50/30">
                      <div className="h-6 w-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-xs mb-1">
                        <HiOutlineBuildingOffice2 className="text-sm" />
                      </div>
                      <p className="text-base font-black text-slate-900">32</p>
                      <p className="text-[9px] text-slate-500 font-medium truncate">Active Clubs</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 transition-all hover:bg-emerald-50/30">
                      <div className="h-6 w-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs mb-1">
                        <HiOutlineUser className="text-sm" />
                      </div>
                      <p className="text-base font-black text-slate-900">2,840</p>
                      <p className="text-[9px] text-slate-500 font-medium truncate">Club Members</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 transition-all hover:bg-purple-50/30">
                      <div className="h-6 w-6 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center text-xs mb-1">
                        <HiOutlineCalendarDays className="text-sm" />
                      </div>
                      <p className="text-base font-black text-slate-900">14</p>
                      <p className="text-[9px] text-slate-500 font-medium truncate">Campus Events</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 transition-all hover:bg-amber-50/30">
                      <div className="h-6 w-6 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center text-xs mb-1">
                        <HiOutlineArrowTrendingUp className="text-sm" />
                      </div>
                      <p className="text-base font-black text-slate-900">96%</p>
                      <p className="text-[9px] text-slate-500 font-medium truncate">Acceptance Rate</p>
                    </div>
                  </div>

                  {/* Featured Spotlight Club */}
                  <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-white p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        &lt;/&gt;
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">
                            Coding & Tech Innovation Club
                          </span>
                          <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.2 text-[9px] font-bold">
                            Featured
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500">
                          President: Rahul Sharma • 128 active student coders
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/register"
                      className="rounded-full bg-[#2563EB] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-2xs hover:bg-[#1D4ED8] transition-all shrink-0 cursor-pointer"
                    >
                      Join Club
                    </Link>
                  </div>

                  {/* Live Feed Stream */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[10px]">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Live Campus Feed
                      </span>
                      <span className="text-blue-600 font-semibold cursor-pointer">Live Updates</span>
                    </div>

                    <div className="space-y-1.5 text-[10px]">
                      <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                        <div className="flex items-center gap-2 truncate">
                          <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                          <span className="text-slate-700 truncate font-medium">
                            HackNights 2026 registration opened — 142 RSVP'd
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-400 shrink-0 ml-2">2m ago</span>
                      </div>

                      <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                        <div className="flex items-center gap-2 truncate">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                          <span className="text-slate-700 truncate font-medium">
                            Robotics Lab approved 12 new hardware recruits
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-400 shrink-0 ml-2">15m ago</span>
                      </div>

                      <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                        <div className="flex items-center gap-2 truncate">
                          <div className="h-2 w-2 rounded-full bg-purple-500 shrink-0" />
                          <span className="text-slate-700 truncate font-medium">
                            Design Society published annual UI/UX exhibition
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-400 shrink-0 ml-2">1h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EVENTS & HACKATHONS */}
              {activeTab === "events" && (
                <div className="mt-4 space-y-2.5 text-left animate-fadeIn">
                  <div className="flex items-center justify-between pb-1 text-xs">
                    <span className="font-bold text-slate-800">Campus Marquee Events</span>
                    <span className="text-[10px] text-slate-500">Tap to test 1-click RSVP</span>
                  </div>

                  {/* Event 1 */}
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center text-center font-bold text-xs leading-none">
                        <span>24</span>
                        <span className="text-[8px] font-normal uppercase">Apr</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-xs text-slate-900">TechHacks 2026</p>
                          <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.2 text-[9px] font-bold">
                            ₹50,000 Pool
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Coding Club • 220 registered • Main Auditorium
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRsvp("e1")}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        rsvpedEvents.e1
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                      }`}
                    >
                      {rsvpedEvents.e1 ? "RSVP'd ✓" : "Quick RSVP"}
                    </button>
                  </div>

                  {/* Event 2 */}
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-purple-600 text-white flex flex-col items-center justify-center text-center font-bold text-xs leading-none">
                        <span>28</span>
                        <span className="text-[8px] font-normal uppercase">Apr</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-xs text-slate-900">DesignSlam Fest</p>
                          <span className="rounded-full bg-purple-100 text-purple-700 px-2 py-0.2 text-[9px] font-bold">
                            UI/UX & 3D
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Design Society • 95 registered • Studio Hall
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRsvp("e2")}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        rsvpedEvents.e2
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                      }`}
                    >
                      {rsvpedEvents.e2 ? "RSVP'd ✓" : "Quick RSVP"}
                    </button>
                  </div>

                  {/* Event 3 */}
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex flex-col items-center justify-center text-center font-bold text-xs leading-none">
                        <span>02</span>
                        <span className="text-[8px] font-normal uppercase">May</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-xs text-slate-900">RoboWars Arena</p>
                          <span className="rounded-full bg-indigo-100 text-indigo-700 px-2 py-0.2 text-[9px] font-bold">
                            Autonomous
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Robotics Lab • 140 registered • Sports Complex
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRsvp("e3")}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        rsvpedEvents.e3
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                      }`}
                    >
                      {rsvpedEvents.e3 ? "RSVP'd ✓" : "Quick RSVP"}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: APPLICANT PIPELINE */}
              {activeTab === "applicants" && (
                <div className="mt-4 space-y-2.5 text-left animate-fadeIn">
                  <div className="flex items-center justify-between pb-1 text-xs">
                    <span className="font-bold text-slate-800">Pending Join Applications</span>
                    <span className="text-[10px] text-slate-500">One-click club approval pipeline</span>
                  </div>

                  {/* Applicant 1 */}
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                        alt="Priya Patel"
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                      />
                      <div>
                        <p className="font-bold text-xs text-slate-900">Priya Patel</p>
                        <p className="text-[10px] text-slate-500">
                          2nd Yr CSE • Applied for Coding Core Team
                        </p>
                        <div className="flex gap-1 mt-0.5">
                          <span className="text-[9px] bg-white border border-slate-200 px-1.5 py-0.2 rounded font-mono text-slate-600">
                            React
                          </span>
                          <span className="text-[9px] bg-white border border-slate-200 px-1.5 py-0.2 rounded font-mono text-slate-600">
                            Python
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleApplicant("a1")}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        approvedApplicants.a1
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {approvedApplicants.a1 ? "Approved ✓" : "Approve"}
                    </button>
                  </div>

                  {/* Applicant 2 */}
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                        alt="Dev Malhotra"
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                      />
                      <div>
                        <p className="font-bold text-xs text-slate-900">Dev Malhotra</p>
                        <p className="text-[10px] text-slate-500">
                          3rd Yr ECE • Applied for Hardware Lead
                        </p>
                        <div className="flex gap-1 mt-0.5">
                          <span className="text-[9px] bg-white border border-slate-200 px-1.5 py-0.2 rounded font-mono text-slate-600">
                            IoT
                          </span>
                          <span className="text-[9px] bg-white border border-slate-200 px-1.5 py-0.2 rounded font-mono text-slate-600">
                            ROS 2
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleApplicant("a2")}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        approvedApplicants.a2
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {approvedApplicants.a2 ? "Approved ✓" : "Approve"}
                    </button>
                  </div>

                  {/* Applicant 3 */}
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                        alt="Ananya Verma"
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                      />
                      <div>
                        <p className="font-bold text-xs text-slate-900">Ananya Verma</p>
                        <p className="text-[10px] text-slate-500">
                          1st Yr Design • Applied for UI/UX Designer
                        </p>
                        <div className="flex gap-1 mt-0.5">
                          <span className="text-[9px] bg-white border border-slate-200 px-1.5 py-0.2 rounded font-mono text-slate-600">
                            Figma
                          </span>
                          <span className="text-[9px] bg-white border border-slate-200 px-1.5 py-0.2 rounded font-mono text-slate-600">
                            3D Arts
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleApplicant("a3")}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        approvedApplicants.a3
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {approvedApplicants.a3 ? "Approved ✓" : "Approve"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Glassmorphic Pill 1: Live Event RSVP Surge (Top-Right) */}
            <div className="hidden sm:flex absolute -top-5 -right-4 items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white text-lg shadow-2xs">
                <HiOutlineFire />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-900">HackNights 2026</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[10px] text-slate-500">140+ RSVP'd • Registration Active</p>
                <div className="flex items-center -space-x-1.5 mt-1">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                    alt="Attendee"
                    className="h-4 w-4 rounded-full ring-1 ring-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&auto=format&fit=crop&q=80"
                    alt="Attendee"
                    className="h-4 w-4 rounded-full ring-1 ring-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                    alt="Attendee"
                    className="h-4 w-4 rounded-full ring-1 ring-white object-cover"
                  />
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[8px] font-bold text-blue-700 ring-1 ring-white">
                    +18
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Glassmorphic Pill 2: Fast-Track Member Accepted (Bottom-Left) */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white text-lg shadow-2xs">
                <HiOutlineRocketLaunch />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-900">Member Accepted</p>
                  <span className="rounded-full bg-emerald-100 text-emerald-700 px-1.5 py-0.2 text-[9px] font-bold">
                    Verified
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">Dev M. joined Robotics & Hardware Labs</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-xs ml-1">
                <HiOutlineCheck />
              </div>
            </div>
          </div>
        </div>

        {/* 5 CORE CAMPUS CLUB PILLARS (Modernized & Engaging) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left">
          {/* 1. Club Hubs & Operations */}
          <div className="group rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3 text-lg group-hover:scale-105 transition-transform">
              <HiOutlineBuildingOffice2 />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Club Operations</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Manage leadership hierarchies, charters, executive rosters, and announcements in one place.
            </p>
          </div>

          {/* 2. Events & Hackathons */}
          <div className="group rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-3 text-lg group-hover:scale-105 transition-transform">
              <HiOutlineCalendarDays />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Events & Hackathons</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Publish schedules, fests, and workshops with automated RSVP counts and ticket tracking.
            </p>
          </div>

          {/* 3. Smart Recruitment */}
          <div className="group rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3 text-lg group-hover:scale-105 transition-transform">
              <HiOutlineUserGroup />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Smart Recruitment</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Frictionless student applications, skill tagging, and 1-click approvals for club coordinators.
            </p>
          </div>

          {/* 4. Campus Discussions */}
          <div className="group rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-3 text-lg group-hover:scale-105 transition-transform">
              <HiOutlineChatBubbleLeftRight />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Campus Community</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Foster project collaborations, showcase club portfolios, and broadcast campus updates.
            </p>
          </div>

          {/* 5. Leadership Analytics */}
          <div className="group rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mb-3 text-lg group-hover:scale-105 transition-transform">
              <HiOutlineChartBar />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Growth Analytics</h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Monitor roster growth, event turnouts, and club activity health from the executive console.
            </p>
          </div>
        </div>

        {/* IMPACT METRICS SECTION */}
        <div className="mt-16 pt-8 border-t border-slate-200/70 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              — OUR CAMPUS IMPACT
            </span>
            <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Powering Modern Campus Life
            </h3>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl">
                <HiOutlineBuildingOffice2 className="text-xl" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">50+</p>
                <p className="text-[11px] text-slate-500 font-medium">Active Campus Clubs</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl">
                <HiOutlineUserGroup className="text-xl" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">3,800+</p>
                <p className="text-[11px] text-slate-500 font-medium">Engaged Students</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl">
                <HiOutlineCalendarDays className="text-xl" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">150+</p>
                <p className="text-[11px] text-slate-500 font-medium">Hackathons & Fests</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl">
                <HiOutlineSparkles className="text-xl" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">98%</p>
                <p className="text-[11px] text-slate-500 font-medium">Approval Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
