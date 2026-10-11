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
      setScrolled(window.scrollY > 15);
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
      {/* Top Banner Capsule (Matching the Reference Image Header) */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-blue-100 py-2.5 px-4 text-center text-xs font-medium text-slate-700">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-blue-600 font-bold">
            <HiOutlineSparkles className="text-sm" />
            <span>Join the Cluvio Community</span>
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">
            Connect with club heads from top colleges
          </span>
          <span className="text-slate-400">•</span>
          <a
            href="https://brocodestech.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
          >
            A BroCodes Technologies Product
            <HiOutlineArrowTopRightOnSquare className="text-xs" />
          </a>
        </div>
      </div>

      {/* Main Light Theme Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            : "bg-white/80 backdrop-blur-md border-b border-slate-200/60"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Brand Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-transform group-hover:scale-105">
                <HiOutlineSquares2X2 className="text-2xl text-white font-bold" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-slate-900">
                    Cluvio
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <span>Manage Clubs</span>
                  <span>•</span>
                  <span>Build Community</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (Matching Screenshot) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a
              href="#home"
              className="relative text-blue-600 transition-colors py-1"
            >
              Home
              <span className="absolute bottom-[-10px] left-0 right-0 h-0.5 rounded-full bg-blue-600" />
            </a>
            <a
              href="#features"
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#roles"
              className="hover:text-blue-600 transition-colors"
            >
              Roles & Access
            </a>
            <a
              href="#clubs"
              className="hover:text-blue-600 transition-colors"
            >
              Active Clubs
            </a>
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <span>BroCodes Tech</span>
              <HiOutlineArrowTopRightOnSquare className="text-xs text-blue-500" />
            </a>
            <a
              href="#faq"
              className="hover:text-blue-600 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons: Sign In + Get Started */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href={getDashboardHref()}
                  className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-all shadow-xs"
                >
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <HiOutlineArrowLeftOnRectangle className="text-base" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/Login"
                  className="rounded-full border border-slate-200/90 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-xs"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="group flex items-center gap-1.5 rounded-full bg-[#2563EB] px-5.5 py-2.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:bg-[#1D4ED8] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Get Started</span>
                  <HiOutlineArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/Login"
              className="rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700"
            >
              Sign In
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"
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
          <div className="sm:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-4 shadow-lg">
            <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-700">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-blue-600"
              >
                Home
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-blue-600"
              >
                Features
              </a>
              <a
                href="#roles"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-blue-600"
              >
                Roles & Access
              </a>
              <a
                href="#clubs"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-blue-600"
              >
                Active Clubs
              </a>
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 text-blue-600 flex items-center justify-between"
              >
                <span>BroCodes Technologies (brocodestech.in)</span>
                <HiOutlineArrowTopRightOnSquare className="text-sm" />
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-blue-600"
              >
                FAQ
              </a>
            </nav>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/Login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-full items-center justify-center rounded-full border border-slate-200 bg-white font-semibold text-slate-800 text-xs shadow-xs"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-full items-center justify-center rounded-full bg-[#2563EB] font-bold text-white text-xs shadow-sm"
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
