"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineAcademicCap,
  HiOutlineIdentification,
  HiOutlineCalendarDays,
  HiOutlinePencilSquare,
  HiOutlineShieldCheck,
  HiOutlineBuildingLibrary,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { api, getStoredUser } from "@/lib/api";

const PREDEFINED_AVATARS = [
  { id: "1", path: "/avatars/avatar-1.svg", label: "Slot 1" },
  { id: "2", path: "/avatars/avatar-2.svg", label: "Slot 2" },
  { id: "3", path: "/avatars/avatar-3.svg", label: "Slot 3" },
  { id: "4", path: "/avatars/avatar-4.svg", label: "Slot 4" },
  { id: "5", path: "/avatars/avatar-5.svg", label: "Slot 5" },
];

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [pendingClubs, setPendingClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Edit fields
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("/avatars/avatar-1.svg");

  const loadData = async () => {
    try {
      setLoading(true);
      const [profRes, clubsRes] = await Promise.all([
        api.students.getProfile().catch(() => ({ student: getStoredUser() })),
        api.students.getMyClubs().catch(() => ({ joinedClubs: [], pendingClubs: [] })),
      ]);

      const stu = profRes.student || getStoredUser() || {
        name: "Student",
        email: "student@campus.edu",
        enrollmentNumber: "STU-2026-0142",
        department: "Computer Science",
        course: "B.Tech",
        year: "3rd Year",
        avatar: "/avatars/avatar-1.svg",
        profileStatus: "Approved",
      };

      setProfile(stu);
      setName(stu.name || "");
      setDepartment(stu.department || "Computer Science");
      setCourse(stu.course || "B.Tech");
      setYear(stu.year || "3rd Year");
      setPhone(stu.phone || "");
      setBio(stu.bio || "");
      setAvatar(stu.avatar || "/avatars/avatar-1.svg");

      if (clubsRes.joinedClubs) setJoinedClubs(clubsRes.joinedClubs);
      if (clubsRes.pendingClubs) setPendingClubs(clubsRes.pendingClubs);
    } catch (err) {
      console.warn("Profile load fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await api.students.updateProfile({
        name,
        department,
        course,
        year,
        phone,
        bio,
        avatar,
      });

      if (res.success && res.student) {
        setProfile(res.student);
        setIsEditing(false);
        setSuccessMsg(
          "Profile updated successfully! Your updates have been submitted to the College Admin for approval."
        );
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const copyStudentId = () => {
    const idToCopy = profile?.enrollmentNumber || profile?.studentId || "";
    if (idToCopy) {
      navigator.clipboard?.writeText(idToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-sm text-neutral-400">
        Loading verified student credentials...
      </div>
    );
  }

  const profileStatus = profile?.profileStatus || "Approved";

  return (
    <div className="space-y-8 max-w-5xl text-left">
      {/* Profile Approval Status Alert Banner */}
      {profileStatus === "Pending" && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <HiOutlineClock className="text-xl text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-100">
              Profile Status: Pending College Admin Approval
            </p>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              Your profile information has been submitted. While under review, your profile displays your submitted changes. Once your College Admin approves, your charter participation is fully activated.
            </p>
          </div>
        </div>
      )}

      {profileStatus === "Rejected" && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 text-xs sm:text-sm flex items-start gap-3">
          <HiOutlineXCircle className="text-xl text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-red-100">
              Profile Status: Rejected by College Admin
            </p>
            <p className="text-xs text-red-200/90 leading-relaxed">
              Reason: &ldquo;{profile?.profileRejectionReason || "Details did not meet institutional guidelines."}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="mt-2 text-xs font-bold text-white underline hover:no-underline cursor-pointer"
            >
              Correct and resubmit profile details →
            </button>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-200 text-xs">
          {successMsg}
        </div>
      )}

      {/* 1. Profile Header Card */}
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d10] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar Display */}
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl border-2 border-white/15 bg-neutral-800 shadow-md shrink-0">
              <img
                src={profile?.avatar || "/avatars/avatar-1.svg"}
                alt={profile?.name || "Student"}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {profile?.name}
                </h1>

                {/* Status Badges */}
                {profileStatus === "Approved" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-300">
                    <HiOutlineCheckCircle className="text-xs" />
                    Verified & Approved
                  </span>
                )}
                {profileStatus === "Pending" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-mono text-amber-300">
                    <HiOutlineClock className="text-xs" />
                    Pending Approval
                  </span>
                )}
                {profileStatus === "Rejected" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-mono text-red-300">
                    <HiOutlineXCircle className="text-xs" />
                    Rejected
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-400">
                {profile?.course || "B.Tech"} in {profile?.department || "Computer Science"} • {profile?.year || "1st Year"}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-neutral-400 font-mono">
                <span className="flex items-center gap-1">
                  <HiOutlineIdentification className="text-sm" />
                  {profile?.enrollmentNumber || profile?.studentId || "STU-2026"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <HiOutlineBuildingLibrary className="text-sm" />
                  {profile?.collegeName || profile?.college?.name || "Campus Ecosystem"}
                </span>
                {profile?.phone && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <HiOutlinePhone className="text-sm" />
                      {profile.phone}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={copyStudentId}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-neutral-300 hover:border-white/20 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? "ID Copied ✓" : "Copy Student ID"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
            >
              <HiOutlinePencilSquare className="text-sm" />
              <span>{isEditing ? "Close Editor" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        {profile?.bio && (
          <div className="mt-6 border-t border-white/6 pt-4">
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {profile.bio}
            </p>
          </div>
        )}
      </div>

      {/* Edit Profile Form Modal / Inline Panel */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="rounded-2xl border border-white/10 bg-[#0d0d10] p-6 sm:p-8 space-y-5">
          <div className="border-b border-white/8 pb-4">
            <h2 className="text-lg font-bold text-white">Edit Academic Profile</h2>
            <p className="text-xs text-neutral-400">
              Select one of the 5 predefined avatar slots and update your information. Changes enter College Admin review.
            </p>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-200">
              {errorMsg}
            </div>
          )}

          {/* 5 Predefined Avatar Slots */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-300 block">
              Predefined Avatar Slots (5 Slots)
            </label>
            <div className="grid grid-cols-5 gap-3">
              {PREDEFINED_AVATARS.map((av) => {
                const isSelected = avatar === av.path;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setAvatar(av.path)}
                    className={`flex flex-col items-center gap-2 p-2.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-white bg-white/10 ring-2 ring-white"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <img src={av.path} alt={av.label} className="w-14 h-14 rounded-xl object-cover" />
                    <span className="text-[11px] font-mono text-neutral-300">{av.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">Course</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="e.g. B.Tech"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">Year of Study</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#141418] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-neutral-300 block">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 ..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-neutral-300 block">Bio / About</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Share your interests..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-white px-5 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              {saving ? "Submitting..." : "Save & Submit for Approval"}
            </button>
          </div>
        </form>
      )}

      {/* 2. Joined & Pending Clubs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/8 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">Your Campus Charters</h2>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-mono text-neutral-300">
              {joinedClubs.length} Active
            </span>
          </div>
          <Link
            href="/student"
            className="flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <span>Explore Clubs</span>
            <HiOutlineArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Pending Join Requests */}
        {pendingClubs.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Pending Join Approvals ({pendingClubs.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pendingClubs.map((club) => (
                <div
                  key={club._id || club.id}
                  className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.03] p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{club.logo || "💻"}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{club.name}</h4>
                      <p className="text-[11px] text-amber-300 font-mono">
                        Application Pending College Admin Review
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-300">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Joined Clubs */}
        {joinedClubs.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-8 text-center text-xs text-neutral-400">
            You haven&apos;t joined any clubs yet.{" "}
            <Link href="/student" className="text-white font-semibold underline">
              Browse approved campus clubs
            </Link>{" "}
            and submit a join request.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {joinedClubs.map((club) => (
              <div
                key={club._id || club.id}
                className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{club.logo || "💻"}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{club.name}</h3>
                    <p className="text-xs text-neutral-400">
                      {club.category} • {club.role || "General Member"}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-300">
                  Active Member
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
