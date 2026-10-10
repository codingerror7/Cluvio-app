"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineKey,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineBolt,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";

export default function HeroShowcase() {
  const [activePreviewTab, setActivePreviewTab] = useState("discover");

  return (
    <section id="showcase" className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Ambient Cyber Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-violet-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="mx-auto max-w-4xl text-center">
          {/* BroCodes Technologies Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-white/5 to-violet-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] mb-8">
            <HiOutlineSparkles className="text-sm text-cyan-400 shrink-0" />
            <span>A Product by</span>
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white underline decoration-cyan-400/60 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
            >
              BroCodes Technologies
              <HiOutlineArrowTopRightOnSquare className="text-xs" />
            </a>
            <span className="text-white/40">•</span>
            <span className="text-white/80">Next-Gen Campus OS</span>
          </div>

          {/* High Impact Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08] text-white">
            Empowering Campus
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
              Student Communities.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/65">
            <strong>Cluvio</strong> is the complete college club operations platform built by{" "}
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 font-semibold hover:underline"
            >
              BroCodes Technologies
            </a>
            . Connect students, empower club members, and give club heads full administrative power over memberships, events, and charters.
          </p>

          {/* Prominent Action Buttons (Register + Login) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/register"
              className="group flex h-13 w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 px-8 font-bold text-black shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer text-sm"
            >
              <span>Create Account Free</span>
              <HiOutlineArrowRight className="text-base transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/Login"
              className="flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 font-semibold text-white backdrop-blur-md hover:border-white/40 hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer text-sm"
            >
              <span>Sign In to Portal</span>
              <HiOutlineArrowRight className="text-sm text-white/50" />
            </Link>
          </div>

          {/* Quick Notice */}
          <p className="mt-3 text-xs text-white/45">
            ⚡ Quick 1-Click Demo accounts ready for Student, Club Member & Club Head!
          </p>
        </div>

        {/* 3-Role Entry Quick Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Student */}
          <div className="group relative rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/[0.07] to-transparent p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                <HiOutlineAcademicCap className="text-2xl" />
              </div>
              <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-bold text-cyan-300">
                Open Access
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-white">For Students</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Browse 50+ college clubs, RSVP to campus events, and submit 1-click membership requests to your favourite societies.
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-white/45">No key needed</span>
              <Link
                href="/Login"
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Student Portal</span>
                <HiOutlineArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Card 2: Club Member */}
          <div className="group relative rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.07] to-transparent p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                <HiOutlineUserGroup className="text-2xl" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                <HiOutlineKey className="text-xs" />
                Key Required
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-white">For Club Members</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Join internal club committees, contribute to projects, and receive verified credentials with the member access code.
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Key: admin123
              </span>
              <Link
                href="/Login"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Member Portal</span>
                <HiOutlineArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Card 3: Club Head */}
          <div className="group relative rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/[0.07] to-transparent p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300">
                <HiOutlineShieldCheck className="text-2xl" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
                <HiOutlineKey className="text-xs" />
                Key Required
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-white">For Club Heads</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Lead your college club with comprehensive tools: review join applications, manage membership rosters, and launch events.
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded">
                Key: admin123
              </span>
              <Link
                href="/Login"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Head Console</span>
                <HiOutlineArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>

        {/* Live UI Mockup / Showcase Interactive Preview Card */}
        <div className="mt-16 rounded-[36px] border border-white/10 bg-[#0B1120]/80 p-4 sm:p-6 lg:p-8 backdrop-blur-2xl shadow-[0_20px_100px_rgba(0,0,0,0.6)]">
          {/* Mockup Window Chrome Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-white/40 border-l border-white/10 pl-3">
                cluvio.brocodestech.in/app
              </span>
            </div>

            {/* Mock Tabs Switcher */}
            <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
              <button
                type="button"
                onClick={() => setActivePreviewTab("discover")}
                className={`rounded-lg px-3 py-1 font-semibold transition-all cursor-pointer ${
                  activePreviewTab === "discover"
                    ? "bg-cyan-500 text-black shadow-xs"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Student View
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewTab("requests")}
                className={`rounded-lg px-3 py-1 font-semibold transition-all cursor-pointer ${
                  activePreviewTab === "requests"
                    ? "bg-amber-400 text-black shadow-xs"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Club Head View
              </button>
            </div>
          </div>

          {/* Mock Window Content */}
          <div className="pt-6">
            {activePreviewTab === "discover" ? (
              <div className="space-y-6">
                {/* Simulated Stats Banner */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-2xl font-black text-white">50+</p>
                    <p className="text-xs text-white/50 mt-1">Campus Clubs</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-2xl font-black text-cyan-400">1,200+</p>
                    <p className="text-xs text-white/50 mt-1">Active Students</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-2xl font-black text-emerald-400">24/7</p>
                    <p className="text-xs text-white/50 mt-1">Real-time RSVP</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-2xl font-black text-violet-400">100%</p>
                    <p className="text-xs text-white/50 mt-1">BroCodes Powered</p>
                  </div>
                </div>

                {/* Sample Club Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">💻</span>
                      <span className="rounded-md bg-cyan-500/10 text-cyan-300 px-2 py-0.5 text-[10px] font-bold">
                        Technical
                      </span>
                    </div>
                    <h4 className="mt-3 font-bold text-white text-base">Coding & Tech Club</h4>
                    <p className="mt-1 text-xs text-white/60 line-clamp-2">
                      Fostering open-source innovation, competitive coding, and web technologies.
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                      <span className="text-white/40">128 Members</span>
                      <Link href="/register" className="font-semibold text-cyan-400 hover:underline">
                        Join Club →
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">🤖</span>
                      <span className="rounded-md bg-violet-500/10 text-violet-300 px-2 py-0.5 text-[10px] font-bold">
                        Engineering
                      </span>
                    </div>
                    <h4 className="mt-3 font-bold text-white text-base">Robotics & IoT Club</h4>
                    <p className="mt-1 text-xs text-white/60 line-clamp-2">
                      Hands-on hardware labs, autonomous rovers, and drone building workshops.
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                      <span className="text-white/40">94 Members</span>
                      <Link href="/register" className="font-semibold text-cyan-400 hover:underline">
                        Join Club →
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">🎨</span>
                      <span className="rounded-md bg-pink-500/10 text-pink-300 px-2 py-0.5 text-[10px] font-bold">
                        Creative
                      </span>
                    </div>
                    <h4 className="mt-3 font-bold text-white text-base">Design & Media Society</h4>
                    <p className="mt-1 text-xs text-white/60 line-clamp-2">
                      Graphic design, UI/UX prototyping, filmmaking, and photography showcases.
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                      <span className="text-white/40">82 Members</span>
                      <Link href="/register" className="font-semibold text-cyan-400 hover:underline">
                        Join Club →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5 text-left">
                <div className="flex items-center justify-between rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5 text-xs text-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👑</span>
                    <span className="font-semibold">
                      Club Head Leadership Panel: Instant Membership Request Moderation
                    </span>
                  </div>
                  <span className="font-mono text-[11px] bg-amber-500/20 px-2 py-0.5 rounded">
                    Secret Key Verified
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-bold text-sm">
                        AS
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Aarav Sharma (2nd Year, CS)</p>
                        <p className="text-xs text-white/50">Note: "Passionate about building full-stack web applications."</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30">
                        ✓ Approve
                      </button>
                      <button className="rounded-lg bg-rose-500/20 border border-rose-500/40 px-3 py-1 text-xs font-bold text-rose-300 hover:bg-rose-500/30">
                        ✕ Reject
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-violet-500/15 text-violet-300 flex items-center justify-center font-bold text-sm">
                        SR
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Sneha Roy (3rd Year, ECE)</p>
                        <p className="text-xs text-white/50">Note: "Experienced with Arduino and ROS robotics hardware."</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30">
                        ✓ Approve
                      </button>
                      <button className="rounded-lg bg-rose-500/20 border border-rose-500/40 px-3 py-1 text-xs font-bold text-rose-300 hover:bg-rose-500/30">
                        ✕ Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
