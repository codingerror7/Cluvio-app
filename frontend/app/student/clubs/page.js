"use client";

import React from "react";
import Link from "next/link";
import ClubCard from "@/Components/student/ClubCard";
import { ALL_CLUBS } from "@/lib/mockData";
import { HiOutlineBookmark, HiOutlineArrowRight } from "react-icons/hi2";

export default function JoinedClubsPage() {
  const joinedClubs = ALL_CLUBS.filter((c) => c.isJoined);

  return (
    <div className="space-y-8">
      {/* Page Header (Part 14) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Active Memberships
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            My Clubs
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl">
            Clubs and communities you're currently part of. Manage your participation, view sprint duties, and stay connected with team leads.
          </p>
        </div>

        <Link
          href="/student"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-neutral-200 hover:border-white/20 hover:text-white transition-colors"
        >
          <span>Explore More Clubs</span>
          <HiOutlineArrowRight className="text-xs" />
        </Link>
      </div>

      {/* Grid of Joined Clubs */}
      {joinedClubs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {joinedClubs.map((club) => (
            <ClubCard key={club.id} club={club} showJoinStatus={true} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/8 bg-white/[0.01] py-16 text-center">
          <HiOutlineBookmark className="mx-auto text-3xl text-neutral-500 mb-2" />
          <p className="text-sm font-medium text-white">No joined clubs yet</p>
          <p className="mt-1 text-xs text-neutral-400">
            Browse campus clubs and submit a membership application to get started.
          </p>
          <Link
            href="/student"
            className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-xs font-medium text-black"
          >
            Explore Clubs
          </Link>
        </div>
      )}
    </div>
  );
}
