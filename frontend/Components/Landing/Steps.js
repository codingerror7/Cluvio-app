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
    title: "Create Your Club Charter",
    description:
      "Set up your club workspace, define leadership roles, committees, and customize permissions within minutes.",
    points: ["Create club profile", "Assign leadership roles", "Configure permissions"],
    iconBg: "bg-blue-100 text-blue-700",
  },
  {
    number: "02",
    icon: HiOutlineUsers,
    title: "Invite & Approve Members",
    description:
      "Students request to join with 1-click; Club Heads review applications in real-time with passcode protection.",
    points: ["Invite members", "Review applications", "Secret key verification"],
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    number: "03",
    icon: HiOutlineRocketLaunch,
    title: "Run Campus Operations",
    description:
      "Manage events, attendance, announcements, and daily student activities from one beautifully unified dashboard.",
    points: ["Launch events", "Track attendance", "Publish announcements"],
    iconBg: "bg-purple-100 text-purple-700",
  },
];

export default function Steps() {
  return (
    <section id="how-it-works" className="py-16 text-left">
      <div className="mx-auto w-full max-w-[1440px] px-2 sm:px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
            Simplified Workflow
          </span>

          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            From Setup to
            <span className="block text-slate-900">Thriving Club Community.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-500 font-normal">
            BroClubs simplifies every stage of student club management so your campus leaders can focus on building relationships rather than juggling scattered tools.
          </p>
        </div>

        {/* 3 Step Timeline Cards */}
        <div className="mx-auto mt-14 max-w-4xl space-y-5">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="flex flex-col sm:flex-row items-start gap-6 rounded-2xl border border-slate-200/70 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.05)] transition-all duration-300"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800 text-2xl font-bold">
                  <Icon />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-wider text-slate-400 font-mono">
                      STEP {step.number}
                    </span>
                  </div>

                  <h3 className="mt-1 text-xl font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 font-normal">
                    {step.description}
                  </p>

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                    {step.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-700"
                      >
                        <HiOutlineCheckCircle className="text-sm text-slate-900 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}