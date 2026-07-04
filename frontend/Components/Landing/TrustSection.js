"use client";

import React from "react";
import {
  HiOutlineUsers,
  HiOutlineCalendarDays,
  HiOutlineBellAlert,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlineTrophy,
} from "react-icons/hi2";

const pillars = [
  {
    icon: HiOutlineUsers,
    title: "Member Management",
    description:
      "Manage members, leadership roles, committees, and participation from one centralized workspace.",
  },
  {
    icon: HiOutlineCalendarDays,
    title: "Event Management",
    description:
      "Plan, organize, and execute club events with registrations, attendance, and schedules.",
  },
  {
    icon: HiOutlineBellAlert,
    title: "Announcements",
    description:
      "Keep every member updated through announcements, notices, and important club communications.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Administrative Control",
    description:
      "Securely manage permissions, approvals, executive teams, and club settings.",
  },
];

const clubTypes = [
  {
    icon: HiOutlineTrophy,
    label: "Technical Clubs",
  },
  {
    icon: HiOutlineAcademicCap,
    label: "Student Chapters",
  },
  {
    icon: HiOutlineUsers,
    label: "Cultural Societies",
  },
  {
    icon: HiOutlineCalendarDays,
    label: "Campus Communities",
  },
];

const TrustSection = () => {
  return (
    <section className="py-24">

      <div className="container-page">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--accent)]">
            Built for Campus Communities
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
            Everything a Club Needs.
            <span className="block text-[var(--accent)]">
              Nothing It Doesn't.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Cluvio simplifies club management by bringing members, events,
            announcements, approvals, and administration together in one
            intuitive platform designed for colleges.
          </p>

        </div>

        {/* Club Types */}

        <div className="mt-12 flex flex-wrap justify-center gap-3">

          {clubTypes.map((club) => {
            const Icon = club.icon;

            return (
              <div
                key={club.label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80"
              >
                <Icon className="text-lg text-[var(--accent)]" />
                {club.label}
              </div>
            );
          })}

        </div>

        {/* Feature Cards */}

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {pillars.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:border-[var(--accent)]/40 hover:bg-white/[0.05]"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/10">

                  <Icon className="text-2xl text-[var(--accent)]" />

                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-white/60">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default TrustSection;