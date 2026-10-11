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
  HiOutlineVideoCamera,
  HiOutlineMegaphone,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineMapPin,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiCheck,
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

const DEFAULT_DOMAINS = [
  "Technical & Coding",
  "Design & UI/UX",
  "PR & Social Media",
  "Operations & Logistics",
  "Content & Editorial",
  "Event Management",
];

export default function PresidentDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("requests"); // 'my-clubs' | 'requests' | 'members' | 'activities' | 'announcements' | 'settings' | 'profile'
  const [user, setUser] = useState(null);
  const [ownedClubs, setOwnedClubs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);

  // Application Filters & Modals
  const [reqFilter, setReqFilter] = useState("All"); // 'All' | 'Pending' | 'Interview Scheduled' | 'Approved' | 'Rejected'
  const [viewingApplicant, setViewingApplicant] = useState(null);

  // Interview Schedule Modal
  const [schedulingRequest, setSchedulingRequest] = useState(null);
  const [interviewForm, setInterviewForm] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "4:30 PM",
    venueOrLink: "Room 304 / Google Meet",
    instructions: "Please be ready to showcase your past projects and portfolio.",
  });
  const [schedulingLoading, setSchedulingLoading] = useState(false);

  // Reject Modal
  const [rejectingRequest, setRejectingRequest] = useState(null);
  const [rejectReason, setRejectReason] = useState(
    "Criteria ya seat limit ke karan aapka application reject kar diya gaya hai."
  );
  const [rejectingLoading, setRejectingLoading] = useState(false);

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

  // Delete Club Modal
  const [deleteClubTarget, setDeleteClubTarget] = useState(null);
  const [deletingClub, setDeletingClub] = useState(false);

  // Activities & Events State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "5:00 PM",
    location: "Campus Auditorium",
    description: "",
    status: "Upcoming",
  });
  const [savingEvent, setSavingEvent] = useState(false);

  // Announcements State
  const [isAnnounceModalOpen, setIsAnnounceModalOpen] = useState(false);
  const [announceForm, setAnnounceForm] = useState({
    title: "",
    message: "",
    priority: "Normal",
  });
  const [savingAnnounce, setSavingAnnounce] = useState(false);

  // Recruitment Settings State
  const [recruitmentOpen, setRecruitmentOpen] = useState(true);
  const [hiringDomains, setHiringDomains] = useState(DEFAULT_DOMAINS);
  const [newDomainText, setNewDomainText] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);

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

  // Reviewing single action state
  const [reviewingId, setReviewingId] = useState(null);

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

        const activeId =
          selectedClubId || (clubs[0] ? clubs[0]._id || clubs[0].id : "");
        if (!selectedClubId && activeId) {
          setSelectedClubId(activeId);
        }

        const currentActiveClub = clubs.find(
          (c) => (c._id || c.id) === activeId
        );
        if (currentActiveClub) {
          setRecruitmentOpen(currentActiveClub.recruitmentOpen !== false);
          setHiringDomains(
            currentActiveClub.hiringDomains &&
              currentActiveClub.hiringDomains.length > 0
              ? currentActiveClub.hiringDomains
              : DEFAULT_DOMAINS
          );
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

        // Load applications for owned clubs
        const reqRes = await api.requests
          .getClubRequests(activeId || "all")
          .catch(() => ({ success: false, requests: [] }));
        if (reqRes.success && Array.isArray(reqRes.requests)) {
          setRequests(reqRes.requests);
        }

        // Load roster of current club
        if (activeId) {
          const memRes = await api.clubs
            .getMembers(activeId)
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

  // Club Create & Edit
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
        text: `${deleteClubTarget.name} dissolved and deleted.`,
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

  // APPLICATION REVIEW: APPROVE CANDIDATE (AUTOMATIC ROLE CONVERSION)
  const handleApproveCandidate = async (requestId) => {
    setReviewingId(requestId);
    setActionMessage(null);

    try {
      await api.requests.review(requestId, {
        action: "Approved",
        feedback:
          "Congratulations! You have been accepted and officially converted to Club Member.",
      });
      setActionMessage({
        type: "success",
        text: "Applicant approved! Student has been officially converted to a Club Member and enrolled in your club.",
      });
      setViewingApplicant(null);
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to approve application.",
      });
    } finally {
      setReviewingId(null);
    }
  };

  // APPLICATION REVIEW: SCHEDULE INTERVIEW
  const handleConfirmScheduleInterview = async (e) => {
    e.preventDefault();
    if (!schedulingRequest) return;
    setSchedulingLoading(true);
    setActionMessage(null);

    try {
      await api.requests.review(schedulingRequest.id || schedulingRequest._id, {
        action: "Interview Scheduled",
        interviewDetails: interviewForm,
        feedback: "Interview round scheduled. Please check date and venue details.",
      });
      setActionMessage({
        type: "success",
        text: "Interview scheduled! Applicant has been notified on their dashboard.",
      });
      setSchedulingRequest(null);
      setViewingApplicant(null);
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to schedule interview.",
      });
    } finally {
      setSchedulingLoading(false);
    }
  };

  // APPLICATION REVIEW: REJECT APPLICATION
  const handleConfirmReject = async (e) => {
    e.preventDefault();
    if (!rejectingRequest) return;
    setRejectingLoading(true);
    setActionMessage(null);

    try {
      await api.requests.review(rejectingRequest.id || rejectingRequest._id, {
        action: "Rejected",
        rejectionReason: rejectReason.trim(),
        feedback: rejectReason.trim(),
      });
      setActionMessage({
        type: "success",
        text: "Application rejected. Rejection notice sent to student's dashboard.",
      });
      setRejectingRequest(null);
      setViewingApplicant(null);
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to reject application.",
      });
    } finally {
      setRejectingLoading(false);
    }
  };

  // ROSTER: REMOVE MEMBER
  const handleRemoveMember = async (studentId) => {
    if (!confirm("Are you sure you want to remove this member from the club roster?"))
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

  // ACTIVITIES: ADD EVENT
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!selectedClubId) return;
    setSavingEvent(true);
    setActionMessage(null);

    try {
      await api.clubs.addEvent(selectedClubId, eventForm);
      setActionMessage({
        type: "success",
        text: "Club activity / event added successfully!",
      });
      setIsEventModalOpen(false);
      setEventForm({
        title: "",
        date: new Date().toISOString().split("T")[0],
        time: "5:00 PM",
        location: "Campus Center",
        description: "",
        status: "Upcoming",
      });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to add event.",
      });
    } finally {
      setSavingEvent(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to remove this activity event?")) return;
    if (!selectedClubId) return;

    try {
      await api.clubs.removeEvent(selectedClubId, eventId);
      setActionMessage({
        type: "success",
        text: "Activity event removed.",
      });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to delete event.",
      });
    }
  };

  // ANNOUNCEMENTS: POST
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!selectedClubId) return;
    setSavingAnnounce(true);
    setActionMessage(null);

    try {
      await api.clubs.addAnnouncement(selectedClubId, announceForm);
      setActionMessage({
        type: "success",
        text: "Announcement posted successfully to club members!",
      });
      setIsAnnounceModalOpen(false);
      setAnnounceForm({ title: "", message: "", priority: "Normal" });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to post announcement.",
      });
    } finally {
      setSavingAnnounce(false);
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    if (!confirm("Delete this announcement?")) return;
    if (!selectedClubId) return;

    try {
      await api.clubs.removeAnnouncement(selectedClubId, announcementId);
      setActionMessage({
        type: "success",
        text: "Announcement deleted.",
      });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to delete announcement.",
      });
    }
  };

  // RECRUITMENT SETTINGS
  const handleSaveRecruitmentSettings = async () => {
    if (!selectedClubId) return;
    setSavingSettings(true);
    setActionMessage(null);

    try {
      await api.clubs.updateRecruitment(selectedClubId, {
        recruitmentOpen,
        hiringDomains,
      });
      setActionMessage({
        type: "success",
        text: "Recruitment settings updated successfully!",
      });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to update settings.",
      });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleAddHiringDomain = () => {
    if (newDomainText.trim() && !hiringDomains.includes(newDomainText.trim())) {
      setHiringDomains([...hiringDomains, newDomainText.trim()]);
      setNewDomainText("");
    }
  };

  const handleRemoveHiringDomain = (domain) => {
    setHiringDomains(hiringDomains.filter((d) => d !== domain));
  };

  // PROFILE SAVE
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

  const activeClub =
    ownedClubs.find((c) => (c._id || c.id) === selectedClubId) || ownedClubs[0];

  const pendingRequests = requests.filter((r) => r.status === "Pending");
  const filteredRequests = requests.filter((r) => {
    if (reqFilter === "All") return true;
    return r.status === reqFilter;
  });

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
                  {user?.role === "club head"
                    ? "Club Head Console"
                    : "President Portal"}
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

        {/* Top Active Club Switcher Bar */}
        {ownedClubs.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-2xl border border-amber-200">
                {activeClub?.logo || "💻"}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    {activeClub?.name}
                  </h2>
                  <span
                    className={`rounded-md px-2 py-0.2 text-[10px] font-bold border ${
                      activeClub?.recruitmentOpen !== false
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-rose-50 text-rose-800 border-rose-200"
                    }`}
                  >
                    {activeClub?.recruitmentOpen !== false
                      ? "● Hiring Open"
                      : "● Hiring Closed"}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Category: {activeClub?.category} • {members.length} Members Active
                </p>
              </div>
            </div>

            {/* Club Selector Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold">Active Club:</span>
              <select
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 font-semibold text-slate-800 focus:border-amber-500 outline-none cursor-pointer shadow-2xs"
              >
                {ownedClubs.map((c) => (
                  <option key={c._id || c.id} value={c._id || c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                My Chartered Clubs
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
                Pending Applications
              </p>
              <h3 className="text-2xl font-bold text-amber-700 mt-0.5">
                {pendingRequests.length}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Need review</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <HiOutlineClock className="text-2xl" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Enrolled Members
              </p>
              <h3 className="text-2xl font-bold text-emerald-700 mt-0.5">
                {members.length}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">In current club</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <HiOutlineUserGroup className="text-2xl" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Events & Activities
              </p>
              <h3 className="text-2xl font-bold text-purple-700 mt-0.5">
                {activeClub?.recentEvents ? activeClub.recentEvents.length : 0}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Scheduled sessions</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <HiOutlineCalendarDays className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Segmented Control) */}
        <div className="flex items-center gap-1.5 border-b border-slate-200/80 pb-3 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "requests"
                ? "bg-amber-500 text-white shadow-xs font-bold"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineDocumentText className="text-base" />
            <span>Join Applications</span>
            {pendingRequests.length > 0 && (
              <span className="rounded-full bg-white text-amber-800 px-1.5 py-0.2 text-[10px] font-bold">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("members")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "members"
                ? "bg-amber-500 text-white shadow-xs font-bold"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineUserGroup className="text-base" />
            <span>Club Members ({members.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("activities")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "activities"
                ? "bg-amber-500 text-white shadow-xs font-bold"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineCalendarDays className="text-base" />
            <span>Activities & Events</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("announcements")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "announcements"
                ? "bg-amber-500 text-white shadow-xs font-bold"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineMegaphone className="text-base" />
            <span>Announcements</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-amber-500 text-white shadow-xs font-bold"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineAdjustmentsHorizontal className="text-base" />
            <span>Recruitment Settings</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("my-clubs")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "my-clubs"
                ? "bg-amber-500 text-white shadow-xs font-bold"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineShieldCheck className="text-base" />
            <span>Charter Details</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-amber-500 text-white shadow-xs font-bold"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <HiOutlineUser className="text-base" />
            <span>Head Profile</span>
          </button>
        </div>

        {/* TAB 1: JOIN APPLICATIONS & RECRUITMENT PIPELINE */}
        {activeTab === "requests" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Student Registration Applications
                </h3>
                <p className="text-xs text-slate-500">
                  Review student forms, schedule interviews, or approve membership conversion
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  "All",
                  "Pending",
                  "Interview Scheduled",
                  "Approved",
                  "Rejected",
                ].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setReqFilter(filter)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      reqFilter === filter
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {filteredRequests.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-2xs space-y-2">
                <HiOutlineDocumentText className="mx-auto text-4xl text-slate-300" />
                <h4 className="text-base font-bold text-slate-800">
                  No applications found in &quot;{reqFilter}&quot;
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Students who submit the registration form for {activeClub?.name} will appear right here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRequests.map((r) => (
                  <div
                    key={r.id || r._id}
                    className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center text-base font-bold shrink-0">
                          {r.student?.name?.[0] || "S"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-slate-900">
                              {r.student?.name || "Student Applicant"}
                            </h4>
                            <span className="rounded-md bg-blue-50 border border-blue-200 px-2 py-0.2 text-[10px] font-bold text-blue-700">
                              Domain: {r.preferredDomain || "Technical"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            ID: {r.student?.studentId || r.student?.enrollmentNumber || "STU-001"} •{" "}
                            {r.student?.department || "CS"} ({r.student?.year || "1st Year"}) •{" "}
                            {r.student?.email}
                          </p>
                        </div>
                      </div>

                      {/* Status Tag */}
                      <div>
                        {r.status === "Pending" ? (
                          <span className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                            <HiOutlineClock className="text-amber-600" />
                            <span>Pending Review</span>
                          </span>
                        ) : r.status === "Interview Scheduled" ? (
                          <span className="rounded-lg bg-purple-100 border border-purple-300 px-2.5 py-1 text-xs font-bold text-purple-900 flex items-center gap-1.5">
                            <HiOutlineVideoCamera className="text-purple-700" />
                            <span>Interview Scheduled</span>
                          </span>
                        ) : r.status === "Approved" ? (
                          <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                            <HiOutlineCheckCircle className="text-emerald-600" />
                            <span>Approved & Converted</span>
                          </span>
                        ) : (
                          <span className="rounded-lg bg-rose-50 border border-rose-300 px-2.5 py-1 text-xs font-bold text-rose-800 flex items-center gap-1.5">
                            <HiOutlineXCircle className="text-rose-600" />
                            <span>Rejected</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Applicant details summary */}
                    <div className="text-xs space-y-2">
                      {r.motivation && (
                        <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                          <strong>Statement of Purpose:</strong> &quot;{r.motivation}&quot;
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                        {r.skills && r.skills.length > 0 && (
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-slate-700">Skills:</span>
                            <div className="flex flex-wrap gap-1">
                              {r.skills.map((s, i) => (
                                <span
                                  key={i}
                                  className="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.2 text-[10px] text-slate-800"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {r.availabilityHours && (
                          <span>
                            <strong>Availability:</strong> {r.availabilityHours}
                          </span>
                        )}

                        {r.portfolioUrl && (
                          <a
                            href={r.portfolioUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 font-semibold underline"
                          >
                            Portfolio Link ↗
                          </a>
                        )}
                      </div>

                      {/* If interview scheduled, show info */}
                      {r.status === "Interview Scheduled" && r.interviewDetails && (
                        <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-2.5 text-xs text-purple-900 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <HiOutlineVideoCamera className="text-purple-700 text-sm" />
                            <span>
                              <strong>Interview:</strong> {r.interviewDetails.date} at {r.interviewDetails.time} ({r.interviewDetails.venueOrLink})
                            </span>
                          </div>
                        </div>
                      )}

                      {/* If rejected, show reason */}
                      {r.status === "Rejected" && (
                        <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200">
                          <strong>Rejection Reason Sent:</strong> {r.rejectionReason || r.feedback}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons Toolbar */}
                    <div className="pt-2 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setViewingApplicant(r)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                      >
                        View Full Form
                      </button>

                      {r.status !== "Approved" && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setSchedulingRequest(r);
                              setInterviewForm({
                                date: new Date().toISOString().split("T")[0],
                                time: "4:30 PM",
                                venueOrLink: "Room 304 / Google Meet",
                                instructions: "Please bring your project work / portfolio.",
                              });
                            }}
                            className="inline-flex items-center gap-1 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 text-xs font-bold text-purple-800 transition-colors cursor-pointer shadow-2xs"
                          >
                            <HiOutlineVideoCamera className="text-sm" />
                            <span>Schedule Interview</span>
                          </button>

                          <button
                            type="button"
                            disabled={reviewingId === (r.id || r._id)}
                            onClick={() => handleApproveCandidate(r.id || r._id)}
                            className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                          >
                            <HiOutlineCheckCircle className="text-sm" />
                            <span>Approve & Convert Member</span>
                          </button>

                          {r.status !== "Rejected" && (
                            <button
                              type="button"
                              onClick={() => {
                                setRejectingRequest(r);
                                setRejectReason(
                                  "Criteria ya seat limit ke karan aapka application reject kar diya gaya hai."
                                );
                              }}
                              className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                            >
                              <HiOutlineXCircle className="text-sm" />
                              <span>Decline</span>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CLUB MEMBERS ROSTER */}
        {activeTab === "members" && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Enrolled Club Member Roster
                </h2>
                <p className="text-xs text-slate-500">
                  Approved student members actively participating in {activeClub?.name}
                </p>
              </div>

              <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                {members.length} Members Active
              </span>
            </div>

            {members.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-500">
                No student members currently enrolled in this club. Approve join applications to add members!
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {members.map((mem) => (
                  <div
                    key={mem.id || mem.membershipId}
                    className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-700 shrink-0">
                        {mem.name?.[0] || "S"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900">
                            {mem.name}
                          </p>
                          <span className="rounded-md bg-blue-50 border border-blue-200 px-2 py-0.2 text-[10px] font-bold text-blue-700">
                            {mem.role || "Club Member"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          ID: {mem.studentId || mem.email} • {mem.department} ({mem.year}) • {mem.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(mem.id)}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer shadow-2xs"
                      >
                        Remove from Club
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ACTIVITIES & EVENTS */}
        {activeTab === "activities" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Club Activities, Workshops & Meetups
                </h3>
                <p className="text-xs text-slate-500">
                  Organize weekly sessions, hackathons, and guest seminars
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEventModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
              >
                <HiOutlinePlus className="text-sm" />
                <span>Add New Activity</span>
              </button>
            </div>

            {(!activeClub?.recentEvents || activeClub.recentEvents.length === 0) ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-2xs space-y-2">
                <HiOutlineCalendarDays className="mx-auto text-4xl text-slate-300" />
                <h4 className="text-base font-bold text-slate-800">
                  No activities created yet
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Post upcoming events and weekly meetup schedules for your club members.
                </p>
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(true)}
                  className="mt-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-bold text-white cursor-pointer"
                >
                  Create First Activity
                </button>
              </div>
            ) : (
              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {activeClub.recentEvents.map((evt) => (
                  <div
                    key={evt._id || evt.title}
                    className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 text-[10px] font-bold">
                          {evt.status || "Upcoming"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(evt._id)}
                          className="text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="Delete Event"
                        >
                          <HiOutlineTrash className="text-sm" />
                        </button>
                      </div>

                      <h4 className="text-base font-bold text-slate-900">
                        {evt.title}
                      </h4>
                      {evt.description && (
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {evt.description}
                        </p>
                      )}

                      <div className="space-y-1 text-xs text-slate-500 pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <HiOutlineCalendarDays className="text-purple-600" />
                          <span>
                            {evt.date} • {evt.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <HiOutlineMapPin className="text-purple-600" />
                          <span>{evt.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ANNOUNCEMENTS */}
        {activeTab === "announcements" && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Club Notice Board & Announcements
                </h3>
                <p className="text-xs text-slate-500">
                  Broadcast updates, meeting agendas, and reminders to club members
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAnnounceModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
              >
                <HiOutlinePlus className="text-sm" />
                <span>Post Notice</span>
              </button>
            </div>

            {(!activeClub?.announcements || activeClub.announcements.length === 0) ? (
              <p className="py-8 text-center text-xs text-slate-500">
                No announcements published yet. Click &quot;Post Notice&quot; to broadcast a message.
              </p>
            ) : (
              <div className="space-y-3">
                {activeClub.announcements.map((ann) => (
                  <div
                    key={ann._id || ann.title}
                    className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                            ann.priority === "Urgent"
                              ? "bg-rose-100 text-rose-800"
                              : ann.priority === "High"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {ann.priority}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {ann.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600">{ann.message}</p>
                      <p className="text-[10px] text-slate-400 pt-1">
                        Posted on {ann.date || "Today"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteAnnouncement(ann._id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Delete notice"
                    >
                      <HiOutlineTrash className="text-base" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: RECRUITMENT SETTINGS & CUSTOM DOMAINS */}
        {activeTab === "settings" && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5 max-w-2xl mx-auto">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Custom Recruitment Settings
              </h3>
              <p className="text-xs text-slate-500">
                Configure hiring status and customize domain departments for student applicants
              </p>
            </div>

            {/* Toggle Status */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Club Recruitment Status
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  When open, students can discover this club and submit registration applications.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setRecruitmentOpen(!recruitmentOpen)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                  recruitmentOpen
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-rose-600 text-white hover:bg-rose-700"
                }`}
              >
                {recruitmentOpen ? "✓ Recruitment OPEN" : "✕ Recruitment CLOSED"}
              </button>
            </div>

            {/* Custom Hiring Domains */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Active Hiring Domains / Sub-Teams
              </label>
              <div className="flex flex-wrap gap-2">
                {hiringDomains.map((domain) => (
                  <span
                    key={domain}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs"
                  >
                    <span>{domain}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHiringDomain(domain)}
                      className="text-slate-400 hover:text-rose-600 font-bold ml-1"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              {/* Add domain input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newDomainText}
                  onChange={(e) => setNewDomainText(e.target.value)}
                  placeholder="e.g. Media Production, Robotics Core, Finance..."
                  className="h-10 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-amber-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddHiringDomain}
                  className="rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 px-4 text-xs font-semibold text-slate-800 cursor-pointer"
                >
                  + Add Domain
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                disabled={savingSettings}
                onClick={handleSaveRecruitmentSettings}
                className="rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {savingSettings ? "Saving Settings..." : "Save Recruitment Settings"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: CHARTER DETAILS */}
        {activeTab === "my-clubs" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Clubs Under Your Leadership
                </h3>
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
          </div>
        )}

        {/* TAB 7: HEAD PROFILE */}
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

      {/* MODAL: VIEW FULL APPLICANT DOSSIER */}
      {viewingApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl space-y-4 my-auto animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center text-lg font-bold">
                  {viewingApplicant.student?.name?.[0] || "S"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {viewingApplicant.student?.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Applied Domain:{" "}
                    <span className="font-semibold text-blue-700">
                      {viewingApplicant.preferredDomain || "Technical"}
                    </span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingApplicant(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <HiXMark className="text-xl" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">
                    Student ID
                  </p>
                  <p className="font-semibold text-slate-800">
                    {viewingApplicant.student?.studentId ||
                      viewingApplicant.student?.enrollmentNumber ||
                      "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">
                    Department & Year
                  </p>
                  <p className="font-semibold text-slate-800">
                    {viewingApplicant.student?.department || "General"} (
                    {viewingApplicant.student?.year || "1st Year"})
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">
                    Email
                  </p>
                  <p className="font-semibold text-slate-800 truncate">
                    {viewingApplicant.student?.email}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">
                    Weekly Commitment
                  </p>
                  <p className="font-semibold text-slate-800">
                    {viewingApplicant.availabilityHours || "3-5 hrs/week"}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-700 mb-1">
                  Why they want to join (Statement of Purpose):
                </h4>
                <p className="text-slate-700 bg-slate-50 border border-slate-200/70 p-3 rounded-xl leading-relaxed whitespace-pre-wrap">
                  {viewingApplicant.motivation ||
                    viewingApplicant.note ||
                    "No statement provided."}
                </p>
              </div>

              {viewingApplicant.experience && (
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">
                    Prior Experience & Projects:
                  </h4>
                  <p className="text-slate-700 bg-slate-50 border border-slate-200/70 p-3 rounded-xl leading-relaxed whitespace-pre-wrap">
                    {viewingApplicant.experience}
                  </p>
                </div>
              )}

              {viewingApplicant.skills && viewingApplicant.skills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">Skills:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingApplicant.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-blue-50 border border-blue-200 px-2.5 py-1 text-xs font-semibold text-blue-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {viewingApplicant.portfolioUrl && (
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">
                    Portfolio / GitHub URL:
                  </h4>
                  <a
                    href={viewingApplicant.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline font-medium"
                  >
                    {viewingApplicant.portfolioUrl}
                  </a>
                </div>
              )}
            </div>

            {/* Quick Action Footer in Dossier */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setViewingApplicant(null)}
                className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>

              {viewingApplicant.status !== "Approved" && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setSchedulingRequest(viewingApplicant);
                      setViewingApplicant(null);
                    }}
                    className="rounded-xl border border-purple-200 bg-purple-50 text-purple-900 px-3.5 py-1.5 text-xs font-bold hover:bg-purple-100"
                  >
                    Schedule Interview
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApproveCandidate(viewingApplicant.id || viewingApplicant._id)}
                    className="rounded-xl bg-emerald-600 text-white px-4 py-1.5 text-xs font-bold hover:bg-emerald-700 shadow-2xs"
                  >
                    Approve Candidate
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULE INTERVIEW */}
      {schedulingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 my-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Schedule Interview Round
                </h3>
                <p className="text-xs text-slate-500">
                  For {schedulingRequest.student?.name} ({schedulingRequest.preferredDomain})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSchedulingRequest(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <HiXMark className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleConfirmScheduleInterview} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Interview Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={interviewForm.date}
                    onChange={(e) =>
                      setInterviewForm({ ...interviewForm, date: e.target.value })
                    }
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={interviewForm.time}
                    onChange={(e) =>
                      setInterviewForm({ ...interviewForm, time: e.target.value })
                    }
                    placeholder="e.g. 4:30 PM"
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Venue or Online Meeting Link *
                </label>
                <input
                  type="text"
                  required
                  value={interviewForm.venueOrLink}
                  onChange={(e) =>
                    setInterviewForm({
                      ...interviewForm,
                      venueOrLink: e.target.value,
                    })
                  }
                  placeholder="e.g. Room 302 or https://meet.google.com/..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Preparation Instructions for Student
                </label>
                <textarea
                  rows={2}
                  value={interviewForm.instructions}
                  onChange={(e) =>
                    setInterviewForm({
                      ...interviewForm,
                      instructions: e.target.value,
                    })
                  }
                  placeholder="e.g. Be ready with your Figma designs / coding projects..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-purple-600 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSchedulingRequest(null)}
                  className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={schedulingLoading}
                  className="rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-1.5 text-xs font-bold text-white shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {schedulingLoading ? "Saving..." : "Confirm & Notify Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REJECT / DECLINE REASON */}
      {rejectingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-3.5 my-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Decline Membership Application
              </h3>
              <button
                type="button"
                onClick={() => setRejectingRequest(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <HiXMark className="text-xl" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Please enter the feedback/reason for <strong>{rejectingRequest.student?.name}</strong>. This message will appear on their dashboard:
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-3 text-xs">
              <textarea
                required
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Criteria not met or domain seats full for this semester..."
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 outline-none focus:border-rose-500 resize-none"
              />

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectingRequest(null)}
                  className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rejectingLoading}
                  className="rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-1.5 text-xs font-bold text-white shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {rejectingLoading ? "Declining..." : "Send Rejection Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ACTIVITY / EVENT */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 my-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Add Club Activity / Event
              </h3>
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <HiXMark className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Activity Title *
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, title: e.target.value })
                  }
                  placeholder="e.g. Weekly Tech Hack Session"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, date: e.target.value })
                    }
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.time}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, time: e.target.value })
                    }
                    placeholder="e.g. 5:00 PM"
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Location / Venue *
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, location: e.target.value })
                  }
                  placeholder="e.g. CS Lab 2 / Auditorium"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  placeholder="Brief summary of agenda and requirements..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEvent}
                  className="rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {savingEvent ? "Adding..." : "Add Activity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: POST ANNOUNCEMENT */}
      {isAnnounceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 my-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Post Club Notice / Announcement
              </h3>
              <button
                type="button"
                onClick={() => setIsAnnounceModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <HiXMark className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={announceForm.title}
                  onChange={(e) =>
                    setAnnounceForm({ ...announceForm, title: e.target.value })
                  }
                  placeholder="e.g. Mandatory Team Meeting Tomorrow"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Priority
                </label>
                <select
                  value={announceForm.priority}
                  onChange={(e) =>
                    setAnnounceForm({ ...announceForm, priority: e.target.value })
                  }
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  value={announceForm.message}
                  onChange={(e) =>
                    setAnnounceForm({ ...announceForm, message: e.target.value })
                  }
                  placeholder="Write message to club members..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAnnounceModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAnnounce}
                  className="rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {savingAnnounce ? "Posting..." : "Post Announcement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT CLUB */}
      {isClubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl space-y-4 my-auto animate-fadeIn">
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

      {/* MODAL: DISSOLVE CLUB */}
      {deleteClubTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
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
