"use client";

import React from "react";
import {
  HiOutlineSparkles,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineHeart,
} from "react-icons/hi2";

export default function BroCodesSpotlight() {
  return (
    <section id="brocodes" className="my-16 py-4 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-blue-200/90 bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/80 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(37,99,235,0.06)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/70 px-3.5 py-1 text-xs font-semibold text-blue-700">
                <HiOutlineSparkles className="text-sm" />
                <span>The Engineering Team Behind Cluvio</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Crafted with Pride by{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  BroCodes Technologies.
                </span>
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600">
                <strong>Cluvio</strong> is an official product developed by{" "}
                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 underline decoration-blue-400 hover:text-blue-800 transition-colors"
                >
                  BroCodes Technologies
                </a>
                . We design and build modern digital systems, campus software, and enterprise products that elevate education and community operations.
              </p>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200/80">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <HiOutlineBolt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">High Velocity</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Sub-second responses & live sync</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <HiOutlineShieldCheck className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Ironclad Security</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Role secrets & token checks</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <HiOutlineHeart className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Campus Centric</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Tailored for student life</p>
                  </div>
                </div>
              </div>

              {/* External Link Callout */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Explore BroCodes Technologies</span>
                  <HiOutlineArrowTopRightOnSquare className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-blue-600 font-mono transition-colors"
                >
                  🌐 brocodestech.in
                </a>
              </div>
            </div>

            {/* Right Interactive Brand Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-xs">
                      BC
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">BroCodes Technologies</h4>
                      <p className="text-xs text-slate-500">Official Product Studio</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    Live Verified
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500">Official Website</span>
                    <a
                      href="https://brocodestech.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-blue-600 font-bold hover:underline"
                    >
                      brocodestech.in
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500">Flagship Product</span>
                    <span className="text-slate-800 font-semibold">Cluvio Club OS</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500">Tech Architecture</span>
                    <span className="text-slate-800 font-semibold">Next.js • Node • MongoDB</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
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
