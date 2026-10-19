"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineBuildingLibrary,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineMegaphone,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { PRESIDENT_CLUB, PRESIDENT_USER } from "@/lib/mockData";

export default function PresidentSidebarNav({ onNavigate, className = "" }) {
  const pathname = usePathname() || "";
  const router = useRouter();

  const navItems = [
    {
      label: "Dashboard",
      href: "/president",
      icon: HiOutlineSquares2X2,
      exact: true,
    },
    {
      label: "Club Profile",
      href: "/president/club",
      icon: HiOutlineBuildingLibrary,
    },
    {
      label: "Members",
      href: "/president/members",
      icon: HiOutlineUserGroup,
      badge: "128",
    },
    {
      label: "Activities",
      href: "/president/activities",
      icon: HiOutlineCalendarDays,
      badge: "4",
    },
    {
      label: "Announcements",
      href: "/president/announcements",
      icon: HiOutlineMegaphone,
    },
    {
      label: "Settings",
      href: "/president/settings",
      icon: HiOutlineCog6Tooth,
    },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <aside
      className={`flex h-full w-64 flex-col justify-between border-r border-white/8 bg-[#09090b] p-4 text-neutral-300 ${className}`}
    >
      {/* Top: Club Summary & Navigation */}
      <div className="flex flex-col gap-1.5">
        {/* Compact Club Identity in Sidebar */}
        <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-white/10 bg-neutral-800 shrink-0">
              <img
                src={PRESIDENT_CLUB.coverImage}
                alt={PRESIDENT_CLUB.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {PRESIDENT_CLUB.name}
              </p>
              <p className="text-[10px] text-neutral-400 truncate">
                President Console
              </p>
            </div>
          </div>
        </div>

        <div className="px-3 pb-2">
          <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            Administration
          </p>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === "/president" || pathname === "/president/dashboard"
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`group relative flex items-center justify-between rounded-xl px-3.5 py-3 text-xs font-medium transition-all min-h-[44px] touch-manipulation ${
                  isActive
                    ? "bg-white/[0.08] text-white font-semibold shadow-xs"
                    : "text-neutral-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {/* Active left indicator */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
                )}

                <div className="flex items-center gap-3">
                  <Icon
                    className={`text-lg transition-colors shrink-0 ${
                      isActive ? "text-white" : "text-neutral-400 group-hover:text-white"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-mono font-medium shrink-0 ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-white/10 text-neutral-300 border border-white/10"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: President info & Logout (Part 23) */}
      <div className="flex flex-col gap-3 border-t border-white/8 pt-4">
        <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">Term: 2025–2026</span>
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" title="Charter Active" />
          </div>
          <p className="mt-1 font-medium text-white truncate">{PRESIDENT_USER.name}</p>
          <p className="text-[11px] text-neutral-400 truncate">President • {PRESIDENT_CLUB.name}</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-medium text-neutral-400 transition-colors hover:bg-white/[0.05] hover:text-white cursor-pointer min-h-[44px] touch-manipulation"
        >
          <HiOutlineArrowLeftOnRectangle className="text-lg text-neutral-400 group-hover:text-white shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
