"use client";

import React from "react";
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineHeart,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

export default function BroCodesSpotlight() {
  return (
    <section id="brocodes" className="my-3 sm:my-4 relative">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 lg:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-800">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                <span>The Engineering Team Behind BroClubs</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-black tracking-tight text-slate-900 leading-tight">
                Crafted with Pride by{" "}
                <span className="bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                  BroCodes Technologies.
                </span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-slate-500 font-normal">
                <strong>BroClubs</strong> is an official product engineered by{" "}
                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 underline decoration-slate-300 hover:text-blue-600 transition-colors"
                >
                  BroCodes Technologies
                </a>
                {" "}— building modern digital systems for universities and student communities.
              </p>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                    <HiOutlineBolt className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">High Velocity</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-normal">Real-time live sync</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                    <HiOutlineShieldCheck className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Secure Roles</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-normal">Passkey protected</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                    <HiOutlineHeart className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Campus Centric</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-normal">Tailored for student life</p>
                  </div>
                </div>
              </div>

              {/* External Link Callout */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-slate-800 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Explore BroCodes Technologies</span>
                  <HiOutlineArrowTopRightOnSquare className="text-xs sm:text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-mono transition-colors"
                >
                  <HiOutlineGlobeAlt className="text-sm text-slate-400" />
                  <span>brocodestech.in</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Brand Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 sm:p-5 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xs">
                      BC
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">BroCodes Technologies</h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500">Official Product Studio</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    Live Verified
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/60">
                    <span className="text-slate-500 text-[11px]">Official Website</span>
                    <a
                      href="https://brocodestech.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-slate-900 font-bold hover:underline text-[11px]"
                    >
                      brocodestech.in
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/60">
                    <span className="text-slate-500 text-[11px]">Flagship Product</span>
                    <span className="text-slate-900 font-semibold text-[11px]">BroClubs Campus OS</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/60">
                    <span className="text-slate-500 text-[11px]">Tech Architecture</span>
                    <span className="text-slate-800 font-semibold text-[11px]">Next.js • Node • MongoDB</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/60">
                    <span className="text-slate-500 text-[11px]">Focus Areas</span>
                    <span className="text-slate-800 font-semibold text-[11px]">Higher Education Tech</span>
                  </div>
                </div>

                <div className="pt-1">
                  <a
                    href="https://brocodestech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9.5 w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Visit brocodestech.in Official Site</span>
                    <HiOutlineArrowTopRightOnSquare className="text-xs" />
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
