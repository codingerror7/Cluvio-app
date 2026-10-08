"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/common/Navbar";
import Footer from "@/Components/Landing/Footer";
import {
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineMagnifyingGlass,
  HiOutlineInformationCircle,
  HiOutlineUserPlus,
  HiOutlineTicket,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineUsers,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineCheck,
  HiOutlineQrCode,
  HiOutlineBell,
} from "react-icons/hi2";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState("student");

  const studentSteps = [
    {
      step: "01",
      title: "Discover",
      headline: "Find clubs tailored to your passions",
      desc: "Browse a verified campus directory filtered by technology, creative design, robotics, entrepreneurship, arts, and sports.",
      icon: HiOutlineMagnifyingGlass,
      tag: "Directory Search",
      mockupType: "discover",
    },
    {
      step: "02",
      title: "Explore",
      headline: "Examine club mission, projects & team",
      desc: "Deep-dive into verified club profiles to view past accomplishments, upcoming workshops, committee leads, and member rosters.",
      icon: HiOutlineInformationCircle,
      tag: "Club Profiles",
      mockupType: "explore",
    },
    {
      step: "03",
      title: "Join",
      headline: "Become an official member in one click",
      desc: "Join open student communities instantly or submit enrollment-verified membership applications for competitive technical societies.",
      icon: HiOutlineUserPlus,
      tag: "Verification",
      mockupType: "join",
    },
    {
      step: "04",
      title: "Participate",
      headline: "RSVP to workshops, hackathons & talks",
      desc: "Lock in your spot for campus events with digital QR tickets, automated calendar sync, and real-time venue change notifications.",
      icon: HiOutlineTicket,
      tag: "Event Passes",
      mockupType: "participate",
    },
    {
      step: "05",
      title: "Connect",
      headline: "Collaborate and build campus roots",
      desc: "Access members-only broadcast announcements, contribute to club projects, and build an extracurricular portfolio that shines on resumes.",
      icon: HiOutlineUserGroup,
      tag: "Community",
      mockupType: "connect",
    },
  ];

  const presidentSteps = [
    {
      step: "01",
      title: "Create & Customize",
      headline: "Launch your club's digital headquarters",
      desc: "Establish your official profile, define your club's category, upload brand banners, and configure student eligibility requirements.",
      icon: HiOutlineBuildingOffice2,
      tag: "Workspace Setup",
    },
    {
      step: "02",
      title: "Build Executive Team",
      headline: "Appoint committee leads & permissions",
      desc: "Delegate executive responsibilities by appointing Vice Presidents, Treasurers, Technical Leads, and Event Coordinators with granular access.",
      icon: HiOutlineUsers,
      tag: "Role Management",
    },
    {
      step: "03",
      title: "Recruit & Onboard",
      headline: "Process applications with speed and clarity",
      desc: "Review incoming student applications, verify college enrollment numbers, and welcome candidates with automated acceptance emails.",
      icon: HiOutlineUserPlus,
      tag: "Member Ingestion",
    },
    {
      step: "04",
      title: "Organize Activities",
      headline: "Publish campus events & track check-ins",
      desc: "Schedule workshops, set participant caps, broadcast venue updates, and scan student QR codes at the door for instant attendance logs.",
      icon: HiOutlineCalendarDays,
      tag: "Event Operations",
    },
    {
      step: "05",
      title: "Track Growth",
      headline: "Demonstrate verified community impact",
      desc: "Track retention across semesters, measure event turnout, and effortlessly export activity reports for campus administration funding.",
      icon: HiOutlineChartBarSquare,
      tag: "Analytics & Reports",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070B13] text-white selection:bg-[var(--accent)] selection:text-black">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute left-1/3 top-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />
        <div className="pointer-events-none absolute right-10 top-[800px] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[160px]" />

        {/* 1. HERO SECTION */}
        <section className="relative px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[var(--accent)] backdrop-blur-md">
              <HiOutlineSparkles className="text-sm" />
              <span>HOW CLUVIO WORKS</span>
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.15]">
              From discovering a club
              <span className="block text-[var(--accent)]">
                to becoming part of it.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-xl sm:leading-8">
              Cluvio connects students and club leaders through one simple campus experience. Explore the step-by-step journey below.
            </p>

            {/* Role Tab Selector */}
            <div className="mt-12 inline-flex rounded-2xl border border-white/10 bg-[#111827] p-1.5 shadow-xl">
              <button
                type="button"
                onClick={() => setActiveTab("student")}
                className={`
                  flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200
                  ${
                    activeTab === "student"
                      ? "bg-[var(--accent)] text-black shadow-md"
                      : "text-white/60 hover:text-white"
                  }
                `}
              >
                <HiOutlineAcademicCap className="text-lg" />
                <span>Student Journey</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("president")}
                className={`
                  flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200
                  ${
                    activeTab === "president"
                      ? "bg-[var(--accent)] text-black shadow-md"
                      : "text-white/60 hover:text-white"
                  }
                `}
              >
                <HiOutlineShieldCheck className="text-lg" />
                <span>Club President Journey</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. DYNAMIC JOURNEY TIMELINE */}
        <section className="relative border-t border-white/10 bg-[#0B1120]/40 py-20 px-4 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center max-w-2xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {activeTab === "student" ? "5-Step Student Flow" : "5-Stage Leadership Flow"}
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {activeTab === "student"
                  ? "How students get involved on Cluvio"
                  : "How club leaders run their organization"}
              </h2>
            </div>

            {/* Sequence Cards */}
            <div className="space-y-8">
              {(activeTab === "student" ? studentSteps : presidentSteps).map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="relative grid gap-8 rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-10 lg:grid-cols-12 lg:items-center transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                  >
                    {/* Left: Step Info */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)]/10 font-mono text-sm font-bold text-[var(--accent)]">
                          {item.step}
                        </span>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                        {item.title}: <span className="text-white/80 text-xl sm:text-2xl font-normal">{item.headline}</span>
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                        {item.desc}
                      </p>
                    </div>

                    {/* Right: Realistic Context Mockup Card */}
                    <div className="lg:col-span-5">
                      <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-5 shadow-inner">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <Icon className="text-lg text-[var(--accent)]" />
                            <span className="text-xs font-semibold text-white">
                              Cluvio Module • Step {item.step}
                            </span>
                          </div>
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        </div>

                        {/* Interactive simulation based on step */}
                        <div className="mt-4 space-y-3">
                          {activeTab === "student" && index === 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 text-xs">
                                <span className="text-white/60">🔍 Searching &apos;Coding&apos;</span>
                                <span className="text-[var(--accent)]">3 Results</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="rounded-lg bg-cyan-500/15 px-2 py-1 text-[10px] text-[var(--accent)]">Technology</span>
                                <span className="rounded-lg bg-white/5 px-2 py-1 text-[10px] text-white/60">Design</span>
                                <span className="rounded-lg bg-white/5 px-2 py-1 text-[10px] text-white/60">Robotics</span>
                              </div>
                            </div>
                          )}

                          {activeTab === "student" && index === 1 && (
                            <div className="rounded-xl bg-white/5 p-3 text-xs">
                              <div className="flex justify-between font-semibold text-white">
                                <span>Design Society</span>
                                <span className="text-violet-400">UI/UX & 3D</span>
                              </div>
                              <p className="mt-1 text-[11px] text-white/50">48 Members • 12 Active Projects</p>
                              <div className="mt-2 text-[10px] text-emerald-400">✓ Recruits open for Spring 2026</div>
                            </div>
                          )}

                          {activeTab === "student" && index === 2 && (
                            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs">
                              <div className="flex items-center gap-2 font-semibold text-emerald-400">
                                <HiOutlineCheck className="text-base" />
                                <span>Membership Confirmed</span>
                              </div>
                              <p className="mt-1 text-[11px] text-white/60">
                                Student ID verified • Added to official announcements
                              </p>
                            </div>
                          )}

                          {activeTab === "student" && index === 3 && (
                            <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-3 text-xs">
                              <div className="flex justify-between items-center font-semibold text-white">
                                <span>AI Hackathon 2026</span>
                                <span className="text-[var(--accent)]">Pass #4092</span>
                              </div>
                              <div className="mt-2 flex items-center justify-between text-[11px] text-white/60">
                                <span>Auditorium Hall A</span>
                                <span className="flex items-center gap-1 text-[var(--accent)]">
                                  <HiOutlineQrCode className="text-sm" /> QR Ready
                                </span>
                              </div>
                            </div>
                          )}

                          {activeTab === "student" && index === 4 && (
                            <div className="rounded-xl bg-white/5 p-3 text-xs space-y-1.5">
                              <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                                <HiOutlineBell className="text-sm" /> Broadcast Update
                              </div>
                              <p className="text-[11px] text-white/70">
                                &quot;Hackathon kickoff meeting scheduled for Friday at 5:00 PM.&quot;
                              </p>
                            </div>
                          )}

                          {activeTab === "president" && (
                            <div className="rounded-xl bg-white/5 p-3 text-xs space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-white font-semibold">{item.title} Hub</span>
                                <span className="text-[10px] text-emerald-400">Active Stage</span>
                              </div>
                              <p className="text-[11px] text-white/60 leading-relaxed">
                                Integrated with Cluvio Campus Protocol. Zero spreadsheets required.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. THE CLUVIO ECOSYSTEM DIAGRAM */}
        <section className="relative py-20 px-4 sm:px-6 sm:py-28 lg:px-8 border-t border-white/10">
          <div className="mx-auto max-w-6xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Architecture
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              The Cluvio Ecosystem
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
              A triangular synchronization system connecting students, student organizations, and leadership into one seamless campus ecosystem.
            </p>

            {/* Central Ecosystem Diagram Card */}
            <div className="mt-16 mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B1120] p-8 sm:p-14 shadow-2xl relative">
              <div className="grid gap-8 md:grid-cols-3">
                {/* Node 1 */}
                <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-[var(--accent)]">
                    <HiOutlineAcademicCap className="text-2xl" />
                  </div>
                  <h4 className="mt-4 font-bold text-white text-lg">Students</h4>
                  <p className="mt-2 text-xs text-white/50">
                    Discover clubs, attend workshops, RSVP for tickets, and track campus achievements.
                  </p>
                </div>

                {/* Node 2: Central Platform */}
                <div className="rounded-2xl border border-[var(--accent)]/40 bg-gradient-to-b from-[#162032] to-[#0F172A] p-6 text-center shadow-[0_0_40px_rgba(34,211,238,0.15)] relative">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-black">
                    <HiOutlineSparkles className="text-2xl" />
                  </div>
                  <h4 className="mt-4 font-bold text-white text-lg">Cluvio Engine</h4>
                  <p className="mt-2 text-xs text-white/70">
                    Unified platform syncing attendance, rosters, announcements, and campus activities.
                  </p>
                </div>

                {/* Node 3 */}
                <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <HiOutlineShieldCheck className="text-2xl" />
                  </div>
                  <h4 className="mt-4 font-bold text-white text-lg">Presidents</h4>
                  <p className="mt-2 text-xs text-white/50">
                    Manage club rosters, publish broadcasts, launch events, and maintain official records.
                  </p>
                </div>
              </div>

              {/* Bottom Ecosystem Result Banner */}
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs text-white/70 flex flex-wrap items-center justify-center gap-4">
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <HiOutlineCheck className="text-emerald-400" /> One Campus Login
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <HiOutlineCheck className="text-emerald-400" /> Real-time Sync
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <HiOutlineCheck className="text-emerald-400" /> Zero Lost Updates
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA */}
        <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-t border-white/10">
          <div className="mx-auto max-w-4xl text-center rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B1120] p-10 sm:p-16 shadow-[0_20px_80px_rgba(2,8,23,0.4)]">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get involved?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
              Discover what your campus has to offer and unlock your full college experience today.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] active:scale-95"
              >
                Explore Clubs on Cluvio
              </Link>
              <Link
                href="/About"
                className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Learn More About Us
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
