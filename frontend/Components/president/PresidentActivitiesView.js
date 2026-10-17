"use client";

import React, { useState, useEffect } from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlineCheckCircle,
  HiXMark,
} from "react-icons/hi2";
import { api } from "@/lib/api";

export default function PresidentActivitiesView() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [activityType, setActivityType] = useState("Workshop");

  const loadActivities = async () => {
    try {
      setLoading(true);
      const res = await api.activities.getAll();
      if (res.success && Array.isArray(res.activities)) {
        setActivities(res.activities);
      }
    } catch (err) {
      console.warn("Failed to load activities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    if (!title || !date) return;

    setSubmitting(true);
    try {
      const res = await api.activities.create({
        title,
        description,
        date,
        location,
        activityType,
      });

      if (res.success) {
        setShowModal(false);
        setTitle("");
        setDescription("");
        setDate("");
        setLocation("");
        setToastMsg("Activity proposal submitted for College Admin approval.");
        setTimeout(() => setToastMsg(""), 3500);
        await loadActivities();
      }
    } catch (err) {
      alert(err.message || "Failed to propose activity.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-emerald-500/30 bg-[#0d0d10] px-4 py-2.5 text-xs text-emerald-200 shadow-2xl backdrop-blur-md flex items-center gap-2">
          <HiOutlineCheckCircle className="text-base text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Event & Sprint Coordination
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Activities & Workshops
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Propose technical sprints, guest lectures, and lab sessions. All activities require College Admin approval.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
        >
          <HiOutlinePlus className="text-sm" />
          <span>Propose Activity</span>
        </button>
      </div>

      {/* Activities Grid */}
      {loading ? (
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-xs text-neutral-400">
          Loading scheduled activities...
        </div>
      ) : activities.length === 0 ? (
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-xs text-neutral-400">
          No activities proposed yet. Click &ldquo;Propose Activity&rdquo; to submit one for College Admin review.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((act) => (
            <div
              key={act._id}
              className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5 space-y-3"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                  {act.activityType || "Workshop"}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono border ${
                    act.status === "Approved"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                  }`}
                >
                  {act.status}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">{act.title}</h3>
                {act.description && (
                  <p className="text-xs text-neutral-400 line-clamp-2">{act.description}</p>
                )}
              </div>

              <div className="border-t border-white/6 pt-3 space-y-1 text-xs text-neutral-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <HiOutlineCalendarDays className="text-sm" />
                  <span>{act.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineMapPin className="text-sm" />
                  <span>{act.location || "Campus"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proposal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d0d10] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <h2 className="text-base font-bold text-white">Propose Club Activity</h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <HiXMark className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Activity Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. ROS2 Navigation Workshop"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Activity Type</label>
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#141418] px-3.5 py-2 text-xs text-white focus:outline-hidden"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Guest Lecture">Guest Lecture</option>
                  <option value="Coding Sprint">Coding Sprint</option>
                  <option value="Field Demo">Field Demo</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. CS Lab 3"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Briefly describe the syllabus, prerequisites, and expected outcomes..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200 disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Proposal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
