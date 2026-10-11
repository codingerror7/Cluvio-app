"use client";

import React from "react";
import {
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineCpuChip,
  HiOutlineArrowRight,
  HiOutlineSparkles,
} from "react-icons/hi2";
import Link from "next/link";

export default function FeaturesGrid() {
  const features = [
    {
      icon: HiOutlineBolt,
      title: "Real-Time Join Requests",
      description:
        "Students submit membership applications with custom notes; Club Heads receive instant notifications to approve or decline with a single click.",
      tag: "Live Sync",
      iconBg: "bg-blue-50 text-blue-600",
      accent: "text-blue-600",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Secret Key Authorization",
      description:
        "Club Member and Club Head accounts are protected by secure access passcodes (admin123) to prevent unauthorized student privilege escalation.",
      tag: "Security",
      iconBg: "bg-amber-50 text-amber-600",
      accent: "text-amber-600",
    },
    {
      icon: HiOutlineUserGroup,
      title: "3-Tier Role Architecture",
      description:
        "Dedicated portals for Student campus explorers, verified Club Members, and executive Club Heads tailored to their specific responsibilities.",
      tag: "Multi-Role",
      iconBg: "bg-emerald-50 text-emerald-600",
      accent: "text-emerald-600",
    },
    {
      icon: HiOutlineCalendarDays,
      title: "Campus Events & Meetups",
      description:
        "Publish meeting schedules, hackathons, guest seminars, and cultural competitions with automated RSVP tracking for members.",
      tag: "Events",
      iconBg: "bg-purple-50 text-purple-600",
      accent: "text-purple-600",
    },
    {
      icon: HiOutlineChartBar,
      title: "Leadership Health Metrics",
      description:
        "Track club roster sizes, application acceptance rates, and membership demographics from the dedicated Club Head Console.",
      tag: "Analytics",
      iconBg: "bg-rose-50 text-rose-600",
      accent: "text-rose-600",
    },
    {
      icon: HiOutlineCpuChip,
      title: "Engineered by BroCodes Tech",
      description:
        "Built with high-velocity Next.js 16, React 19, Express, and MongoDB for flawless sub-second performance across mobile and desktop.",
      tag: "BroCodes Tech",
      iconBg: "bg-cyan-50 text-cyan-600",
      accent: "text-cyan-600",
    },
  ];

  return (
    <section id="features" className="py-16 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 mb-3">
            <HiOutlineSparkles className="text-sm" />
            <span>High-Velocity Architecture</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            Everything Required to Run
            <span className="block text-blue-600">World-Class Campus Clubs.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            Say goodbye to scattered WhatsApp groups, lost Google Forms, and chaotic spreadsheets. Cluvio unifies your entire student club operations.
          </p>
        </div>

        {/* 6 Grid Cards in Clean Light Mode */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${f.iconBg} text-2xl transition-transform group-hover:scale-105`}>
                    <Icon />
                  </div>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] font-bold text-slate-600">
                    {f.tag}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900 tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors"
                  >
                    <span>Get started with this feature</span>
                    <HiOutlineArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
