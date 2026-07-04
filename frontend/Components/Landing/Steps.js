"use client";

import React from "react";
import {
  HiOutlineBuildingOffice2,
  HiOutlineUsers,
  HiOutlineRocketLaunch,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const steps = [
  {
    number: "01",
    icon: HiOutlineBuildingOffice2,
    title: "Create Your Club",
    description:
      "Set up your club workspace, define leadership roles, committees, and customize permissions within minutes.",
    points: ["Create club profile", "Assign leadership roles", "Configure permissions"],
  },
  {
    number: "02",
    icon: HiOutlineUsers,
    title: "Invite Members",
    description:
      "Bring students into your community, organize committees, and manage participation effortlessly.",
    points: ["Invite members", "Create committees", "Manage participation"],
  },
  {
    number: "03",
    icon: HiOutlineRocketLaunch,
    title: "Run Your Club",
    description:
      "Manage events, attendance, announcements, and every daily club activity from one dashboard.",
    points: ["Launch events", "Track attendance", "Publish announcements"],
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="mt-8 bg-transparent p-6 shadow-[0_20px_80px_rgba(2,8,23,0.2)] sm:p-8 lg:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--accent)]">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            From Setup to
            <span className="block text-[var(--accent)]">Successful Club Management</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Cluvio simplifies every stage of club management so your team can focus on building stronger student communities instead of juggling scattered tools.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative flex gap-6 pb-10 last:pb-0 sm:gap-8">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
                    <Icon className="text-3xl text-[var(--accent)]" />
                  </div>
                  {index !== steps.length - 1 && <div className="mt-4 h-full w-px bg-white/10" />}
                </div>

                <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <span className="text-sm font-semibold tracking-wider text-[var(--accent)]">
                    STEP {step.number}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-4 max-w-2xl leading-8 text-white/60">{step.description}</p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {step.points.map((point) => (
                      <div key={point} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <HiOutlineCheckCircle className="text-lg text-[var(--accent)]" />
                        <span className="text-sm text-white/80">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center sm:px-8 lg:px-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Unified Workflow
          </span>
          <h3 className="mt-4 text-3xl font-bold text-white">Everything Connected in One Platform</h3>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Replace spreadsheets, disconnected chats, and multiple tools with one modern workspace for members, events, communication, attendance, and club administration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;