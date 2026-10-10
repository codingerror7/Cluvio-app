"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowRight,
  HiOutlineBars3,
  HiXMark,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { getStoredUser, clearAuthToken } from "@/lib/api";

export default function LandingNavbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    setUser(null);
    router.push("/Login");
  };

  const getDashboardHref = () => {
    if (!user) return "/Login";
    if (user.role === "president" || user.role === "club head") {
      return "/president/dashboard";
    }
    return "/dashboard";
  };

  return (
    <>
      {/* Top BroCodes Technologies Announcement Bar */}
      <div className="relative z-50 bg-gradient-to-r from-[#0d1e3a] via-[#111c38] to-[#1e1038] border-b border-cyan-500/20 py-2 px-4 text-center text-xs font-medium text-white/90">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <HiOutlineSparkles className="text-sm animate-pulse" />
            <span>BroCodes Technologies Product:</span>
          </span>
          <span className="text-white/80">
            Cluvio is engineered & powered by{" "}
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white underline decoration-cyan-400 underline-offset-2 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
            >
              BroCodes Technologies
              <HiOutlineArrowTopRightOnSquare className="text-xs" />
            </a>
          </span>
          <span className="hidden md:inline text-white/30">•</span>
          <a
            href="https://brocodestech.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all"
          >
            Visit brocodestech.in ↗
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#070B13]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-[#070B13]/70 backdrop-blur-md border-b border-white/5"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo & BroCodes Attribution */}
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-transform group-hover:scale-105">
                <HiOutlineSquares2X2 className="text-2xl text-black font-bold" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold tracking-tight text-white">
                    Cluvio
                  </span>
                  <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                    v2.0
                  </span>
                </div>
                <span className="text-[10px] font-medium text-white/50 tracking-wide">
                  by{" "}
                  <a
                    href="https://brocodestech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-cyan-400 font-semibold hover:underline"
                  >
                    BroCodes Technologies
                  </a>
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
            <a
              href="#showcase"
              className="hover:text-cyan-300 transition-colors"
            >
              Overview
            </a>
            <a
              href="#features"
              className="hover:text-cyan-300 transition-colors"
            >
              Features
            </a>
            <a
              href="#roles"
              className="hover:text-cyan-300 transition-colors"
            >
              Roles & Access
            </a>
            <a
              href="#clubs"
              className="hover:text-cyan-300 transition-colors"
            >
              Featured Clubs
            </a>
            <a
              href="#brocodes"
              className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/90 hover:border-cyan-400/40 hover:text-cyan-300 transition-all"
            >
              <span>BroCodes Tech</span>
              <HiOutlineArrowTopRightOnSquare className="text-xs text-cyan-400" />
            </a>
            <a
              href="#faq"
              className="hover:text-cyan-300 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons (Login & Register) */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href={getDashboardHref()}
                  className="flex items-center gap-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>
                    {user.name?.split(" ")[0] || "User"} •{" "}
                    <span className="capitalize">{user.role}</span> Portal
                  </span>
                  <HiOutlineArrowRight className="text-xs" />
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sign Out"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  <HiOutlineArrowLeftOnRectangle className="text-base" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/Login"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 px-4.5 py-2 text-xs font-bold text-black shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Register Free</span>
                  <HiOutlineArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/Login"
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-semibold text-white"
            >
              Login
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
            >
              {mobileMenuOpen ? (
                <HiXMark className="text-2xl" />
              ) : (
                <HiOutlineBars3 className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/10 bg-[#070B13]/98 px-6 py-6 space-y-4 backdrop-blur-2xl">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-white/80">
              <a
                href="#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-cyan-300"
              >
                Overview
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-cyan-300"
              >
                Features
              </a>
              <a
                href="#roles"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-cyan-300"
              >
                Roles & Access
              </a>
              <a
                href="#clubs"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-cyan-300"
              >
                Featured Clubs
              </a>
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 text-cyan-400 flex items-center justify-between"
              >
                <span>BroCodes Technologies</span>
                <HiOutlineArrowTopRightOnSquare className="text-sm" />
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-cyan-300"
              >
                FAQ
              </a>
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/Login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 font-semibold text-white text-xs"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-cyan-400 font-bold text-black text-xs"
              >
                Create Account / Register
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
