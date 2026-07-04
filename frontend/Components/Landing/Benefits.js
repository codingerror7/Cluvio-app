"use client";

import React from "react";
import {
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineBolt,
  HiOutlineChartBar,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const benefits = [
  {
    icon: HiOutlineClock,
    title: "Save Time",
    description:
      "Replace spreadsheets, scattered chats, and manual workflows with one organized platform.",
  },
  {
    icon: HiOutlineUsers,
    title: "Increase Engagement",
    description:
      "Keep every member connected through announcements, events, and collaboration.",
  },
  {
    icon: HiOutlineBolt,
    title: "Work Faster",
    description:
      "Handle registrations, attendance, committees, and approvals without switching tools.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Grow with Confidence",
    description:
      "As your club expands, Cluvio helps maintain structure, transparency, and efficiency.",
  },
];

const checklist = [
  "Centralized club operations",
  "Better event participation",
  "Real-time communication",
  "Simplified administration",
  "Scalable workflows",
];

const Benefits = () => {
  return (
    <section className="py-24">

      <div className="container-page">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--accent)]">
            Why Cluvio
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Focus on Building Communities,
            <span className="block text-[var(--accent)]">
              Not Managing Tools
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Cluvio reduces operational overhead, improves collaboration,
            and gives every club the tools needed to stay organized.
          </p>

        </div>

        {/* Benefit Cards */}

        <div className="mt-20 grid gap-6 md:grid-cols-2">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-[var(--accent)]/40"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/10">

                    <Icon className="text-2xl text-[var(--accent)]" />

                  </div>

                  <HiOutlineArrowRight className="text-white/30 transition-transform group-hover:translate-x-1" />

                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {benefit.title}
                </h3>

                <p className="mt-4 leading-8 text-white/60">
                  {benefit.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* Bottom Section */}

        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-center rounded-3xl border border-white/10 bg-white/[0.03] p-10">

          <div>

            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              The Bigger Picture
            </span>

            <h3 className="mt-4 text-3xl font-bold text-white">
              A Better Experience for Every Club Member
            </h3>

            <p className="mt-6 text-lg leading-8 text-white/60">
              Whether you're organizing campus-wide events or joining your first
              club, Cluvio creates a seamless experience that keeps everyone
              connected, informed, and engaged.
            </p>

          </div>

          <div className="space-y-4">

            {checklist.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
              >

                <HiOutlineCheckCircle className="text-xl text-[var(--accent)]" />

                <span className="text-white/80">
                  {item}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* Closing */}

        <div className="mx-auto mt-20 max-w-3xl text-center">

          <h3 className="text-3xl font-bold text-white">
            Less Administration. More Impact.
          </h3>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Spend less time managing spreadsheets and disconnected tools,
            and more time creating memorable experiences for your campus
            community.
          </p>

        </div>

      </div>

    </section>
  );
};

export default Benefits;