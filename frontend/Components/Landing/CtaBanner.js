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
    <section className="my-4 sm:my-6 relative">
      <div className="mx-auto w-full max-w-[1440px] px-2 sm:px-4">
        <div className="relative rounded-3xl bg-slate-900 p-6 sm:p-10 lg:p-12 text-center text-white shadow-[0_20px_50px_rgba(15,23,42,0.15)] overflow-hidden">
          {/* Subtle Aesthetic Mesh Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold text-slate-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Next-Generation Campus Experience</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to Transform Your
              <span className="block text-slate-200">Campus Club Operations?</span>
            </h2>

            <p className="mx-auto max-w-lg text-base sm:text-lg leading-relaxed text-slate-400 font-normal">
              Join thousands of active students and club presidents on BroClubs — engineered with precision by{" "}
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold underline decoration-white/30 hover:decoration-white transition-colors"
              >
                BroCodes Technologies
              </a>
              .
            </p>

            {/* Minimalist Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/register"
                className="group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Get Started Free</span>
                <HiOutlineArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/Login"
                className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Sign In to Portal</span>
                <HiOutlineArrowRight className="text-sm text-slate-400" />
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <HiOutlineShieldCheck className="text-emerald-400 text-sm" />
                <span>Protected Role Portals</span>
              </span>
              <span>•</span>
              <span>Zero Setup Friction</span>
              <span>•</span>
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white inline-flex items-center gap-1 font-semibold transition-colors"
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
