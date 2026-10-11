"use client";

import React, { useState } from "react";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";
import Link from "next/link";

const faqs = [
  {
    question: "Who is Cluvio designed for?",
    answer:
      "Cluvio is built for college students, technical societies, cultural clubs, sports chapters, and college administrators looking to streamline operations.",
  },
  {
    question: "What are the 3 roles supported by Cluvio?",
    answer:
      "Cluvio supports Student (open access), Club Member (requires secret key 'admin123'), and Club Head (requires secret key 'admin123' for full management powers).",
  },
  {
    question: "Who engineered Cluvio?",
    answer:
      "Cluvio is an official product engineered by BroCodes Technologies (brocodestech.in), specialized in high-performance digital platforms for higher education and enterprises.",
  },
  {
    question: "How does the Secret Key system work?",
    answer:
      "To ensure campus security, registering or signing in as a Club Member or Club Head requires the verified passcode 'admin123'. Standard student accounts do not require any key.",
  },
  {
    question: "Can multiple club heads manage the same club?",
    answer:
      "Yes. The platform allows presidential and coordinator roles with custom permissions to review applications, approve events, and manage members.",
  },
  {
    question: "Is Cluvio mobile responsive?",
    answer:
      "Yes! Cluvio is 100% responsive, optimized for smartphones, tablets, laptops, and large campus displays.",
  },
];

export default function Faq() {
  const [active, setActive] = useState(0);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 text-left">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            Everything You Need to Know.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
            Find answers to the most common questions about managing college clubs with Cluvio and BroCodes Technologies.
          </p>
        </div>

        {/* Accordions in Clean Light Mode */}
        <div className="mt-12 space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition hover:bg-slate-50/70 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {faq.question}
                  </span>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ml-4">
                    {isOpen ? (
                      <HiOutlineMinus className="text-base" />
                    ) : (
                      <HiOutlinePlus className="text-base" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/40">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-12 rounded-3xl border border-blue-200/80 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">Still have questions?</h3>
          <p className="mt-2 text-sm text-slate-600">
            Our engineering team at BroCodes Technologies is here to assist your institution.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link
              href="/register"
              className="rounded-full bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
            >
              Get Started Free
            </Link>
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Contact BroCodes Tech ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}