"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/Components/common/Navbar";
import Footer from "@/Components/Landing/Footer";
import {
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCalendarDays,
  HiOutlineDocumentDuplicate,
  HiOutlineChartBar,
  HiOutlineMagnifyingGlass,
  HiOutlineUserGroup,
  HiOutlineTicket,
  HiOutlineCheckBadge,
  HiOutlineMegaphone,
  HiOutlineArrowTrendingUp,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineCheck,
} from "react-icons/hi2";

export default function AboutPage() {
  const problems = [
    {
      icon: HiOutlineChatBubbleLeftRight,
      title: "Information is scattered",
      description:
        "Club announcements live across WhatsApp groups, Instagram stories, Discord servers, and paper notice boards.",
      impact: "Fragmented updates",
    },
    {
      icon: HiOutlineCalendarDays,
      title: "Students miss opportunities",
      description:
        "Students frequently miss club recruitments, workshop deadlines, and flagship campus events simply because they never saw them.",
      impact: "Lost engagement",
    },
    {
      icon: HiOutlineDocumentDuplicate,
      title: "Club management is fragmented",
      description:
        "Presidents and leadership teams rely on disconnected spreadsheets, manual sign-in forms, and endless chat channels.",
      impact: "Administrative fatigue",
    },
    {
      icon: HiOutlineChartBar,
      title: "Participation is difficult to track",
      description:
        "Campuses lack a verified record of student involvement, verified extracurricular contributions, and leadership terms.",
      impact: "Zero verified history",
    },
  ];

  const pillars = [
    {
      icon: HiOutlineMagnifyingGlass,
      title: "Discover",
      desc: "Explore organizations across technology, design, arts, debate, robotics, and entrepreneurship in one searchable directory.",
      tag: "Exploration",
    },
    {
      icon: HiOutlineUserGroup,
      title: "Connect",
      desc: "Become a verified member of student communities and build meaningful friendships that outlast college.",
      tag: "Community",
    },
    {
      icon: HiOutlineTicket,
      title: "Participate",
      desc: "RSVP to hackathons, workshops, guest lectures, and competitions with real-time reminders and QR check-ins.",
      tag: "Events",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Manage",
      desc: "Club presidents can organize committees, executive roles, and member permissions in a single workspace.",
      tag: "Leadership",
    },
    {
      icon: HiOutlineMegaphone,
      title: "Communicate",
      desc: "Broadcast official announcements to all members with instant notifications, avoiding chat spam.",
      tag: "Broadcasts",
    },
    {
      icon: HiOutlineArrowTrendingUp,
      title: "Grow",
      desc: "Understand member retention, attendance metrics, and community momentum with intuitive reports.",
      tag: "Analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070B13] text-white selection:bg-[var(--accent)] selection:text-black">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />
        <div className="pointer-events-none absolute right-0 top-[600px] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />

        {/* 1. HERO SECTION */}
        <section className="relative px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[var(--accent)] backdrop-blur-md">
              <HiOutlineSparkles className="text-sm" />
              <span>ABOUT CLUVIO</span>
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.15]">
              Bringing campus
              <span className="block text-[var(--accent)]">
                communities together.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-xl sm:leading-8">
              Cluvio is a modern platform built to make college club discovery, participation, and management simpler for everyone on campus.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] active:scale-95"
              >
                <span>Get Started with Cluvio</span>
                <HiOutlineArrowRight className="text-sm" />
              </Link>

              <Link
                href="/Howitworks"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10 hover:text-white"
              >
                How It Works →
              </Link>
            </div>
          </div>
        </section>

        {/* 2. THE PROBLEM SECTION */}
        <section className="relative border-t border-white/10 bg-[#0B1120]/50 py-20 px-4 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                The Challenge
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Campus communities shouldn&apos;t be this difficult to navigate.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                While extracurricular activities are the heart of university life, student organizations still rely on fragmented tools and scattered chats that isolate newcomers.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {problems.map((prob, idx) => {
                const Icon = prob.icon;
                return (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111827]/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                  >
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20">
                        <Icon className="text-2xl" />
                      </div>

                      <h3 className="mt-5 text-lg font-semibold text-white">
                        {prob.title}
                      </h3>

                      <p className="mt-2.5 text-xs leading-relaxed text-white/55">
                        {prob.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-white/5 pt-3">
                      <span className="text-[11px] font-medium text-red-400/80">
                        {prob.impact}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. THE SOLUTION — CONNECTED ECOSYSTEM */}
        <section className="relative py-20 px-4 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                The Solution
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                The campus, connected.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Cluvio acts as the central digital nervous system for student life—connecting students, clubs, executive leadership, and campus activities seamlessly.
              </p>
            </div>

            {/* Visual Connected Ecosystem Layout */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {/* Node 1: Students */}
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B1120] p-7 transition hover:border-[var(--accent)]/40">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-[var(--accent)]">
                    <HiOutlineAcademicCap className="text-xl" />
                  </div>
                  <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium text-[var(--accent)]">
                    Membership
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">Students</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  Instant discovery of clubs, personal membership rosters, bookmarking events, and verified leadership records.
                </p>

                <ul className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs text-white/70">
                  <li className="flex items-center gap-2">
                    <HiOutlineCheck className="text-[var(--accent)]" /> Single student profile
                  </li>
                  <li className="flex items-center gap-2">
                    <HiOutlineCheck className="text-[var(--accent)]" /> 1-Click event RSVP
                  </li>
                  <li className="flex items-center gap-2">
                    <HiOutlineCheck className="text-[var(--accent)]" /> Verified participation
                  </li>
                </ul>
              </div>

              {/* Node 2: The Core Ecosystem Bridge */}
              <div className="relative rounded-3xl border border-[var(--accent)]/40 bg-gradient-to-b from-[#162032] to-[#0E1726] p-7 shadow-[0_0_50px_rgba(34,211,238,0.12)]">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-black">
                    <HiOutlineSparkles className="text-xl" />
                  </div>
                  <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[11px] font-bold text-black uppercase tracking-wider">
                    Cluvio Hub
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">Campus Workspace</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  Central hub orchestrating club directories, live attendance tracking, announcements, and campus engagement.
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/80">
                  <div className="flex items-center justify-between text-[11px] text-white/40 mb-2">
                    <span>Active Campus Stats</span>
                    <span className="text-emerald-400">● Live Sync</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="rounded-lg bg-black/40 p-2">
                      <span className="text-lg font-bold text-white">50+</span>
                      <p className="text-[10px] text-white/50">Clubs</p>
                    </div>
                    <div className="rounded-lg bg-black/40 p-2">
                      <span className="text-lg font-bold text-[var(--accent)]">10k+</span>
                      <p className="text-[10px] text-white/50">Students</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Node 3: Club Presidents */}
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B1120] p-7 transition hover:border-[var(--accent)]/40">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <HiOutlineShieldCheck className="text-xl" />
                  </div>
                  <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium text-violet-400">
                    Leadership
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">Club Presidents</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  Dedicated leadership console to manage committees, publish campus events, broadcast updates, and grow membership.
                </p>

                <ul className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs text-white/70">
                  <li className="flex items-center gap-2">
                    <HiOutlineCheck className="text-[var(--accent)]" /> Member roster management
                  </li>
                  <li className="flex items-center gap-2">
                    <HiOutlineCheck className="text-[var(--accent)]" /> Event creation & QR check-in
                  </li>
                  <li className="flex items-center gap-2">
                    <HiOutlineCheck className="text-[var(--accent)]" /> Broadcast announcements
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT CLUVIO ENABLES */}
        <section className="relative border-t border-white/10 bg-[#0B1120]/40 py-20 px-4 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Core Capabilities
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What Cluvio enables across campus.
              </h2>
              <p className="mt-4 text-base text-white/60">
                Six foundational pillars engineered to elevate extracurricular participation from chaos to clarity.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="group rounded-2xl border border-white/10 bg-[#111827] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:bg-[#131C2E]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[var(--accent)] group-hover:bg-[var(--accent)]/15 transition-colors">
                        <Icon className="text-xl" />
                      </div>
                      <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-white/55">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. FOR STUDENTS & FOR CLUB PRESIDENTS DEDICATED SECTIONS */}
        <section className="relative py-20 px-4 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-20">
            {/* Student perspective */}
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                  For Students
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  A better campus experience for students.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  College is about more than lectures. Cluvio empowers you to uncover clubs aligned with your career goals, passion projects, and cultural interests.
                </p>

                <div className="mt-8 space-y-4 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
                      <HiOutlineCheck className="text-xs" />
                    </div>
                    <p>
                      <strong className="text-white">Discover & RSVP:</strong> Filter clubs by domain and get one-click ticket RSVPs with calendar sync.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
                      <HiOutlineCheck className="text-xs" />
                    </div>
                    <p>
                      <strong className="text-white">Verified Membership:</strong> Official digital record of all clubs you joined and leadership roles held.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
                      <HiOutlineCheck className="text-xs" />
                    </div>
                    <p>
                      <strong className="text-white">Direct Announcements:</strong> Receive reminders directly from club presidents without messy chat spam.
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Mock Card */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm">
                        AS
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Aarav Sharma</p>
                        <p className="text-xs text-white/40">Computer Science &apos;27</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                      Active Member
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                      My Joined Clubs (3)
                    </p>
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                      <span className="font-medium text-white">Coding Club</span>
                      <span className="text-[var(--accent)]">Core Member</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                      <span className="font-medium text-white">Design Society</span>
                      <span className="text-white/60">Member</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                      <span className="font-medium text-white">AI & ML Community</span>
                      <span className="text-white/60">Workshop Attendee</span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-4 text-xs">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>Next Event: Full-Stack Hackathon</span>
                      <span className="text-[var(--accent)]">Tomorrow 4 PM</span>
                    </div>
                    <p className="mt-1 text-white/50">Auditorium B • QR Ticket Confirmed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Club President perspective */}
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* President Mock Card */}
              <div className="order-2 lg:order-1 lg:col-span-6">
                <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold">
                        <HiOutlineShieldCheck className="text-xl" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Robotics Club</p>
                        <p className="text-xs text-white/40">President Console • Fall 2026</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-[var(--accent)]">
                      Leader View
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-lg font-bold text-white">142</span>
                      <p className="text-[10px] text-white/40">Active Members</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-lg font-bold text-emerald-400">18</span>
                      <p className="text-[10px] text-white/40">Pending Apps</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-lg font-bold text-[var(--accent)]">4</span>
                      <p className="text-[10px] text-white/40">Upcoming Events</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3.5 py-2.5 text-xs">
                      <span className="text-white/80">Publish Campus Announcement</span>
                      <span className="text-[var(--accent)] font-medium">Broadcast →</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3.5 py-2.5 text-xs">
                      <span className="text-white/80">Generate Event Check-in QR</span>
                      <span className="text-white/40">Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-6">
                <span className="inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
                  For Club Presidents
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Built for the people who run campus communities.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  Leading a student organization shouldn&apos;t feel like a full-time administrative burden. Cluvio gives leaders the dedicated workspace they need.
                </p>

                <div className="mt-8 space-y-4 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-400/20 text-violet-400">
                      <HiOutlineCheck className="text-xs" />
                    </div>
                    <p>
                      <strong className="text-white">Seamless Roster Management:</strong> Review new applicant submissions, assign committee leaders, and maintain records.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-400/20 text-violet-400">
                      <HiOutlineCheck className="text-xs" />
                    </div>
                    <p>
                      <strong className="text-white">Event Operations:</strong> Create multi-track events, enforce attendance caps, and track verify presence.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-400/20 text-violet-400">
                      <HiOutlineCheck className="text-xs" />
                    </div>
                    <p>
                      <strong className="text-white">Leadership Handover:</strong> Hand over credentials, event archives, and past attendance to the next executive team with zero friction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. MISSION SECTION */}
        <section className="relative border-t border-white/10 bg-gradient-to-b from-[#0B1120] to-[#070B13] py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Our Mission
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl sm:leading-tight">
              Make campus communities easier to discover, simpler to manage, and profoundly meaningful to participate in.
            </h2>
            <p className="mt-6 text-base text-white/60 sm:text-lg">
              We believe a university education is only complete when students find their tribe, build real projects, and lead with purpose. Cluvio provides the digital foundation for those memories to take shape.
            </p>

            <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-white/10 pt-10">
              <div>
                <p className="text-3xl font-extrabold text-[var(--accent)] sm:text-4xl">50+</p>
                <p className="mt-1 text-xs text-white/50">Campus Clubs</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white sm:text-4xl">10k+</p>
                <p className="mt-1 text-xs text-white/50">Active Students</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white sm:text-4xl">200+</p>
                <p className="mt-1 text-xs text-white/50">Annual Events</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-emerald-400 sm:text-4xl">100%</p>
                <p className="mt-1 text-xs text-white/50">Verified Leads</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-t border-white/10">
          <div className="mx-auto max-w-4xl text-center rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B1120] p-10 sm:p-16 shadow-[0_20px_80px_rgba(2,8,23,0.4)]">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your next campus community might be one click away.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
              Explore Cluvio and discover what&apos;s happening across your campus today.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] active:scale-95"
              >
                Explore Cluvio Now
              </Link>
              <Link
                href="/Contact"
                className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Contact Campus Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
