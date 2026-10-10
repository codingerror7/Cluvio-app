"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

export default function CtaBanner() {
  return (
    <section className="my-16 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[36px] border border-cyan-500/30 bg-gradient-to-r from-[#0d1a33] via-[#101e38] to-[#1a1138] p-8 sm:p-14 lg:p-16 text-center backdrop-blur-2xl shadow-[0_20px_100px_rgba(34,211,238,0.15)] overflow-hidden">
          {/* Ambient Cyber Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[600px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
              <HiOutlineSparkles className="text-sm" />
              <span>Next-Generation Campus Experience</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
                Campus Club Experience?
              </span>
            </h2>

            <p className="mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-white/70">
              Join thousands of active students and club presidents on Cluvio — engineered with love by{" "}
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 font-bold underline decoration-cyan-400/50 hover:text-white"
              >
                BroCodes Technologies
              </a>
              .
            </p>

            {/* Action Buttons: Register & Login */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group flex h-13 w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-cyan-400 px-8 text-sm font-bold text-black shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Register for Free</span>
                <HiOutlineArrowRight className="text-base transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/Login"
                className="flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:border-white/40 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Sign In to Portal</span>
                <HiOutlineArrowRight className="text-sm text-white/60" />
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <HiOutlineShieldCheck className="text-emerald-400 text-sm" />
                <span>Secret Key Protected</span>
              </span>
              <span>•</span>
              <span>Zero Setup Cost</span>
              <span>•</span>
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline inline-flex items-center gap-1"
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
