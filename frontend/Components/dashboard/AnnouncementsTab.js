"use client";

import React, { useState } from "react";
import {
  HiOutlineMegaphone,
  HiOutlineMagnifyingGlass,
  HiOutlineCheckCircle,
  HiOutlineBellAlert,
  HiOutlineBookmark,
  HiOutlineCalendarDays,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

export default function AnnouncementsTab({
  announcements = [],
  joinedClubIds = [],
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All"); // 'All' | 'Urgent' | 'Joined' | 'Recruitment'
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [readIds, setReadIds] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("broclubs_read_announcements");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const markAsRead = (id) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      try {
        localStorage.setItem(
          "broclubs_read_announcements",
          JSON.stringify(updated)
        );
      } catch (e) {}
    }
  };

  const markAllAsRead = () => {
    const allIds = announcements.map((a, i) => a._id || a.id || `notice-${i}`);
    setReadIds(allIds);
    try {
      localStorage.setItem(
        "broclubs_read_announcements",
        JSON.stringify(allIds)
      );
    } catch (e) {}
  };

  const filteredNotices = announcements.filter((item, index) => {
    const id = item._id || item.id || `notice-${index}`;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase()) ||
      (item.clubName && item.clubName.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (filter === "Urgent") {
      return item.priority === "Urgent" || item.priority === "High";
    }
    if (filter === "Joined") {
      return item.clubId && joinedClubIds.includes(item.clubId);
    }
    if (filter === "Recruitment") {
      return (
        item.title.toLowerCase().includes("recruit") ||
        item.title.toLowerCase().includes("hiring") ||
        item.message.toLowerCase().includes("apply") ||
        item.message.toLowerCase().includes("team")
      );
    }
    return true;
  });

  const unreadCount = announcements.filter(
    (item, index) => !readIds.includes(item._id || item.id || `notice-${index}`)
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
              <HiOutlineMegaphone className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">
                  Campus Announcements
                </h2>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-rose-100 border border-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                    {unreadCount} Unread
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Official circulars from campus societies, clubs and campus leaders.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Urgent", "Joined", "Recruitment"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`
                  rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap
                  ${
                    filter === f
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }
                `}
              >
                {f === "Joined" ? "My Clubs Only" : f}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Announcements Grid / Feed */}
      <div className="space-y-3">
        {filteredNotices.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <HiOutlineBellAlert className="mx-auto text-3xl text-slate-300 mb-2" />
            <h3 className="text-sm font-bold text-slate-800">
              No announcements found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              There are no notices matching your current filter criteria. Check back soon for club updates.
            </p>
          </div>
        ) : (
          filteredNotices.map((notice, idx) => {
            const id = notice._id || notice.id || `notice-${idx}`;
            const isRead = readIds.includes(id);

            return (
              <div
                key={id}
                onClick={() => {
                  markAsRead(id);
                  setSelectedNotice(notice);
                }}
                className={`
                  group rounded-2xl border bg-white p-4 sm:p-5 shadow-xs transition-all duration-150 cursor-pointer hover:border-slate-300 hover:shadow-sm
                  ${
                    isRead
                      ? "border-slate-200/80 opacity-90"
                      : "border-blue-200/90 ring-1 ring-blue-500/10 bg-gradient-to-r from-blue-50/20 via-white to-white"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg border border-slate-200/70">
                      {notice.clubLogo || "📢"}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-500">
                          {notice.clubName || "Campus Administration"}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.2 text-[9px] font-bold uppercase ${
                            notice.priority === "Urgent"
                              ? "bg-rose-100 text-rose-700 border border-rose-200"
                              : notice.priority === "High"
                              ? "bg-amber-100 text-amber-700 border border-amber-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200/70"
                          }`}
                        >
                          {notice.priority || "Normal"}
                        </span>
                        {!isRead && (
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 group-hover:text-blue-600 transition-colors">
                        {notice.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                        {notice.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[10px] font-medium text-slate-400">
                      {notice.date || "Recent"}
                    </span>
                    <span className="mt-2 text-[11px] font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more →
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{selectedNotice.clubLogo || "📢"}</span>
                <div>
                  <p className="text-xs font-bold text-slate-500">
                    {selectedNotice.clubName || "Campus Administration"}
                  </p>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[9px] font-bold uppercase ${
                      selectedNotice.priority === "Urgent"
                        ? "bg-rose-100 text-rose-700"
                        : selectedNotice.priority === "High"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {selectedNotice.priority || "Normal"} Priority
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <h2 className="text-lg font-black text-slate-900">
                {selectedNotice.title}
              </h2>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 pb-1">
                <span className="flex items-center gap-1">
                  <HiOutlineCalendarDays /> {selectedNotice.date || "Today"}
                </span>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedNotice.message}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Dismiss Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
