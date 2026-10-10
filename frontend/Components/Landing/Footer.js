"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineSquares2X2,
  HiOutlineEnvelope,
  HiOutlineArrowUpRight,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineSparkles,
} from "react-icons/hi2";

export default function Footer() {
  return (
    <footer className="mt-16 rounded-[36px] border border-white/10 bg-gradient-to-b from-[#0a1120] to-[#050811] p-8 sm:p-12 lg:p-14 shadow-[0_20px_80px_rgba(2,8,23,0.4)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand & BroCodes Attribution Column */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <HiOutlineSquares2X2 className="text-2xl font-bold" />
              </div>
              <div>
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  Cluvio
                </span>
                <p className="text-[11px] font-medium text-cyan-400">
                  College Club Operations System
                </p>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-white/60">
              Cluvio is a next-generation campus platform empowering student organizations, clubs, and college leadership to manage memberships, real-time requests, announcements, and events from one beautifully unified interface.
            </p>

            {/* BroCodes Technologies Showcase Badge */}
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.05] p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <HiOutlineSparkles className="text-cyan-400" />
                <span>A Product by BroCodes Technologies</span>
              </div>
              <p className="text-white/60 text-[11px] leading-relaxed">
                Engineering intelligent web architectures and transformative platforms for education and digital enterprises.
              </p>
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-cyan-300 font-bold hover:underline pt-1"
              >
                <span>Visit brocodestech.in</span>
                <HiOutlineArrowTopRightOnSquare className="text-xs" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:col-span-7">
            {/* Quick Portals & Auth */}
            <div>
              <h4 className="font-bold text-white text-sm tracking-wide uppercase">
                Access Portals
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-white/60">
                <li>
                  <Link href="/Login" className="hover:text-cyan-400 font-semibold text-white/80 transition-colors">
                    → Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-cyan-400 font-semibold text-cyan-300 transition-colors">
                    → Register Account
                  </Link>
                </li>
                <li>
                  <Link href="/Login" className="hover:text-white transition-colors">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link href="/Login" className="hover:text-white transition-colors">
                    Club Member Hub
                  </Link>
                </li>
                <li>
                  <Link href="/Login" className="hover:text-white transition-colors">
                    Club Head Console
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform Sections */}
            <div>
              <h4 className="font-bold text-white text-sm tracking-wide uppercase">
                Platform
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-white/60">
                <li>
                  <a href="#showcase" className="hover:text-white transition-colors">
                    Platform Overview
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Core Features
                  </a>
                </li>
                <li>
                  <a href="#roles" className="hover:text-white transition-colors">
                    3-Tier Roles
                  </a>
                </li>
                <li>
                  <a href="#clubs" className="hover:text-white transition-colors">
                    Active Clubs
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* BroCodes Technologies */}
            <div>
              <h4 className="font-bold text-white text-sm tracking-wide uppercase">
                BroCodes Tech
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-white/60">
                <li>
                  <a
                    href="https://brocodestech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-cyan-300 hover:underline"
                  >
                    <span>Official Website</span>
                    <HiOutlineArrowTopRightOnSquare className="text-[10px]" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://brocodestech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    About The Team
                  </a>
                </li>
                <li>
                  <a
                    href="https://brocodestech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Engineering Labs
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
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} Cluvio. Developed & Engineered by{" "}
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 font-semibold hover:underline"
            >
              BroCodes Technologies
            </a>{" "}
            (<a href="https://brocodestech.in" target="_blank" rel="noopener noreferrer" className="hover:text-white font-mono">brocodestech.in</a>). All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/Login" className="hover:text-cyan-300 font-medium">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-cyan-300 font-medium">
              Register
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}