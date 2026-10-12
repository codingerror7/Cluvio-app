"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineBuildingOffice2,
  HiOutlineUsers,
  HiOutlineRocketLaunch,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const steps = [
  {
    number: "01",
    icon: HiOutlineBuildingOffice2,
    title: "Create Club Charter",
    description: "Define club profile, assign executive roles, and set permissions.",
    points: ["Charter Profile", "Role Permissions"],
    iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
  },
  {
    number: "02",
    icon: HiOutlineUsers,
    title: "Recruit & Approve Members",
    description: "Students apply with 1-click; Leaders approve with passkey security.",
    points: ["1-Click Apply", "Instant Approvals"],
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  },
  {
    number: "03",
    icon: HiOutlineRocketLaunch,
    title: "Run Campus Operations",
    description: "Publish events, issue mobile QR passes, and broadcast updates.",
    points: ["Digital Passes", "Official Feeds"],
    iconBg: "bg-violet-50 text-violet-600 border border-violet-100",
  },
];

export default function Steps() {
  return (
    <section id="how-it-works" className="py-6 sm:py-8 text-left w-full relative">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Left-Aligned Header Matching 'Discover Active Communities' Style */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              Simplified Workflow
            </span>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
              From Setup to Thriving Club Community.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-normal">
              Launch, recruit, and operate your campus club in 3 simple steps.
            </p>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.02)] shrink-0"
          >
            <span>Start in 3 Steps</span>
            <HiOutlineArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Compact 3-Column Horizontal Grid */}
        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 text-left">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Step Header: Icon + Number Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.iconBg} text-xl transition-transform group-hover:scale-105`}
                    >
                      <Icon />
                    </div>
                    <span className="text-[11px] font-black tracking-wider text-slate-500 font-mono bg-slate-100/90 px-2.5 py-0.5 rounded-md">
                      STEP {step.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-500 font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Micro Feature Pills */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {step.points.map((point) => (
                    <span
                      key={point}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-50 border border-slate-200/60 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                    >
                      <HiOutlineCheckCircle className="text-[11px] text-blue-600 shrink-0" />
                      <span>{point}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}