"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineBars3,
  HiOutlineMagnifyingGlass,
  HiOutlineBell,
  HiOutlineShieldCheck,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineXMark,
} from "react-icons/hi2";

export default function DashboardHeader({
  activeTab,
  user,
  setIsMobileOpen,
  handleLogout,
  announcements = [],
  onOpenAnnouncements,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const isClubHead = user?.role === "club head" || user?.role === "president";
  const isClubMember = user?.role === "club member";

  const tabTitles = {
    discover: { title: "Explore Campus Clubs", subtitle: "Find organizations, charters & open recruitment drives" },
    "my-clubs": { title: "My Clubs & Roster", subtitle: "Active memberships, club sessions & application tracking" },
    announcements: { title: "Campus Announcements", subtitle: "Official club updates, administrative notices & circulars" },
    hackathons: { title: "Hackathons & Sprints", subtitle: "Competitions, tech jams, team participation & prize pools" },
    events: { title: "Campus Events & Workshops", subtitle: "Upcoming technical meetups, speaker talks & schedules" },
    applications: { title: "My Applications Tracker", subtitle: "Review status of submitted club membership requests" },
    "member-workspace": { title: "Member Desk & Duties", subtitle: "Internal club tasks, meeting links & committee notes" },
    profile: { title: "My Profile & Skills", subtitle: "Manage your student credentials, domains & interests" },
  };

  const currentTab = tabTitles[activeTab] || {
    title: "Campus Dashboard",
    subtitle: "BroClubs Operations System",
  };

  const unreadAnnouncements = announcements.slice(0, 4);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left: Mobile Toggle & Tab Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
          title="Open Menu"
        >
          <HiOutlineBars3 className="text-xl" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
            {currentTab.title}
          </h1>
          <p className="hidden sm:block text-[11px] text-slate-500 font-normal">
            {currentTab.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            title="Announcements"
          >
            <HiOutlineBell className="text-base" />
            {unreadAnnouncements.length > 0 && (
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">
                  Latest Announcements ({unreadAnnouncements.length})
                </span>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto mt-1">
                {unreadAnnouncements.length === 0 ? (
                  <p className="py-4 text-center text-xs text-slate-400">
                    No new announcements.
                  </p>
                ) : (
                  unreadAnnouncements.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 text-xs hover:bg-slate-50 rounded-lg px-2 cursor-pointer transition-colors"
                      onClick={() => {
                        setShowNotifications(false);
                        if (onOpenAnnouncements) onOpenAnnouncements();
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 line-clamp-1">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.date || "Today"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {item.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    if (onOpenAnnouncements) onOpenAnnouncements();
                  }}
                  className="text-[11px] font-bold text-blue-600 hover:underline"
                >
                  View All Announcements →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick link to Head Console if Club Head */}
        {isClubHead && (
          <Link
            href="/president/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors shadow-2xs"
          >
            <HiOutlineShieldCheck className="text-sm text-amber-600" />
            <span>Head Console →</span>
          </Link>
        )}

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/80 px-2.5 py-1 text-xs">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-lg text-white font-bold text-[10px] ${
              isClubMember
                ? "bg-emerald-600"
                : isClubHead
                ? "bg-amber-600"
                : "bg-blue-600"
            }`}
          >
            {user?.name ? user.name.slice(0, 2).toUpperCase() : "ST"}
          </div>
          <span className="font-semibold text-slate-800 max-w-[110px] truncate text-xs">
            {user?.name || "Student"}
          </span>
          <span
            className={`hidden md:inline-block rounded px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
              isClubMember
                ? "bg-emerald-100 text-emerald-800"
                : isClubHead
                ? "bg-amber-100 text-amber-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {user?.role || "student"}
          </span>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleLogout}
          title="Sign Out"
          className="flex h-9 items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all cursor-pointer shadow-2xs"
        >
          <HiOutlineArrowLeftOnRectangle className="text-sm" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
