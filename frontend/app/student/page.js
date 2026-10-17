"use client";

import React from "react";
import ClubGrid from "@/Components/student/ClubGrid";
import { ALL_CLUBS } from "@/lib/mockData";

export default function StudentHomePage() {
  return (
    <div className="space-y-8">
      {/* Page Header (Part 7) */}
      <div className="space-y-2 border-b border-white/8 pb-6">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
            University Societies & Chapters
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Explore Clubs
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Discover communities, activities and interests that match you. Apply for verified charters and join competitive leagues across campus.
        </p>
      </div>

      {/* Clubs Grid & Filter */}
      <ClubGrid clubs={ALL_CLUBS} />
    </div>
  );
}
