"use client";

import React, { useState, useMemo } from "react";
import {
  HiOutlineUserGroup,
  HiOutlineMagnifyingGlass,
  HiOutlineUserPlus,
  HiOutlineEnvelope,
  HiOutlineEllipsisHorizontal,
  HiOutlineCheck,
  HiXMark,
} from "react-icons/hi2";
import { PRESIDENT_MEMBERS, PRESIDENT_CLUB } from "@/lib/mockData";

export default function PresidentMembersView() {
  const [members, setMembers] = useState(PRESIDENT_MEMBERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === "All" || m.status.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [members, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-white/20 bg-black/90 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md">
          {toastMessage}
        </div>
      )}

      {/* Page Header (Part 25) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Roster Administration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Members
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            {PRESIDENT_CLUB.totalMembers} total members enrolled across academic departments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Member invitation link copied to clipboard.")}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
        >
          <HiOutlineUserPlus className="text-sm" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members, dept, role..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-8 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <HiXMark className="text-sm" />
            </button>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 text-xs">
          {["All", "Active", "On Leave"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-full px-3 py-1 font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? "bg-white text-black font-semibold shadow-xs"
                  : "border border-white/8 bg-white/[0.02] text-neutral-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table (Part 25) */}
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d10]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.02] text-neutral-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Member</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Year</th>
                <th className="py-3.5 px-4">Joined</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6 text-neutral-300">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="transition-colors hover:bg-white/[0.02]"
                >
                  {/* Member Name + Avatar */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10 bg-neutral-800 shrink-0">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{member.name}</p>
                        <p className="text-[11px] font-mono text-neutral-400">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-4 font-medium text-neutral-200">
                    {member.department}
                  </td>

                  {/* Year */}
                  <td className="py-3.5 px-4 text-neutral-400">
                    {member.year}
                  </td>

                  {/* Joined Date */}
                  <td className="py-3.5 px-4 font-mono text-neutral-400">
                    {member.joined}
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-4">
                    <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-neutral-300">
                      {member.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        member.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-white/5 text-neutral-400 border border-white/10"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          member.status === "Active" ? "bg-emerald-400" : "bg-neutral-500"
                        }`}
                      />
                      {member.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        showToast(`Opened profile details for ${member.name}`)
                      }
                      className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11px] text-neutral-300 hover:border-white/16 hover:text-white transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="py-12 text-center text-xs text-neutral-400">
            No matching members found.
          </div>
        )}
      </div>
    </div>
  );
}
