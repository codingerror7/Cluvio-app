"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineChevronDown,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineUser,
  HiOutlineBars3,
  HiXMark,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import RoleSwitcher from "@/Components/common/RoleSwitcher";
import ThemeToggle from "@/Components/ui/ThemeToggle";

export default function AppTopbar({
  user,
  role = "student",
  onMenuToggle,
  isMobileMenuOpen,
}) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    router.push("/");
  };

  const profileHref = role === "president" ? "/president/club" : "/student/profile";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/8 bg-[#09090b]/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-neutral-300 md:hidden hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <HiXMark className="text-xl" />
            ) : (
              <HiOutlineBars3 className="text-xl" />
            )}
          </button>

          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black shadow-xs transition-transform group-hover:scale-105">
              <HiOutlineSquares2X2 className="text-lg font-bold" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                BroClubs
              </span>
              <span className="hidden sm:inline-block rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono font-medium text-neutral-400">
                {role === "president" ? "Club Console" : "Student Hub"}
              </span>
            </div>
          </Link>
        </div>

        {/* Right Section: Contact Us, Role Switcher, Theme Toggle, Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Role Switcher for seamless evaluation */}
          <div className="hidden sm:block">
            <RoleSwitcher />
          </div>

          {/* Contact Us */}
          <Link
            href="/Contact"
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-white/16 hover:bg-white/[0.05] hover:text-white"
          >
            <HiOutlineEnvelope className="text-sm" />
            <span>Contact Us</span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 pr-3 text-xs font-medium text-neutral-200 transition-all hover:border-white/20 hover:bg-white/[0.06] focus:outline-none cursor-pointer"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white/20 bg-neutral-800">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-bold text-white text-[11px]">
                    {user?.name ? user.name.charAt(0) : "U"}
                  </div>
                )}
              </div>
              <span className="hidden md:inline-block max-w-[120px] truncate font-medium text-white">
                {user?.name || "Student"}
              </span>
              <HiOutlineChevronDown
                className={`text-xs text-neutral-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-[#0f0f12] p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="border-b border-white/8 px-3 py-2.5">
                  <p className="text-xs font-semibold text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {user?.email}
                  </p>
                  <span className="mt-1.5 inline-block rounded-full bg-white/[0.06] border border-white/10 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                    {role === "president" ? "Club President" : "Undergraduate Student"}
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    href={profileHref}
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <HiOutlineUser className="text-sm" />
                    <span>View Profile</span>
                  </Link>
                  <Link
                    href="/Contact"
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-white sm:hidden"
                  >
                    <HiOutlineEnvelope className="text-sm" />
                    <span>Contact Us</span>
                  </Link>
                </div>

                <div className="border-t border-white/8 pt-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-neutral-400 transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer"
                  >
                    <HiOutlineArrowLeftOnRectangle className="text-sm" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
