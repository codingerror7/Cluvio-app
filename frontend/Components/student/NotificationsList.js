"use client";

import React, { useState, useEffect } from "react";
import {
  HiOutlineBell,
  HiOutlineCalendarDays,
  HiOutlineUserPlus,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineInformationCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { api } from "@/lib/api";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.notifications.getAll();
      if (res.success && Array.isArray(res.notifications)) {
        setNotifications(res.notifications);
      }
    } catch (err) {
      console.warn("Notifications fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await api.notifications.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.notifications.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Mark all read error:", err);
    }
  };

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type) => {
    switch (type) {
      case "event":
        return <HiOutlineCalendarDays className="text-base text-neutral-300" />;
      case "approval":
        return <HiOutlineCheckCircle className="text-base text-emerald-400" />;
      case "rejection":
        return <HiOutlineXCircle className="text-base text-red-400" />;
      case "membership":
        return <HiOutlineUserPlus className="text-base text-blue-400" />;
      case "president_code":
        return <HiOutlineShieldCheck className="text-base text-amber-400" />;
      default:
        return <HiOutlineInformationCircle className="text-base text-neutral-300" />;
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-xs text-neutral-400">
        Loading campus notifications...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl text-left">
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
            onClick={handleMarkAllAsRead}
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
              key={item._id}
              onClick={() => handleMarkAsRead(item._id)}
              className={`group flex items-start gap-4 rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer ${
                item.isRead
                  ? "border-white/6 bg-[#0c0c0e] text-neutral-400 hover:border-white/12"
                  : "border-white/15 bg-white/[0.03] text-white hover:border-white/25"
              }`}
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                  item.isRead
                    ? "border-white/8 bg-white/[0.02]"
                    : "border-white/20 bg-white/[0.06]"
                }`}
              >
                {getIcon(item.type)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white group-hover:text-neutral-100">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[10px] text-neutral-400 shrink-0">
                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  {item.message}
                </p>
              </div>

              {!item.isRead && (
                <span className="h-2 w-2 rounded-full bg-white shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/8 bg-white/[0.01] py-16 text-center text-xs text-neutral-400">
          You&apos;re all caught up. No notifications found.
        </div>
      )}
    </div>
  );
}
