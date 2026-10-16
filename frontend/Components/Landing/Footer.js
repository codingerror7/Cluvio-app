"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineSquares2X2,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowUp,
} from "react-icons/hi2";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-white/8 bg-[#070709] py-12 sm:py-16 text-left">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Left Brand & Attribution */}
          <div className="space-y-3 max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-black shadow-xs">
                <HiOutlineSquares2X2 className="text-base font-bold" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                BroClubs
              </span>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              The next-generation operating system for university clubs, campus
              organizations, and student communities.
            </p>

            <div className="pt-1">
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-300 hover:text-white transition-colors"
              >
                <span>Built by BroCodes Technologies</span>
                <HiOutlineArrowTopRightOnSquare className="text-[11px] opacity-70" />
              </a>
            </div>
          </div>

          {/* Right Links & Access */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {/* Navigation */}
            <div className="space-y-3">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                Navigation
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a
                    href="#home"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About BroClubs
                  </a>
                </li>
                <li>
                  <a
                    href="#feedback"
                    className="hover:text-white transition-colors"
                  >
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            {/* Access Portals */}
            <div className="space-y-3">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                Portals
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link
                    href="/Login"
                    className="hover:text-white transition-colors"
                  >
                    Student Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Login"
                    className="hover:text-white transition-colors"
                  >
                    President Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-white transition-colors"
                  >
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Organization */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                Engineering
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a
                    href="https://brocodestech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>brocodestech.in</span>
                    <HiOutlineArrowTopRightOnSquare className="text-[10px]" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@brocodestech.in"
                    className="hover:text-white transition-colors"
                  >
                    contact@brocodestech.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 BroCodes Technologies. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <HiOutlineArrowUp className="text-xs" />
          </button>
        </div>
      </div>
    </footer>
  );
}