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
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiCheck,
  HiXMark,
  HiOutlineChevronRight,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { api } from "@/lib/api";

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
  const [editDepartment, setEditDepartment] = useState("Computer Science");
  const [editYear, setEditYear] = useState("1st Year");
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
        setEditEnrollment(
          profileRes.user.enrollmentNumber || profileRes.user.studentId || ""
        );
        setEditAge(profileRes.user.age ? String(profileRes.user.age) : "20");
        setEditDepartment(profileRes.user.department || "Computer Science");
        setEditYear(profileRes.user.year || "1st Year");
        setEditBio(profileRes.user.bio || "");
        setEditGenres(profileRes.user.favouriteGenres || []);
      }

      if (clubsRes.success && Array.isArray(clubsRes.clubs)) {
        setClubs(clubsRes.clubs);
      }
    } catch (err) {
      console.warn("Could not load authenticated profile:", err);
      // Redirect to Login if not authenticated
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
      setActionMessage({
        type: "success",
        text: `Application for ${club.name} submitted successfully! The Club Head will review your request.`,
      });
      setSelectedClub(null);
      setJoinNote("");
      await loadDashboardData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to submit membership request.",
      });
    } finally {
      setJoiningClubId(null);
    }
  };

  const handleCancelRequest = async (requestId) => {
    if (!confirm("Are you sure you want to cancel this pending membership request?")) {
      return;
    }
    try {
      await api.requests.cancel(requestId);
      setActionMessage({
        type: "success",
        text: "Membership request cancelled.",
      });
      await loadDashboardData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to cancel request.",
      });
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
        department: editDepartment,
        year: editYear,
        bio: editBio.trim(),
        favouriteGenres: editGenres,
      });

      if (res.success) {
        setUser(res.user);
        setActionMessage({
          type: "success",
          text: "Profile updated successfully!",
        });
      }
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to save profile changes.",
      });
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
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      (c.description && c.description.toLowerCase().includes(q)) ||
      (c.category && c.category.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "All" || c.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const joinedClubsList = profileData?.clubs || [];
  const pendingRequestsList = profileData?.requests || [];
  const activePendingCount = pendingRequestsList.filter(
    (r) => r.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Topbar Header */}
      <header className="sticky top-0 z-40 flex h-16 sm:h-20 w-full items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs group-hover:scale-105 transition-transform">
              <HiOutlineSquares2X2 className="text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  Cluvio
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold border ${
                    user?.role === "club member"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : user?.role === "club head"
                      ? "bg-amber-50 border-amber-200 text-amber-800"
                      : "bg-blue-50 border-blue-200 text-blue-700"
                  }`}
                >
                  {user?.role === "club member"
                    ? "Club Member"
                    : user?.role === "club head"
                    ? "Club Head"
                    : "Student Portal"}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Campus Workspace</p>
            </div>
          </Link>
        </div>

        {/* User Navigation and Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Profile Pill */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/80 px-3 py-1.5 text-xs">
            <div
              className={`h-2 w-2 rounded-full ${
                user?.role === "club member"
                  ? "bg-emerald-500"
                  : user?.role === "club head"
                  ? "bg-amber-500"
                  : "bg-blue-600"
              }`}
            />
            <span className="font-semibold text-slate-800 max-w-[120px] truncate">
              {user?.name || "Student"}
            </span>
            <span className="hidden sm:inline-block rounded bg-white border border-slate-200 px-1.5 py-0.2 text-[10px] font-semibold uppercase text-slate-500">
              {user?.role || "student"}
            </span>
          </div>

          {/* Quick link to Head Console if Club Head */}
          {(user?.role === "club head" || user?.role === "president") && (
            <Link
              href="/president/dashboard"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors shadow-2xs"
            >
              <HiOutlineShieldCheck className="text-sm text-amber-600" />
              <span className="hidden md:inline">Head Console</span>
              <span>→</span>
            </Link>
          )}

          {/* Sign Out Button */}
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

      {/* Main Page Layout */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Role-Specific Banner: Club Head */}
        {(user?.role === "club head" || user?.role === "president") && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-xs text-amber-900 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl border border-amber-200">
                👑
              </span>
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  Authenticated as Club Head
                </p>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  You hold leadership privileges. You can browse clubs here or switch to the Head Console to manage club rosters and review student applications.
                </p>
              </div>
            </div>
            <Link
              href="/president/dashboard"
              className="shrink-0 rounded-xl bg-amber-500 hover:bg-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-colors"
            >
              Open Head Console →
            </Link>
          </div>
        )}

        {/* Role-Specific Banner: Club Member */}
        {user?.role === "club member" && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs text-emerald-900 shadow-2xs">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl border border-emerald-200">
              👥
            </span>
            <div>
              <p className="font-bold text-slate-900 text-sm">
                Verified Club Member Account
              </p>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Secret key verified: You have authorized access to active campus club discussions, committee activities, and internal event passes.
              </p>
            </div>
          </div>
        )}

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

        {/* Welcome Hero & KPI Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1: Total Clubs */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Available Clubs
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {clubs.length}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Campus organizations</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <HiOutlineBookmark className="text-2xl" />
            </div>
          </div>

          {/* Card 2: My Enrolled Clubs */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                My Memberships
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {joinedClubsList.length}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Clubs joined</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <HiOutlineUserGroup className="text-2xl" />
            </div>
          </div>

          {/* Card 3: Pending Applications */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                In Review
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {activePendingCount}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Pending applications</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <HiOutlineClock className="text-2xl" />
            </div>
          </div>

          {/* Card 4: Department & Profile */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Student Department
              </p>
              <h3 className="text-base font-bold text-slate-900 mt-1 truncate max-w-[140px]">
                {user?.department || "Computer Science"}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{user?.year || "1st Year"}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <HiOutlineAcademicCap className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Segmented Control) */}
        <div className="flex items-center gap-1.5 border-b border-slate-200/80 pb-3 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("discover")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "discover"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineSquares2X2 className="text-base" />
            <span>Discover Clubs</span>
            <span
              className={`rounded-md px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === "discover"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {clubs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("my-clubs")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "my-clubs"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineUserGroup className="text-base" />
            <span>My Memberships</span>
            <span
              className={`rounded-md px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === "my-clubs"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {joinedClubsList.length}
            </span>
            {activePendingCount > 0 && (
              <span className="rounded-full bg-amber-500 text-white px-1.5 py-0.2 text-[10px] font-bold">
                {activePendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineUser className="text-base" />
            <span>Student Profile</span>
          </button>
        </div>

        {/* TAB 1: DISCOVER CLUBS */}
        {activeTab === "discover" && (
          <div className="space-y-5">
            {/* Search Bar & Category Filters */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type="text"
                  placeholder="Search clubs by name, category, or interests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 sm:h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Clubs Grid */}
            {filteredClubs.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-2xs space-y-2">
                <HiOutlineBookmark className="mx-auto text-4xl text-slate-300" />
                <h4 className="text-base font-bold text-slate-800">
                  No clubs matched your search
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search query or reset the category filter back to &quot;All&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <HiOutlineArrowPath className="text-sm" />
                  <span>Reset Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredClubs.map((club) => {
                  const isMember =
                    club.isMember ||
                    joinedClubsList.some(
                      (m) => (m.clubId || m.id) === (club.id || club._id)
                    );
                  const isPending =
                    club.membershipStatus === "Pending" ||
                    pendingRequestsList.some(
                      (r) =>
                        (r.clubId || r.id) === (club.id || club._id) &&
                        r.status === "Pending"
                    );

                  return (
                    <div
                      key={club.id || club._id}
                      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200"
                    >
                      <div className="space-y-3.5">
                        {/* Club Header Badge */}
                        <div className="flex items-center justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-2xl border border-slate-200 shadow-2xs">
                            {club.logo || "💻"}
                          </div>
                          <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                            {club.category}
                          </span>
                        </div>

                        {/* Title and Short description */}
                        <div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {club.name}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {club.description || "Active student organization."}
                          </p>
                        </div>

                        {/* Info details */}
                        <div className="space-y-1 pt-2 border-t border-slate-100 text-xs text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <HiOutlineCalendarDays className="text-blue-600 text-sm shrink-0" />
                            <span className="truncate">
                              {club.meetingSchedule || "Weekly Meetups"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <HiOutlineUserGroup className="text-emerald-600 text-sm shrink-0" />
                            <span>{club.membersCount || 1} members enrolled</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setSelectedClub(club)}
                          className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          View Details
                        </button>

                        {isMember ? (
                          <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                            <HiOutlineCheckCircle className="text-sm text-emerald-600" />
                            <span>Enrolled</span>
                          </span>
                        ) : isPending ? (
                          <span className="inline-flex items-center gap-1 rounded-xl bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-800">
                            <HiOutlineClock className="text-sm text-amber-600" />
                            <span>In Review</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedClub(club)}
                            className="rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
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

        {/* TAB 2: MY CLUBS & MEMBERSHIPS */}
        {activeTab === "my-clubs" && (
          <div className="space-y-6">
            {/* Active Memberships */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Active Club Memberships
                  </h2>
                  <p className="text-xs text-slate-500">
                    Campus clubs you are currently an approved member of
                  </p>
                </div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                  {joinedClubsList.length} Clubs
                </span>
              </div>

              {joinedClubsList.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500 space-y-2">
                  <p>You have not joined any campus clubs yet.</p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("discover")}
                    className="text-blue-600 font-semibold underline cursor-pointer"
                  >
                    Browse available clubs to apply
                  </button>
                </div>
              ) : (
                <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {joinedClubsList.map((m, idx) => (
                    <div
                      key={m.membershipId || idx}
                      className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{m.logo || "💻"}</span>
                          <span className="rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                            {m.role || "Member"}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {m.clubName}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Category: {m.category || "Technical"}
                        </p>
                      </div>
                      <p className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400">
                        Joined:{" "}
                        {m.joinedDate
                          ? new Date(m.joinedDate).toLocaleDateString("en-GB")
                          : "Active"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Applications & Status History */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Application History & Status
                  </h2>
                  <p className="text-xs text-slate-500">
                    Track the progress of your submitted club membership requests
                  </p>
                </div>
              </div>

              {pendingRequestsList.length === 0 ? (
                <p className="py-8 text-center text-xs text-slate-500">
                  No pending or past membership requests recorded.
                </p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {pendingRequestsList.map((req, idx) => (
                    <div
                      key={req.requestId || idx}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl border border-slate-200">
                          {req.logo || "💻"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {req.clubName}
                          </p>
                          <p className="text-xs text-slate-400">
                            Submitted on{" "}
                            {req.requestDate
                              ? new Date(req.requestDate).toLocaleDateString("en-GB")
                              : "Recently"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {req.status === "Pending" ? (
                          <>
                            <span className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                              <HiOutlineClock className="text-amber-600" />
                              <span>Pending Review</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCancelRequest(req.requestId)}
                              className="text-xs text-slate-500 hover:text-rose-600 underline cursor-pointer ml-1"
                            >
                              Cancel
                            </button>
                          </>
                        ) : req.status === "Approved" ? (
                          <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                            <HiOutlineCheckCircle className="text-emerald-600" />
                            <span>Approved & Joined</span>
                          </span>
                        ) : (
                          <span className="rounded-lg bg-rose-50 border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-800 flex items-center gap-1.5">
                            <HiOutlineXCircle className="text-rose-600" />
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
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 max-w-2xl mx-auto shadow-xs space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Student Profile Settings
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your campus credentials and academic preferences
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
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-10 sm:h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Enrollment ID
                  </label>
                  <input
                    type="text"
                    required
                    value={editEnrollment}
                    onChange={(e) => setEditEnrollment(e.target.value)}
                    className="h-10 sm:h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm text-slate-800 font-mono focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Campus Email (Official)
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
                    Age
                  </label>
                  <input
                    type="number"
                    min="16"
                    max="99"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                    className="h-10 sm:h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Department
                  </label>
                  <select
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    className="h-10 sm:h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics & Communication">Electronics & Comm.</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Mechanical Engineering">Mechanical Eng.</option>
                    <option value="Business Administration">Business Admin.</option>
                    <option value="Design & Visual Arts">Design & Visual Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Academic Year
                  </label>
                  <select
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    className="h-10 sm:h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              {/* Interests & genres */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Favourite Club Genres & Interests
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_GENRES.map((genre) => {
                    const isSelected = editGenres.includes(genre);
                    return (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => toggleGenre(genre)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {isSelected && <HiCheck className="inline mr-1 text-xs" />}
                        {genre}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Personal Bio / Goals
                </label>
                <textarea
                  rows={2}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Share a short bio with campus club leaders..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2 text-xs font-semibold text-white shadow-xs disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {savingProfile ? "Saving changes..." : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* CLUB CHARTER & DETAIL MODAL (Light Theme) */}
      {selectedClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl space-y-4">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl border border-slate-200">
                  {selectedClub.logo || "💻"}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedClub.name}
                  </h3>
                  <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    {selectedClub.category}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClub(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <HiXMark className="text-xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-3.5 text-xs">
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">
                  Charter & Mission
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 border border-slate-200/70 p-3 rounded-xl">
                  {selectedClub.description || "Active campus student organization."}
                </p>
              </div>

              {selectedClub.objectives && (
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">
                    Key Objectives
                  </h4>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 border border-slate-200/70 p-3 rounded-xl">
                    {selectedClub.objectives}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5 text-slate-700">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">
                    Schedule
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {selectedClub.meetingSchedule || "Weekly Meetups"}
                  </p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">
                    President
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5 truncate">
                    {selectedClub.president?.name || "Assigned Head"}
                  </p>
                </div>
              </div>

              {/* Note input for joining */}
              {!selectedClub.isMember &&
                selectedClub.membershipStatus !== "Pending" && (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Note to Club Head (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={joinNote}
                      onChange={(e) => setJoinNote(e.target.value)}
                      placeholder="Share a short note on why you'd like to join..."
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                    />
                  </div>
                )}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedClub(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>

              {selectedClub.isMember ? (
                <span className="rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 text-xs font-bold">
                  Already Enrolled
                </span>
              ) : selectedClub.membershipStatus === "Pending" ? (
                <span className="rounded-xl bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2 text-xs font-bold">
                  Request Pending
                </span>
              ) : (
                <button
                  type="button"
                  disabled={
                    joiningClubId === (selectedClub.id || selectedClub._id)
                  }
                  onClick={() => handleJoinClub(selectedClub)}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-xs disabled:opacity-50 transition-colors cursor-pointer"
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
