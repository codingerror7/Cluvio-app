"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineArrowRight,
  HiOutlineBars3,
  HiXMark,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";
import { getStoredUser, clearAuthToken } from "@/lib/api";
import ThemeToggle from "@/Components/ui/ThemeToggle";

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
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div
        className={`navbar-glass pointer-events-auto w-full max-w-5xl transition-all duration-300 rounded-2xl border ${
          scrolled
            ? "bg-[#09090b]/85 border-white/12 shadow-[0_12px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(139,92,246,0.04)] backdrop-blur-2xl"
            : "bg-[#0c0c0e]/65 border-white/8 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        } px-4 sm:px-6 py-3`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-transform hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black shadow-xs transition-transform group-hover:scale-105">
              <HiOutlineSquares2X2 className="text-lg font-bold" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                  BroClubs
                </span>
                
              </div>
            </div>
          </Link>

          {/* Center: Minimalist Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-neutral-400">
            <a
              href="#home"
              className="hover:text-white transition-colors duration-150"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-white transition-colors duration-150"
            >
              About
            </a>
            <a
              href="#faq"
              className="hover:text-white transition-colors duration-150"
            >
              FAQ
            </a>
            <a
              href="#feedback"
              className="hover:text-white transition-colors duration-150"
            >
              Feedback
            </a>
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors duration-150"
            >
              <span>BroCodes Tech</span>
              <HiOutlineArrowTopRightOnSquare className="text-[11px] opacity-70" />
            </a>
          </nav>

          {/* Right: Theme Toggle & Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Skipper UI Theme Toggle */}
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={getDashboardHref()}
                  className="flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/[0.08] hover:bg-violet-500/[0.15] px-4 py-1.5 text-xs font-medium text-white transition-all shadow-xs"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span>
                    {user.name?.split(" ")[0] || "User"} •{" "}
                    <span className="capitalize text-neutral-300">
                      {user.role}
                    </span>
                  </span>
                  <HiOutlineArrowRight className="text-xs text-neutral-400" />
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sign Out"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  <HiOutlineArrowLeftOnRectangle className="text-sm" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/student"
                  className="rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  Student Portal
                </Link>

                <Link
                  href="/president"
                  className="flex items-center gap-1.5 rounded-full bg-white hover:bg-neutral-200 px-4 py-1.5 text-xs font-semibold text-black transition-all cursor-pointer shadow-xs hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
                >
                  <span>President Portal</span>
                  <HiOutlineArrowRight className="text-xs" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Trigger & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            {!user && (
              <Link
                href="/Login"
                className="rounded-full bg-white/[0.06] border border-white/10 px-3 py-1 text-xs font-medium text-neutral-200"
              >
                Login
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neutral-300 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <HiXMark className="text-xl" />
              ) : (
                <HiOutlineBars3 className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col space-y-3 pb-2 animate-in fade-in duration-200">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-neutral-300">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 px-2 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 px-2 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
              >
                About BroClubs
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 px-2 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
              >
                FAQ
              </a>
              <a
                href="#feedback"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 px-2 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
              >
                Feedback
              </a>
              <a
                href="https://brocodestech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 px-2 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Built by BroCodes Technologies</span>
                <HiOutlineArrowTopRightOnSquare className="text-xs" />
              </a>
            </nav>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href={getDashboardHref()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-black font-semibold text-xs"
                  >
                    <span>Go to {user.role} Dashboard</span>
                    <HiOutlineArrowRight className="text-xs" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex h-9 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neutral-300 text-xs"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/Login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neutral-200 font-medium text-xs hover:bg-white/[0.08]"
                  >
                    Student Login
                  </Link>
                  <Link
                    href="/Login?role=president"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-10 items-center justify-center rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200"
                  >
                    President Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
