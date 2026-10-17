"use client";

import React, { useState, useEffect } from "react";
import {
  HiOutlinePencilSquare,
  HiOutlineBuildingLibrary,
  HiOutlineUserGroup,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineTrash,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
  HiOutlinePlus,
} from "react-icons/hi2";
import { api, getStoredUser } from "@/lib/api";

export default function PresidentClubProfileView() {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technical");
  const [sector, setSector] = useState("Technical & Innovation");
  const [tags, setTags] = useState("");
  const [meetingSchedule, setMeetingSchedule] = useState("Weekly meetups");
  const [logo, setLogo] = useState("💻");

  const loadClub = async () => {
    try {
      setLoading(true);
      const res = await api.presidents.getMyClub();
      if (res.success && res.club) {
        setClub(res.club);
        setName(res.club.name || "");
        setDescription(res.club.description || "");
        setCategory(res.club.category || "Technical");
        setSector(res.club.sector || "Technical & Innovation");
        setTags(Array.isArray(res.club.tags) ? res.club.tags.join(", ") : "");
        setMeetingSchedule(res.club.meetingSchedule || "Weekly meetups");
        setLogo(res.club.logo || "💻");
      } else {
        setClub(null);
      }
    } catch (err) {
      console.warn("Failed to load club:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClub();
  }, []);

  const handleCreateClub = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setToastMsg(null);

    try {
      const res = await api.clubs.create({
        name,
        description,
        category,
        sector,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        meetingSchedule,
        logo,
      });

      if (res.success && res.club) {
        setClub(res.club);
        setIsCreating(false);
        setToastMsg("Club charter created! Awaiting College Admin approval.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to create club.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateClub = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setToastMsg(null);

    try {
      const res = await api.clubs.update(club._id, {
        name,
        description,
        category,
        sector,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        meetingSchedule,
        logo,
      });

      if (res.success && res.club) {
        setClub(res.club);
        setIsEditing(false);
        setToastMsg(
          "Edits submitted! Your requested changes are pending College Admin review. Currently approved data remains active."
        );
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to update club.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRequest = async () => {
    if (!window.confirm("Are you sure you want to request deletion of this club? This requires College Admin approval.")) {
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.clubs.delete(club._id);
      if (res.success) {
        setToastMsg("Club deletion request submitted to College Admin.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit deletion request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-xs text-neutral-400">
        Loading club charter information...
      </div>
    );
  }

  // If no club exists for this president, render Creation Form
  if (!club && !isCreating) {
    return (
      <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-4xl">🏛️</span>
        <h2 className="text-xl font-bold text-white">No Club Charter Registered</h2>
        <p className="text-xs text-neutral-400 leading-relaxed">
          As an authorized Club President, you have permission to charter a new club in your college. All proposed charters require College Admin approval before becoming active.
        </p>
        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <HiOutlinePlus className="text-base" />
          <span>Charter a New Club</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Charter Administration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {club ? club.name : "Create New Club Charter"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            {club
              ? "Manage your official club directory presence. Changes require College Admin review."
              : "Submit your club charter proposal for College Admin review."}
          </p>
        </div>

        {club && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDeleteRequest}
              disabled={submitting}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/5 px-3.5 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50"
            >
              <HiOutlineTrash className="text-sm" />
              <span>Request Deletion</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
            >
              <HiOutlinePencilSquare className="text-sm" />
              <span>{isEditing ? "Cancel Editing" : "Edit Club"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Notifications / Alerts */}
      {toastMsg && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-200 text-xs flex items-center gap-2">
          <HiOutlineCheckCircle className="text-base text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 text-xs flex items-center gap-2">
          <HiOutlineXCircle className="text-base text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Pending Changes Banner if president submitted edits that await review */}
      {club?.pendingChanges && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-amber-200 font-bold">
            <HiOutlineClock className="text-base text-amber-400" />
            <span>Club Edits Pending College Admin Review</span>
          </div>
          <p className="text-amber-200/80 leading-relaxed">
            You submitted changes to this club. While under review, the public student portal continues to display the currently approved version below.
          </p>
          <div className="rounded-xl border border-amber-500/20 bg-black/40 p-3 space-y-1 font-mono text-[11px] text-amber-300">
            {club.pendingChanges.name && <div>• Requested Name: &ldquo;{club.pendingChanges.name}&rdquo;</div>}
            {club.pendingChanges.description && <div>• Requested Description: &ldquo;{club.pendingChanges.description}&rdquo;</div>}
            {club.pendingChanges.category && <div>• Requested Category: {club.pendingChanges.category}</div>}
          </div>
        </div>
      )}

      {/* Creation / Edit Form */}
      {(isCreating || isEditing) && (
        <form
          onSubmit={isCreating ? handleCreateClub : handleUpdateClub}
          className="rounded-2xl border border-white/10 bg-[#0d0d10] p-6 sm:p-8 space-y-5"
        >
          <div className="border-b border-white/8 pb-4">
            <h2 className="text-lg font-bold text-white">
              {isCreating ? "Charter Proposal Form" : "Edit Club Information"}
            </h2>
            <p className="text-xs text-neutral-400">
              Submitted modifications enter the College Admin Approval Center.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-neutral-300 block">Club Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. AI & Machine Learning Society"
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-neutral-300 block">Description / Mission</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the club's objectives, projects, and activities..."
                rows={3}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#141418] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              >
                <option value="Technical">Technical</option>
                <option value="Engineering">Engineering</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Literary">Literary</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
                <option value="Creative">Creative</option>
                <option value="Social">Social</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">Sector</label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="e.g. Hardware & AI"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">Club Emoji / Icon</label>
              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="💻"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">Meeting Schedule</label>
              <input
                type="text"
                value={meetingSchedule}
                onChange={(e) => setMeetingSchedule(e.target.value)}
                placeholder="Thursdays at 5:00 PM"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-neutral-300 block">Tags (comma-separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="AI, Python, Neural Networks"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setIsCreating(false);
              }}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-white px-5 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              {submitting ? "Submitting..." : isCreating ? "Submit Charter for Approval" : "Submit Edits for Approval"}
            </button>
          </div>
        </form>
      )}

      {/* Currently Approved Club Visual Card */}
      {club && (
        <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d10] p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 flex items-center justify-center text-3xl">
                {club.logo || "💻"}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{club.name}</h2>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-mono border ${
                      club.status === "Active"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                    }`}
                  >
                    {club.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  {club.sector} • Category: {club.category}
                </p>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-neutral-400">
              <div>{club.membersCount || 1} Enrolled Members</div>
              <div className="text-[11px] text-neutral-500">Max: {club.maxMembers || 500}</div>
            </div>
          </div>

          <div className="border-t border-white/6 pt-4 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Active Charter Description
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {club.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/6 pt-4 text-xs">
            <div>
              <span className="font-mono text-neutral-400 block text-[11px]">Meeting Schedule</span>
              <span className="text-neutral-200">{club.meetingSchedule || "Weekly meetups"}</span>
            </div>
            <div>
              <span className="font-mono text-neutral-400 block text-[11px]">Tags</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {club.tags?.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-neutral-300 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
