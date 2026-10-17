"use client";

import React, { useState } from "react";
import {
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { api } from "@/lib/api";

export default function ClubCard({ club, showJoinStatus = true, onJoinSuccess }) {
  const initialStatus = club.membershipStatus || (club.isMember ? "Member" : "Not Joined");
  const [membershipStatus, setMembershipStatus] = useState(initialStatus);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleApplyToJoin = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (membershipStatus === "Member" || membershipStatus === "Pending") {
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await api.memberships.join({
        clubId: club._id || club.id,
        motivation: "Student applying to participate in activities and events.",
      });

      if (res.success) {
        setMembershipStatus("Pending");
        setFeedback("Join request submitted for College Admin review.");
        if (onJoinSuccess) onJoinSuccess();
      }
    } catch (err) {
      setFeedback(err.message || "Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  const isMember = membershipStatus === "Member";
  const isPending = membershipStatus === "Pending";

  const presidentName =
    typeof club.president === "object"
      ? club.president?.name || "Student President"
      : club.president || "Student President";

  const presidentAvatar =
    typeof club.president === "object" ? club.president?.avatar : club.presidentAvatar;

  const totalMembersCount = club.membersCount ?? club.totalMembers ?? 1;

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d10] transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] text-left">
      <div>
        {/* Cover Image */}
        <div className="relative h-44 w-full overflow-hidden bg-neutral-900 flex items-center justify-center">
          {club.coverImage ? (
            <img
              src={club.coverImage}
              alt={club.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-neutral-600">
              <span className="text-4xl">{club.logo || "💻"}</span>
              <span className="text-xs font-mono">{club.category || "Chartered"}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-80" />

          {/* Sector Badge */}
          <div className="absolute top-3 left-3">
            <span className="rounded-md border border-white/12 bg-black/70 px-2.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wider text-neutral-200 backdrop-blur-md">
              {club.sector || club.category || "Charter"}
            </span>
          </div>

          {/* Status Badges */}
          {isMember && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 rounded-md border border-emerald-500/30 bg-black/80 px-2 py-0.5 text-[10px] font-medium text-emerald-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Active Member
              </span>
            </div>
          )}

          {isPending && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 rounded-md border border-amber-500/30 bg-black/80 px-2 py-0.5 text-[10px] font-medium text-amber-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                Pending Approval
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-bold tracking-tight text-white transition-colors">
              {club.name}
            </h3>
            {club.description && (
              <p className="line-clamp-2 text-xs text-neutral-400 leading-relaxed font-normal">
                {club.description}
              </p>
            )}
          </div>

          {/* Tags */}
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

          {/* President & Members */}
          <div className="mt-2 border-t border-white/6 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/15 bg-neutral-800 shrink-0">
                {presidentAvatar ? (
                  <img
                    src={presidentAvatar}
                    alt={presidentName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-white">
                    {presidentName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  President
                </span>
                <span className="text-xs font-medium text-neutral-200">
                  {presidentName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
              <HiOutlineUserGroup className="text-sm text-neutral-400" />
              <span>{totalMembersCount} Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      {showJoinStatus && (
        <div className="border-t border-white/6 bg-white/[0.01] px-5 py-3 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">
            {isMember ? "Official Member" : isPending ? "Review in Progress" : "Open for Membership"}
          </span>

          <button
            type="button"
            onClick={handleApplyToJoin}
            disabled={submitting || isMember || isPending}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
              isMember
                ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 cursor-default"
                : isPending
                ? "border border-amber-500/30 bg-amber-500/10 text-amber-300 cursor-default"
                : "bg-white text-black hover:bg-neutral-200 active:scale-95 disabled:opacity-50"
            }`}
          >
            {isMember
              ? "Joined ✓"
              : isPending
              ? "Pending Review ⏳"
              : submitting
              ? "Submitting..."
              : "Apply to Join"}
          </button>
        </div>
      )}

      {feedback && (
        <div className="px-5 pb-2 text-[11px] font-mono text-neutral-400">
          {feedback}
        </div>
      )}
    </div>
  );
}
