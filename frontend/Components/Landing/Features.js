"use client";

import React from "react";
import {
  HiOutlineUsers,
  HiOutlineCalendarDays,
  HiOutlineBellAlert,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineCalendarDays,
    title: "Event Management",
    description:
      "Plan events, manage registrations, schedules, and attendance from one place.",
  },
  {
    icon: HiOutlineBellAlert,
    title: "Announcements",
    description:
      "Broadcast important updates and keep every club member informed.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Analytics",
    description:
      "Track member engagement, participation, and event performance with insights.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Role Management",
    description:
      "Assign permissions securely for admins, coordinators, and members.",
  },
];

const roles = [
  "President",
  "Vice President",
  "Technical Lead",
  "Event Coordinator",
];

const Features = () => {
  return (
    <section id="features" className="py-24">

      <div className="container-page">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--accent)]">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Everything Needed to Run
            <span className="block text-[var(--accent)]">
              a Modern Student Club
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Cluvio combines member management, communication, events,
            permissions, and analytics into one modern platform.
          </p>

        </div>

        {/* Content */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {/* Main Card */}

          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-8">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
              <HiOutlineUsers className="text-2xl text-[var(--accent)]" />
            </div>

            <h3 className="mt-6 text-3xl font-semibold text-white">
              Member Management
            </h3>

            <p className="mt-4 max-w-2xl leading-8 text-white/60">
              Organize members, leadership teams, committees, and participation
              without spreadsheets. Keep everyone structured, connected, and
              easy to manage.
            </p>

            <div className="mt-10 space-y-4">

              {roles.map((role) => (
                <div
                  key={role}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
                >
                  <div className="flex items-center gap-4">

                    <div className="h-11 w-11 rounded-xl bg-[var(--accent)]/10" />

                    <span className="font-medium text-white">
                      {role}
                    </span>

                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    Active
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* Side Features */}

          <div className="space-y-6">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[var(--accent)]/40"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                    <Icon className="text-xl text-[var(--accent)]" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-white/60">
                    {feature.description}
                  </p>

                  <button className="mt-5 flex items-center gap-2 font-medium text-[var(--accent)] transition group-hover:gap-3">
                    Learn More
                    <HiOutlineArrowRight className="text-sm" />
                  </button>

                </div>
              );
            })}

          </div>

        </div>

        <div className="mx-auto mt-20 max-w-3xl text-center">

          <p className="text-lg leading-8 text-white/60">
            Cluvio replaces fragmented tools with one unified workspace,
            helping student organizations stay organized, collaborate
            efficiently, and build stronger campus communities.
          </p>

        </div>

      </div>

    </section>
  );
};

export default Features;