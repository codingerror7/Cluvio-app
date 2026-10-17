"use client";

import React, { useState } from "react";
import {
  HiOutlineBell,
  HiOutlineCalendarDays,
  HiOutlineUserPlus,
  HiOutlineCheckCircle,
  HiOutlineEnvelopeOpen,
  HiOutlineBookmark,
  HiOutlineShieldCheck,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { STUDENT_NOTIFICATIONS } from "@/lib/mockData";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState(STUDENT_NOTIFICATIONS);
  const [filter, setFilter] = useState("all"); // 'all' | 'unread'

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case "event":
        return <HiOutlineCalendarDays className="text-base text-neutral-300" />;
      case "invitation":
        return <HiOutlineUserPlus className="text-base text-neutral-300" />;
      case "reminder":
        return <HiOutlineBell className="text-base text-neutral-300" />;
      case "status":
      case "permit":
        return <HiOutlineShieldCheck className="text-base text-neutral-300" />;
      default:
        return <HiOutlineInformationCircle className="text-base text-neutral-300" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Filter & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/8 pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
              filter === "all"
                ? "bg-white text-black font-semibold shadow-xs"
                : "border border-white/8 bg-white/[0.02] text-neutral-400 hover:text-white"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
              filter === "unread"
                ? "bg-white text-black font-semibold shadow-xs"
                : "border border-white/8 bg-white/[0.02] text-neutral-400 hover:text-white"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer text-left sm:text-right"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleReadStatus(item.id)}
              className={`group flex items-start gap-4 rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer ${
                !item.read
                  ? "border-white/20 bg-white/[0.04] shadow-xs"
                  : "border-white/6 bg-[#0d0d10] hover:border-white/12 hover:bg-white/[0.02]"
              }`}
            >
              {/* Type Icon Container */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                  !item.read
                    ? "border-white/20 bg-white/[0.08]"
                    : "border-white/8 bg-white/[0.03]"
                }`}
              >
                {getIcon(item.type)}
              </div>

              {/* Notification Content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm tracking-tight ${
                        !item.read ? "font-semibold text-white" : "font-medium text-neutral-200"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" title="Unread" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 shrink-0">
                    {item.time}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 pt-2 text-[11px] text-neutral-400 font-mono">
                  <span>{item.club}</span>
                  <span>•</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/8 bg-white/[0.01] py-16 text-center">
          <HiOutlineEnvelopeOpen className="mx-auto text-3xl text-neutral-500 mb-2" />
          <p className="text-sm font-medium text-white">No unread notifications</p>
          <p className="mt-1 text-xs text-neutral-400">
            You are fully up to date with all club announcements and events.
          </p>
        </div>
      )}
    </div>
  );
}
