"use client";

import React from "react";
import {
  HiOutlineUserPlus,
  HiOutlineTicket,
  HiOutlineMagnifyingGlass,
  HiOutlineMegaphone,
  HiOutlineIdentification,
  HiOutlineChartBar,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import Link from "next/link";

export default function FeaturesGrid() {
  const features = [
    {
      icon: HiOutlineUserPlus,
      title: "1-Click Recruitment & Approvals",
      description:
        "Students apply with skills and links; Presidents review and approve in real time with instant status alerts.",
      tag: "No More Google Forms",
    },
    {
      icon: HiOutlineTicket,
      title: "Automated Event RSVPs & Passes",
      description:
        "Publish workshops & hackathons with real-time RSVP counts and digital mobile entry check-in passes.",
      tag: "Instant Entry Passes",
    },
    {
      icon: HiOutlineMagnifyingGlass,
      title: "Centralized Campus Club Discovery",
      description:
        "Explore verified technical, cultural, and sports clubs with official charters, schedules, and leads.",
      tag: "Discover Campus",
    },
    {
      icon: HiOutlineMegaphone,
      title: "Official Club Feeds (Zero Spam)",
      description:
        "Broadcast agendas, competition alerts, and project deadlines directly so updates never get lost in chat noise.",
      tag: "Zero WhatsApp Noise",
    },
    {
      icon: HiOutlineIdentification,
      title: "Permanent Rosters & Handover",
      description:
        "Preserve verified member directories and contact archives across semesters for seamless batch handovers.",
      tag: "Seamless Handover",
    },
    {
      icon: HiOutlineChartBar,
      title: "Turnout & Participation Analytics",
      description:
        "Track live event turnout, acceptance rates, and member engagement — export-ready for college faculty.",
      tag: "Verified Reports",
    },
  ];

  return (
    <section id="features" className="py-8 sm:py-12 relative">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE: 6 Compact Boxes */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-left">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="group relative rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_22px_rgba(0,0,0,0.04)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800 text-lg transition-transform group-hover:scale-105 group-hover:bg-blue-50 group-hover:text-blue-600">
                          <Icon />
                        </div>
                        <span className="rounded-full bg-slate-50 border border-slate-200/70 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 whitespace-nowrap">
                          {f.tag}
                        </span>
                      </div>

                      <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                        {f.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-500 font-normal">
                        {f.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                        Built for student clubs
                      </span>
                      <HiOutlineArrowRight className="text-xs text-slate-400 group-hover:text-blue-600 transition-all group-hover:translate-x-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: Header + Paragraph + Actions */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span>Built for Real Campus Life</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-black text-slate-900 tracking-tight leading-tight">
              <span className="block">Everything Required to Run</span>
              <span className="block text-slate-900">World-Class Campus Clubs.</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Say goodbye to scattered WhatsApp groups, lost Google Forms, and messy spreadsheets. BroClubs solves every real-world headache in student club operations.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <HiOutlineCheckCircle className="text-emerald-500 text-base shrink-0" />
                <span>Zero technical setup required for student leaders</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <HiOutlineCheckCircle className="text-emerald-500 text-base shrink-0" />
                <span>Instant QR & mobile passes for fast event check-ins</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <HiOutlineCheckCircle className="text-emerald-500 text-base shrink-0" />
                <span>Verified directories preserved across batch handovers</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
              >
                <span>Start Free for Your Club</span>
                <HiOutlineArrowRight className="text-sm" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                <span>Explore Clubs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
