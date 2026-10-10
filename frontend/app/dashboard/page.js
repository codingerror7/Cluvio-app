"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineMagnifyingGlass,
  HiOutlineUser,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineBookmark,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineInformationCircle,
  HiOutlinePencilSquare,
  HiCheck,
  HiXMark,
} from "react-icons/hi2";
import { api, getStoredUser } from "@/lib/api";

const CATEGORIES = [
  "All",
  "Technical",
  "Engineering",
  "Creative",
  "Cultural",
  "Entrepreneurship",
  "Sports",
  "Social",
];

const AVAILABLE_GENRES = [
  "Technical",
  "Engineering",
  "AI & ML",
  "Robotics",
  "Creative",
  "Cultural",
  "Entrepreneurship",
  "Sports",
  "Social",
];

export default function StudentDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("discover"); // 'discover' | 'my-clubs' | 'profile'
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal states
  const [selectedClub, setSelectedClub] = useState(null);
  const [joinNote, setJoinNote] = useState("");
  const [joiningClubId, setJoiningClubId] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  // Profile Edit states
  const [editName, setEditName] = useState("");
  const [editEnrollment, setEditEnrollment] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editGenres, setEditGenres] = useState([]);
  const [savingProfile, setSavingProfile] = useState(false);

  // Initialize and load data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [profileRes, clubsRes] = await Promise.all([
        api.users.getProfile(),
        api.clubs.getAll(),
      ]);

      if (profileRes.success && profileRes.user) {
        setUser(profileRes.user);
        setProfileData(profileRes.user);
        setEditName(profileRes.user.name || "");
        setEditEnrollment(profileRes.user.enrollmentNumber || profileRes.user.studentId || "");
        setEditAge(profileRes.user.age ? String(profileRes.user.age) : "20");
        setEditBio(profileRes.user.bio || "");
        setEditGenres(profileRes.user.favouriteGenres || []);
      }

      if (clubsRes.success && Array.isArray(clubsRes.clubs)) {
        setClubs(clubsRes.clubs);
      }
    } catch (err) {
      console.warn("Could not load authenticated profile:", err);
      // If not logged in, redirect to Login
      router.push("/Login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleLogout = () => {
    api.auth.logout();
    router.push("/Login");
  };

  const handleJoinClub = async (club) => {
    setJoiningClubId(club.id || club._id);
    setActionMessage(null);

    try {
      await api.requests.submit(club.id || club._id, joinNote);
      setActionMessage({ type: "success", text: `Join request for ${club.name} submitted successfully!` });
      setSelectedClub(null);
      setJoinNote("");
      await loadDashboardData();
    } catch (err) {
      setActionMessage({ type: "error", text: err.message || "Failed to submit join request." });
    } finally {
      setJoiningClubId(null);
    }
  };

  const handleCancelRequest = async (requestId) => {
    if (!confirm("Are you sure you want to cancel this pending join request?")) return;
    try {
      await api.requests.cancel(requestId);
      setActionMessage({ type: "success", text: "Membership request cancelled." });
      await loadDashboardData();
    } catch (err) {
      setActionMessage({ type: "error", text: err.message || "Failed to cancel request." });
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setActionMessage(null);

    try {
      const res = await api.users.updateProfile({
        name: editName.trim(),
        enrollmentNumber: editEnrollment.trim(),
        age: Number(editAge),
        bio: editBio.trim(),
        favouriteGenres: editGenres,
      });

      if (res.success) {
        setUser(res.user);
        setActionMessage({ type: "success", text: "Profile updated successfully!" });
      }
    } catch (err) {
      setActionMessage({ type: "error", text: err.message || "Failed to save profile changes." });
    } finally {
      setSavingProfile(false);
    }
  };

  const toggleGenre = (genre) => {
    if (editGenres.includes(genre)) {
      setEditGenres(editGenres.filter((g) => g !== genre));
    } else {
      setEditGenres([...editGenres, genre]);
    }
  };

  const filteredClubs = clubs.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || c.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const joinedClubsList = profileData?.clubs || [];
  const pendingRequestsList = profileData?.requests || [];

  return (
    <div className="min-h-screen bg-[#070B13] text-white flex flex-col font-sans">
      {/* Topbar */}
      <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-white/10 bg-[#070B13]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] group-hover:scale-105 transition-transform">
              <HiOutlineSquares2X2 className="text-2xl" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">CLUVIO</span>
              <span
                className={`ml-2 rounded-md px-2 py-0.5 text-[10px] font-semibold border ${
                  user?.role === "club member"
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                    : user?.role === "club head"
                    ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                    : "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                }`}
              >
                {user?.role === "club member"
                  ? "Club Member Portal"
                  : user?.role === "club head"
                  ? "Club Head Portal"
                  : "Student Portal"}
              </span>
            </div>
          </Link>
        </div>

        {/* User Nav and Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80">
            <div
              className={`h-2 w-2 rounded-full animate-pulse ${
                user?.role === "club member"
                  ? "bg-emerald-400"
                  : user?.role === "club head"
                  ? "bg-amber-400"
                  : "bg-cyan-400"
              }`}
            />
            <span className="font-semibold">{user?.name || "Member"}</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium capitalize text-white/70">
              {user?.role || "student"}
            </span>
          </div>

          {/* Quick link to President/Head console if user is Club Head */}
          {(user?.role === "club head" || user?.role === "president") && (
            <Link
              href="/president/dashboard"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-all"
            >
              <span>Head Console →</span>
            </Link>
          )}

          <button
            type="button"
            onClick={handleLogout}
            title="Log out"
            className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-semibold text-white/70 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <HiOutlineArrowLeftOnRectangle className="text-base" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Role Banner if Club Head */}
        {(user?.role === "club head" || user?.role === "president") && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent p-4 text-xs text-amber-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👑</span>
              <div>
                <p className="font-bold text-white text-sm">Authenticated as Club Head</p>
                <p className="text-white/60 text-[11px] mt-0.5">
                  You have club leadership privileges. Switch to the Club Head Console to create clubs, manage rosters, and review membership requests.
                </p>
              </div>
            </div>
            <Link
              href="/president/dashboard"
              className="shrink-0 rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-bold text-black shadow-md hover:brightness-110 transition-all"
            >
              Open Head Console →
            </Link>
          </div>
        )}

        {/* Role Banner if Club Member */}
        {user?.role === "club member" && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 p-4 text-xs text-emerald-200">
            <span className="text-2xl">👥</span>
            <div>
              <p className="font-bold text-white text-sm">Verified Club Member Account</p>
              <p className="text-white/60 text-[11px] mt-0.5">
                Secret key authenticated: You have active participation access to campus club activities, internal group discussions, and event passes.
              </p>
            </div>
          </div>
        )}
        {/* Banner Alert if any */}
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

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 gap-2 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("discover")}
            className={`pb-4 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "discover"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <HiOutlineSquares2X2 className="text-base" />
            <span>Discover Clubs ({clubs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("my-clubs")}
            className={`pb-4 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "my-clubs"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <HiOutlineUserGroup className="text-base" />
            <span>My Memberships ({joinedClubsList.length})</span>
            {pendingRequestsList.filter((r) => r.status === "Pending").length > 0 && (
              <span className="rounded-full bg-[var(--accent)] text-black px-1.5 py-0.2 text-[10px] font-bold">
                {pendingRequestsList.filter((r) => r.status === "Pending").length}
              </span>
            )}
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
            <span>My Student Profile</span>
          </button>
        </div>

        {/* TAB 1: DISCOVER CLUBS */}
        {activeTab === "discover" && (
          <div className="space-y-6">
            {/* Search and Category Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
                <input
                  type="text"
                  placeholder="Search clubs by name, category, or mission..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-xs text-white placeholder:text-white/30 outline-none focus:border-[var(--accent)]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                        : "border-white/10 bg-white/[0.02] text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Clubs Grid */}
            {filteredClubs.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-[#111827] p-12 text-center text-white/50 space-y-2">
                <HiOutlineBookmark className="mx-auto text-4xl text-white/30" />
                <p className="text-base font-semibold text-white">No clubs match your criteria</p>
                <p className="text-xs">Try searching with a different keyword or selecting 'All' categories.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredClubs.map((club) => {
                  const isMember = club.isMember || joinedClubsList.some((m) => (m.clubId || m.id) === club.id);
                  const isPending = club.membershipStatus === "Pending" || pendingRequestsList.some((r) => (r.clubId || r.id) === club.id && r.status === "Pending");

                  return (
                    <div
                      key={club.id || club._id}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl border border-white/10">
                            {club.logo || "💻"}
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/70">
                            {club.category}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                            {club.name}
                          </h3>
                          <p className="mt-1 text-xs text-white/60 line-clamp-2 leading-relaxed">
                            {club.description}
                          </p>
                        </div>

                        {/* Schedule & President */}
                        <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-white/50">
                          <div className="flex items-center gap-1.5">
                            <HiOutlineCalendarDays className="text-[var(--accent)]" />
                            <span className="truncate">{club.meetingSchedule || "Weekly Meetups"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <HiOutlineUserGroup className="text-[var(--accent)]" />
                            <span>{club.membersCount || 1} members enrolled</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="mt-6 flex items-center justify-between gap-2 pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setSelectedClub(club)}
                          className="text-xs font-semibold text-white/60 hover:text-white transition-colors cursor-pointer"
                        >
                          View Charter
                        </button>

                        {isMember ? (
                          <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                            <HiOutlineCheckCircle className="text-sm" />
                            <span>Member</span>
                          </span>
                        ) : isPending ? (
                          <span className="inline-flex items-center gap-1 rounded-xl bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 text-xs font-semibold text-amber-300">
                            <HiOutlineClock className="text-sm" />
                            <span>Pending Review</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedClub(club)}
                            className="rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-bold text-black transition-all hover:brightness-110 cursor-pointer"
                          >
                            Join Club
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY CLUBS & REQUESTS */}
        {activeTab === "my-clubs" && (
          <div className="space-y-8">
            {/* Active Memberships */}
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-bold text-white">Active Club Memberships</h2>
                  <p className="text-xs text-white/50">Clubs you have officially been accepted into</p>
                </div>
                <span className="text-xs font-semibold text-[var(--accent)] font-mono">
                  {joinedClubsList.length} clubs
                </span>
              </div>

              {joinedClubsList.length === 0 ? (
                <div className="py-8 text-center text-xs text-white/50 space-y-2">
                  <p>You have not joined any campus clubs yet.</p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("discover")}
                    className="text-[var(--accent)] font-semibold underline cursor-pointer"
                  >
                    Explore available clubs to join
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {joinedClubsList.map((m, idx) => (
                    <div
                      key={m.membershipId || idx}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{m.logo || "💻"}</span>
                          <span className="rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 px-2 py-0.5 text-[10px] font-bold">
                            {m.role || "Member"}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white">{m.clubName}</h4>
                        <p className="text-[11px] text-white/50">Category: {m.category || "Technical"}</p>
                      </div>
                      <p className="mt-4 pt-2 border-t border-white/5 text-[10px] text-white/40">
                        Enrolled on {m.joinedDate ? new Date(m.joinedDate).toLocaleDateString("en-GB") : "Recently"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Membership Applications & Requests */}
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-bold text-white">Join Applications & History</h2>
                  <p className="text-xs text-white/50">Real-time status of submitted club membership requests</p>
                </div>
              </div>

              {pendingRequestsList.length === 0 ? (
                <p className="py-8 text-center text-xs text-white/50">
                  No pending or past membership requests recorded.
                </p>
              ) : (
                <div className="divide-y divide-white/10">
                  {pendingRequestsList.map((req, idx) => (
                    <div key={req.requestId || idx} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-xl border border-white/10">
                          {req.logo || "💻"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{req.clubName}</p>
                          <p className="text-xs text-white/40">
                            Requested on {req.requestDate ? new Date(req.requestDate).toLocaleDateString("en-GB") : "Recently"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {req.status === "Pending" ? (
                          <>
                            <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                              <HiOutlineClock />
                              <span>Pending Approval</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCancelRequest(req.requestId)}
                              className="text-xs text-white/50 hover:text-rose-400 underline cursor-pointer"
                            >
                              Cancel
                            </button>
                          </>
                        ) : req.status === "Approved" ? (
                          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                            <HiOutlineCheckCircle />
                            <span>Approved & Joined</span>
                          </span>
                        ) : (
                          <span className="rounded-full bg-rose-500/15 border border-rose-500/30 px-3 py-1 text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                            <HiOutlineXCircle />
                            <span>Declined</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT PROFILE */}
        {activeTab === "profile" && (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Student Profile Settings</h2>
              <p className="text-xs text-white/50 mt-1">
                Keep your campus identity and club interests updated.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white focus:border-[var(--accent)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Enrollment ID</label>
                  <input
                    type="text"
                    required
                    value={editEnrollment}
                    onChange={(e) => setEditEnrollment(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white font-mono focus:border-[var(--accent)] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Email (Official)</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ""}
                    className="h-11 w-full rounded-xl border border-white/5 bg-white/[0.02] px-3 text-sm text-white/40 outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Age</label>
                  <input
                    type="number"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                    min="16"
                    max="99"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white focus:border-[var(--accent)] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1.5">
                  Favourite Club Genres & Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_GENRES.map((genre) => {
                    const isSelected = editGenres.includes(genre);
                    return (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => toggleGenre(genre)}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-xs"
                            : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {isSelected && <HiCheck className="inline mr-1 text-xs" />}
                        {genre}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Personal Bio</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Share a short bio with club presidents..."
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

      {/* CLUB CHARTER DETAIL MODAL */}
      {selectedClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-7 shadow-2xl animate-fadeIn space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-2xl bg-white/5 border border-white/10">
                  {selectedClub.logo || "💻"}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedClub.name}</h3>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/70">
                    {selectedClub.category}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClub(null)}
                className="rounded-lg p-1 text-white/40 hover:text-white"
              >
                <HiXMark className="text-2xl" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-semibold text-white/70 mb-1">Mission & Charter</h4>
                <p className="text-white/60 leading-relaxed bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                  {selectedClub.description}
                </p>
              </div>

              {selectedClub.objectives && (
                <div>
                  <h4 className="font-semibold text-white/70 mb-1">Key Objectives</h4>
                  <p className="text-white/60 leading-relaxed bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    {selectedClub.objectives}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-white/70">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase text-white/40 font-bold">Meeting Schedule</p>
                  <p className="font-semibold text-white mt-0.5">{selectedClub.meetingSchedule || "Weekly"}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase text-white/40 font-bold">President</p>
                  <p className="font-semibold text-white mt-0.5">
                    {selectedClub.president?.name || "Appointed President"}
                  </p>
                </div>
              </div>

              {/* Note input for joining */}
              {!selectedClub.isMember && selectedClub.membershipStatus !== "Pending" && (
                <div>
                  <label className="block font-semibold text-white/70 mb-1">
                    Application Note to President (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={joinNote}
                    onChange={(e) => setJoinNote(e.target.value)}
                    placeholder="Why would you like to join this club?"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white placeholder:text-white/30 focus:border-[var(--accent)] outline-none resize-none"
                  />
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedClub(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/5"
              >
                Close
              </button>

              {selectedClub.isMember ? (
                <span className="rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2 text-xs font-bold">
                  Already Enrolled
                </span>
              ) : selectedClub.membershipStatus === "Pending" ? (
                <span className="rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 px-4 py-2 text-xs font-bold">
                  Request Pending
                </span>
              ) : (
                <button
                  type="button"
                  disabled={joiningClubId === (selectedClub.id || selectedClub._id)}
                  onClick={() => handleJoinClub(selectedClub)}
                  className="rounded-xl bg-[var(--accent)] px-5 py-2 text-xs font-bold text-black hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {joiningClubId === (selectedClub.id || selectedClub._id)
                    ? "Submitting..."
                    : "Submit Join Request"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
