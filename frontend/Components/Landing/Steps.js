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
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
            Simplified Workflow
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            From Setup to
            <span className="block text-blue-600">Thriving Club Community.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            Cluvio simplifies every stage of student club management so your campus leaders can focus on building relationships rather than juggling scattered tools.
          </p>
        </div>

        {/* 3 Step Timeline Cards */}
        <div className="mx-auto mt-14 max-w-4xl space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="flex flex-col sm:flex-row items-start gap-6 rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 text-2xl font-bold">
                  <Icon />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold tracking-wider text-blue-600">
                      STEP {step.number}
                    </span>
                  </div>

                  <h3 className="mt-1.5 text-xl sm:text-2xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {step.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700"
                      >
                        <HiOutlineCheckCircle className="text-sm text-blue-600 shrink-0" />
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