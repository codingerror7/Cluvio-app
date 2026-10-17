"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlinePlus,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineMegaphone,
} from "react-icons/hi2";
import { api, getStoredUser } from "@/lib/api";

export default function PresidentDashboardView() {
  const [user, setUser] = useState(null);
  const [club, setClub] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const stored = getStoredUser();
        setUser(stored);

        const [profRes, clubRes, analyticsRes, eventsRes, annRes] = await Promise.all([
          api.presidents.getProfile().catch(() => ({ president: stored })),
          api.presidents.getMyClub().catch(() => ({ club: null })),
          api.presidents.getAnalytics().catch(() => ({ analytics: null })),
          api.events.getAll().catch(() => ({ events: [] })),
          api.announcements.getAll().catch(() => ({ announcements: [] })),
        ]);

        if (profRes.president) setUser(profRes.president);
        if (clubRes.club) setClub(clubRes.club);
        if (analyticsRes.analytics) setAnalytics(analyticsRes.analytics);
        if (eventsRes.events) setEvents(eventsRes.events);
        if (annRes.announcements) setAnnouncements(annRes.announcements);
      } catch (err) {
        console.warn("President dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-12 text-center text-xs text-neutral-400">
        Loading club president console...
      </div>
    );
  }

  const firstName = user?.name ? user.name.split(" ")[0] : "President";

  return (
    <div className="space-y-8 text-left">
      {/* 1. Page Heading & Club Identity */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              President Operations Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome, {firstName}.
          </h1>
          <p className="text-sm text-neutral-400">
            {club
              ? `Managing ${club.name} • All charter changes & events require College Admin review.`
              : "No club created yet. Submit a club charter proposal to your College Admin below."}
          </p>
        </div>

        {/* Club Identity Tag */}
        {club ? (
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d10] p-3 pr-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-neutral-800 text-xl">
              {club.logo || "💻"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{club.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-mono border ${
                    club.status === "Active"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                  }`}
                >
                  {club.status}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                {club.sector || club.category} • College: {club.collegeName || user?.collegeName || "Campus"}
              </p>
            </div>
          </div>
        ) : (
          <Link
            href="/president/club"
            className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <HiOutlinePlus className="text-sm" />
            <span>Create New Club Charter</span>
          </Link>
        )}
      </div>

      {/* Pending Club Alert if club is pending */}
      {club && club.status === "Pending" && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 flex items-start gap-3">
          <HiOutlineClock className="text-lg text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-100">
              Club Status: Pending College Admin Charter Approval
            </p>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              Your club charter for &ldquo;{club.name}&rdquo; has been submitted and is currently awaiting approval by the College Admin. Once approved, the club will become discoverable to students across campus.
            </p>
          </div>
        </div>
      )}

      {/* 2. Real Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">Total Members</span>
            <HiOutlineUserGroup className="text-base text-neutral-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold tracking-tight text-white">
              {analytics?.totalMembers ?? club?.membersCount ?? 1}
            </span>
            <p className="text-[11px] text-neutral-400 mt-1">Official enrolled members</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">Pending Requests</span>
            <HiOutlineClock className="text-base text-amber-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold tracking-tight text-amber-300">
              {analytics?.pendingRequests ?? 0}
            </span>
            <p className="text-[11px] text-neutral-400 mt-1">Student join requests under review</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">Approved Events</span>
            <HiOutlineCalendarDays className="text-base text-neutral-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold tracking-tight text-white">
              {analytics?.eventsCount ?? events.length}
            </span>
            <p className="text-[11px] text-neutral-400 mt-1">Published campus sessions</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">Engagement</span>
            <HiOutlineBolt className="text-base text-neutral-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold tracking-tight text-white">
              {analytics?.engagementRate ?? "85%"}
            </span>
            <p className="text-[11px] text-neutral-400 mt-1">Active participation index</p>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-6 space-y-4">
          <h2 className="text-sm font-bold tracking-tight text-white">Club Controls</h2>
          <div className="space-y-2">
            <Link
              href="/president/club"
              className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs text-neutral-300 hover:border-white/15 hover:text-white transition-colors"
            >
              <span>{club ? "Edit Club Details (Awaiting Approval)" : "Create Club Charter"}</span>
              <HiOutlineArrowRight className="text-sm" />
            </Link>
            <Link
              href="/president/members"
              className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs text-neutral-300 hover:border-white/15 hover:text-white transition-colors"
            >
              <span>Manage Members & Roster</span>
              <HiOutlineArrowRight className="text-sm" />
            </Link>
            <Link
              href="/president/activities"
              className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs text-neutral-300 hover:border-white/15 hover:text-white transition-colors"
            >
              <span>Propose Event / Activity</span>
              <HiOutlineArrowRight className="text-sm" />
            </Link>
            <Link
              href="/president/announcements"
              className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs text-neutral-300 hover:border-white/15 hover:text-white transition-colors"
            >
              <span>Draft Official Announcement</span>
              <HiOutlineArrowRight className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Recent Events & Announcements */}
        <div className="lg:col-span-2 rounded-2xl border border-white/8 bg-[#0d0d10] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/6 pb-3">
            <h2 className="text-sm font-bold tracking-tight text-white">Campus Events & Announcements</h2>
            <span className="text-[11px] font-mono text-neutral-400">
              Moderated by College Admin
            </span>
          </div>

          <div className="space-y-3">
            {events.length === 0 && announcements.length === 0 ? (
              <p className="text-xs text-neutral-500 py-6 text-center">
                No events or announcements created yet.
              </p>
            ) : (
              <>
                {events.slice(0, 3).map((ev) => (
                  <div
                    key={ev._id}
                    className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.01] p-3.5"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{ev.title}</span>
                        <span
                          className={`rounded px-1.5 py-0.2 text-[9px] font-mono ${
                            ev.status === "Approved"
                              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          }`}
                        >
                          {ev.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono">
                        {ev.date} • {ev.location} • Capacity: {ev.capacity}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
