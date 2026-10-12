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
  HiOutlineBolt,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { api } from "@/lib/api";

import PresidentSidebar from "@/Components/president/PresidentSidebar";
import PresidentHeader from "@/Components/president/PresidentHeader";
import ManageHackathonsTab from "@/Components/president/ManageHackathonsTab";
import ManageDutiesTab from "@/Components/president/ManageDutiesTab";

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
  const [activeTab, setActiveTab] = useState("requests");
  const [user, setUser] = useState(null);
  const [ownedClubs, setOwnedClubs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);

  // Sidebar responsive & collapse state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Application Filters & Modals
  const [reqFilter, setReqFilter] = useState("All");
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

  // Initialize sidebar collapse preference from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCollapse = localStorage.getItem("broclubs_president_sidebar_collapsed");
      if (storedCollapse !== null) {
        setIsCollapsed(storedCollapse === "true");
      }
    }
  }, []);

  const handleToggleCollapse = (collapsed) => {
    setIsCollapsed(collapsed);
    if (typeof window !== "undefined") {
      localStorage.setItem("broclubs_president_sidebar_collapsed", String(collapsed));
    }
  };

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

  // Switch club handler
  const handleSelectClub = async (clubId) => {
    setSelectedClubId(clubId);
  };

  // APPLICATION ACTIONS
  const handleApproveCandidate = async (requestId) => {
    try {
      setReviewingId(requestId);
      setActionMessage(null);
      await api.requests.review(requestId, {
        action: "Approved",
        feedback: "Congratulations! You have been accepted into the club.",
      });

      setActionMessage({
        type: "success",
        text: "Applicant approved! Their account has been enrolled as a Club Member.",
      });
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

  const handleConfirmScheduleInterview = async (e) => {
    e.preventDefault();
    if (!schedulingRequest) return;

    try {
      setSchedulingLoading(true);
      await api.requests.review(schedulingRequest.id || schedulingRequest._id, {
        action: "Interview Scheduled",
        interviewDetails: interviewForm,
      });

      setActionMessage({
        type: "success",
        text: "Interview scheduled! Applicant has received the appointment details.",
      });
      setSchedulingRequest(null);
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

  const handleConfirmReject = async (e) => {
    e.preventDefault();
    if (!rejectingRequest) return;

    try {
      setRejectingLoading(true);
      await api.requests.review(rejectingRequest.id || rejectingRequest._id, {
        action: "Rejected",
        rejectionReason: rejectReason.trim(),
        feedback: rejectReason.trim(),
      });

      setActionMessage({
        type: "success",
        text: "Application rejected.",
      });
      setRejectingRequest(null);
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

  // MEMBER REMOVAL
  const handleRemoveMember = async (studentId) => {
    if (!confirm("Are you sure you want to remove this member from the club?")) {
      return;
    }
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

  // ACTIVITIES & EVENTS
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!selectedClubId) return;

    try {
      setSavingEvent(true);
      await api.clubs.addEvent(selectedClubId, eventForm);
      setActionMessage({
        type: "success",
        text: "Event published successfully!",
      });
      setIsEventModalOpen(false);
      setEventForm({
        title: "",
        date: new Date().toISOString().split("T")[0],
        time: "5:00 PM",
        location: "Campus Auditorium",
        description: "",
        status: "Upcoming",
      });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to create event.",
      });
    } finally {
      setSavingEvent(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Delete this event?")) return;
    if (!selectedClubId) return;

    try {
      await api.clubs.removeEvent(selectedClubId, eventId);
      setActionMessage({
        type: "success",
        text: "Event removed.",
      });
      await loadPresidentData();
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.message || "Failed to delete event.",
      });
    }
  };

  // ANNOUNCEMENTS
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!selectedClubId) return;

    try {
      setSavingAnnounce(true);
      await api.clubs.addAnnouncement(selectedClubId, announceForm);
      setActionMessage({
        type: "success",
        text: "Announcement broadcasted successfully!",
      });
      setIsAnnounceModalOpen(false);
      setAnnounceForm({
        title: "",
        message: "",
        priority: "Normal",
      });
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

  const counts = {
    pendingRequests: pendingRequests.length,
    members: members.length,
    announcements: activeClub?.announcements ? activeClub.announcements.length : 0,
    events: activeClub?.recentEvents ? activeClub.recentEvents.length : 0,
    tasks: 3,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 1. Left Collapsible Sidebar */}
      <PresidentSidebar
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
        <PresidentHeader
          activeTab={activeTab}
          user={user}
          ownedClubs={ownedClubs}
          selectedClubId={selectedClubId}
          setSelectedClubId={handleSelectClub}
          setIsMobileOpen={setIsMobileOpen}
          handleLogout={handleLogout}
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
              <div className="h-8 w-8 mx-auto border-3 border-amber-300 border-t-amber-600 rounded-full animate-spin mb-3" />
              <p className="text-xs font-semibold text-slate-500">
                Loading leadership console...
              </p>
            </div>
          ) : (
            <>
              {/* TAB 1: JOIN APPLICATIONS & SCREENING PIPELINE */}
              {activeTab === "requests" && (
                <div className="space-y-6">
                  {/* Top Stats Overview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        Total Applications
                      </p>
                      <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                        {requests.length}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                      <p className="text-[10px] font-bold text-amber-700 uppercase">
                        Pending Review
                      </p>
                      <h3 className="text-2xl font-black text-amber-600 mt-0.5">
                        {pendingRequests.length}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                      <p className="text-[10px] font-bold text-blue-700 uppercase">
                        Interviews Scheduled
                      </p>
                      <h3 className="text-2xl font-black text-blue-600 mt-0.5">
                        {
                          requests.filter(
                            (r) => r.status === "Interview Scheduled"
                          ).length
                        }
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                      <p className="text-[10px] font-bold text-emerald-700 uppercase">
                        Accepted Members
                      </p>
                      <h3 className="text-2xl font-black text-emerald-600 mt-0.5">
                        {requests.filter((r) => r.status === "Approved").length}
                      </h3>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        Student Applications Pipeline
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Screen applicants, schedule appointments, or convert to official Club Members.
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
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                            reqFilter === filter
                              ? "bg-slate-900 text-white shadow-2xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Applications List */}
                  {filteredRequests.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
                      <HiOutlineDocumentText className="mx-auto text-4xl text-slate-300 mb-2" />
                      <h4 className="text-sm font-bold text-slate-800">
                        No applications in &quot;{reqFilter}&quot;
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Students who submit forms for {activeClub?.name} will appear right here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredRequests.map((r) => (
                        <div
                          key={r.id || r._id}
                          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className="h-11 w-11 rounded-2xl bg-slate-100 text-slate-800 border border-slate-200 font-bold flex items-center justify-center text-base">
                                {r.student?.name?.[0] || "S"}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-base font-black text-slate-900">
                                    {r.student?.name || "Student Applicant"}
                                  </h4>
                                  <span className="rounded bg-blue-50 border border-blue-200 px-2 py-0.2 text-[10px] font-bold text-blue-700">
                                    {r.preferredDomain || "General"}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 font-mono mt-0.5">
                                  {r.student?.email} •{" "}
                                  {r.student?.department || "CS"} (
                                  {r.student?.year || "1st Year"})
                                </p>
                              </div>
                            </div>

                            {/* Status Pill */}
                            <div>
                              {r.status === "Interview Scheduled" ? (
                                <span className="rounded-full bg-blue-100 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-800">
                                  Interview Scheduled
                                </span>
                              ) : r.status === "Approved" ? (
                                <span className="rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                                  Approved Member
                                </span>
                              ) : r.status === "Rejected" ? (
                                <span className="rounded-full bg-rose-100 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-800">
                                  Rejected
                                </span>
                              ) : (
                                <span className="rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800">
                                  Pending Review
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Applicant Motivation */}
                          {r.motivation && (
                            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/70 leading-relaxed">
                              <strong>Statement of Purpose:</strong> &quot;{r.motivation}&quot;
                            </p>
                          )}

                          {/* Applicant Metadata */}
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                            {r.skills && r.skills.length > 0 && (
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-slate-700">Skills:</span>
                                <div className="flex flex-wrap gap-1">
                                  {r.skills.map((s, i) => (
                                    <span
                                      key={i}
                                      className="rounded bg-white border border-slate-200 px-1.5 py-0.2 text-[10px] font-semibold"
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
                                className="text-blue-600 font-bold underline"
                              >
                                Portfolio ↗
                              </a>
                            )}
                          </div>

                          {/* Actions Bar */}
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
                                      instructions:
                                        "Please bring your past project work and portfolio.",
                                    });
                                  }}
                                  className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-800 transition-colors cursor-pointer shadow-2xs"
                                >
                                  <HiOutlineVideoCamera className="text-sm" />
                                  <span>Schedule Interview</span>
                                </button>

                                <button
                                  type="button"
                                  disabled={reviewingId === (r.id || r._id)}
                                  onClick={() =>
                                    handleApproveCandidate(r.id || r._id)
                                  }
                                  className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                                >
                                  <HiOutlineCheckCircle className="text-sm" />
                                  <span>Approve Member</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setRejectingRequest(r);
                                    setRejectReason(
                                      "Seats are currently full for this domain. We encourage you to reapply next semester."
                                    );
                                  }}
                                  className="rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 text-xs font-bold text-rose-700 transition-colors cursor-pointer shadow-2xs"
                                >
                                  Reject
                                </button>
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
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">
                        Club Members Roster ({members.length})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Students officially enrolled in {activeClub?.name} with authorized passkey access.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab("duties")}
                      className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2"
                    >
                      Assign Member Duties →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.length === 0 ? (
                      <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
                        <HiOutlineUserGroup className="mx-auto text-4xl text-slate-300 mb-2" />
                        <h4 className="text-sm font-bold text-slate-800">
                          No members in roster yet
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                          Approve student applications from the Join Applications tab to add members.
                        </p>
                      </div>
                    ) : (
                      members.map((m, idx) => (
                        <div
                          key={m._id || idx}
                          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-3">
                              <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-base">
                                {m.student?.name?.[0] || "M"}
                              </div>
                              <div>
                                <h3 className="text-sm font-black text-slate-900">
                                  {m.student?.name || "Enrolled Member"}
                                </h3>
                                <span className="rounded bg-emerald-100 px-2 py-0.2 text-[9px] font-bold text-emerald-800 uppercase">
                                  {m.role || "Club Member"}
                                </span>
                              </div>
                            </div>

                            <div className="mt-4 space-y-1 text-xs text-slate-600 border-t border-slate-100 pt-3">
                              <p className="truncate">
                                <strong>Email:</strong> {m.student?.email}
                              </p>
                              <p>
                                <strong>Department:</strong>{" "}
                                {m.student?.department || "Computer Science"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-emerald-700">
                              ✓ Verified
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(m.student?._id)}
                              className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                            >
                              Remove Member
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: HACKATHONS & SPRINTS MANAGER */}
              {activeTab === "hackathons" && (
                <ManageHackathonsTab activeClub={activeClub} />
              )}

              {/* TAB 4: ANNOUNCEMENTS */}
              {activeTab === "announcements" && (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">
                        Club Announcements ({activeClub?.announcements?.length || 0})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Broadcast official announcements and urgent notices to all campus students.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAnnounceModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold shadow-xs cursor-pointer"
                    >
                      <HiOutlinePlus className="text-sm" />
                      <span>Post Announcement</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {!activeClub?.announcements ||
                    activeClub.announcements.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
                        <HiOutlineMegaphone className="mx-auto text-4xl text-slate-300 mb-2" />
                        <h4 className="text-sm font-bold text-slate-800">
                          No announcements posted yet
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Click "Post Announcement" to broadcast news to the campus.
                        </p>
                      </div>
                    ) : (
                      activeClub.announcements.map((ann, idx) => (
                        <div
                          key={ann._id || idx}
                          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-black text-slate-900">
                                {ann.title}
                              </h3>
                              <span
                                className={`rounded px-2 py-0.2 text-[9px] font-bold uppercase ${
                                  ann.priority === "Urgent"
                                    ? "bg-rose-100 text-rose-800"
                                    : ann.priority === "High"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {ann.priority} Priority
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {ann.message}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-2 block">
                              Posted on: {ann.date || "Recent"}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteAnnouncement(ann._id)}
                            className="text-xs font-bold text-rose-600 hover:text-rose-800 self-end sm:self-auto cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: ACTIVITIES & EVENTS */}
              {activeTab === "activities" && (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">
                        Club Events & Workshops ({activeClub?.recentEvents?.length || 0})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Schedule technical bootcamps, masterclasses, and speaker sessions.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsEventModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold shadow-xs cursor-pointer"
                    >
                      <HiOutlinePlus className="text-sm" />
                      <span>Publish New Event</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!activeClub?.recentEvents ||
                    activeClub.recentEvents.length === 0 ? (
                      <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
                        <HiOutlineCalendarDays className="mx-auto text-4xl text-slate-300 mb-2" />
                        <h4 className="text-sm font-bold text-slate-800">
                          No events scheduled yet
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Click "Publish New Event" to schedule workshops for campus students.
                        </p>
                      </div>
                    ) : (
                      activeClub.recentEvents.map((ev, idx) => (
                        <div
                          key={ev._id || idx}
                          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-base font-black text-slate-900">
                                {ev.title}
                              </h3>
                              <span className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-700 shrink-0">
                                {ev.status || "Upcoming"}
                              </span>
                            </div>

                            <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                              {ev.description || "Official campus session."}
                            </p>

                            <div className="mt-4 space-y-1 text-xs text-slate-500 border-t border-slate-100 pt-3">
                              <p>
                                <strong>Date & Time:</strong> {ev.date} at {ev.time}
                              </p>
                              <p>
                                <strong>Location:</strong> {ev.location}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleDeleteEvent(ev._id)}
                              className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                            >
                              Remove Event
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: MEMBER DUTIES & TASKS DELEGATION */}
              {activeTab === "duties" && (
                <ManageDutiesTab activeClub={activeClub} members={members} />
              )}

              {/* TAB 7: RECRUITMENT & CHARTER SETTINGS */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  {/* Recruitment Toggle & Hiring Domains */}
                  <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-6">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">
                        Recruitment Settings
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Control student application intake and domain options for {activeClub?.name}.
                      </p>
                    </div>

                    {/* Recruitment Open / Closed Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/70">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Recruitment Status
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          When active, students can apply to join this club from the student portal.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setRecruitmentOpen(!recruitmentOpen)}
                        className={`rounded-2xl px-5 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer ${
                          recruitmentOpen
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-rose-600 text-white hover:bg-rose-700"
                        }`}
                      >
                        {recruitmentOpen ? "● Intake Open" : "● Intake Closed"}
                      </button>
                    </div>

                    {/* Hiring Domains Customizer */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        Hiring Domains (Departments)
                      </h4>
                      <p className="text-xs text-slate-500 mb-3">
                        These domains appear in the student registration dropdown when students apply.
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {hiringDomains.map((dom) => (
                          <span
                            key={dom}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs"
                          >
                            <span>{dom}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveHiringDomain(dom)}
                              className="text-slate-400 hover:text-rose-600"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 max-w-md">
                        <input
                          type="text"
                          placeholder="Add new domain (e.g. AI & Robotics)"
                          value={newDomainText}
                          onChange={(e) => setNewDomainText(e.target.value)}
                          className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-slate-900"
                        />
                        <button
                          type="button"
                          onClick={handleAddHiringDomain}
                          className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer"
                        >
                          + Add Domain
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                      <button
                        type="button"
                        disabled={savingSettings}
                        onClick={handleSaveRecruitmentSettings}
                        className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 shadow-xs disabled:opacity-50 cursor-pointer"
                      >
                        {savingSettings ? "Saving Settings..." : "Save Recruitment Settings"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: PROFILE */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
                    <h2 className="text-lg font-black text-slate-900">
                      Club Head Leadership Profile
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Manage your official contact credentials and campus affiliations.
                    </p>

                    <form onSubmit={handleSaveProfile} className="mt-6 space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={profileForm.name}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                name: e.target.value,
                              })
                            }
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Enrollment / Student ID
                          </label>
                          <input
                            type="text"
                            value={profileForm.enrollmentNumber}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                enrollmentNumber: e.target.value,
                              })
                            }
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Age
                          </label>
                          <input
                            type="number"
                            value={profileForm.age}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                age: e.target.value,
                              })
                            }
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Department
                          </label>
                          <input
                            type="text"
                            value={profileForm.department}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                department: e.target.value,
                              })
                            }
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Year
                          </label>
                          <input
                            type="text"
                            value={profileForm.year}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                year: e.target.value,
                              })
                            }
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Leadership Bio
                        </label>
                        <textarea
                          rows={3}
                          value={profileForm.bio}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              bio: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-900 resize-none"
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button
                          type="submit"
                          disabled={savingProfile}
                          className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 shadow-xs disabled:opacity-50 cursor-pointer"
                        >
                          {savingProfile ? "Saving Profile..." : "Save Profile Changes"}
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

      {/* SCHEDULE INTERVIEW MODAL */}
      {schedulingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Appointment Desk
                </span>
                <h2 className="text-lg font-black text-slate-900">
                  Schedule Candidate Interview
                </h2>
                <p className="text-xs text-slate-500">
                  For: {schedulingRequest.student?.name} ({schedulingRequest.preferredDomain})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSchedulingRequest(null)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmScheduleInterview} className="py-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={interviewForm.date}
                    onChange={(e) =>
                      setInterviewForm({ ...interviewForm, date: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4:30 PM"
                    value={interviewForm.time}
                    onChange={(e) =>
                      setInterviewForm({ ...interviewForm, time: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Venue / Virtual Link *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Room 304 / https://meet.google.com/..."
                  value={interviewForm.venueOrLink}
                  onChange={(e) =>
                    setInterviewForm({
                      ...interviewForm,
                      venueOrLink: e.target.value,
                    })
                  }
                  className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Instructions for Candidate
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
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-slate-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSchedulingRequest(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={schedulingLoading}
                  className="rounded-xl bg-slate-900 px-5 py-2 font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {schedulingLoading ? "Scheduling..." : "Confirm Schedule 📅"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-black text-rose-900">
                  Reject Application
                </h2>
                <p className="text-xs text-slate-500">
                  Provide constructive feedback for {rejectingRequest.student?.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRejectingRequest(null)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmReject} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Rejection Reason / Feedback *
                </label>
                <textarea
                  rows={3}
                  required
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRejectingRequest(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rejectingLoading}
                  className="rounded-xl bg-rose-600 px-4 py-2 font-bold text-white hover:bg-rose-700 disabled:opacity-50"
                >
                  {rejectingLoading ? "Submitting..." : "Confirm Rejection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW APPLICANT FULL MODAL */}
      {viewingApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  {viewingApplicant.student?.name}
                </h2>
                <p className="text-xs text-slate-500">
                  Applied for: <strong>{viewingApplicant.preferredDomain}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingApplicant(null)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-1 text-slate-700">
                <p><strong>Email:</strong> {viewingApplicant.student?.email}</p>
                <p><strong>Department:</strong> {viewingApplicant.student?.department || "CS"}</p>
                <p><strong>Year:</strong> {viewingApplicant.student?.year || "1st Year"}</p>
                <p><strong>Student ID:</strong> {viewingApplicant.student?.studentId || viewingApplicant.student?.enrollmentNumber || "STU-001"}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1">Statement of Purpose</h4>
                <p className="rounded-2xl border border-slate-200/80 bg-white p-3 text-slate-700 leading-relaxed">
                  {viewingApplicant.motivation || "No statement provided."}
                </p>
              </div>

              {viewingApplicant.skills && viewingApplicant.skills.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Competencies & Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingApplicant.skills.map((s, i) => (
                      <span key={i} className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {viewingApplicant.portfolioUrl && (
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Portfolio Link</h4>
                  <a
                    href={viewingApplicant.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-bold underline"
                  >
                    {viewingApplicant.portfolioUrl} ↗
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setViewingApplicant(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 font-bold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-black text-slate-900">
                Publish Campus Event / Workshop
              </h2>
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js 15 Masterclass"
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, title: e.target.value })
                  }
                  className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, date: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-2.5 outline-none focus:border-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5:00 PM"
                    value={eventForm.time}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, time: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Location / Venue *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Campus Lab 304 / Google Meet"
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, location: e.target.value })
                  }
                  className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-slate-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEvent}
                  className="rounded-xl bg-slate-900 px-5 py-2 font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {savingEvent ? "Publishing..." : "Publish Event 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE ANNOUNCEMENT MODAL */}
      {isAnnounceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-black text-slate-900">
                Post Club Announcement
              </h2>
              <button
                type="button"
                onClick={() => setIsAnnounceModalOpen(false)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mandatory Lab Session for Hackathon Team"
                  value={announceForm.title}
                  onChange={(e) =>
                    setAnnounceForm({ ...announceForm, title: e.target.value })
                  }
                  className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Priority
                </label>
                <select
                  value={announceForm.priority}
                  onChange={(e) =>
                    setAnnounceForm({ ...announceForm, priority: e.target.value })
                  }
                  className="h-9 w-full rounded-xl border border-slate-200 px-2.5 outline-none focus:border-slate-900 bg-white"
                >
                  <option value="Normal">Normal Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent Broadcast</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Message Content *
                </label>
                <textarea
                  rows={3}
                  required
                  value={announceForm.message}
                  onChange={(e) =>
                    setAnnounceForm({ ...announceForm, message: e.target.value })
                  }
                  placeholder="Write message details for campus students and members..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-slate-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAnnounceModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAnnounce}
                  className="rounded-xl bg-slate-900 px-5 py-2 font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {savingAnnounce ? "Broadcasting..." : "Broadcast Notice 📢"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
