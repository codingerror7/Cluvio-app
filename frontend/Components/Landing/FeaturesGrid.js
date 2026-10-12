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
    <section id="features" className="py-6 sm:py-8 relative">
      <div className="mx-auto w-full max-w-[1560px] px-2 sm:px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.02)] mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
            <span>High-Velocity Architecture</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            Everything Required to Run
            <span className="block text-slate-900">World-Class Campus Clubs.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-500 font-normal">
            Say goodbye to scattered WhatsApp groups, lost Google Forms, and chaotic spreadsheets. BroClubs unifies your entire student club operations.
          </p>
        </div>

        {/* 6 Grid Cards in Minimalist Light Mode */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-slate-200/70 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-800 text-xl transition-transform group-hover:scale-105">
                    <Icon />
                  </div>
                  <span className="rounded-full bg-slate-50 border border-slate-200/70 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                    {f.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
                  {f.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100/80">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-blue-600 transition-colors"
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
