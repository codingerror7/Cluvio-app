"use client";

import React, { useState, useEffect } from "react";
import {
  HiOutlineMegaphone,
  HiOutlinePlus,
  HiOutlineCalendarDays,
  HiXMark,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { api } from "@/lib/api";

export default function PresidentAnnouncementsView() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await api.announcements.getAll();
      if (res.success && Array.isArray(res.announcements)) {
        setAnnouncements(res.announcements);
      }
    } catch (err) {
      console.warn("Failed to load announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!newTitle || !newBody) return;

    setSubmitting(true);
    try {
      const res = await api.announcements.create({
        title: newTitle,
        message: newBody,
        priority,
      });

      if (res.success) {
        setShowModal(false);
        setNewTitle("");
        setNewBody("");
        setToastMsg("Announcement submitted for College Admin review.");
        setTimeout(() => setToastMsg(""), 3500);
        await loadAnnouncements();
      }
    } catch (err) {
      alert(err.message || "Failed to submit announcement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl text-left">
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
              Campus Broadcasts
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Announcements
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Official communications dispatched to club members and prospective candidates. All announcements require College Admin review.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
        >
          <HiOutlinePlus className="text-sm" />
          <span>Draft Announcement</span>
        </button>
      </div>

      {/* Announcements List */}
      {loading ? (
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-xs text-neutral-400">
          Loading announcements...
        </div>
      ) : announcements.length === 0 ? (
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-xs text-neutral-400">
          No announcements published yet. Click &ldquo;Draft Announcement&rdquo; to propose one.
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann._id}
              className="rounded-2xl border border-white/8 bg-[#0d0d10] p-6 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                      ann.priority === "Urgent"
                        ? "border-red-500/30 bg-red-500/10 text-red-300"
                        : ann.priority === "High"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                        : "border-white/10 bg-white/5 text-neutral-300"
                    }`}
                  >
                    {ann.priority} Priority
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-mono border ${
                      ann.status === "Approved"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                    }`}
                  >
                    {ann.status}
                  </span>
                </div>
                <span className="font-mono text-xs text-neutral-400">{ann.date || "Today"}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">{ann.title}</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">{ann.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d0d10] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <h2 className="text-base font-bold text-white">Draft Official Announcement</h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <HiXMark className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Hackathon Registrations Open"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#141418] px-3.5 py-2 text-xs text-white focus:outline-hidden"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Message Content</label>
                <textarea
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  rows={4}
                  placeholder="Write message details for club candidates and members..."
                  required
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
                  {submitting ? "Submitting..." : "Submit for Approval"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
