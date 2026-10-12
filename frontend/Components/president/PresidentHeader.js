"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineBars3,
  HiOutlineSquares2X2,
  HiOutlineShieldCheck,
  HiOutlineArrowLeftOnRectangle,
  HiOutlinePlus,
} from "react-icons/hi2";

export default function PresidentHeader({
  activeTab,
  user,
  ownedClubs = [],
  selectedClubId,
  setSelectedClubId,
  setIsMobileOpen,
  handleLogout,
  onOpenCreateClub,
}) {
  const activeClub =
    ownedClubs.find((c) => (c._id || c.id) === selectedClubId) || ownedClubs[0];

  const tabTitles = {
    requests: {
      title: "Student Join Applications",
      subtitle: "Screen applicants, schedule interviews, and accept new club members",
    },
    members: {
      title: "Club Members & Roster",
      subtitle: "Active committee members, domain assignments, and leadership team",
    },
    hackathons: {
      title: "Hackathons & Sprints Management",
      subtitle: "Host competitions, set tracks, and review registered student teams",
    },
    announcements: {
      title: "Club Announcements",
      subtitle: "Publish circulars and broadcast urgent notices to all campus students",
    },
    activities: {
      title: "Events & Workshops Management",
      subtitle: "Schedule technical workshops, speaker talks, and monitor student RSVPs",
    },
    duties: {
      title: "Member Duties & Tasks Assignment",
      subtitle: "Delegate duties to club members, set deadlines, and track completion",
    },
    settings: {
      title: "Recruitment & Charter Settings",
      subtitle: "Toggle hiring drives, customize hiring domains, and update meetups",
    },
    profile: {
      title: "Leadership Profile",
      subtitle: "Update club head credentials, department, and contact details",
    },
  };

  const currentTab = tabTitles[activeTab] || {
    title: "Club Head Console",
    subtitle: "BroClubs Leadership Desk",
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 sm:h-20 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
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
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
              {currentTab.title}
            </h1>
            {activeClub && (
              <span
                className={`hidden md:inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                  activeClub.recruitmentOpen !== false
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}
              >
                {activeClub.recruitmentOpen !== false
                  ? "● Recruitment Open"
                  : "● Recruitment Closed"}
              </span>
            )}
          </div>
          <p className="hidden sm:block text-[11px] text-slate-500 font-normal">
            {currentTab.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Club Switcher, Student View Link & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Club Switcher Dropdown */}
        {ownedClubs.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs">
            <select
              value={selectedClubId}
              onChange={(e) => setSelectedClubId(e.target.value)}
              className="h-9 rounded-xl border border-slate-200 bg-slate-50/70 px-2.5 font-bold text-slate-800 focus:border-amber-500 focus:bg-white outline-none cursor-pointer shadow-2xs max-w-[160px] sm:max-w-[200px] truncate"
            >
              {ownedClubs.map((c) => (
                <option key={c._id || c.id} value={c._id || c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Switch to Student Portal */}
        <Link
          href="/dashboard"
          className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <HiOutlineSquares2X2 className="text-sm text-slate-400" />
          <span>Student View</span>
        </Link>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/80 px-2.5 py-1 text-xs">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-[10px]">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : "HD"}
          </div>
          <span className="font-semibold text-slate-800 max-w-[110px] truncate text-xs">
            {user?.name || "Club Head"}
          </span>
          <span className="hidden lg:inline-block rounded bg-amber-100 border border-amber-200 px-1.5 py-0.2 text-[9px] font-bold uppercase text-amber-800">
            Head
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
