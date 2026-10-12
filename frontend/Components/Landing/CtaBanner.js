"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

export default function CtaBanner() {
  return (
    <section className="my-3 sm:my-5 relative">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-9 text-center text-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-indigo-100/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Next-Generation Campus Experience</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Ready to Transform Your{" "}
              <span className="block bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Campus Club Operations?
              </span>
            </h2>

            <p className="mx-auto max-w-lg text-sm sm:text-base leading-relaxed text-slate-500 font-normal">
              Join thousands of active students and club leaders building stronger campus communities.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="group flex h-10 sm:h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-slate-900 px-6 sm:px-7 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-slate-800 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Get Started Free</span>
                <HiOutlineArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/Login"
                className="flex h-10 sm:h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 sm:px-7 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
              >
                <span>Sign In to Portal</span>
                <HiOutlineArrowRight className="text-xs text-slate-400" />
              </Link>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <HiOutlineShieldCheck className="text-emerald-500 text-sm" />
                <span>Protected Role Portals</span>
              </span>
              <span>•</span>
              <span>Zero Setup Friction</span>
              <span>•</span>
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-blue-600 inline-flex items-center gap-1 font-semibold transition-colors"
              >
                brocodestech.in <HiOutlineArrowTopRightOnSquare className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
