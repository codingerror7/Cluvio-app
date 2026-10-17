"use client";

import React, { useState } from "react";
import {
  HiOutlinePencilSquare,
  HiOutlineBuildingLibrary,
  HiOutlineUserGroup,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineEnvelope,
  HiOutlineAcademicCap,
  HiOutlineCheck,
} from "react-icons/hi2";
import { PRESIDENT_CLUB, PRESIDENT_USER } from "@/lib/mockData";

export default function PresidentClubProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Charter Administration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Club Profile
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Manage your official club directory presence, charter credentials, and contact details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedToast && (
            <span className="flex items-center gap-1.5 text-xs text-white bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
              <HiOutlineCheck className="text-sm" /> Changes updated
            </span>
          )}
          <button
            type="button"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
          >
            <HiOutlinePencilSquare className="text-sm" />
            <span>{isEditing ? "Save Changes" : "Edit Club"}</span>
          </button>
        </div>
      </div>

      {/* Club Visuals Banner */}
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d10]">
        <div className="relative h-56 sm:h-64 w-full">
          <img
            src={PRESIDENT_CLUB.coverImage}
            alt={PRESIDENT_CLUB.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent" />

          {/* Logo positioning */}
          <div className="absolute bottom-5 left-6 flex items-end gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-white/20 bg-neutral-900 shadow-xl">
              <img
                src={PRESIDENT_CLUB.coverImage}
                alt={PRESIDENT_CLUB.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-white/12 bg-black/60 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-300 backdrop-blur-md">
                  {PRESIDENT_CLUB.sector}
                </span>
                <span className="rounded-md border border-white/12 bg-black/60 px-2.5 py-0.5 text-[10px] font-mono text-neutral-300 backdrop-blur-md">
                  {PRESIDENT_CLUB.founded}
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                {PRESIDENT_CLUB.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Quick Statistics Strip */}
        <div className="p-6 border-t border-white/6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="font-mono text-[10px] uppercase text-neutral-400">Total Members</span>
            <p className="mt-1 text-lg font-bold text-white">{PRESIDENT_CLUB.totalMembers}</p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-neutral-400">Active Rate</span>
            <p className="mt-1 text-lg font-bold text-white">75%</p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-neutral-400">Charter Status</span>
            <p className="mt-1 text-sm font-semibold text-white">Verified Tier-1</p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-neutral-400">Faculty Sponsor</span>
            <p className="mt-1 text-sm font-medium text-white">{PRESIDENT_CLUB.facultyAdvisor}</p>
          </div>
        </div>
      </div>

      {/* Description & Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Description & Tags (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white border-b border-white/6 pb-3">
              About the Organization
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {PRESIDENT_CLUB.description}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2">
                Official Chapter Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESIDENT_CLUB.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white border-b border-white/6 pb-3">
              Logistics & Regular Assemblies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <HiOutlineMapPin className="text-sm text-neutral-400" />
                  Primary Meeting Lab
                </span>
                <p className="font-medium text-white">{PRESIDENT_CLUB.meetingLocation}</p>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <HiOutlineClock className="text-sm text-neutral-400" />
                  Weekly Schedule
                </span>
                <p className="font-medium text-white">{PRESIDENT_CLUB.regularSchedule}</p>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <HiOutlineEnvelope className="text-sm text-neutral-400" />
                  Official Contact Email
                </span>
                <p className="font-medium text-white font-mono">{PRESIDENT_CLUB.contactEmail}</p>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <HiOutlineAcademicCap className="text-sm text-neutral-400" />
                  Host Department
                </span>
                <p className="font-medium text-white">{PRESIDENT_CLUB.sector}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Executive Leadership Card */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white border-b border-white/6 pb-3">
              Executive Committee
            </h3>

            {/* President */}
            <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-neutral-800 shrink-0">
                <img
                  src={PRESIDENT_USER.avatar}
                  alt={PRESIDENT_USER.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">President</span>
                <p className="font-medium text-white">{PRESIDENT_CLUB.president}</p>
                <p className="text-[11px] text-neutral-400">{PRESIDENT_USER.department}</p>
              </div>
            </div>

            {/* Vice President */}
            <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-neutral-800 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
                  alt={PRESIDENT_CLUB.vicePresident}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">Vice President</span>
                <p className="font-medium text-white">{PRESIDENT_CLUB.vicePresident}</p>
                <p className="text-[11px] text-neutral-400">Electronics & Comm</p>
              </div>
            </div>

            {/* Faculty Sponsor */}
            <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white shrink-0 font-bold text-xs">
                KN
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">Faculty Advisor</span>
                <p className="font-medium text-white">{PRESIDENT_CLUB.facultyAdvisor}</p>
                <p className="text-[11px] text-neutral-400">Professor, Mechatronics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
