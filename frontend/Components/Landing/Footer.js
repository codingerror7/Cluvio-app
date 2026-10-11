"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineSquares2X2,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineSparkles,
} from "react-icons/hi2";

export default function Footer() {
  return (
    <footer className="mt-16 rounded-[36px] border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-xs text-left">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand & BroCodes Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)]">
                <HiOutlineSquares2X2 className="text-2xl font-bold" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Cluvio
                </span>
                <p className="text-[11px] font-semibold text-blue-600">
                  College Club Operations System
                </p>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              Cluvio is a modern campus operating platform empowering student organizations, clubs, and college leaders to manage memberships, requests, and events from one unified interface.
            </p>

            {/* BroCodes Technologies Showcase Badge */}
            <div className="rounded-2xl border border-blue-200/80 bg-blue-50/60 p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <HiOutlineSparkles className="text-blue-600" />
                <span>A Product by BroCodes Technologies</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Engineering intelligent web architectures and transformative platforms for higher education and digital enterprises.
              </p>
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-blue-700 font-bold hover:underline pt-1"
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
              <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase">
                Access Portals
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                <li>
                  <Link href="/Login" className="hover:text-blue-600 font-bold text-slate-800 transition-colors">
                    → Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-blue-600 font-bold text-blue-600 transition-colors">
                    → Register Free
                  </Link>
                </li>
                <li>
                  <Link href="/Login" className="hover:text-slate-900 transition-colors">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link href="/Login" className="hover:text-slate-900 transition-colors">
                    Club Member Hub
                  </Link>
                </li>
                <li>
                  <Link href="/Login" className="hover:text-slate-900 transition-colors">
                    Club Head Console
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform Sections */}
            <div>
              <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase">
                Platform
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                <li>
                  <a href="#home" className="hover:text-slate-900 transition-colors">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-slate-900 transition-colors">
                    Core Features
                  </a>
                </li>
                <li>
                  <a href="#roles" className="hover:text-slate-900 transition-colors">
                    3-Tier Roles
                  </a>
                </li>
                <li>
                  <a href="#clubs" className="hover:text-slate-900 transition-colors">
                    Active Clubs
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-slate-900 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* BroCodes Technologies */}
            <div>
              <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase">
                BroCodes Tech
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                <li>
                  <a
                    href="https://brocodestech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline"
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
                    className="hover:text-slate-900 transition-colors"
                  >
                    About The Team
                  </a>
                </li>
                <li>
                  <a
                    href="https://brocodestech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Engineering Labs
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@brocodestech.in"
                    className="hover:text-slate-900 transition-colors"
                  >
                    contact@brocodestech.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 sm:flex-row text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Cluvio. Developed & Engineered by{" "}
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold hover:underline"
            >
              BroCodes Technologies
            </a>{" "}
            (<a href="https://brocodestech.in" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 font-mono">brocodestech.in</a>). All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/Login" className="hover:text-blue-600 font-semibold text-slate-700">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-blue-600 font-semibold text-blue-600">
              Register
            </Link>
            <a
              href="#home"
              className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}