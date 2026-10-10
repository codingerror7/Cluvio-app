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
  HiOutlineMapPin,
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
          enrollmentNumber: profileRes.user.enrollmentNumber || profileRes.user.studentId || "",
          age: profileRes.user.age ? String(profileRes.user.age) : "21",
          department: profileRes.user.department || "Computer Science",
          year: profileRes.user.year || "3rd Year",
          bio: profileRes.user.bio || "",
        });

        // Load requests for owned clubs
        const reqRes = await api.requests.getClubRequests("all").catch(() => ({ success: false, requests: [] }));
        if (reqRes.success && Array.isArray(reqRes.requests)) {
          setRequests(reqRes.requests);
        }

        // If clubs exist, load members of first club
        const activeClubId = selectedClubId || (clubs[0] ? (clubs[0]._id || clubs[0].id) : null);
        if (activeClubId) {
          const memRes = await api.clubs.getMembers(activeClubId).catch(() => ({ success: false, members: [] }));
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
      if (isEditing && editingClubId) {
        await api.clubs.update(editingClubId, clubForm);
        setActionMessage({ type: "success", text: "Club details updated successfully!" });
      } else {
        await api.clubs.create(clubForm);
        setActionMessage({ type: "success", text: "Club chartered and added to campus directory!" });
      }

      setIsClubModalOpen(false);
      await loadPresidentData();
    } catch (err) {
      setActionMessage({ type: "error", text: err.message || "Failed to save club." });
    } finally {
      setSavingClub(false);
    }
  };

  const handleDeleteClub = async () => {
    if (!deleteClubTarget) return;
    setDeletingClub(true);

    try {
      await api.clubs.delete(deleteClubTarget.id || deleteClubTarget._id);
      setActionMessage({ type: "success", text: `Club '${deleteClubTarget.name}' dissolved successfully.` });
      setDeleteClubTarget(null);
      await loadPresidentData();
    } catch (err) {
      setActionMessage({ type: "error", text: err.message || "Failed to delete club." });
    } finally {
      setDeletingClub(false);
    }
  };

  const handleReviewRequest = async (id, action) => {
    setReviewingId(id);
    setActionMessage(null);

    try {
      await api.requests.review(id, action);
      setActionMessage({ type: "success", text: `Membership application ${action.toLowerCase()}!` });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({ type: "error", text: err.message || "Failed to review request." });
    } finally {
      setReviewingId(null);
    }
  };

  const handleRemoveMember = async (studentId) => {
    if (!confirm("Are you sure you want to remove this member from the club?")) return;
    if (!selectedClubId) return;

    try {
      await api.clubs.removeMember(selectedClubId, studentId);
      setActionMessage({ type: "success", text: "Member removed from club roster." });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({ type: "error", text: err.message || "Failed to remove member." });
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
      setActionMessage({ type: "success", text: "President profile updated successfully!" });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setSavingProfile(false);
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "Pending");
  const activeClub = ownedClubs.find((c) => (c._id || c.id) === selectedClubId) || ownedClubs[0];

  return (
    <div className="min-h-screen bg-[#070B13] text-white flex flex-col font-sans">
      {/* Topbar */}
      <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-white/10 bg-[#070B13]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] group-hover:scale-105 transition-transform">
              <HiOutlineShieldCheck className="text-2xl" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">CLUVIO</span>
              <span className="ml-2 rounded-md bg-[var(--accent)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                {user?.role === "club head" ? "Club Head Console" : "President Portal"}
              </span>
            </div>
          </Link>
        </div>

        {/* User Badge and Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>{user?.name || (user?.role === "club head" ? "Club Head" : "President")}</span>
            <span className="text-white/40">({user?.department || "Leadership"})</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-semibold text-white/70 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <HiOutlineArrowLeftOnRectangle className="text-base" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Banner Alert */}
        {actionMessage && (
          <div
            className={`rounded-2xl p-4 text-xs flex items-center justify-between border animate-fadeIn ${
              actionMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-rose-500/10 border-rose-500/30 text-rose-300"
            }`}
          >
            <span>{actionMessage.text}</span>
            <button
              type="button"
              onClick={() => setActionMessage(null)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* President Overview KPIs */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
            <p className="text-xs text-white/50">Owned Clubs</p>
            <p className="text-2xl font-bold text-white mt-1">{ownedClubs.length}</p>
            <p className="text-[11px] text-[var(--accent)] mt-1">Campus Organizations</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
            <p className="text-xs text-white/50">Pending Requests</p>
            <p className="text-2xl font-bold text-amber-300 mt-1">{pendingRequests.length}</p>
            <p className="text-[11px] text-white/40 mt-1">Awaiting approval</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
            <p className="text-xs text-white/50">Total Members</p>
            <p className="text-2xl font-bold text-emerald-300 mt-1">
              {ownedClubs.reduce((acc, c) => acc + (c.membersCount || 1), 0)}
            </p>
            <p className="text-[11px] text-white/40 mt-1">Across all clubs</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
            <p className="text-xs text-white/50">Platform Standing</p>
            <p className="text-2xl font-bold text-[var(--accent)] mt-1">Verified</p>
            <p className="text-[11px] text-white/40 mt-1">Council authorized</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 gap-2 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("my-clubs")}
            className={`pb-4 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "my-clubs"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <HiOutlineShieldCheck className="text-base" />
            <span>My Clubs ({ownedClubs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className={`pb-4 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "requests"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <HiOutlineClock className="text-base" />
            <span>Join Requests</span>
            {pendingRequests.length > 0 && (
              <span className="rounded-full bg-amber-400 text-black px-1.5 py-0.2 text-[10px] font-bold">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("members")}
            className={`pb-4 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "members"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <HiOutlineUserGroup className="text-base" />
            <span>Club Members</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`pb-4 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "profile"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <HiOutlineUser className="text-base" />
            <span>President Profile</span>
          </button>
        </div>

        {/* TAB 1: MY CLUBS */}
        {activeTab === "my-clubs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Clubs Managed By You</h2>
                <p className="text-xs text-white/50">Create, edit charter details, or oversee membership</p>
              </div>

              <button
                type="button"
                onClick={handleOpenCreateClub}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-bold text-black hover:brightness-110 transition-all cursor-pointer"
              >
                <HiOutlinePlus className="text-base" />
                <span>Create New Club</span>
              </button>
            </div>

            {ownedClubs.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-[#111827] p-12 text-center text-white/50 space-y-4">
                <HiOutlineShieldCheck className="mx-auto text-5xl text-white/30" />
                <div>
                  <h3 className="text-lg font-bold text-white">You have not created any clubs yet</h3>
                  <p className="text-xs text-white/50 max-w-md mx-auto mt-1">
                    As a Club President, you can charter a club for your student organization to start accepting student members.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenCreateClub}
                  className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-xs font-bold text-black hover:brightness-110 transition-all cursor-pointer"
                >
                  Create Your First Club
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ownedClubs.map((club) => (
                  <div
                    key={club._id || club.id}
                    className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-xl flex flex-col justify-between hover:border-[var(--accent)]/30 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl p-2 rounded-2xl bg-white/5 border border-white/10">
                          {club.logo || "💻"}
                        </span>
                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/70">
                          {club.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white">{club.name}</h3>
                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                        {club.description}
                      </p>

                      <div className="pt-2 border-t border-white/5 text-xs text-white/50 space-y-1">
                        <div className="flex justify-between">
                          <span>Members Enrolled:</span>
                          <span className="font-semibold text-white">{club.membersCount || 1}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Schedule:</span>
                          <span className="font-semibold text-white">{club.meetingSchedule || "Weekly"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleOpenEditClub(club)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
                      >
                        <HiOutlinePencilSquare className="text-sm" />
                        <span>Edit Charter</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteClubTarget(club)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                      >
                        <HiOutlineTrash className="text-sm" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MEMBERSHIP REQUESTS */}
        {activeTab === "requests" && (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-bold text-white">Student Membership Applications</h2>
                <p className="text-xs text-white/50">Approve or decline students requesting to join your clubs</p>
              </div>
              <span className="text-xs font-semibold text-amber-300 font-mono">
                {pendingRequests.length} pending
              </span>
            </div>

            {requests.length === 0 ? (
              <p className="py-8 text-center text-xs text-white/50">
                No join requests have been submitted for your clubs yet.
              </p>
            ) : (
              <div className="divide-y divide-white/10">
                {requests.map((r) => (
                  <div key={r.id || r._id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white shrink-0">
                        {r.student?.name?.[0] || "S"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-white">{r.student?.name || "Student"}</p>
                          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                            {r.club?.name || "Club"}
                          </span>
                        </div>
                        <p className="text-xs text-white/50 font-mono">
                          ID: {r.student?.studentId || r.student?.enrollmentNumber} • {r.student?.department || "CS"} • {r.student?.year}
                        </p>
                        {r.note && (
                          <p className="mt-1 text-xs text-white/70 italic bg-white/[0.02] p-2 rounded-lg border border-white/5 max-w-md">
                            "{r.note}"
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
                            onClick={() => handleReviewRequest(r.id || r._id, "Approved")}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <HiOutlineCheckCircle className="text-sm" />
                            <span>Approve</span>
                          </button>
                          <button
                            type="button"
                            disabled={reviewingId === (r.id || r._id)}
                            onClick={() => handleReviewRequest(r.id || r._id, "Rejected")}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 px-3.5 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/25 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <HiOutlineXCircle className="text-sm" />
                            <span>Decline</span>
                          </button>
                        </>
                      ) : (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            r.status === "Approved"
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-rose-500/15 text-rose-300"
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

        {/* TAB 3: CLUB MEMBERS */}
        {activeTab === "members" && (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-bold text-white">Active Club Roster</h2>
                <p className="text-xs text-white/50">Manage enrolled members of your clubs</p>
              </div>

              {ownedClubs.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-white/50">Select Club:</span>
                  <select
                    value={selectedClubId}
                    onChange={(e) => setSelectedClubId(e.target.value)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none focus:border-[var(--accent)]"
                  >
                    {ownedClubs.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id} className="bg-[#111827]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {members.length === 0 ? (
              <p className="py-8 text-center text-xs text-white/50">
                No student members currently enrolled in this club.
              </p>
            ) : (
              <div className="divide-y divide-white/10">
                {members.map((mem) => (
                  <div key={mem.id || mem.membershipId} className="py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                        {mem.name?.[0] || "S"}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{mem.name}</p>
                        <p className="text-[11px] text-white/40 font-mono">
                          {mem.studentId || mem.email} • {mem.department} ({mem.year})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">
                        {mem.role || "Member"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(mem.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 transition-colors p-1"
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
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">President Credentials & Profile</h2>
              <p className="text-xs text-white/50 mt-1">
                Maintain your official leadership registration.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white focus:border-[var(--accent)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">President ID</label>
                  <input
                    type="text"
                    required
                    value={profileForm.enrollmentNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, enrollmentNumber: e.target.value })}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white font-mono focus:border-[var(--accent)] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Official Email</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ""}
                    className="h-11 w-full rounded-xl border border-white/5 bg-white/[0.02] px-3 text-sm text-white/40 outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Department</label>
                  <select
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-[var(--accent)]"
                  >
                    <option value="Computer Science" className="bg-[#111827]">Computer Science</option>
                    <option value="Electronics & Communication" className="bg-[#111827]">Electronics & Comm.</option>
                    <option value="Mechanical Engineering" className="bg-[#111827]">Mechanical Eng.</option>
                    <option value="Data Science & AI" className="bg-[#111827]">Data Science & AI</option>
                    <option value="Design & Visual Arts" className="bg-[#111827]">Design & Visual Arts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Leadership Bio</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  placeholder="Share a short bio regarding your club leadership role..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[var(--accent)] outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="rounded-xl bg-[var(--accent)] px-6 py-2.5 font-bold text-black hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {savingProfile ? "Saving changes..." : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* CREATE / EDIT CLUB MODAL */}
      {isClubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-7 shadow-2xl animate-fadeIn space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">
                {isEditing ? "Edit Club Charter" : "Charter New Student Club"}
              </h3>
              <button
                type="button"
                onClick={() => setIsClubModalOpen(false)}
                className="rounded-lg p-1 text-white/40 hover:text-white"
              >
                <HiXMark className="text-2xl" />
              </button>
            </div>

            <form onSubmit={handleSaveClub} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-white/70 font-semibold mb-1">Club Name</label>
                  <input
                    type="text"
                    required
                    value={clubForm.name}
                    onChange={(e) => setClubForm({ ...clubForm, name: e.target.value })}
                    placeholder="e.g. Algorithmic Syndicate"
                    className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white focus:border-[var(--accent)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Icon / Emoji</label>
                  <input
                    type="text"
                    value={clubForm.logo}
                    onChange={(e) => setClubForm({ ...clubForm, logo: e.target.value })}
                    className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-center text-white focus:border-[var(--accent)] outline-none text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Category</label>
                <select
                  value={clubForm.category}
                  onChange={(e) => setClubForm({ ...clubForm, category: e.target.value })}
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-white focus:border-[var(--accent)] outline-none"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat} className="bg-[#111827]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Mission & Description</label>
                <textarea
                  required
                  rows={3}
                  value={clubForm.description}
                  onChange={(e) => setClubForm({ ...clubForm, description: e.target.value })}
                  placeholder="Describe your club mission, student focus, and semester plans..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[var(--accent)] outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Meeting Schedule</label>
                  <input
                    type="text"
                    value={clubForm.meetingSchedule}
                    onChange={(e) => setClubForm({ ...clubForm, meetingSchedule: e.target.value })}
                    placeholder="e.g. Thursdays at 5:30 PM"
                    className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-white focus:border-[var(--accent)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={clubForm.maxMembers}
                    onChange={(e) => setClubForm({ ...clubForm, maxMembers: e.target.value })}
                    className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-white focus:border-[var(--accent)] outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsClubModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 font-semibold text-white/70 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingClub}
                  className="rounded-xl bg-[var(--accent)] px-5 py-2 font-bold text-black hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {savingClub ? "Saving..." : isEditing ? "Save Changes" : "Charter Club"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteClubTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-white">Delete Club Charter?</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Are you sure you want to permanently delete <strong>{deleteClubTarget.name}</strong>? All student membership records and requests associated with this club will be cleaned up.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteClubTarget(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteClub}
                disabled={deletingClub}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-50 cursor-pointer"
              >
                {deletingClub ? "Dissolving..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
