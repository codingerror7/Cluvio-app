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
        <div className="relative rounded-[36px] bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#4F46E5] p-8 sm:p-14 lg:p-16 text-center text-white shadow-[0_20px_60px_rgba(37,99,235,0.25)] overflow-hidden">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-900/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-xs">
              <HiOutlineSparkles className="text-sm" />
              <span>Next-Generation Campus Experience</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to Transform Your
              <span className="block text-blue-100">Campus Club Operations?</span>
            </h2>

            <p className="mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-blue-100/90">
              Join thousands of active students and club presidents on Cluvio — engineered with precision by{" "}
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold underline decoration-white/70 hover:text-blue-200"
              >
                BroCodes Technologies
              </a>
              .
            </p>

            {/* Action Buttons: Register & Login */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group flex h-13 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-white px-8 text-sm font-bold text-blue-700 shadow-md hover:bg-blue-50 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Get Started Free</span>
                <HiOutlineArrowRight className="text-base transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/Login"
                className="flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Sign In to Portal</span>
                <HiOutlineArrowRight className="text-sm text-blue-200" />
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200/90">
              <span className="flex items-center gap-1.5">
                <HiOutlineShieldCheck className="text-white text-sm" />
                <span>Secret Key Protected</span>
              </span>
              <span>•</span>
              <span>Zero Setup Friction</span>
              <span>•</span>
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline inline-flex items-center gap-1 font-semibold"
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
