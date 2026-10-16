"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineSquares2X2,
  HiOutlineArrowLeft,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#070709] text-neutral-100 selection:bg-white selection:text-black relative flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Background ambient radial glow & dot grid (Monochrome + 2% subtle violet) */}
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-violet-600/[0.05] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 transition-transform hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black shadow-xs transition-transform group-hover:scale-105">
            <HiOutlineSquares2X2 className="text-lg font-bold" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white">
              BroClubs
            </span>
            <span className="hidden sm:inline-block rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-2 py-0.5 text-[10px] font-mono font-medium text-violet-300">
              Campus OS
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-all backdrop-blur-md"
        >
          <HiOutlineArrowLeft className="text-xs" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Centered Auth Card Container */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center my-auto">
        {children}
      </div>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
        <p>© 2026 BroClubs. All rights reserved.</p>
        <a
          href="https://brocodestech.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <span>Built by BroCodes Technologies</span>
          <HiOutlineArrowTopRightOnSquare className="text-[10px]" />
        </a>
      </footer>
    </main>
  );
}
