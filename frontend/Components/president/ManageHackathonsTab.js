"use client";

import React, { useState, useEffect } from "react";
import {
  HiOutlineBolt,
  HiOutlineTrophy,
  HiOutlinePlus,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXMark,
} from "react-icons/hi2";

export default function ManageHackathonsTab({ activeClub }) {
  const [hostedHackathons, setHostedHackathons] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("broclubs_hosted_hackathons");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Registered student teams across the campus
  const [registeredTeams, setRegisteredTeams] = useState(() => {
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

  const [activeSubTab, setActiveSubTab] = useState("hackathons"); // 'hackathons' | 'registrations'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingTeam, setViewingTeam] = useState(null);

  const [form, setForm] = useState({
    title: "",
    prizePool: "₹1,00,000",
    mode: "Hybrid (Campus Lab + Online)",
    timeline: "Nov 28 - Nov 30, 2026",
    deadline: "Nov 25, 2026",
    teamSize: "2 - 4 Members",
    tags: "AI/ML, Web3, Full Stack",
    tracks: "Smart Campus & EdTech, FinTech & Payments, Open Innovation",
    description: "",
  });

  const saveHostedHackathons = (updated) => {
    setHostedHackathons(updated);
    try {
      localStorage.setItem("broclubs_hosted_hackathons", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleCreateHackathon = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newHack = {
      id: `hosted-hack-${Date.now()}`,
      title: form.title.trim(),
      organizer: activeClub?.name || "Campus Technical Society",
      clubLogo: activeClub?.logo || "⚡",
      prizePool: form.prizePool,
      mode: form.mode,
      timeline: form.timeline,
      deadline: form.deadline,
      teamSize: form.teamSize,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      tracks: form.tracks.split(",").map((t) => t.trim()).filter(Boolean),
      description:
        form.description ||
        "Official collegiate sprint organized by campus leadership.",
      status: "Open",
      createdAt: new Date().toLocaleDateString("en-GB"),
    };

    saveHostedHackathons([newHack, ...hostedHackathons]);
    setIsModalOpen(false);
    setForm({
      title: "",
      prizePool: "₹1,00,000",
      mode: "Hybrid (Campus Lab + Online)",
      timeline: "Nov 28 - Nov 30, 2026",
      deadline: "Nov 25, 2026",
      teamSize: "2 - 4 Members",
      tags: "AI/ML, Web3, Full Stack",
      tracks: "Smart Campus & EdTech, FinTech & Payments, Open Innovation",
      description: "",
    });
  };

  const handleDeleteHackathon = (id) => {
    if (!confirm("Are you sure you want to delete this hackathon competition?")) return;
    saveHostedHackathons(hostedHackathons.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
              <HiOutlineBolt className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">
                  Hackathons & Competitions Manager
                </h2>
                <span className="rounded-full bg-amber-100 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  {registeredTeams.length} Enrolled Teams
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Host collegiate sprints, review participant teams, and manage prize pools.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <HiOutlinePlus className="text-sm" />
              <span>Host New Hackathon</span>
            </button>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="mt-5 flex items-center gap-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setActiveSubTab("hackathons")}
            className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === "hackathons"
                ? "bg-slate-900 text-white shadow-2xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            Published Sprints ({hostedHackathons.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("registrations")}
            className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === "registrations"
                ? "bg-slate-900 text-white shadow-2xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            Registered Teams ({registeredTeams.length})
          </button>
        </div>
      </div>

      {/* Subtab 1: Hosted Hackathons */}
      {activeSubTab === "hackathons" && (
        <div className="space-y-4">
          {hostedHackathons.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <HiOutlineTrophy className="mx-auto text-3xl text-slate-300 mb-2" />
              <h3 className="text-sm font-bold text-slate-800">
                No custom hackathons published yet
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Host your club's flagship sprint or competition. Students will see it in their Hackathons tab.
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                + Host Hackathon Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hostedHackathons.map((hack) => (
                <div
                  key={hack.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-2xl border border-amber-200">
                          {hack.clubLogo || "⚡"}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400">
                            {hack.organizer}
                          </span>
                          <h3 className="text-base font-black text-slate-900 mt-0.5">
                            {hack.title}
                          </h3>
                        </div>
                      </div>

                      <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-black text-amber-800">
                        {hack.prizePool}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 line-clamp-2">
                      {hack.description}
                    </p>

                    <div className="mt-3.5 grid grid-cols-2 gap-2 text-[11px] text-slate-600 border-y border-slate-100 py-2.5">
                      <div className="flex items-center gap-1">
                        <HiOutlineCalendarDays className="text-slate-400" />
                        <span>{hack.timeline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiOutlineMapPin className="text-slate-400" />
                        <span className="truncate">{hack.mode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="rounded bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                      ● Published & Open
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDeleteHackathon(hack.id)}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800 cursor-pointer"
                    >
                      Remove Sprint
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Registered Student Teams */}
      {activeSubTab === "registrations" && (
        <div className="space-y-3">
          {registeredTeams.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <HiOutlineUserGroup className="mx-auto text-3xl text-slate-300 mb-2" />
              <h3 className="text-sm font-bold text-slate-800">
                No teams registered yet
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                When students enroll for hackathons in the student portal, their team rosters and project proposals will show up here.
              </p>
            </div>
          ) : (
            registeredTeams.map((team, idx) => (
              <div
                key={team.registrationId || idx}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">
                        Team: {team.teamName}
                      </h3>
                      <span className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                        {team.registrationId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enrolled in: <strong>{team.hackathonTitle}</strong> • Track:{" "}
                      <span className="text-slate-700">{team.selectedTrack}</span>
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 shrink-0 self-start sm:self-auto">
                    ✓ {team.status || "Confirmed"}
                  </span>
                </div>

                {/* Team Members List */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Team Members ({team.teammates?.length || 1}):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {team.teammates?.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="flex items-center justify-between bg-white border border-slate-200/70 rounded-xl px-2.5 py-1.5"
                      >
                        <span className="font-semibold text-slate-800">
                          {m.name} ({m.role || "Member"})
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {m.email}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Proposal */}
                {team.proposal && (
                  <p className="text-xs text-slate-600 bg-amber-50/50 border border-amber-200/60 rounded-xl p-2.5">
                    <strong>Proposal:</strong> {team.proposal}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Host New Hackathon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Sprint Creation Desk
                </span>
                <h2 className="text-lg font-black text-slate-900">
                  Host New Campus Hackathon
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <HiOutlineXMark className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateHackathon} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Hackathon / Sprint Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Campus Algothon 2026"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Prize Pool *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹1,00,000"
                    value={form.prizePool}
                    onChange={(e) =>
                      setForm({ ...form, prizePool: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mode
                  </label>
                  <select
                    value={form.mode}
                    onChange={(e) => setForm({ ...form, mode: e.target.value })}
                    className="h-9 w-full rounded-xl border border-slate-200 px-2.5 outline-none focus:border-slate-900 bg-white"
                  >
                    <option value="Hybrid (Campus Lab + Online)">Hybrid</option>
                    <option value="Online Virtual">Virtual Online</option>
                    <option value="Campus Auditorium Lab">Campus Lab</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Timeline Dates
                  </label>
                  <input
                    type="text"
                    value={form.timeline}
                    onChange={(e) =>
                      setForm({ ...form, timeline: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Registration Deadline
                  </label>
                  <input
                    type="text"
                    value={form.deadline}
                    onChange={(e) =>
                      setForm({ ...form, deadline: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tracks (Comma separated)
                </label>
                <input
                  type="text"
                  value={form.tracks}
                  onChange={(e) => setForm({ ...form, tracks: e.target.value })}
                  placeholder="AI for Good, FinTech, Open Track"
                  className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tech Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="Python, React, AI/ML, Cloud"
                  className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Description / Guidelines
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Rules, mentorship details, and problem statement expectations..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-slate-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-2 font-bold text-white hover:bg-slate-800"
                >
                  Publish Hackathon ⚡
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
