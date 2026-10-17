"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineAcademicCap,
  HiOutlineIdentification,
  HiOutlineCalendarDays,
  HiOutlineBookmark,
  HiOutlineTrophy,
  HiOutlineCheckBadge,
  HiOutlinePencilSquare,
  HiOutlineMapPin,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { STUDENT_USER, ALL_CLUBS } from "@/lib/mockData";

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const joinedClubsList = ALL_CLUBS.filter((c) => c.isJoined);

  const copyStudentId = () => {
    navigator.clipboard?.writeText(STUDENT_USER.studentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* 1. Profile Header Card */}
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d10] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Large Avatar */}
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl border-2 border-white/15 bg-neutral-800 shadow-md">
              <img
                src={STUDENT_USER.avatar}
                alt={STUDENT_USER.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {STUDENT_USER.name}
                </h1>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-mono text-neutral-300">
                  Verified Student
                </span>
              </div>
              <p className="text-sm text-neutral-400">
                {STUDENT_USER.role} • {STUDENT_USER.department}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-neutral-400 font-mono">
                <span className="flex items-center gap-1">
                  <HiOutlineIdentification className="text-sm" />
                  {STUDENT_USER.studentId}
                </span>
                <span>•</span>
                <span>Enrolled {STUDENT_USER.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={copyStudentId}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-neutral-300 hover:border-white/20 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? "ID Copied ✓" : "Copy Student ID"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
            >
              <HiOutlinePencilSquare className="text-sm" />
              <span>{isEditing ? "Done Editing" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 border-t border-white/6 pt-4">
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {STUDENT_USER.bio}
          </p>
        </div>
      </div>

      {/* 2. Compact Statistics Section (Part 13) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">Memberships</span>
            <HiOutlineBookmark className="text-base text-neutral-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {STUDENT_USER.stats.joinedClubs}
            </span>
            <span className="text-xs text-neutral-400 font-medium">Joined Clubs</span>
          </div>
          <p className="mt-1 text-[11px] text-neutral-400">All student society charters active</p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">Participation</span>
            <HiOutlineCalendarDays className="text-base text-neutral-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {STUDENT_USER.stats.eventsAttended}
            </span>
            <span className="text-xs text-neutral-400 font-medium">Events</span>
          </div>
          <p className="mt-1 text-[11px] text-neutral-400">Workshops, hackathons & sprints</p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">Recognition</span>
            <HiOutlineTrophy className="text-base text-neutral-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {STUDENT_USER.stats.achievements}
            </span>
            <span className="text-xs text-neutral-400 font-medium">Achievements</span>
          </div>
          <p className="mt-1 text-[11px] text-neutral-400">Collegiate certificates & project badges</p>
        </div>
      </div>

      {/* 3. Information Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic & University Records */}
        <div className="space-y-4 rounded-2xl border border-white/8 bg-[#0d0d10] p-6">
          <div className="flex items-center justify-between border-b border-white/6 pb-3">
            <h2 className="text-sm font-semibold text-white">
              Academic Information
            </h2>
            <HiOutlineAcademicCap className="text-neutral-400 text-base" />
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Email Address</span>
              <span className="font-medium text-white font-mono">{STUDENT_USER.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Department</span>
              <span className="font-medium text-white">{STUDENT_USER.department}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Academic Year</span>
              <span className="font-medium text-white">{STUDENT_USER.year}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Student ID</span>
              <span className="font-mono text-white bg-white/[0.04] px-2 py-0.5 rounded border border-white/8">
                {STUDENT_USER.studentId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Faculty Advisor</span>
              <span className="font-medium text-white">{STUDENT_USER.contact.advisor}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Campus Residence</span>
              <span className="font-medium text-white">{STUDENT_USER.contact.campusResidence}</span>
            </div>
          </div>
        </div>

        {/* Skills & Society Memberships Preview */}
        <div className="space-y-4 rounded-2xl border border-white/8 bg-[#0d0d10] p-6">
          <div className="flex items-center justify-between border-b border-white/6 pb-3">
            <h2 className="text-sm font-semibold text-white">
              Skills & Society Focus
            </h2>
            <HiOutlineCheckBadge className="text-neutral-400 text-base" />
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase text-neutral-400 mb-2">
              Verified Technical Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {STUDENT_USER.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-mono uppercase text-neutral-400">
                Active Society Charters
              </p>
              <Link
                href="/student/clubs"
                className="text-[11px] text-neutral-400 hover:text-white transition-colors"
              >
                View all ({joinedClubsList.length}) →
              </Link>
            </div>
            <div className="space-y-2">
              {joinedClubsList.slice(0, 3).map((club) => (
                <div
                  key={club.id}
                  className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.02] p-2.5 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={club.coverImage}
                      alt={club.name}
                      className="h-7 w-7 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-white">{club.name}</p>
                      <p className="text-[10px] text-neutral-400">{club.sector}</p>
                    </div>
                  </div>
                  <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-neutral-300">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
