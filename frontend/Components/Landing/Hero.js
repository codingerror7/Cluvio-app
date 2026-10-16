"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineCalendarDays,
  HiOutlineShieldCheck,
  HiOutlineMagnifyingGlass,
  HiOutlineCheckCircle,
  HiOutlineQrCode,
  HiOutlineBell,
  HiOutlineBolt,
} from "react-icons/hi2";
import BackgroundBeam from "@/Components/ui/BackgroundBeam";
import SpotlightCard from "@/Components/ui/SpotlightCard";
import RollingText from "@/Components/ui/RollingText";

const mockClubs = [
  {
    id: "robotics",
    name: "Hyperion AI & Robotics",
    category: "Hardware & AI",
    members: 94,
    status: "Recruiting",
    badge: "Charter Approved",
    tagline: "Autonomous systems, ROS2, and competitive robotics.",
  },
  {
    id: "codelabs",
    name: "CodeLabs Dev Guild",
    category: "Software & Web3",
    members: 142,
    status: "Active Sprint",
    badge: "Official Chapter",
    tagline: "Full-stack development, open source, and hackathons.",
  },
  {
    id: "design",
    name: "Design Collective",
    category: "Product & UI/UX",
    members: 68,
    status: "Portfolio Review",
    badge: "Creative Guild",
    tagline: "Design systems, 3D modeling, and branding sprints.",
  },
];

const mockEvents = [
  {
    title: "Campus HackSprint '26",
    club: "CodeLabs Dev Guild",
    date: "Oct 28 • 09:00 AM",
    venue: "Main Engineering Arena",
    attendees: "320 RSVP",
  },
  {
    title: "Autonomous Quadcopter Flight Demo",
    club: "Hyperion AI & Robotics",
    date: "Nov 04 • 04:30 PM",
    venue: "North Campus Quad",
    attendees: "180 RSVP",
  },
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClubs = mockClubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden text-center"
    >
      {/* Background radial glow & dot grid with Skipper BackgroundBeam */}
      <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[550px] bg-subtle-glow pointer-events-none" />
      <BackgroundBeam />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Eyebrow Pill with subtle violet indicator */}
        <div className="eyebrow-pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-300 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.4)] mb-6 transition-all hover:border-violet-500/30">
          <span className="flex h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300">
            A BroCodes Technologies Product
          </span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400 font-medium text-[11px]">
            Campus Club OS
          </span>
        </div>

        {/* Hero Headline with Skipper UI RollingText on "Next-Gen OS" */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-[4.25rem] font-black tracking-tight text-white leading-[1.1] sm:leading-[1.08]">
          The{" "}
          <span className="hero-rolling-underline relative inline-block border-b-2 border-violet-500/30 pb-0.5">
            <RollingText
              text="Next-Gen OS"
              className="rolling-text text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.25)]"
            />
          </span>{" "}
          for
          <br />
          <span className="hero-gradient-text text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-400">
            College Clubs & Campus Life.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
          BroClubs unifies students, club presidents, and campus communities
          into one high-velocity platform — from 1-click memberships to real-time
          event passes and leadership administration.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          <a
            href="#about"
            className="btn-primary group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-black transition-all hover:bg-neutral-200 hover:shadow-[0_0_28px_rgba(255,255,255,0.25)] active:scale-95 shadow-[0_4px_20px_rgba(255,255,255,0.12)] cursor-pointer"
          >
            <span>Explore How It Works</span>
            <HiOutlineArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </a>

          <Link
            href="/Login?role=president"
            className="btn-secondary flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-7 text-sm font-medium text-white transition-all hover:bg-white/[0.08] hover:border-violet-500/30 hover:shadow-[0_0_24px_rgba(139,92,246,0.12)] active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <HiOutlineShieldCheck className="text-base text-neutral-400" />
            <span>President Portal</span>
          </Link>
        </div>

        {/* STYLIZED PRODUCT VISUALIZATION (With Skipper UI Floating Spotlight Badges) */}
        <div className="mt-14 sm:mt-20 w-full max-w-5xl relative">
          {/* Subtle Outer Frame Violet Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(139,92,246,0.12),transparent_70%)] blur-2xl pointer-events-none" />

          {/* Skipper Spotlight Badge 1: Top-Right Verified Pass */}
          <div className="hidden lg:block absolute -top-6 -right-6 z-20">
            <SpotlightCard className="p-3 rounded-2xl border-white/15 bg-[#0e0e12]/95 shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(139,92,246,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black shadow-xs">
                  <HiOutlineQrCode className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">
                      Verified Member Pass
                    </span>
                    <HiOutlineCheckCircle className="text-violet-400 text-xs" />
                  </div>
                  <p className="text-[10px] font-mono text-neutral-400">
                    #BC-2026-904 • Active
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Skipper Spotlight Badge 2: Bottom-Left Live Activity */}
          <div className="hidden lg:block absolute -bottom-6 -left-6 z-20">
            <SpotlightCard className="p-3 rounded-2xl border-white/15 bg-[#0e0e12]/95 shadow-[0_16px_36px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white">
                  <HiOutlineBolt className="text-lg text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Live Campus Activity</p>
                  <p className="text-[10px] text-neutral-400">
                    50+ Clubs • 3,800+ Students Active
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Floating Badge 3: Top-Left Leadership Signoff */}
          <div className="hidden xl:flex absolute -top-5 -left-8 z-20 items-center gap-2.5 rounded-full border border-violet-500/20 bg-[#0e0e12]/90 px-3.5 py-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-neutral-300">
              Passkey Auth: Club Head Verified
            </span>
          </div>

          {/* Main Glass Product Dashboard Container */}
          <div className="hero-mockup-window relative rounded-2xl sm:rounded-3xl border border-white/12 bg-[#0b0b0e]/85 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden text-left">
            {/* Window Titlebar */}
            <div className="mockup-header-bar flex items-center justify-between border-b border-white/8 px-4 sm:px-6 py-3 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-neutral-700/80" />
                <span className="h-3 w-3 rounded-full bg-neutral-700/80" />
                <span className="h-3 w-3 rounded-full bg-neutral-700/80" />
                <span className="ml-2 hidden sm:inline-block text-[11px] font-mono text-neutral-500">
                  broclubs.app/workspace
                </span>
              </div>

              {/* Miniature Search / Filter Input */}
              <div className="hero-mockup-input flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-400 w-48 sm:w-72 transition-colors focus-within:border-violet-500/40 focus-within:bg-white/[0.05]">
                <HiOutlineMagnifyingGlass className="text-sm shrink-0" />
                <input
                  type="text"
                  placeholder="Search clubs, events, hackathons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder:text-neutral-500 outline-none"
                />
                <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-500 bg-white/[0.04] px-1 rounded">
                  ⌘K
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-violet-400" />
                <span className="text-[11px] font-mono text-neutral-400">
                  Network Online
                </span>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="p-4 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (Clubs Roster Preview) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      Active Campus Clubs
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Verified student charters open for membership
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-neutral-400 bg-white/[0.04] border border-white/8 px-2.5 py-0.5 rounded-full">
                    {mockClubs.length} Clubs Listed
                  </span>
                </div>

                {/* Club Cards Stream */}
                <div className="space-y-2.5">
                  {filteredClubs.map((club) => (
                    <div
                      key={club.id}
                      className="mockup-card group rounded-xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 p-3.5 sm:p-4 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white font-mono font-bold text-sm group-hover:border-violet-500/30">
                            {club.name[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-neutral-100">
                                {club.name}
                              </h4>
                              <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
                                {club.badge}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                              {club.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-mono font-medium text-neutral-300 group-hover:border-violet-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                            {club.status}
                          </span>
                          <p className="text-[10px] text-neutral-500 font-mono mt-1">
                            {club.members} Members
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (Upcoming Events & Real-Time Broadcasts) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      Campus Feed & Events
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Digital passes & live broadcasts
                    </p>
                  </div>
                  <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
                </div>

                <div className="space-y-2.5">
                  {mockEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/12 p-3.5 space-y-2 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                            {event.club}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold text-white">
                            {event.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-300 bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-full shrink-0">
                          {event.attendees}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/6 text-[11px] text-neutral-400 font-mono">
                        <span className="flex items-center gap-1">
                          <HiOutlineCalendarDays className="text-xs" />
                          {event.date}
                        </span>
                        <span className="text-neutral-300 font-medium">
                          {event.venue}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 flex items-start gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black shrink-0">
                    <HiOutlineBell className="text-sm" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-white">
                      President Passkey Authorized
                    </p>
                    <p className="text-neutral-400 text-[11px] mt-0.5">
                      Charter renewals and membership applications open for 2026 academic term.
                    </p>
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
