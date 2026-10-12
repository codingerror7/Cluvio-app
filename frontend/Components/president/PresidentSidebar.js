"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineShieldCheck,
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineBolt,
  HiOutlineMegaphone,
  HiOutlineCalendarDays,
  HiOutlineBriefcase,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineUser,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineXMark,
} from "react-icons/hi2";

export default function PresidentSidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  user,
  counts,
  handleLogout,
}) {
  const navItems = [
    {
      id: "requests",
      label: "Join Applications",
      icon: HiOutlineDocumentText,
      badge: counts?.pendingRequests > 0 ? `${counts.pendingRequests}` : null,
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      highlightBadge: true,
    },
    {
      id: "members",
      label: "Club Members Roster",
      icon: HiOutlineUserGroup,
      badge: counts?.members > 0 ? `${counts.members}` : null,
    },
    {
      id: "hackathons",
      label: "Hackathons & Sprints",
      icon: HiOutlineBolt,
      badge: "Manage",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      id: "announcements",
      label: "Announcements",
      icon: HiOutlineMegaphone,
      badge: counts?.announcements > 0 ? `${counts.announcements}` : null,
    },
    {
      id: "activities",
      label: "Events & Workshops",
      icon: HiOutlineCalendarDays,
      badge: counts?.events > 0 ? `${counts.events}` : null,
    },
    {
      id: "duties",
      label: "Member Duties & Tasks",
      icon: HiOutlineBriefcase,
      badge: counts?.tasks > 0 ? `${counts.tasks}` : null,
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      id: "settings",
      label: "Recruitment & Charter",
      icon: HiOutlineAdjustmentsHorizontal,
    },
    {
      id: "profile",
      label: "Leadership Profile",
      icon: HiOutlineUser,
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-white select-none">
      {/* Top Header / Brand */}
      <div>
        <div
          className={`flex items-center border-b border-slate-200/80 px-4 py-4 transition-all duration-200 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 outline-none group"
            title="BroClubs - Return to Home"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs group-hover:scale-105 transition-transform">
              <HiOutlineShieldCheck className="text-xl" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col leading-none">
                <span className="text-base font-black tracking-tight text-slate-900">
                  BroClubs
                </span>
                <span className="text-[10px] font-semibold text-amber-700 mt-0.5">
                  Head Console
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle Button */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer shadow-2xs"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <HiOutlineChevronRight className="text-xs" />
            ) : (
              <HiOutlineChevronLeft className="text-xs" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="flex lg:hidden h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            <HiOutlineXMark className="text-lg" />
          </button>
        </div>

        {/* Head Badge / Switch to Student View */}
        {!isCollapsed ? (
          <div className="mx-3 mt-3 mb-2 rounded-xl border border-amber-200 bg-amber-50/70 p-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-amber-900">
                Leadership Mode
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                {user?.role === "club head" ? "Club Head" : "President"}
              </span>
            </div>
            <Link
              href="/dashboard"
              className="mt-2 flex items-center justify-center gap-1.5 w-full rounded-lg bg-white border border-amber-200 hover:bg-amber-100/70 text-slate-800 font-semibold text-[11px] py-1.5 shadow-2xs transition-all"
            >
              <HiOutlineSquares2X2 className="text-sm text-slate-500" />
              <span>Switch to Student View →</span>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center py-2 border-b border-slate-100">
            <span
              className="h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-amber-100"
              title="Club Head Console"
            />
          </div>
        )}

        {/* Navigation Items */}
        <div className="px-2 py-2 space-y-1">
          {!isCollapsed && (
            <p className="px-2.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Management Desk
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`
                  group relative flex w-full items-center rounded-xl transition-all cursor-pointer outline-none
                  ${
                    isCollapsed
                      ? "h-11 justify-center px-0"
                      : "h-10 justify-between px-3 text-left"
                  }
                  ${
                    isActive
                      ? "bg-slate-900 text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium"
                  }
                `}
              >
                <div
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "gap-3"
                  }`}
                >
                  <Icon
                    className={`text-lg transition-transform duration-150 ${
                      isActive
                        ? "text-white"
                        : "text-slate-500 group-hover:text-slate-800 group-hover:scale-110"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="text-xs truncate">{item.label}</span>
                  )}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : item.badgeColor ||
                          "bg-slate-100 text-slate-600 border border-slate-200/80"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Collapsed active pill indicator */}
                {isCollapsed && isActive && (
                  <span className="absolute right-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className="border-t border-slate-200/80 p-2.5 space-y-2">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-slate-50/60 p-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-xs uppercase shadow-2xs">
              {user?.name ? user.name.slice(0, 2) : "HD"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                {user?.name || "Club Head"}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {user?.email || "head@campus.edu"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-xs uppercase shadow-2xs cursor-pointer"
              title={`${user?.name || "Club Head"} (${user?.role || "head"})`}
            >
              {user?.name ? user.name.slice(0, 2) : "HD"}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          title="Sign Out of Console"
          className={`
            flex w-full items-center rounded-xl border border-rose-200/80 bg-rose-50/50 text-rose-700 hover:bg-rose-100 hover:border-rose-300 font-semibold text-xs transition-colors cursor-pointer shadow-2xs
            ${isCollapsed ? "h-10 justify-center px-0" : "h-9 justify-center gap-2 px-3"}
          `}
        >
          <HiOutlineArrowLeftOnRectangle className="text-base shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={`
          hidden lg:block shrink-0 h-screen sticky top-0 border-r border-slate-200/80 bg-white transition-all duration-200 z-30
          ${isCollapsed ? "w-[72px]" : "w-[256px]"}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`
          fixed top-0 bottom-0 left-0 w-[270px] bg-white z-50 lg:hidden shadow-2xl transition-transform duration-200 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {sidebarContent}
      </div>
    </>
  );
}
