"use client";

import React, { useState } from "react";
import {
  HiOutlineMegaphone,
  HiOutlinePlus,
  HiOutlineBookmark,
  HiOutlineCalendarDays,
  HiOutlineUser,
  HiXMark,
  HiOutlineCheck,
} from "react-icons/hi2";
import { PRESIDENT_ANNOUNCEMENTS } from "@/lib/mockData";

export default function PresidentAnnouncementsView() {
  const [announcements, setAnnouncements] = useState(PRESIDENT_ANNOUNCEMENTS);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    const newAnn = {
      id: `ann-${Date.now()}`,
      title: newTitle,
      description: newBody,
      time: "Published just now",
      date: "17 Oct 2026",
      author: "Arjun Mehta",
      authorRole: "Club President",
      pinned: false,
    };

    setAnnouncements([newAnn, ...announcements]);
    setShowModal(false);
    setNewTitle("");
    setNewBody("");
    setToastMsg("Announcement broadcasted successfully.");
    setTimeout(() => setToastMsg(""), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-white/20 bg-black/90 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md">
          {toastMsg}
        </div>
      )}

      {/* Page Header (Part 27) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Campus Broadcasts
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Announcements
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Official communications dispatched to club members and prospective candidates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
        >
          <HiOutlinePlus className="text-sm" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border p-5 sm:p-6 transition-all ${
              item.pinned
                ? "border-white/20 bg-white/[0.04] shadow-xs"
                : "border-white/8 bg-[#0d0d10]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {item.pinned && (
                    <span className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white">
                      Pinned Notice
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-neutral-400">
                    {item.time}
                  </span>
                </div>
                <h3 className="text-base font-bold tracking-tight text-white pt-1">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setAnnouncements((prev) =>
                      prev.map((a) =>
                        a.id === item.id ? { ...a, pinned: !a.pinned } : a
                      )
                    )
                  }
                  className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title={item.pinned ? "Unpin notice" : "Pin notice"}
                >
                  <HiOutlineBookmark
                    className={`text-sm ${item.pinned ? "text-white" : ""}`}
                  />
                </button>
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {item.description}
            </p>

            <div className="mt-4 border-t border-white/6 pt-3 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white">
                  {item.author.charAt(0)}
                </div>
                <span>
                  {item.author} ({item.authorRole})
                </span>
              </div>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Announcement Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-50 w-full max-w-lg rounded-2xl border border-white/12 bg-[#0f0f12] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <h3 className="text-sm font-bold text-white">Publish New Announcement</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <HiXMark className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robotics Workshop Registration Open"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Announcement Body</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Registration for the upcoming robotics workshop is now open..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-white/10 px-3.5 py-1.5 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-white px-4 py-1.5 font-semibold text-black hover:bg-neutral-200"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
