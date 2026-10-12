"use client";

import React, { useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineChatBubbleLeftRight,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import Link from "next/link";

const faqs = [
  {
    category: "General",
    question: "Who is BroClubs designed for?",
    answer:
      "Built for college students, club leads, and campus coordinators looking to streamline club recruitments, events, and memberships.",
  },
  {
    category: "Roles & Access",
    question: "What are the 3 roles supported by BroClubs?",
    answer:
      "Student (open access to explore & join), Club Member (exclusive tasks & events), and Club Head (full management powers over events and rosters).",
  },
  {
    category: "Roles & Access",
    question: "How does the Secret Key authorization work?",
    answer:
      "To protect leadership accounts, registering as a Club Member or Club Head requires an authorized secret passkey. Standard student accounts require zero keys.",
  },
  {
    category: "Operations",
    question: "How do event ticketing and attendance passes work?",
    answer:
      "Clubs publish events with capacity limits. Registered students get instant digital QR passes for fast on-campus check-in.",
  },
  {
    category: "Operations",
    question: "Can multiple coordinators manage the same club?",
    answer:
      "Yes. Multiple club heads and coordinators can collaborate on approvals, event publishing, and member rosters.",
  },
  {
    category: "General",
    question: "Who engineered and maintains BroClubs?",
    answer:
      "BroClubs is an official product engineered by BroCodes Technologies (brocodestech.in), specialized in digital platforms for higher education.",
  },
  {
    category: "Platform",
    question: "Is BroClubs mobile-friendly across devices?",
    answer:
      "Yes, 100% responsive and optimized for smartphones, tablets, and laptops.",
  },
];

const categories = ["All", "General", "Roles & Access", "Operations"];

export default function Faq() {
  const [active, setActive] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <section id="faq" className="py-8 sm:py-12 text-left relative">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE: Sticky Header & Integrated Support Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Frequently Asked Questions
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.12]">
                Everything You{" "}
                <span className="block text-slate-900">Need to Know.</span>
              </h2>

              <p className="text-base text-slate-600 font-normal leading-relaxed">
                Find answers to the most common questions about managing college clubs with BroClubs and BroCodes Technologies.
              </p>
            </div>

            {/* Integrated Help Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xl border border-blue-100">
                <HiOutlineChatBubbleLeftRight />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Still have questions?</h3>
                <p className="mt-1 text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                  Can&apos;t find what you&apos;re looking for? Reach out directly to our engineering support team.
                </p>
              </div>

              <div className="pt-1 flex flex-wrap gap-2.5">
                <Link
                  href="/Contact"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
                >
                  <span>Contact Support</span>
                  <HiOutlineArrowRight className="text-xs" />
                </Link>
                <a
                  href="https://brocodestech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <span>BroCodes Tech ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Category Filter Tabs + Smooth Animated Accordions */}
          <div className="lg:col-span-7 space-y-5">
            {/* Quick Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActive(0); // auto-expand first item in new category
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-white shadow-xs"
                        : "border border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const isOpen = active === index;

                return (
                  <div
                    key={faq.question}
                    className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                      isOpen
                        ? "border-blue-200 bg-white shadow-sm ring-1 ring-blue-100"
                        : "border-slate-200/80 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between p-4.5 sm:p-5 text-left transition hover:bg-slate-50/50 cursor-pointer gap-4"
                    >
                      <div className="flex items-center gap-2.5 flex-1">
                        <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 ${
                          isOpen
                            ? "rotate-180 bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <HiOutlineChevronDown className="text-sm stroke-[2.5]" />
                      </div>
                    </button>

                    {/* Smooth CSS Grid Height Transition */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-slate-100/90 px-4.5 sm:px-5 py-3.5 bg-slate-50/40 text-xs sm:text-[13px] leading-relaxed text-slate-600 font-normal">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}