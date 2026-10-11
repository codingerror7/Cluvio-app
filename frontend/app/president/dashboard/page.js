"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCalendarDays,
  HiOutlineSparkles,
  HiOutlineUser,
  HiOutlineBookmark,
  HiOutlineSquares2X2,
  HiXMark,
} from "react-icons/hi2";
import { api } from "@/lib/api";

const CATEGORIES = [
  "Technical",
  "Engineering",
  "Creative",
  "Cultural",
  "Entrepreneurship",
  "Sports",
  "Social",
];

export default function PresidentDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("my-clubs"); // 'my-clubs' | 'requests' | 'members' | 'profile'
  const [user, setUser] = useState(null);
  const [ownedClubs, setOwnedClubs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);

  // Club Create & Edit Modal
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingClubId, setEditingClubId] = useState(null);
  const [clubForm, setClubForm] = useState({
    name: "",
    category: "Technical",
    description: "",
    logo: "💻",
    objectives: "",
    activities: "",
    meetingSchedule: "Wednesdays at 5:00 PM",
    maxMembers: "500",
  });
  const [savingClub, setSavingClub] = useState(false);

  // Delete modal
  const [deleteClubTarget, setDeleteClubTarget] = useState(null);
  const [deletingClub, setDeletingClub] = useState(false);

  // Reviewing request
  const [reviewingId, setReviewingId] = useState(null);

  // Profile Edit
  const [profileForm, setProfileForm] = useState({
    name: "",
    enrollmentNumber: "",
    age: "",
    department: "",
    year: "",
    bio: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);

  const loadPresidentData = async () => {
    try {
      setLoading(true);
      const profileRes = await api.users.getProfile();

      if (profileRes.success && profileRes.user) {
        if (
          profileRes.user.role !== "president" &&
          profileRes.user.role !== "club head" &&
          profileRes.user.role !== "admin"
        ) {
          router.push("/dashboard");
          return;
        }

        setUser(profileRes.user);
        const clubs = profileRes.user.ownedClubs || [];
        setOwnedClubs(clubs);

        if (clubs.length > 0 && !selectedClubId) {
          setSelectedClubId(clubs[0]._id || clubs[0].id);
        }

        setProfileForm({
          name: profileRes.user.name || "",
          enrollmentNumber:
            profileRes.user.enrollmentNumber ||
            profileRes.user.studentId ||
            "",
          age: profileRes.user.age ? String(profileRes.user.age) : "21",
          department: profileRes.user.department || "Computer Science",
          year: profileRes.user.year || "3rd Year",
          bio: profileRes.user.bio || "",
        });

        // Load requests for owned clubs
        const reqRes = await api.requests
          .getClubRequests("all")
          .catch(() => ({ success: false, requests: [] }));
        if (reqRes.success && Array.isArray(reqRes.requests)) {
          setRequests(reqRes.requests);
        }

        // If clubs exist, load members of active club
        const activeClubId =
          selectedClubId || (clubs[0] ? clubs[0]._id || clubs[0].id : null);
        if (activeClubId) {
          const memRes = await api.clubs
            .getMembers(activeClubId)
            .catch(() => ({ success: false, members: [] }));
          if (memRes.success && Array.isArray(memRes.members)) {
            setMembers(memRes.members);
          }
        }
      }
    } catch (err) {
      console.warn("Failed to load president data:", err);
      router.push("/Login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPresidentData();
  }, [selectedClubId]);

  const handleLogout = () => {
    api.auth.logout();
    router.push("/Login");
  };

  const handleOpenCreateClub = () => {
    setIsEditing(false);
    setEditingClubId(null);
    setClubForm({
      name: "",
      category: "Technical",
      description: "",
      logo: "💻",
      objectives: "",
      activities: "",
      meetingSchedule: "Wednesdays at 5:00 PM",
      maxMembers: "500",
    });
    setIsClubModalOpen(true);
  };

  const handleOpenEditClub = (club) => {
    setIsEditing(true);
    setEditingClubId(club.id || club._id);
    setClubForm({
      name: club.name || "",
      category: club.category || "Technical",
      description: club.description || "",
      logo: club.logo || "💻",
      objectives: club.objectives || "",
      activities: club.activities || "",
      meetingSchedule: club.meetingSchedule || "Wednesdays at 5:00 PM",
      maxMembers: club.maxMembers ? String(club.maxMembers) : "500",
    });
    setIsClubModalOpen(true);
  };

  const handleSaveClub = async (e) => {
    e.preventDefault();
    setSavingClub(true);
    setActionMessage(null);

    try {
      if (isEditing) {
        await api.clubs.update(editingClubId, clubForm);
        setActionMessage({
          type: "success",
          text: "Club charter updated successfully!",
        });
      } else {
        await api.clubs.create(clubForm);
        setActionMessage({
          type: "success",
          text: "New club chartered successfully!",
        });
      }
      setIsClubModalOpen(false);
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to save club.",
      });
    } finally {
      setSavingClub(false);
    }
  };

  const handleDeleteClub = async () => {
    if (!deleteClubTarget) return;
    setDeletingClub(true);
    setActionMessage(null);

    try {
      await api.clubs.delete(deleteClubTarget._id || deleteClubTarget.id);
      setActionMessage({
        type: "success",
        text: `${deleteClubTarget.name} has been removed.`,
      });
      setDeleteClubTarget(null);
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to delete club.",
      });
    } finally {
      setDeletingClub(false);
    }
  };

  const handleReviewRequest = async (requestId, action) => {
    setReviewingId(requestId);
    setActionMessage(null);

    try {
      await api.requests.review(requestId, action);
      setActionMessage({
        type: "success",
        text: `Membership application ${action.toLowerCase()}!`,
      });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to review request.",
      });
    } finally {
      setReviewingId(null);
    }
  };

  const handleRemoveMember = async (studentId) => {
    if (!confirm("Are you sure you want to remove this member from the club?"))
      return;
    if (!selectedClubId) return;

    try {
      await api.clubs.removeMember(selectedClubId, studentId);
      setActionMessage({
        type: "success",
        text: "Member removed from club roster.",
      });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to remove member.",
      });
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setActionMessage(null);

    try {
      await api.users.updateProfile({
        name: profileForm.name.trim(),
        enrollmentNumber: profileForm.enrollmentNumber.trim(),
        age: Number(profileForm.age),
        department: profileForm.department,
        year: profileForm.year,
        bio: profileForm.bio.trim(),
      });
      setActionMessage({
        type: "success",
        text: "President profile updated successfully!",
      });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to update profile.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "Pending");

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Topbar Header */}
      <header className="sticky top-0 z-40 flex h-16 sm:h-20 w-full items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs group-hover:scale-105 transition-transform">
              <HiOutlineShieldCheck className="text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  Cluvio
                </span>
                <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                  {user?.role === "club head" ? "Club Head Console" : "President Portal"}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Leadership Workspace</p>
            </div>
          </Link>
        </div>

        {/* User Badges & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Switch to Student Portal */}
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <HiOutlineSquares2X2 className="text-sm text-slate-400" />
            <span>Student View</span>
          </Link>

          {/* User Pill */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/80 px-3 py-1.5 text-xs">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="font-semibold text-slate-800 max-w-[120px] truncate">
              {user?.name || "Club Head"}
            </span>
            <span className="hidden md:inline text-[10px] text-slate-400">
              ({user?.department || "Lead"})
            </span>
          </div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="flex h-9 sm:h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all cursor-pointer shadow-2xs"
          >
            <HiOutlineArrowLeftOnRectangle className="text-sm" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Action Message Toast */}
        {actionMessage && (
          <div
            className={`rounded-2xl p-3.5 text-xs flex items-center justify-between border shadow-2xs transition-all ${
              actionMessage.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {actionMessage.type === "success" ? (
                <HiOutlineCheckCircle className="text-base text-emerald-600 shrink-0" />
              ) : (
                <HiOutlineXCircle className="text-base text-rose-600 shrink-0" />
              )}
              <span className="font-medium">{actionMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionMessage(null)}
              className="ml-3 font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Chartered Clubs
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {ownedClubs.length}
              </h3>
              <p className="text-[11px] text-blue-600 mt-0.5 font-medium">Under your leadership</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <HiOutlineShieldCheck className="text-2xl" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Pending Requests
              </p>
              <h3 className="text-2xl font-bold text-amber-700 mt-0.5">
                {pendingRequests.length}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Awaiting decision</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <HiOutlineClock className="text-2xl" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Members
              </p>
              <h3 className="text-2xl font-bold text-emerald-700 mt-0.5">
                {ownedClubs.reduce((acc, c) => acc + (c.membersCount || 1), 0)}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Across all charters</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <HiOutlineUserGroup className="text-2xl" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Standing
              </p>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Council Verified
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Authorized Head</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <HiOutlineSparkles className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Segmented Control) */}
        <div className="flex items-center gap-1.5 border-b border-slate-200/80 pb-3 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("my-clubs")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "my-clubs"
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineShieldCheck className="text-base" />
            <span>My Clubs</span>
            <span
              className={`rounded-md px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === "my-clubs"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {ownedClubs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "requests"
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineClock className="text-base" />
            <span>Join Applications</span>
            {pendingRequests.length > 0 && (
              <span className="rounded-full bg-amber-600 text-white px-1.5 py-0.2 text-[10px] font-bold">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("members")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "members"
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineUserGroup className="text-base" />
            <span>Club Members</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineUser className="text-base" />
            <span>Head Profile</span>
          </button>
        </div>

        {/* TAB 1: MY CLUBS */}
        {activeTab === "my-clubs" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Clubs Under Your Leadership
                </h2>
                <p className="text-xs text-slate-500">
                  Manage charters, update schedules, and review applications
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenCreateClub}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
              >
                <HiOutlinePlus className="text-sm" />
                <span>Charter New Club</span>
              </button>
            </div>

            {ownedClubs.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-2xs space-y-3">
                <HiOutlineShieldCheck className="mx-auto text-4xl text-slate-300" />
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    You have not chartered any clubs yet
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    As a verified Club Head, start by chartering a student organization to begin accepting student applications.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenCreateClub}
                  className="rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
                >
                  Charter Your First Club
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ownedClubs.map((club) => (
                  <div
                    key={club._id || club.id}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-2xl border border-slate-200">
                          {club.logo || "💻"}
                        </span>
                        <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                          {club.category}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {club.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {club.description || "Active student organization."}
                      </p>

                      <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                        <div className="flex justify-between">
                          <span>Members Enrolled:</span>
                          <span className="font-semibold text-slate-800">
                            {club.membersCount || 1}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Meeting Schedule:</span>
                          <span className="font-semibold text-slate-800">
                            {club.meetingSchedule || "Weekly"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleOpenEditClub(club)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        <HiOutlinePencilSquare className="text-sm" />
                        <span>Edit Charter</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteClubTarget(club)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                      >
                        <HiOutlineTrash className="text-sm" />
                        <span>Dissolve</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MEMBERSHIP APPLICATIONS */}
        {activeTab === "requests" && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Student Membership Applications
                </h2>
                <p className="text-xs text-slate-500">
                  Review student requests seeking to join your chartered clubs
                </p>
              </div>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                {pendingRequests.length} pending
              </span>
            </div>

            {requests.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-500">
                No join applications have been submitted for your clubs yet.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {requests.map((r) => (
                  <div
                    key={r.id || r._id}
                    className="py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center text-sm font-bold shrink-0">
                        {r.student?.name?.[0] || "S"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900">
                            {r.student?.name || "Student"}
                          </p>
                          <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                            {r.club?.name || "Club"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          ID: {r.student?.studentId || r.student?.enrollmentNumber || "STU-001"} •{" "}
                          {r.student?.department || "CS"} ({r.student?.year || "1st Year"})
                        </p>
                        {r.note && (
                          <p className="mt-1.5 text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-200/60 max-w-md">
                            &quot;{r.note}&quot;
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {r.status === "Pending" ? (
                        <>
                          <button
                            type="button"
                            disabled={reviewingId === (r.id || r._id)}
                            onClick={() =>
                              handleReviewRequest(r.id || r._id, "Approved")
                            }
                            className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <HiOutlineCheckCircle className="text-sm" />
                            <span>Approve</span>
                          </button>
                          <button
                            type="button"
                            disabled={reviewingId === (r.id || r._id)}
                            onClick={() =>
                              handleReviewRequest(r.id || r._id, "Rejected")
                            }
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <HiOutlineXCircle className="text-sm" />
                            <span>Decline</span>
                          </button>
                        </>
                      ) : (
                        <span
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                            r.status === "Approved"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {r.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CLUB MEMBERS ROSTER */}
        {activeTab === "members" && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Active Club Roster
                </h2>
                <p className="text-xs text-slate-500">
                  View and manage currently enrolled students in your clubs
                </p>
              </div>

              {ownedClubs.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Select Charter:</span>
                  <select
                    value={selectedClubId}
                    onChange={(e) => setSelectedClubId(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-600 cursor-pointer"
                  >
                    {ownedClubs.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {members.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-500">
                No students currently enrolled in this club.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {members.map((mem) => (
                  <div
                    key={mem.id || mem.membershipId}
                    className="py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                        {mem.name?.[0] || "S"}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          {mem.name}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {mem.studentId || mem.email} • {mem.department} ({mem.year})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                        {mem.role || "Member"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(mem.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Remove member"
                      >
                        <HiOutlineTrash className="text-base" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PRESIDENT PROFILE */}
        {activeTab === "profile" && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 max-w-2xl mx-auto shadow-xs space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Head Credentials & Profile
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official leadership profile for campus recognition
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, name: e.target.value })
                    }
                    className="h-10 sm:h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm text-slate-800 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Head / President ID
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.enrollmentNumber}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        enrollmentNumber: e.target.value,
                      })
                    }
                    className="h-10 sm:h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm text-slate-800 font-mono focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ""}
                    className="h-10 sm:h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs sm:text-sm text-slate-500 outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Department
                  </label>
                  <select
                    value={profileForm.department}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        department: e.target.value,
                      })
                    }
                    className="h-10 sm:h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-amber-500 outline-none cursor-pointer"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics & Communication">Electronics & Comm.</option>
                    <option value="Mechanical Engineering">Mechanical Eng.</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Design & Visual Arts">Design & Visual Arts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Leadership Bio
                </label>
                <textarea
                  rows={2}
                  value={profileForm.bio}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, bio: e.target.value })
                  }
                  placeholder="Share a short bio regarding your student club leadership..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-amber-500 outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-2 text-xs font-semibold text-white shadow-xs disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {savingProfile ? "Saving changes..." : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* CHARTER NEW / EDIT CLUB MODAL (Light Theme) */}
      {isClubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {isEditing ? "Edit Club Charter" : "Charter New Student Club"}
              </h3>
              <button
                type="button"
                onClick={() => setIsClubModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <HiXMark className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSaveClub} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Club Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clubForm.name}
                    onChange={(e) =>
                      setClubForm({ ...clubForm, name: e.target.value })
                    }
                    placeholder="e.g. Algorithmic Syndicate"
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm text-slate-800 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Icon / Emoji
                  </label>
                  <input
                    type="text"
                    value={clubForm.logo}
                    onChange={(e) =>
                      setClubForm({ ...clubForm, logo: e.target.value })
                    }
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-center text-slate-800 focus:border-amber-500 outline-none text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Category
                </label>
                <select
                  value={clubForm.category}
                  onChange={(e) =>
                    setClubForm({ ...clubForm, category: e.target.value })
                  }
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-amber-500 outline-none cursor-pointer"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Mission & Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={clubForm.description}
                  onChange={(e) =>
                    setClubForm({ ...clubForm, description: e.target.value })
                  }
                  placeholder="Describe your club's mission, goals, and activities..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 focus:border-amber-500 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Meeting Schedule
                  </label>
                  <input
                    type="text"
                    value={clubForm.meetingSchedule}
                    onChange={(e) =>
                      setClubForm({
                        ...clubForm,
                        meetingSchedule: e.target.value,
                      })
                    }
                    placeholder="e.g. Thursdays at 5:30 PM"
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    value={clubForm.maxMembers}
                    onChange={(e) =>
                      setClubForm({ ...clubForm, maxMembers: e.target.value })
                    }
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsClubModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingClub}
                  className="rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-2 font-semibold text-white shadow-xs disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {savingClub
                    ? "Saving..."
                    : isEditing
                    ? "Save Changes"
                    : "Charter Club"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DISSOLVE CONFIRMATION MODAL */}
      {deleteClubTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              Dissolve Club Charter?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently dissolve{" "}
              <strong>{deleteClubTarget.name}</strong>? All student membership
              records and applications for this club will be cleaned up.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteClubTarget(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteClub}
                disabled={deletingClub}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50 cursor-pointer"
              >
                {deletingClub ? "Dissolving..." : "Confirm Dissolution"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
