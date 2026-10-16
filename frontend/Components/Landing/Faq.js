"use client";

import React from "react";
import BouncyAccordion from "@/Components/ui/BouncyAccordion";

const faqData = [
  {
    id: 1,
    question: "What is BroClubs?",
    answer:
      "BroClubs is a college club management platform that helps students discover and participate in clubs while giving club presidents the tools to manage their communities and activities.",
  },
  {
    id: 2,
    question: "Who can use BroClubs?",
    answer:
      "BroClubs is designed for college students, club members and club presidents. Students can use the platform to participate in clubs, while presidents can manage their respective clubs.",
  },
  {
    id: 3,
    question: "What can I do as a student or club member?",
    answer:
      "Students can create their profile, explore available clubs, join communities and stay connected with their college club activities.",
  },
  {
    id: 4,
    question: "What can a club president do?",
    answer:
      "Club presidents can manage their club, track and approve member rosters, organize events, and broadcast announcements through the president-side experience.",
  },
  {
    id: 5,
    question: "How do I get started with BroClubs?",
    answer:
      "Choose the appropriate login option for your role. Students and club members can use the Student / Club Member authentication flow, while club presidents can use the President login.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative py-20 sm:py-28 text-left w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="eyebrow-pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300">
              03 / FAQ
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Questions? We&apos;ve Got You.
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-lg mx-auto">
            Everything you need to know before getting started with BroClubs.
          </p>
        </div>

        {/* Skipper UI Skiper103 Spring Accordion */}
        <div className="max-w-3xl mx-auto">
          <BouncyAccordion items={faqData} allowMultiple={false} />
        </div>
      </div>
    </section>
  );
}