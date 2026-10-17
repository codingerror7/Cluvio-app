"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineBolt,
  HiOutlineCheckBadge,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlinePlus,
  HiOutlineBuildingLibrary,
  HiOutlineMegaphone,
} from "react-icons/hi2";
import {
  PRESIDENT_USER,
  PRESIDENT_CLUB,
  PRESIDENT_OVERVIEW_STATS,
  UPCOMING_EVENTS,
  RECENT_ACTIVITY,
  PRESIDENT_MEMBERS,
} from "@/lib/mockData";

export default function PresidentDashboardView() {
  return (
    <div className="space-y-8">
      {/* 1. Page Heading & Club Identity (Part 17) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              President Dashboard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Good morning, {PRESIDENT_USER.name.split(" ")[0]}.
          </h1>
          <p className="text-sm text-neutral-400">
            Here's what's happening with your club.
          </p>
        </div>

        {/* Club Identity Tag */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d10] p-3 pr-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-neutral-800">
            <img
              src={PRESIDENT_CLUB.coverImage}
              alt={PRESIDENT_CLUB.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                {PRESIDENT_CLUB.name}
              </span>
              <span className="rounded-full bg-white/[0.06] border border-white/10 px-2 py-0.5 text-[9px] font-mono text-neutral-300">
                Active Charter
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              {PRESIDENT_CLUB.sector} • President: {PRESIDENT_CLUB.president}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Overview Statistics (Part 18) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRESIDENT_OVERVIEW_STATS.map((stat, idx) => (
          <div
            key={stat.id}
            className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5 transition-all hover:border-white/16"
          >
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span className="font-mono uppercase tracking-wider text-[11px]">
                {stat.label}
              </span>
              {idx === 0 && <HiOutlineUserGroup className="text-base text-neutral-400" />}
              {idx === 1 && <HiOutlineShieldCheck className="text-base text-neutral-400" />}
              {idx === 2 && <HiOutlineCalendarDays className="text-base text-neutral-400" />}
              {idx === 3 && <HiOutlineBolt className="text-base text-neutral-400" />}
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-white">
                {stat.value}
              </span>
              <span className="text-[11px] font-medium text-emerald-400 font-mono">
                {stat.change}
              </span>
            </div>

            <p className="mt-1 text-[11px] text-neutral-400 truncate">
              {stat.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* 3. Club Overview Panel (Part 19) */}
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d10]">
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <img
            src={PRESIDENT_CLUB.coverImage}
            alt={PRESIDENT_CLUB.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/60 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="rounded-md border border-white/12 bg-black/60 px-2.5 py-0.5 text-[10px] font-mono text-neutral-300 uppercase tracking-wider backdrop-blur-md">
                  {PRESIDENT_CLUB.sector}
                </span>
                <span className="rounded-md border border-white/12 bg-black/60 px-2.5 py-0.5 text-[10px] font-mono text-neutral-300 backdrop-blur-md">
                  {PRESIDENT_CLUB.founded}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {PRESIDENT_CLUB.name}
              </h2>
            </div>

            <Link
              href="/president/club"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors shadow-xs active:scale-95"
            >
              <span>Manage Club Profile</span>
              <HiOutlineArrowRight className="text-xs" />
            </Link>
          </div>
        </div>

        {/* Panel Meta details */}
        <div className="p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/6 text-xs">
          <div>
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
              President
            </span>
            <p className="mt-0.5 font-medium text-white">{PRESIDENT_CLUB.president}</p>
          </div>
          <div>
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
              Vice President
            </span>
            <p className="mt-0.5 font-medium text-white">{PRESIDENT_CLUB.vicePresident}</p>
          </div>
          <div>
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
              Meeting Lab
            </span>
            <p className="mt-0.5 font-medium text-white truncate">Hall B-204</p>
          </div>
          <div>
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
              Total Roster
            </span>
            <p className="mt-0.5 font-medium text-white">
              {PRESIDENT_CLUB.totalMembers} Members
            </p>
          </div>
        </div>
      </div>

      {/* 4. Upcoming Events & Recent Activity (Parts 20 & 21) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Events Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div className="flex items-center gap-2">
              <HiOutlineCalendarDays className="text-base text-white" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Upcoming Events
              </h3>
            </div>
            <Link
              href="/president/activities"
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              View all ({UPCOMING_EVENTS.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {UPCOMING_EVENTS.map((event) => (
              <div
                key={event.id}
                className="flex flex-col justify-between rounded-2xl border border-white/8 bg-[#0d0d10] p-5 transition-all hover:border-white/16 hover:-translate-y-0.5"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                      {event.tag}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {event.date}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight pt-1">
                    {event.name}
                  </h4>

                  <div className="space-y-1 text-xs text-neutral-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <HiOutlineClock className="text-sm text-neutral-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HiOutlineMapPin className="text-sm text-neutral-400" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/6 pt-3 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Registered</span>
                  <span className="font-mono text-white font-medium">
                    {event.participants} / {event.maxCapacity} Students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline (Part 21) (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div className="flex items-center gap-2">
              <HiOutlineBolt className="text-base text-white" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Recent Activity
              </h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">Live</span>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-5 space-y-4">
            <div className="space-y-4">
              {RECENT_ACTIVITY.map((item, idx) => (
                <div key={item.id} className="relative flex items-start gap-3 text-xs">
                  {/* Timeline point */}
                  <div className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-white" />
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-medium text-white">{item.action}</p>
                      <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-normal">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Members Preview (Part 22) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/8 pb-3">
          <div className="flex items-center gap-2">
            <HiOutlineUserGroup className="text-base text-white" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Members Roster Preview
            </h3>
          </div>
          <Link
            href="/president/members"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors"
          >
            <span>View all members</span>
            <HiOutlineArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESIDENT_MEMBERS.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-[#0d0d10] p-4 text-xs transition-colors hover:border-white/16"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/12 bg-neutral-800 shrink-0">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-[11px] text-neutral-400">{member.department}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="rounded bg-white/[0.04] border border-white/8 px-2 py-0.5 text-[10px] text-neutral-300">
                  {member.status}
                </span>
                <p className="mt-1 text-[10px] font-mono text-neutral-400">
                  Joined {member.joined.split(" ")[0]} {member.joined.split(" ")[1]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
