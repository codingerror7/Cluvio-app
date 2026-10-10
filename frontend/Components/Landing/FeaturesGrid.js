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
      color: "from-cyan-500/20 to-blue-500/5",
      accent: "text-cyan-400",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Secret Key Protection",
      description:
        "Club Member and Club Head accounts are shielded by authorization passcodes (admin123) to prevent unauthorized student privilege escalation.",
      tag: "Security",
      color: "from-amber-500/20 to-orange-500/5",
      accent: "text-amber-400",
    },
    {
      icon: HiOutlineUserGroup,
      title: "3-Tier Role Architecture",
      description:
        "Dedicated portals for Student campus explorers, verified Club Members, and executive Club Heads tailored to their specific responsibilities.",
      tag: "Multi-Role",
      color: "from-emerald-500/20 to-teal-500/5",
      accent: "text-emerald-400",
    },
    {
      icon: HiOutlineCalendarDays,
      title: "Campus Events & Meetups",
      description:
        "Publish meeting schedules, hackathons, guest seminars, and cultural competitions with automated RSVP tracking for members.",
      tag: "Events",
      color: "from-violet-500/20 to-purple-500/5",
      accent: "text-violet-400",
    },
    {
      icon: HiOutlineChartBar,
      title: "Leadership Health Metrics",
      description:
        "Track club roster sizes, application acceptance rates, and membership demographics from the dedicated Club Head Console.",
      tag: "Analytics",
      color: "from-pink-500/20 to-rose-500/5",
      accent: "text-pink-400",
    },
    {
      icon: HiOutlineCpuChip,
      title: "Engineered by BroCodes Tech",
      description:
        "Built with high-velocity Next.js 16, React 19, Express, and MongoDB for flawless sub-second performance across mobile and desktop.",
      tag: "BroCodes Tech",
      color: "from-cyan-500/20 to-teal-500/5",
      accent: "text-cyan-300",
    },
  ];

  return (
    <section id="features" className="py-16 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-cyan-400 mb-4">
            <HiOutlineSparkles className="text-sm" />
            <span>High-Velocity Architecture</span>
          </div>
          <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight">
            Everything Required to Run
            <span className="block text-cyan-400">World-Class Campus Clubs.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/60">
            Say goodbye to scattered WhatsApp groups, lost Google Forms, and chaotic spreadsheets. Cluvio unifies your entire student club ecosystem.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative rounded-3xl border border-white/10 bg-[#0c1322]/80 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden"
              >
                {/* Subtle gradient hover wash */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white transition-all group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-black">
                        <Icon className="text-2xl" />
                      </div>
                      <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white/70">
                        {f.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white">
                      {f.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/60">
                      {f.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    >
                      <span>Get started with this feature</span>
                      <HiOutlineArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                    </Link>
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
