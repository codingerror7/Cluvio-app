"use client";

import React, { useState } from "react";
import {
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineBookmark,
} from "react-icons/hi2";

export default function ClubCard({ club, showJoinStatus = true }) {
  const [joined, setJoined] = useState(club.isJoined || false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleJoin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setJoined(!joined);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d10] transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
    >
      <div>
        {/* 1. Cover Image with consistent aspect ratio */}
        <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
          <img
            src={club.coverImage}
            alt={club.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle dark gradient overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-80" />

          {/* Sector Badge */}
          <div className="absolute top-3 left-3">
            <span className="rounded-md border border-white/12 bg-black/70 px-2.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wider text-neutral-200 backdrop-blur-md">
              {club.sector}
            </span>
          </div>

          {/* Joined Status Badge if member */}
          {joined && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 rounded-md border border-white/15 bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Active Member
              </span>
            </div>
          )}
        </div>

        {/* 2. Content Area */}
        <div className="p-5 flex flex-col gap-3">
          {/* Club Name */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-white">
              {club.name}
            </h3>
            {club.description && (
              <p className="line-clamp-2 text-xs text-neutral-400 leading-relaxed font-normal">
                {club.description}
              </p>
            )}
          </div>

          {/* 3. Lightweight Neutral Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {club.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/6 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-mono text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 4. Club President */}
          <div className="mt-2 border-t border-white/6 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/15 bg-neutral-800">
                {club.presidentAvatar ? (
                  <img
                    src={club.presidentAvatar}
                    alt={club.president}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-white">
                    {club.president.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  President
                </span>
                <span className="text-xs font-medium text-neutral-200">
                  {club.president}
                </span>
              </div>
            </div>

            {/* 5. Total Members */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
              <HiOutlineUserGroup className="text-sm text-neutral-400" />
              <span>{club.totalMembers} Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Card Action Footer */}
      {showJoinStatus && (
        <div className="border-t border-white/6 bg-white/[0.01] px-5 py-3 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">
            {joined ? "Membership Active" : "Recruiting Open"}
          </span>
          <button
            type="button"
            onClick={handleToggleJoin}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
              joined
                ? "border border-white/10 bg-white/[0.05] text-neutral-300 hover:bg-white/[0.1] hover:text-white"
                : "bg-white text-black hover:bg-neutral-200 active:scale-95"
            }`}
          >
            {joined ? "Joined ✓" : "Apply to Join"}
          </button>
        </div>
      )}
    </div>
  );
}
