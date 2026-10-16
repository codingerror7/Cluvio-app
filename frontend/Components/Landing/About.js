"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineUserPlus,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowRight,
  HiOutlineCheck,
} from "react-icons/hi2";
import SpotlightCard from "@/Components/ui/SpotlightCard";

const steps = [
  {
    step: "01",
    title: "Discover",
    tagline: "Find Your Community",
    icon: HiOutlineMagnifyingGlass,
    description:
      "Explore verified college clubs across technology, creative arts, cultural societies, and competitive sports. Filter by recruitment status and charter details in real time.",
    highlights: ["Verified Campus Charters", "Live Recruitment Windows", "Instant Search"],
  },
  {
    step: "02",
    title: "Participate",
    tagline: "Engage Without Friction",
    icon: HiOutlineUserPlus,
    description:
      "Apply for club memberships in a single click, claim verified digital QR passes for campus hackathons and workshops, and stay in sync with live club activity feeds.",
    highlights: ["1-Click Applications", "Digital QR Event Passes", "Direct Broadcasts"],
  },
  {
    step: "03",
    title: "Manage",
    tagline: "Empower Club Leadership",
    icon: HiOutlineAdjustmentsHorizontal,
    description:
      "Club presidents and heads gain a powerful leadership console — review student membership requests, assign roles with passkeys, schedule events, and publish official alerts.",
    highlights: ["Executive Passkey Console", "Roster Approvals", "Event Logistics"],
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 text-left w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/8 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="eyebrow-pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300">
                01 / Platform Architecture
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Engineered for
              <br />
              <span className="text-neutral-400">College Life & Leadership.</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
              BroClubs eliminates fragmented group chats and lost registration sheets.
              A streamlined, three-step lifecycle connects the entire campus ecosystem.
            </p>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/[0.08] hover:border-violet-500/30 transition-all self-start md:self-end"
          >
            <span>Join Campus Network</span>
            <HiOutlineArrowRight className="text-xs" />
          </Link>
        </div>

        {/* 3 Connected Step Cards with Skipper UI SpotlightCard */}
        <div className="relative mt-12">
          {/* Subtle connecting line across cards on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none -translate-y-12 z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <SpotlightCard
                  key={item.step}
                  className="p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-transform duration-300"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] text-white transition-transform group-hover:scale-105 group-hover:border-violet-500/30">
                        <Icon className="text-xl" />
                      </div>
                      <span className="badge-pill font-mono text-xs font-bold tracking-wider text-neutral-400 bg-white/[0.04] border border-white/8 px-3 py-1 rounded-full">
                        STEP {item.step}
                      </span>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="mt-6 space-y-1">
                      <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        {item.tagline}
                      </p>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-neutral-100">
                        {item.title}
                      </h3>
                    </div>

                    {/* Step Description */}
                    <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights List */}
                  <div className="mt-6 pt-5 border-t border-white/8 space-y-2">
                    {item.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-2 text-xs text-neutral-300"
                      >
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/[0.08] text-white">
                          <HiOutlineCheck className="text-[10px]" />
                        </span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
