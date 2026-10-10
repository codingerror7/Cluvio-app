"use client";

import React from "react";
import {
  HiOutlineSparkles,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineCpuChip,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
} from "react-icons/hi2";

export default function BroCodesSpotlight() {
  return (
    <section id="brocodes" className="my-16 py-8 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.05] via-violet-500/[0.05] to-cyan-500/[0.05] rounded-[40px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-cyan-500/20 bg-gradient-to-br from-[#0c1427]/90 via-[#0f172a]/95 to-[#160d2e]/90 p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-[0_20px_80px_rgba(2,8,23,0.5)] overflow-hidden">
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
                <HiOutlineSparkles className="text-sm" />
                <span>The Engineering Powerhouse Behind Cluvio</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Crafted with Pride by{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
                  BroCodes Technologies.
                </span>
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-white/70">
                <strong>Cluvio</strong> is an official product developed by{" "}
                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-cyan-300 underline decoration-cyan-400 hover:text-white transition-colors"
                >
                  BroCodes Technologies
                </a>
                . We design and ship high-impact digital solutions, specialized educational technologies, and community platforms that modernize student life.
              </p>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <HiOutlineBolt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">High Velocity</h4>
                    <p className="text-xs text-white/50 mt-0.5">Sub-second responses & real-time updates</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <HiOutlineShieldCheck className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Ironclad Security</h4>
                    <p className="text-xs text-white/50 mt-0.5">Role secrets & encrypted tokens</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <HiOutlineHeart className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Campus Centric</h4>
                    <p className="text-xs text-white/50 mt-0.5">Tailored for student organizations</p>
                  </div>
                </div>
              </div>

              {/* External Link Callout */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-2xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-black shadow-[0_0_24px_rgba(34,211,238,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Explore BroCodes Technologies</span>
                  <HiOutlineArrowTopRightOnSquare className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/50 hover:text-white font-mono transition-colors"
                >
                  🌐 brocodestech.in
                </a>
              </div>
            </div>

            {/* Right Interactive Brand Showcase Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-violet-500 text-black flex items-center justify-center font-black text-lg">
                      BC
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">BroCodes Technologies</h4>
                      <p className="text-xs text-white/50">Official Engineering Studio</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    Live Verified
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-white/60">Company Domain</span>
                    <a
                      href="https://brocodestech.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-cyan-300 font-bold hover:underline"
                    >
                      brocodestech.in
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-white/60">Core Product</span>
                    <span className="text-white font-semibold">Cluvio Club OS</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-white/60">Technology Stack</span>
                    <span className="text-white font-semibold">Next.js • Node • MongoDB</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-white/60">Target Sectors</span>
                    <span className="text-white font-semibold">Universities & Colleges</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://brocodestech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-xs font-semibold text-white hover:bg-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-all cursor-pointer"
                  >
                    <span>Visit brocodestech.in Official Site</span>
                    <HiOutlineArrowTopRightOnSquare className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
