"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBookmark,
  HiOutlineBell,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

export default function StudentSidebar({
  unreadCount = 2,
  onNavigate,
  className = "",
}) {
  const pathname = usePathname() || "";
  const router = useRouter();

  const navItems = [
    {
      label: "Home",
      href: "/student",
      icon: HiOutlineHome,
      exact: true,
    },
    {
      label: "Profile",
      href: "/student/profile",
      icon: HiOutlineUser,
    },
    {
      label: "Joined Clubs",
      href: "/student/clubs",
      icon: HiOutlineBookmark,
    },
    {
      label: "Notifications",
      href: "/student/notifications",
      icon: HiOutlineBell,
      badge: unreadCount,
    },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <aside
      className={`flex h-full w-64 flex-col justify-between border-r border-white/8 bg-[#09090b] p-4 text-neutral-300 ${className}`}
    >
      {/* Navigation Links */}
      <div className="flex flex-col gap-1.5">
        <div className="px-3 pb-3 pt-2">
          <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            Student Workspace
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white/[0.08] text-white font-semibold shadow-xs"
                    : "text-neutral-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {/* Subtle active left accent indicator */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
                )}

                <div className="flex items-center gap-3">
                  <Icon
                    className={`text-base transition-colors ${
                      isActive ? "text-white" : "text-neutral-400 group-hover:text-white"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-mono font-medium ${
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

      {/* Bottom Area: Student quick info & Logout */}
      <div className="flex flex-col gap-3 border-t border-white/8 pt-4">
        <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">ID: STU-2026-0142</span>
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" title="Enrolled & Active" />
          </div>
          <p className="mt-1 font-medium text-white truncate">Aarav Sharma</p>
          <p className="text-[11px] text-neutral-400 truncate">Computer Science • 3rd Year</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-neutral-400 transition-colors hover:bg-white/[0.05] hover:text-white cursor-pointer"
        >
          <HiOutlineArrowLeftOnRectangle className="text-base text-neutral-400 group-hover:text-white" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
