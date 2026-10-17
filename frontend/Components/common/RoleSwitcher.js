"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineAcademicCap, HiOutlineShieldCheck, HiOutlineSparkles } from "react-icons/hi2";

/**
 * Dev / Preview Role Switcher
 * Allows 1-click toggling between Student Interface, President Interface, and Landing Page.
 */
export default function RoleSwitcher() {
  const pathname = usePathname() || "";
  const isStudent = pathname.startsWith("/student");
  const isPresident = pathname.startsWith("/president");

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-neutral-900/80 p-1 text-xs backdrop-blur-md">
      <Link
        href="/student"
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-all ${
          isStudent
            ? "bg-white text-black shadow-xs font-semibold"
            : "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
        }`}
        title="Switch to Student Interface"
      >
        <HiOutlineAcademicCap className="text-sm" />
        <span>Student</span>
      </Link>

      <Link
        href="/president"
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-all ${
          isPresident
            ? "bg-white text-black shadow-xs font-semibold"
            : "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
        }`}
        title="Switch to President Interface"
      >
        <HiOutlineShieldCheck className="text-sm" />
        <span>President</span>
      </Link>
    </div>
  );
}
