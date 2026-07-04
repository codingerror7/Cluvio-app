"use client";

import React, { useState } from "react";
import {
  HiOutlinePlus,
  HiOutlineMinus,
} from "react-icons/hi2";

const faqs = [
  {
    question: "Who is Cluvio designed for?",
    answer:
      "Cluvio is built for student clubs, technical societies, cultural organizations, student chapters, and campus communities that want to simplify their operations.",
  },
  {
    question: "Can multiple administrators manage a club?",
    answer:
      "Yes. You can assign different roles and permissions to presidents, coordinators, committee leads, faculty advisors, and administrators.",
  },
  {
    question: "Does Cluvio support event registrations?",
    answer:
      "Yes. Members can register for events, while organizers can monitor registrations, attendance, and participation from a single dashboard.",
  },
  {
    question: "Can we send announcements to members?",
    answer:
      "Absolutely. Clubs can publish announcements, notices, and updates that instantly reach all relevant members.",
  },
  {
    question: "Is Cluvio mobile-friendly?",
    answer:
      "Yes. Cluvio is fully responsive and works seamlessly across desktops, tablets, and mobile devices.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most clubs can create their workspace, invite members, and begin managing activities in just a few minutes.",
  },
];

const Faq = () => {
  const [active, setActive] = useState(0);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24"
    >
      <div className="mx-auto max-w-4xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--accent)]">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Everything You Need to Know
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Find answers to the most common questions about managing student
            clubs with Cluvio.
          </p>

        </div>

        {/* Accordion */}

        <div className="mt-16 space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >

                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-white/[0.04]"
                >

                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">

                    {isOpen ? (
                      <HiOutlineMinus className="text-lg text-[var(--accent)]" />
                    ) : (
                      <HiOutlinePlus className="text-lg text-white/60" />
                    )}

                  </div>

                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-6 py-5">

                    <p className="leading-8 text-white/60">
                      {faq.answer}
                    </p>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Faq;