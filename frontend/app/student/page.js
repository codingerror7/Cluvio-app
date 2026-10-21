"use client";

import React, { useState, useEffect } from "react";
import ClubGrid from "@/Components/student/ClubGrid";
import Footer from "@/Components/Landing/Footer";
import { api } from "@/lib/api";

export default function StudentHomePage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.clubs.getAll();
      if (res.success && Array.isArray(res.clubs)) {
        setClubs(res.clubs);
      }
    } catch (err) {
      console.warn("Failed to load clubs:", err);
      setError("Unable to load active clubs right now. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 text-left">
      {/* Page Header */}
      <div className="space-y-2 border-b border-white/8 pb-5 sm:pb-6">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">
            Approved University Societies & Chapters
          </span>
        </div>
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
          Explore Clubs
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Discover approved communities and competitive student chapters. Submit join requests directly to your College Admin for official charter membership.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-sm text-neutral-400">
          Loading approved campus clubs...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center text-sm text-red-300">
          {error}
        </div>
      ) : clubs.length === 0 ? (
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-sm text-neutral-400">
          No approved clubs available in your college yet.
        </div>
      ) : (
        <ClubGrid clubs={clubs} onActionSuccess={fetchClubs} />
      )}

      <Footer />
    </div>
  )
}
