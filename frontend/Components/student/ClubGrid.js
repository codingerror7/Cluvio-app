"use client";

import React, { useState, useMemo } from "react";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";
import ClubCard from "./ClubCard";

const SECTORS = [
  "All",
  "Technology",
  "Arts",
  "Sports",
  "Cultural",
  "Academic",
  "Social",
];

export default function ClubGrid({ clubs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        club.president.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (club.description &&
          club.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSector =
        selectedSector === "All" ||
        club.sector.toLowerCase() === selectedSector.toLowerCase();

      return matchesSearch && matchesSector;
    });
  }, [clubs, searchQuery, selectedSector]);

  return (
    <div className="space-y-6">
      {/* Search and Sector Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clubs, tags, presidents..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-8 text-xs text-white placeholder-neutral-500 transition-colors focus:border-white/30 focus:outline-none"
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

        {/* Sector Pills */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 text-xs">
          {SECTORS.map((sector) => {
            const isSelected = selectedSector === sector;
            return (
              <button
                key={sector}
                type="button"
                onClick={() => setSelectedSector(sector)}
                className={`rounded-full px-3 py-1 font-medium transition-colors cursor-pointer ${
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
          Showing <span className="text-white font-medium">{filteredClubs.length}</span> of {clubs.length} clubs
        </span>
        {selectedSector !== "All" && (
          <span className="text-neutral-400">
            Sector: <span className="text-white font-medium">{selectedSector}</span>
          </span>
        )}
      </div>

      {/* Responsive Grid: 3 cards on desktop, 2 on tablet, 1 on mobile */}
      {filteredClubs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/8 bg-white/[0.01] py-16 text-center">
          <p className="text-sm font-medium text-white">No clubs found</p>
          <p className="mt-1 text-xs text-neutral-400">
            Try adjusting your search query or switching sector filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedSector("All");
            }}
            className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-neutral-300 hover:text-white"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
