"use client";

import React, { useState, useEffect } from "react";
import {
  HiOutlineBolt,
  HiOutlineTrophy,
  HiOutlineCalendarDays,
  HiOutlineUserGroup,
  HiOutlineMapPin,
  HiOutlineCheckCircle,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineArrowRight,
  HiOutlineSparkles,
} from "react-icons/hi2";

const DEFAULT_HACKATHONS = [
  {
    id: "hack-1",
    title: "HackIndia Campus Sprint 2026",
    organizer: "Coding & Innovation Society",
    clubLogo: "💻",
    prizePool: "₹1,50,000",
    mode: "Hybrid (Campus Lab + Online)",
    timeline: "Nov 15 - Nov 17, 2026",
    deadline: "Nov 10, 2026",
    teamSize: "2 - 4 Members",
    tags: ["AI/ML", "Web3", "Full Stack", "Cloud"],
    tracks: ["Smart Campus & EdTech", "FinTech & Payments", "Open Innovation"],
    status: "Open",
    difficulty: "All Levels",
    description:
      "A 48-hour intensive building sprint. Build working prototypes solving real campus and societal bottlenecks with mentorship from industry leaders.",
  },
  {
    id: "hack-2",
    title: "AI Nexus GenAI Championship",
    organizer: "Data Science & AI Club",
    clubLogo: "🤖",
    prizePool: "₹1,00,000",
    mode: "Online Virtual",
    timeline: "Nov 22 - Nov 24, 2026",
    deadline: "Nov 18, 2026",
    teamSize: "1 - 3 Members",
    tags: ["Generative AI", "LLMs", "Python", "API Agents"],
    tracks: ["Autonomous AI Agents", "Multimodal Search", "Enterprise Copilots"],
    status: "Open",
    difficulty: "Intermediate",
    description:
      "Create high-impact autonomous agents and multimodal applications leveraging cutting-edge LLMs and vector database architectures.",
  },
  {
    id: "hack-3",
    title: "DesignCraft 36H UI/UX Jam",
    organizer: "Design & Creative Guild",
    clubLogo: "🎨",
    prizePool: "₹50,000",
    mode: "Campus Design Studio",
    timeline: "Dec 02 - Dec 03, 2026",
    deadline: "Nov 28, 2026",
    teamSize: "1 - 2 Members",
    tags: ["Figma", "UI/UX", "Product Design", "Design Systems"],
    tracks: ["Mobile First Banking", "Clean Energy Dashboards", "Micro-interactions"],
    status: "Open",
    difficulty: "Beginner Friendly",
    description:
      "Redefine modern product aesthetics. Compete in rapid design sprints judged by top product designers on typography, empathy, and usability.",
  },
  {
    id: "hack-4",
    title: "GreenTech Campus Sustainability Cup",
    organizer: "Engineering & Social Impact Guild",
    clubLogo: "🌱",
    prizePool: "₹75,000",
    mode: "On-Campus Lab",
    timeline: "Dec 12 - Dec 14, 2026",
    deadline: "Dec 05, 2026",
    teamSize: "2 - 4 Members",
    tags: ["IoT", "Hardware", "CleanTech", "Embedded C"],
    tracks: ["Energy Conservation", "Waste Recycling IoT", "Carbon Tracker"],
    status: "Open",
    difficulty: "All Levels",
    description:
      "Solve zero-waste campus challenges using IoT microcontrollers, sensor telemetry, and real-time dashboard analytics.",
  },
  {
    id: "hack-5",
    title: "FinTech Algorithmic Challenge",
    organizer: "Finance & Analytics Society",
    clubLogo: "📈",
    prizePool: "₹80,000",
    mode: "Online Virtual",
    timeline: "Jan 10 - Jan 12, 2027",
    deadline: "Jan 05, 2027",
    teamSize: "1 - 3 Members",
    tags: ["Algorithms", "Python", "Backtesting", "Quant"],
    tracks: ["Risk Prediction", "Algorithmic Arbitrage", "Fraud Detection"],
    status: "Upcoming",
    difficulty: "Advanced",
    description:
      "Build real-time trading engines and risk mitigation algorithms under stress-tested market simulation datasets.",
  },
];

export default function HackathonsTab({ user }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All"); // 'All' | 'Registered' | 'Open' | 'High Prize'
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [registeringHackathon, setRegisteringHackathon] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  // Registered hackathons state stored in localStorage
  const [registeredList, setRegisteredList] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("broclubs_registered_hackathons");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Participation form state
  const [participateForm, setParticipateForm] = useState({
    participationType: "Team", // 'Team' | 'Solo'
    teamName: "",
    selectedTrack: "",
    proposal: "",
    repoOrPortfolio: "",
    teammates: [{ name: "", email: "", role: "Frontend Developer" }],
  });
  const [submitting, setSubmitting] = useState(false);

  const isRegistered = (hackId) => {
    return registeredList.some((item) => item.hackathonId === hackId);
  };

  const getRegistrationData = (hackId) => {
    return registeredList.find((item) => item.hackathonId === hackId);
  };

  const handleOpenRegister = (hackathon) => {
    setRegisteringHackathon(hackathon);
    setParticipateForm({
      participationType: "Team",
      teamName: `${user?.name ? user.name.split(" ")[0] : "Code"} Hackers`,
      selectedTrack: hackathon.tracks ? hackathon.tracks[0] : "Open Track",
      proposal: "",
      repoOrPortfolio: "",
      teammates: [
        {
          name: user?.name || "Team Lead",
          email: user?.email || "leader@campus.edu",
          role: "Team Lead",
        },
        { name: "", email: "", role: "Full Stack Engineer" },
      ],
    });
  };

  const handleAddTeammate = () => {
    if (participateForm.teammates.length >= 4) return;
    setParticipateForm({
      ...participateForm,
      teammates: [
        ...participateForm.teammates,
        { name: "", email: "", role: "Developer" },
      ],
    });
  };

  const handleRemoveTeammate = (index) => {
    if (participateForm.teammates.length <= 1) return;
    const updated = participateForm.teammates.filter((_, i) => i !== index);
    setParticipateForm({ ...participateForm, teammates: updated });
  };

  const handleTeammateChange = (index, field, value) => {
    const updated = [...participateForm.teammates];
    updated[index][field] = value;
    setParticipateForm({ ...participateForm, teammates: updated });
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const regId = `REG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newEntry = {
      registrationId: regId,
      hackathonId: registeringHackathon.id,
      hackathonTitle: registeringHackathon.title,
      organizer: registeringHackathon.organizer,
      timeline: registeringHackathon.timeline,
      prizePool: registeringHackathon.prizePool,
      participationType: participateForm.participationType,
      teamName: participateForm.teamName || `${user?.name || "Solo"} Team`,
      selectedTrack: participateForm.selectedTrack,
      registeredAt: new Date().toLocaleDateString("en-GB"),
      teammates: participateForm.teammates.filter((t) => t.name.trim()),
      proposal: participateForm.proposal,
      status: "Confirmed",
    };

    const updatedList = [...registeredList, newEntry];
    setRegisteredList(updatedList);
    try {
      localStorage.setItem(
        "broclubs_registered_hackathons",
        JSON.stringify(updatedList)
      );
    } catch (e) {}

    setSubmitting(false);
    setRegisteringHackathon(null);
    setActionSuccess({
      title: "Registration Confirmed!",
      text: `You have successfully enrolled in ${registeringHackathon.title}. Your Registration ID is ${regId}.`,
    });
  };

  const filteredHackathons = DEFAULT_HACKATHONS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.organizer.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (filter === "Registered") {
      return isRegistered(item.id);
    }
    if (filter === "Open") {
      return item.status === "Open";
    }
    if (filter === "High Prize") {
      return item.prizePool.includes("1,") || item.prizePool.includes("1,50");
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Metrics */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
              <HiOutlineBolt className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">
                  Hackathons & Competitions
                </h2>
                <span className="rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 animate-pulse">
                  ⚡ 5 Active Sprints
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Join high-stakes hackathons, solve real problems, win cash prizes, and get recognized by top tech companies.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-right">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">
                Registered
              </p>
              <p className="text-base font-bold text-slate-900">
                {registeredList.length} Competitions
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Registered", "Open", "High Prize"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`
                  rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap
                  ${
                    filter === f
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }
                `}
              >
                {f === "Registered"
                  ? `My Registrations (${registeredList.length})`
                  : f}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search hackathons, tech tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {actionSuccess && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <HiOutlineCheckCircle className="text-lg text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">{actionSuccess.title}</p>
              <p className="text-[11px] mt-0.5">{actionSuccess.text}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActionSuccess(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hackathons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHackathons.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <HiOutlineTrophy className="mx-auto text-3xl text-slate-300 mb-2" />
            <h3 className="text-sm font-bold text-slate-800">
              No hackathons match your search
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Try switching your filters or clearing your search term.
            </p>
          </div>
        ) : (
          filteredHackathons.map((hack) => {
            const registered = isRegistered(hack.id);
            const regData = getRegistrationData(hack.id);

            return (
              <div
                key={hack.id}
                className={`
                  rounded-3xl border bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md
                  ${
                    registered
                      ? "border-emerald-300 ring-1 ring-emerald-500/20 bg-gradient-to-b from-emerald-50/15 via-white to-white"
                      : "border-slate-200/90 hover:border-slate-300"
                  }
                `}
              >
                <div>
                  {/* Card Header: Icon, Tags, Prize */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl border border-slate-200/70">
                        {hack.clubLogo}
                      </span>
                      <div>
                        <span className="text-[11px] font-bold text-slate-500">
                          {hack.organizer}
                        </span>
                        <h3 className="text-base font-black text-slate-900 mt-0.5 leading-snug">
                          {hack.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-1 text-xs font-black text-amber-800">
                        <HiOutlineTrophy className="text-amber-600" />
                        {hack.prizePool}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {hack.description}
                  </p>

                  {/* Metadata Chips: Timeline, Mode, Team Size */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-600 border-y border-slate-100 py-3">
                    <div className="flex items-center gap-1.5">
                      <HiOutlineCalendarDays className="text-slate-400 text-sm shrink-0" />
                      <span className="truncate">{hack.timeline}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HiOutlineMapPin className="text-slate-400 text-sm shrink-0" />
                      <span className="truncate">{hack.mode}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HiOutlineUserGroup className="text-slate-400 text-sm shrink-0" />
                      <span>{hack.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-emerald-700 font-semibold truncate">
                        Deadline: {hack.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hack.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  {registered ? (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                        <HiOutlineCheckCircle className="text-base text-emerald-600" />
                        <span>Registered ({regData?.registrationId})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedHackathon(hack)}
                        className="text-xs font-bold text-slate-700 hover:text-slate-900 hover:underline cursor-pointer"
                      >
                        View Team Roster →
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <button
                        type="button"
                        onClick={() => setSelectedHackathon(hack)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        Details & Tracks
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenRegister(hack)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer hover:gap-2"
                      >
                        <span>Register Now</span>
                        <HiOutlineArrowRight className="text-xs" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail / View Roster Modal */}
      {selectedHackathon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedHackathon.clubLogo}</span>
                <div>
                  <span className="text-xs font-bold text-slate-400">
                    {selectedHackathon.organizer}
                  </span>
                  <h2 className="text-lg font-black text-slate-900">
                    {selectedHackathon.title}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedHackathon(null)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    PRIZE POOL
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {selectedHackathon.prizePool}
                  </span>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    MODE
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {selectedHackathon.mode}
                  </span>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    TIMELINE
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {selectedHackathon.timeline}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Competition Tracks
                </h4>
                <div className="space-y-1.5">
                  {selectedHackathon.tracks.map((tr, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-800"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      <span>{tr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* If user is registered, show their roster */}
              {isRegistered(selectedHackathon.id) && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">
                      Your Team: {getRegistrationData(selectedHackathon.id)?.teamName}
                    </span>
                    <span className="rounded bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      {getRegistrationData(selectedHackathon.id)?.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Track: {getRegistrationData(selectedHackathon.id)?.selectedTrack}
                  </p>
                  <div className="pt-2 border-t border-emerald-200/80 space-y-1">
                    <p className="text-[10px] font-bold uppercase text-emerald-900">
                      Registered Members:
                    </p>
                    {getRegistrationData(selectedHackathon.id)?.teammates?.map((m, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs text-emerald-900"
                      >
                        <span>• {m.name} ({m.role})</span>
                        <span className="text-[10px] text-emerald-700">{m.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedHackathon(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
              {!isRegistered(selectedHackathon.id) && (
                <button
                  type="button"
                  onClick={() => {
                    const hack = selectedHackathon;
                    setSelectedHackathon(null);
                    handleOpenRegister(hack);
                  }}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Proceed to Register →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Registration / Participation Modal */}
      {registeringHackathon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Competition Enrollment
                </span>
                <h2 className="text-lg font-black text-slate-900">
                  {registeringHackathon.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setRegisteringHackathon(null)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitRegistration} className="py-4 space-y-4">
              {/* Participation Mode */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Participation Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setParticipateForm({
                        ...participateForm,
                        participationType: "Team",
                      })
                    }
                    className={`rounded-xl border p-2.5 text-xs font-bold transition-all ${
                      participateForm.participationType === "Team"
                        ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    👥 Team (1-4 Members)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setParticipateForm({
                        ...participateForm,
                        participationType: "Solo",
                      })
                    }
                    className={`rounded-xl border p-2.5 text-xs font-bold transition-all ${
                      participateForm.participationType === "Solo"
                        ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    👤 Solo Builder
                  </button>
                </div>
              </div>

              {/* Team Name */}
              {participateForm.participationType === "Team" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={participateForm.teamName}
                    onChange={(e) =>
                      setParticipateForm({
                        ...participateForm,
                        teamName: e.target.value,
                      })
                    }
                    placeholder="e.g. ByteBusters or SyntaxSquad"
                    className="h-9 w-full rounded-xl border border-slate-200 px-3 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900"
                  />
                </div>
              )}

              {/* Track Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Selected Track
                </label>
                <select
                  value={participateForm.selectedTrack}
                  onChange={(e) =>
                    setParticipateForm({
                      ...participateForm,
                      selectedTrack: e.target.value,
                    })
                  }
                  className="h-9 w-full rounded-xl border border-slate-200 px-2.5 text-xs text-slate-800 outline-none focus:border-slate-900 bg-white"
                >
                  {registeringHackathon.tracks.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Teammates fields */}
              {participateForm.participationType === "Team" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Team Members ({participateForm.teammates.length}/4)
                    </label>
                    {participateForm.teammates.length < 4 && (
                      <button
                        type="button"
                        onClick={handleAddTeammate}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline"
                      >
                        <HiOutlinePlus className="text-xs" />
                        <span>Add Member</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    {participateForm.teammates.map((teammate, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 p-2"
                      >
                        <span className="text-[10px] font-bold text-slate-400 w-4 text-center">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={teammate.name}
                          onChange={(e) =>
                            handleTeammateChange(idx, "name", e.target.value)
                          }
                          className="h-8 flex-1 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Campus Email"
                          value={teammate.email}
                          onChange={(e) =>
                            handleTeammateChange(idx, "email", e.target.value)
                          }
                          className="h-8 flex-1 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none"
                        />
                        {participateForm.teammates.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTeammate(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Remove"
                          >
                            <HiOutlineTrash className="text-xs" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Proposal */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Project Proposal / Idea Summary
                </label>
                <textarea
                  rows={2}
                  value={participateForm.proposal}
                  onChange={(e) =>
                    setParticipateForm({
                      ...participateForm,
                      proposal: e.target.value,
                    })
                  }
                  placeholder="What solution do you plan to build? (e.g. AI-driven campus notes summary app)"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRegisteringHackathon(null)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 shadow-xs cursor-pointer disabled:opacity-60"
                >
                  {submitting ? "Confirming..." : "Confirm Participation 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
