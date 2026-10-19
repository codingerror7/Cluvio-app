"use client";

import React, { useState, useMemo } from "react";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";
import ClubCard from "./ClubCard";

const SECTORS = [
  "All",
  "Technical",
  "Engineering",
  "Creative",
  "Cultural",
  "Sports",
  "Literary",
  "Social",
];

export default function ClubGrid({ clubs = [], onActionSuccess }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const q = searchQuery.toLowerCase().trim();
      const clubName = club.name?.toLowerCase() || "";
      const clubDesc = club.description?.toLowerCase() || "";
      const presName =
        typeof club.president === "object"
          ? club.president?.name?.toLowerCase() || ""
          : (club.president || "").toLowerCase();

      const tags = Array.isArray(club.tags) ? club.tags : [];
      const matchesSearch =
        !q ||
        clubName.includes(q) ||
        clubDesc.includes(q) ||
        presName.includes(q) ||
        tags.some((t) => (t || "").toLowerCase().includes(q));

      const clubCategory = (club.category || club.sector || "").toLowerCase();
      const matchesSector =
        selectedSector === "All" ||
        clubCategory.includes(selectedSector.toLowerCase());

      return matchesSearch && matchesSector;
    });
  }, [clubs, searchQuery, selectedSector]);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Search and Sector Filter Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clubs, tags, presidents..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-8 text-sm text-white placeholder-neutral-500 transition-colors focus:border-white/30 focus:outline-hidden min-h-[42px]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <HiXMark className="text-sm" />
            </button>
          )}
        </div>

        {/* Sector Pills with horizontal mobile touch scroll */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-1 text-xs -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:flex-wrap shrink-0">
          {SECTORS.map((sector) => {
            const isSelected = selectedSector === sector;
            return (
              <button
                key={sector}
                type="button"
                onClick={() => setSelectedSector(sector)}
                className={`rounded-full px-3.5 py-1.5 font-medium transition-colors cursor-pointer shrink-0 min-h-[36px] flex items-center touch-manipulation ${
                  isSelected
                    ? "bg-white text-black font-semibold shadow-xs"
                    : "border border-white/8 bg-white/[0.02] text-neutral-400 hover:border-white/15 hover:text-white"
                }`}
              >
                {sector}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clubs Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/6 pb-3">
        <span>
          Showing <span className="text-white font-medium">{filteredClubs.length}</span> of {clubs.length} approved clubs
        </span>
        {selectedSector !== "All" && (
          <span className="text-neutral-400">
            Sector: <span className="text-white font-medium">{selectedSector}</span>
          </span>
        )}
      </div>

      {/* Responsive Grid */}
      {filteredClubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredClubs.map((club) => (
            <ClubCard
              key={club._id || club.id}
              club={club}
              onJoinSuccess={onActionSuccess}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/8 bg-white/[0.01] py-16 text-center">
          <p className="text-sm font-medium text-white">No matching clubs found</p>
          <p className="mt-1 text-xs text-neutral-400">
            Try adjusting your search query or switching sector filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedSector("All");
            }}
            className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-neutral-300 hover:text-white cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
