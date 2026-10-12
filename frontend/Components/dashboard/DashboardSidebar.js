"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineSquares2X2,
  HiOutlineMagnifyingGlass,
  HiOutlineUserGroup,
  HiOutlineMegaphone,
  HiOutlineBolt,
  HiOutlineCalendarDays,
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineXMark,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

export default function DashboardSidebar({
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
  const isClubMember = user?.role === "club member";
  const isClubHead = user?.role === "club head" || user?.role === "president";

  const primaryNavItems = [
    {
      id: "discover",
      label: "Explore Clubs",
      icon: HiOutlineMagnifyingGlass,
      badge: counts?.clubs ? `${counts.clubs}` : null,
    },
    {
      id: "my-clubs",
      label: "My Clubs",
      icon: HiOutlineUserGroup,
      badge: counts?.joinedClubs > 0 ? `${counts.joinedClubs}` : null,
    },
    {
      id: "announcements",
      label: "Announcements",
      icon: HiOutlineMegaphone,
      badge: counts?.announcements > 0 ? `${counts.announcements}` : null,
      highlightBadge: true,
    },
    {
      id: "hackathons",
      label: "Hackathons & Sprints",
      icon: HiOutlineBolt,
      badge: "Live",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      id: "events",
      label: "Campus Events",
      icon: HiOutlineCalendarDays,
      badge: null,
    },
    {
      id: "applications",
      label: "My Applications",
      icon: HiOutlineDocumentText,
      badge: counts?.pendingRequests > 0 ? `${counts.pendingRequests}` : null,
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    },
  ];

  const secondaryNavItems = [
    {
      id: "profile",
      label: "Profile & Skills",
      icon: HiOutlineUser,
    },
  ];

  if (isClubMember || counts?.joinedClubs > 0) {
    primaryNavItems.push({
      id: "member-workspace",
      label: "Member Desk",
      icon: HiOutlineBriefcase,
      badge: isClubMember ? "Member" : null,
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    });
  }

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
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs group-hover:scale-105 transition-transform">
              <HiOutlineSquares2X2 className="text-lg" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col leading-none">
                <span className="text-base font-black tracking-tight text-slate-900">
                  BroClubs
                </span>
                <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                  Campus Operations
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

        {/* User Role Pill Status */}
        {!isCollapsed ? (
          <div className="mx-3 mt-3 mb-2 rounded-xl border border-slate-200/80 bg-slate-50/70 p-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-500">
                Current Role
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  isClubMember
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : isClubHead
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isClubMember
                      ? "bg-emerald-600"
                      : isClubHead
                      ? "bg-amber-600"
                      : "bg-blue-600"
                  }`}
                />
                {user?.role || "Student"}
              </span>
            </div>
            {isClubHead && (
              <Link
                href="/president/dashboard"
                className="mt-2 flex items-center justify-center gap-1.5 w-full rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-[11px] py-1.5 shadow-2xs transition-all"
              >
                <HiOutlineShieldCheck className="text-sm" />
                <span>Open Head Console →</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="flex justify-center py-2 border-b border-slate-100">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isClubMember
                  ? "bg-emerald-500 ring-2 ring-emerald-100"
                  : isClubHead
                  ? "bg-amber-500 ring-2 ring-amber-100"
                  : "bg-blue-600 ring-2 ring-blue-100"
              }`}
              title={`Role: ${user?.role || "Student"}`}
            />
          </div>
        )}

        {/* Navigation Items */}
        <div className="px-2 py-2 space-y-1">
          {!isCollapsed && (
            <p className="px-2.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Campus Nav
            </p>
          )}

          {primaryNavItems.map((item) => {
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
                          (item.highlightBadge
                            ? "bg-rose-100 text-rose-700 border border-rose-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200/80")
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Collapsed active pill indicator */}
                {isCollapsed && isActive && (
                  <span className="absolute right-1 h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </button>
            );
          })}

          {!isCollapsed && (
            <p className="px-2.5 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Account
            </p>
          )}

          {secondaryNavItems.map((item) => {
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
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className="border-t border-slate-200/80 p-2.5 space-y-2">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-slate-50/60 p-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-xs uppercase shadow-2xs">
              {user?.name ? user.name.slice(0, 2) : "ST"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                {user?.name || "Campus Student"}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {user?.email || "student@campus.edu"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-xs uppercase shadow-2xs cursor-pointer"
              title={`${user?.name || "Student"} (${user?.role || "student"})`}
            >
              {user?.name ? user.name.slice(0, 2) : "ST"}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          title="Sign Out of Session"
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
