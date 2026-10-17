"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  HiOutlineUserGroup,
  HiOutlineMagnifyingGlass,
  HiOutlineEnvelope,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiXMark,
} from "react-icons/hi2";
import { api } from "@/lib/api";

export default function PresidentMembersView() {
  const [activeMembers, setActiveMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [clubName, setClubName] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("active"); // 'active' | 'pending'

  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        const res = await api.presidents.getMembers();
        if (res.success) {
          if (Array.isArray(res.activeMembers)) setActiveMembers(res.activeMembers);
          if (Array.isArray(res.pendingMembers)) setPendingMembers(res.pendingMembers);
          if (res.clubName) setClubName(res.clubName);
        }
      } catch (err) {
        console.warn("Failed to load members:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  const currentList = tab === "active" ? activeMembers : pendingMembers;

  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return currentList.filter((m) => {
      if (!q) return true;
      const name = m.name?.toLowerCase() || "";
      const dept = m.department?.toLowerCase() || "";
      const email = m.email?.toLowerCase() || "";
      const enroll = m.enrollmentNumber?.toLowerCase() || "";
      return name.includes(q) || dept.includes(q) || email.includes(q) || enroll.includes(q);
    });
  }, [currentList, searchQuery]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-xs text-neutral-400">
        Loading roster and membership requests...
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Roster Administration • {clubName || "Club"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Club Members
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            {activeMembers.length} active members enrolled. Join requests are approved by College Admin.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-1.5">
          <button
            type="button"
            onClick={() => setTab("active")}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              tab === "active"
                ? "bg-white text-black font-bold shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Active ({activeMembers.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("pending")}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              tab === "pending"
                ? "bg-white text-black font-bold shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Pending Review ({pendingMembers.length})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:max-w-xs">
        <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search members, dept, ID..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-8 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-hidden"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
          >
            <HiXMark className="text-sm" />
          </button>
        )}
      </div>

      {/* Members Grid / Table */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={m.avatar || "/avatars/avatar-1.svg"}
                  alt={m.name}
                  className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white">{m.name}</h3>
                  <p className="text-xs text-neutral-400">{m.department} • {m.year}</p>
                  <p className="font-mono text-[10px] text-neutral-500">{m.enrollmentNumber || m.email}</p>
                </div>
              </div>

              <div className="border-t border-white/6 pt-3 flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400">
                  {tab === "active" ? `Joined: ${new Date(m.joinedDate).toLocaleDateString("en-GB")}` : "Under Review"}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 ${
                    tab === "active"
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                  }`}
                >
                  {tab === "active" ? "Member" : "Pending Admin"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-xs text-neutral-400">
          No members found in this view.
        </div>
      )}
    </div>
  );
}
