"use client";

import React, { useState } from "react";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";

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
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-20 sm:py-28 text-left w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-300">
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

        {/* Vertically Stacked Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-violet-500/30 bg-[#0e0e13]/90 shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(139,92,246,0.06)]"
                    : "border-white/8 bg-[#0b0b0e]/70 hover:border-white/15 hover:bg-[#0f0f14]/80"
                } backdrop-blur-xl`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors duration-200"
                >
                  <span className="text-sm sm:text-base font-semibold text-white tracking-tight pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? "border-violet-500/40 bg-violet-500/10 text-violet-300 rotate-180"
                        : "border-white/10 bg-white/[0.04] text-neutral-400"
                    }`}
                  >
                    {isOpen ? (
                      <HiOutlineMinus className="text-sm" />
                    ) : (
                      <HiOutlinePlus className="text-sm" />
                    )}
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal border-t border-white/5 pt-4">
                      {item.answer}
                    </p>
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