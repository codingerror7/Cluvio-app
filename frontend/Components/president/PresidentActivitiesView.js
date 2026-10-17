"use client";

import React, { useState } from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlinePlus,
  HiOutlineCheck,
  HiXMark,
} from "react-icons/hi2";
import { PRESIDENT_ACTIVITIES } from "@/lib/mockData";

export default function PresidentActivitiesView() {
  const [activities, setActivities] = useState(PRESIDENT_ACTIVITIES);
  const [statusTab, setStatusTab] = useState("Upcoming");
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCategory, setNewCategory] = useState("Technical Workshop");

  const filtered = activities.filter((act) => {
    if (statusTab === "All") return true;
    return act.status.toLowerCase() === statusTab.toLowerCase();
  });

  const handleCreateActivity = (e) => {
    e.preventDefault();
    if (!newName) return;

    const newAct = {
      id: `act-${Date.now()}`,
      name: newName,
      date: newDate || "TBA 2026",
      time: "03:00 PM",
      location: newLocation || "Engineering Lab B-204",
      participants: 0,
      status: "Upcoming",
      category: newCategory,
      description: "New club activity scheduled for current academic semester.",
    };

    setActivities([newAct, ...activities]);
    setShowModal(false);
    setNewName("");
    setNewDate("");
    setNewLocation("");
    setToastMsg("Activity scheduled successfully.");
    setTimeout(() => setToastMsg(""), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-white/20 bg-black/90 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md">
          {toastMsg}
        </div>
      )}

      {/* Page Header (Part 26) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Event & Sprint Coordination
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Activities
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Schedule workshops, field demonstrations, guest lectures, and competitive team challenges.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
        >
          <HiOutlinePlus className="text-sm" />
          <span>New Activity</span>
        </button>
      </div>

      {/* Tabs: Upcoming / Completed / Draft (Part 26) */}
      <div className="flex items-center gap-2 border-b border-white/8 pb-3 text-xs">
        {["Upcoming", "Completed", "Draft", "All"].map((tab) => {
          const isSelected = statusTab === tab;
          const count = activities.filter((a) =>
            tab === "All" ? true : a.status.toLowerCase() === tab.toLowerCase()
          ).length;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusTab(tab)}
              className={`rounded-full px-3.5 py-1.5 font-medium transition-colors cursor-pointer ${
                isSelected
                  ? "bg-white text-black font-semibold shadow-xs"
                  : "border border-white/8 bg-white/[0.02] text-neutral-400 hover:text-white"
              }`}
            >
              {tab} ({count})
            </button>
          );
        })}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col justify-between rounded-2xl border border-white/8 bg-[#0d0d10] p-5 transition-all hover:border-white/16 hover:-translate-y-0.5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                  {activity.category}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium font-mono ${
                    activity.status === "Upcoming"
                      ? "bg-white/10 text-white border border-white/20"
                      : activity.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-white/5 text-neutral-400 border border-white/8"
                  }`}
                >
                  {activity.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold tracking-tight text-white">
                  {activity.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-neutral-400 leading-relaxed">
                  {activity.description}
                </p>
              </div>

              <div className="space-y-1.5 border-t border-white/6 pt-3 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <HiOutlineCalendarDays className="text-neutral-400 text-sm" />
                  <span>
                    {activity.date} • {activity.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineMapPin className="text-neutral-400 text-sm" />
                  <span className="truncate">{activity.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-white/6 pt-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-neutral-400 font-mono">
                <HiOutlineUserGroup className="text-sm" />
                <span>{activity.participants} Registered</span>
              </div>
              <button
                type="button"
                onClick={() => setToastMsg(`Viewing details for ${activity.name}`)}
                className="rounded-lg border border-white/8 bg-white/[0.02] px-2.5 py-1 text-[11px] text-neutral-300 hover:text-white hover:border-white/16 cursor-pointer"
              >
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-white/8 bg-white/[0.01] py-16 text-center text-xs text-neutral-400">
          No activities found in this status category.
        </div>
      )}

      {/* New Activity Modal (UI Only) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-50 w-full max-w-md rounded-2xl border border-white/12 bg-[#0f0f12] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <h3 className="text-sm font-bold text-white">Create New Activity</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <HiXMark className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">Activity Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SLAM Mapping Sprint"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Date</label>
                <input
                  type="text"
                  placeholder="e.g. 15 Nov 2026"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Lab B-204"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-white/10 px-3 py-1.5 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-white px-4 py-1.5 font-semibold text-black hover:bg-neutral-200"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
