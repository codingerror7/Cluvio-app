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
    <section id="brocodes" className="my-4 py-2 relative">
      <div className="mx-auto w-full max-w-[1440px] px-2 sm:px-4">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-800">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                <span>The Engineering Team Behind BroClubs</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Crafted with Pride by{" "}
                <span className="bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                  BroCodes Technologies.
                </span>
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-slate-500 font-normal">
                <strong>BroClubs</strong> is an official product developed by{" "}
                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 underline decoration-slate-300 hover:text-blue-600 transition-colors"
                >
                  BroCodes Technologies
                </a>
                . We design and build modern digital systems, campus software, and enterprise products that elevate education and community operations.
              </p>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                    <HiOutlineBolt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">High Velocity</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-normal">Sub-second responses & live sync</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                    <HiOutlineShieldCheck className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Secure Roles</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-normal">Role secrets & verified access</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                    <HiOutlineHeart className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Campus Centric</h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-normal">Tailored for student life</p>
                  </div>
                </div>
              </div>

              {/* External Link Callout */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Explore BroCodes Technologies</span>
                  <HiOutlineArrowTopRightOnSquare className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-base shadow-xs">
                      BC
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">BroCodes Technologies</h4>
                      <p className="text-[11px] text-slate-500">Official Product Studio</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    Live Verified
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/60">
                    <span className="text-slate-500">Official Website</span>
                    <a
                      href="https://brocodestech.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-slate-900 font-bold hover:underline"
                    >
                      brocodestech.in
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/60">
                    <span className="text-slate-500">Flagship Product</span>
                    <span className="text-slate-900 font-semibold">BroClubs Campus OS</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/60">
                    <span className="text-slate-500">Tech Architecture</span>
                    <span className="text-slate-800 font-semibold">Next.js • Node • MongoDB</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/60">
                    <span className="text-slate-500">Focus Areas</span>
                    <span className="text-slate-800 font-semibold">Higher Education Tech</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://brocodestech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all cursor-pointer"
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
