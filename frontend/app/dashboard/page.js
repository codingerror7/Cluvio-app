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
  HiOutlineGlobeAlt,
  HiOutlineBriefcase,
  HiOutlineArrowRight,
  HiOutlineDocumentText,
  HiOutlinePlus,
  HiOutlineTrash,
  HiXMark,
  HiCheck,
} from "react-icons/hi2";
import { api } from "@/lib/api";

import DashboardSidebar from "@/Components/dashboard/DashboardSidebar";
import DashboardHeader from "@/Components/dashboard/DashboardHeader";
import AnnouncementsTab from "@/Components/dashboard/AnnouncementsTab";
import HackathonsTab from "@/Components/dashboard/HackathonsTab";
import EventsTab from "@/Components/dashboard/EventsTab";
import ApplicationsTab from "@/Components/dashboard/ApplicationsTab";
import MemberWorkspaceTab from "@/Components/dashboard/MemberWorkspaceTab";

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

const DEFAULT_DOMAINS = [
  "Technical & Coding",
  "Design & UI/UX",
  "PR & Social Media",
  "Operations & Logistics",
  "Content & Editorial",
  "Event Management",
];

const SUGGESTED_SKILLS = [
  "React",
  "Python",
  "Figma",
  "Graphic Design",
  "Video Editing",
  "Public Speaking",
  "Event Planning",
  "Social Media",
  "Content Writing",
  "Robotics / IoT",
  "Sponsorship",
];

export default function StudentDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("discover");
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sidebar responsive & collapse state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Modals state
  const [viewingClub, setViewingClub] = useState(null);
  const [applyingClub, setApplyingClub] = useState(null);
  const [appForm, setAppForm] = useState({
    preferredDomain: "Technical & Coding",
    skills: ["React"],
    customSkill: "",
    motivation: "",
    experience: "",
    availabilityHours: "3-5 hrs/week",
    portfolioUrl: "",
  });
  const [submittingApp, setSubmittingApp] = useState(false);
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

  // Initialize sidebar collapse preference from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCollapse = localStorage.getItem("broclubs_sidebar_collapsed");
      if (storedCollapse !== null) {
        setIsCollapsed(storedCollapse === "true");
      }
    }
  }, []);

  const handleToggleCollapse = (collapsed) => {
    setIsCollapsed(collapsed);
    if (typeof window !== "undefined") {
      localStorage.setItem("broclubs_sidebar_collapsed", String(collapsed));
    }
  };

  // Load Dashboard Data
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

  // Open the registration form modal
  const handleOpenRegistrationForm = (club) => {
    setViewingClub(null);
    setApplyingClub(club);
    setAppForm({
      preferredDomain:
        club.hiringDomains && club.hiringDomains.length > 0
          ? club.hiringDomains[0]
          : "Technical & Coding",
      skills: ["React"],
      customSkill: "",
      motivation: "",
      experience: "",
      availabilityHours: "3-5 hrs/week",
      portfolioUrl: "",
    });
  };

  // Toggle skills in application form
  const toggleSkill = (skill) => {
    if (appForm.skills.includes(skill)) {
      setAppForm({
        ...appForm,
        skills: appForm.skills.filter((s) => s !== skill),
      });
    } else {
      setAppForm({ ...appForm, skills: [...appForm.skills, skill] });
    }
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (
      appForm.customSkill.trim() &&
      !appForm.skills.includes(appForm.customSkill.trim())
    ) {
      setAppForm({
        ...appForm,
        skills: [...appForm.skills, appForm.customSkill.trim()],
        customSkill: "",
      });
    }
  };

  // Submit the registration form
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!applyingClub) return;

    if (!appForm.motivation.trim()) {
      setActionMessage({
        type: "error",
        text: "Please write why you would like to join this club (Statement of Purpose).",
      });
      return;
    }

    setSubmittingApp(true);
    setActionMessage(null);

    try {
      await api.requests.submit(applyingClub.id || applyingClub._id, {
        preferredDomain: appForm.preferredDomain,
        skills: appForm.skills,
        motivation: appForm.motivation.trim(),
        experience: appForm.experience.trim(),
        availabilityHours: appForm.availabilityHours,
        portfolioUrl: appForm.portfolioUrl.trim(),
        note: appForm.motivation.trim(),
      });

      setActionMessage({
        type: "success",
        text: `Registration form for ${applyingClub.name} submitted successfully! Your application has been sent to the Club Head.`,
      });
      setApplyingClub(null);
      await loadDashboardData();
      setActiveTab("applications"); // Switch to view submitted application
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to submit membership application.",
      });
    } finally {
      setSubmittingApp(false);
    }
  };

  // Cancel / Withdraw an application
  const handleCancelRequest = async (requestId) => {
    if (
      !confirm(
        "Are you sure you want to withdraw this club membership application?"
      )
    ) {
      return;
    }
    try {
      await api.requests.cancel(requestId);
      setActionMessage({
        type: "success",
        text: "Membership application withdrawn.",
      });
      await loadDashboardData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to withdraw request.",
      });
    }
  };

  // Save profile updates
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

  // Filter clubs for Discover tab
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
  const requestsList = profileData?.requests || [];
  const joinedClubIds = joinedClubsList.map((c) => c.clubId || c._id);

  // Aggregate announcements from all clubs
  const clubAnnouncements = clubs.flatMap((c) =>
    (c.announcements || []).map((a, i) => ({
      ...a,
      id: a._id || `ann-${c._id || c.id}-${i}`,
      clubId: c._id || c.id,
      clubName: c.name,
      clubLogo: c.logo || "📢",
    }))
  );

  const defaultCampusAnnouncements = [
    {
      id: "campus-ann-1",
      title: "Campus HackIndia Sprint 2026 Registrations Open",
      message:
        "Registrations for the annual 48-hour campus hackathon are officially open. Check the Hackathons tab to register your team and claim your track.",
      priority: "Urgent",
      clubName: "Campus Tech Board",
      clubLogo: "⚡",
      date: "Today",
    },
    {
      id: "campus-ann-2",
      title: "Mid-Semester Club Recruitment Drive Underway",
      message:
        "All recognized campus societies are currently screening applications for technical and creative domains. Check club charters and apply before seats fill up.",
      priority: "High",
      clubName: "Dean of Student Affairs",
      clubLogo: "🏛️",
      date: "Yesterday",
    },
    {
      id: "campus-ann-3",
      title: "Lab 304 High-Speed Workstations Reserved for Clubs",
      message:
        "Lab 304 will remain open after 4 PM for certified club members working on autonomous robotics and full-stack software initiatives.",
      priority: "Normal",
      clubName: "Computer Center",
      clubLogo: "💻",
      date: "Oct 10, 2026",
    },
  ];

  const allAnnouncements = [
    ...defaultCampusAnnouncements,
    ...clubAnnouncements,
  ];

  const activePendingCount = requestsList.filter(
    (r) => r.status === "Pending" || r.status === "Interview Scheduled"
  ).length;

  const counts = {
    clubs: clubs.length,
    joinedClubs: joinedClubsList.length,
    announcements: allAnnouncements.length,
    pendingRequests: activePendingCount,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans selection:bg-slate-900 selection:text-white">
      {/* 1. Left Collapsible Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={handleToggleCollapse}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        user={user}
        counts={counts}
        handleLogout={handleLogout}
      />

      {/* 2. Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <DashboardHeader
          activeTab={activeTab}
          user={user}
          setIsMobileOpen={setIsMobileOpen}
          handleLogout={handleLogout}
          announcements={allAnnouncements}
          onOpenAnnouncements={() => setActiveTab("announcements")}
        />

        {/* Action Message Alert */}
        {actionMessage && (
          <div className="px-4 sm:px-6 lg:px-8 pt-4">
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
                <span className="font-semibold">{actionMessage.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setActionMessage(null)}
                className="ml-3 font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Tab Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {loading ? (
            <div className="py-24 text-center">
              <div className="h-8 w-8 mx-auto border-3 border-slate-300 border-t-slate-900 rounded-full animate-spin mb-3" />
              <p className="text-xs font-semibold text-slate-500">
                Loading campus dashboard...
              </p>
            </div>
          ) : (
            <>
              {/* TAB 1: DISCOVER CLUBS */}
              {activeTab === "discover" && (
                <div className="space-y-6">
                  {/* Hero / Filter Bar */}
                  <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-black text-slate-900">
                          Active Campus Organizations
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Explore student-run clubs, review charters, and register for recruitment drives.
                        </p>
                      </div>

                      <div className="relative min-w-[260px]">
                        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                        <input
                          type="text"
                          placeholder="Search clubs, domains..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 pb-1 sm:pb-0">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`
                            rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap
                            ${
                              selectedCategory === cat
                                ? "bg-slate-900 text-white shadow-2xs"
                                : "bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                            }
                          `}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clubs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredClubs.length === 0 ? (
                      <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
                        <HiOutlineUserGroup className="mx-auto text-3xl text-slate-300 mb-2" />
                        <h3 className="text-sm font-bold text-slate-800">
                          No clubs match your filters
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Try searching for another keyword or switch category to 'All'.
                        </p>
                      </div>
                    ) : (
                      filteredClubs.map((club) => {
                        const clubId = club._id || club.id;
                        const isEnrolled = club.isMember;
                        const status = club.membershipStatus;

                        return (
                          <div
                            key={clubId}
                            className={`
                              rounded-3xl border bg-white p-5 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md
                              ${
                                isEnrolled
                                  ? "border-emerald-300 ring-1 ring-emerald-500/20 bg-gradient-to-b from-emerald-50/15 via-white to-white"
                                  : "border-slate-200/90 hover:border-slate-300"
                              }
                            `}
                          >
                            <div>
                              {/* Header: Logo, Category, Recruitment status */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl border border-slate-200/70">
                                    {club.logo || "💻"}
                                  </span>
                                  <div>
                                    <span className="rounded bg-slate-100 border border-slate-200/70 px-1.5 py-0.2 text-[9px] font-bold uppercase text-slate-600">
                                      {club.category}
                                    </span>
                                    <h3 className="text-base font-black text-slate-900 mt-0.5 leading-snug">
                                      {club.name}
                                    </h3>
                                  </div>
                                </div>

                                {club.recruitmentOpen !== false ? (
                                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 shrink-0">
                                    Recruiting
                                  </span>
                                ) : (
                                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-500 shrink-0">
                                    Closed
                                  </span>
                                )}
                              </div>

                              <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                {club.description}
                              </p>

                              {/* Details Chips */}
                              <div className="mt-3.5 space-y-1 text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                                <div className="flex items-center justify-between">
                                  <span>Schedule:</span>
                                  <span className="font-semibold text-slate-700">
                                    {club.meetingSchedule || "Weekly Meetups"}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Members:</span>
                                  <span className="font-semibold text-slate-700">
                                    {club.membersCount || 25}+ Students
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => setViewingClub(club)}
                                className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
                              >
                                View Charter
                              </button>

                              {isEnrolled ? (
                                <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-100 border border-emerald-300 px-3 py-1.5 text-xs font-bold text-emerald-800">
                                  <HiCheck className="text-sm" />
                                  <span>Joined</span>
                                </span>
                              ) : status === "Interview Scheduled" ? (
                                <span className="inline-flex items-center gap-1 rounded-xl bg-blue-100 border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-800">
                                  <HiOutlineCalendarDays className="text-sm" />
                                  <span>Interview</span>
                                </span>
                              ) : status === "Pending" ? (
                                <span className="inline-flex items-center gap-1 rounded-xl bg-amber-100 border border-amber-200 px-3 py-1.5 text-xs font-bold text-amber-800">
                                  <HiOutlineClock className="text-sm" />
                                  <span>Under Review</span>
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenRegistrationForm(club)
                                  }
                                  className="inline-flex items-center gap-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                                >
                                  <span>Apply</span>
                                  <HiOutlineArrowRight className="text-xs" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: MY CLUBS */}
              {activeTab === "my-clubs" && (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">
                        My Enrolled Clubs ({joinedClubsList.length})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Organizations you have joined with active voting and participation rights.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab("discover")}
                      className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                    >
                      Browse More Clubs →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {joinedClubsList.length === 0 ? (
                      <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
                        <HiOutlineUserGroup className="mx-auto text-3xl text-slate-300 mb-2" />
                        <h3 className="text-sm font-bold text-slate-800">
                          You haven't joined any clubs yet
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                          Join student organizations to collaborate on projects, participate in hackathons, and attend member sessions.
                        </p>
                        <button
                          type="button"
                          onClick={() => setActiveTab("discover")}
                          className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                        >
                          Find Clubs to Join
                        </button>
                      </div>
                    ) : (
                      joinedClubsList.map((club, idx) => (
                        <div
                          key={club.membershipId || idx}
                          className="rounded-3xl border border-emerald-200 bg-white p-5 shadow-xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl border border-emerald-100">
                                {club.logo || "📌"}
                              </span>
                              <div>
                                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-800">
                                  {club.role || "Active Member"}
                                </span>
                                <h3 className="text-base font-black text-slate-900 mt-0.5">
                                  {club.clubName}
                                </h3>
                              </div>
                            </div>

                            <div className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Schedule:</span>
                                <span className="font-semibold text-slate-800">
                                  {club.meetingSchedule || "Weekly Meetings"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Domain:</span>
                                <span className="font-semibold text-slate-800">
                                  {club.category || "General"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-emerald-700">
                              ✓ Verified Membership
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveTab("member-workspace")}
                              className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-white hover:bg-slate-800"
                            >
                              Open Desk
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: ANNOUNCEMENTS */}
              {activeTab === "announcements" && (
                <AnnouncementsTab
                  announcements={allAnnouncements}
                  joinedClubIds={joinedClubIds}
                />
              )}

              {/* TAB 4: HACKATHONS */}
              {activeTab === "hackathons" && <HackathonsTab user={user} />}

              {/* TAB 5: EVENTS */}
              {activeTab === "events" && <EventsTab clubs={clubs} />}

              {/* TAB 6: APPLICATIONS TRACKER */}
              {activeTab === "applications" && (
                <ApplicationsTab
                  requests={requestsList}
                  onCancelRequest={handleCancelRequest}
                  onExploreClubs={() => setActiveTab("discover")}
                />
              )}

              {/* TAB 7: MEMBER WORKSPACE */}
              {activeTab === "member-workspace" && (
                <MemberWorkspaceTab
                  user={user}
                  joinedClubs={joinedClubsList}
                />
              )}

              {/* TAB 8: PROFILE & SKILLS */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
                    <h2 className="text-lg font-black text-slate-900">
                      Campus Student Profile
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Keep your university credentials and domain skills up to date for club applications.
                    </p>

                    <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 text-xs text-slate-800 outline-none focus:border-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Enrollment / Student ID
                          </label>
                          <input
                            type="text"
                            value={editEnrollment}
                            onChange={(e) => setEditEnrollment(e.target.value)}
                            placeholder="e.g. STU-2024-819"
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 text-xs text-slate-800 outline-none focus:border-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Age
                          </label>
                          <input
                            type="number"
                            value={editAge}
                            onChange={(e) => setEditAge(e.target.value)}
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 text-xs text-slate-800 outline-none focus:border-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Department
                          </label>
                          <select
                            value={editDepartment}
                            onChange={(e) => setEditDepartment(e.target.value)}
                            className="h-10 w-full rounded-xl border border-slate-200 px-2.5 text-xs text-slate-800 outline-none focus:border-slate-900 bg-white"
                          >
                            <option value="Computer Science">Computer Science</option>
                            <option value="Data Science & AI">Data Science & AI</option>
                            <option value="Electronics & Communication">Electronics & Communication</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Business & Management">Business & Management</option>
                            <option value="Design & Media">Design & Media</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Year
                          </label>
                          <select
                            value={editYear}
                            onChange={(e) => setEditYear(e.target.value)}
                            className="h-10 w-full rounded-xl border border-slate-200 px-2.5 text-xs text-slate-800 outline-none focus:border-slate-900 bg-white"
                          >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Bio / About Me
                        </label>
                        <textarea
                          rows={3}
                          value={editBio}
                          onChange={(e) => setEditBio(e.target.value)}
                          placeholder="Tell club presidents about your interests and past accomplishments..."
                          className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-slate-900 resize-none"
                        />
                      </div>

                      {/* Favorite Genres / Interests */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                          Domain Interests & Categories
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {CATEGORIES.filter((c) => c !== "All").map((genre) => {
                            const isSelected = editGenres.includes(genre);
                            return (
                              <button
                                key={genre}
                                type="button"
                                onClick={() => toggleGenre(genre)}
                                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-slate-900 text-white shadow-xs"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                {genre} {isSelected && "✓"}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button
                          type="submit"
                          disabled={savingProfile}
                          className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 shadow-xs disabled:opacity-50 cursor-pointer"
                        >
                          {savingProfile ? "Saving Changes..." : "Save Profile Changes"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* MODAL 1: REGISTRATION / APPLICATION FORM */}
      {applyingClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl space-y-4 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl border border-slate-200">
                  {applyingClub.logo || "💻"}
                </span>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Apply to {applyingClub.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Club Membership Application & Screening Form
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setApplyingClub(null)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <HiXMark className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
              {/* Domain Selection */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Preferred Department / Domain *
                </label>
                <select
                  value={appForm.preferredDomain}
                  onChange={(e) =>
                    setAppForm({ ...appForm, preferredDomain: e.target.value })
                  }
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-slate-900 cursor-pointer"
                >
                  {(applyingClub.hiringDomains && applyingClub.hiringDomains.length > 0
                    ? applyingClub.hiringDomains
                    : DEFAULT_DOMAINS
                  ).map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Your Skills (Select relevant competencies)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1.5 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                  {SUGGESTED_SKILLS.map((skill) => {
                    const isSelected = appForm.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-900 text-white shadow-2xs"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {skill} {isSelected && "✓"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Statement of Purpose */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Statement of Purpose (Why join {applyingClub.name}?) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={appForm.motivation}
                  onChange={(e) =>
                    setAppForm({ ...appForm, motivation: e.target.value })
                  }
                  placeholder="Explain your interest, past initiatives, and how you want to contribute..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Time Commitment
                  </label>
                  <select
                    value={appForm.availabilityHours}
                    onChange={(e) =>
                      setAppForm({
                        ...appForm,
                        availabilityHours: e.target.value,
                      })
                    }
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-slate-900"
                  >
                    <option value="3-5 hrs/week">3-5 hrs/week (Standard)</option>
                    <option value="5-8 hrs/week">5-8 hrs/week (Active)</option>
                    <option value="8-12 hrs/week">8-12 hrs/week (Core)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Portfolio / GitHub (Optional)
                  </label>
                  <input
                    type="url"
                    value={appForm.portfolioUrl}
                    onChange={(e) =>
                      setAppForm({ ...appForm, portfolioUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setApplyingClub(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingApp}
                  className="rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2 text-xs font-bold text-white shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {submittingApp ? "Submitting..." : "Submit Application →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CLUB CHARTER DETAIL MODAL */}
      {viewingClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl space-y-4 my-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-2xl border border-slate-200">
                  {viewingClub.logo || "💻"}
                </span>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {viewingClub.name}
                  </h3>
                  <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    {viewingClub.category}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingClub(null)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <HiXMark className="text-lg" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <h4 className="font-bold text-slate-700 mb-1">
                  Charter & Mission
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 border border-slate-200/70 p-3 rounded-2xl">
                  {viewingClub.description || "Active campus student organization."}
                </p>
              </div>

              {viewingClub.objectives && (
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">
                    Key Objectives
                  </h4>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 border border-slate-200/70 p-3 rounded-2xl">
                    {viewingClub.objectives}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">
                    Schedule
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {viewingClub.meetingSchedule || "Weekly Meetups"}
                  </p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">
                    Club President
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5 truncate">
                    {viewingClub.president?.name || "Appointed Head"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setViewingClub(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleOpenRegistrationForm(viewingClub)}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
              >
                Apply to Join →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
